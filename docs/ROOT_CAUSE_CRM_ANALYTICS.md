# CRM Analytics Production Root Cause

## Incident

The deployed `/admin/contact-leads/analytics` route rendered the inherited Contact Leads error boundary with “Contact leads are unavailable” even though all migrations were recorded, the production build succeeded, and the database contained zero leads.

## Request trace

1. Middleware refreshes the Supabase session and permits the authenticated `/admin/contact-leads/analytics` request.
2. The route Server Component calls `requireAdmin()`, resolves its date range, creates the SSR Supabase client, and calls `ContactLeadsRepository.getDashboardAnalytics()`.
3. The repository calls `rpc("crm_dashboard_analytics", { p_from, p_to })` and throws when Supabase returns an RPC error.
4. PostgreSQL enters the stable, security-invoker analytics function. `can_view_admin()` succeeds for the authenticated active profile.
5. The function evaluates its leaderboard CTE. That query used `coalesce(p.display_name, p.email, p.role::text)`.
6. The authoritative `public.profiles` schema contains `id`, `display_name`, `role`, `status`, `created_at`, and `updated_at`. It has no `email` column. PostgreSQL raises `column p.email does not exist` when the PL/pgSQL statement is executed.
7. Supabase returns the database error to the repository. `throwIfError()` throws, the Server Component does not render, and the parent `/admin/contact-leads/error.tsx` boundary displays its generic database/migration message.

## Why earlier verification passed

- Migration application proved that the function definition existed, not that every PL/pgSQL query path executed successfully. SQL statements inside this PL/pgSQL body were resolved at invocation time.
- `next build` type-checks the typed RPC contract but cannot validate a SQL reference inside the deployed function.
- An empty lead table did not bypass the leaderboard CTE; the query still resolved every referenced profile column before producing rows.

## Empty-data behavior

The function did not return `NULL` for zero leads. Its outer `jsonb_build_object` always constructs the complete response contract. Lead counts become zero, aggregate KPIs without observations become `null`, list aggregates use empty JSON arrays, monthly buckets contain zero values, and optional smart signals become JSON null. The failure occurred before that object could be returned.

The repository also did not classify an empty result set as an error. It only propagated the genuine PostgreSQL error. The React dashboard already supports zero counts and empty activity/source/status collections.

## Fix

Forward migration `202608160008_fix_crm_analytics_profile_name.sql` replaces only the invalid fallback expression with `coalesce(p.display_name, p.role::text)`. It does not add or duplicate email data, bypass RLS, change roles, or alter analytics behavior.

The migration includes a database-side contract check. When an active profile exists, it invokes the repaired function and rejects the migration unless all required analytics object sections are present. The function remains `SECURITY INVOKER`, retains its `can_view_admin()` gate, and continues to respect RLS.

## Verification matrix

- Zero leads: complete object with zero statistics, empty datasets, twelve zero monthly buckets, and null observation-dependent KPIs.
- One lead: filtered lead counts, source/status/month buckets, funnel values, and smart signals derive from that row.
- Charts: receive typed arrays in both empty and populated states; Chart.js renders zero/empty datasets without the error boundary.
- RLS: unchanged; authenticated admin-area visibility is still required and the function remains security-invoker.
- Repository: unchanged because it correctly propagated the actual RPC failure.
- UI: unchanged because its existing zero-data rendering is valid once the RPC fulfills its contract.

Migration `202608160009_verify_crm_analytics_contract.sql` performs a transactional one-record regression check. It inserts a non-public `.invalid` verification lead, invokes the function, verifies total/status/month aggregation, and deletes the record before commit. The verification row is never visible outside that transaction and leaves no production lead data behind.
