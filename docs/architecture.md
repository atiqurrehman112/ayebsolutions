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
- `src/features/contact`: the Contact vertical slice. Sprint 6D owns the static `/contact` page, truthful contact methods, semantic UI-only project brief, service-interest fieldset, project timeline, immutable FAQ content, and ContactPage, WebPage, and FAQPage schemas. Native controls and disclosures keep the feature server-rendered; no submission, validation, API, fetch, storage, or delivery boundary is implied.
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

Create a folder under `src/features/<feature-name>` and colocate its components, actions, validation schemas, types, and tests. Expose only its intended public API from an `index.ts` file.

## Design system boundaries

The component library is exported through `src/components/index.ts` and narrower category barrels. UI primitives must remain domain-neutral, cards compose primitives, templates compose layout primitives, and features consume these layers. Lower layers never import feature code. See `docs/DESIGN_SYSTEM.md` for the public API and usage rules.

## Global shell boundaries

The root layout composes the shell but does not own navigation or company content. Immutable configuration in `src/config` is the single source for company identity, header navigation, footer groups, announcements, consent copy, and SEO defaults. Shell components may compose design-system primitives, but design-system primitives must not import shell components. See `docs/GLOBAL_SHELL.md` for the integration contract.
