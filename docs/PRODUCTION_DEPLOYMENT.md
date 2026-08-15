# Production Deployment

## Deployment model

Ayeb Solutions is a Next.js 15 App Router application deployed on Vercel. Supabase provides Auth/PostgreSQL, Cloudinary provides CMS media, and Resend provides transactional contact email. Public CMS pages use server rendering/caching; Admin routes are dynamic and protected by middleware.

## Vercel project settings

| Setting          | Value                           |
| ---------------- | ------------------------------- |
| Framework preset | Next.js                         |
| Install command  | `npm ci` (recommended)          |
| Build command    | `npm run build`                 |
| Output directory | Next.js default                 |
| Node.js          | 20.x LTS (satisfies `>=20.9.0`) |
| Root directory   | Repository root                 |

The checked-in Next configuration enables strict React behavior, removes the powered-by header, permits Server Action request bodies up to 30 MB for the Media Library, optimizes AVIF/WebP, and restricts remote image optimization to `res.cloudinary.com`.

## Pre-deployment sequence

1. Confirm the Supabase CLI is linked to the intended production project.
2. Run:

   ```powershell
   supabase migration list --linked
   supabase db push --linked --dry-run
   supabase db lint --linked --level warning
   ```

3. Back up production data when applicable.
4. Apply reviewed migrations with `supabase db push --linked`. Do not include the development seed in production by default.
5. Configure the complete Vercel variable set from `ENVIRONMENT_SETUP.md`.
6. Configure Supabase production Site URL and redirect allow-list.
7. Verify the Resend sender domain and Cloudinary product environment.
8. Validate locally/CI:

   ```powershell
   npm ci
   npm run lint
   npm run typecheck
   npm run build
   git diff --check
   ```

9. Deploy the reviewed commit through the connected GitHub repository.

## ISR and runtime compatibility

- Vercel supports the application’s Next.js cache tags, path revalidation, ISR, Server Actions, middleware, and optimized Cloudinary images.
- Admin pages use `force-dynamic`; public cached CMS content can revalidate without rebuilding the whole site.
- Mutations revalidate their relevant admin/public paths and content tags.
- Do not deploy the application to a static-export-only target.

## Production smoke test

After Vercel reports Ready:

- [ ] `/`, `/about`, `/services`, `/solutions`, `/contact`, and `/team` return successfully.
- [ ] `/portfolio`, `/blog`, and `/testimonials` load published CMS content or their honest empty states.
- [ ] `/admin` redirects a guest to `/admin/login`.
- [ ] An active Admin can sign in and refresh without losing the session.
- [ ] Admin Portfolio, Blog, Testimonials, Team, Founder, Media, and Contact Leads load.
- [ ] A disposable CMS draft can be created/edited and permission restrictions behave correctly.
- [ ] Media upload/replace/delete works against Cloudinary.
- [ ] A contact submission creates one lead and email failure does not lose it.
- [ ] Canonical URLs and Open Graph images use the production origin/Cloudinary URLs.
- [ ] No browser console, hydration, CSP, image-host, or runtime errors appear.

## GitHub integration and recommended CI

Keep `main` protected and require pull requests for production changes. Vercel should deploy Production only from `main`; branches should create Preview deployments.

A future infrastructure sprint should add a GitHub Actions workflow that runs on pull requests and pushes to `main` using Node 20, `npm ci`, and:

```text
npm run lint
npm run typecheck
npm run build
git diff --check
```

Store required build variables in GitHub Actions secrets/variables. Use a non-production Supabase project for CI integration tests. Do not place production service-role, Cloudinary, Resend, database, or Supabase access tokens in workflow YAML. INFRA-1 intentionally documents this workflow without implementing deployment automation.

## Exact connection sequence

### VS Code / workstation

1. Install Node 20 LTS, Docker Desktop, Git, and Supabase CLI.
2. Clone the GitHub repository and run `npm ci`.
3. Run `supabase start` and `supabase db reset`.
4. Create `.env.local` from `.env.example` with local status output.
5. Run `npm run dev` and complete the local smoke checklist.

### GitHub

1. Confirm `origin` targets the canonical Ayeb Solutions repository.
2. Protect `main` and require review/status checks once CI is added.
3. Never commit environment files, `.vercel`, or `supabase/.temp`.

### Supabase

1. `supabase login`.
2. `supabase link --project-ref <new-project-ref>`.
3. Dry-run, lint, back up, then push migrations.
4. Provision the first active Admin profile.
5. Configure Auth URLs and verify RLS with Admin/Editor/Viewer accounts.

### Vercel

1. Import the canonical GitHub repository.
2. select Next.js and Node 20.x.
3. Add every required Production environment variable.
4. Configure the production domain and redeploy.
5. Confirm Supabase Auth allow-lists include the final domain.
6. Run the production smoke checklist and inspect Vercel function/build logs.

## Rollback

- Roll back application code through a known-good Git commit/Vercel deployment.
- Do not roll back schema by deleting or rewriting migrations. Create a reviewed forward corrective migration.
- Use Supabase backup/PITR for data recovery according to the production plan.
- Rotate credentials immediately if deployment logs or repository history expose a secret.
