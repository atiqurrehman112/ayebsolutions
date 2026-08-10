# Settings CMS Schema Audit

## Finding

The repository contained two settings schemas:

- Sprint 8B created `site_settings`, a generic key/value foundation.
- Sprint 8I created `site_configuration`, a typed singleton, and switched all runtime repository reads and writes to it.

The production symptom “Site settings are unavailable” occurs when the application code from Sprint 8I or later is deployed while migration `202608100004_site_configuration.sql` was not applied. Later homepage and analytics migrations also assumed that table existed.

## Decision

`site_configuration` remains canonical. Reverting the application to `site_settings` would discard the typed relational contract used by Media Library selections, navigation, homepage composition, SEO, analytics, feature flags, and validation. The legacy table remains valuable only as a migration source and rollback audit record.

## Remediation

Migration `202608110002_reconcile_site_settings.sql`:

1. Creates the complete final singleton schema when absent.
2. Repairs partially applied schemas with homepage and analytics columns.
3. Inserts the canonical singleton without overwriting an existing row.
4. Copies recognized legacy identity, SEO, contact, navigation, footer, and maintenance keys.
5. Preserves every row in `site_settings`.
6. Idempotently restores the update trigger, RLS policies, and media index.

The migration is forward-only and can be applied whether production has only `site_settings`, both tables, or a partially upgraded `site_configuration` table.

## Operational verification

After applying the migration to production, verify:

```sql
select id, site_name, site_url, status
from public.site_configuration;

select key, value, status
from public.site_settings
order by key;
```

The first query must return the singleton UUID `00000000-0000-4000-8000-000000000001`. The second query confirms legacy data was retained. Then sign in as an administrator, load `/admin/settings`, save a non-destructive setting, and confirm the homepage reflects it after cache revalidation.
