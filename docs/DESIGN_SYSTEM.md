# Ayeb Solutions Design System

Sprint 2 establishes the reusable UI system. It does not create routes or website content. Import the complete public API from `@/components`, or a narrower boundary such as `@/components/ui`, `@/components/cards`, `@/components/layout`, `@/components/navigation`, or `@/components/motion`.

## Design tokens

Tokens are defined in `tailwind.config.ts`, semantic color variables live in `src/app/globals.css`, and animation/runtime values are exported by `src/config/design-tokens.ts`.

| Category    | Scale                                                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Colors      | background, foreground, card, popover, primary, secondary, muted, accent, destructive, success, warning, border, input, ring; every semantic color has a dark-mode value |
| Typography  | Geist Sans and Mono; responsive `display-2xl`, `display`, and `headline`; Tailwind text scale for body and labels                                                        |
| Spacing     | Tailwind base scale plus 18, 22, and 30; `section-spacing` provides responsive section rhythm                                                                            |
| Radius      | `sm`, `md`, and `lg` derive from `--radius`                                                                                                                              |
| Borders     | semantic `border`, `input`, and `ring` colors; one-pixel default boundaries                                                                                              |
| Elevation   | `shadow-xs`, `shadow-soft`, and `shadow-elevated`                                                                                                                        |
| Containers  | reading 44rem, content 72rem, wide 87.5rem, and full width                                                                                                               |
| Breakpoints | sm 640, md 768, lg 1024, xl 1280, 2xl 1536                                                                                                                               |
| Motion      | fast 150ms, normal 250ms, slow 400ms; standard, entrance, and exit easing curves                                                                                         |
| Z-index     | dropdown 1000, sticky 1100, overlay 1200, modal 1300, toast 1400, tooltip 1500                                                                                           |
| Opacity     | subtle 8%, disabled 50%, overlay 72%                                                                                                                                     |
| Blur        | xs 2px, surface 12px, ambient 64px                                                                                                                                       |
| Grid        | 12 columns; 1rem mobile and 1.5rem desktop gutters                                                                                                                       |

All components use semantic tokens. Consumers must not introduce feature-specific colors into primitives.

## Core controls

| Component    | Important props and usage                                                                                                          | Accessibility and responsive behavior                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `Button`     | `variant`, `size`, `asChild`; use for actions or compose with `Link`                                                               | Visible focus, disabled state, 36–44px heights; labels remain visible except icon-only usage     |
| `IconButton` | Requires `label`; accepts Button variants and `sm/default/lg`                                                                      | Always supplies an accessible name and square touch target                                       |
| `Label`      | `htmlFor` must match the control `id`                                                                                              | Radix label activates its associated input                                                       |
| `Input`      | Native input props and ref                                                                                                         | Native semantics, focus and disabled states, full-width by default                               |
| `Textarea`   | Native textarea props; vertically resizable                                                                                        | Preserves keyboard operation and adapts to its container                                         |
| `Select`     | Root state; compose `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectLabel`, `SelectItem`, `SelectSeparator` | Radix supplies keyboard navigation, typeahead, focus management, and ARIA; trigger is full-width |
| `Checkbox`   | `checked`, `onCheckedChange`, `disabled`                                                                                           | Radix tri-state semantics and keyboard behavior                                                  |
| `RadioGroup` | Compose with labeled `RadioGroupItem` controls                                                                                     | Arrow-key navigation and single-selection semantics                                              |
| `Switch`     | `checked`, `onCheckedChange`; pair with `Label`                                                                                    | Switch role and Space-key operation; 44px-wide target                                            |
| `SearchBar`  | `label` defaults to “Search”; all native input props                                                                               | Explicit accessible name, native search semantics, fluid width                                   |

Example:

```tsx
<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" autoComplete="email" />
</div>
```

## Feedback and status

| Component           | Important props and usage                                                 | Accessibility and responsive behavior                                      |
| ------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `Badge`             | `variant`: default, secondary, outline, success, warning, destructive     | Status color is paired with text; compact inline layout                    |
| `Alert`             | `variant`; compose `AlertTitle` and `AlertDescription`                    | Uses `role="alert"`; icons remain decorative                               |
| `Toaster` / `toast` | `Toaster` is mounted once by `Providers`; call `toast.success/error/info` | Sonner supplies live regions, dismiss controls, and responsive positioning |
| `Skeleton`          | Set dimensions with `className`                                           | Hidden from assistive technology to avoid false content                    |
| `Spinner`           | `label` describes the pending work                                        | Uses `role="status"` with screen-reader text                               |
| `Progress`          | `value` from 0–100                                                        | Radix progress semantics; clamps visual values and spans available width   |
| `Callout`           | `title`, children                                                         | Semantic aside; icon is decorative; wraps naturally                        |
| `EmptyState`        | `title`, `description`, optional composed `action`                        | Clear heading and optional keyboard-operable action; centered fluid layout |
| `ErrorState`        | Same action composition as EmptyState                                     | Uses `role="alert"`; destructive semantics do not rely on color alone      |

## Overlays and disclosure

| Component family | Parts and props                                                                              | Accessibility and responsive behavior                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Tooltip`        | `Tooltip`, `TooltipTrigger`, `TooltipContent`; provider is global                            | Radix handles delay, ARIA description, Escape, and focus; use for supplemental—not essential—content                |
| `Popover`        | `Popover`, `PopoverTrigger`, `PopoverContent`                                                | Managed focus, Escape and outside-click dismissal; 18rem default width                                              |
| `DropdownMenu`   | Trigger, content, group, item, checkbox/radio item, label, separator, portal, sub-menu parts | Complete menu keyboard model, roving focus, checked states, and nested navigation                                   |
| `Accordion`      | Root, item, trigger, content                                                                 | Semantic headings/buttons, keyboard control, animated measured height                                               |
| `FAQItem`        | `value`, `question`, children inside an Accordion                                            | Reuses Accordion semantics and fluid content                                                                        |
| `Tabs`           | Root, list, trigger, content                                                                 | Arrow-key tab navigation, selected state, and focusable panels; list may be given overflow styles on narrow screens |
| `Dialog`         | Trigger, content, header, footer, title, description, close                                  | Focus trap, initial focus, Escape, modal labeling; content is viewport-constrained                                  |
| `Drawer`         | Trigger, content, header, footer, title, description, close                                  | Vaul dialog semantics and drag behavior; max 90dvh with a mobile-first bottom position                              |
| `Sheet`          | Dialog-based API plus `side` top/right/bottom/left                                           | Focus trap and modal labeling; side sheets are capped at a readable width                                           |
| `CommandDialog`  | `open`, `onOpenChange`, optional title/description; compose Command parts                    | Hidden dialog title/description, keyboard filtering and selection; list scrolls within viewport                     |
| `Command`        | Input, list, empty, group, item, separator, shortcut                                         | cmdk active-option semantics and keyboard navigation                                                                |

Every modal must include a title and description, visible or screen-reader-only. Every overlay trigger must remain keyboard focusable.

## Data display and navigation helpers

| Component      | Important props and usage                                                         | Accessibility and responsive behavior                                                              |
| -------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `Avatar`       | Compose image and fallback; provide meaningful `alt` or empty alt when decorative | Circular crop with deterministic text fallback                                                     |
| `Separator`    | `orientation`, `decorative`                                                       | Decorative by default; set `decorative={false}` only when structurally meaningful                  |
| `Breadcrumb`   | Compose list, item, link, page, separator, ellipsis                               | Labeled nav, ordered list, `aria-current="page"`; wraps on small screens                           |
| `Pagination`   | Compose content/items/links/previous/next; use `isActive`                         | Labeled navigation, active page semantics, named previous/next controls                            |
| `Table`        | Header, body, footer, row, head, cell, caption                                    | Native table semantics; wrapper scrolls horizontally on narrow screens; use `scope="col"` on heads |
| `DataTable<T>` | `caption`, typed `columns`, `data`, `getRowKey`, `emptyMessage`                   | Always includes a caption and column scopes; responsive horizontal overflow; no `any`              |

## Cards

`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter` are compositional primitives. The following specialized cards share `ContentCard` rather than duplicating structure.

| Component                 | Props and usage                                                                                                  | Accessibility and responsive behavior                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `ContentCard`             | `title`, `description`, optional `eyebrow`, `media`, `icon`, `href`, `linkLabel`, children                       | Heading-led structure, descriptive link label, full-height fluid layout       |
| `FeatureCard`             | ContentCard props for benefit summaries                                                                          | Responsive through parent Grid                                                |
| `ServiceCard`             | ContentCard props for service summaries                                                                          | No service-specific business logic                                            |
| `ProjectCard`             | ContentCard props; use `media` for project artwork                                                               | Media keeps 16:9 ratio and clips overflow                                     |
| `BlogCard`                | ContentCard props; use eyebrow for category/date                                                                 | Semantic heading and descriptive action                                       |
| `TeamCard`                | `name`, `role`, optional `bio`, required `avatar`                                                                | Square media region; centered readable identity content                       |
| `TestimonialCard`         | `quote`, `name`, `role`, optional `avatar`                                                                       | Native blockquote; attribution remains visible                                |
| `PricingCard`             | `name`, `description`, `price`, `cadence`, `features`, `actionLabel`, optional composed `action`, and `featured` | Feature list uses text plus icons; CTA is full-width; cards equalize in grids |
| `StatCard` / `MetricCard` | `label`, `value`, optional `change`, `icon`                                                                      | Value is paired with a text label; flex layout wraps safely                   |

## Navigation components

Navigation accepts the shared `NavigationItem` and `SocialLink` types from `@/types/navigation`.

| Component          | Props and usage                                                        | Accessibility and responsive behavior                                                           |
| ------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `Navbar`           | `brand`, `items`, optional `actions`                                   | Sticky, blurred semantic header; desktop nav at lg, mobile trigger below lg                     |
| `MegaMenu`         | One NavigationItem with `children`                                     | Opens on hover and focus-within; child links have visible focus and descriptions                |
| `MobileNavigation` | `items`, `brand`                                                       | Sheet-based focus trap, named trigger, closes after link selection                              |
| `Footer`           | `brand`, `description`, grouped links, optional socials, copyright     | Semantic footer with individually labeled nav groups; 1/2/12-column responsive grid             |
| `Sidebar`          | `label`, children                                                      | Semantic aside and labeled nav; full width on small screens, 16rem on lg                        |
| `SidebarGroup`     | `title`, children                                                      | Visible group heading                                                                           |
| `SidebarLink`      | `href`, optional icon, `active`                                        | `aria-current="page"` for active destinations                                                   |
| `ThemeSwitcher`    | No props; global-shell implementation supports Light, Dark, and System | Hydration-safe accessible name, persisted preference, system preference, and keyboard operation |

## Layout primitives and templates

| Component           | Props and usage                                    | Responsive behavior                                                               |
| ------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------- |
| `Container`         | `size`: reading, content, wide, full               | Responsive 1/1.5/2rem page gutters                                                |
| `SectionWrapper`    | `as`, `contained`, `containerSize`                 | Responsive 64/80/120px vertical rhythm                                            |
| `Grid`              | `columns`: 1, 2, 3, 4, 12; `gap`: sm, md, lg       | Multi-column variants collapse to one and then progressively expand               |
| `Stack`             | `direction`, `gap`, `align`                        | Composition primitive; callers may override direction at breakpoints with classes |
| `Eyebrow`           | `as`, children                                     | Polymorphic typography label                                                      |
| `SectionHeading`    | eyebrow, title, description, actions               | Balanced fluid headline and wrapping actions                                      |
| `SectionTemplate`   | heading object, item array, columns                | Standard headed grid section                                                      |
| `HeroLayout`        | common Template props and optional visual children | Two columns at lg; not a homepage or route                                        |
| `FeatureLayout`     | common Template props                              | Centered heading and responsive content region                                    |
| `ContentLayout`     | common Template props                              | 72rem content container                                                           |
| `CTALayout`         | common Template props                              | Stacked then two-column high-contrast panel                                       |
| `SplitLayout`       | common Template props                              | One column then equal columns at lg                                               |
| `PricingLayout`     | common Template props                              | Feature-layout composition for pricing content                                    |
| `TestimonialLayout` | common Template props                              | Feature-layout composition for testimonial content                                |
| `FAQLayout`         | common Template props                              | Reading-width disclosure region                                                   |
| `BlogLayout`        | common Template props                              | Feature-layout composition for article cards                                      |
| `PortfolioLayout`   | common Template props                              | Feature-layout composition for project cards                                      |

These are inert reusable templates. They contain no agency copy, routes, or product content.

## Timeline and progress patterns

| Component       | Props and usage                               | Accessibility and responsive behavior                                               |
| --------------- | --------------------------------------------- | ----------------------------------------------------------------------------------- |
| `Timeline`      | Ordered-list props                            | Preserves event order semantically and stays single-column                          |
| `TimelineItem`  | `title`, optional `date` and `icon`, children | Uses heading/time semantics and flexible mobile attribution                         |
| `StepIndicator` | typed `steps`, one-based `currentStep`        | Ordered progress with `aria-current="step"`; vertical on mobile, horizontal from sm |

## Motion utilities

All motion components honor `prefers-reduced-motion`; global CSS also removes nonessential transitions and animation when reduction is requested.

| Component/helper          | Props and usage                        | Behavior                                                                   |
| ------------------------- | -------------------------------------- | -------------------------------------------------------------------------- |
| `ScrollReveal`            | `variant`, `once`, motion div props    | In-view reveal with 20% visibility threshold                               |
| `Fade`                    | ScrollReveal props                     | Opacity entrance                                                           |
| `Slide`                   | `direction`: up/down/left/right        | 24px directional entrance                                                  |
| `Scale`                   | ScrollReveal props                     | Subtle 0.96 scale entrance                                                 |
| `Stagger` / `StaggerItem` | motion div props                       | 80ms child sequencing                                                      |
| `Parallax`                | `offset`, motion div props             | Scroll-linked translation disabled for reduced motion                      |
| `Counter`                 | `value`, `duration`, `formatter`       | In-view spring counter; renders final value immediately for reduced motion |
| `HoverLift`               | motion div props                       | 4px hover lift disabled for reduced motion                                 |
| `motionVariants`          | fade, slide directions, scale, stagger | Shared Framer Motion variants prevent duplicated timing logic              |

## Global utilities

- `text-balance`: balanced headings.
- `surface`: standard border, card background, foreground, and low elevation.
- `section-spacing`: responsive vertical section rhythm.
- `content-grid`: responsive 1/2/12-column grid.
- `sr-only-focusable`: skip-link pattern.
- `focus-ring`: consistent visible keyboard focus.
- `animate-enter` and `animate-exit`: tokenized CSS entrances/exits.
- `cn(...)`: conditional class composition with Tailwind conflict resolution.

## Accessibility rules for consumers

1. Give icon buttons and search fields explicit labels.
2. Pair every form control with a visible Label and surface validation text with `aria-describedby`.
3. Include Dialog, Drawer, and Sheet titles and descriptions.
4. Preserve heading order when using cards and templates.
5. Supply meaningful image alt text; use empty alt text for decorative images.
6. Never communicate status through color alone.
7. Test keyboard navigation at 320px, 768px, 1024px, and 1440px widths.
