// Client-safe product types and pure helpers. Products live in the database
// (see src/db/catalog-schema.ts); server-side queries are in ./products.

import type { Image } from "./images";

export type StockState = "in_stock" | "low_stock" | "out_of_stock";

export type Size = { label: string; available: boolean };

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: { slug: string; name: string };
  price: number; // minor units (cents)
  currency: "USD";
  color: string;
  description: string;
  details: string[];
  /** Total across all sizes */
  stock: number;
  /** Empty means one size */
  sizes: Size[];
  image: Image; // listing image
  gallery: Image[]; // product page images (first = listing image)
  badge?: string;
};

const LOW_STOCK_THRESHOLD = 3;

export function getStockState(product: Pick<Product, "stock">): StockState {
  if (product.stock <= 0) return "out_of_stock";
  if (product.stock <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}

export function formatPrice(amount: number, currency: Product["currency"]) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount / 100);
}
