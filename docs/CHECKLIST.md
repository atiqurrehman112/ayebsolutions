# Master Completion Checklist

## Sprint 13C — Founder Profile CMS

- [x] Forward-only singleton Founder migration with Media Library relationships, audit fields, trigger, indexes, and RLS
- [x] Typed Founder repository, database contracts, Zod validation, Server Action, and tagged public loader
- [x] Protected `/admin/founder` editor with role-aware read/write behavior and published Media Library selection
- [x] Full identity, biography, contact, social, experience, expertise, direction, availability, and publication fields
- [x] Public `/team` founder centerpiece uses published CMS data and conditional Person schema
- [x] Independent graceful fallback when no published Founder record exists
- [x] Server-first rendering, responsive admin/public layouts, dark mode, visible focus, and reduced motion

## Sprint 13B — Premium Team Page & CMS Integration

- [x] Public `/team` route with five-minute ISR and graceful CMS failure handling
- [x] Static editorial hero, founder spotlight, company culture, values, and hiring CTA
- [x] Published-only Team CMS member projection through existing repositories and RLS
- [x] Featured-first, display-order, name sorting with optional Media Library portraits
- [x] Honest empty state with founder content preserved
- [x] Header, mobile, mega-menu, footer, search, and sitemap Team destinations use `/team`
- [x] Canonical, Open Graph, Twitter, Organization, WebPage, Person, and BreadcrumbList SEO
- [x] One H1, semantic hierarchy, keyboard focus, dark mode, and reduced-motion support

## Sprint 13A — Team CMS

- [x] Forward-only `team_members` migration with indexes, audit fields, trigger, and RLS
- [x] Typed Team repository, generated-style database contracts, and Zod validation
- [x] Role-aware Team Server Actions for CRUD, publication, featured placement, and ordering
- [x] Protected Team list with search, filters, sorting, and 25/50/100 pagination
- [x] Accessible create/edit/delete dialogs and Media Library portrait selection
- [x] Drag-and-drop ordering with keyboard-accessible move controls
- [x] Loading, error, empty, read-only, responsive, and reduced-motion states
- [x] Admin sidebar and dashboard registration; no public Team route

## Foundation

- [ ] Project created
- [ ] Git configured
- [ ] Vercel connected
- [ ] Environment configured

## UI

- [x] Design system
- [x] Navigation
- [x] Footer
- [x] Homepage hero (Sprint 4A)
- [x] Homepage trust and social proof (Sprint 4B)
- [x] Homepage services overview (Sprint 4C)
- [x] Homepage portfolio and case studies preview (Sprint 4D)
- [x] Homepage interactive AI automation showcase (Sprint 4E)
- [x] Homepage development process and why choose Ayeb (Sprint 4F)
- [x] Homepage industries showcase (Sprint 4G)
- [x] Homepage frequently asked questions (Sprint 4H)
- [x] Homepage final conversion CTA (Sprint 4I)
- [x] Premium homepage agency experience and focused testimonial carousel (Sprint 11A)
- [x] Premium CMS-backed portfolio listing and case-study experience (Sprint 11B)
- [x] Premium CMS-backed Blog listing and editorial reading experience (Sprint 11C)
- [x] Premium static About agency experience (Sprint 11D)
- [x] Services landing page (Sprint 5A)
- [x] Web development service page (Sprint 5B)
- [x] AI automation service page (Sprint 5C)
- [x] Custom SaaS service page (Sprint 5D)
- [x] UI/UX design service page (Sprint 5E)
- [x] API integration service page (Sprint 5F)
- [x] Maintenance and support service page (Sprint 5G)
- [x] Portfolio landing page (Sprint 6A)
- [x] Portfolio project pages (Sprint 6B)
- [x] About page (Sprint 6C)
- [x] Contact page and static lead-capture UI (Sprint 6D)
- [x] Blog and insights landing page (Sprint 6E)
- [x] Individual blog article pages (Sprint 6F)
- [x] Admin shell and static authentication preview (Sprint 7A)
- [x] Static admin portfolio management preview (Sprint 7B)
- [x] Static admin blog management preview (Sprint 7C)
- [x] Static admin services management preview (Sprint 7D)
- [x] Static admin testimonials management preview (Sprint 7E)
- [x] Static admin media library preview (Sprint 7F)
- [x] Static admin contact leads management preview (Sprint 7G)
- [x] Static admin settings management preview (Sprint 7H)
- [x] Supabase admin authentication foundation (Sprint 8A)
- [x] Supabase CMS database foundation (Sprint 8B)
- [x] Portfolio CRUD integration with role-aware lifecycle actions (Sprint 8C)
- [x] Blog CRUD integration with editorial workflow and server-side discovery (Sprint 8D)
- [x] Services CRUD integration with sorting and publication workflow (Sprint 8E)
- [x] Testimonials CRUD integration with consent-aware moderation (Sprint 8F)
- [x] Cloudinary and Supabase media-library integration (Sprint 8G)
- [x] Supabase contact-leads CRM and Resend workflow (Sprint 8H)
- [x] Supabase site-settings CMS and public configuration integration (Sprint 8I)
- [x] Dynamic public portfolio with Supabase, ISR, filters, and project SEO (Sprint 9A)
- [x] Dynamic public blog with Supabase, ISR, discovery, and article SEO (Sprint 9B)
- [x] Dynamic public services with Supabase, ISR, filtering, and service SEO (Sprint 9C)
- [x] Dynamic production homepage with repository-backed CMS sections (Sprint 9D)
- [x] Dynamic public testimonials with consent-gated CMS content (Sprint 9E)
- [x] Production contact form with Supabase CRM capture and Resend delivery (Sprint 9F)
- [x] Premium Contact presentation with preserved production lead workflow (Sprint 11E)
- [x] Premium Testimonials presentation with preserved consent-gated CMS workflow (Sprint 11F)
- [x] Premium static business-solutions experience (Sprint 12A)
- [x] Premium reusable long-form service-detail experience (Sprint 12B)
- [x] Complete Cloudinary Media Library integration across public rendering and SEO (Sprint 10A)
- [x] Homepage
- [ ] Services
- [ ] Solutions
- [x] Portfolio
- [ ] Case Studies
- [x] Blog
- [ ] Careers
- [x] Contact

## CMS

- [x] Authentication foundation (Supabase Auth)
- [x] Database foundation, RLS, repositories, and validation (Supabase PostgreSQL)
- [ ] Dashboard
- [x] Blog management (Supabase CRUD integration)
- [x] Portfolio management (Supabase CRUD integration)
- [x] Static Services catalogue (obsolete admin Services module removed in CP4)
- [x] Testimonials management (Supabase CRUD integration)
- [x] Media library (Cloudinary and Supabase CRUD integration)
- [x] Contact leads (Supabase CRM and Resend email history)
- [x] Static SEO and company configuration (Settings CMS removed in CP3)
- [x] Team management

## Quality

- [x] Responsive
- [x] Accessibility
- [x] SEO
- [ ] Dark mode
- [ ] Animations
- [x] Performance
- [x] Error handling

## Verification

- [ ] npm install
- [x] npm run lint
- [x] npm run build
- [x] npm run typecheck
- [x] No console errors
- [ ] No broken links
- [x] No duplicate components
- [x] Documentation updated

## Release

- [ ] GitHub merged
- [ ] Preview deployment verified
- [ ] Production deployment verified
- [ ] Domain connected
- [ ] Final review completed

The project is complete only when every checkbox above is checked.
