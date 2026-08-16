# INFRA-2 Authentication and Authorization Audit

**Date:** 2026-08-16

## Scope and method

This audit traced the production Admin identity from sign-in through authorization before any fix was selected. It reviewed:

- `src/middleware.ts`
- `src/lib/supabase/middleware.ts`
- `src/lib/supabase/server.ts`
- `src/lib/database/client.ts`
- `src/lib/auth/auth.ts`
- `src/lib/auth/session.ts`
- `src/lib/auth/permissions.ts`
- `src/types/auth.ts`
- `src/types/database.ts`
- the Admin layout, routes, Server Components, hydrated mutation components, and Server Actions
- all database repositories and validation boundaries
- every migration containing Auth, profiles, roles, helper functions, or RLS policies
- local, linked Supabase, Git, and Vercel project configuration
- repository-wide occurrences of role defaults, Auth user/session reads, profile reads, and permission calculations

No React context, client hook, client-side Supabase Auth implementation, Auth route handler, or alternate profile repository exists. Client components receive capability booleans or invoke protected Server Actions; they do not resolve roles.

## Request lifecycle

```text
Browser POST /admin/login
  → signIn(FormData)
  → Supabase SSR server client
  → auth.signInWithPassword()
  → Supabase sets Auth cookies
  → redirect /admin
  → middleware reads cookies and calls auth.getUser()
  → middleware permits a valid authenticated user
  → Admin Server Component calls getCurrentUser()
  → deployed code maps auth.users.app_metadata.role
  → missing metadata defaults to viewer
  → getPermissions(viewer)
  → Admin UI and Server Actions become read-only
```

The corrected lifecycle replaces the metadata mapping step with:

```text
auth.getUser().id
  → SELECT role, status FROM public.profiles WHERE id = authenticated UUID
  → reject missing or inactive profile
  → use profiles.role without a viewer fallback
  → calculate application permissions
  → RLS independently evaluates the same active profiles row
```

## Role origin and transformations

### Deployed `origin/main`

1. Supabase Auth returns a valid `User`.
2. `getCurrentUser()` calls `getUserRole(user)`.
3. `getUserRole()` reads `user.app_metadata.role`.
4. If metadata is absent or not one of Admin/Editor/Viewer, it returns Viewer.
5. `getPermissions()` translates Viewer into read-only capabilities.
6. Admin pages pass those capabilities into their presentation/client components.
7. Server Actions repeat the permission calculation through `requireAdmin()`.

The deployed resolver never reads `public.profiles.role`.

### Database/RLS

1. `auth.users.id` is copied into `public.profiles.id` by `handle_new_user()`.
2. `current_app_role()` reads `public.profiles.role` where `id = auth.uid()` and `status = active`.
3. `can_view_admin()`, `can_edit_content()`, and `is_admin()` use that function.
4. Table RLS policies use those helpers.

This created two role authorities: JWT App Metadata for application UI/actions and `profiles` for PostgreSQL RLS.

## Database evidence

The linked project was queried through the Supabase Management/API boundary without logging IDs, emails, or keys:

| Check                       | Result |
| --------------------------- | ------ |
| Auth users                  | 1      |
| Profile rows                | 1      |
| Matching Auth/Profile UUIDs | 1      |
| Auth users missing profiles | 0      |
| Profiles missing Auth users | 0      |
| Active Admin profiles       | 1      |
| Active Editor profiles      | 0      |
| Active Viewer profiles      | 0      |
| Inactive profiles           | 0      |

The authenticated identity/profile relationship and Admin status are correct. There is only one `public.profiles` table definition in migration history. Its self-read policy is `id = auth.uid() or public.is_admin()`, so an authenticated user can read their own row; RLS does not force the row to Viewer.

## Client and environment audit

- Middleware and server clients both use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Service-only operations use the same URL with `SUPABASE_SERVICE_ROLE_KEY`.
- Public CMS loaders use the same URL/anon pair.
- The locally configured Supabase URL matches the CLI-linked project reference.
- No second browser Auth client or legacy local-storage session implementation exists.
- No `auth.getSession()` authorization path exists; authenticated identity is verified with `auth.getUser()`.
- Vercel was linked and its production variable persistence was addressed using the linked project’s URL, public key, and actual service-role key without printing values.
- `.env.example` contains placeholders only. A service-role variable must never contain an anon token.

## Middleware and session behavior

- Unauthenticated requests to `/admin/:path*` redirect to `/admin/login`.
- Auth cookies are forwarded when middleware refreshes a session.
- Login-route requests are allowed without a session.
- The corrected middleware validates that the authenticated UUID has an active profile.
- Missing, errored, or inactive profiles fail closed: the session is signed out and the user receives the access message.
- Server rendering uses the same active profile and does not accept role input from a client.

## Conclusions

- Authentication succeeds because email/password verification and cookies are correct.
- Middleware succeeds because it verifies identity, not the role used by the deployed UI.
- The database Admin role is correct and RLS resolves it correctly.
- The deployed application overwrites the effective role with Viewer when JWT App Metadata has no role.
- No cache, provider, hook, repository, duplicate profile table, UUID mismatch, or RLS-hidden profile caused the symptom.
