# INFRA-2 Root Cause

## Proven cause

Production `origin/main` resolves application roles from `auth.users.raw_app_meta_data` instead of `public.profiles`.

The deployed implementation is logically equivalent to:

```ts
const role = user.app_metadata.role;
return isKnownRole(role) ? role : "viewer";
```

The production user has an active Admin row in `public.profiles`, but no matching `app_metadata.role`. Therefore the explicit fallback returns Viewer.

## Why authentication succeeds

`signInWithPassword()` validates credentials in Supabase Auth and writes valid session cookies. Middleware calls `auth.getUser()`, receives the authenticated user, and allows `/admin`. Neither step needs an application role.

## Where the wrong value is introduced

- `src/lib/auth/session.ts` in `origin/main` delegates role mapping to `getUserRole()`.
- `src/lib/auth/permissions.ts` in `origin/main` reads `user.app_metadata.role`.
- Its fallback changes an absent metadata role into Viewer.
- `getPermissions(viewer)` then produces read-only Admin capabilities.

The database profile value is not read at all by that deployed path.

## Why the database is not at fault

The linked production project has one Auth user and one profile with the same UUID. That profile is active and Admin. There are no orphan or duplicate identity rows. The profile self-read RLS policy permits `id = auth.uid()`, and PostgreSQL authorization helpers already use the same active profile row.

## Deployment contribution

The local branch contained the profile-based correction in the INFRA-1 commit, but `origin/main` remained one commit behind. Consequently a Git-backed production deployment continued to build the metadata-based resolver. Production configuration was also not durably represented as project-level Vercel variables, making deployments dependent on locally supplied values.

## Why the fix resolves the bug

The fix makes `public.profiles` the single role authority for both application permissions and RLS:

1. Verify the Auth user with `auth.getUser()`.
2. Query the profile using that exact UUID.
3. Require `status = active`.
4. Return the database enum role directly.
5. Reject missing/inactive profiles instead of manufacturing Viewer access.

Admin remains Admin, Editor remains Editor, and Viewer remains Viewer because no default overwrites a valid profile role. RLS remains enabled and continues to enforce the same role independently.
