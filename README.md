# Upfront Store

Next.js (App Router, TypeScript, Tailwind CSS v4) + Better Auth + Drizzle ORM + Neon Postgres.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL
npm run dev
```

## Structure

```
src/
  app/api/auth/[...all]/route.ts   Better Auth route handler
  db/index.ts                      Drizzle client (Neon HTTP driver)
  db/schema.ts                     Drizzle schema entry (empty)
  lib/auth.ts                      Better Auth server instance
  lib/auth-client.ts               Better Auth React client
drizzle.config.ts                  drizzle-kit config (migrations -> ./drizzle)
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` / `typecheck` | ESLint / `tsc --noEmit` |
| `npm run auth:generate` | Generate Better Auth tables into `src/db/auth-schema.ts` |
| `npm run db:generate` / `db:migrate` | Create / apply SQL migrations |
| `npm run db:push` | Push schema directly (dev) |
| `npm run db:studio` | Drizzle Studio |
