# Sprint 13D Completion — Global Site Settings CMS

## Summary

Sprint 13D restores global configuration as a deliberately typed, production singleton. It extends the existing canonical `site_configuration` record rather than reviving the legacy `site_settings` key/value store or introducing a third competing table. Existing production values are preserved with `coalesce`, the fixed singleton UUID remains authoritative, and a unique constant index provides an additional database-level one-row guarantee.

The protected Site Settings workspace covers General, Contact, Social, SEO, Analytics, Footer, Announcement Banner, and Maintenance configuration. Brand and sharing assets are selected exclusively from published Cloudinary-backed Media Library records. Only administrators can save or publish global configuration; validation, persistence, cache invalidation, and audit identity remain outside React presentation code.

## Files changed

- Added `supabase/migrations/202608160002_global_site_settings.sql`.
- Added the typed Site Settings repository, Zod validation, Server Action, and cached public projection.
- Added `/admin/site-settings` with loading/error states and the responsive settings editor.
- Updated database types and repository/admin barrels.
- Updated the protected admin navigation and dashboard discovery card.
- Integrated the singleton into the root shell, header, announcement, footer, favicon, metadata, Organization/WebSite schema, homepage schema, Contact page, and contact notification recipient.
- Updated `docs/architecture.md` and `docs/CHECKLIST.md`.

## Architecture decisions

- `site_configuration` remains the sole canonical runtime table; `site_settings` remains legacy migration history only.
- The record ID remains `00000000-0000-4000-8000-000000000001`; no create/delete UI exists.
- Reads use one tagged five-minute server cache and resolve the bounded media relationship set concurrently.
- Mutations follow Admin UI → Server Action → Zod → repository → Supabase → cache revalidation.
- Global navigation topology remains code-owned; mutable identity and business information are CMS-owned.
- Missing or unpublished configuration produces neutral, layout-safe fallbacks and never fabricates media URLs.

## Accessibility and UI review

The settings page has one H1, fieldset/legend grouping, explicit labels, inline field errors, an `aria-live` action result, visible focus rings, keyboard-native controls, responsive single-column collapse, dark-theme token usage, and reduced-motion protection. The public shell preserves the existing hierarchy and interaction design. Optional public values render only when present.

## SEO and performance review

Root metadata, favicon, OpenGraph defaults, Twitter defaults, Organization schema, WebSite schema, canonical base, language, logo, contact details, and social profiles now originate from the published singleton. The cache is shared across metadata, layout, and page consumers, tagged with `site-settings` and `media`, and retains five-minute ISR semantics. No public presentation component queries Supabase.

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed; `/admin/site-settings` is present as a protected dynamic route and public routes retain five-minute ISR.
- `git diff --check`: passed (line-ending notices are informational on Windows).
- Forbidden-pattern audit: passed for TODO, FIXME, `console.log`, and explicit `any`.
- Linked Supabase migration: `202608160002` applied and local/remote history matches.
- Anonymous REST verification: HTTP 200, exact count `1` for the published canonical singleton.

## Scope confirmation

No authentication, middleware, database history, existing CMS domain, or unrelated business workflow was redesigned. Sprint 13E was not started.
