import {
  Activity,
  ArrowRight,
  BarChart3,
  Blocks,
  BookOpenCheck,
  Boxes,
  Braces,
  Building2,
  Check,
  CircleGauge,
  Cloud,
  Code2,
  ContainerIcon,
  Database,
  FileCode2,
  Github,
  Globe2,
  KeyRound,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  LockKeyhole,
  MonitorCheck,
  MousePointerClick,
  Network,
  PanelsTopLeft,
  PenTool,
  PlugZap,
  Rocket,
  Search,
  SearchCheck,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TestTube2,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/disclosure";
import { Badge } from "@/components/ui/status";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";
import styles from "./web-development-page.module.css";

interface IconContent {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface WebsiteType extends IconContent {
  readonly examples: readonly string[];
}

interface DemoProject {
  readonly title: string;
  readonly status: "Internal Demo" | "Concept Project" | "Prototype";
  readonly description: string;
  readonly technologies: readonly string[];
  readonly visual: "school" | "auction" | "crm" | "restaurant" | "admin";
}

const customAdvantages: readonly IconContent[] = [
  {
    title: "Designed beyond templates",
    description:
      "Information architecture, components, and interactions follow the actual audience and content instead of a theme's assumptions.",
    icon: LayoutTemplate,
  },
  {
    title: "Performance by architecture",
    description:
      "Rendering, asset delivery, data access, and interaction cost are considered before visual polish is layered on top.",
    icon: CircleGauge,
  },
  {
    title: "Room to evolve",
    description:
      "Clear boundaries and reusable systems make credible future changes easier without engineering for imaginary scale.",
    icon: Boxes,
  },
  {
    title: "Security in context",
    description:
      "Validation, permissions, dependency care, and integration boundaries are shaped around the system's real exposure and risk.",
    icon: ShieldCheck,
  },
  {
    title: "Practical ownership",
    description:
      "Documented code, portable content, and clear deployment decisions reduce unnecessary dependence on opaque tools.",
    icon: KeyRound,
  },
  {
    title: "Long-term value",
    description:
      "Maintainability, accessibility, and measurement are built into delivery so future work starts from a dependable foundation.",
    icon: LifeBuoy,
  },
] as const;

const websiteTypes: readonly WebsiteType[] = [
  {
    title: "Business Websites",
    description:
      "Clear, credible web experiences that connect services, proof, and conversion paths.",
    examples: ["Service architecture", "Lead journeys", "Content systems"],
    icon: Globe2,
  },
  {
    title: "Corporate Websites",
    description:
      "Structured multi-audience platforms for complex organizations and content teams.",
    examples: ["Content governance", "Regional content", "Editorial workflows"],
    icon: Building2,
  },
  {
    title: "Landing Pages",
    description:
      "Focused campaign and product narratives designed around one meaningful action.",
    examples: [
      "Campaign launches",
      "Product stories",
      "Experiment-ready sections",
    ],
    icon: MousePointerClick,
  },
  {
    title: "Dashboards",
    description:
      "Readable operational views that make important data and actions easier to understand.",
    examples: ["Role-based views", "Data visualization", "Operational status"],
    icon: BarChart3,
  },
  {
    title: "Customer Portals",
    description:
      "Secure self-service spaces for accounts, documents, requests, and ongoing activity.",
    examples: ["Account areas", "Document access", "Request tracking"],
    icon: Users,
  },
  {
    title: "Admin Panels",
    description:
      "Purpose-built internal interfaces for managing content, operations, and permissions.",
    examples: [
      "Content operations",
      "Access control",
      "Audit-friendly actions",
    ],
    icon: LayoutDashboard,
  },
  {
    title: "Marketplaces",
    description:
      "Multi-sided discovery and transaction experiences with explicit trust and workflow states.",
    examples: ["Listings", "Search and filters", "Transaction journeys"],
    icon: ShoppingBag,
  },
  {
    title: "SaaS Applications",
    description:
      "Maintainable product foundations for recurring workflows, teams, and account structures.",
    examples: [
      "Product onboarding",
      "Workspace models",
      "Subscription-ready flows",
    ],
    icon: PanelsTopLeft,
  },
] as const;

const includedFeatures: readonly IconContent[] = [
  {
    title: "Responsive Design",
    description:
      "Layouts planned for touch, narrow screens, laptops, and wide displays.",
    icon: Smartphone,
  },
  {
    title: "SEO Foundations",
    description:
      "Semantic structure, metadata, crawl controls, and structured-data planning.",
    icon: SearchCheck,
  },
  {
    title: "Accessibility",
    description:
      "Keyboard, focus, contrast, semantics, and motion preferences reviewed.",
    icon: MonitorCheck,
  },
  {
    title: "Fast Performance",
    description:
      "Rendering and asset decisions shaped around responsive user experience.",
    icon: Activity,
  },
  {
    title: "Security",
    description:
      "Risk-aware validation, permissions, configuration, and dependency practices.",
    icon: LockKeyhole,
  },
  {
    title: "CMS Integration",
    description:
      "Content workflows selected around editor needs and governance.",
    icon: FileCode2,
  },
  {
    title: "Analytics",
    description:
      "Consent-aware measurement planning for useful product and content signals.",
    icon: BarChart3,
  },
  {
    title: "Contact Forms",
    description:
      "Accessible capture flows with validation, delivery, and abuse controls.",
    icon: PenTool,
  },
  {
    title: "API Integrations",
    description:
      "Typed connections to suitable business tools and data providers.",
    icon: PlugZap,
  },
  {
    title: "Hosting Guidance",
    description:
      "Deployment recommendations matched to runtime and operational needs.",
    icon: Cloud,
  },
] as const;

const technologies = [
  {
    name: "Next.js",
    role: "Rendering, routing, and production web foundations",
    icon: Globe2,
  },
  {
    name: "React",
    role: "Composable and accessible interface systems",
    icon: Blocks,
  },
  {
    name: "TypeScript",
    role: "Clear contracts across application boundaries",
    icon: Braces,
  },
  {
    name: "Node.js",
    role: "Server-side application and integration logic",
    icon: ServerCog,
  },
  {
    name: "PostgreSQL",
    role: "Reliable relational application data",
    icon: Database,
  },
  {
    name: "Prisma",
    role: "Typed data access and schema evolution",
    icon: ContainerIcon,
  },
  {
    name: "Docker",
    role: "Consistent, portable runtime environments",
    icon: Boxes,
  },
  {
    name: "Tailwind CSS",
    role: "Token-led responsive interface styling",
    icon: Sparkles,
  },
  {
    name: "Cloudinary",
    role: "Managed image and media transformation",
    icon: Cloud,
  },
  {
    name: "Vercel",
    role: "Web delivery and deployment workflows",
    icon: Rocket,
  },
  {
    name: "GitHub",
    role: "Version control, review, and delivery history",
    icon: Github,
  },
] as const;

const processSteps = [
  {
    title: "Discovery",
    description:
      "Align on goals, users, content, constraints, and success signals.",
    detail: "Stakeholder context, existing systems, audience needs",
    icon: Search,
  },
  {
    title: "Planning",
    description:
      "Define scope, architecture, milestones, risks, and responsibilities.",
    detail: "Technical direction, dependencies, delivery plan",
    icon: Workflow,
  },
  {
    title: "Wireframes",
    description:
      "Resolve structure and journeys before visual detail adds cost.",
    detail: "Information architecture, priority flows, content hierarchy",
    icon: LayoutTemplate,
  },
  {
    title: "UI Design",
    description:
      "Create a coherent responsive interface grounded in the design system.",
    detail: "Visual direction, components, states, prototypes",
    icon: PenTool,
  },
  {
    title: "Development",
    description:
      "Build the experience in typed, reviewable, production-minded increments.",
    detail: "Frontend, backend, data, integrations",
    icon: Code2,
  },
  {
    title: "Testing",
    description:
      "Review important behavior across devices, inputs, and failure conditions.",
    detail: "Accessibility, performance, browser, functional review",
    icon: TestTube2,
  },
  {
    title: "Deployment",
    description:
      "Configure production, verify the release, and document operations.",
    detail: "Environment, domain, monitoring, production checks",
    icon: Rocket,
  },
  {
    title: "Maintenance",
    description: "Plan updates and improvements around changing product needs.",
    detail: "Dependencies, issues, optimization, planned releases",
    icon: LifeBuoy,
  },
] as const;

const demoProjects: readonly DemoProject[] = [
  {
    title: "School Management Portal",
    status: "Internal Demo",
    description:
      "A role-aware operations concept for attendance, scheduling, and academic records.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    visual: "school",
  },
  {
    title: "Car Auction Platform",
    status: "Prototype",
    description:
      "A marketplace prototype exploring vehicle discovery, bid states, and auction activity.",
    technologies: ["React", "Node.js", "Prisma"],
    visual: "auction",
  },
  {
    title: "AI CRM Dashboard",
    status: "Internal Demo",
    description:
      "A bounded AI workflow study for lead context, review, and sales follow-up planning.",
    technologies: ["Next.js", "OpenAI", "PostgreSQL"],
    visual: "crm",
  },
  {
    title: "Restaurant Website",
    status: "Concept Project",
    description:
      "An editorial hospitality concept focused on menus, atmosphere, and reservation intent.",
    technologies: ["Next.js", "Tailwind CSS", "Cloudinary"],
    visual: "restaurant",
  },
  {
    title: "SaaS Admin Panel",
    status: "Prototype",
    description:
      "A product administration prototype for workspaces, permissions, and operational status.",
    technologies: ["React", "TypeScript", "Prisma"],
    visual: "admin",
  },
] as const;

const performancePillars: readonly IconContent[] = [
  {
    title: "Core Web Vitals",
    description:
      "We review loading, responsiveness, and visual stability in the context of real pages and devices.",
    icon: CircleGauge,
  },
  {
    title: "Technical SEO",
    description:
      "Crawlability, semantics, metadata, canonical signals, and structured data receive deliberate attention.",
    icon: SearchCheck,
  },
  {
    title: "Accessibility",
    description:
      "Inclusive structure and interaction are treated as engineering concerns, not a final overlay.",
    icon: MonitorCheck,
  },
  {
    title: "Mobile-first",
    description:
      "Content priority and interaction begin with constrained space before expanding to larger layouts.",
    icon: Smartphone,
  },
  {
    title: "Code quality",
    description:
      "Strong types, clear responsibilities, review, and documentation support safer future changes.",
    icon: BookOpenCheck,
  },
  {
    title: "Scalability",
    description:
      "Boundaries and data models are chosen for known needs and credible evolution without needless complexity.",
    icon: Network,
  },
] as const;

const webDevelopmentFaqs = [
  {
    question: "What makes a custom website different from a template website?",
    answer:
      "A custom website is planned around your content, audience, workflows, and technical constraints. A template can be appropriate for a narrow need, but it also brings predefined structure and assumptions that may limit experience, maintainability, or integration choices.",
  },
  {
    question: "How long does a custom web development project take?",
    answer:
      "Timing depends on scope, content readiness, integrations, feedback cycles, technical risk, and stakeholder availability. We establish a realistic plan after discovery rather than assigning a fixed duration before the work is understood.",
  },
  {
    question: "How much does a custom website cost?",
    answer:
      "Investment depends on the required experience, content, system behavior, integrations, and delivery responsibilities. Discovery allows the work to be scoped responsibly; this page does not present a one-size-fits-all package or price.",
  },
  {
    question: "Can you redesign and modernize an existing website?",
    answer:
      "Yes. We can first assess the current content, analytics, codebase, platform, search visibility, accessibility, and operational constraints, then recommend targeted improvements, staged modernization, or replacement where justified.",
  },
  {
    question: "Will the website work across mobile devices?",
    answer:
      "Responsive behavior is part of planning and implementation. We define content priority, navigation, touch targets, component behavior, and testing expectations across agreed viewport and browser ranges, including compact mobile layouts.",
  },
  {
    question: "What accessibility standards do you follow?",
    answer:
      "We use established web accessibility guidance to inform semantics, keyboard interaction, focus, contrast, labels, error communication, touch targets, and reduced motion. The appropriate conformance target and testing depth should be agreed for each project.",
  },
  {
    question: "Do you include search engine optimization?",
    answer:
      "We include technical SEO foundations such as semantic content, metadata, crawl controls, canonicals, structured data, and performance-minded delivery where relevant. Search rankings cannot be guaranteed because they also depend on content, competition, authority, and ongoing strategy.",
  },
  {
    question: "Can non-technical team members update the content?",
    answer:
      "Yes, when content editing is required we can integrate an appropriate content management workflow. The choice depends on content structure, editor roles, approval needs, hosting, and the team's preferred operating model.",
  },
  {
    question: "Can the website connect to our CRM or other tools?",
    answer:
      "Often, yes. Integration feasibility depends on the provider's API, authentication, permissions, limits, data quality, and commercial terms. We review those constraints before committing to a connection.",
  },
  {
    question: "How do you approach website security?",
    answer:
      "Security work is risk-based and can include input validation, permissions, secret handling, dependency management, secure headers, abuse controls, data minimization, and deployment configuration. Specific controls depend on the system and data involved.",
  },
  {
    question: "Who owns the website and source code after launch?",
    answer:
      "Ownership, licenses, third-party services, credentials, and handover responsibilities should be made explicit in the project agreement. Our approach favors transparent repositories and documented operational access rather than avoidable lock-in.",
  },
  {
    question: "Can you migrate content from our current website?",
    answer:
      "Yes, after assessing content quality, structure, volume, URLs, media, metadata, and platform constraints. Migration can be automated, manual, or hybrid, and should include validation and redirect planning where search continuity matters.",
  },
  {
    question: "How do you measure and improve website performance?",
    answer:
      "We examine rendering strategy, JavaScript, fonts, media, caching, data access, third-party scripts, and user-facing performance signals. Results vary by content, infrastructure, device, connection, and external dependencies, so we avoid promising a universal score.",
  },
  {
    question: "What happens after the website launches?",
    answer:
      "A post-launch arrangement can cover monitoring, issue response, dependency updates, content support, performance reviews, and planned improvements. The right maintenance model depends on the website's complexity and business importance.",
  },
  {
    question: "How do we start a web development project?",
    answer:
      "Begin by sharing the business goal, intended users, current challenges, desired capabilities, existing content and systems, and known constraints. An initial consultation can then identify the right discovery scope and next decision.",
  },
] as const;

function SectionIntroduction({
  eyebrow,
  title,
  description,
  id,
}: {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly id: string;
}) {
  return (
    <Fade>
      <div className="max-w-3xl">
        <Eyebrow className="mb-4 text-xs">{eyebrow}</Eyebrow>
        <h2 id={id} className="text-balance text-headline font-bold">
          {title}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </Fade>
  );
}

function CodeEditorVisual() {
  const codeLines = [
    ["01", "export default function Experience() {"],
    ["02", "  return <Product"],
    ["03", "    accessible"],
    ["04", "    responsive"],
    ["05", '    performance="intentional"'],
    ["06", "  />;"],
    ["07", "}"],
  ] as const;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border",
        styles.editor,
      )}
    >
      <div className="flex items-center justify-between border-b bg-background/70 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
        </div>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground">
          experience.tsx
        </span>
      </div>
      <div className="grid min-h-[22rem] sm:grid-cols-[0.28fr_0.72fr]">
        <div className="hidden border-r bg-muted/20 p-4 sm:block">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground">
            Project
          </p>
          <div className="mt-4 space-y-3 font-mono text-[0.65rem] text-muted-foreground">
            <p className="text-foreground">▾ src</p>
            <p className="pl-3">▾ components</p>
            <p className="pl-6 text-foreground">experience.tsx</p>
            <p className="pl-3">styles.css</p>
            <p>package.json</p>
          </div>
        </div>
        <div className="relative min-w-0 overflow-hidden p-4 sm:p-6">
          <div className="space-y-2.5 font-mono text-[0.67rem] leading-6 sm:text-xs">
            {codeLines.map(([number, line], index) => (
              <div
                key={number}
                className={cn(
                  "grid grid-cols-[1.5rem_1fr] gap-3",
                  index === 4 && styles.activeCodeLine,
                )}
              >
                <span className="select-none text-muted-foreground/55">
                  {number}
                </span>
                <code className="block min-w-0 overflow-hidden whitespace-pre text-foreground/80">
                  {line}
                </code>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-xl border bg-background/90 p-4 shadow-soft sm:left-6 sm:right-6">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-lg bg-success/15 text-success",
                  styles.buildPulse,
                )}
              >
                <Check className="size-4" />
              </span>
              <div>
                <p className="text-xs font-semibold">Production review ready</p>
                <p className="mt-1 text-[0.62rem] text-muted-foreground">
                  Types · accessibility · responsive states
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebDevelopmentHero() {
  return (
    <section
      aria-labelledby="web-development-heading"
      className={cn(
        "relative overflow-hidden border-b pb-24 pt-10 sm:pb-30 lg:pb-36 lg:pt-14",
        styles.hero,
      )}
    >
      <Container className="relative max-w-[100rem]">
        <SiteBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Web Development", href: "/services/web-development" },
          ]}
        />
        <div className="mt-16 grid min-w-0 gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center xl:gap-20">
          <Fade className="min-w-0">
            <Eyebrow className="mb-5 text-xs">Custom web development</Eyebrow>
            <h1
              id="web-development-heading"
              className="text-balance text-display font-bold"
            >
              Web experiences built for the business behind them.
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              We design and engineer custom websites and web applications that
              balance brand, usability, performance, accessibility, and
              maintainable growth.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group h-12 rounded-lg px-6">
                <Link href="/book-consultation">
                  Book Consultation
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-lg px-6"
              >
                <Link href="#website-types">Explore What We Build</Link>
              </Button>
            </div>
            <ul
              aria-label="Web development priorities"
              className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground"
            >
              {[
                "Business-led planning",
                "Accessible by design",
                "Built for ownership",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Fade>
          <Fade className="min-w-0">
            <CodeEditorVisual />
          </Fade>
        </div>
      </Container>
    </section>
  );
}

function WhyCustomSection() {
  return (
    <section
      aria-labelledby="why-custom-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionIntroduction
              eyebrow="Why custom"
              id="why-custom-heading"
              title="A website should fit your business—not force your business into a theme."
              description="Custom development is most valuable when content, workflows, integrations, or future ownership need deliberate decisions."
            />
            <div className="mt-8 rounded-xl border bg-muted/20 p-5 text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">
                Templates are not inherently wrong.
              </strong>{" "}
              They can suit simple, constrained needs. We recommend custom work
              when its flexibility and engineering value are justified.
            </div>
          </div>
          <dl className="overflow-hidden rounded-2xl border bg-card/70">
            {customAdvantages.map(
              ({ title, description, icon: Icon }, index) => (
                <div
                  key={title}
                  className="grid gap-4 border-b p-5 last:border-b-0 sm:grid-cols-[3rem_0.68fr_1.32fr] sm:items-start sm:p-6"
                >
                  <span className="grid size-10 place-items-center rounded-xl border bg-background shadow-xs">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <dt className="font-semibold tracking-tight sm:pt-2">
                    <span className="mr-2 font-mono text-[0.6rem] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {title}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground sm:pt-2">
                    {description}
                  </dd>
                </div>
              ),
            )}
          </dl>
        </div>
      </Container>
    </section>
  );
}

function WebsiteTypesSection() {
  return (
    <section
      id="website-types"
      aria-labelledby="website-types-heading"
      className="scroll-mt-28 border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="What we build"
          id="website-types-heading"
          title="Different products need different web architecture."
          description="From focused marketing journeys to operational software, each build starts with the users, content, data, and decisions it needs to support."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {websiteTypes.map(
            ({ title, description, examples, icon: Icon }, index) => (
              <StaggerItem
                key={title}
                className={cn(
                  "h-full xl:col-span-3",
                  index < 2 && "xl:col-span-6",
                )}
              >
                <Card
                  className={cn(
                    "group flex h-full flex-col bg-card/80 p-6 sm:p-7",
                    styles.hoverCard,
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border bg-background shadow-xs group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.6rem] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <ul
                    aria-label={`${title} capabilities`}
                    className="mt-6 space-y-2 border-t pt-5"
                  >
                    {examples.map((example) => (
                      <li key={example} className="flex gap-2 text-xs">
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        {example}
                      </li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>
            ),
          )}
        </Stagger>
      </Container>
    </section>
  );
}

function IncludedFeaturesSection() {
  return (
    <section
      aria-labelledby="included-features-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <SectionIntroduction
            eyebrow="Included by design"
            id="included-features-heading"
            title="The foundations a modern website should not treat as extras."
            description="Exact deliverables vary with scope, but these disciplines are considered together so quality is not deferred until launch."
          />
          <Stagger className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {includedFeatures.map(({ title, description, icon: Icon }) => (
              <StaggerItem key={title} className="bg-background">
                <div className="flex h-full gap-4 p-5 sm:p-6">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border bg-card shadow-xs">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function TechnologySection() {
  return (
    <section
      aria-labelledby="web-tech-heading"
      className={cn(
        "relative overflow-hidden border-b py-20 sm:py-24 lg:py-30",
        styles.darkSection,
      )}
    >
      <Container className="relative max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Technology stack"
          id="web-tech-heading"
          title="Modern tools, each with a defined responsibility."
          description="We select technology around product needs, team context, security, operations, and credible future change—not a fixed vendor checklist."
        />
        <dl className="mt-12 grid overflow-hidden rounded-2xl border border-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map(({ name, role, icon: Icon }, index) => (
            <div
              key={name}
              className="border-b border-primary-foreground/15 p-5 sm:border-r sm:p-6"
            >
              <div className="flex items-center gap-4">
                <span className="grid size-10 place-items-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/10">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <dt className="font-semibold">{name}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-primary-foreground/65">
                    {role}
                  </dd>
                </div>
                <span className="ml-auto font-mono text-[0.58rem] text-primary-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </dl>
        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-primary-foreground/55">
          Technology names describe tools we can build with. They do not imply
          partnerships, certifications, or endorsements. Final selection follows
          project requirements.
        </p>
      </Container>
    </section>
  );
}

function DevelopmentProcessSection() {
  return (
    <section
      aria-labelledby="web-process-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Development process"
          id="web-process-heading"
          title="Eight visible stages from first question to maintained product."
          description="The sequence can overlap or adapt, but important decisions, reviews, and release responsibilities remain explicit."
        />
        <div className="relative mt-14">
          <span
            aria-hidden="true"
            className={cn(
              "absolute bottom-8 left-1/2 top-8 hidden w-px lg:block",
              styles.timelineLine,
            )}
          />
          <ol className="grid gap-5 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-8">
            {processSteps.map(
              ({ title, description, detail, icon: Icon }, index) => (
                <li
                  key={title}
                  className={cn(
                    "relative lg:w-[calc(100%-1.75rem)]",
                    index % 2 === 1 && "lg:ml-auto",
                    styles.timelineItem,
                  )}
                >
                  <Card className="relative bg-card/80 p-6">
                    <div className="flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono text-[0.62rem] text-muted-foreground">
                            STEP {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-xl font-semibold tracking-tight">
                            {title}
                          </h3>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {description}
                        </p>
                        <p className="mt-4 border-t pt-4 text-xs font-medium">
                          {detail}
                        </p>
                      </div>
                    </div>
                  </Card>
                </li>
              ),
            )}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function ProjectVisual({
  variant,
}: {
  readonly variant: DemoProject["visual"];
}) {
  const visualContent = {
    school: {
      label: "Attendance overview",
      icon: Users,
      bars: ["w-4/5", "w-2/3", "w-11/12"],
    },
    auction: {
      label: "Live auction room",
      icon: ShoppingBag,
      bars: ["w-3/5", "w-5/6", "w-2/3"],
    },
    crm: {
      label: "Lead review queue",
      icon: Sparkles,
      bars: ["w-11/12", "w-1/2", "w-4/5"],
    },
    restaurant: {
      label: "Seasonal menu",
      icon: BookOpenCheck,
      bars: ["w-2/3", "w-5/6", "w-3/5"],
    },
    admin: {
      label: "Workspace controls",
      icon: LayoutDashboard,
      bars: ["w-5/6", "w-3/5", "w-11/12"],
    },
  } as const;
  const content = visualContent[variant];
  const Icon = content.icon;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background/70 p-4",
        styles.projectVisual,
      )}
    >
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Icon className="size-3.5" />
          </span>
          <span className="text-[0.65rem] font-semibold">{content.label}</span>
        </div>
        <span className="size-2 rounded-full bg-success" />
      </div>
      <div className="mt-4 grid grid-cols-[0.32fr_0.68fr] gap-3">
        <div className="space-y-2 rounded-lg border bg-card p-3">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className={cn(
                "h-1.5 rounded-full bg-muted",
                item === 0 && "bg-primary/30",
              )}
            />
          ))}
        </div>
        <div className="space-y-3 rounded-lg border bg-card p-3">
          {content.bars.map((bar) => (
            <div key={bar} className="space-y-1.5">
              <span
                className={cn("block h-1.5 rounded-full bg-foreground/15", bar)}
              />
              <span className="block h-1 w-full rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExampleProjectsSection() {
  return (
    <section
      aria-labelledby="demo-projects-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Engineering studies"
          id="demo-projects-heading"
          title="Examples built to explore real product patterns."
          description="These are original Ayeb Solutions demos, concepts, and prototypes—not commissioned client work and not evidence of client outcomes."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
          {demoProjects.map((project, index) => (
            <StaggerItem
              key={project.title}
              className={cn(
                "h-full xl:col-span-2",
                index < 2 && "xl:col-span-3",
              )}
            >
              <Card
                className={cn(
                  "group flex h-full flex-col overflow-hidden bg-card/80 p-4",
                  styles.hoverCard,
                )}
              >
                <ProjectVisual variant={project.visual} />
                <div className="flex flex-1 flex-col p-2 pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Badge variant="outline">{project.status}</Badge>
                    <span className="font-mono text-[0.58rem] text-muted-foreground">
                      ORIGINAL STUDY
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <ul
                    aria-label={`${project.title} technologies`}
                    className="mt-auto flex flex-wrap gap-2 pt-6"
                  >
                    {project.technologies.map((technology) => (
                      <li key={technology}>
                        <Badge
                          variant="secondary"
                          className="font-mono text-[0.6rem]"
                        >
                          {technology}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function PerformanceSection() {
  return (
    <section
      aria-labelledby="performance-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <div>
            <SectionIntroduction
              eyebrow="Production quality"
              id="performance-heading"
              title="Quality is a system of decisions, not a score badge."
              description="We examine the complete delivery path—from content and rendering to interaction, maintainability, and production behavior."
            />
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Measured outcomes vary with content, devices, networks,
              infrastructure, and third-party services. We do not promise a
              universal score or ranking.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {performancePillars.map(
              ({ title, description, icon: Icon }, index) => (
                <Card key={title} className="p-5 sm:p-6">
                  <div className="flex items-start justify-between">
                    <span className="grid size-10 place-items-center rounded-xl border bg-background shadow-xs">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.58rem] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </Card>
              ),
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function WebDevelopmentFaq() {
  return (
    <section
      aria-labelledby="web-faq-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <SectionIntroduction
          eyebrow="Web development FAQ"
          id="web-faq-heading"
          title="Clear answers before technical discovery begins."
          description="These questions cover the practical decisions that shape custom website and application work."
        />
        <Accordion
          type="single"
          collapsible
          defaultValue="web-faq-1"
          className="mt-12 space-y-3"
        >
          {webDevelopmentFaqs.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`web-faq-${index + 1}`}
              className="overflow-hidden rounded-xl border bg-card/80 px-5 sm:px-6"
            >
              <AccordionTrigger className="min-h-20 gap-4 py-5 text-left text-base font-semibold hover:no-underline sm:text-lg">
                <span className="flex items-start gap-4 pr-3">
                  <span className="font-mono text-[0.62rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-8 pr-3">
                <p className="border-t pb-2 pt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                  {answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section
      aria-labelledby="web-final-heading"
      className="py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <Fade>
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl p-6 text-primary-foreground shadow-elevated sm:p-10 lg:p-14",
              styles.finalPanel,
            )}
          >
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
                  Plan the right foundation
                </Eyebrow>
                <h2
                  id="web-final-heading"
                  className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Ready to build a web experience that belongs to your business?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/70 sm:text-lg">
                  Tell us what the website needs to achieve. We&apos;ll begin by
                  clarifying users, content, constraints, and the most useful
                  path forward.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="group h-12 rounded-lg px-6"
                >
                  <Link href="/book-consultation">
                    Book Consultation
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-lg border-primary-foreground/25 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Container>
    </section>
  );
}

function WebDevelopmentPage() {
  const pageUrl = new URL("/services/web-development", company.url).toString();
  const provider = {
    "@type": "Organization",
    name: company.name,
    url: company.url,
  } as const;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Web Development",
    serviceType: "Custom web development",
    description:
      "Custom websites and web applications designed for performance, accessibility, scalability, and maintainable ownership.",
    url: pageUrl,
    provider,
    areaServed: "Worldwide",
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Custom Web Development Services",
    description:
      "Custom web development services from Ayeb Solutions, including websites, portals, dashboards, marketplaces, and SaaS applications.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    about: { "@type": "Service", name: "Custom Web Development", provider },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: webDevelopmentFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
  return (
    <>
      <WebDevelopmentHero />
      <WhyCustomSection />
      <WebsiteTypesSection />
      <IncludedFeaturesSection />
      <TechnologySection />
      <DevelopmentProcessSection />
      <ExampleProjectsSection />
      <PerformanceSection />
      <WebDevelopmentFaq />
      <FinalCta />
      <StructuredData data={serviceSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export { WebDevelopmentPage };
