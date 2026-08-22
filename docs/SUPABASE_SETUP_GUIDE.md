# Supabase Setup Guide

This guide provisions Ayeb Solutions from the checked-in migration history. Never paste service-role keys, database passwords, or access tokens into Git, screenshots, issues, or build output.

## Prerequisites

- Node.js 20.9 or newer (Node 20 LTS recommended for local and Vercel parity)
- npm
- Docker Desktop or Podman for the local Supabase stack
- Supabase CLI 2.113 or newer
- Access to the intended Supabase organization/project

Verify:

```powershell
node --version
npm --version
docker version
supabase --version
```

## Local development from a clean checkout

```powershell
npm ci
supabase start
supabase db reset
supabase status -o env
```

`supabase db reset` recreates only the local database, applies every file in `supabase/migrations` in order, and runs `supabase/seed.sql` because seed execution is enabled in `supabase/config.toml`. Treat this command as destructive to local Supabase data.

Copy the URL, anon key, and service-role key reported by `supabase status -o env` into `.env.local` using the names in `.env.example`. Do not copy the generated file into source control.

Then run:

```powershell
npm run dev
```

Local services use:

| Service           | Address                  |
| ----------------- | ------------------------ |
| Next.js           | `http://localhost:3000`  |
| Supabase API      | `http://127.0.0.1:54321` |
| PostgreSQL        | `127.0.0.1:54322`        |
| Studio            | `http://127.0.0.1:54323` |
| Local SMTP viewer | `http://127.0.0.1:54324` |

## Link the hosted project

Authenticate and link from the repository root:

```powershell
supabase login
supabase link --project-ref <new-project-ref>
supabase migration list --linked
supabase db push --linked --dry-run
```

Before any non-dry-run push:

1. Confirm the displayed project reference is the new Ayeb Solutions project.
2. Confirm no unexpected remote-only migrations appear.
3. Back up remote data if the project is no longer empty.
4. Review the dry-run migration list.

Apply schema migrations:

```powershell
supabase db push --linked
```

STABILIZATION-1 confirmed on 2026-08-23 that all 28 repository migrations match the linked project and that a dry run has no pending migration. Always repeat the check before deployment because remote state can change.

## Seed policy

The checked-in seed creates development-only draft content and is idempotent. Use it locally through `supabase db reset`.

For an intentionally seeded non-production hosted environment:

```powershell
supabase db push --include-all --include-seed
```

Do not use `--include-seed` in production unless the draft sample records have been explicitly approved. Schema initialization itself requires no manual SQL editing.

## Bootstrap the first Admin

Schema migrations cannot safely create a real user password. Bootstrap identity separately:

1. In Supabase Dashboard → Authentication → Users, create the administrator with a real email and strong password.
2. Confirm the email if confirmation is enabled.
3. The `on_auth_user_created` trigger creates an active Viewer profile automatically.
4. In Dashboard → Table Editor → `profiles`, change that user’s `role` to `admin`; keep `status` as `active`.
5. Sign in at `/admin/login` and verify the displayed role.

This profile row is the single application and RLS role authority. Do not depend on editable user metadata for authorization.

## Hosted Auth configuration

In Supabase Dashboard → Authentication → URL Configuration:

- Site URL: `https://www.ayebsolutions.com`
- Redirect URLs:
  - `http://localhost:3000/**`
  - the exact Vercel production domain
  - approved Vercel preview patterns only if preview authentication is required

In Authentication settings:

- Disable public signups; the product has no registration workflow.
- Require email confirmation for manually invited users as appropriate.
- Set a strong password policy.
- Keep JWT and refresh-token rotation aligned with the checked-in local defaults.

## Storage and media

Supabase Storage is available in the local stack but is not the CMS media authority. Media files are uploaded to Cloudinary and their metadata is stored in `public.media_library`. Do not create buckets merely to satisfy this setup guide.

To verify Media Library after Cloudinary credentials are configured:

1. Sign in as Admin or Editor.
2. Upload a small supported asset from `/admin/media`.
3. Confirm the Cloudinary resource exists.
4. Confirm `media_library` contains the secure URL/public ID and audit fields.
5. Replace and delete a disposable test asset, confirming database and Cloudinary remain consistent.

## Database verification

```powershell
supabase migration list
supabase db push --include-all --dry-run
supabase db lint --linked --level warning
```

Expected after setup:

- local and remote migration columns match;
- dry run reports the database is up to date;
- database lint reports no schema errors;
- RLS is enabled and anonymous users can read only published public content;
- Admin/Editor/Viewer mutations match the documented permission model.

STABILIZATION-1 additionally proved clean-room reconstruction on a disposable empty hosted project: all migrations applied, `db reset --linked --yes` replayed the chain, the seed completed, singleton rows existed, and representative Auth/RLS/contact/analytics checks passed without manual SQL. The disposable project was deleted after verification.

## Recovery and safety

- Never edit an already-applied migration. Add a new forward migration.
- Never delete migration files.
- Never commit `supabase/.temp`.
- Use Supabase backups/PITR appropriate to the production plan before risky changes.
- Run dry-run and schema lint before each production push.
