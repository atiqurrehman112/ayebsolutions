# Sprint 9A Completion Report

## Scope

Sprint 9A replaces static public portfolio records and literal project routes with published Supabase content. Existing design tokens, typography, spacing, cards, CTA primitives, theme behavior, and reduced-motion patterns remain in use. No later sprint was started.

## Folder tree

```text
src/app/portfolio/
├── page.tsx
├── loading.tsx
├── error.tsx
└── [slug]/page.tsx
src/features/portfolio/components/
├── portfolio-page.tsx
├── portfolio-page.module.css
├── portfolio-project-page.tsx
└── portfolio-project-page.module.css
src/lib/
├── database/repositories/portfolio-repository.ts
├── portfolio/public-portfolio.ts
└── actions/portfolio.ts
supabase/migrations/202608100005_dynamic_portfolio.sql
```

The eight static project route files and both public static project registries were removed. The homepage portfolio preview now accepts published CMS rows.

## Database and repository

- Added typed client goals, published results, and FAQ fields to portfolio projects.
- Added a normalized `portfolio_project_media` junction with media foreign keys, ordering, captions, indexes, cascading cleanup, and RLS.
- Extended `PortfolioRepository` with published listing, slug, category, tag, context, related-project, and sitemap queries.
- Search covers title, summary, and project type with PostgreSQL ILIKE.
- Filters cover published categories and project tags; sorting supports newest, oldest, featured, and alphabetical order; pagination is server-side.

## Public listing

The portfolio index is a Server Component driven entirely by Supabase. It contains an editorial hero, semantic query form, category and tag filters, sorting, 12/24/48 pagination, featured badges and emphasized featured-card layout, truthful empty results, CMS technology badges, dynamic project links, and CollectionPage/ItemList structured data. No mock or fallback project records are rendered.

## Project detail

`/portfolio/[slug]` is the only detail route. It uses database-backed static params with five-minute ISR and on-demand generation for newly published slugs. Each published project renders exactly one H1, breadcrumbs, project metadata, client goals, challenge, solution, capabilities, technology stack, tags, an optimized Media Library gallery, results, CMS FAQs, related published projects, and the shared consultation CTA. Empty optional CMS areas use explicit non-fabricated states rather than invented content.

Metadata is unique per CMS row and includes canonical, OpenGraph, Twitter, publication/modification dates, and gallery imagery where available. Structured data includes CreativeWork, WebPage, BreadcrumbList, and FAQPage when FAQ content exists. Missing, draft, review, and archived slugs return the application 404.

## Cache and integration

Public portfolio reads use an anonymous Supabase client, respect RLS, and are cached with the `portfolio` tag for five minutes. Create, update, delete, publish, unpublish, archive, restore, review, and slug changes invalidate the tag and relevant admin/list/detail paths. The sitemap loads published slugs and database modification dates. The homepage featured-work section now uses only featured, published CMS records.

## Accessibility and responsive review

The listing and detail page each expose exactly one H1, semantic landmarks/article structure, labeled search and filters, keyboard-accessible links and native FAQ disclosures, visible focus rings, descriptive image alt text, semantic lists, and truthful empty/loading/error states. The layout scales from 320px through 4K: controls stack, project cards move through one/two/three-column layouts, featured work gains width without changing reading order, metadata collapses safely, and gallery images preserve aspect ratio. Existing reduced-motion CSS disables hover displacement and disclosure animation.

## UI/UX self-review

The first integration retained database behavior but left the homepage’s old static showcase intact and gave featured projects the same visual weight as every other card. Both issues were corrected. Homepage and portfolio now share the CMS source, featured projects receive measured editorial emphasis, filters stay above results, empty states remain helpful, and optional detail content never creates false completeness. The visual language remains consistent with the existing monochrome portfolio system rather than introducing a new aesthetic.

## SEO and performance

Published detail routes use SSG/ISR where possible; the query-driven listing remains server-rendered. Project images use `next/image` and Cloudinary’s configured remote pattern. Repository projections are bounded, independent detail context reads run concurrently, the homepage fetches only six featured records, and no client component was added to portfolio presentation. Sitemap and metadata are database-driven and unpublished records remain undiscoverable.

## Verification

- `npm run lint`: passed with zero warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed; `/portfolio/[slug]` is SSG/ISR and the query-driven `/portfolio` index is server-rendered.
- `git diff --check`: passed (line-ending normalization notices only; no whitespace errors).
- Source audit: zero TODO, FIXME, `console.log`, explicit `any`, broken imports, or legacy static project records in the public portfolio boundary.
- Structural audit: exactly one H1 in both listing and detail templates.
- Live data verification requires applying the migration and publishing CMS records in the configured Supabase project. No fabricated record or provider result is claimed.

Sprint 9A is complete. No later sprint was started.
