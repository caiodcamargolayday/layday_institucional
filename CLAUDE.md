# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint via eslint-config-next
```

No test suite is configured.

## Stack

- **Next.js 16** with React 19 — App Router, TypeScript, `src/` directory
- **Tailwind CSS v4** via `@tailwindcss/postcss` (not the v3 CLI)
- **shadcn/ui** components live in `src/components/ui/` (built on `@base-ui/react`, not Radix)
- **Framer Motion** for page transitions and component animations
- **Zod v4** for API input validation

## Architecture

### Route layout

The app uses Next.js App Router with two distinct layout modes:

1. **Standard shell** — `src/app/layout.tsx` wraps everything in `ConditionalShell`, which renders `Navbar + children + ReviewsSection + Footer` for most routes.

2. **Standalone pages** — routes that should have no Navbar/Footer (e.g., campaign landing pages) must:
   - Live inside the `src/app/(standalone)/` route group
   - Have their path added to `STANDALONE_ROUTES` in `src/components/layout/ConditionalShell.tsx`

### Hostel data

All hostel content (names, descriptions, amenities, rooms, FAQs, pricing) is **hardcoded** in `src/app/hotel/view/[id]/[slug]/page.tsx` inside `HOSTEL_DATA`. The four current properties are:

| ID | Slug | Folder |
|----|------|--------|
| 1 | lay-day-canggu | `lay_day_canggu` |
| 17 | lay-day-uluwatu | `lay_day_uluwatu` |
| 18 | lay-day-gili-t | `lay_day_gilit` |
| 20 | coday-uluwatu | `coday_uluwatu` |

Images for each hostel are read from `public/<folder>/` at render time using `fs.readdirSync`. The same pattern is used on the homepage for `public/lay_day_home/`.

### API routes

- `GET /api/search` — filters the hardcoded hostel list (mock DB, no external service)
- `POST /api/creator-week-apply` — proxies form submissions to Google Sheets via Google Apps Script; requires the `CREATOR_WEEK_SHEETS_URL` environment variable

### Path alias

`@/*` resolves to `src/*` (configured in `tsconfig.json`).

## Brand

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#EBE6D8` | Page background |
| Primary | `#004A61` | Body text, nav on scroll |
| Dark | `#083248` | Headings, borders |
| Accent | `#EE5B2B` | CTAs, hover states |

Fonts: **Montserrat** (`font-sans`, `--font-sans`) for body; **Bebas Neue** (`font-heading`, `--font-heading`) for display/headings.
