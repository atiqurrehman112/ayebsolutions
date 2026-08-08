import {
  Accessibility,
  ArrowRight,
  BarChart3,
  Blocks,
  Bot,
  Braces,
  Check,
  ChevronDown,
  CircleGauge,
  Cloud,
  Code2,
  Component,
  Database,
  Figma,
  FileCheck2,
  GitBranch,
  Globe2,
  LayoutDashboard,
  LockKeyhole,
  Network,
  Palette,
  PanelsTopLeft,
  Search,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TestTube2,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";
import styles from "./portfolio-page.module.css";

type ProjectStatus =
  "Internal Concept" | "Prototype" | "Case Study" | "Demo" | "Experimental";

interface IconItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface Project {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly status: ProjectStatus;
  readonly origin: string;
  readonly summary: string;
  readonly challenge: string;
  readonly solution: string;
  readonly technologies: readonly string[];
  readonly icon: LucideIcon;
  readonly visual:
    | "portal"
    | "workflow"
    | "market"
    | "assistant"
    | "analytics"
    | "crm"
    | "booking"
    | "api";
}

const categories: readonly IconItem[] = [
  {
    title: "Web Development",
    description: "Responsive websites, portals, and application interfaces.",
    icon: Globe2,
  },
  {
    title: "SaaS",
    description:
      "Multi-user products, dashboards, permissions, and operational tools.",
    icon: LayoutDashboard,
  },
  {
    title: "AI Automation",
    description: "Bounded AI workflows with validation and human oversight.",
    icon: Bot,
  },
  {
    title: "UI/UX",
    description:
      "Research-led flows, interfaces, prototypes, and design systems.",
    icon: Palette,
  },
  {
    title: "API Integrations",
    description: "Typed connections between products and approved providers.",
    icon: Network,
  },
  {
    title: "Internal Concepts",
    description:
      "Independent studies used to explore product and engineering ideas.",
    icon: Sparkles,
  },
] as const;

const projects: readonly Project[] = [
  {
    id: "school-operations-portal",
    title: "School Operations Portal",
    category: "SaaS",
    status: "Prototype",
    origin: "Independent internal prototype—not commissioned client work.",
    summary:
      "A role-aware workspace for academic operations, records, communication, and daily administration.",
    challenge:
      "Complex school workflows can spread information across disconnected records and unclear role boundaries.",
    solution:
      "The prototype explores task-focused dashboards, scoped permissions, explicit record ownership, and accessible data views.",
    technologies: ["Next.js", "TypeScript", "Postgres", "Prisma"],
    icon: PanelsTopLeft,
    visual: "portal",
  },
  {
    id: "ai-lead-routing",
    title: "AI Lead Routing Workflow",
    category: "AI Automation",
    status: "Demo",
    origin: "Internal technology demonstration—not deployed for a client.",
    summary:
      "A governed workflow that classifies submitted context before a human-controlled CRM handoff.",
    challenge:
      "Unstructured enquiries can create inconsistent triage and unclear follow-up ownership.",
    solution:
      "The demo separates validation, rules, AI assistance, confidence handling, human review, and downstream actions.",
    technologies: ["OpenAI", "Node", "TypeScript", "Postgres"],
    icon: Workflow,
    visual: "workflow",
  },
  {
    id: "auction-marketplace",
    title: "Auction Marketplace Architecture",
    category: "Web Development",
    status: "Internal Concept",
    origin:
      "Independent internal product concept—not commissioned client work.",
    summary:
      "A marketplace study for listings, bidding states, identity, moderation, and transaction boundaries.",
    challenge:
      "Time-sensitive marketplace interactions require clear state, trust signals, and controlled financial boundaries.",
    solution:
      "The concept maps explicit auction states, participant permissions, event handling, and responsive bidding interfaces.",
    technologies: ["React", "Next.js", "Stripe", "Postgres"],
    icon: ShoppingBag,
    visual: "market",
  },
  {
    id: "support-knowledge-assistant",
    title: "Support Knowledge Assistant",
    category: "AI Automation",
    status: "Experimental",
    origin: "Internal UI and engineering experiment—not a client deployment.",
    summary:
      "An assistant interface exploring cited context, uncertainty, escalation, and support-team review.",
    challenge:
      "Generated support answers can be misleading when source context, confidence, and escalation are hidden.",
    solution:
      "The experiment makes sources, limits, review status, and handoff actions part of the primary interface.",
    technologies: ["OpenAI", "React", "TypeScript", "Supabase"],
    icon: Bot,
    visual: "assistant",
  },
  {
    id: "commerce-analytics",
    title: "Commerce Analytics Workspace",
    category: "UI/UX",
    status: "Demo",
    origin: "Internal design demonstration using fictional interface data.",
    summary:
      "A decision-focused dashboard study for product, order, and operational signals.",
    challenge:
      "Dense dashboards can make every metric appear equally important and obscure the next useful action.",
    solution:
      "The demo uses progressive hierarchy, visible context, comparison states, and responsive information density.",
    technologies: ["Figma", "React", "TypeScript", "Cloudflare"],
    icon: BarChart3,
    visual: "analytics",
  },
  {
    id: "saas-crm-workspace",
    title: "SaaS CRM Workspace",
    category: "SaaS",
    status: "Prototype",
    origin: "Independent internal prototype—not commissioned client work.",
    summary:
      "A multi-tenant relationship workspace for accounts, activities, permissions, and pipeline context.",
    challenge:
      "CRM products must balance shared organizational context with role and workspace boundaries.",
    solution:
      "The prototype explores tenant isolation, activity history, scoped views, and predictable workflow states.",
    technologies: ["Next.js", "Postgres", "Supabase", "Docker"],
    icon: Users,
    visual: "crm",
  },
  {
    id: "accessible-booking-study",
    title: "Accessible Booking Experience",
    category: "UI/UX",
    status: "Case Study",
    origin:
      "Independent internal case study—not based on client data or results.",
    summary:
      "A design study examining how a booking journey can remain clear across input methods and screen sizes.",
    challenge:
      "Booking flows often hide availability context, validation, or progress until late in the journey.",
    solution:
      "The study documents semantic steps, keyboard paths, visible errors, touch targets, and responsive content order.",
    technologies: ["Figma", "React", "TypeScript", "Next.js"],
    icon: Accessibility,
    visual: "booking",
  },
  {
    id: "api-operations-console",
    title: "API Operations Console",
    category: "API Integrations",
    status: "Experimental",
    origin: "Internal engineering experiment—not connected to client systems.",
    summary:
      "An operations interface for integration health, event state, retry eligibility, and investigation context.",
    challenge:
      "Distributed integration failures become harder to resolve when events and ownership are fragmented.",
    solution:
      "The experiment groups provider state, validation, event history, and controlled recovery actions around one trace.",
    technologies: ["Node", "TypeScript", "Postgres", "AWS"],
    icon: Braces,
    visual: "api",
  },
] as const;

const developmentStages: readonly IconItem[] = [
  {
    title: "Research",
    description:
      "Clarify users, context, evidence, constraints, and the problem worth exploring.",
    icon: Search,
  },
  {
    title: "Planning",
    description:
      "Define scope, architecture questions, risks, milestones, and decision criteria.",
    icon: GitBranch,
  },
  {
    title: "Design",
    description:
      "Map journeys, states, responsive behavior, and an appropriate interface system.",
    icon: Figma,
  },
  {
    title: "Development",
    description:
      "Build maintainable interfaces, application logic, data, and integrations.",
    icon: Code2,
  },
  {
    title: "Testing",
    description:
      "Review behavior, accessibility, performance, failure states, and regressions.",
    icon: TestTube2,
  },
  {
    title: "Deployment",
    description:
      "Release through controlled environments with configuration verification.",
    icon: Cloud,
  },
  {
    title: "Iteration",
    description:
      "Use evidence and review to improve product decisions without inventing outcomes.",
    icon: Wrench,
  },
  {
    title: "Support",
    description:
      "Preserve operational context through monitoring, documentation, and scoped care.",
    icon: FileCheck2,
  },
] as const;

const technologies = [
  ["React", "Composable interface behavior", Component],
  ["Next.js", "Application routing and rendering", Globe2],
  ["TypeScript", "Typed product contracts", Braces],
  ["Node", "Server-side application logic", ServerCog],
  ["Supabase", "Managed data and platform services", Database],
  ["Postgres", "Relational product data", Database],
  ["OpenAI", "Bounded AI-assisted workflows", Bot],
  ["Stripe", "Supported payment workflows", ShoppingBag],
  ["Docker", "Consistent runtime packaging", Blocks],
  ["AWS", "Selected cloud infrastructure", Cloud],
  ["Cloudflare", "Network and delivery services", ShieldCheck],
] as const satisfies readonly (readonly [string, string, LucideIcon])[];

const principles: readonly IconItem[] = [
  {
    title: "Accessibility",
    description:
      "Keyboard, semantics, contrast, motion, and assistive technology are design and engineering concerns.",
    icon: Accessibility,
  },
  {
    title: "Performance",
    description:
      "Technical choices consider meaningful user conditions, rendering cost, data, and dependencies.",
    icon: CircleGauge,
  },
  {
    title: "Scalability",
    description:
      "Architecture follows credible product needs without premature infrastructure complexity.",
    icon: Blocks,
  },
  {
    title: "Security",
    description:
      "Trust boundaries, access, validation, and data exposure are evaluated according to risk.",
    icon: LockKeyhole,
  },
  {
    title: "Maintainability",
    description:
      "Clear contracts, reusable components, documentation, and ownership reduce avoidable drift.",
    icon: Wrench,
  },
  {
    title: "UX",
    description:
      "Interfaces prioritize comprehension, useful feedback, and transparent user decisions.",
    icon: Palette,
  },
  {
    title: "SEO",
    description:
      "Semantic structure, metadata, crawlability, and content foundations are considered early.",
    icon: Globe2,
  },
  {
    title: "Testing",
    description:
      "Checks are chosen around behavior, risk, integration boundaries, and regression impact.",
    icon: TestTube2,
  },
] as const;

const portfolioFaqs = [
  {
    question: "Are all projects shown here client projects?",
    answer:
      "No. Every item is labeled by origin and maturity. This landing page currently presents internal concepts, prototypes, demonstrations, experiments, and an independent case study. None is described as client work.",
  },
  {
    question: "What does Internal Concept mean?",
    answer:
      "An Internal Concept is an original product or architecture exploration created by Ayeb Solutions to examine a problem, workflow, or technical direction. It does not imply production use, a client engagement, or a measured outcome.",
  },
  {
    question: "What is the difference between a prototype and a demo?",
    answer:
      "A prototype explores structure, behavior, or feasibility and may not be production complete. A demo communicates a selected technical or design capability. Both remain clearly separate from deployed client work.",
  },
  {
    question: "What does Experimental mean?",
    answer:
      "Experimental work tests an interface, engineering pattern, or emerging capability under controlled assumptions. It may intentionally leave production concerns unresolved and should not be treated as a finished product.",
  },
  {
    question: "How is a Case Study labeled if it is not client work?",
    answer:
      "Its origin is stated beside the status. The Accessible Booking Experience is an independent internal case study based on a hypothetical product problem—not client data, a customer engagement, or claimed business results.",
  },
  {
    question: "Why showcase internal work?",
    answer:
      "Internal work makes engineering and design reasoning visible without inventing customers or outcomes. It allows us to explain how we frame problems, evaluate constraints, and connect product decisions to implementation.",
  },
  {
    question: "Are the project interfaces using real business data?",
    answer:
      "No. Code-rendered visuals use abstract interface states and fictional labels. They contain no customer records, confidential information, real revenue, or client performance statistics.",
  },
  {
    question: "Can Ayeb Solutions build something similar for my business?",
    answer:
      "Potentially, but a visual similarity does not establish technical fit. Discovery is needed to understand users, workflows, data, integrations, risks, budget context, and whether a custom solution is justified.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "Technology is selected around product requirements. Examples shown here include React, Next.js, TypeScript, Node, Supabase, Postgres, OpenAI, Stripe, Docker, AWS, and Cloudflare. Their inclusion does not imply partnership or certification.",
  },
  {
    question: "Do you provide project source code?",
    answer:
      "Ownership and delivery terms are defined for each engagement. Internal concepts and demonstrations remain Ayeb Solutions studies, while commissioned project terms should explicitly address code, third-party assets, licenses, credentials, and handoff.",
  },
  {
    question: "How do you approach accessibility?",
    answer:
      "We consider semantic structure, keyboard operation, focus, contrast, motion, labels, error communication, touch targets, and responsive content. Production accessibility still requires implementation review and appropriate testing.",
  },
  {
    question: "How do you evaluate project performance?",
    answer:
      "We review relevant user experience and runtime signals in context, including rendering, assets, JavaScript, data access, caching, hosting, and third-party services. We do not attach fabricated scores or performance outcomes to concept work.",
  },
  {
    question: "Can these concepts become production products?",
    answer:
      "A concept can inform production discovery, but it is not automatically production-ready. Security, data, edge cases, accessibility, infrastructure, legal considerations, testing, and operational ownership must be evaluated for the actual use case.",
  },
  {
    question: "Will future client projects be identified differently?",
    answer:
      "Yes. Client work will only be labeled as such when it is real and when publication is authorized. Any future entry should distinguish public facts from confidential details and avoid unsupported outcomes.",
  },
  {
    question: "How do I discuss a project with Ayeb Solutions?",
    answer:
      "Start with the business problem, affected users, current workflow, known constraints, and what a useful change would enable. A consultation can then identify the right discovery questions without assuming a solution in advance.",
  },
] as const;

function SectionIntroduction({
  eyebrow,
  id,
  title,
  description,
}: {
  readonly eyebrow: string;
  readonly id: string;
  readonly title: string;
  readonly description: string;
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow className="mb-4 text-xs">{eyebrow}</Eyebrow>
      <h2 id={id} className="text-balance text-headline font-bold">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function PortfolioCanvas() {
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-4 sm:p-6",
        styles.heroCanvas,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
          portfolio / index
        </span>
        <span className="flex items-center gap-2 text-[0.58rem] font-medium">
          <span className="size-2 rounded-full bg-success" />
          Clearly labeled
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="col-span-2 rounded-xl border bg-background p-4">
          <div className="flex items-center justify-between">
            <span className="h-2 w-24 rounded bg-foreground/15" />
            <Badge variant="outline">Internal Concept</Badge>
          </div>
          <div className="mt-5 grid grid-cols-[1.2fr_0.8fr] gap-3">
            <span className="bg-primary/8 h-20 rounded-lg" />
            <span className="h-20 rounded-lg border bg-card" />
          </div>
        </div>
        {["Prototype", "Demo"].map((label, index) => (
          <div key={label} className="rounded-xl border bg-background p-4">
            <span
              className={cn(
                "block h-16 rounded-lg",
                index === 0 ? "bg-muted" : "bg-primary/8",
              )}
            />
            <span className="mt-4 block h-2 w-3/4 rounded bg-foreground/15" />
            <span className="bg-foreground/8 mt-2 block h-1.5 w-1/2 rounded" />
            <span className="mt-4 text-[0.52rem] font-semibold">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3 text-[0.58rem]">
        <span>Origin visible</span>
        <span className="font-mono text-muted-foreground">no client claim</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="portfolio-title"
      className={cn(
        "relative overflow-hidden border-b py-16 sm:py-20 lg:py-28",
        styles.hero,
      )}
    >
      <Container className="relative z-10 max-w-[100rem]">
        <SiteBreadcrumbs items={[{ label: "Portfolio", href: "/portfolio" }]} />
        <div className="mt-12 grid min-w-0 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow className="mb-5 text-xs">Selected Work</Eyebrow>
            <h1
              id="portfolio-title"
              className="text-balance text-display font-bold"
            >
              Work Built Around Real Business Problems
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Every project is clearly labeled by origin and maturity—from
              internal concepts and prototypes to demonstrations, experiments,
              and future authorized client work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group h-12">
                <Link href="#featured-projects">
                  View Projects{" "}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12">
                <Link href="/book-consultation">Book Consultation</Link>
              </Button>
            </div>
            <p className="mt-9 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
              No client project is shown unless it is real and publication is
              authorized. Current entries contain no client work, testimonials,
              or outcome claims.
            </p>
          </div>
          <div className="min-w-0">
            <PortfolioCanvas />
          </div>
        </div>
      </Container>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section
      aria-labelledby="portfolio-categories-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Portfolio categories"
          id="portfolio-categories-heading"
          title="Different disciplines, one accountable product process."
          description="The portfolio is organized by the problem being explored—not by invented customer names or unsupported claims of scale."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ title, description, icon: Icon }, index) => (
            <li key={title} className="group bg-background p-6">
              <div className="flex items-center justify-between">
                <Icon className="size-5" aria-hidden="true" />
                <span className="font-mono text-[0.58rem] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ProjectVisual({ project }: { readonly project: Project }) {
  const Icon = project.icon;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background/80 p-4",
        styles.projectVisual,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-3">
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Icon className="size-4" />
        </span>
        <span className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-muted-foreground">
          {project.visual}.system
        </span>
      </div>
      <div className="mt-4 grid grid-cols-[0.72fr_1.28fr] gap-3">
        <div className="rounded-lg bg-muted p-3">
          {["w-full", "w-3/4", "w-1/2", "w-4/5"].map((width, index) => (
            <span
              key={`${width}-${index}`}
              className={cn("mb-3 block h-1.5 rounded bg-foreground/10", width)}
            />
          ))}
        </div>
        <div>
          <span className="bg-primary/8 block h-12 rounded-lg" />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <span className="h-10 rounded-lg border" />
            <span className="h-10 rounded-lg border bg-card" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section
      id="featured-projects"
      aria-labelledby="featured-projects-heading"
      className="scroll-mt-28 border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Featured projects"
          id="featured-projects-heading"
          title="Eight transparent studies of product and engineering decisions."
          description="Each entry states what it is, where it came from, and what it explores. None of the current projects is presented as commissioned client work."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.id}
              id={project.id}
              className={cn("scroll-mt-28", index < 2 && "xl:first:col-span-1")}
            >
              <Card
                className={cn(
                  "group flex h-full flex-col p-4 sm:p-5",
                  styles.hoverCard,
                )}
              >
                <ProjectVisual project={project} />
                <div className="flex flex-1 flex-col p-2 pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{project.status}</Badge>
                      <Badge variant="secondary">{project.category}</Badge>
                    </div>
                    <span className="font-mono text-[0.56rem] text-muted-foreground">
                      P{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {project.summary}
                  </p>
                  <p className="mt-5 rounded-lg border bg-muted/25 px-4 py-3 text-xs font-medium leading-5">
                    {project.origin}
                  </p>
                  <dl className="mt-6 grid gap-4 border-t pt-5 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Challenge
                      </dt>
                      <dd className="mt-2 text-xs leading-6">
                        {project.challenge}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Solution direction
                      </dt>
                      <dd className="mt-2 text-xs leading-6">
                        {project.solution}
                      </dd>
                    </div>
                  </dl>
                  <ul
                    aria-label={`${project.title} technologies`}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {project.technologies.map((technology) => (
                      <li key={technology}>
                        <Badge variant="outline">{technology}</Badge>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <Button asChild variant="outline" className="group w-full">
                      <Link
                        href="#portfolio-contact"
                        aria-label={`Discuss the ${project.title} concept`}
                      >
                        Discuss This Approach{" "}
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function DevelopmentSection() {
  return (
    <section
      aria-labelledby="development-highlights-heading"
      className={cn(
        "border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        styles.development,
      )}
    >
      <Container className="max-w-[100rem]">
        <div className="max-w-3xl">
          <Eyebrow className="mb-4 text-xs text-primary-foreground/55">
            Development highlights
          </Eyebrow>
          <h2
            id="development-highlights-heading"
            className="text-balance text-headline font-bold"
          >
            A connected path from useful question to supported product.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-primary-foreground/65">
            These stages describe the disciplines applied to portfolio work.
            They do not represent a fixed timeline or guarantee that every
            project follows an identical sequence.
          </p>
        </div>
        <div className="relative mt-14">
          <span
            className={cn(
              "absolute left-[6.25%] right-[6.25%] top-6 hidden h-px xl:block",
              styles.timelineLine,
            )}
            aria-hidden="true"
          />
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
            {developmentStages.map(
              ({ title, description, icon: Icon }, index) => (
                <li
                  key={title}
                  className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.06] p-5"
                >
                  <span className="relative z-10 grid size-12 place-items-center rounded-xl bg-primary-foreground text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="mt-6 block font-mono text-[0.55rem] text-primary-foreground/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-semibold">{title}</h3>
                  <p className="text-primary-foreground/58 mt-2 text-xs leading-relaxed">
                    {description}
                  </p>
                </li>
              ),
            )}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function TechnologiesSection() {
  return (
    <section
      aria-labelledby="technology-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Technology used"
          id="technology-heading"
          title="Tools selected for the product—not the badge wall."
          description="These technologies appear across our internal studies and delivery capabilities. Selection depends on requirements and does not imply partnerships, certifications, or universal suitability."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map(([name, role, Icon], index) => (
            <div
              key={name}
              className={cn(
                "bg-card p-5",
                index === technologies.length - 1 && "lg:col-span-2",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-lg bg-muted">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="font-mono text-[0.56rem] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-sm font-semibold">{name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {role}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const comparisonItems = [
  ["Hierarchy", "Competing information", "Ordered decisions"],
  ["Workflow", "Hidden system states", "Visible progress and exceptions"],
  ["Accessibility", "Mouse-first assumptions", "Keyboard and semantic paths"],
  ["Architecture", "Coupled responsibilities", "Explicit boundaries"],
  ["Feedback", "Ambiguous outcomes", "Clear status and next actions"],
] as const;

function ComparisonPanel({ improved }: { readonly improved: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        improved ? "bg-background" : "bg-muted/40",
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-3">
        <span
          className={cn(
            "block rounded bg-foreground/15",
            improved ? "h-3 w-24" : "h-2 w-16",
          )}
        />
        <span
          className={cn(
            "rounded",
            improved ? "h-7 w-20 bg-primary" : "h-5 w-16 bg-foreground/15",
          )}
        />
      </div>
      <div
        className={cn(
          "mt-4 grid gap-3",
          improved ? "grid-cols-[1.3fr_0.7fr]" : "grid-cols-2",
        )}
      >
        <div className="space-y-2">
          <span
            className={cn(
              "block rounded bg-foreground/10",
              improved ? "h-4 w-3/4" : "h-2 w-full",
            )}
          />
          <span className="bg-foreground/8 block h-2 w-full rounded" />
          <span className="bg-foreground/8 block h-2 w-4/5 rounded" />
          <span
            className={cn(
              "mt-4 block rounded",
              improved
                ? "h-8 w-28 bg-primary/80"
                : "h-6 w-full bg-foreground/15",
            )}
          />
        </div>
        <div
          className={cn(
            "rounded-lg border",
            improved ? "bg-primary/5 p-3" : "bg-foreground/5 p-2",
          )}
        >
          <span className="bg-foreground/8 block h-10 rounded" />
          <span className="mt-2 block h-2 w-2/3 rounded bg-foreground/10" />
        </div>
      </div>
    </div>
  );
}

function ComparisonSection() {
  return (
    <section
      aria-labelledby="comparison-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Before / after"
          id="comparison-heading"
          title="Explore how clearer product decisions change the interface."
          description="This interactive editorial comparison uses a fictional internal interface. Open either panel to inspect the reasoning; it contains no client data, performance claim, or measured outcome."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <details
            className={cn(
              "group rounded-2xl border bg-card p-4 sm:p-6",
              styles.disclosure,
            )}
            open
          >
            <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded-lg font-semibold">
              <span>Before / unresolved structure</span>
              <ChevronDown
                className="size-4 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="pt-5">
              <ComparisonPanel improved={false} />
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                The conceptual starting point gives controls and content similar
                visual weight, leaving relationships and system feedback
                difficult to scan.
              </p>
            </div>
          </details>
          <details
            className={cn(
              "group rounded-2xl border bg-card p-4 sm:p-6",
              styles.disclosure,
            )}
          >
            <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded-lg font-semibold">
              <span>After / clarified direction</span>
              <ChevronDown
                className="size-4 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="pt-5">
              <ComparisonPanel improved />
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                The design direction establishes task priority, explicit states,
                accessible interaction paths, and clearer ownership boundaries.
              </p>
            </div>
          </details>
        </div>
        <dl className="mt-8 divide-y border-y">
          {comparisonItems.map(([topic, before, after]) => (
            <div
              key={topic}
              className="grid gap-2 py-4 text-sm sm:grid-cols-[0.7fr_1fr_1fr] sm:gap-6"
            >
              <dt className="font-semibold">{topic}</dt>
              <dd className="text-muted-foreground">Before: {before}</dd>
              <dd className="flex items-center gap-2">
                <Check className="size-3.5" aria-hidden="true" />
                After: {after}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <SectionIntroduction
            eyebrow="Project principles"
            id="principles-heading"
            title="Quality is a set of decisions, not a decorative finish."
            description="These principles guide our studies and delivery approach. Their application changes with audience, risk, product maturity, and operating context."
          />
          <ol className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {principles.map(({ title, description, icon: Icon }, index) => (
              <li key={title} className="bg-background p-6">
                <div className="flex items-center justify-between">
                  <Icon className="size-5" aria-hidden="true" />
                  <span className="font-mono text-[0.58rem] text-muted-foreground">
                    P{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      aria-labelledby="portfolio-faq-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <SectionIntroduction
          eyebrow="Portfolio FAQ"
          id="portfolio-faq-heading"
          title="Clear answers about what this work represents."
          description="These questions explain project labels, internal studies, technology, accessibility, ownership, performance, and how future authorized client work will be presented."
        />
        <div className="mt-12 space-y-3">
          {portfolioFaqs.map(({ question, answer }, index) => (
            <details
              key={question}
              className={cn(
                "group overflow-hidden rounded-xl border bg-card px-5 sm:px-6",
                styles.disclosure,
              )}
              open={index === 0}
            >
              <summary className="focus-ring flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5 text-left text-base font-semibold sm:text-lg">
                <span className="flex items-start gap-4 pr-3">
                  <span className="font-mono text-[0.62rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {question}
                </span>
                <ChevronDown
                  className="size-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="ml-8 border-t pb-6 pt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PortfolioPage() {
  const pageUrl = new URL("/portfolio", company.url).toString();
  const itemListElements = projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      url: `${pageUrl}#${project.id}`,
      genre: project.category,
      keywords: [project.status, ...project.technologies].join(", "),
    },
  }));
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ayeb Solutions Portfolio",
    description:
      "Clearly labeled internal concepts, prototypes, demonstrations, experiments, and case studies from Ayeb Solutions.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    mainEntity: { "@id": `${pageUrl}#project-list` },
  } as const;
  const itemListSchema = {
    "@context": "https://schema.org",
    "@id": `${pageUrl}#project-list`,
    "@type": "ItemList",
    name: "Featured Ayeb Solutions Projects",
    numberOfItems: projects.length,
    itemListElement: itemListElements,
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Portfolio, Product Concepts & Technical Demonstrations",
    description:
      "A transparent portfolio of internal concepts, prototypes, case studies, demonstrations, and UI experiments.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: portfolioFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
  return (
    <>
      <Hero />
      <CategoriesSection />
      <ProjectsSection />
      <DevelopmentSection />
      <TechnologiesSection />
      <ComparisonSection />
      <PrinciplesSection />
      <FaqSection />
      <CTALayout
        id="portfolio-contact"
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Start with the problem
          </Eyebrow>
        }
        title="Have a business challenge worth designing around?"
        description={
          <p className="max-w-2xl leading-relaxed text-primary-foreground/70">
            Share the users, workflow, constraints, and outcome you need to
            understand. We’ll help define the right discovery questions before
            recommending a solution.
          </p>
        }
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/book-consultation">
                Book Consultation{" "}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        }
        className={styles.finalCta}
      />
      <StructuredData data={collectionSchema} />
      <StructuredData data={itemListSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export { PortfolioPage };
