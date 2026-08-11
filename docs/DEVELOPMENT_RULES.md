You are continuing development of the Ayeb Solutions platform.

## Context

Before making changes:

- Read the relevant documentation in the `/docs` directory, especially:
  - architecture.md
  - CHECKLIST.md
  - Any sprint completion documents related to this feature
- Treat the documentation as the source of truth.
- Do not modify unrelated features.
- Complete ONLY the assigned sprint.
- Preserve the current architecture.

## Current Architecture

Public website (static):

- Home
- About
- Services
- Solutions
- Contact
- FAQ
- Privacy
- Terms
- Cookies
- Accessibility

Dynamic CMS:

- Portfolio
- Blog
- Testimonials
- Media
- Contact Leads

Admin:

- Dashboard
- Portfolio
- Blog
- Testimonials
- Media
- Contact Leads

Do NOT reintroduce a global Settings CMS.
Do NOT make public pages CMS-driven unless explicitly requested.

## Code Quality

Maintain existing coding standards.

Do not:

- introduce duplicate code
- introduce dead code
- introduce unused imports
- introduce TODO or FIXME comments
- use explicit `any`
- use `console.log`
- modify unrelated files

Prefer:

- reusable components
- server components where appropriate
- accessibility-first implementations
- responsive layouts
- SEO-friendly markup

## UI Standards

The website should feel like a premium modern digital agency.

Avoid generic templates.

Review your own work as a senior UI/UX designer before finishing.

Improve anything that feels average.

Maintain consistency in:

- spacing
- typography
- animations
- hover states
- border radius
- shadows
- colors
- iconography

## Before Completion

Verify:

- npm run lint
- npm run typecheck
- npm run build
- git diff --check

Review:

- responsiveness
- accessibility
- dark mode
- reduced motion
- SEO
- performance

Update documentation if architecture changes.

Create a detailed sprint completion report.

Do not begin another sprint.
