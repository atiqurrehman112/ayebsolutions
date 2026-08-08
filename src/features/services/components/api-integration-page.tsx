import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  Boxes,
  Braces,
  Check,
  ChevronRight,
  CircleDollarSign,
  Cloud,
  CloudCog,
  CodeXml,
  Database,
  FileCheck2,
  Gauge,
  GitBranch,
  HardDrive,
  KeyRound,
  Layers3,
  LockKeyhole,
  Mail,
  MessageSquare,
  Network,
  PlugZap,
  RefreshCw,
  Route,
  SearchCode,
  Send,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  TestTube2,
  TimerReset,
  Unplug,
  Users,
  Webhook,
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
import {
  ServiceFinalCta,
  ServiceSectionIntroduction,
} from "./service-page-shared";
import styles from "./api-integration-page.module.css";

interface IconItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface IntegrationService extends IconItem {
  readonly applications: readonly [string, string, string];
}

interface IntegrationConcept {
  readonly title: string;
  readonly status: "Internal Concept" | "Prototype" | "Demo";
  readonly description: string;
  readonly source: string;
  readonly destination: string;
  readonly icon: LucideIcon;
}

const integrationReasons: readonly IconItem[] = [
  {
    title: "Connect existing systems",
    description:
      "Link useful platforms without replacing every tool that already supports the business.",
    icon: Network,
  },
  {
    title: "Automate data flow",
    description:
      "Move approved information between systems through explicit, observable workflow rules.",
    icon: Workflow,
  },
  {
    title: "Reduce manual duplication",
    description:
      "Identify repeated entry that an appropriate API can replace while preserving review where needed.",
    icon: RefreshCw,
  },
  {
    title: "Improve consistency",
    description:
      "Validate shared records and define ownership so connected tools interpret data predictably.",
    icon: FileCheck2,
  },
  {
    title: "Centralize processes",
    description:
      "Coordinate actions across specialized platforms through one documented business workflow.",
    icon: Route,
  },
  {
    title: "Secure integrations",
    description:
      "Limit credentials, permissions, data exposure, and operational access according to actual risk.",
    icon: ShieldCheck,
  },
] as const;

const integrationServices: readonly IntegrationService[] = [
  {
    title: "REST API Integration",
    description:
      "Connect resource-based HTTP services through typed requests, validation, and explicit failure handling.",
    applications: ["Data exchange", "Service orchestration", "Legacy adapters"],
    icon: Braces,
  },
  {
    title: "GraphQL Integration",
    description:
      "Consume or expose graph-based data contracts where selective queries suit the product architecture.",
    applications: ["Typed operations", "Flexible queries", "Schema evolution"],
    icon: GitBranch,
  },
  {
    title: "Payment Gateway Integration",
    description:
      "Implement payment states, provider events, and reconciliation boundaries without storing unnecessary payment data.",
    applications: ["Checkout flows", "Subscriptions", "Payment events"],
    icon: CircleDollarSign,
  },
  {
    title: "CRM Integration",
    description:
      "Synchronize approved customer, lead, and activity data with defined ownership and conflict rules.",
    applications: ["Lead routing", "Contact sync", "Activity updates"],
    icon: Users,
  },
  {
    title: "ERP Integration",
    description:
      "Bridge operational records with careful mapping, permissions, and exception visibility.",
    applications: ["Order status", "Inventory records", "Operational data"],
    icon: Boxes,
  },
  {
    title: "Authentication & OAuth",
    description:
      "Use delegated authorization and scoped access where providers support appropriate standards.",
    applications: ["OAuth flows", "Token lifecycle", "Scoped access"],
    icon: KeyRound,
  },
  {
    title: "Webhooks",
    description:
      "Receive provider events with signature checks, replay protection, and idempotent processing.",
    applications: ["Event delivery", "Status changes", "Async workflows"],
    icon: Webhook,
  },
  {
    title: "Third-Party Services",
    description:
      "Integrate suitable communication, storage, analytics, commerce, and AI services behind clear boundaries.",
    applications: ["Provider adapters", "Fallback design", "Usage controls"],
    icon: PlugZap,
  },
] as const;

const architectureCore = [
  {
    title: "Frontend",
    description: "User interactions and visible state",
    icon: CodeXml,
  },
  {
    title: "Backend API",
    description: "Validated internal contracts",
    icon: ServerCog,
  },
  {
    title: "Business Logic",
    description: "Rules, permissions, and orchestration",
    icon: GitBranch,
  },
  {
    title: "Database",
    description: "Owned application records",
    icon: Database,
  },
] as const;

const architectureProviders = [
  { title: "Payment Gateway", icon: CircleDollarSign },
  { title: "CRM", icon: Users },
  { title: "Email Provider", icon: Mail },
  { title: "AI Service", icon: Bot },
  { title: "Analytics Platform", icon: BarChart3 },
] as const;

const supportedIntegrations = [
  ["Stripe", "Payments and billing events", CircleDollarSign],
  ["PayPal", "Payment and account workflows", CircleDollarSign],
  ["OpenAI", "Bounded AI-assisted workflows", Bot],
  ["HubSpot", "CRM records and activities", Users],
  ["Salesforce", "CRM and business data", Cloud],
  ["Slack", "Team messages and workflow actions", MessageSquare],
  ["Notion", "Workspace content and databases", Layers3],
  ["Google Workspace", "Email, calendar, and files", CloudCog],
  ["Microsoft 365", "Organizational productivity services", Cloud],
  ["Shopify", "Commerce products and orders", ShoppingBag],
  ["Cloudinary", "Media storage and transformation", HardDrive],
  ["Zapier", "Supported workflow connections", PlugZap],
] as const satisfies readonly (readonly [string, string, LucideIcon])[];

const safeguards: readonly IconItem[] = [
  {
    title: "OAuth",
    description:
      "Delegate access with provider-supported scopes and explicit consent boundaries.",
    icon: KeyRound,
  },
  {
    title: "API keys",
    description:
      "Store secrets outside source, restrict access, and plan rotation according to provider capability.",
    icon: LockKeyhole,
  },
  {
    title: "Rate limiting",
    description:
      "Protect capacity and respect provider limits through bounded request behavior.",
    icon: Gauge,
  },
  {
    title: "Validation",
    description:
      "Verify incoming and outgoing data at trust boundaries before it affects business state.",
    icon: FileCheck2,
  },
  {
    title: "Error handling",
    description:
      "Classify failures and expose actionable context without leaking sensitive data.",
    icon: Unplug,
  },
  {
    title: "Retry logic",
    description:
      "Retry eligible transient failures with backoff, limits, and idempotency safeguards.",
    icon: TimerReset,
  },
  {
    title: "Logging",
    description:
      "Record useful technical context while minimizing sensitive information.",
    icon: Activity,
  },
  {
    title: "Monitoring",
    description:
      "Observe integration health, latency, failures, and provider dependencies.",
    icon: SearchCode,
  },
  {
    title: "Audit trails",
    description:
      "Preserve relevant action history where workflow accountability requires it.",
    icon: FileCheck2,
  },
  {
    title: "Encryption",
    description:
      "Use appropriate transport and storage protection across data boundaries.",
    icon: ShieldCheck,
  },
] as const;

const process = [
  {
    title: "Discovery",
    description:
      "Clarify systems, users, data ownership, goals, and operating constraints.",
    icon: SearchCode,
  },
  {
    title: "API Analysis",
    description:
      "Review documentation, access, limits, events, schemas, and provider risks.",
    icon: Braces,
  },
  {
    title: "Planning",
    description:
      "Define mappings, boundaries, failure states, milestones, and acceptance criteria.",
    icon: Route,
  },
  {
    title: "Authentication",
    description:
      "Configure credentials, scopes, secret handling, and token lifecycle.",
    icon: KeyRound,
  },
  {
    title: "Development",
    description:
      "Build typed adapters, orchestration logic, validation, and observability.",
    icon: CodeXml,
  },
  {
    title: "Testing",
    description:
      "Exercise expected paths, failures, retries, duplicates, and provider sandboxes.",
    icon: TestTube2,
  },
  {
    title: "Deployment",
    description:
      "Release configuration and credentials through controlled environments.",
    icon: Send,
  },
  {
    title: "Monitoring",
    description:
      "Review integration health and adapt to operational or provider changes.",
    icon: Activity,
  },
] as const;

const concepts: readonly IntegrationConcept[] = [
  {
    title: "CRM Sync",
    status: "Internal Concept",
    description:
      "A governed contact exchange with ownership, conflict, and retry states.",
    source: "Website",
    destination: "CRM",
    icon: Users,
  },
  {
    title: "Payment Processing Flow",
    status: "Prototype",
    description:
      "A payment-event pipeline separating checkout, provider state, and fulfillment.",
    source: "Checkout",
    destination: "Ledger",
    icon: CircleDollarSign,
  },
  {
    title: "AI Chat Integration",
    status: "Demo",
    description:
      "A bounded assistant path with context validation and human escalation.",
    source: "Support",
    destination: "AI + Review",
    icon: Bot,
  },
  {
    title: "Inventory Synchronization",
    status: "Prototype",
    description:
      "An event-aware stock exchange with source ownership and exception handling.",
    source: "ERP",
    destination: "Store",
    icon: Boxes,
  },
  {
    title: "Notification Hub",
    status: "Internal Concept",
    description:
      "One preference-aware dispatcher for email and team notifications.",
    source: "Events",
    destination: "Channels",
    icon: BellRing,
  },
  {
    title: "Analytics Pipeline",
    status: "Demo",
    description:
      "A validated event flow from product actions to approved reporting destinations.",
    source: "Product",
    destination: "Analytics",
    icon: BarChart3,
  },
] as const;

const apiIntegrationFaqs = [
  {
    question: "What is an API integration?",
    answer:
      "An API integration allows separate software systems to exchange approved data or actions through documented contracts. A production integration also needs authentication, validation, failure handling, monitoring, and clear ownership—not only a successful request.",
  },
  {
    question: "Which systems can Ayeb Solutions integrate?",
    answer:
      "We can assess services that provide suitable APIs, webhooks, credentials, documentation, and permissions. Feasibility depends on provider capability, account access, data requirements, rate limits, commercial terms, and security constraints.",
  },
  {
    question: "Can you connect our website to a CRM?",
    answer:
      "Often, where the CRM exposes the required API and the account has appropriate access. Discovery defines which records move, which system owns each field, how duplicates are handled, and what happens when a request fails.",
  },
  {
    question: "Do you integrate payment gateways?",
    answer:
      "Yes, supported gateways can be integrated for checkout, billing, subscriptions, or payment events. The exact design depends on region, account eligibility, provider capability, compliance responsibilities, and the product's financial workflow.",
  },
  {
    question: "Can you integrate AI services into an existing application?",
    answer:
      "Potentially. We first identify a bounded use case, available context, privacy implications, validation needs, cost controls, and where human review is appropriate. AI output should not automatically be treated as authoritative.",
  },
  {
    question: "What is the difference between an API and a webhook?",
    answer:
      "An API usually lets one system request data or an action. A webhook lets a provider send an event when something changes. Many integrations use both: APIs for queries or commands and webhooks for timely state updates.",
  },
  {
    question: "How do you secure API credentials?",
    answer:
      "Credentials are kept outside source code, limited by environment and scope where possible, and exposed only to the components that require them. Rotation, storage, provider permissions, and incident handling depend on the deployment environment.",
  },
  {
    question: "How do you prevent duplicate integration actions?",
    answer:
      "Where workflows require it, we use idempotency keys, event identifiers, stored processing state, and database constraints. The specific approach depends on provider behavior and the business consequence of a duplicate.",
  },
  {
    question: "What happens when an external API is unavailable?",
    answer:
      "The integration can classify the failure, preserve relevant state, retry eligible operations within limits, alert appropriate owners, or move work to an exception path. Not every request should be retried automatically.",
  },
  {
    question: "Can you work with an undocumented or legacy API?",
    answer:
      "Sometimes, but risk and effort can be materially higher. We need reliable access, representative test data, observable behavior, and an accountable system owner. If the interface cannot be safely understood, an adapter may not be responsible to build.",
  },
  {
    question: "Will an integration keep data synchronized in real time?",
    answer:
      "That depends on provider webhooks, rate limits, latency, workflow requirements, and the meaning of real time for the business. Some records suit event-driven updates, while others are safer with scheduled or user-triggered synchronization.",
  },
  {
    question: "How long does an API integration take?",
    answer:
      "Duration varies with the number of systems, API quality, authentication, data mapping, sandbox access, failure scenarios, testing, and external approvals. API analysis is used to establish a realistic plan rather than applying a fixed timeline.",
  },
  {
    question: "Do third-party providers charge separate fees?",
    answer:
      "They may. API access, usage, application review, premium plans, transaction fees, or partner requirements are controlled by each provider. Those terms should be reviewed before the integration scope is finalized.",
  },
  {
    question: "Do you monitor integrations after launch?",
    answer:
      "Monitoring and support can be included in the delivery scope. Useful coverage may include failure alerts, latency, queue depth, credential expiry, provider changes, and operational runbooks, depending on the integration's importance.",
  },
  {
    question: "How do we start an integration project?",
    answer:
      "Bring the systems involved, the business workflow, sample data, available API documentation, account access constraints, and the desired source of truth. A consultation can then identify feasibility questions and an appropriate discovery path.",
  },
] as const;

function NetworkIllustration() {
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-4 sm:p-6",
        styles.networkVisual,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
          integration / runtime
        </span>
        <span className="flex items-center gap-2 text-[0.58rem] font-medium">
          <span
            className={cn("size-2 rounded-full bg-success", styles.statusPulse)}
          />
          Observed
        </span>
      </div>
      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="space-y-3">
          {["Website", "Operations", "Customer app"].map((label) => (
            <div key={label} className="rounded-xl border bg-background p-3">
              <span className="text-[0.62rem] font-semibold">{label}</span>
              <span className="mt-2 block h-1.5 w-3/4 rounded bg-foreground/10" />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <span className={cn("h-20 w-px", styles.flowLine)} />
          <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <ServerCog className="size-5" />
          </span>
          <span className={cn("h-20 w-px", styles.flowLine)} />
        </div>
        <div className="space-y-3">
          {["CRM", "Payments", "Messaging"].map((label, index) => (
            <div
              key={label}
              className={cn(
                "rounded-xl border bg-card p-3",
                index === 1 && "border-foreground/25",
              )}
            >
              <span className="flex items-center gap-2 text-[0.62rem] font-semibold">
                <PlugZap className="size-3" />
                {label}
              </span>
              <span className="mt-2 block h-1.5 w-2/3 rounded bg-foreground/10" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3 text-[0.58rem]">
        <span>Validated contract</span>
        <span className="font-mono text-muted-foreground">200 / handled</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="api-title"
      className={cn(
        "relative overflow-hidden border-b py-16 sm:py-20 lg:py-28",
        styles.hero,
      )}
    >
      <Container className="relative z-10 max-w-[100rem]">
        <SiteBreadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: "API Integration", href: "/services/api-integration" },
          ]}
        />
        <div className="mt-12 grid min-w-0 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Fade className="min-w-0">
            <div>
              <Eyebrow className="mb-5 text-xs">
                API & System Integration
              </Eyebrow>
              <h1
                id="api-title"
                className="text-balance text-display font-bold"
              >
                Connect the systems your business already depends on.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                We design secure, observable integrations that move approved
                data between applications, reduce avoidable handoffs, and keep
                operational ownership clear.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="group h-12">
                  <Link href="/book-consultation">
                    Book Consultation{" "}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12">
                  <Link href="#integration-services">
                    Explore Integration Services
                  </Link>
                </Button>
              </div>
              <ul
                aria-label="Integration priorities"
                className="mt-10 grid gap-3 border-t pt-6 sm:grid-cols-3"
              >
                {["Typed contracts", "Visible failures", "Scoped access"].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs font-medium"
                    >
                      <Check className="size-3.5" aria-hidden="true" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Fade>
          <Fade className="min-w-0">
            <NetworkIllustration />
          </Fade>
        </div>
      </Container>
    </section>
  );
}

function WhyIntegrationSection() {
  return (
    <section
      aria-labelledby="why-integration-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <ServiceSectionIntroduction
              eyebrow="Why API integration"
              id="why-integration-heading"
              title="Create one dependable process across specialized tools."
              description="Integration can preserve the value of existing systems while removing unnecessary gaps between them. The right design begins with data ownership, operational risk, and provider capability."
            />
            <p className="mt-8 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
              Not every manual step should be automated, and not every system
              should synchronize every field. We define boundaries around what
              the workflow genuinely needs.
            </p>
          </div>
          <Stagger className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {integrationReasons.map(
              ({ title, description, icon: Icon }, index) => (
                <StaggerItem key={title} className="bg-background p-6">
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
                </StaggerItem>
              ),
            )}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="integration-services"
      aria-labelledby="integration-services-heading"
      className="scroll-mt-28 border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Integration services"
          id="integration-services-heading"
          title="Purpose-built connections with explicit responsibilities."
          description="From provider authentication to data mapping and failure recovery, each service is designed around the complete operational lifecycle—not only the happy path."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {integrationServices.map(
            ({ title, description, applications, icon: Icon }, index) => (
              <StaggerItem
                key={title}
                className={cn(
                  "h-full",
                  index < 2 ? "xl:col-span-6" : "xl:col-span-4",
                )}
              >
                <Card
                  className={cn(
                    "group flex h-full flex-col p-6 sm:p-7",
                    styles.hoverCard,
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.6rem] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {description}
                  </p>
                  <ul
                    className="mt-6 space-y-2 border-t pt-5"
                    aria-label={`${title} applications`}
                  >
                    {applications.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs"
                      >
                        <ChevronRight
                          className="size-3 text-muted-foreground"
                          aria-hidden="true"
                        />
                        {item}
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
      aria-labelledby="architecture-heading"
      className={cn(
        "border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        styles.architecture,
      )}
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          className="[&_p]:!text-primary-foreground/65"
          eyebrow="Integration architecture"
          id="architecture-heading"
          title="Keep internal truth separate from external dependencies."
          description="This conceptual architecture places validation and business rules between the product experience, owned records, and provider-specific adapters. Final topology depends on system requirements and risk."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <ol
            aria-label="Core application data flow"
            className="relative grid gap-3"
          >
            {architectureCore.map(
              ({ title, description, icon: Icon }, index) => (
                <li key={title} className="relative">
                  <div className="relative z-10 flex items-center gap-4 rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.06] p-4">
                    <span className="grid size-10 place-items-center rounded-lg bg-primary-foreground text-primary">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-xs text-primary-foreground/60">
                        {description}
                      </p>
                    </div>
                    <span className="ml-auto font-mono text-[0.56rem] text-primary-foreground/45">
                      L{index + 1}
                    </span>
                  </div>
                  {index < architectureCore.length - 1 && (
                    <ArrowDown
                      className="mx-auto my-1 size-4 text-primary-foreground/40"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ),
            )}
          </ol>
          <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.04] p-5 sm:p-7">
            <div className="border-primary-foreground/12 flex items-center justify-between border-b pb-4">
              <h3 className="font-semibold">Provider adapters</h3>
              <span className="font-mono text-[0.56rem] text-primary-foreground/50">
                SCOPED BOUNDARIES
              </span>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {architectureProviders.map(({ title, icon: Icon }, index) => (
                <li
                  key={title}
                  className={cn(
                    "group rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.05] p-4",
                    index === 4 && "sm:col-span-2",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="size-4" aria-hidden="true" />
                    <span className="text-sm font-semibold">{title}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[0.58rem] text-primary-foreground/55">
                    <span className={cn("h-px flex-1", styles.providerLine)} />
                    <span>validate → adapt → observe</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-primary-foreground/58 mt-5 text-xs leading-6">
              External services remain replaceable dependencies. Adapters
              contain provider-specific contracts so business rules do not
              spread throughout the application.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SupportedSection() {
  return (
    <section
      aria-labelledby="supported-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Supported integrations"
          id="supported-heading"
          title="Connect established platforms where access and APIs allow."
          description="These examples represent integration categories we can assess and implement. Actual compatibility depends on provider APIs, account permissions, commercial terms, data requirements, and technical constraints."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {supportedIntegrations.map(([name, role, Icon], index) => (
            <div key={name} className="group bg-card p-5">
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
        <p className="mt-6 max-w-3xl text-xs leading-6 text-muted-foreground">
          References to these services do not imply partnerships,
          certifications, endorsements, or guaranteed compatibility. Provider
          review is part of integration analysis.
        </p>
      </Container>
    </section>
  );
}

function SecuritySection() {
  return (
    <section
      aria-labelledby="security-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <ServiceSectionIntroduction
            eyebrow="Security and reliability"
            id="security-heading"
            title="Design for failure before a provider fails."
            description="External systems change, throttle requests, expire credentials, and return incomplete responses. Responsible integration design makes those conditions visible and recoverable where practical."
          />
          <dl className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {safeguards.map(({ title, description, icon: Icon }, index) => (
              <div key={title} className="bg-background p-5">
                <div className="flex items-center justify-between">
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="font-mono text-[0.55rem] text-muted-foreground">
                    C{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <dt className="mt-5 font-semibold">{title}</dt>
                <dd className="mt-2 text-xs leading-6 text-muted-foreground">
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

function ProcessSection() {
  return (
    <section
      aria-labelledby="api-process-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Development process"
          id="api-process-heading"
          title="Eight stages from system context to operational visibility."
          description="Integration work progresses through provider analysis, contract design, controlled implementation, realistic failure testing, and monitored release."
        />
        <div className="relative mt-14">
          <span
            className={cn(
              "absolute left-[6.25%] right-[6.25%] top-6 hidden h-px xl:block",
              styles.processLine,
            )}
            aria-hidden="true"
          />
          <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
            {process.map(({ title, description, icon: Icon }, index) => (
              <li
                key={title}
                className="relative rounded-xl border bg-background p-5"
              >
                <span className="relative z-10 grid size-12 place-items-center rounded-xl border bg-card shadow-xs">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="mt-7 block font-mono text-[0.58rem] text-muted-foreground">
                  STAGE {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-semibold tracking-tight">{title}</h3>
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

function ConceptVisual({ concept }: { readonly concept: IntegrationConcept }) {
  const Icon = concept.icon;
  return (
    <div
      className={cn(
        "rounded-xl border bg-background/75 p-4",
        styles.conceptVisual,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-3">
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Icon className="size-4" />
        </span>
        <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted-foreground">
          event.flow
        </span>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <span className="rounded-lg border bg-card p-3 text-center text-[0.58rem] font-semibold">
          {concept.source}
        </span>
        <span className="flex items-center">
          <span className={cn("h-px w-5", styles.conceptLine)} />
          <ArrowRight className="size-3" />
        </span>
        <span className="rounded-lg border bg-primary/5 p-3 text-center text-[0.58rem] font-semibold">
          {concept.destination}
        </span>
      </div>
      <div className="mt-4 flex justify-between text-[0.52rem] text-muted-foreground">
        <span>validated</span>
        <span>observable</span>
      </div>
    </div>
  );
}

function ConceptsSection() {
  return (
    <section
      aria-labelledby="concepts-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Internal integration concepts"
          id="concepts-heading"
          title="Original studies for common system boundaries."
          description="These concepts, prototypes, and demos explore integration architecture and operational states. They are not commissioned client work and do not demonstrate client outcomes."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {concepts.map((concept) => (
            <StaggerItem key={concept.title} className="h-full">
              <Card className={cn("group h-full p-4", styles.hoverCard)}>
                <ConceptVisual concept={concept} />
                <div className="p-2 pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="outline">{concept.status}</Badge>
                    <span className="font-mono text-[0.56rem] text-muted-foreground">
                      AYEB STUDY
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">
                    {concept.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {concept.description}
                  </p>
                  <p className="mt-5 border-t pt-4 text-xs font-medium">
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

function FaqSection() {
  return (
    <section
      aria-labelledby="api-faq-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <ServiceSectionIntroduction
          eyebrow="API integration FAQ"
          id="api-faq-heading"
          title="Questions to answer before systems exchange data."
          description="Practical guidance on provider feasibility, authentication, synchronization, failures, security, operations, and ongoing support."
        />
        <Accordion
          type="single"
          collapsible
          defaultValue="api-faq-1"
          className="mt-12 space-y-3"
        >
          {apiIntegrationFaqs.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`api-faq-${index + 1}`}
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

function ApiIntegrationPage() {
  const pageUrl = new URL("/services/api-integration", company.url).toString();
  const provider = {
    "@type": "Organization",
    name: company.name,
    url: company.url,
  } as const;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "API & System Integration",
    serviceType: "API and third-party system integration",
    description:
      "API integration services for connecting business systems through secure, maintainable, and observable application workflows.",
    url: pageUrl,
    provider,
    areaServed: "Worldwide",
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "API & System Integration Services",
    description:
      "API integration services from Ayeb Solutions covering REST, GraphQL, payments, CRM, ERP, OAuth, webhooks, and third-party systems.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    about: { "@type": "Service", name: "API & System Integration", provider },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: apiIntegrationFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
  return (
    <>
      <Hero />
      <WhyIntegrationSection />
      <ServicesSection />
      <ArchitectureSection />
      <SupportedSection />
      <SecuritySection />
      <ProcessSection />
      <ConceptsSection />
      <FaqSection />
      <ServiceFinalCta
        id="api-final-heading"
        eyebrow="Map the workflow before connecting the tools"
        title="Ready to make your systems work together more clearly?"
        description="Bring the platforms, business process, available API documentation, and current data ownership. We'll help identify feasibility questions and a responsible integration path."
        panelClassName={styles.finalPanel}
      />
      <StructuredData data={serviceSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export { ApiIntegrationPage };
