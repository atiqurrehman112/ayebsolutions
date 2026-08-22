# STABILIZATION-1 release candidate

Date: 2026-08-23

## Decision: conditional hold

The source and database reconstruction are release-capable, but production operational acceptance is not complete. Do not label this revision a fully validated release candidate until the blocking checklist below is closed.

## Passed gates

- Clean migration replay and seed on an empty Supabase project
- Linked migration parity, dry-run, and database lint
- Representative role/RLS, publication, contact, duplicate, and analytics tests
- Production build, lint, strict TypeScript, and whitespace validation
- Implemented public-route and XML endpoint smoke tests
- Guest admin protection
- Internal-link crawl
- Empty-content resilience
- No forbidden source markers or explicit unsafe types

## Blocking gates

- Production has no Auth/profile administrator, preventing authenticated admin and CRUD acceptance.
- Categories, Tags, and Users admin pages in the requested inventory are not implemented.
- Interactive browser console, hydration, keyboard, responsive viewport, and screen-reader smoke tests were unavailable.
- Production Cloudinary mutation and Resend inbox delivery were not executed with disposable authorized resources.
- The stabilization revision deployed successfully to Vercel production and the canonical domain passed the post-deployment HTTP smoke test. This gate is complete, while the authenticated acceptance gates above remain open.

## Release procedure

1. Provision an administrator and confirm the generated profile is active/admin.
2. Execute the authenticated matrix in `FEATURE_VERIFICATION.md`.
3. Confirm all required Vercel variables from `ENVIRONMENT_SETUP.md` and redeploy.
4. Validate Cloudinary and Resend using disposable data.
5. Run desktop/mobile browser, keyboard, reduced-motion, dark-mode, console, and hydration checks.
6. Resolve the Categories/Tags/Users product-scope decision.
7. Record the evidence and change the decision to Approved only after every blocker is closed.
