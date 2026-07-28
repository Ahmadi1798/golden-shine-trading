# AGENTS.md

## Project summary

Next.js 16 (App Router) agency website with a database-driven CMS. PostgreSQL via Prisma, S3-compatible media storage (MinIO locally), admin panel at `/admin`, and a publish/snapshot/rollback content workflow.

## Commands

```bash
npm run dev              # Start dev server on port 3000 (Turbopack)
npm run build            # Production build
npm run lint             # ESLint (flat config, eslint.config.js)
npm run prisma:generate  # Regenerate Prisma client after schema changes
npm run prisma:migrate   # Create and apply a migration
npm run prisma:push      # Push schema directly to DB (no migration file)
npm run prisma:seed      # Seed the database
```

**Pre-push checklist (no automated tests):** `npm run lint` must pass, then `npm run build` must pass, then manually verify pages render and mobile/light/dark modes work.

## Architecture

### DB-first with graceful fallback

Every data fetch in `src/lib/content.js` checks for `DATABASE_URL`. If absent, pages render hardcoded default content. This means the site **works without a database** — do not break this pattern. The default tenant slug is `"karfamsoft-default"`.

### Content layer

- `src/lib/content.js` — core data access (pages, sections, site settings, nav, footer, media, publish workflow)
- `src/lib/prisma.js` — singleton Prisma client (cached in dev via globalThis)
- `src/lib/admin-auth.js` — HMAC-signed cookie sessions (8h TTL), credentials from `ADMIN_EMAIL`/`ADMIN_PASSWORD`/`ADMIN_SESSION_SECRET` env vars
- `src/lib/admin-guard.js` — `requireAdminPageSession()` redirects to `/admin/login`
- `src/lib/s3-upload.js` — S3 uploads via `@aws-sdk/client-s3`
- `src/proxy.js` — security headers (CSP, HSTS, X-Frame-Options, etc.) via Next.js Proxy (formerly Middleware)

### Content workflow

Pages have **draft** sections (editable in admin) and a **published snapshot** (served to visitors). Publishing: validate → create/update `PublishedPageSnapshot` (JSON blob) → record `PublishedPageRevision` → revalidate paths. Rollback restores from a revision. Preview mode: append `?preview=1` with a valid admin session.

### Section registry pattern

`src/site-pages/` files map DB section keys to React components with a default order and fallback content. Components in `src/Components/` are organized by page (`Home/`, `About/`, `Services/`, `Portfolio/`, `Blogs/`, `Contact/`) with shared sections in `src/Components/sections/`.

### Theme system

Colors and fonts are set as CSS custom properties on `<body>` from `SiteSettings` in the DB, consumed via `color-mix(in srgb, ...)`. Design tokens in `src/styles/tokens.css`. Tailwind CSS v4 with `@tailwindcss/postcss` plugin.

### Admin panel

Routes under `/admin/(protected)/` are wrapped by a layout that runs `requireAdminPageSession()`. Key components: `PageEditor.jsx` (section builder, ~1300+ lines), `SettingsEditor.jsx`, `ThemeEditor.jsx`, `MediaManager.jsx`.

## Gotchas

### Tailwind v4

This project uses **Tailwind CSS v4** (with `@tailwindcss/postcss`), not v3. There is no `tailwind.config.js`. Configuration lives in CSS:

- `src/index.css` — imports Tailwind via `@import "tailwindcss"`, loads Flowbite plugin (`@plugin "flowbite-react/plugin/tailwindcss"`), sources Flowbite classes (`@source "../.flowbite-react/class-list.json"`), and defines the `color-mix(in srgb, ...)` palette from theme CSS custom properties.
- `src/styles/tokens.css` — design tokens via `@theme { ... }` (spacing, radius, shadows, brand colors).

### Flowbite React postinstall

The `postinstall` script runs `flowbite-react patch`. After `npm install`, Flowbite patches itself into the Tailwind setup. Do not remove this. The `@plugin` and `@source` directives in `src/index.css` are required for Flowbite to work.

### MinIO (local S3)

Local development uses MinIO for S3 storage. Start it with:

```bash
MINIO_ROOT_USER=minioadmin MINIO_ROOT_PASSWORD=minioadmin123 minio server "$HOME/minio-data" --address ":9000" --console-address ":9001"
```

S3 credentials are in `.env` (`S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, etc.) and point to `http://127.0.0.1:9000`.

### Prisma workflow

After schema changes: `npm run prisma:generate` (or `prisma:migrate` to also create a migration). Use `prisma:push` only for rapid prototyping (skip migration file). The seed script is at `prisma/seed.mjs`.

### ES modules

The project uses `"type": "module"` in `package.json`. All scripts use `./node_modules/.bin/` prefix instead of `npx`.

### Dark mode

The root layout injects an inline `<script>` that reads `localStorage.theme` before React hydrates (prevents flash). The `<html>` uses `suppressHydrationWarning` to avoid mismatch warnings. Theme CSS custom properties are set as inline styles on `<body>` from DB-backed `SiteSettings`.

### `.env` is not tracked — use `.env.example`

The `.env` file is in `.gitignore`. Copy `.env.example` to `.env` for local development. Production secrets go into the platform's env var manager (Vercel dashboard, Railway secrets, etc.). The site works without a database via hardcoded defaults, so missing `DATABASE_URL` is handled gracefully.

### SMTP (contact form)

The contact form uses `nodemailer` with Gmail SMTP. SMTP credentials are in `.env` (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`). The form will silently fail if these are missing or invalid.

### No automated tests

Verification is manual: lint → build → browser check. There are no unit, integration, or e2e tests. No CI workflows exist in `.github/workflows/`.

### Commit conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/): `feat(scope):`, `fix(scope):`, `chore(scope):`, `docs:`, `style:`, `refactor:`. Never commit directly to `main`. Branch names: `feature/`, `fix/`, `chore/`.

## Key files to read first

- `src/lib/content.js` — all data access and content logic
- `src/lib/admin-auth.js` — auth mechanism
- `prisma/schema.prisma` — data model
- `src/app/layout.jsx` — root layout with site data fetching
- `src/site-pages/HomePage.jsx` — representative page composition
