# Sprint 9B Completion Report

## Scope

Sprint 9B replaces the static public Insights registry and eight literal article routes with published Supabase content. The existing shell and monochrome design system remain intact. Sprint 9C was not started.

## Folder tree

```text
src/app/blog/
├── page.tsx
├── loading.tsx
├── error.tsx
└── [slug]/page.tsx
src/features/blog/components/
├── blog-page.tsx
├── blog-page.module.css
├── blog-article-page.tsx
└── blog-article-page.module.css
src/lib/
├── blog/public-blog.ts
├── database/repositories/blog-repository.ts
└── actions/blog.ts
supabase/migrations/202608100006_dynamic_blog.sql
```

The eight static article route files were removed. `src/app/sitemap.ts`, `src/types/database.ts`, `docs/architecture.md`, and `docs/CHECKLIST.md` were updated.

## Architecture and data

- `BlogRepository` owns all public queries; presentation components never access Supabase.
- Listing queries enforce `published`, PostgreSQL ILIKE search, category and keyword-tag filters, newest/oldest/featured sorting, and 12/24/48 server pagination.
- Detail queries enforce `published`, then load category, keyword tags, public published featured media, related posts, and previous/next posts concurrently.
- A forward migration adds optional author and featured-media fields, an immutable FAQ array, foreign-key cleanup, validation, and public-listing indexes.
- The anonymous public adapter respects RLS and wraps listing, filters, details, and sitemap slugs in five-minute caches tagged `blog`.

## Public experience

The index provides an editorial hero, semantic GET search, category/tag/sort/page-size controls, truthful result counts, responsive article cards, featured state, pagination, and an honest empty state. The dynamic article template supports title, excerpt, byline, publication date, reading time, category, keyword tags, optimized featured media, structured article body, share links, related posts, chronological navigation, CMS FAQs, conditional newsletter content, and the shared CTA. Optional regions do not render when their data is absent.

## Accessibility and responsive review

Both templates contain exactly one H1. The article is wrapped in semantic `article`, header, section, time, definition-list, and navigation elements. Controls have visible labels, native keyboard behavior, established focus rings, useful empty/loading/error announcements, and descriptive media alt text. Native FAQ disclosures avoid extra hydration. Layouts stack safely at 320px, move to editorial grids at tablet/desktop widths, retain bounded reading measures at 4K, and inherit reduced-motion and dark-mode behavior.

## UI/UX self-review

The first pass exposed taxonomy from the normalized junction even though the existing editor persists article tags as keyword arrays. That would have produced an empty filter in normal CMS use, so the public repository now derives and filters the same immutable keyword source written by the admin editor. The final layout preserves the existing visual vocabulary while improving scanning, filter clarity, article reading measure, featured-image treatment, and optional-content rhythm. No fabricated fallback author, date, image, FAQ, or article copy is inserted.

## SEO and performance

The index emits dynamic Blog structured data. Article metadata is generated from each published CMS record with canonical, OpenGraph, Twitter, dates, byline, tags, and featured image when present. Detail pages emit BlogPosting and BreadcrumbList, plus FAQPage only when CMS FAQs exist. The sitemap uses published database slugs and update times. Missing or non-published articles return 404. Server Components, ISR, tagged caches, parallel context reads, bounded result sets, and `next/image` keep hydration and delivery cost low; the retry boundary is the sole required client component.

## Verification

- `npm run lint`: passed with zero warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- Production smoke test: `/blog` returned HTTP 200 with one H1 and canonical metadata.
- Source audit: zero TODO, FIXME, `console.log`, explicit `any`, broken imports, or static public article registries.
- Structural audit: one H1 in each success template; published-only repository guards; dynamic canonical, sitemap, BlogPosting, BreadcrumbList, and conditional FAQPage output verified in source.
- Live CMS records require applying the migration to the configured Supabase project; no live database outcome is fabricated in this report.

Sprint 9B is complete. Sprint 9C was not started.
