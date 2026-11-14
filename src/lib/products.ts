// Server-side product queries. Every export is cached and tagged "catalog";
// call updateTag("catalog") / revalidateTag after changing products or stock.

import { asc, inArray } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import type { products as productsTable } from "@/db/schema";
import type { Product } from "./catalog";

const NEW_ARRIVALS = [
  "atelier-top-handle-bag",
  "riviera-woven-bag",
  "biker-leather-jacket",
  "satin-bomber-jacket",
  "floral-print-pump",
  "fringed-knit-poncho",
  "pleated-jogger-trouser",
  "round-metal-sunglasses",
];

const GIFT_EDIT = [
  "classic-leather-watch",
  "sapphire-drop-earrings",
  "crescent-pendant-necklace",
  "minimal-white-watch",
  "round-metal-sunglasses",
  "riviera-woven-bag",
];

type ProductRow = typeof productsTable.$inferSelect & {
  category: { slug: string; name: string };
  stocks: { size: string | null; quantity: number; position: number }[];
};

function toProduct(row: ProductRow): Product {
  const stocks = [...row.stocks].sort((a, b) => a.position - b.position);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: { slug: row.category.slug, name: row.category.name },
    price: row.priceCents,
    currency: row.currency,
    color: row.color,
    description: row.description,
    details: row.details,
    stock: stocks.reduce((sum, s) => sum + s.quantity, 0),
    sizes: stocks
      .filter((s) => s.size !== null)
      .map((s) => ({ label: s.size as string, available: s.quantity > 0 })),
    image: row.images[0],
    gallery: row.images,
    badge: row.badge ?? undefined,
  };
}

const withRelations = {
  category: { columns: { slug: true, name: true } },
  stocks: { columns: { size: true, quantity: true, position: true } },
} as const;

async function getBySlugs(slugs: string[]) {
  const rows = await db.query.products.findMany({
    where: (p) => inArray(p.slug, slugs),
    with: withRelations,
  });
  const bySlug = new Map(rows.map((r) => [r.slug, toProduct(r)]));
  return slugs.map((s) => bySlug.get(s)).filter((p): p is Product => Boolean(p));
}

export async function getProductSlugs() {
  "use cache";
  cacheTag("catalog");
  cacheLife("hours");
  const rows = await db.query.products.findMany({
    columns: { slug: true },
    orderBy: (p) => asc(p.id),
  });
  return rows.map((r) => r.slug);
}

export async function getProductBySlug(slug: string) {
  "use cache";
  cacheTag("catalog");
  cacheLife("hours");
  const row = await db.query.products.findFirst({
    where: (p, { eq }) => eq(p.slug, slug),
    with: withRelations,
  });
  return row ? toProduct(row) : null;
}

/** Same category first, then the rest of the catalog. */
export async function getRelatedProducts(productId: number, categorySlug: string, limit = 8) {
  "use cache";
  cacheTag("catalog");
  cacheLife("hours");
  const rows = await db.query.products.findMany({
    where: (p, { ne }) => ne(p.id, productId),
    with: withRelations,
    orderBy: (p) => asc(p.id),
  });
  const others = rows.map(toProduct);
  return [
    ...others.filter((p) => p.category.slug === categorySlug),
    ...others.filter((p) => p.category.slug !== categorySlug),
  ].slice(0, limit);
}

export async function getNewArrivals() {
  "use cache";
  cacheTag("catalog");
  cacheLife("hours");
  return getBySlugs(NEW_ARRIVALS);
}

export async function getGiftEdit() {
  "use cache";
  cacheTag("catalog");
  cacheLife("hours");
  return getBySlugs(GIFT_EDIT);
}
