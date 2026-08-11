# Architecture

## Principles

- Server Components are the default. A file uses `"use client"` only at an interaction boundary.
- Product code is grouped by feature rather than by technical layer alone.
- Shared primitives remain small, stable, and independent of product features.
- Environment access is centralized and validated with Zod.
- Imports use the `@/` alias for application code.

## Boundaries

- `src/app`: routing, layouts, metadata routes, and global styles.
- `src/features`: vertically sliced product capabilities. Features may depend on shared code but must not depend on each other implicitly.
- `src/features/home`: homepage sections and presentation. Sprint 4A provides the hero, Sprint 4B provides trust and social proof, Sprint 4C provides the services overview, Sprint 4D provides the portfolio and case-study preview, Sprint 4E provides the interactive AI automation showcase, Sprint 4F provides the development process, engineering approach, and quality-practices presentation, Sprint 4G provides industry solution areas, industry benefits, and technology mapping, Sprint 4H provides frequently asked questions and FAQ structured data, and Sprint 4I provides the final conversion CTA and non-submitting consultation preview. Each composition is exposed through the feature's public barrel; client state is isolated to established interaction primitives such as workflow selection, accessible disclosure, and form-control primitives.
- `src/features/services`: the services vertical slice. Sprint 5A owns the `/services` landing presentation; Sprint 5B owns `/services/web-development`; Sprint 5C owns `/services/ai-automation`; Sprint 5D owns `/services/custom-saas`; Sprint 5E owns `/services/ui-ux-design`; Sprint 5F owns `/services/api-integration`; and Sprint 5G owns `/services/maintenance-support`. Detail pages own their content, disclosures, FAQ source, and schemas while sharing service-page composition patterns. Interactive detail pages use narrow feature entry points so client code is not added to unrelated service routes; the Sprint 5C workflow explorer remains the only page-specific client boundary.
- `src/features/portfolio`: the portfolio vertical slice. Sprint 6A owns the static `/portfolio` landing page, immutable project disclosures, native interactive comparisons and FAQs, and portfolio-specific CollectionPage, ItemList, WebPage, and FAQPage schemas. Sprint 6B owns eight static project-detail routes backed by one typed immutable registry and one shared `PortfolioProjectPage`; detail routes contain only project selection and unique metadata export. Portfolio content does not import another feature; it composes shared design-system, shell, and SEO primitives.
- `src/features/about`: the About vertical slice. Sprint 6C owns the static `/about` page, immutable values, differentiators, process, technology, working-principle, and FAQ content, plus AboutPage, WebPage, and FAQPage schemas. Native disclosures preserve server-only FAQ interaction; the feature depends only on shared design-system, shell, SEO, configuration, and utility layers.
- `src/features/contact`: the Contact vertical slice. Sprint 6D established the `/contact` presentation, contact methods, project brief, service-interest fieldset, timeline, FAQ content, and structured data. Sprint 9F preserves that composition while isolating the form as the feature's only client boundary; validation, anti-spam controls, persistence, and email delivery remain server-only.
- `src/features/blog`: the Insights vertical slice. Sprint 6E owns the static `/blog` landing page, featured editorial preview, immutable categories and article previews, learning path, editorial principles, non-collecting newsletter notice, native preview and FAQ disclosures, and CollectionPage, Blog, WebPage, and FAQPage schemas. Content status remains explicit; the feature creates no article routes, subscription form, fetch, API, external asset, or client boundary.
- `src/features/blog` article boundary: Sprint 6F adds eight static article-detail routes backed by one strict immutable registry and one shared `BlogArticlePage`. Detail routes contain only a literal slug, generated metadata, and shared composition call. The registry owns unique editorial content, related navigation, FAQs, and SEO source data; the template owns semantic article structure plus BlogPosting, WebPage, FAQPage, and breadcrumb composition. Native disclosures preserve a zero-hydration article experience.
- `src/features/admin`: the administrative presentation boundary. Sprint 7A owns the `/admin` dashboard foundation, reusable workspace shell, immutable navigation, disconnected module cards, non-numeric status widgets, and activity states. Sprints 7B–7H add server-rendered management previews for portfolio, blog, services, testimonials, media, contact leads, and settings. Sprint 8A replaces the login preview with Supabase Auth, makes the shell session-aware, and adds real sign-in and sign-out actions while leaving every content module read-only. The nested admin layout and routes retain `noindex,nofollow`.
- `src/lib/supabase`: Supabase browser, server, and middleware adapters. Browser code receives only the public project URL and anonymous key. Server and middleware clients use `@supabase/ssr` cookie adapters; middleware refreshes authentication cookies before route decisions. The service-role key is server-only configuration and is not consumed by Sprint 8A.
- `src/lib/auth`: authentication use cases and policy. `session.ts` maps verified Supabase users into the shared auth contract; `auth.ts` owns sign-in, sign-out, and `requireAdmin`; `permissions.ts` maps the `admin`, `editor`, and `viewer` roles from protected `app_metadata` into immutable capabilities. Unknown or absent roles receive viewer permissions.
- `src/middleware.ts`: protects `/admin/:path*`, redirects guests to `/admin/login`, redirects authenticated users away from the login route, and leaves public routes outside its matcher. It also supplies the matched admin path to the nested layout so the login route can omit authenticated workspace chrome without client-side path detection. Content persistence, CRUD, uploads, lead storage, and settings writes remain explicitly outside Sprint 8A.
- `supabase/migrations`: the authoritative PostgreSQL CMS schema. Sprint 8B defines twelve normalized tables, enum contracts, foreign keys, constraints, indexes, timestamp/profile triggers, role helper functions, and Row Level Security policies. Schema changes must be forward-only migrations; Prisma is not part of the CMS persistence boundary.
- `supabase/seed.sql`: development-only, idempotent internal content. Seed records use explicit internal concept, prototype, draft, and configuration labels and must never be applied to production.
- `src/lib/database`: the typed database access boundary. `client.ts` binds the Supabase SSR client to the generated-style `Database` contract; repositories expose consistent query and lifecycle methods without being consumed by UI in Sprint 8B. RLS remains the final authorization boundary regardless of repository caller.
- `src/lib/validation`: Zod schemas for portfolio, blog, services, testimonials, contact leads, and settings. Validation contracts operate before future repository calls and do not perform persistence themselves.
- `src/components/ui`: shadcn/ui primitives.
- `src/components/cards`: compositional and domain-neutral card patterns.
- `src/components/layout`: reusable application shells and structural components.
- `src/components/navigation`: responsive navigation building blocks.
- `src/components/shell`: global header, footer, search, consent, announcements, breadcrumbs, transitions, and system states.
- `src/components/brand`: reusable identity marks.
- `src/components/seo`: safe structured-data rendering.
- `src/components/motion`: reduced-motion-aware animation primitives.
- `src/components/providers`: minimal client-side provider composition.
- `src/lib`: framework-agnostic helpers and infrastructure adapters.
- `src/actions`: shared server-action exports. Feature-specific actions stay with their feature.
- `src/hooks`: reusable client hooks. Feature-specific hooks stay with their feature.
- `src/config`: immutable application configuration.
- `src/types`: genuinely shared TypeScript contracts.
- `src/config/design-tokens.ts`: runtime-safe token values shared with animation code.
- `supabase`: PostgreSQL migrations and development-only seed data.
- `public`: static assets organized by asset type.

## Adding a feature

## Sprint 8C portfolio integration

The `/admin/portfolio` route is a database-backed Server Component. It delegates paginated search and filtering to `PortfolioRepository`; interactive create, edit, lifecycle, and delete controls are narrow Client Components. `src/lib/actions/portfolio.ts` validates every mutation with Zod, checks authenticated role permissions, calls the repository, and revalidates both admin and public portfolio paths. Editors manage content, administrators may also permanently delete, viewers remain read-only, and PostgreSQL RLS remains the final authorization boundary.

## Sprint 8D blog integration

The `/admin/blog` route follows the same persistence boundary: the Server Component loads paginated articles and category options through `BlogRepository`, while accessible article and lifecycle dialogs are the only client boundaries. `src/lib/actions/blog.ts` validates form data with the shared Blog Zod contracts, verifies role capabilities, calls the repository, and revalidates the admin index, public Blog index, and affected old/new article slugs. Blog search uses a database-maintained search projection covering title, excerpt, content, and tag keywords; author-role filtering resolves authenticated profile ownership on the server. Editors create, edit, review, publish, unpublish, archive, and restore; permanent deletion remains administrator-only under both application checks and RLS.

## Sprint 8E services integration

The `/admin/services` route is a database-backed Server Component that delegates filtered, sorted, count-aware pagination and category retrieval to `ServicesRepository`. `src/lib/actions/services.ts` is the sole mutation boundary: it reuses the service Zod contracts, checks role capabilities, delegates writes and lifecycle transitions to the repository, and revalidates the admin catalogue, public Services index, and affected old/new service slugs. Accessible create/edit and row lifecycle dialogs are narrow client boundaries. Existing feature and technology arrays are preserved by the editor even though their dedicated editing experience remains outside this sprint. Editors manage content and publication states, administrators may also permanently delete, viewers remain read-only, and RLS remains authoritative.

## Sprint 8F testimonials integration

The `/admin/testimonials` route loads authenticated, paginated moderation data through `TestimonialsRepository`; components never access Supabase directly. The repository owns search, filters, deterministic sorting, CRUD, approval, publication, archive, restore, and featured-placement persistence. `src/lib/actions/testimonials.ts` validates input, checks role permissions, applies consent-aware workflow rules, records approver identity, and revalidates the admin route plus homepage testimonial consumers. Accessible create/edit, lifecycle, featured, and destructive-confirmation controls are the only client boundaries. A database constraint independently prevents publication without approval, verified consent, and a publication timestamp. Administrators may permanently delete, editors manage content and moderation, viewers remain read-only, and RLS remains authoritative.

## Sprint 8G media integration

The `/admin/media` route server-renders paginated Supabase metadata through `MediaRepository`. Cloudinary secrets and binary operations are isolated in `src/lib/cloudinary/media.ts`; browser code never receives credentials. `src/lib/actions/media.ts` is the only upload, replace, rename, and deletion boundary and combines role checks, file/metadata validation, Cloudinary operations, repository persistence, compensating cleanup, and application-wide cache revalidation. Upload and replacement files are limited to an explicit allowlist and 25 MB. Editors and administrators manage media, viewers remain read-only, and the media RLS delete policy intentionally permits content editors for this module.

## Sprint 8H contact-leads integration

The `/admin/contact-leads` route server-renders count-aware, paginated lead records through `ContactLeadsRepository`. Search, status/priority/assignment/date filters, deterministic sorting, assignee discovery, status history, and email history remain in the repository boundary. `src/lib/actions/contact-leads.ts` is the sole mutation and delivery boundary: it validates input with Zod, applies authenticated role checks, calls the repository, invokes the server-only Resend adapter, records successful delivery history, and revalidates the CRM route. The forward migration normalizes the lifecycle to New, Contacted, Qualified, Proposal Sent, Won, Lost, and Archived while preserving legacy rows through an explicit mapping. Status and email events use append-only related tables so audit history is queryable without rewriting the lead record. Administrators and editors manage, assign, respond, and archive; permanent deletion remains administrator-only; viewers remain read-only; RLS remains authoritative.

## Sprint 8I site-settings integration

Sprint 8B originally created `site_settings` as a generic key/value foundation. Sprint 8I deliberately superseded it with the singleton `site_configuration` table as the typed production configuration source. Scalar concerns use dedicated PostgreSQL columns, Media Library selections use foreign keys, and only inherently structured header/footer navigation uses validated JSON. `SettingsRepository` owns the configuration and referenced public-media projection; `src/lib/actions/settings.ts` is the sole write boundary and requires the administrator role before Zod validation output reaches Supabase. Editor and viewer roles remain read-only under both application controls and RLS.

Migration `202608110002_reconcile_site_settings.sql` is the compatibility boundary for deployments that applied Sprint 8B but missed Sprint 8I. It idempotently creates or repairs the final typed singleton, copies recognized legacy keys, retains `site_settings` unchanged for rollback/audit, and restores RLS, triggers, indexes, homepage fields, and analytics fields. Application runtime code must not be switched back to the legacy key/value table.

Public rendering consumes one cached, published settings projection through `getPublicSiteSettings()`. The root layout, metadata defaults, Organization schema, language, logo/favicon/OpenGraph media, header, search, footer, contact/social information, feature-aware sitemap, robots policy, newsletter visibility, homepage AI visibility, and maintenance state share that projection. Immutable source configuration remains only as a fail-safe when Supabase is unconfigured or temporarily unavailable. The cache uses a settings tag and a bounded revalidation interval; successful writes invalidate the tag and application layout.

## Sprint 9A dynamic public portfolio

The public `/portfolio` route and `/portfolio/[slug]` detail boundary use `PortfolioRepository` exclusively. The listing delegates published-only ILIKE search, category/tag filters, deterministic newest/oldest/featured/alphabetical sorting, and bounded pagination to PostgreSQL. Detail reads compose a published project with its category, tags, normalized Media Library gallery, and related published projects. Missing or non-published slugs resolve through `notFound()` and RLS remains authoritative.

`src/lib/portfolio/public-portfolio.ts` isolates the anonymous Supabase client and wraps listing, filter, slug, and detail projections in tagged five-minute caches. Dynamic slugs use database-backed `generateStaticParams` plus ISR fallback. Portfolio mutations invalidate the shared `portfolio` tag, listing paths, and both old/new slug paths. The homepage featured-work preview and sitemap consume the same published CMS source; the former static project registries and eight literal route modules no longer exist.

## Sprint 9B dynamic public blog

The public `/blog` index and `/blog/[slug]` detail route use `BlogRepository` as their only persistence boundary. The repository owns published-only ILIKE search, category and keyword-tag filtering, deterministic newest/oldest/featured ordering, bounded pagination, published slug lookup, Media Library projection, related articles, and chronological previous/next navigation. Draft, review, archived, and unknown slugs cannot cross the published query boundary and resolve through `notFound()`.

`src/lib/blog/public-blog.ts` isolates anonymous, RLS-governed reads behind five-minute caches tagged `blog`. Article mutations invalidate that tag plus the index and affected old/new slug paths. The sitemap now derives article URLs and modification dates from published rows. One dynamic template replaced all eight literal article routes and renders body, byline, media, tags, FAQ, newsletter, related, and navigation regions only when their CMS data exists.

## Sprint 9C dynamic public services

The public `/services` listing and `/services/[slug]` detail boundary use `ServicesRepository` exclusively. Published listing queries provide PostgreSQL ILIKE search, category and featured filtering, deterministic display-order/reverse/title sorting, and bounded pagination. Detail reads combine the published service with its published category, ordered public Media Library gallery, and related published services. Draft, review, archived, and unknown slugs resolve through `notFound()`.

`src/lib/services/public-services.ts` contains the anonymous RLS-governed client and five-minute caches tagged `services`. Service mutations invalidate the tag plus listing and affected old/new detail paths. A normalized `service_media` junction keeps gallery order and captions independent of media metadata. Optional subtitle, benefits, process, deliverables, FAQ, and gallery fields render only when populated. The six literal route modules and their duplicated feature implementations were removed; the sitemap now uses published service slugs and modification dates.

## Sprint 9D dynamic homepage

The root page is a server-rendered orchestration boundary over `SettingsRepository`, `ServicesRepository`, `PortfolioRepository`, `BlogRepository`, and `TestimonialsRepository` projections. It loads settings first to obtain feature flags and bounded section limits, then resolves service, portfolio, blog, and testimonial sections concurrently with independent failure containment. React components receive typed rows and never access Supabase.

Site configuration owns hero copy, badge, CTA links, hero/background Media Library references, statistics, trust indicators, per-section limits, and final CTA copy. Published services are featured-first by display order; portfolio is featured and published; blog is latest published; testimonials require published status, approval, and verified consent. The global footer already consumes the same settings projection for contact, social, copyright, navigation, and business information. Five-minute caches carry their domain tag plus `homepage`, and settings retain both `site-settings` and `settings` compatibility tags.

## Sprint 9E dynamic public testimonials

The public `/testimonials` route delegates all reads to `TestimonialsRepository`. Its public projection applies published status, approved moderation, and verified consent before search, exact rating, featured, optional industry, deterministic sort, and bounded pagination. Public avatar and company-logo fields reference published, public Media Library records and remain absent when unavailable.

`src/lib/testimonials/public-testimonials.ts` wraps listing and industry projections in five-minute caches tagged `testimonials`; homepage feedback uses the same repository and a settings-controlled limit, with featured rows ordered before display order. Testimonial mutations invalidate both `testimonials` and `homepage`. The public route emits Organization, BreadcrumbList, and one Review schema per visible row, while the sitemap respects the testimonials feature toggle.

## Sprint 9F production contact form

The public contact form is a minimal React action-state boundary over `src/lib/actions/contact.ts`. The Server Action performs strict Zod validation, same-origin verification, honeypot detection, HMAC-based request and payload fingerprinting, and delegates the write to `ContactLeadsRepository`; UI code never imports Supabase. A service-role database client exists only in server code and is used for this unauthenticated, validated write path.

Migration `202608100010_production_contact_form.sql` adds the lead phone field, a private submission-attempt ledger, and a security-definer transaction that serializes submissions by IP fingerprint, applies a five-per-fifteen-minute limit, rejects matching payloads for thirty minutes, creates the New/medium-priority lead, appends its initial audit event, and records the anti-spam attempt atomically. Raw IP addresses are never persisted.

After commit, Resend independently attempts the customer acknowledgement and internal notification; the latter uses the customer address as reply-to. Successful deliveries are appended to existing email history. Delivery or history-recording failures cannot roll back or hide a saved lead. Successful writes invalidate `/admin/contact-leads` and the `contact-leads` cache tag.

## Sprint 10A complete Media Library integration

`src/components/media/cms-media.tsx` is the single public rendering boundary for Media Library records. It renders raster images and SVGs through `next/image`, videos through semantic native controls, and PDFs/documents as accessible download links. Cloudinary image URLs are transformed for automatic format, bounded responsive width, and quality; raster assets receive a Cloudinary low-quality blur source. CMS width, height, MIME type, filename, and alt metadata remain authoritative, while an explicit neutral placeholder preserves geometry when no asset exists.

`src/lib/media/public-media.ts` provides five-minute, `media`-tagged role resolution using `usage_locations` or tags. Page roles such as `about.hero`, `about.og`, `contact.hero`, and `contact.og` let pages without dedicated relational media columns consume managed assets without hardcoded URLs or direct UI queries. The About and Contact code-rendered visuals remain graceful fallbacks when those roles are unassigned; no route or asset URL is fabricated.

Portfolio and service listing repositories batch the first ordered gallery asset as each card cover. Blog listing queries batch featured-media records, and testimonial projections batch avatars and company logos. Detail galleries support images, SVGs, videos, PDFs, and documents through the same renderer. Homepage hero/background, portfolio, blog, and testimonial sections reuse these projections; header/footer branding and global favicon come from Settings Media Library relations.

Global, listing, detail, About, and Contact metadata use transformed Media Library images for OpenGraph and Twitter. Organization, WebPage, BlogPosting, portfolio ItemList, service ItemList, and gallery structured data include only eligible image assets. All media-dependent caches carry the `media` tag, and upload, replace, rename, or delete actions invalidate that tag plus the shared layout. The repository currently has no public Team route, so Sprint 10A does not create one.

## Sprint 10B production discovery and observability

Global search uses `src/lib/search/public-search.ts` as a server-only coordinator over the three published repository projections. The `/search` Server Component resolves grouped service, portfolio, and blog results concurrently; its small client controller only debounces URL state and never imports a repository, Supabase client, or browser-fetch layer. The header command dialog provides the global entry point and a progressively enhanced GET form. Search pages are intentionally `noindex,follow` to prevent query-result index pollution.

The canonical metadata sitemap remains the broad crawler entry, while `/sitemap-index.xml` references domain-specific service, portfolio, blog, and Media Library image maps. All XML endpoints are generated from published CMS projections with five-minute cache headers. `/rss.xml` exposes only published blog articles. `robots.txt` advertises both the canonical sitemap and sitemap index. Root metadata exposes language alternates for an hreflang-ready single-locale baseline, Search Console verification, Organization and WebSite/SearchAction structured data.

Analytics is configured exclusively through the typed Settings CMS. Google Analytics or Tag Manager, Microsoft Clarity, Plausible, and Vercel Web Analytics scripts are absent unless their configuration is published. Migration `202608110001_production_analytics.sql` adds Search Console verification, Plausible domain, and the Vercel Analytics toggle without introducing unrelated JSON storage. Existing repository cache tags, five-minute ISR, `next/image`/Cloudinary transformations, Geist self-hosted font integration, route loading/error boundaries, and link prefetching remain the performance foundation.

## Cleanup CP1 static global shell

The public global shell is intentionally independent of Supabase. `src/app/layout.tsx` owns immutable metadata and Organization/WebSite schemas from `src/config/site.ts` and `src/config/company.ts`. `SiteHeader` reads the hardcoded navigation configuration directly; `SiteFooter` reads the hardcoded company, footer-navigation, social, and consultation configuration directly. Neither accepts settings, branding, navigation, footer, media, feature-flag, or maintenance props.

`getPublicSiteSettings()` is retained as a compatibility adapter for completed public feature modules that already consume its typed shape, but it now returns the immutable fallback object without importing Supabase, environment credentials, cache APIs, or `SettingsRepository`. This prevents changes to Portfolio, Blog, Testimonials, or Contact Leads while removing their indirect runtime dependency on site configuration persistence. The authenticated admin settings module and its repository remain available for future administration work, but they do not participate in public rendering or the global shell.

## Cleanup CP2 static marketing pages

The About, Services, service-detail, Solutions, Contact presentation, FAQ, Privacy, Terms, Cookies, and Accessibility routes are static marketing boundaries. Their route modules use immutable company, site, and marketing configuration and do not import Site Settings, settings repositories, feature flags, homepage configuration, public media-role lookups, or service repositories. Existing About, Contact, Services, and service-detail presentation components remain in place; optional media inputs receive `null` and retain their code-rendered fallbacks.

`src/config/marketing.ts` is the immutable service catalogue for Web Development, AI Automation, SaaS Development, UI/UX Design, E-commerce, and Custom Software. Both the homepage services section and `/services` consume this one source. Homepage Portfolio, Blog, and Testimonials remain CMS-backed with independent error containment; their existing components render honest static empty states when no records are available. The contact form remains the existing client interaction boundary over the production Server Action, validation, CRM persistence, and Resend workflow.

## Cleanup CP3 Settings CMS removal

CP3 supersedes the historical Settings CMS sections above. The Settings admin route, editor, Server Action, repository, validation contract, cache adapter, settings-specific database TypeScript projection, navigation entry, and dedicated settings documentation have been removed. Historical forward migrations remain untouched so deployed database history is never rewritten; application runtime code no longer addresses the retired configuration tables. The development seed no longer inserts settings records.

Public metadata, canonical URLs, navigation, footer content, branding, homepage marketing content, robots output, sitemaps, and RSS identity now read immutable configuration from `src/config`. Homepage Portfolio, Blog, and Testimonials remain repository-backed with their existing failure containment. Authentication, roles, middleware, Portfolio CMS, Blog CMS, Testimonials CMS, Media Library, Contact Leads CRM, and contact submission remain unchanged.

The primary admin dashboard and sidebar expose Portfolio, Blog, Testimonials, Media, and Contact Leads. The public shell and static marketing content can render without Supabase.

## Cleanup CP4 dead-code removal

CP4 removes the orphaned Services administration route, components, mutation actions, and validation contract so the protected admin surface exactly matches Dashboard, Portfolio, Blog, Testimonials, Media, and Contact Leads. The static public Services catalogue is unchanged. Its narrow published repository projection remains only for global search and Media Library image discovery.

The source tree no longer carries empty action/hook barrels, unused component category barrels, obsolete design-system components, the superseded navigation component family, the browser Supabase adapter, or the unused public media-role helper. Shared component modules now expose only their consumed primitives while retaining the original implementations and class names of those primitives. Generated-style database types remain exported only when another source module consumes them.

Package dependencies were reduced alongside their last consumers. Authentication, middleware, retained CMS repositories/actions, Cloudinary, `CmsMedia`, Portfolio media, Blog media, Testimonial media, Contact Leads, and the public contact submission path are preserved.

Create a folder under `src/features/<feature-name>` and colocate its components, actions, validation schemas, types, and tests. Expose only its intended public API from an `index.ts` file.

## Design system boundaries

The component library is exported through `src/components/index.ts` and narrower category barrels. UI primitives must remain domain-neutral, cards compose primitives, templates compose layout primitives, and features consume these layers. Lower layers never import feature code. See `docs/DESIGN_SYSTEM.md` for the public API and usage rules.

## Global shell boundaries

The root layout composes the shell but does not own navigation or company content. Immutable configuration in `src/config` is the single source for company identity, header navigation, footer groups, announcements, consent copy, and SEO defaults. Shell components may compose design-system primitives, but design-system primitives must not import shell components. See `docs/GLOBAL_SHELL.md` for the integration contract.
