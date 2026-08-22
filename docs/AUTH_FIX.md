# INFRA-2 Authentication Fix

## Implemented correction

The production-quality correction is intentionally narrow:

- `getCurrentUser()` verifies identity with `auth.getUser()`.
- It selects only `role` and `status` from the authenticated user’s own `profiles` row.
- It returns `null` for a query error, missing profile, or inactive profile.
- It returns the database role directly for an active profile.
- Middleware performs the same active-profile gate before admitting an authenticated Admin request.
- The obsolete JWT App Metadata role mapper and associated user type were removed.
- The login page explains inactive/missing profile access without exposing internals.

Authentication, cookie handling, middleware matching, Server Actions, repositories, and RLS were not rewritten or bypassed.

## Security properties

- Identity still comes from the server-verified Supabase user.
- The profile lookup is constrained to `user.id`; no caller supplies the UUID.
- Profile RLS permits self-read while protecting other users.
- Missing and inactive profiles fail closed.
- Server Actions still enforce application permissions.
- PostgreSQL policies remain the final authorization boundary.
- No service-role key is used for the per-request role lookup.
- Client components cannot choose or override their role.

## Environment correction

- The production Vercel project was linked to the repository workspace.
- Production Supabase URL/public-key/service-role variable names were persisted from the CLI-linked project without logging their values.
- The service-role value was sourced from Supabase’s `service_role` key, not an anon token.
- `.env.example` remains placeholder-only.

Any previously exposed or incorrectly copied credential should be rotated in Supabase and replaced in Vercel/local environments.

## Verification matrix

| Scenario                 | Expected result                                                                 | Verification basis                                                          |
| ------------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Active Admin profile     | Admin capabilities                                                              | Direct database role; linked database contains the matching active Admin.   |
| Active Editor profile    | Content-management capabilities, no user management/permanent Admin-only delete | Typed permission map and direct profile role.                               |
| Active Viewer profile    | Read-only Admin access                                                          | Typed permission map and direct profile role.                               |
| Unauthenticated request  | Redirect to `/admin/login`                                                      | Middleware identity branch.                                                 |
| Inactive/missing profile | Sign out and access error                                                       | Middleware active-profile gate and server fail-closed behavior.             |
| RLS                      | Remains enforced                                                                | No policy/function changes; database helpers continue using active profile. |
| Server rendering         | Uses server cookie client and active profile                                    | Admin layout/pages are Server Components.                                   |
| Client rendering         | Receives server-derived capability props only                                   | No client Auth/role resolver exists.                                        |

## Commands

The completion verification must pass:

```powershell
npm run lint
npm run typecheck
npm run build
git diff --check
```

Production verification additionally requires the corrected commit to be deployed, the deployment to report Ready, guest redirect testing, and an authenticated Admin smoke test. The codebase does not contain or log administrator credentials; credentialed smoke testing must use an authorized operator session.
