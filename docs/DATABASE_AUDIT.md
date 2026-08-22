# STABILIZATION-1 database audit

Date: 2026-08-23

## Schema inventory

The 28 migrations create 24 application tables: profiles, categories, tags, portfolio projects and media, blog articles and media, services and media, testimonials, contact leads, submission attempts, lead status/email/note/follow-up history, email templates, media library, site settings (legacy), site configuration (canonical singleton), article/project tags, team members, and founder profile.

Static analysis found 98 RLS policy declarations, 66 index declarations, 18 trigger declarations, and the core authorization, contact-submission, search-vector, timestamp, profile bootstrap, and CRM analytics functions. There are no application views or custom sequences.

## Production-linked state

- All 28 migration versions are present locally and remotely in identical order.
- Dry-run push reports the linked database is current.
- Linked schema lint at warning level reports no errors.
- Canonical `site_configuration` contains exactly one published row.
- Legacy `site_settings` contains no records and has no runtime repository consumer.
- Production currently contains nine categories and no profiles, tags, CMS content, media, leads, email history, follow-ups, founder, or team records.

The empty content tables are valid and public pages render honest empty/fallback states. The absence of profiles is an operational blocker for authenticated administration.

## Constraints and relationships

- UUID primary keys are used throughout entity tables.
- Content slugs and relevant names use unique constraints.
- Join/media tables use composite relationships and cascade semantics where ownership requires it.
- Audit identities reference `auth.users` or profiles according to the historical migration contract.
- Singleton enforcement uses a fixed Founder key and fixed Site Configuration UUID plus an additional constant-expression unique index.
- `set_updated_at` maintains update timestamps.
- The Auth user trigger creates a profile, avoiding manual profile inserts for newly provisioned users.

## RLS evidence

On the clean project:

- Anonymous users could not read draft portfolio content.
- Viewers could read the admin boundary but could not insert content.
- Editors could create and publish content but could not permanently delete it.
- Published content became anonymously readable.
- Administrators could permanently delete content.
- Suspended profiles produced no application role and failed the admin predicate.
- CRM analytics was callable by an authorized viewer and returned the complete empty contract.

## Repository/schema consistency

Runtime settings correctly use `site_configuration`; `site_settings` is retained only as historical migration state. Repository table names, primary content columns, CRM RPC names, Founder singleton, Team fields, and media relationships match the reconstructed schema. No direct Supabase client import was found in React presentation boundaries.

## Residual risks

- PostgreSQL catalog dumping was unavailable because the workstation had no running Docker daemon for the CLI dump container. Migration replay plus remote lint replaced that check.
- Production CRUD was not mutated because no authorized production profile exists.
- The historical settings reconciliation migrations intentionally mention both settings tables; this is not an active runtime ambiguity.
