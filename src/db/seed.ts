// Idempotent catalog seed: `npm run db:seed`.
// neon-http has no interactive transactions, so statements run sequentially.

import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

async function main() {
  // Imported after dotenv so ./index sees DATABASE_URL.
  const { eq, sql } = await import("drizzle-orm");
  const { db } = await import("./index");
  const { categories, products, stocks } = await import("./schema");
  const { buildImages, seedCategories, seedProducts } = await import("./seed-data");

  const categoryIds = new Map<string, number>();
  for (const [position, c] of seedCategories.entries()) {
    const [row] = await db
      .insert(categories)
      .values({ ...c, position })
      .onConflictDoUpdate({
        target: categories.slug,
        set: { name: c.name, position, updatedAt: new Date() },
      })
      .returning({ id: categories.id });
    categoryIds.set(c.slug, row.id);
  }

  for (const p of seedProducts) {
    const categoryId = categoryIds.get(p.category);
    if (categoryId === undefined) throw new Error(`Unknown category "${p.category}" for ${p.slug}`);

    const values = {
      slug: p.slug,
      name: p.name,
      categoryId,
      priceCents: p.priceCents,
      color: p.color,
      description: p.description,
      details: p.details,
      badge: p.badge ?? null,
      images: buildImages(p.shots),
    };
    const [row] = await db
      .insert(products)
      .values(values)
      .onConflictDoUpdate({
        target: products.slug,
        set: { ...values, updatedAt: new Date() },
      })
      .returning({ id: products.id });

    await db.delete(stocks).where(eq(stocks.productId, row.id));
    await db.insert(stocks).values(
      p.stock.map(([size, quantity], position) => ({
        productId: row.id,
        size,
        quantity,
        position,
      })),
    );
  }

  const [{ n: productCount }] = await db.select({ n: sql<number>`count(*)::int` }).from(products);
  console.log(`Seeded ${categoryIds.size} categories and ${productCount} products.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
