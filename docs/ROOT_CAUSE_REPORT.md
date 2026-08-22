# STABILIZATION-1 root-cause report

Date: 2026-08-23

## Finding 1: lint failed after Supabase CLI use

**Symptom:** `npm run lint` reported 186 findings in a minified edge-runtime file.

**Cause:** Supabase CLI generated implementation artifacts under `supabase/.temp/start-secrets`; ESLint's repository-wide glob did not exclude CLI-owned temporary output.

**Fix:** Added `supabase/.temp/**` to the global ignore list. Application and migration source remain linted.

## Finding 2: Team publication was not immediately visible

**Symptom:** Team actions refreshed only `/admin/team`, while the public Team loader is cached for five minutes under the `team` tag.

**Cause:** Sprint 13A preceded the public Team cache and its mutation helper was not extended when the public projection was introduced.

**Fix:** Every Team mutation now revalidates `/admin/team`, `/team`, and the `team` tag.

## Finding 3: failed contact emails were absent from history

**Symptom:** A saved lead could report an email-provider failure, but only fulfilled delivery promises were inserted into `lead_email_history`.

**Cause:** The failure branch resolved without calling the repository even though `recordEmail` already supports `providerId = null` and maps it to failed delivery state.

**Fix:** Every attempted message is now logged; successful responses retain the provider ID and rejected deliveries store a failed status. Lead persistence remains independent.

## Finding 4: production administration cannot be accepted

**Symptom:** Public pages work, but authenticated admin workflows cannot be validated.

**Cause:** The configured production project contains zero `profiles` records (and therefore no active admin/editor/viewer). This is data provisioning, not an authorization bypass or migration failure. Clean-project testing proved the Auth trigger creates profiles and role policies behave correctly.

**Resolution:** Provision the first approved Auth user and promote its trigger-created profile using a controlled privileged operation. Do not weaken middleware, profile checks, or RLS.

## Finding 5: requested admin inventory exceeds implemented product scope

**Symptom:** `/admin/categories`, `/admin/tags`, and `/admin/users` are protected by middleware but have no page modules.

**Cause:** Database category/tag structures and user roles exist, but dedicated administration pages were never implemented in the retained architecture.

**Resolution:** A product decision and separately authorized feature sprint are required. Stabilization did not create placeholder routes.
