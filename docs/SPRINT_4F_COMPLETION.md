# Sprint 4F Completion

Sprint 4F adds only the Development Process & Why Choose Ayeb section directly after the AI Automation Showcase. It does not add industries, testimonials, FAQ, blog, contact, or any later homepage section.

## Files and architecture

- `src/features/home/components/process-showcase.tsx` owns the server-rendered section content and composition.
- `src/features/home/components/process-showcase.module.css` owns the section atmosphere, timeline connector, restrained pulse, hover treatment, and reduced-motion fallback.
- `src/features/home/index.ts` exposes the section through the homepage feature boundary.
- `src/app/page.tsx` places the section immediately after `AutomationShowcaseSection`.
- The existing Radix-based `Accordion` supplies expandable timeline behavior, semantic buttons, keyboard operation, measured-height animation, and state attributes. No additional custom client state was introduced.

## Process timeline

The ordered six-stage client journey covers Discovery, Strategy & Planning, Design, Development, Testing & Launch, and Growth & Support. Each stage has a numbered timeline node, Lucide icon, exact stage summary, honest supporting context, and three expandable focus areas. The visual alternates around a central connector at desktop widths and becomes a left-rail timeline on smaller screens.

## Why choose Ayeb

The comparison matrix documents the practical approach to transparent communication, scalable architecture, performance, clean code, accessibility, SEO, modern technology selection, and long-term support. Each entry explicitly distinguishes its focus from “Our approach” and avoids awards, certifications, statistics, or guaranteed outcomes.

## Quality practices

The high-contrast checklist covers type safety, responsive design, accessibility reviews, code reviews, performance optimization, security best practices, documentation, version control, testing, and deployment verification. Copy uses scope-aware language such as “we include,” “we aim to,” and “our process emphasizes.”

## Responsive and accessibility contract

- Layouts support the documented 320px minimum and progressively adapt at 375px, 768px, 1024px, 1440px, and larger displays.
- Timeline cards remain single-column with a visible connector until the alternating desktop layout has sufficient room.
- CTA actions stack on compact screens and align horizontally when space permits.
- Heading hierarchy continues with one section `h2`, subsection `h3` elements, and item `h4` elements; no additional `h1` is introduced.
- Accordion triggers are keyboard operable, communicate expanded state, and retain visible shared focus styling.
- Icons are decorative where adjacent text provides the accessible name. Lists and section relationships carry explicit labels.
- Semantic color tokens provide light/dark themes, while status checks use icon and text rather than color alone.
- CSS and shared motion utilities disable nonessential movement under `prefers-reduced-motion`.

## Senior UI/UX review

The review replaced an ambiguous desktop column legend with explicit per-item “Focus” and “Our approach” labels. This makes the comparison understandable at every breakpoint. The three major blocks intentionally use different visual grammars—editorial timeline, structured comparison matrix, and high-contrast checklist—to prevent repetitive card-grid presentation while retaining the existing typography, radius, border, spacing, and motion tokens.

## Verification

- `npm run lint`: passes with zero warnings or errors.
- `npm run typecheck`: passes with zero TypeScript errors.
- `npm run build`: passes; the homepage is statically prerendered.
- Served production HTML returns HTTP 200, retains a single `h1`, includes the Sprint 4F heading, and exposes interactive disclosure state.
- Source review found no `TODO`, `FIXME`, console calls, explicit `any`, duplicate section logic, fake certifications, awards, statistics, or guarantees in Sprint 4F.

Sprint 4G and all other later homepage work remain deferred.
