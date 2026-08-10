# Sprint 9C Completion Report

## Scope

Sprint 9C replaces the hardcoded public service catalogue and six literal service-detail routes with published Supabase content. Existing typography, spacing, cards, CTA composition, themes, focus treatment, and motion rules remain intact. Sprint 9D was not started.

## Folder tree

```text
src/app/services/
├── page.tsx
├── loading.tsx
├── error.tsx
└── [slug]/page.tsx
src/features/services/components/
├── services-page.tsx
├── services-page.module.css
├── service-detail-page.tsx
└── service-detail-page.module.css
src/lib/
├── services/public-services.ts
├── database/repositories/services-repository.ts
└── actions/services.ts
supabase/migrations/202608100007_dynamic_services.sql
```

The six literal service route files and fourteen obsolete page-specific component/style/workflow files were removed. The feature barrel, database types, sitemap, architecture, and checklist were updated.

## Database and repository

- Added optional subtitle, benefits, workflow, deliverables, and FAQ service fields with safe empty defaults and JSON array constraints.
- Added normalized `service_media` relationships with ordering, captions, foreign keys, indexes, cascading cleanup, and role-aware RLS.
- Extended `ServicesRepository` with published listing, slug, sitemap, category, gallery-context, and related-service projections.
- Published listing search uses PostgreSQL ILIKE across title, summary, and description. Filters cover category and featured state; sorting covers display order, reverse display order, title A–Z, and title Z–A.

## Public listing

`/services` is a Server Component with an editorial hero, semantic GET search, category and featured filters, sorting, 12/24/48 pagination, result announcements, responsive cards, CMS icon resolution with an accessible visual fallback, technology previews, featured badges, canonical slug links, and a truthful empty state. CollectionPage and ItemList structured data are generated from the current published result page.

## Service detail

`/services/[slug]` is the only detail route. Database-backed static params and five-minute ISR support existing and newly published slugs. The template renders exactly one H1 plus icon, title, optional subtitle, description, features, technologies, benefits, workflow, deliverables, optimized Media Library gallery, FAQ, related services, and CTA. Missing optional CMS sections do not render, and no fallback claims or service content are invented.

Metadata is unique per published record with dynamic title, description, canonical, OpenGraph, Twitter, and gallery image data when available. Structured data includes Service, WebPage, BreadcrumbList, and FAQPage only when FAQ data exists. Draft, review, archived, and unknown records return the application 404.

## Cache and performance

Anonymous public queries respect Supabase RLS and are cached for five minutes under the `services` tag. Service create, update, delete, publish, unpublish, review, archive, restore, and slug changes invalidate that tag and relevant paths. Listing data is bounded, detail context and related queries run concurrently, images use `next/image`, and presentation remains server-rendered except for the required retry boundary.

## Accessibility and responsive review

Success templates each contain exactly one H1, semantic sections and lists, labeled native filters, visible focus rings, keyboard-accessible links and FAQ disclosures, useful loading/error/empty announcements, and meaningful image alternatives. Controls meet the existing 44px target convention. Layouts stack cleanly at 320px, progress through tablet and desktop grids, retain bounded reading widths at 4K, preserve dark/light contrast through tokens, and disable nonessential movement under reduced motion.

## UI/UX self-review

The first icon resolver handled only generic lowercase names and would have reduced existing CMS values such as `Code2`, `PanelsTopLeft`, and `Link2` to the same fallback. It was expanded with normalized aliases so existing content keeps a recognizable visual identity without allowing arbitrary component imports. The final listing emphasizes discovery controls and content hierarchy, while detail sections appear only when useful data exists. Removing duplicated page-specific compositions eliminates inconsistent spacing and keeps every published service within one premium editorial system.

## SEO review

The index uses dynamic CollectionPage/ItemList data. Detail pages use dynamic Service, WebPage, BreadcrumbList, and conditional FAQPage schemas. Canonicals, OpenGraph, Twitter metadata, and sitemap modification dates come from published CMS records. Unpublished content is excluded from every public repository query, static-param list, related query, and sitemap entry.

## Verification

- `npm run lint`: passed with zero warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- Production smoke test: `/services` returned HTTP 200 with exactly one H1 and canonical metadata.
- Source audit: zero TODO, FIXME, `console.log`, explicit `any`, direct Supabase UI calls, obsolete public service implementations, broken imports, or unused Sprint 9C code.
- Live service/gallery verification requires applying the migration and publishing CMS records in the configured Supabase project; no live provider outcome is claimed.

Sprint 9C is complete. Sprint 9D was not started.
