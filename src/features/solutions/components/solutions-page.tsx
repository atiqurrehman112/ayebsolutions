import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Boxes,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  CircleDollarSign,
  Cloud,
  Code2,
  Database,
  Factory,
  Gauge,
  GraduationCap,
  HeartPulse,
  Hotel,
  Layers3,
  Network,
  PackageCheck,
  PanelTop,
  Pickaxe,
  RefreshCw,
  Rocket,
  Route,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";

import styles from "./solutions-page.module.css";

interface Solution {
  readonly anchorId: string;
  readonly audienceAnchorId?: string;
  readonly title: string;
  readonly description: string;
  readonly value: string;
  readonly idealFor: string;
  readonly outcomes: readonly string[];
  readonly icon: LucideIcon;
}

interface IconItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

const solutions: readonly Solution[] = [
  {
    anchorId: "ai-agents",
    title: "AI Automation",
    description:
      "Combine language models, structured business rules, and human review to support decisions that require context.",
    value:
      "Move repeatable interpretation work into a controlled system while keeping accountability visible.",
    idealFor:
      "Teams handling high volumes of inquiries, documents, support requests, or knowledge-based tasks.",
    outcomes: [
      "Assisted triage",
      "Consistent first drafts",
      "Human approval paths",
    ],
    icon: Bot,
  },
  {
    anchorId: "business-automation",
    audienceAnchorId: "local-businesses",
    title: "Business Automation",
    description:
      "Connect recurring operational steps across the applications your team already depends on.",
    value:
      "Reduce duplicate entry and make routine handoffs easier to follow, review, and improve.",
    idealFor:
      "Growing operations where people repeatedly copy data, chase updates, or coordinate across disconnected tools.",
    outcomes: [
      "Connected handoffs",
      "Exception visibility",
      "Repeatable operations",
    ],
    icon: RefreshCw,
  },
  {
    anchorId: "crm-solutions",
    title: "CRM Solutions",
    description:
      "Shape customer data, pipeline stages, communication context, and ownership around the way your team actually sells and serves.",
    value:
      "Create a clearer customer record and reduce ambiguity around follow-up responsibility.",
    idealFor:
      "Sales and service teams that need tailored lead capture, qualification, assignment, and reporting.",
    outcomes: [
      "Structured pipelines",
      "Clear ownership",
      "Useful customer context",
    ],
    icon: Users,
  },
  {
    anchorId: "workflow-automation",
    title: "Workflow Automation",
    description:
      "Turn multi-step processes into explicit flows with triggers, validation, approvals, and exception handling.",
    value:
      "Make operational logic consistent without hiding edge cases or removing necessary human judgment.",
    idealFor:
      "Teams with established processes that rely on reminders, spreadsheets, inboxes, and manual coordination.",
    outcomes: [
      "Visible process states",
      "Approval routing",
      "Actionable notifications",
    ],
    icon: Workflow,
  },
  {
    anchorId: "internal-dashboards",
    title: "Internal Dashboards",
    description:
      "Bring operational data, tasks, permissions, and reporting into a focused workspace built around internal roles.",
    value:
      "Help teams see what needs attention without navigating fragmented reports and applications.",
    idealFor:
      "Operations, leadership, finance, and service teams that need role-specific visibility and control.",
    outcomes: [
      "Operational visibility",
      "Role-aware access",
      "Clearer reporting",
    ],
    icon: ChartNoAxesCombined,
  },
  {
    anchorId: "customer-portals",
    title: "Customer Portals",
    description:
      "Give customers a secure place to access information, submit requests, track progress, and manage their relationship.",
    value:
      "Create a consistent self-service experience while preserving access rules and support escalation paths.",
    idealFor:
      "Businesses managing recurring client documents, requests, bookings, projects, or account activity.",
    outcomes: [
      "Self-service access",
      "Request visibility",
      "Centralized communication",
    ],
    icon: PanelTop,
  },
  {
    anchorId: "saas-platforms",
    audienceAnchorId: "startups",
    title: "SaaS Platforms",
    description:
      "Design and build focused software products with authentication, subscriptions, roles, workflows, and operating tools.",
    value:
      "Turn a validated product model into a maintainable platform that can evolve with real usage.",
    idealFor:
      "Founders and organizations building a repeatable digital product for customers, partners, or internal teams.",
    outcomes: [
      "Multi-role products",
      "Subscription readiness",
      "Maintainable foundations",
    ],
    icon: Boxes,
  },
  {
    anchorId: "digital-transformation",
    audienceAnchorId: "enterprises",
    title: "Digital Transformation",
    description:
      "Modernize high-friction systems through staged assessment, integration, redesign, and carefully managed replacement.",
    value:
      "Improve critical workflows without discarding useful business knowledge or forcing unnecessary change at once.",
    idealFor:
      "Organizations constrained by aging software, disconnected data, or processes that no longer match current operations.",
    outcomes: [
      "Phased modernization",
      "Connected systems",
      "Lower migration risk",
    ],
    icon: Rocket,
  },
] as const;

const outcomes: readonly IconItem[] = [
  {
    title: "Reduce manual work",
    description:
      "Move repeatable data entry and coordination into explicit, reviewable workflows.",
    icon: RefreshCw,
  },
  {
    title: "Increase productivity",
    description:
      "Give teams clearer context, ownership, and tools designed around the work they perform.",
    icon: Gauge,
  },
  {
    title: "Automate operations",
    description:
      "Connect triggers, rules, approvals, notifications, and exception handling across systems.",
    icon: Workflow,
  },
  {
    title: "Improve customer experience",
    description:
      "Create faster, clearer digital journeys without removing access to human support.",
    icon: Users,
  },
  {
    title: "Scale efficiently",
    description:
      "Build maintainable foundations that can support evolving roles, data, and operational volume.",
    icon: Layers3,
  },
  {
    title: "Deliver with clarity",
    description:
      "Use visible milestones, production verification, and documented decisions to reduce uncertainty.",
    icon: PackageCheck,
  },
] as const;

const industries: readonly IconItem[] = [
  {
    title: "Healthcare",
    description:
      "Privacy-aware portals, appointment flows, operational dashboards, and controlled access to sensitive workflows.",
    icon: HeartPulse,
  },
  {
    title: "Construction",
    description:
      "Project visibility, field coordination, approvals, document flows, and progress reporting across stakeholders.",
    icon: Pickaxe,
  },
  {
    title: "Education",
    description:
      "Student, educator, and administrator experiences with clear roles, records, learning, and communication workflows.",
    icon: GraduationCap,
  },
  {
    title: "Finance",
    description:
      "Validation-heavy internal tools, secure reporting, audit-friendly processes, and permission-aware data access.",
    icon: CircleDollarSign,
  },
  {
    title: "Retail",
    description:
      "Connected commerce, inventory, customer journeys, fulfillment context, and operational visibility across channels.",
    icon: ShoppingBag,
  },
  {
    title: "Professional Services",
    description:
      "Lead, client, project, document, billing, and knowledge workflows shaped around service delivery.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Manufacturing",
    description:
      "Production visibility, inventory coordination, maintenance context, quality workflows, and internal reporting.",
    icon: Factory,
  },
  {
    title: "Logistics",
    description:
      "Shipment states, routing context, exception alerts, partner portals, and synchronized operational data.",
    icon: Route,
  },
  {
    title: "Hospitality",
    description:
      "Booking journeys, guest communication, service requests, internal coordination, and property-level reporting.",
    icon: Hotel,
  },
] as const;

const technologies = [
  ["Next.js", "Application framework", Code2],
  ["React", "Interface systems", Layers3],
  ["TypeScript", "Type-safe delivery", BadgeCheck],
  ["Node.js", "Server applications", Network],
  ["Supabase", "Managed data platform", Cloud],
  ["Cloudinary", "Media delivery", Sparkles],
  ["OpenAI", "AI capabilities", Bot],
  ["Vercel", "Web deployment", Rocket],
  ["Docker", "Portable environments", Boxes],
  ["PostgreSQL", "Relational data", Database],
  ["Tailwind CSS", "Interface styling", PanelTop],
] as const satisfies readonly (readonly [string, string, LucideIcon])[];

const process: readonly IconItem[] = [
  {
    title: "Discovery",
    description:
      "Understand goals, users, constraints, systems, evidence, and decision ownership.",
    icon: Search,
  },
  {
    title: "Planning",
    description:
      "Define scope, priorities, dependencies, milestones, and the smallest responsible first release.",
    icon: Workflow,
  },
  {
    title: "Architecture",
    description:
      "Map data, security, integrations, operational boundaries, and maintainability needs.",
    icon: Network,
  },
  {
    title: "Development",
    description:
      "Build the approved experience and system logic through visible, reviewable increments.",
    icon: Code2,
  },
  {
    title: "Testing",
    description:
      "Review behavior, accessibility, performance, security considerations, and failure states.",
    icon: ShieldCheck,
  },
  {
    title: "Deployment",
    description:
      "Release through controlled environments and verify production behavior and ownership.",
    icon: Rocket,
  },
  {
    title: "Support",
    description:
      "Maintain context through documentation, monitoring, updates, and planned improvement.",
    icon: Wrench,
  },
] as const;

const differentiators = [
  [
    "Custom software",
    "A solution is shaped around the workflow and constraint—not forced into a generic template.",
  ],
  [
    "Scalable architecture",
    "Capacity, roles, data boundaries, and future change inform the foundation without premature complexity.",
  ],
  [
    "Responsible automation",
    "Automation includes validation, approval, confidence, exception, and fallback paths where appropriate.",
  ],
  [
    "Security-minded design",
    "Permissions, data handling, dependencies, and deployment risk are considered throughout delivery.",
  ],
  [
    "Maintainability",
    "Typed code, clear boundaries, documentation, and repeatable deployment reduce avoidable ownership friction.",
  ],
  [
    "Long-term support",
    "Monitoring, updates, optimization, and future improvements can be scoped after production launch.",
  ],
] as const;

const faqs = [
  {
    question: "How is a business solution different from a service?",
    answer:
      "A service describes a capability such as development, design, or integration. A solution begins with a business problem and combines the capabilities needed to address its workflow, users, systems, and constraints.",
  },
  {
    question: "Do we need to know which technology to use?",
    answer:
      "No. Start with the business objective, current process, users, data, constraints, and existing systems. Technology recommendations should follow those needs rather than lead the conversation.",
  },
  {
    question: "Can Ayeb Solutions improve an existing system?",
    answer:
      "Potentially. An assessment can identify useful foundations, operational risks, integration boundaries, and whether incremental modernization is more responsible than replacement.",
  },
  {
    question: "Where does AI fit into a business solution?",
    answer:
      "AI can support tasks involving interpretation, classification, drafting, or retrieval when the use case, data access, confidence, review, and failure handling are appropriate. It is not automatically the right tool for every workflow.",
  },
  {
    question: "Can a solution integrate with our current tools?",
    answer:
      "Often, when the required APIs, permissions, data quality, and security constraints allow it. Integration feasibility is reviewed before a dependency becomes part of the project plan.",
  },
  {
    question: "How do you approach security and access?",
    answer:
      "The approach considers authentication, authorization, roles, data sensitivity, validation, audit needs, secrets, dependencies, and deployment boundaries according to the actual system context.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Timing depends on scope, research, integrations, content, data migration, approvals, testing, and operational readiness. A useful estimate requires discovery rather than a universal timeline.",
  },
  {
    question: "Can a solution be delivered in phases?",
    answer:
      "Yes. A phased plan can reduce risk, validate assumptions, preserve useful systems, and deliver the highest-priority workflow before expanding. The sequence should reflect business dependencies.",
  },
] as const;

function SectionHeading({
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
      <Eyebrow className="text-xs">{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-4 text-balance text-headline font-bold">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function SolutionMap() {
  return (
    <div
      className={cn(
        styles.solutionMap,
        "relative overflow-hidden rounded-3xl border p-5 sm:p-7",
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <span className="font-mono text-[.6rem] uppercase tracking-[.18em] text-muted-foreground">
          business / system
        </span>
        <span className="rounded-full border px-3 py-1 text-[.58rem]">
          Connected by design
        </span>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="space-y-3">
          {["Customers", "Teams", "Operations"].map((label, index) => (
            <div key={label} className="rounded-xl border bg-background p-4">
              <span className="flex items-center gap-3 text-xs font-semibold">
                <span
                  className={cn(
                    "size-2 rounded-full",
                    index === 0 ? "bg-primary" : "bg-foreground/20",
                  )}
                />
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="hidden h-px w-8 bg-border sm:block" />
        <div className="rounded-2xl border bg-primary p-5 text-primary-foreground shadow-elevated">
          <span className="grid size-10 place-items-center rounded-xl bg-primary-foreground text-primary">
            <Workflow className="size-5" />
          </span>
          <p className="mt-8 text-lg font-semibold">Solution core</p>
          <p className="mt-2 text-xs leading-6 text-primary-foreground/60">
            Data · rules · interfaces · automation
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {["Measure", "Improve", "Scale"].map((label) => (
          <div
            key={label}
            className="rounded-xl border bg-muted/30 px-3 py-4 text-center text-[.62rem] font-semibold"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SolutionsPage() {
  const pageUrl = new URL("/solutions", company.url).toString();
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: company.url },
      { "@type": "ListItem", position: 2, name: "Solutions", item: pageUrl },
    ],
  } as const;
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Business Solutions",
    description:
      "Business-focused digital solutions for automation, operations, customer experiences, platforms, and modernization.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    about: { "@type": "Organization", name: company.name, url: company.url },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;

  return (
    <>
      <section
        className={cn(
          styles.hero,
          "relative overflow-hidden border-b py-20 sm:py-28 lg:py-36",
        )}
        aria-labelledby="solutions-title"
      >
        <Container className="relative z-10 max-w-[100rem]">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Solutions", href: "/solutions" },
            ]}
          />
          <div className="mt-14 grid gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow>Built around business outcomes</Eyebrow>
              <h1
                id="solutions-title"
                className="mt-5 max-w-5xl text-balance text-[clamp(3.2rem,7.6vw,7.4rem)] font-bold leading-[.9] tracking-[-.065em]"
              >
                Turn operational friction into a clearer digital system.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Ayeb Solutions combines software, automation, design, and
                integration to solve the workflow behind the request—not just
                deliver another feature.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="group h-12">
                  <Link href="/contact#contact-form">
                    Discuss Your Business
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12">
                  <Link href="#solution-categories">Explore Solutions</Link>
                </Button>
              </div>
              <ul
                className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
                aria-label="Solution principles"
              >
                {[
                  "Business-first discovery",
                  "Appropriate technology",
                  "Visible ownership",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <BadgeCheck
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <SolutionMap />
          </div>
        </Container>
      </section>

      <section
        id="solution-categories"
        className="scroll-mt-24 border-b py-20 sm:py-24 lg:py-30"
        aria-labelledby="solution-categories-heading"
      >
        <Container className="max-w-[100rem]">
          <SectionHeading
            eyebrow="Solution categories"
            id="solution-categories-heading"
            title="Start with the business problem—not a predefined package."
            description="Each solution combines the capabilities required by its users, workflow, data, integrations, risk, and ownership model."
          />
          <div className="mt-14 space-y-5">
            {solutions.map(
              (
                {
                  title,
                  anchorId,
                  audienceAnchorId,
                  description,
                  value,
                  idealFor,
                  outcomes: examples,
                  icon: Icon,
                },
                index,
              ) => (
                <article
                  id={anchorId}
                  key={title}
                  className={cn(
                    styles.solutionCard,
                    "relative grid scroll-mt-24 overflow-hidden rounded-3xl border bg-card lg:grid-cols-[.38fr_.62fr]",
                  )}
                >
                  {audienceAnchorId ? (
                    <span
                      id={audienceAnchorId}
                      className="pointer-events-none absolute inset-x-0 top-0 scroll-mt-24"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div
                    className={cn(
                      styles.solutionIntro,
                      "flex flex-col justify-between border-b bg-muted/[0.16] p-7 sm:p-9 lg:border-b-0 lg:border-r",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[.62rem] tracking-[.16em] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-16">
                      <h3 className="text-2xl font-semibold sm:text-3xl">
                        {title}
                      </h3>
                      <p className="mt-4 leading-7 text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-px bg-border sm:grid-cols-2">
                    <div className="bg-card p-7 sm:p-8">
                      <p className={styles.microLabel}>Business value</p>
                      <p className="mt-4 leading-7">{value}</p>
                    </div>
                    <div className="bg-card p-7 sm:p-8">
                      <p className={styles.microLabel}>Ideal for</p>
                      <p className="mt-4 leading-7">{idealFor}</p>
                    </div>
                    <div className="bg-card p-7 sm:col-span-2 sm:p-8">
                      <p className={styles.microLabel}>Example outcomes</p>
                      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                        {examples.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </Container>
      </section>

      <section
        className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
        aria-labelledby="business-outcomes-heading"
      >
        <Container className="max-w-[100rem]">
          <SectionHeading
            eyebrow="Business outcomes"
            id="business-outcomes-heading"
            title="Build toward a better operating state."
            description="Useful digital work should make a process clearer, more connected, or easier to own. Outcomes depend on the real context; none are presented as guaranteed metrics."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {outcomes.map(({ title, description, icon: Icon }, index) => (
              <li
                key={title}
                className={cn(
                  styles.outcomeCard,
                  "rounded-2xl border bg-card p-7",
                )}
                style={{ "--delay": `${index * 60}ms` } as CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border bg-background">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[.6rem] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        className="border-b py-20 sm:py-24 lg:py-30"
        aria-labelledby="industries-heading"
      >
        <Container className="max-w-[100rem]">
          <SectionHeading
            eyebrow="Industry context"
            id="industries-heading"
            title="The workflow changes with the industry."
            description="The same technology can serve very different roles, risks, data, and customer expectations. Discovery identifies what the industry context changes."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border md:grid-cols-2 xl:grid-cols-3">
            {industries.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className={cn(styles.industryCard, "bg-card p-7 sm:p-8")}
              >
                <span className="grid size-11 place-items-center rounded-xl bg-muted">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="technology-partnerships"
        className={cn(
          styles.technologySection,
          "scroll-mt-24 border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        )}
        aria-labelledby="technology-heading"
      >
        <Container className="max-w-[100rem]">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
            <div>
              <Eyebrow className="text-xs text-primary-foreground/55">
                Technology ecosystem
              </Eyebrow>
              <h2
                id="technology-heading"
                className="mt-4 text-balance text-headline font-bold"
              >
                A modern stack, selected for the system around it.
              </h2>
              <p className="mt-5 text-lg leading-8 text-primary-foreground/65">
                These are tools used in our delivery ecosystem—not partnerships,
                certifications, or a requirement to use every technology on
                every solution.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {technologies.map(([name, purpose, Icon]) => (
                <li
                  key={name}
                  className="flex items-center gap-4 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[.06] p-4"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-foreground text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block text-sm">{name}</strong>
                    <span className="mt-1 block text-xs text-primary-foreground/50">
                      {purpose}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        className="border-b py-20 sm:py-24 lg:py-30"
        aria-labelledby="process-heading"
      >
        <Container className="max-w-[100rem]">
          <SectionHeading
            eyebrow="Implementation process"
            id="process-heading"
            title="A visible path from operational context to production."
            description="The process creates decision points around scope, architecture, quality, deployment, and ongoing ownership. It does not imply a fixed timeline."
          />
          <ol
            className={cn(
              styles.process,
              "mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7",
            )}
          >
            {process.map(({ title, description, icon: Icon }, index) => (
              <li
                key={title}
                className={cn(
                  styles.processStep,
                  "relative rounded-2xl border bg-card p-5",
                )}
              >
                <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="mt-7 block font-mono text-[.58rem] tracking-[.14em] text-muted-foreground">
                  STAGE {index + 1}
                </span>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
        aria-labelledby="why-ayeb-heading"
      >
        <Container className="max-w-[100rem]">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
            <SectionHeading
              eyebrow="Why Ayeb Solutions"
              id="why-ayeb-heading"
              title="A technical partner for the whole operating problem."
              description="The goal is not to add complexity. It is to make the right workflow easier to use, maintain, secure, and improve."
            />
            <div className="overflow-hidden rounded-3xl border bg-border">
              <div className="hidden grid-cols-[.85fr_1.15fr] bg-primary px-5 py-4 text-xs font-semibold uppercase tracking-[.14em] text-primary-foreground sm:grid">
                <span>Consideration</span>
                <span>Our approach</span>
              </div>
              {differentiators.map(([title, description]) => (
                <div
                  key={title}
                  className="grid gap-px bg-border sm:grid-cols-[.85fr_1.15fr]"
                >
                  <h3 className="bg-card p-5 font-semibold sm:p-6">{title}</h3>
                  <p className="bg-card p-5 text-sm leading-7 text-muted-foreground sm:p-6">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        className="border-b py-20 sm:py-24 lg:py-30"
        aria-labelledby="solutions-faq-heading"
      >
        <Container size="content">
          <SectionHeading
            eyebrow="Solutions FAQ"
            id="solutions-faq-heading"
            title="Questions before solution discovery."
            description="Business-focused answers about fit, modernization, AI, integration, security, timing, and phased delivery."
          />
          <div className="mt-12 space-y-3">
            {faqs.map(({ question, answer }, index) => (
              <details
                key={question}
                className={cn(
                  styles.disclosure,
                  "group overflow-hidden rounded-2xl border bg-card px-5 sm:px-6",
                )}
                open={index === 0}
              >
                <summary className="focus-ring flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5 font-semibold sm:text-lg">
                  <span className="flex items-start gap-4">
                    <span className="font-mono text-[.62rem] text-muted-foreground">
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

      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Turn the next constraint into a plan
          </Eyebrow>
        }
        title="Ready to solve the workflow behind the problem?"
        description={
          <p className="max-w-2xl leading-relaxed text-primary-foreground/70">
            Bring the business goal, the current process, and the constraint.
            We’ll help identify an appropriate path from discovery to
            implementation.
          </p>
        }
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact#contact-form">
                Book Consultation
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/contact">Discuss Your Project</Link>
            </Button>
          </div>
        }
        className={styles.finalCta}
      />
      <StructuredData data={breadcrumb} />
      <StructuredData data={webPage} />
      <StructuredData data={faqSchema} />
    </>
  );
}
