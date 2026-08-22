# Environment Setup

Use `.env.example` as the variable-name contract. Store real values in `.env.local` for local development and in Vercel’s encrypted Environment Variables for deployments. Never store secrets in `NEXT_PUBLIC_*` variables.

## Variable inventory

| Variable                        | Exposure             | Local                                         | Vercel                 | Source / purpose                                                                 |
| ------------------------------- | -------------------- | --------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Browser-safe         | Required                                      | Required               | Canonical application origin; localhost locally, production HTTPS URL on Vercel. |
| `NEXT_PUBLIC_SUPABASE_URL`      | Browser-safe         | Required                                      | Required               | Local API URL from `supabase status` or hosted Project URL.                      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser-safe         | Required                                      | Required               | Local/hosted anon key; protected by RLS, not a privileged secret.                |
| `SUPABASE_SERVICE_ROLE_KEY`     | **Server secret**    | Required for contact/admin service operations | Required               | Hosted Project API key or local status output. Bypasses RLS; never expose.       |
| `DATABASE_URL`                  | **Server secret**    | Optional                                      | Optional               | Maintenance tooling only; application repositories do not use it.                |
| `CLOUDINARY_CLOUD_NAME`         | Identifier           | Required for Media CMS                        | Required for Media CMS | Cloudinary product environment cloud name.                                       |
| `CLOUDINARY_API_KEY`            | Server credential    | Required for Media CMS                        | Required for Media CMS | Cloudinary API key.                                                              |
| `CLOUDINARY_API_SECRET`         | **Server secret**    | Required for Media CMS                        | Required for Media CMS | Cloudinary API secret; server actions only.                                      |
| `RESEND_API_KEY`                | **Server secret**    | Required to send email                        | Required to send email | Resend API key scoped for sending.                                               |
| `EMAIL_FROM`                    | Server configuration | Required to send email                        | Required to send email | Display name and address on a Resend-verified domain.                            |

`VERCEL_OIDC_TOKEN` may be created automatically by Vercel tooling. It is not an application variable and should not replace the variables above.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. For local Supabase, replace the three Supabase placeholders with values from:

   ```powershell
   supabase status -o env
   ```

3. For the hosted development project, use the Project URL, anon key, and service-role key from Supabase Dashboard → Project Settings → API.
4. Add Cloudinary/Resend values only from their official dashboards.
5. Restart `npm run dev` whenever environment variables change.

Never print actual values while troubleshooting. A safe check reports presence only:

```powershell
$required = @(
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
)
$required | ForEach-Object {
  "${_}: " + $(if ([Environment]::GetEnvironmentVariable($_)) { 'set' } else { 'missing' })
}
```

## Vercel setup

Add the variables in Project Settings → Environment Variables. Use separate Supabase projects or credentials for Production and Preview where isolation is required.

- Production `NEXT_PUBLIC_SITE_URL`: `https://www.ayebsolutions.com`
- Preview `NEXT_PUBLIC_SITE_URL`: use the intended preview origin strategy; do not point canonical production metadata at an arbitrary preview.
- Add server secrets to Production and only to Preview/Development when those environments need the integration.
- Redeploy after changes; existing deployments do not automatically receive newly added variables.

## Supabase-hosted configuration (not environment variables)

The following live in Supabase Dashboard rather than `.env.local`:

- Auth Site URL and allowed Redirect URLs
- public-signup and email-confirmation policy
- password policy
- SMTP provider configuration if Supabase Auth emails are used
- database password, backups, and connection pool settings
- Auth users and their active `profiles` roles

## Secret handling

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is intentionally public; security comes from RLS.
- `SUPABASE_SERVICE_ROLE_KEY`, Cloudinary secret, Resend key, database URL, CLI access token, and Vercel tokens are secrets.
- Rotate any secret that was committed, pasted into a ticket, or printed in CI logs.
- Keep `.env.local`, `.vercel`, and `supabase/.temp` outside Git.
- Use Vercel’s encrypted storage and GitHub Actions secrets when CI is implemented.

## Environment verification

- [ ] App starts without the Admin configuration warning.
- [ ] `/admin/login` authenticates a confirmed, active profile.
- [ ] Viewer cannot mutate CMS content.
- [ ] Editor can perform allowed content operations but cannot permanently delete Admin-only records.
- [ ] Media upload succeeds without exposing Cloudinary secrets to the browser.
- [ ] Contact submission writes a lead.
- [ ] Contact acknowledgement and internal notification deliver from the verified sender.
- [ ] No secret-bearing files appear in `git status` or `git ls-files`.
