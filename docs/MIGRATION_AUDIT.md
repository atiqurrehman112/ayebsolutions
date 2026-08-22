# STABILIZATION-1 migration audit

Date: 2026-08-23

## Result

The migration history is reproducible and was not rewritten. A brand-new hosted Supabase project was initialized exclusively from the repository migration directory and seed file.

## Clean-room procedure

1. Created an empty disposable Supabase project.
2. Copied only `supabase/config.toml`, `supabase/migrations`, and `supabase/seed.sql` into an isolated working directory.
3. Linked the isolated directory to the new project.
4. Ran `supabase db push --include-all`; all 28 migrations compiled and applied in order.
5. Ran `supabase db reset --linked --yes`; the remote database was rebuilt, all migrations replayed, and `seed.sql` completed.
6. Verified seed counts: 12 categories, two portfolio drafts, two blog drafts, three service drafts, and one Site Configuration singleton.
7. Exercised Auth/profile creation, role-aware RLS, publication visibility, contact RPC duplicate protection/history, and empty CRM analytics.
8. Removed test users and deleted the disposable project.

No dashboard SQL, manual insert, schema repair, migration renaming, or production data copy was used.

## Ordering and duplication review

All filenames use a strictly increasing timestamp prefix. Later migrations extend or replace earlier functions without altering historical files. `202608110002_reconcile_site_settings.sql` is deliberately idempotent and reconciles the historical key/value table with the canonical typed singleton. Three CRM analytics migrations successively establish and harden one function contract; clean replay confirms these replacements compile.

No missing remote version, divergent local version, failed statement, or out-of-order filename was found.

## Seed behavior

`seed.sql` is explicitly development-only and idempotent by UUID. It provides draft CMS examples and categories; it does not create Auth users, production administrators, testimonials, media, CRM leads, Team members, or a Founder. The Site Configuration singleton comes from migrations, not a manual seed.

## Commands for a fresh project

```text
supabase login
supabase link --project-ref <project-ref>
supabase db push --include-all
supabase db reset --linked --yes   # destructive; suitable only for a new disposable project
```

For production, do not run the reset command. Apply migrations with `db push`, provision secrets, and bootstrap the first Auth user through an approved administrative procedure.
