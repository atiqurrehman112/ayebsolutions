# Sprint 13C Completion Report

## Summary

Sprint 13C delivers a production singleton Founder Profile CMS and removes hardcoded founder identity content from the public Team experience. The existing Team CMS remains independent. Founder and Team reads fail independently, so an unpublished or unavailable Founder produces an honest fallback without hiding published Team members.

No Sprint 13D work was started.

## Files changed

### Database

- `supabase/migrations/202608150001_founder_profile_cms.sql` — original singleton table, audit fields, Media Library references, constraints, indexes, timestamp trigger, and RLS.
- `supabase/migrations/202608160001_expand_founder_profile.sql` — forward-only expansion for short introduction, location, featured badge, display order, SEO title/description, and OpenGraph Media Library image. Existing professional headline copy safely initializes the new required introduction.

### Data and application boundaries

- `src/types/database.ts`
- `src/lib/validation/founder.ts`
- `src/lib/database/repositories/founder-repository.ts`
- `src/lib/actions/founder.ts`
- `src/lib/founder/public-founder.ts`

### Admin

- `src/app/admin/founder/page.tsx`
- `src/app/admin/founder/loading.tsx`
- `src/app/admin/founder/error.tsx`
- `src/features/admin/components/admin-founder.tsx`
- `src/features/admin/components/founder-profile-editor.tsx`
- `src/features/admin/components/admin-founder.module.css`

### Public Team and documentation

- `src/app/team/page.tsx`
- `src/features/team/components/team-page.tsx`
- `docs/architecture.md`
- `docs/CHECKLIST.md`
- `docs/SPRINT_13C_COMPLETION.md`

## Architecture decisions

- Founder remains a dedicated singleton, not a Team member collection. A checked unique singleton key prevents a second row.
- Schema evolution is forward-only. The original migration was not edited; the revised specification is implemented by a new migration that preserves existing content and data.
- `FounderRepository` owns singleton, published, and upsert-style persistence. React components never query Supabase.
- `saveFounderProfile` is the sole mutation boundary. It validates all values with Zod, derives lifecycle intent server-side, checks existing role permissions, records audit ownership, and revalidates Admin, Team, and Founder caches.
- Profile, cover, and OpenGraph assets remain Media Library foreign keys backed by Cloudinary. No Supabase Storage upload path was introduced.
- The public projection reads only the published singleton under anonymous RLS, resolves a fixed number of optional media records concurrently, and uses the existing five-minute `founder`/`media` tagged cache.
- Team metadata and page rendering reuse the same cached loader. Missing optional CMS fields do not render.

## Admin experience

- One responsive editor covers identity, title, introduction, structured biography, location, contact channels, social links, experience, expertise, direction, availability, SEO, and media.
- Biography authoring supports safe paragraph, subheading, quote, and list formatting without accepting executable HTML.
- A sticky desktop/live inline mobile preview reflects identity, image, badge, availability, introduction, and biography changes.
- `beforeunload` protection warns when an editor leaves with unsaved changes.
- Separate Save draft, Publish, and Unpublish actions make content state explicit.
- Pending, validation-error, persistence-error, success, viewer-read-only, and first-record empty states remain visible and screen-reader announced.
- Only published image records from the existing Media Library can be selected.

## Public Team experience

- `/team` continues to have exactly one H1 and remains server-rendered with five-minute ISR.
- The Founder spotlight renders published photo, optional cover, name, professional title, short introduction, safely structured biography, location, availability/featured badge, expertise, factual experience values, statements, and available contact/social links.
- Unpublished or absent Founder data renders an honest “Founder profile coming soon” state; no identity or metric is fabricated.
- Broken/missing media falls back to the existing accessible monogram treatment.

## SEO review

- Existing Team metadata, canonical URL, Organization, WebPage, and BreadcrumbList behavior is preserved as the fallback.
- A published Founder may supply bounded SEO title, description, and OpenGraph Media Library image.
- Twitter changes to a large-image card only when the CMS supplies an eligible OpenGraph image.
- Person schema uses only published CMS values and conditionally includes description, image, email, location, expertise, and social URLs.
- Person schema is omitted when the Founder is absent or unpublished.
- `/admin/founder` remains `noindex,nofollow` and absent from sitemaps.

## Accessibility review

- Visible labels, semantic fieldsets/legends, native controls, inline error associations, live status messaging, and minimum target sizing are preserved.
- The live preview has an explicit accessible heading and meaningful media alternative.
- Public biography headings, paragraphs, lists, and quotes render as semantic elements.
- Links retain keyboard access and visible focus; external links retain safe relationship attributes.
- Dark/light theme tokens and reduced-motion behavior remain consistent with the established Team/Admin design systems.

## Performance notes

- `/team` remains a Server Component; only the protected Admin editor hydrates.
- Founder and Team load concurrently.
- Metadata and page rendering use the same tagged Founder loader rather than separate presentation queries.
- Optional media resolution is concurrent and bounded to three singleton relationships, preventing N+1 behavior.
- `CmsMedia` retains Cloudinary transformations, dimensions, responsive sizing, and Next.js image optimization.

## UI self-review

The initial editor placed all fields in one long undifferentiated form and offered no representation of the public result. The refined editor introduces clear editorial groups, a bounded reading width, a sticky live preview on large screens, a stacked preview on smaller screens, explicit lifecycle actions, concise field guidance, and consistent surface/radius/focus treatments. The public profile preserves the established premium Founder centerpiece rather than introducing a competing visual language.

## Verification results

- `npm run lint`: passed with zero warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- Supabase migration dry run: only the Founder expansion migration pending before application.
- Supabase linked schema lint: passed with no warnings before migration application.
- Source audit: zero TODO, FIXME, `console.log`, explicit `any`, direct Supabase UI access, duplicate Founder repositories, or broken imports.
- Production verification includes migration application, Admin singleton read/save, draft/publish transitions, Media Library selection, `/team` published output, unpublished fallback, and deployment smoke tests.

## Remaining work

- Rich content intentionally uses a safe structured-text authoring convention rather than adding a large third-party WYSIWYG dependency. A dedicated portable rich-text document model may be considered only in a future explicitly assigned sprint.
- The singleton has a display-order field for schema consistency and future composition, but no Founder list exists and none was created.

Sprint 13C is complete. Sprint 13D was not started.
