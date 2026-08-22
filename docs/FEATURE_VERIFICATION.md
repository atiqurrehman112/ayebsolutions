# STABILIZATION-1 feature verification

Date: 2026-08-23

Statuses: **Pass** is directly executed, **Source-verified** is traced through code/schema, **Blocked** requires unavailable credentials or infrastructure, and **Gap** is not implemented.

## Public application

| Area                                                    | Status  | Evidence                                                                                                                   |
| ------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| Core marketing routes                                   | Pass    | Local production server and deployed domain returned 200; one H1 and canonical on every HTML route.                        |
| Portfolio, Blog, Testimonials empty states              | Pass    | Production has zero rows and pages still return 200 with honest rendering.                                                 |
| Service detail routes                                   | Pass    | Six static paths generated in the production build.                                                                        |
| Search                                                  | Pass    | Route returns 200 and uses published repository projections; current empty database yields a valid empty state.            |
| Sitemap, sitemap index, segmented sitemaps, RSS, robots | Pass    | Every asset returned 200 locally and in production.                                                                        |
| Internal links                                          | Pass    | 31 rendered internal destinations returned 200 or the expected redirect.                                                   |
| Browser console/hydration                               | Blocked | Browser-control runtime had no browser installation. Server logs contained no warning or error during route smoke testing. |

## CMS and administration

| Module              | Repository/actions/UI                         | Clean-project RLS                  | Authenticated production CRUD                        |
| ------------------- | --------------------------------------------- | ---------------------------------- | ---------------------------------------------------- |
| Portfolio           | Source-verified                               | Pass                               | Blocked: no production profile                       |
| Blog                | Source-verified                               | Pass through shared role policies  | Blocked: no production profile                       |
| Testimonials        | Source-verified                               | Pass through shared role policies  | Blocked: no production profile                       |
| Media Library       | Source-verified                               | Pass through shared role policies  | Blocked: no production profile/Cloudinary test asset |
| Team                | Source-verified; cache invalidation corrected | Pass through shared role policies  | Blocked: no production profile                       |
| Founder             | Source-verified singleton                     | Pass through shared role policies  | Blocked: no production profile                       |
| Site Settings       | Source-verified singleton                     | Pass through admin/public policies | Blocked: no production profile                       |
| Contact Leads / CRM | Source-verified; RPC exercised                | Pass                               | Blocked: no production profile                       |
| CRM analytics       | Pass on empty clean database                  | Pass for viewer                    | Blocked in authenticated production UI               |
| Categories          | Gap                                           | Tables and Blog integration exist  | No dedicated admin route                             |
| Tags                | Gap                                           | Tables and Blog integration exist  | No dedicated admin route                             |
| Users               | Gap                                           | Profiles and role model exist      | No dedicated admin route                             |

Admin guest protection passed for every implemented route: each returned a login redirect. Login returned 200.

## Contact workflow

- Zod validation, honeypot, same-origin check, HMAC IP fingerprint, rate limit, duplicate protection, service-role RPC, lead insert, initial history, Resend acknowledgement/notification, CRM email logging, and cache invalidation were traced end-to-end.
- Clean-project RPC execution confirmed one lead and one history record, then confirmed duplicate rejection.
- Email delivery failure does not roll back the lead. Stabilization now records both successful and failed delivery attempts.
- Actual inbox delivery is blocked pending an authorized recipient and verified sender test.

## Authentication

- Browser -> Supabase Auth -> cookies -> middleware -> server client -> `auth.getUser` -> profile lookup -> permission map was traced.
- Anonymous protected-route redirects passed in production.
- Clean-project role tests passed for admin, editor, and viewer; inactive profiles were denied by RLS and application status checks.
- Missing profiles and inactive profiles are rejected; middleware signs out inactive sessions.
- Production login/refresh/logout cannot be executed until a first profile exists.

## Cache and public propagation

Portfolio, Blog, Testimonials, Media, Founder, Site Settings, Contact, and Team mutations invalidate their public path/tag boundaries. Team invalidation was corrected during this audit. Blog/Portfolio slug routes receive specific invalidation. ISR remains five minutes as a resilience backstop.

## Remaining authenticated test script

After provisioning a disposable administrator, verify create/edit/draft/publish/unpublish/archive/restore/delete, validation, media selection, slug uniqueness, search, filters, pagination, preview, public visibility, cache refresh, CRM notes/status/replies/follow-ups, and settings propagation. Repeat read-only cases with Viewer and mutation cases with Editor; then remove all disposable records and users.
