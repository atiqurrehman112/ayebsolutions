# STABILIZATION-1 platform audit

Date: 2026-08-23

## Release decision

The application code, migration chain, production build, public routes, guest redirects, and clean-database reconstruction are healthy. The platform is not yet eligible for an unconditional release-candidate sign-off because the configured production Supabase project contains no profile row, so authenticated admin workflows cannot be exercised in production. Dedicated Categories, Tags, and Users admin routes requested by the audit inventory also do not exist; adding them would be feature work and was intentionally not performed during stabilization.

## Evidence collected

- Read the complete documentation set and audited the route, repository, action, validation, cache, authentication, email, media, and migration boundaries.
- Confirmed all 28 local migrations match the linked project, `db push --include-all --dry-run` is empty, and linked database lint reports no errors.
- Created a separate empty Supabase project, applied every migration, reset it, reapplied every migration, and loaded `seed.sql` without manual SQL. The disposable project was deleted after testing.
- Verified representative RLS behavior for admin, editor, viewer, inactive profiles, anonymous draft visibility, publication visibility, and admin-only deletion.
- Verified the public contact RPC creates one lead and one status-history row, and rejects duplicate payloads.
- Verified the CRM analytics RPC returns its complete object contract for an empty database.
- Built and served the production bundle locally. All implemented public routes and XML assets returned 200; all HTML routes contained one H1 and a canonical link.
- Checked 31 internal destinations extracted from rendered pages; none returned an error response.
- Production HTTP smoke testing returned 200 for every implemented public route and a 307 login redirect for protected admin routes.

## Corrections made

1. Ignored generated `supabase/.temp` CLI output in ESLint. Without this boundary, a local Supabase invocation caused 186 lint findings in vendored edge-runtime output.
2. Added `/team` path and `team` tag invalidation to every Team mutation so public ISR data changes immediately after create, edit, publication, feature, reorder, or delete operations.
3. Persisted failed contact-email delivery attempts with a failed status instead of silently omitting them from CRM email history. Database lead capture remains independent of email delivery.

## Route status

Implemented public routes verified: Home, About, Team, Services, six service details at build time, Solutions, Portfolio, Blog, Testimonials, Contact, Search, FAQ, Privacy, Terms, Cookies, Accessibility, sitemap, sitemap index, segmented sitemaps, RSS, and robots.

Implemented admin routes verified at the guest boundary: Dashboard, Portfolio, Blog, Media, Team, Founder, Testimonials, Site Settings, Contact Leads, CRM analytics, and Login. Guest access redirects to Login as intended.

Not implemented: `/admin/categories`, `/admin/tags`, and `/admin/users`. Middleware protects these prefixes before route resolution, so a guest sees Login; an authenticated user would reach a 404. These are release-scope gaps, not migration failures.

## Environmental limitations

- The in-app browser runtime reported no installed browser, so interactive browser console, hydration, focus, and authenticated dialog testing could not be claimed.
- Docker Desktop was unavailable, so a local `supabase start`/local shadow database was not possible. A genuinely empty hosted Supabase project was used instead, which provided stronger remote PostgreSQL migration and RLS evidence.
- Production has zero profiles and zero CMS/CRM records. Destructive or fabricated production seed data was not introduced.
- Actual Resend inbox delivery and Cloudinary upload/replace/delete were not executed against production because no authorized test account, recipient, or disposable production asset was available.

## Required release actions

1. Create the first Supabase Auth user through an approved administrative process and set its automatically created `profiles` row to `role = 'admin'`, `status = 'active'` using a controlled privileged operation.
2. Run the authenticated verification matrix in `FEATURE_VERIFICATION.md` with disposable records, then remove them.
3. Decide whether Categories, Tags, and Users are required products. Implement them in a separately authorized feature sprint or remove them from the release inventory.
4. Perform browser-based WCAG, hydration-console, Cloudinary, Resend-delivery, and Vercel deployment checks using authorized production credentials.
