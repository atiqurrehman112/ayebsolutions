# Global Application Shell

Sprint 3 integrates the reusable design system into a production global application shell. The shell contains no homepage, service, portfolio, blog, contact, or admin content.

## Composition

`src/app/layout.tsx` owns fonts, metadata, viewport settings, providers, organization structured data, and the root SiteShell. SiteShell composes the global experience in this order:

1. Skip-to-content link
2. Announcement bar
3. Sticky site header
4. Route transition and main content
5. Premium site footer
6. Cookie consent

The root remains a Server Component. Client boundaries are limited to scroll state, menus, global search, mobile navigation, theme selection, consent persistence, newsletter UI state, and route motion.

## Central settings

| File                       | Ownership                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `src/config/company.ts`    | Company name, legal name, description, tagline, email, location, and canonical URL                                 |
| `src/config/navigation.ts` | Primary navigation, four mega-menu sections, solutions dropdown, featured card, search index, and consultation CTA |
| `src/config/footer.ts`     | Company/services/solutions/resources/legal groups and social channels                                              |
| `src/config/shell.ts`      | Announcement and cookie-consent configuration                                                                      |
| `src/config/site.ts`       | SEO defaults derived from central company settings                                                                 |

Components must consume these settings instead of duplicating labels, addresses, or navigation structures.

## Header

`SiteHeader` is sticky and transparent at the top of the viewport. After 12px of scrolling it adds a semantic background, surface blur, border, and subtle elevation. Transitions use the design-system duration and easing tokens.

At `xl` and above the header provides:

- Ayeb Solutions logo and home link
- Home
- Services mega menu
- Solutions dropdown
- Portfolio
- Case Studies
- Blog
- About
- Contact
- Search
- Theme switcher
- Book Consultation CTA

Below `xl`, a swipe-capable Vaul drawer replaces desktop navigation. It includes direct destinations, nested Services/Solutions/Resources/Company groups, and the consultation CTA.

Active route state uses `aria-current="page"` and a visual indicator. Dropdowns use Radix keyboard navigation, focus management, Escape dismissal, and roving focus. The mobile drawer provides focus trapping, a visible close control, Escape/outside-click dismissal, and large touch targets.

## Mega menu

The Services trigger opens a four-section SaaS-style menu:

- Services
- Solutions
- Resources
- Company

Each link may include an icon and description. The featured card and CTA are driven by `featuredNavigation`; no featured copy is embedded in the component. Solutions also has a focused dropdown for audience-specific destinations.

## Global search

`GlobalSearch` opens from its labeled header button or `Ctrl/Command + K`. It uses cmdk and the Sprint 2 CommandDialog for filtering and keyboard selection. Destinations are deduplicated by URL before rendering. Search is intentionally navigation UI only and has no backend.

## Theme

`ThemeSwitcher` supports Light, Dark, and System modes. next-themes stores preference under `ayeb-theme`, respects operating-system preference, updates `color-scheme`, and avoids hydration mismatch by disabling selection until mounted.

## Announcement and consent

The announcement is controlled by `announcementConfig`. Dismissal is stored against the announcement ID, allowing a new announcement to appear when configuration changes.

Cookie consent supports Essential Only and Accept All. The selected level is stored under a versioned key and dispatched as a `cookie-consent-change` browser event for future analytics integration. The banner is a labeled non-modal dialog with a policy link and keyboard-operable actions.

## Footer

The footer includes:

- Global consultation CTA
- Brand, company description, email, and service location
- Company, Services, Solutions, Resources, and Legal navigation groups
- Labeled external social links
- Newsletter UI
- Dynamic copyright year
- Company tagline

The newsletter is explicitly UI-only for this sprint. Native email validation, a visible label for assistive technology, and a polite confirmation state are included; no network request is made.

## Breadcrumbs and SEO

`SiteBreadcrumbs` requires at least one breadcrumb and renders:

- A labeled breadcrumb landmark
- An ordered list
- Home icon on the first item
- `aria-current="page"` on the final item
- Absolute schema.org BreadcrumbList URLs derived from the central company URL
- Escaped JSON-LD

The root layout adds Organization JSON-LD and retains Sprint 1 metadata, Open Graph, Twitter, canonical URL, favicon, robots, and sitemap configuration.

## Route states

| File                       | Behavior                                                       |
| -------------------------- | -------------------------------------------------------------- |
| `src/app/loading.tsx`      | Responsive route skeleton with `aria-busy` and a loading label |
| `src/app/not-found.tsx`    | Branded, non-indexable 404 state                               |
| `src/app/error.tsx`        | Recoverable segment-level 500 state                            |
| `src/app/global-error.tsx` | Root-level 500 fallback with its own document shell            |
| `src/app/offline/page.tsx` | Non-indexable offline status page                              |

`PageTransition` keys content by pathname, uses AnimatePresence, and disables spatial motion when reduced motion is requested.

## Responsive contract

- Minimum supported viewport: 320px.
- Header switches at `xl` to avoid compressed desktop navigation.
- Mobile navigation uses at most 92vw and caps at 28rem.
- Footer navigation progresses from two to three to five columns.
- Footer CTA and newsletter stack before using horizontal layouts.
- Status-page actions stack on mobile.
- Mega-menu width is bounded by the viewport.
- Touch controls maintain at least 36–44px interactive dimensions.

## Accessibility contract

- All global landmarks are labeled and semantic.
- A focusable skip link targets the main region.
- Focus indicators use the shared ring token.
- Icon-only controls require accessible names.
- Menus, command search, and drawers support full keyboard operation.
- Active destinations expose `aria-current`.
- External social links provide accessible names and safe `rel` attributes.
- Motion respects `prefers-reduced-motion`.
- Theme initialization and persisted UI use hydration-safe mounted states.
