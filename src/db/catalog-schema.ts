import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import type { Image } from "@/lib/images";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  position: integer("position").notNull().default(0),
  ...timestamps,
});

export const products = pgTable(
  "products",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    priceCents: integer("price_cents").notNull(),
    currency: text("currency").$type<"USD">().notNull().default("USD"),
    color: text("color").notNull(),
    description: text("description").notNull(),
    details: text("details").array().notNull().default(sql`'{}'::text[]`),
    badge: text("badge"),
    /** First image is the listing image. */
    images: jsonb("images").$type<Image[]>().notNull(),
    ...timestamps,
  },
  (t) => [
    index("products_category_id_idx").on(t.categoryId),
    check("products_price_cents_nonnegative", sql`${t.priceCents} >= 0`),
  ],
);

/** One row per size; `size` is NULL for one-size products. */
export const stocks = pgTable(
  "stocks",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    size: text("size"),
    quantity: integer("quantity").notNull().default(0),
    position: integer("position").notNull().default(0),
    updatedAt: timestamps.updatedAt,
  },
  (t) => [
    unique("stocks_product_size_unique").on(t.productId, t.size).nullsNotDistinct(),
    check("stocks_quantity_nonnegative", sql`${t.quantity} >= 0`),
  ],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  stocks: many(stocks),
}));

export const stocksRelations = relations(stocks, ({ one }) => ({
  product: one(products, { fields: [stocks.productId], references: [products.id] }),
}));
