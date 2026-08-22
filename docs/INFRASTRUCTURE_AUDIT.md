# Infrastructure Audit — INFRA-1

**Date:** 2026-08-15
**Scope:** Supabase, authentication, Cloudinary media, contact email, local development, Vercel, and GitHub readiness. No feature work or UI redesign was performed.

## Executive status

The application architecture is production-capable, but the newly linked Supabase project is not fully initialized and the local application environment is not connected to it. The immediate admin-login failure is caused by missing `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` values in `.env.local`; that file currently contains only Vercel CLI state. The linked database is also two migrations behind the repository.

| Area                          | Status                       | Finding                                                                                                                                                                                                     |
| ----------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Migration history             | Ready                        | 18 ordered forward migrations are present; none were deleted or rewritten.                                                                                                                                  |
| Linked database               | Action required              | Dry run reports `202608120001_team_cms.sql` and `202608150001_founder_profile_cms.sql` pending.                                                                                                             |
| Schema quality                | Pass                         | `supabase db lint --linked --level warning` returned no schema errors.                                                                                                                                      |
| Local Supabase                | Blocked locally              | Docker Desktop or Podman is not installed/on `PATH`, so a clean local reset could not run.                                                                                                                  |
| CLI configuration             | Fixed                        | `supabase/config.toml` now defines repeatable ports, migrations, seed, Auth, Studio, SMTP, and Postgres 17.                                                                                                 |
| Local application environment | Action required              | Supabase, Cloudinary, and Resend credentials are not configured in `.env.local`.                                                                                                                            |
| Authentication                | Fixed/configuration required | Session cookies and route protection exist. Role authority now consistently comes from active `profiles` rows rather than divergent JWT metadata. An Auth user and active profile role must be provisioned. |
| Media                         | Ready after credentials      | Media files use Cloudinary; Supabase stores metadata only. No Supabase Storage bucket is required by the current implementation.                                                                            |
| Contact                       | Ready after credentials      | Leads use a service-role Supabase client; email uses Resend and fails gracefully after a successful database write.                                                                                         |
| CMS repositories              | Ready after migrations       | Portfolio, Blog, Testimonials, Team, Founder, Media, and Contact Leads follow Repository → Server Action → Supabase.                                                                                        |
| Vercel                        | Ready after configuration    | Standard Next.js deployment is supported; production secrets and Supabase Auth URLs must be configured.                                                                                                     |
| Git hygiene                   | Fixed                        | Supabase `.temp` link state is ignored/untracked; an accidental captured Git-output file was removed.                                                                                                       |

## Problems found and root causes

### 1. Admin login cannot connect

- **Root cause:** `.env.local` has no Supabase URL or anon key for the new project.
- **Observed behavior:** middleware redirects to `/admin/login?error=configuration`; the sign-in action cannot create a configured Auth client.
- **Resolution:** populate the local variables described in `ENVIRONMENT_SETUP.md`, restart Next.js, then create/activate an authorized Auth user.

### 2. Application and RLS used different role authorities

- **Root cause:** application permissions read `user.app_metadata.role`, while database policies read `public.profiles.role` and require `profiles.status = 'active'`.
- **Risk:** a user could be shown the wrong UI permission level even though RLS correctly rejected the mutation.
- **Fix:** application session mapping now reads the active profile row. Middleware signs out users with missing/inactive profiles and presents a clear access message. RLS remains the final enforcement layer.

### 3. The linked project is behind source control

- **Root cause:** the Team and Founder migrations were created after the last remote migration push.
- **Evidence:** `supabase db push --linked --dry-run` lists only:
  - `202608120001_team_cms.sql`
  - `202608150001_founder_profile_cms.sql`
- **Required action:** review the target project reference, back up if it contains data, and run `supabase db push --linked`.

### 4. Fresh local database verification is unavailable on this machine

- **Root cause:** neither Docker nor Podman is installed/on `PATH`.
- **Impact:** the CLI cannot start the local Postgres/Auth/Storage stack or execute `supabase db reset` here.
- **Required action:** install Docker Desktop, start it, then follow the clean-reset checklist in `SUPABASE_SETUP_GUIDE.md`.

### 5. Local Supabase configuration was absent

- **Root cause:** `supabase/config.toml` was missing, so ports, Auth behavior, redirect allow-list, Postgres version, and seed execution were not reproducible.
- **Fix:** a checked-in configuration now defines the local stack. Public signup is disabled because the product has no registration route.

### 6. Link metadata was tracked

- **Root cause:** `supabase/.temp` was not ignored.
- **Risk:** linked project metadata and pooler endpoints are workstation state, not source code.
- **Fix:** the directory is ignored and its existing files were removed from Git tracking. No migrations were changed.

## Database and migration audit

- The base migration creates enums, profiles, CMS tables, indexes, foreign keys, update triggers, Auth profile provisioning, helper functions, and RLS policies.
- Subsequent migrations evolve Portfolio, Blog, Services, Testimonials, Cloudinary media, Contact Leads, legacy settings history, analytics, Team, and Founder.
- RLS is enabled for CMS tables and helper functions resolve authorization through the authenticated UID and active profile.
- Foreign keys use explicit delete behavior appropriate to their relationship; join/media relations use cascades where the child cannot exist independently.
- The seed is deterministic and idempotent (`ON CONFLICT ... DO NOTHING`). It creates development-only categories and draft sample Portfolio, Blog, and Services records.
- The seed intentionally does not create Auth credentials. Auth users must never be stored in source-controlled SQL.
- Historical settings migrations remain in history as required. Their presence does not reintroduce a runtime Settings CMS.
- A remote database push does not include seed data unless `--include-seed` is explicitly supplied. Production should normally run migrations without development seed records.

## Authentication audit

- `/admin/:path*` is protected by `src/middleware.ts` and the Supabase SSR cookie refresh helper.
- Guests are redirected to `/admin/login` with the intended destination.
- Authenticated users are redirected away from the login page.
- Login uses `signInWithPassword`; there is no mock, local-storage, or manually issued JWT authentication.
- Server Actions call `requireAdmin()` and permission helpers; database RLS independently enforces Admin/Editor/Viewer privileges.
- New Auth users receive a `profiles` row through `public.handle_new_user()` and default to Viewer unless an allowed role is supplied.
- Production bootstrap requires creating the first Auth user and promoting its `profiles.role` to `admin`; this is a one-time data operation, not missing schema.
- Confirm production Site URL and redirect URLs in Supabase Auth. The checked-in values configure local development only; hosted project settings are managed in the Supabase Dashboard.

## Media audit

- Upload, replace, rename, and delete operations call Cloudinary from server-side code only.
- Cloudinary API secret is never required by browser code.
- `media_library` stores Cloudinary `public_id`, secure URL, dimensions, bytes, format, tags, and audit fields.
- Next.js permits optimized images only from `res.cloudinary.com` and emits AVIF/WebP.
- The current product does **not** use Supabase Storage for CMS media. No bucket or bucket policy is missing. Enabling a Supabase bucket would create a second asset authority and is not recommended without a future architecture change.

## Contact and email audit

- Contact submissions validate server-side, use duplicate/rate-limit database logic, and write through `ContactLeadsRepository` with the service-role client.
- `SUPABASE_SERVICE_ROLE_KEY` is therefore required in local and Vercel server environments.
- Resend sends acknowledgement and internal notification messages using `RESEND_API_KEY` and `EMAIL_FROM`.
- Email delivery uses settled promises; a provider failure does not roll back a saved lead and the user receives honest status copy.
- The sender domain must be verified in Resend. The internal recipient is the static company contact email in the application configuration.

## CMS dependency audit

| Module        | Repository               | Server Actions                                    | Primary dependencies                  |
| ------------- | ------------------------ | ------------------------------------------------- | ------------------------------------- |
| Portfolio     | `PortfolioRepository`    | `actions/portfolio.ts`                            | Supabase, media references            |
| Blog          | `BlogRepository`         | `actions/blog.ts`                                 | Supabase, media references            |
| Testimonials  | `TestimonialsRepository` | `actions/testimonials.ts`                         | Supabase, Cloudinary media references |
| Team          | `TeamRepository`         | `actions/team.ts`                                 | Supabase, Cloudinary media references |
| Founder       | `FounderRepository`      | `actions/founder.ts`                              | Supabase, Cloudinary media references |
| Media         | `MediaRepository`        | `actions/media.ts`                                | Supabase metadata, Cloudinary files   |
| Contact Leads | `ContactLeadsRepository` | `actions/contact-leads.ts`, public contact action | Supabase, optional Resend delivery    |

Components do not mutate Supabase directly. Public repository loaders use anonymous access and return only records allowed by published-content RLS policies.

## Remaining manual setup

1. Install/start Docker Desktop for local Supabase verification.
2. Populate `.env.local` from `.env.example` using `supabase status -o env` for local keys or the new Dashboard for hosted keys.
3. Confirm the CLI is linked to the intended new project.
4. Push the two pending migrations after reviewing the dry run.
5. Create the first Auth user, confirm its email, set its active profile role to Admin, and verify login.
6. Configure production Auth Site URL and redirect allow-list.
7. Configure Cloudinary and Resend credentials and verify the Resend sender domain.
8. Add the documented production environment variables to Vercel, redeploy, and run the smoke checklist.
9. Add a GitHub Actions validation workflow in a later infrastructure sprint; the recommended job is documented but intentionally not implemented here.

## Verification checklist

- [x] Every `/docs` document read before changes.
- [x] Migration history preserved.
- [x] Linked migration status inspected with a dry run.
- [x] Linked schema linted with no warnings.
- [x] Seed reviewed for repeatability and development-only content.
- [x] Authentication, middleware, sessions, profiles, and permissions audited.
- [x] Media and contact integrations audited.
- [x] Environment contract completed without secrets.
- [x] Vercel and Git expectations documented.
- [ ] Local clean reset (requires Docker Desktop/Podman).
- [ ] Pending migrations applied to the new project (manual production action).
- [ ] First Admin Auth user provisioned (manual identity action).
