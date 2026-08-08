import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  BellRing,
  Blocks,
  Bot,
  Boxes,
  Braces,
  Building2,
  Check,
  CircleGauge,
  Cloud,
  Code2,
  ContainerIcon,
  CreditCard,
  Database,
  Download,
  FileClock,
  FileSearch,
  Files,
  Filter,
  Fingerprint,
  FolderKanban,
  Gauge,
  GitBranch,
  Globe2,
  HardDrive,
  KeyRound,
  Layers3,
  LayoutDashboard,
  Mail,
  Network,
  PanelsTopLeft,
  PlugZap,
  Rocket,
  Route,
  Search,
  ServerCog,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TestTube2,
  UploadCloud,
  UserCog,
  Users,
  Workflow,
  Wrench,
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
import {
  ServiceFinalCta,
  ServiceSectionIntroduction,
} from "./service-page-shared";
import styles from "./custom-saas-page.module.css";

interface IconContent {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface Capability extends IconContent {
  readonly examples: readonly string[];
}

interface ProductConcept {
  readonly title: string;
  readonly status: "Internal Concept" | "Prototype" | "Demo";
  readonly description: string;
  readonly modules: readonly [string, string, string];
  readonly icon: LucideIcon;
}

const saasContexts: readonly IconContent[] = [
  {
    title: "Custom software",
    description:
      "Purpose-built workflows and interfaces shaped around the product's actual users and operating model.",
    icon: Code2,
  },
  {
    title: "Internal systems",
    description:
      "Operational tools that organize data, permissions, tasks, and decisions for teams.",
    icon: Building2,
  },
  {
    title: "Portals",
    description:
      "Secure spaces where customers, partners, or staff can access relevant information and actions.",
    icon: PanelsTopLeft,
  },
  {
    title: "Multi-tenant platforms",
    description:
      "Account and workspace boundaries designed for products serving multiple organizations.",
    icon: Boxes,
  },
  {
    title: "Admin dashboards",
    description:
      "Controlled interfaces for managing users, content, workflows, configuration, and support.",
    icon: LayoutDashboard,
  },
  {
    title: "Client portals",
    description:
      "Branded self-service experiences for requests, documents, status, and collaboration.",
    icon: Users,
  },
  {
    title: "Automation",
    description:
      "Explicit workflow states and integrations that can reduce avoidable manual handoffs.",
    icon: Workflow,
  },
  {
    title: "Scalability",
    description:
      "Architecture aligned to known needs and credible growth without premature infrastructure complexity.",
    icon: Gauge,
  },
] as const;

const capabilities: readonly Capability[] = [
  {
    title: "Authentication",
    description:
      "Secure account entry and recovery flows appropriate to the product's risk.",
    examples: ["Sign-in flows", "Account recovery", "Session controls"],
    icon: Fingerprint,
  },
  {
    title: "Role Management",
    description:
      "Permission models that connect user responsibilities to allowed actions.",
    examples: ["Role definitions", "Scoped permissions", "Access review"],
    icon: KeyRound,
  },
  {
    title: "Dashboards",
    description:
      "Focused views that help each user understand status, priorities, and next actions.",
    examples: ["Role-aware views", "Operational status", "Data summaries"],
    icon: LayoutDashboard,
  },
  {
    title: "Reporting",
    description:
      "Traceable reports and exports designed around meaningful operational questions.",
    examples: ["Report filters", "Scheduled views", "Data exports"],
    icon: BarChart3,
  },
  {
    title: "Billing",
    description:
      "Subscription and account-state foundations integrated with suitable payment providers.",
    examples: ["Plan states", "Invoices", "Billing lifecycle"],
    icon: CreditCard,
  },
  {
    title: "Notifications",
    description:
      "Useful event communication with preference, delivery, and failure considerations.",
    examples: ["Email events", "In-app notices", "Delivery status"],
    icon: BellRing,
  },
  {
    title: "File Management",
    description:
      "Controlled upload, access, transformation, and retention workflows for product media.",
    examples: ["Uploads", "Access rules", "Media processing"],
    icon: Files,
  },
  {
    title: "Integrations",
    description:
      "Typed connections that exchange approved data with external business systems.",
    examples: ["APIs", "Webhooks", "Data synchronization"],
    icon: PlugZap,
  },
] as const;

const architectureLayers = [
  {
    title: "Users",
    description: "Customers, teams, and administrators",
    icon: Users,
  },
  {
    title: "Frontend",
    description: "Responsive product experience",
    icon: PanelsTopLeft,
  },
  {
    title: "API",
    description: "Validated application contracts",
    icon: Network,
  },
  {
    title: "Business Logic",
    description: "Rules, permissions, and workflows",
    icon: GitBranch,
  },
  {
    title: "Database",
    description: "Structured product records",
    icon: Database,
  },
  {
    title: "Storage",
    description: "Controlled files and media",
    icon: HardDrive,
  },
  {
    title: "External APIs",
    description: "Approved third-party services",
    icon: PlugZap,
  },
] as const;

const includedFeatures: readonly IconContent[] = [
  {
    title: "RBAC",
    description: "Role-based access aligned to product responsibilities.",
    icon: KeyRound,
  },
  {
    title: "Audit logs",
    description: "Traceable records for important actions and changes.",
    icon: FileClock,
  },
  {
    title: "Activity history",
    description: "Understandable event timelines for relevant product objects.",
    icon: Activity,
  },
  {
    title: "Search",
    description: "Find important records using product-appropriate indexing.",
    icon: Search,
  },
  {
    title: "Filters",
    description: "Narrow operational views with explicit, reusable criteria.",
    icon: Filter,
  },
  {
    title: "Exports",
    description: "Controlled data extraction in suitable formats and scopes.",
    icon: Download,
  },
  {
    title: "Analytics",
    description:
      "Consent-aware product and operational measurement foundations.",
    icon: BarChart3,
  },
  {
    title: "Email notifications",
    description: "Event-driven messages with preference and failure handling.",
    icon: Mail,
  },
  {
    title: "User management",
    description:
      "Account lifecycle, access, status, and administrative controls.",
    icon: UserCog,
  },
  {
    title: "API integrations",
    description: "Validated contracts with suitable external systems.",
    icon: PlugZap,
  },
  {
    title: "Security",
    description:
      "Risk-aware validation, permissions, configuration, and dependency care.",
    icon: ShieldCheck,
  },
  {
    title: "Scalability",
    description:
      "Clear boundaries and data models that can support credible evolution.",
    icon: CircleGauge,
  },
] as const;

const technologies = [
  { name: "Next.js", role: "Application rendering and routing", icon: Globe2 },
  { name: "React", role: "Composable product interfaces", icon: Layers3 },
  {
    name: "TypeScript",
    role: "Contracts across system boundaries",
    icon: Braces,
  },
  {
    name: "Node.js",
    role: "Application and integration services",
    icon: ServerCog,
  },
  { name: "PostgreSQL", role: "Relational product data", icon: Database },
  {
    name: "Prisma",
    role: "Typed data access and migrations",
    icon: ContainerIcon,
  },
  { name: "Docker", role: "Consistent runtime environments", icon: Boxes },
  { name: "Cloudinary", role: "Managed media workflows", icon: Cloud },
  { name: "OpenAI", role: "Bounded AI-enabled features", icon: Bot },
  { name: "Vercel", role: "Web delivery and deployment", icon: Rocket },
] as const;

const processSteps = [
  {
    title: "Discovery",
    description:
      "Clarify the product goal, users, operating context, constraints, and evidence needed.",
    icon: Search,
  },
  {
    title: "Product Planning",
    description:
      "Prioritize workflows, scope, milestones, dependencies, and product responsibilities.",
    icon: Route,
  },
  {
    title: "Architecture",
    description:
      "Define system boundaries, data models, permissions, integrations, and deployment direction.",
    icon: Blocks,
  },
  {
    title: "UX & UI Design",
    description:
      "Resolve information architecture, responsive flows, states, and reusable interface patterns.",
    icon: SlidersHorizontal,
  },
  {
    title: "Development",
    description:
      "Build typed, reviewable increments across interface, server, data, and integration layers.",
    icon: Code2,
  },
  {
    title: "Testing",
    description:
      "Review functionality, permissions, accessibility, responsiveness, performance, and failures.",
    icon: TestTube2,
  },
  {
    title: "Deployment",
    description:
      "Configure production, verify critical paths, and document operational decisions.",
    icon: UploadCloud,
  },
  {
    title: "Evolution",
    description:
      "Prioritize maintenance and improvements using product evidence and changing needs.",
    icon: Wrench,
  },
] as const;

const productConcepts: readonly ProductConcept[] = [
  {
    title: "Operations Workspace",
    status: "Internal Concept",
    description:
      "A multi-team operations concept for requests, approvals, ownership, and status visibility.",
    modules: ["Requests", "Approvals", "Activity"],
    icon: Workflow,
  },
  {
    title: "Client Delivery Portal",
    status: "Prototype",
    description:
      "A secure collaboration prototype for projects, files, milestones, and client communication.",
    modules: ["Projects", "Files", "Updates"],
    icon: FolderKanban,
  },
  {
    title: "Subscription Analytics",
    status: "Demo",
    description:
      "A product analytics demonstration exploring account state, plan events, and reporting views.",
    modules: ["Accounts", "Events", "Reports"],
    icon: BarChart3,
  },
  {
    title: "Team Knowledge Platform",
    status: "Internal Concept",
    description:
      "A structured knowledge concept for ownership, review cycles, search, and controlled access.",
    modules: ["Library", "Search", "Review"],
    icon: FileSearch,
  },
  {
    title: "Vendor Management Hub",
    status: "Prototype",
    description:
      "A workflow prototype for vendor records, documents, approvals, and renewal visibility.",
    modules: ["Vendors", "Documents", "Renewals"],
    icon: Building2,
  },
  {
    title: "AI-Assisted Admin",
    status: "Demo",
    description:
      "A bounded AI demonstration for summarizing records and preparing reviewable administrative actions.",
    modules: ["Context", "Assist", "Approve"],
    icon: Sparkles,
  },
] as const;

const customSaasFaqs = [
  {
    question: "What is custom SaaS development?",
    answer:
      "Custom SaaS development creates a software product around specific users, workflows, data, permissions, and business rules rather than adapting those needs to a generic off-the-shelf tool. The result may serve customers, internal teams, partners, or multiple organizations.",
  },
  {
    question: "How is a SaaS platform different from a standard website?",
    answer:
      "A standard website primarily presents content and supports visitor journeys. A SaaS platform typically includes accounts, persistent data, permissions, workflows, application states, integrations, and ongoing operations. Some products combine both.",
  },
  {
    question: "Can you build internal business software?",
    answer:
      "Yes. Internal systems can support operations, approvals, reporting, document handling, customer records, or other structured work. Discovery determines whether custom software is justified compared with configuring an existing tool.",
  },
  {
    question: "Can one platform support multiple organizations?",
    answer:
      "Yes, through an appropriate multi-tenant model. Tenant boundaries, identity, permissions, data isolation, configuration, billing, and support workflows must be designed according to product requirements and risk.",
  },
  {
    question: "Do you build customer and client portals?",
    answer:
      "Yes. A portal can provide secure access to documents, status, requests, messages, account information, or selected workflows. The feature set and permissions should follow what each user genuinely needs.",
  },
  {
    question: "Can the platform include subscription billing?",
    answer:
      "It can integrate suitable payment and billing providers for plans, subscriptions, invoices, and account states. Feasibility depends on the provider, markets, tax responsibilities, commercial model, and required billing behavior.",
  },
  {
    question: "How do you approach authentication and permissions?",
    answer:
      "We define identity, session behavior, account recovery, roles, permission scopes, administrative access, and audit needs according to the product. Sensitive actions may also require stronger verification or approval.",
  },
  {
    question: "Can custom SaaS integrate with our existing tools?",
    answer:
      "Often, yes. Integration depends on API availability, authentication, permissions, provider limits, data quality, and workflow needs. These constraints are assessed before a connection is committed.",
  },
  {
    question: "How long does SaaS development take?",
    answer:
      "Timing depends on product scope, workflow complexity, design depth, data, integrations, security, testing, review cycles, and stakeholder availability. A credible plan is created after discovery rather than promised before requirements are understood.",
  },
  {
    question: "How much does a custom SaaS platform cost?",
    answer:
      "Investment depends on product scope, architecture, user roles, workflows, integrations, data migration, compliance needs, and ongoing responsibilities. Discovery is required before an appropriate commercial structure can be discussed.",
  },
  {
    question: "Can we start with an MVP?",
    answer:
      "Yes, when the MVP is framed around the smallest coherent product that can test an important assumption or support a useful workflow. Reducing scope should not remove essential security, accessibility, data integrity, or operational foundations.",
  },
  {
    question: "How do you plan for scalability?",
    answer:
      "We examine credible usage patterns, data growth, integration demand, operational needs, and failure modes. Architecture should support known and plausible change without adding costly complexity for hypothetical scale.",
  },
  {
    question: "Who owns the source code and product data?",
    answer:
      "Ownership, licenses, repositories, third-party services, credentials, data access, and handover responsibilities should be explicit in the project agreement. Our approach favors transparent technical access and documented operations.",
  },
  {
    question: "What happens after the platform launches?",
    answer:
      "Post-launch work can include monitoring, issue response, dependency updates, provider changes, performance reviews, product analytics, documentation, and planned features. The support model depends on the system's importance and operating needs.",
  },
  {
    question: "How do we begin a custom SaaS project?",
    answer:
      "Start with the user, problem, current workflow, desired change, business constraints, existing systems, and what evidence would make the product worthwhile. An initial consultation can shape the appropriate discovery step.",
  },
] as const;

function DashboardVisual() {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border p-4 sm:p-6",
        styles.dashboard,
      )}
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
        </div>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
          Workspace overview
        </span>
      </div>
      <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-[0.3fr_0.7fr]">
        <div className="hidden rounded-xl border bg-background/75 p-4 sm:block">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Blocks className="size-4" />
          </span>
          <div className="mt-5 space-y-3">
            {["Overview", "Customers", "Workflows", "Reports", "Settings"].map(
              (item, index) => (
                <div
                  key={item}
                  className={cn(
                    "rounded-lg px-3 py-2 text-[0.62rem]",
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
        <div className="min-w-0 rounded-xl border bg-background/75 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                Product health
              </p>
              <p className="mt-1 text-sm font-semibold">Operational view</p>
            </div>
            <span className="grid size-8 place-items-center rounded-lg bg-success/15 text-success">
              <Activity className="size-4" />
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["Users", "Tasks", "Events"].map((item, index) => (
              <div key={item} className="rounded-lg border bg-card p-3">
                <p className="text-[0.55rem] text-muted-foreground">{item}</p>
                <div
                  className={cn(
                    "mt-3 h-2 rounded-full bg-primary/20",
                    index === 1 && "w-3/4",
                    index === 2 && "w-1/2",
                  )}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[0.64fr_0.36fr]">
            <div className="rounded-lg border bg-card p-3">
              <div className="flex h-24 items-end gap-2">
                {[45, 68, 54, 82, 72, 92].map((height, index) => (
                  <span
                    key={index}
                    className={cn(
                      "flex-1 rounded-t bg-primary/20",
                      index === 5 && styles.activeBar,
                    )}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <p className="text-[0.58rem] font-semibold">Recent activity</p>
              <div className="mt-4 space-y-3">
                {["w-full", "w-4/5", "w-3/5"].map((width) => (
                  <div
                    key={width}
                    className={cn("h-1.5 rounded-full bg-muted", width)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border bg-background/80 p-4 text-xs">
        <span className="flex items-center gap-2 font-medium">
          <ShieldCheck className="size-4 text-success" />
          Permissions applied
        </span>
        <span className="font-mono text-[0.58rem] text-muted-foreground">
          SYNCED
        </span>
      </div>
    </div>
  );
}

function CustomSaasHero() {
  return (
    <section
      aria-labelledby="custom-saas-heading"
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
            { label: "Custom SaaS", href: "/services/custom-saas" },
          ]}
        />
        <div className="mt-16 grid min-w-0 gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center xl:gap-20">
          <Fade className="min-w-0">
            <Eyebrow className="mb-5 text-xs">Custom SaaS development</Eyebrow>
            <h1
              id="custom-saas-heading"
              className="text-balance text-display font-bold"
            >
              Software shaped around the way your product needs to work.
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              We design and build custom SaaS platforms, internal systems, and
              secure portals with clear product architecture, thoughtful user
              experience, and maintainable foundations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group h-12 rounded-lg px-6">
                <Link href="/book-consultation">
                  Plan Your SaaS Product
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
                <Link href="#saas-capabilities">Explore Capabilities</Link>
              </Button>
            </div>
            <ul
              aria-label="Custom SaaS priorities"
              className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground"
            >
              {[
                "Product-led planning",
                "Permission-aware design",
                "Maintainable evolution",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Fade>
          <Fade className="min-w-0">
            <DashboardVisual />
          </Fade>
        </div>
      </Container>
    </section>
  );
}

function WhyCustomSaasSection() {
  return (
    <section
      aria-labelledby="why-custom-saas-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ServiceSectionIntroduction
              eyebrow="Why custom SaaS"
              id="why-custom-saas-heading"
              title="Build the operating model into the product—not around a generic tool."
              description="Custom software is most useful when users, permissions, workflows, data, or integrations require deliberate product decisions."
            />
            <div className="mt-8 rounded-xl border bg-muted/20 p-5 text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">
                Custom is not automatically better.
              </strong>{" "}
              Existing products may be the right choice when they fit the
              workflow. We recommend purpose-built software when its ownership
              and flexibility justify the investment.
            </div>
          </div>
          <dl className="overflow-hidden rounded-2xl border bg-card/75">
            {saasContexts.map(({ title, description, icon: Icon }, index) => (
              <div
                key={title}
                className="grid gap-4 border-b p-5 last:border-b-0 sm:grid-cols-[3rem_0.65fr_1.35fr] sm:items-start sm:p-6"
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
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section
      id="saas-capabilities"
      aria-labelledby="saas-capabilities-heading"
      className="scroll-mt-28 border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="SaaS capabilities"
          id="saas-capabilities-heading"
          title="Core product systems designed as one coherent experience."
          description="Capabilities share identity, permissions, data, interface patterns, and operational rules instead of becoming disconnected features."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {capabilities.map(
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
                    aria-label={`${title} examples`}
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

function ArchitectureSection() {
  return (
    <section
      aria-labelledby="platform-architecture-heading"
      className={cn(
        "relative overflow-hidden border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        styles.architectureSection,
      )}
    >
      <Container className="relative max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Platform architecture"
          id="platform-architecture-heading"
          title="A clear path from user intent to controlled system action."
          description="This conceptual diagram shows separation of responsibilities. Final architecture depends on product requirements, risk, integrations, and operating constraints."
        />
        <div className="relative mt-12">
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-6 right-6 top-1/2 hidden h-px lg:block",
              styles.architectureLine,
            )}
          />
          <ol
            aria-label="Conceptual SaaS architecture layers"
            className="grid gap-3 lg:grid-cols-7"
          >
            {architectureLayers.map(
              ({ title, description, icon: Icon }, index) => (
                <li key={title} className="relative z-10">
                  <div className="h-full rounded-xl border border-primary-foreground/15 bg-primary p-4">
                    <div className="flex items-center justify-between">
                      <span className="grid size-9 place-items-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.08]">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[0.58rem] text-primary-foreground/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 text-sm font-semibold">{title}</h3>
                    <p className="mt-2 text-[0.68rem] leading-relaxed text-primary-foreground/60">
                      {description}
                    </p>
                  </div>
                  {index < architectureLayers.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="mx-auto grid h-7 place-items-center lg:hidden"
                    >
                      <ArrowDown className="size-3 text-primary-foreground/45" />
                    </span>
                  ) : null}
                </li>
              ),
            )}
          </ol>
        </div>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-primary-foreground/15 sm:grid-cols-3">
          <div className="bg-primary p-5">
            <p className="text-xs font-semibold">Validate every boundary</p>
            <p className="mt-2 text-xs text-primary-foreground/60">
              Inputs and permissions are checked before work moves deeper.
            </p>
          </div>
          <div className="bg-primary p-5">
            <p className="text-xs font-semibold">
              Keep responsibilities distinct
            </p>
            <p className="mt-2 text-xs text-primary-foreground/60">
              Interface, rules, data, and providers remain understandable.
            </p>
          </div>
          <div className="bg-primary p-5">
            <p className="text-xs font-semibold">Observe important behavior</p>
            <p className="mt-2 text-xs text-primary-foreground/60">
              Failures and operational state need traceable signals.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function IncludedFeaturesSection() {
  return (
    <section
      aria-labelledby="saas-features-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
          <ServiceSectionIntroduction
            eyebrow="Features included"
            id="saas-features-heading"
            title="The operational foundations behind the visible product."
            description="Exact scope varies, but these capabilities are considered together so administration, traceability, and future work are not deferred."
          />
          <Stagger className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 xl:grid-cols-3">
            {includedFeatures.map(({ title, description, icon: Icon }) => (
              <StaggerItem key={title} className="bg-background">
                <div className="flex h-full gap-4 p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border bg-card shadow-xs">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight">
                      {title}
                    </h3>
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
      aria-labelledby="saas-technology-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.64fr_1.36fr] lg:gap-16">
          <div>
            <ServiceSectionIntroduction
              eyebrow="Technology stack"
              id="saas-technology-heading"
              title="Technology selected for product and operational fit."
              description="The final stack depends on users, workflows, data, security, team context, integrations, and deployment needs."
            />
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Technology references describe tools we can build with and do not
              imply partnerships, certifications, or endorsements.
            </p>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {technologies.map(({ name, role, icon: Icon }, index) => (
              <div
                key={name}
                className="flex items-center gap-4 bg-background p-5 sm:p-6"
              >
                <span className="grid size-10 place-items-center rounded-xl border bg-card shadow-xs">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <dt className="font-semibold">{name}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{role}</dd>
                </div>
                <span className="ml-auto font-mono text-[0.58rem] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      aria-labelledby="saas-process-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Development process"
          id="saas-process-heading"
          title="Eight stages from product question to evolving platform."
          description="The stages can overlap, but product decisions, architecture, testing, release, and ownership remain visible."
        />
        <div className="relative mt-12">
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-6 right-6 top-6 hidden h-px lg:block",
              styles.processLine,
            )}
          />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(({ title, description, icon: Icon }, index) => (
              <li
                key={title}
                className="relative z-10 rounded-xl border bg-background p-5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[0.6rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
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

function ConceptVisual({ concept }: { readonly concept: ProductConcept }) {
  const Icon = concept.icon;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background/75 p-4",
        styles.conceptVisual,
      )}
    >
      <div className="flex items-center justify-between border-b pb-3">
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Icon className="size-4" />
        </span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
          product.system
        </span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {concept.modules.map((module, index) => (
          <div
            key={module}
            className="rounded-lg border bg-card p-3 text-center"
          >
            <span
              className={cn(
                "mx-auto block h-1.5 rounded-full bg-primary/20",
                index === 0 ? "w-full" : index === 1 ? "w-3/4" : "w-1/2",
              )}
            />
            <p className="mt-3 text-[0.58rem] font-semibold">{module}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductConceptsSection() {
  return (
    <section
      aria-labelledby="saas-concepts-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Internal product concepts"
          id="saas-concepts-heading"
          title="Original product studies for complex operational patterns."
          description="These concepts, prototypes, and demos explore product architecture and interface ideas. They are not commissioned client projects and do not demonstrate client outcomes."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {productConcepts.map((concept) => (
            <StaggerItem key={concept.title} className="h-full">
              <Card
                className={cn(
                  "group flex h-full flex-col bg-card/80 p-4",
                  styles.hoverCard,
                )}
              >
                <ConceptVisual concept={concept} />
                <div className="flex flex-1 flex-col p-2 pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Badge variant="outline">{concept.status}</Badge>
                    <span className="font-mono text-[0.58rem] text-muted-foreground">
                      AYEB STUDY
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {concept.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {concept.description}
                  </p>
                  <p className="mt-auto border-t pt-5 text-xs font-medium">
                    Not commissioned client work
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function CustomSaasFaq() {
  return (
    <section
      aria-labelledby="saas-faq-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <ServiceSectionIntroduction
          eyebrow="Custom SaaS FAQ"
          id="saas-faq-heading"
          title="Product questions worth resolving before development."
          description="These answers cover the practical decisions behind custom platforms, internal systems, portals, and multi-tenant products."
        />
        <Accordion
          type="single"
          collapsible
          defaultValue="saas-faq-1"
          className="mt-12 space-y-3"
        >
          {customSaasFaqs.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`saas-faq-${index + 1}`}
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

function CustomSaasPage() {
  const pageUrl = new URL("/services/custom-saas", company.url).toString();
  const provider = {
    "@type": "Organization",
    name: company.name,
    url: company.url,
  } as const;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom SaaS Development",
    serviceType: "Custom SaaS and software product development",
    description:
      "Custom SaaS platforms, internal systems, portals, dashboards, and operational software designed around clear product architecture.",
    url: pageUrl,
    provider,
    areaServed: "Worldwide",
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Custom SaaS Development Services",
    description:
      "Custom SaaS development services from Ayeb Solutions for multi-tenant platforms, internal systems, admin dashboards, and client portals.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    about: { "@type": "Service", name: "Custom SaaS Development", provider },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: customSaasFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
  return (
    <>
      <CustomSaasHero />
      <WhyCustomSaasSection />
      <CapabilitiesSection />
      <ArchitectureSection />
      <IncludedFeaturesSection />
      <TechnologySection />
      <ProcessSection />
      <ProductConceptsSection />
      <CustomSaasFaq />
      <ServiceFinalCta
        id="saas-final-heading"
        eyebrow="Shape the product before the backlog"
        title="Ready to turn a complex workflow into a focused software product?"
        description="Bring the users, problem, current process, and constraints. We'll help define the product questions and technical discovery needed for a responsible next step."
        panelClassName={styles.finalPanel}
      />
      <StructuredData data={serviceSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export { CustomSaasPage };
