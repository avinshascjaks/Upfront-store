# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md


## Project state

Upfront Store is an e-commerce app in an early stage. The integrations are wired up. The homepage, the product page (`/products/[slug]`) and the site header and footer are built. There are no cart or auth flows yet: "Add to bag" only checks a size is selected. Products, categories and stocks live in PostgreSQL (`src/db/catalog-schema.ts`; stocks has one row per size, `size` NULL = one size). Server queries are cached and tagged `catalog` in `src/lib/products.ts`; `src/lib/catalog.ts` holds only client-safe types and helpers (prices in cents; stock state comes from `getStockState`). Sample data for `npm run db:seed` is in `src/db/seed-data.ts`. A build now needs a reachable, migrated and seeded database, because `generateStaticParams` queries it. Other homepage content lives in `src/lib/sample-data.ts`. Images are Unsplash photos, and product close-ups are focal-point crops built by `unsplash()` in `src/lib/images.ts`. Check that any new photo or crop shows no third-party brand logos. Links to `/collections/*`, `/account`, `/bag` and similar pages point to routes that don't exist yet. Don't assume code exists for those things. Check before you use it.

## Commands

```bash
npm run dev          # Next.js dev server (Turbopack)
npm run build        # production build (also runs TypeScript)
npm run lint         # ESLint (flat config, eslint-config-next)
npm run typecheck    # tsc --noEmit

npm run auth:generate   # Better Auth CLI -> writes auth tables to src/db/auth-schema.ts
npm run db:generate     # drizzle-kit: create SQL migration in ./drizzle
npm run db:migrate      # apply migrations
npm run db:push         # push schema straight to the DB (dev)
npm run db:studio       # Drizzle Studio
npm run db:seed         # idempotent catalog seed (categories, products, stocks)
```

There is no test framework set up yet.

Env vars go in `.env.local`. See `.env.example` for `DATABASE_URL`, `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`. `src/db/index.ts` and `drizzle.config.ts` both throw if `DATABASE_URL` is missing. A build needs `DATABASE_URL` set, but no live database, because the Neon client connects lazily.

## Architecture

- **Next.js 16 App Router**, React 19, everything under `src/`, path alias `@/*` → `src/*`. `next.config.ts` turns on `cacheComponents` and `partialPrefetching`, and Tailwind v4 runs through the `@tailwindcss/turbopack` loader. These change how data fetching and caching work compared with older Next.js versions, so read the bundled docs (see AGENTS.md) before writing data-fetching code.
- **Database:** `src/db/index.ts` exports a single `db` built with `drizzle-orm/neon-http` (Neon's serverless HTTP driver; it has no interactive transactions). `src/db/schema.ts` is the one schema entry point. drizzle-kit, the `db` client and the Better Auth adapter all import from it. New table files must be re-exported from `schema.ts`, and that includes the generated `auth-schema.ts`.
- **Auth:** `src/lib/auth.ts` is the server-side Better Auth instance, using the Drizzle adapter (`provider: "pg"`, given the same `schema`). It's exposed at `/api/auth/*` through `src/app/api/auth/[...all]/route.ts`. Client components use `src/lib/auth-client.ts` (`better-auth/react`). No sign-in methods are turned on yet. The `nextCookies()` plugin has to stay last in the `plugins` array.
- **Design system:** the tokens and global rules live in `src/app/globals.css` (Tailwind v4 `@theme`, with no `tailwind.config`). The React primitives are in `src/components/ui` (`import { … } from "@/components/ui"`). The look is monochrome with square corners and hairline borders. Use the `ink`/`paper`/`surface`/`muted`/`line` colors, never raw hex or the Tailwind gray palette. Typography presets are named `type-*`, not `text-*`, so they don't collide with color and size classes. Gutter and section spacing change by breakpoint through `--gutter`/`--section` (`px-gutter`, `py-section`). Always combine classes with `cn()` from `@/lib/utils`. Any new token or custom utility class must also be registered in its `extendTailwindMerge` config, or merging will drop classes.
- **Database conventions (catalog):**
  - Tables: `categories` 1─* `products` 1─* `stocks`, in `src/db/catalog-schema.ts`. Integer identity PKs, `slug` unique on categories and products, `timestamptz` `created_at`/`updated_at`. `products.category_id` is `ON DELETE RESTRICT`, `stocks.product_id` is `ON DELETE CASCADE`.
  - Money is integer cents (`price_cents`, CHECK ≥ 0). Currency is the text `USD`, typed with `$type<"USD">()`.
  - Stock is one row per size in `stocks`; `size` NULL means one size, with `UNIQUE (product_id, size) NULLS NOT DISTINCT` and `quantity` CHECK ≥ 0. There is no stored total or `available` flag. Total = sum of quantity, a size is available when quantity > 0, and `getStockState` (`src/lib/catalog.ts`) derives the state. Sizes are not variants: no per-size SKU or price.
  - Images are a `jsonb` `{src, alt}[]` on the product, first = listing image. Build `src` with `unsplash()` in the seed, not in the DB.
  - Read data only through `src/lib/products.ts`. Each export is `'use cache'` with `cacheTag("catalog")` and `cacheLife("hours")`, and uncached DB access outside a cached scope breaks the build under `cacheComponents`. Any write to products or stock must call `updateTag("catalog")` (or `revalidateTag`). `toProduct()` maps rows to the `Product` type.
  - `src/lib/catalog.ts` must stay client-safe (types and pure helpers only, no `db` imports), because client components import from it.
  - Homepage curation (new arrivals, gift edit) is slug lists in `src/lib/products.ts`, not DB columns. The homepage tiles in `sample-data.ts` are not DB categories.
  - Use versioned migrations: `db:generate`, review the SQL in `./drizzle`, then `db:migrate`. `db:push` is for throwaway dev only. Commit the generated SQL. Seed with `npm run db:seed`, which is idempotent (upsert by slug, stock rows replaced per product). neon-http has no transactions, so seed and write code runs statements sequentially and must be safe to re-run.
  - Don't run `db:migrate` or `db:seed` without the user's go-ahead, since they write to the real Neon database.
- To get auth working: `npm run auth:generate` → re-export `./auth-schema` from `schema.ts` → `db:push` or `db:generate` + `db:migrate`.
