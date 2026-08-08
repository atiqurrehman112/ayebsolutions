import {
  Activity,
  Airplay,
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  CheckCheck,
  CircleGauge,
  ClipboardCheck,
  CloudCog,
  Database,
  FileCheck2,
  FileText,
  Filter,
  GitBranch,
  HeartHandshake,
  Inbox,
  KeyRound,
  LockKeyhole,
  Mail,
  MessageCircle,
  MessageSquareText,
  Network,
  PackageCheck,
  PlugZap,
  RefreshCw,
  Rocket,
  Route,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Slack,
  Sparkles,
  Store,
  TestTube2,
  UserCheck,
  Users,
  Workflow,
  Wrench,
  Zap,
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
import { AiAutomationWorkflow } from "./ai-automation-workflow";
import {
  ServiceFinalCta,
  ServiceSectionIntroduction,
} from "./service-page-shared";
import styles from "./ai-automation-page.module.css";

interface IconContent {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface AutomationSolution extends IconContent {
  readonly examples: readonly string[];
}

interface DemoAutomation {
  readonly title: string;
  readonly status: "Internal Demo" | "Prototype" | "Concept";
  readonly description: string;
  readonly flow: readonly [string, string, string];
  readonly icon: LucideIcon;
}

const automationConcepts = [
  {
    title: "Rule-based automation",
    label: "Known logic",
    description:
      "Deterministic steps handle predictable conditions, validation, routing, and system updates.",
    icon: GitBranch,
  },
  {
    title: "AI assistance",
    label: "Variable context",
    description:
      "Models can classify, summarize, extract, or draft where language and context vary.",
    icon: BrainCircuit,
  },
  {
    title: "Human approval",
    label: "Accountable action",
    description:
      "People review uncertainty, sensitive communication, exceptions, and consequential decisions.",
    icon: UserCheck,
  },
] as const;

const automationSolutions: readonly AutomationSolution[] = [
  {
    title: "AI Agents",
    description:
      "Bounded assistants that use approved tools and context to support defined tasks.",
    examples: ["Knowledge retrieval", "Task coordination", "Review queues"],
    icon: Bot,
  },
  {
    title: "CRM Automation",
    description:
      "Controlled customer-data workflows that reduce manual record updates and routing.",
    examples: ["Field mapping", "Lifecycle updates", "Owner assignment"],
    icon: Database,
  },
  {
    title: "Lead Qualification",
    description:
      "Traceable intake and classification against business-defined criteria.",
    examples: ["Source capture", "Intent classification", "Human escalation"],
    icon: Filter,
  },
  {
    title: "Email Automation",
    description:
      "Context-aware drafts and deterministic sequences with appropriate review rules.",
    examples: ["Follow-up drafts", "Inbox triage", "Lifecycle messages"],
    icon: Mail,
  },
  {
    title: "WhatsApp Automation",
    description:
      "Permission-aware messaging flows for suitable service and operational use cases.",
    examples: ["Request routing", "Status messages", "Human handoff"],
    icon: MessageCircle,
  },
  {
    title: "Customer Support Automation",
    description:
      "Assisted support experiences grounded in approved knowledge and escalation paths.",
    examples: ["Question triage", "Suggested replies", "Ticket enrichment"],
    icon: HeartHandshake,
  },
  {
    title: "Sales Automation",
    description:
      "Connected workflows that organize follow-up, context, and next-action visibility.",
    examples: ["Lead routing", "Meeting preparation", "Pipeline reminders"],
    icon: BriefcaseBusiness,
  },
  {
    title: "Internal Business Workflows",
    description:
      "Operational automations across documents, approvals, teams, and existing tools.",
    examples: ["Approval flows", "Document processing", "Team notifications"],
    icon: Workflow,
  },
] as const;

const integrations = [
  { name: "OpenAI", role: "AI models", icon: Sparkles },
  { name: "Google Workspace", role: "Productivity", icon: CloudCog },
  { name: "Microsoft 365", role: "Business tools", icon: Airplay },
  { name: "Slack", role: "Team messaging", icon: Slack },
  { name: "Notion", role: "Knowledge", icon: FileText },
  { name: "HubSpot", role: "CRM", icon: Users },
  { name: "Zapier", role: "Automation", icon: Zap },
  { name: "Stripe", role: "Payments", icon: PackageCheck },
  { name: "Shopify", role: "Commerce", icon: ShoppingBag },
  { name: "WhatsApp", role: "Messaging", icon: MessageCircle },
  { name: "Discord", role: "Communities", icon: MessageSquareText },
  { name: "Airtable", role: "Structured data", icon: Store },
] as const;

const benefits: readonly IconContent[] = [
  {
    title: "Reduce repetitive work",
    description:
      "Suitable repeatable steps can move through a defined workflow while people retain exception handling.",
    icon: RefreshCw,
  },
  {
    title: "Improve consistency",
    description:
      "Explicit rules, templates, validation, and state transitions can make routine execution more predictable.",
    icon: CheckCheck,
  },
  {
    title: "Faster internal processes",
    description:
      "Connected handoffs can reduce avoidable waiting when data, ownership, and dependencies are ready.",
    icon: Activity,
  },
  {
    title: "Better customer response",
    description:
      "Routing and assisted drafts can help teams respond with relevant context, subject to review needs.",
    icon: Inbox,
  },
  {
    title: "Connect existing systems",
    description:
      "APIs can move approved information between tools without creating another isolated data source.",
    icon: PlugZap,
  },
  {
    title: "Scale operations",
    description:
      "Well-bounded workflows can support greater process volume when systems, people, and controls are prepared.",
    icon: Network,
  },
] as const;

const safeguards: readonly IconContent[] = [
  {
    title: "Human approval",
    description:
      "Sensitive or consequential actions pause for an accountable person.",
    icon: UserCheck,
  },
  {
    title: "Confidence thresholds",
    description:
      "Uncertain model output follows explicit review or fallback paths.",
    icon: CircleGauge,
  },
  {
    title: "Audit logs",
    description:
      "Important inputs, decisions, actions, and exceptions remain traceable.",
    icon: FileCheck2,
  },
  {
    title: "Permissions",
    description:
      "Each system and actor receives only the access required for its role.",
    icon: KeyRound,
  },
  {
    title: "Exception handling",
    description:
      "Failures and unusual inputs have visible retry, escalation, or stop states.",
    icon: ShieldAlert,
  },
  {
    title: "Validation",
    description:
      "Inputs and outputs are checked before downstream systems rely on them.",
    icon: ClipboardCheck,
  },
  {
    title: "Data privacy",
    description:
      "Data scope, retention, providers, access, and jurisdiction require project-specific review.",
    icon: LockKeyhole,
  },
] as const;

const demoAutomations: readonly DemoAutomation[] = [
  {
    title: "AI Lead Qualification",
    status: "Internal Demo",
    description:
      "An intake and review study for classifying enquiries against explicit business criteria.",
    flow: ["Form", "Classify", "Review"],
    icon: Filter,
  },
  {
    title: "Customer Support Assistant",
    status: "Prototype",
    description:
      "A retrieval and response prototype with source context and human escalation.",
    flow: ["Question", "Retrieve", "Handoff"],
    icon: HeartHandshake,
  },
  {
    title: "CRM Workflow",
    status: "Internal Demo",
    description:
      "A traceable record-update flow with duplicate handling and owner routing.",
    flow: ["Capture", "Map", "Update"],
    icon: Database,
  },
  {
    title: "Invoice Processing",
    status: "Concept",
    description:
      "A document extraction concept that routes uncertain fields to a review queue.",
    flow: ["Document", "Validate", "Approve"],
    icon: FileText,
  },
  {
    title: "Email Follow-up System",
    status: "Prototype",
    description:
      "A contextual drafting prototype governed by sequence and approval rules.",
    flow: ["Context", "Draft", "Send"],
    icon: Mail,
  },
  {
    title: "Employee Onboarding",
    status: "Concept",
    description:
      "A cross-team checklist concept for accounts, documents, and ownership handoffs.",
    flow: ["Joiner", "Tasks", "Confirm"],
    icon: Users,
  },
] as const;

const processSteps = [
  {
    title: "Discovery",
    description:
      "Clarify the operating goal, users, constraints, risk, and useful success signals.",
    icon: Search,
  },
  {
    title: "Workflow Mapping",
    description:
      "Document current states, handoffs, data, exceptions, and decision owners.",
    icon: Route,
  },
  {
    title: "Automation Design",
    description:
      "Define deterministic logic, AI boundaries, approvals, and failure paths.",
    icon: GitBranch,
  },
  {
    title: "AI Integration",
    description:
      "Connect suitable models, prompts, tools, context, and permissions.",
    icon: BrainCircuit,
  },
  {
    title: "Testing",
    description:
      "Review expected, uncertain, adversarial, and failure scenarios with representative data.",
    icon: TestTube2,
  },
  {
    title: "Deployment",
    description:
      "Release with configuration, access, observability, and rollback considerations.",
    icon: Rocket,
  },
  {
    title: "Monitoring",
    description:
      "Observe errors, exceptions, model behavior, cost, and human review demand.",
    icon: Activity,
  },
  {
    title: "Optimization",
    description:
      "Improve the workflow using evidence, policy changes, and operational feedback.",
    icon: Wrench,
  },
] as const;

const aiAutomationFaqs = [
  {
    question: "What is AI automation?",
    answer:
      "AI automation combines deterministic workflow logic with carefully bounded model capabilities such as classification, extraction, summarization, or drafting. A responsible system also defines validation, permissions, exceptions, monitoring, and where people must approve decisions.",
  },
  {
    question: "How is AI automation different from traditional automation?",
    answer:
      "Traditional automation follows known rules and structured inputs. AI can assist where language or context varies, but its output is probabilistic. Useful systems combine both approaches instead of replacing reliable rules with a model.",
  },
  {
    question: "Which business processes are suitable for automation?",
    answer:
      "Good candidates are repeatable, observable, sufficiently documented, and supported by usable data or APIs. Processes with unclear ownership, unstable rules, or high-consequence judgment usually need redesign or stronger human control before automation.",
  },
  {
    question: "Do AI automations replace employees?",
    answer:
      "Our approach is to examine tasks and handoffs rather than assume roles should disappear. Automation can reduce repetitive steps or support decisions, while people remain important for judgment, relationships, exceptions, and accountability.",
  },
  {
    question: "How do you keep humans involved?",
    answer:
      "We can add approval queues, confidence thresholds, escalation rules, editable drafts, exception states, and audit history. The appropriate level of review depends on the action, data, customer impact, and regulatory context.",
  },
  {
    question: "Can you integrate with our CRM and existing tools?",
    answer:
      "Often, yes. Feasibility depends on APIs, authentication, permissions, usage limits, data quality, provider terms, and the workflow's needs. We assess those constraints before committing to an integration.",
  },
  {
    question: "Can you automate WhatsApp or email communication?",
    answer:
      "Potentially, where platform rules, consent, message purpose, templates, and human-review requirements support the use case. Messaging automation must respect provider policies and should include opt-out and escalation behavior where applicable.",
  },
  {
    question: "How accurate is an AI automation?",
    answer:
      "Accuracy depends on the task, model, instructions, context, data, evaluation method, and operating conditions. We do not promise universal accuracy; we define suitable tests, thresholds, validation, and fallback behavior for the specific workflow.",
  },
  {
    question: "How do you protect business and customer data?",
    answer:
      "Data protection requires project-specific decisions about minimization, access, retention, encryption, providers, regions, logs, and contractual obligations. Sensitive data should not enter a model or service without an appropriate review.",
  },
  {
    question: "What happens when the automation fails?",
    answer:
      "A production workflow should distinguish retries, partial completion, invalid inputs, unavailable providers, and cases requiring a person. Failures need visible status, useful context, and an escalation path rather than silent continuation.",
  },
  {
    question: "How long does an AI automation project take?",
    answer:
      "Timing depends on workflow clarity, systems, API access, data readiness, security review, testing depth, and stakeholder availability. Discovery and workflow mapping are required before a responsible delivery plan can be established.",
  },
  {
    question: "How much does AI automation cost?",
    answer:
      "Investment depends on process complexity, integrations, model usage, data work, control requirements, and operational support. Provider usage charges may also vary. We scope the system before discussing an appropriate commercial structure.",
  },
  {
    question: "Can an automation be expanded later?",
    answer:
      "Yes, when its states, data contracts, permissions, and monitoring are designed clearly. Expansion should follow observed needs and evidence rather than adding complexity before the original workflow is dependable.",
  },
  {
    question: "Do you monitor and maintain automations after launch?",
    answer:
      "Ongoing support can include error review, provider changes, prompt or rule evaluation, access updates, cost observation, and planned improvements. The operating model depends on the workflow's importance and risk.",
  },
  {
    question: "How do we start an AI automation project?",
    answer:
      "Start with one process: describe its goal, current steps, owners, inputs, systems, exceptions, volume, and pain points. An initial consultation can determine whether automation is appropriate and what discovery evidence is needed.",
  },
] as const;

function WorkflowHeroVisual() {
  const nodes = [
    { label: "Capture", icon: Inbox },
    { label: "Rules", icon: GitBranch },
    { label: "AI assist", icon: BrainCircuit },
    { label: "Review", icon: UserCheck },
    { label: "Action", icon: Zap },
  ] as const;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border p-4 sm:p-6",
        styles.heroVisual,
      )}
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
        </div>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
          Governed workflow
        </span>
      </div>
      <div className="relative mt-6 space-y-3">
        <span
          className={cn("absolute bottom-6 left-5 top-6 w-px", styles.heroLine)}
        />
        {nodes.map(({ label, icon: Icon }, index) => (
          <div
            key={label}
            className={cn(
              "relative z-10 flex items-center gap-4 rounded-xl border bg-background/85 p-3.5 shadow-xs",
              index === 2 && styles.heroActive,
            )}
          >
            <span
              className={cn(
                "grid size-10 place-items-center rounded-xl border bg-card",
                index === 2 && "bg-primary text-primary-foreground",
              )}
            >
              <Icon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">{label}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <span
                  className={cn(
                    "block h-full rounded-full bg-primary/35",
                    ["w-2/5", "w-3/5", "w-4/5", "w-1/2", "w-full"][index],
                  )}
                />
              </div>
            </div>
            <span className="font-mono text-[0.58rem] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-5 flex items-center gap-2 rounded-xl border bg-background/80 p-4 text-xs font-medium">
        <ShieldCheck className="size-4 text-success" />
        Controls remain visible at every step
      </p>
    </div>
  );
}

function AiAutomationHero() {
  return (
    <section
      aria-labelledby="ai-automation-heading"
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
            { label: "AI Automation", href: "/services/ai-automation" },
          ]}
        />
        <div className="mt-16 grid min-w-0 gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center xl:gap-20">
          <Fade className="min-w-0">
            <Eyebrow className="mb-5 text-xs">AI automation systems</Eyebrow>
            <h1
              id="ai-automation-heading"
              className="text-balance text-display font-bold"
            >
              Connect the work. Add intelligence where it earns trust.
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              We design automation systems that connect business tools, reliable
              rules, bounded AI assistance, and human oversight into one
              understandable workflow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group h-12 rounded-lg px-6">
                <Link href="/book-consultation">
                  Book Automation Consultation
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
                <Link href="#interactive-workflow">Explore the Workflow</Link>
              </Button>
            </div>
            <ul
              aria-label="AI automation priorities"
              className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground"
            >
              {[
                "Human-aware controls",
                "Traceable decisions",
                "System-specific design",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Fade>
          <Fade className="min-w-0">
            <WorkflowHeroVisual />
          </Fade>
        </div>
      </Container>
    </section>
  );
}

function WhatIsAutomationSection() {
  return (
    <section
      aria-labelledby="what-is-ai-automation"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="What is AI automation?"
          id="what-is-ai-automation"
          title="Rules provide reliability. AI handles variation. People retain judgment."
          description="AI automation is not a model acting alone. It is an operational system that decides when deterministic logic, AI assistance, or accountable human review is appropriate."
        />
        <div className="relative mt-12 grid gap-5 lg:grid-cols-3">
          {automationConcepts.map(
            ({ title, label, description, icon: Icon }, index) => (
              <div key={title} className="relative">
                <Card
                  className={cn(
                    "h-full bg-card/80 p-6 sm:p-7",
                    index === 1 && "border-foreground/20 shadow-soft",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.6rem] text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </Card>
                {index < 2 ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -right-3 top-1/2 z-10 hidden size-6 place-items-center rounded-full border bg-background text-xs lg:grid",
                      styles.diagramJoin,
                    )}
                  >
                    +
                  </span>
                ) : null}
              </div>
            ),
          )}
        </div>
        <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
          <div className="bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
              Business value
            </p>
            <p className="mt-2 text-sm">
              Less avoidable handling and clearer workflow state.
            </p>
          </div>
          <div className="bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
              Typical use
            </p>
            <p className="mt-2 text-sm">
              Intake, classification, routing, drafting, and review.
            </p>
          </div>
          <div className="bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
              Important limit
            </p>
            <p className="mt-2 text-sm">
              Suitability depends on risk, data, systems, and operating rules.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section
      aria-labelledby="automation-solutions-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Automation solutions"
          id="automation-solutions-heading"
          title="Systems designed around the work between your tools and teams."
          description="Each solution begins with the process, data, ownership, and exceptions—not with an assumption that every step needs AI."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {automationSolutions.map(
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

function InteractiveWorkflowSection() {
  return (
    <section
      id="interactive-workflow"
      aria-labelledby="interactive-workflow-heading"
      className="scroll-mt-28 border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Workflow explorer"
          id="interactive-workflow-heading"
          title="Inspect how one automation moves from capture to accountable completion."
          description="This educational example separates data capture, AI assistance, system updates, communication, and human approval into visible states."
        />
        <div className="mt-12">
          <AiAutomationWorkflow />
        </div>
      </Container>
    </section>
  );
}

function IntegrationsSection() {
  return (
    <section
      aria-labelledby="integrations-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <div>
            <ServiceSectionIntroduction
              eyebrow="Compatible with"
              id="integrations-heading"
              title="Connect the tools already carrying your work."
              description="Integration design considers authentication, permissions, data contracts, reliability, limits, and ownership—not just whether an API endpoint exists."
            />
            <div className="mt-7 rounded-xl border bg-card p-5 text-sm leading-relaxed">
              <strong>
                Compatibility depends on API availability and business
                requirements.
              </strong>
              <span className="text-muted-foreground">
                {" "}
                Technology names do not indicate partnerships, certifications,
                or endorsements.
              </span>
            </div>
          </div>
          <Stagger className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 xl:grid-cols-3">
            {integrations.map(({ name, role, icon: Icon }) => (
              <StaggerItem key={name} className="bg-background">
                <div className="flex h-full items-center gap-4 p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border bg-card shadow-xs">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{role}</p>
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

function BenefitsSection() {
  return (
    <section
      aria-labelledby="automation-benefits-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ServiceSectionIntroduction
              eyebrow="Potential benefits"
              id="automation-benefits-heading"
              title="Create capacity by improving the workflow—not by hiding complexity."
              description="Useful automation can support these operational improvements when the process, data, integrations, and adoption are suitable."
            />
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              These are potential benefits, not guaranteed outcomes. Results
              depend on the workflow and operating environment.
            </p>
          </div>
          <dl className="overflow-hidden rounded-2xl border bg-card/75">
            {benefits.map(({ title, description, icon: Icon }, index) => (
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

function SecuritySection() {
  return (
    <section
      aria-labelledby="automation-security-heading"
      className={cn(
        "relative overflow-hidden border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        styles.securitySection,
      )}
    >
      <Container className="relative max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Security and oversight"
          id="automation-security-heading"
          title="Automation needs visible authority, boundaries, and failure states."
          description="Controls are designed according to the action, data, model behavior, systems, and people responsible for operating the workflow."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-3">
          {safeguards.map(({ title, description, icon: Icon }, index) => (
            <div
              key={title}
              className={cn(
                "bg-primary p-5 sm:p-6",
                index === safeguards.length - 1 && "lg:col-span-3",
              )}
            >
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.08]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-primary-foreground/65">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-primary-foreground/55">
          Security and privacy requirements vary by data, provider, location,
          industry, and policy. Appropriate legal or compliance review remains
          the organization&apos;s responsibility.
        </p>
      </Container>
    </section>
  );
}

function DemoFlow({ project }: { readonly project: DemoAutomation }) {
  const Icon = project.icon;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background/75 p-4",
        styles.demoVisual,
      )}
    >
      <div className="flex items-center justify-between border-b pb-3">
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Icon className="size-4" />
        </span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
          workflow.study
        </span>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        {project.flow.map((step, index) => (
          <div key={step} className="contents">
            <span className="rounded-lg border bg-card px-2 py-3 text-center text-[0.58rem] font-semibold sm:text-[0.65rem]">
              {step}
            </span>
            {index < project.flow.length - 1 ? (
              <ArrowRight className="size-3 text-muted-foreground" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExampleProjectsSection() {
  return (
    <section
      aria-labelledby="automation-demos-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Automation studies"
          id="automation-demos-heading"
          title="Internal demonstrations of practical workflow patterns."
          description="These original demos, prototypes, and concepts explore architecture and interaction patterns. They are not client work and do not represent client outcomes."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {demoAutomations.map((project) => (
            <StaggerItem key={project.title} className="h-full">
              <Card
                className={cn(
                  "group flex h-full flex-col bg-card/80 p-4",
                  styles.hoverCard,
                )}
              >
                <DemoFlow project={project} />
                <div className="flex flex-1 flex-col p-2 pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Badge variant="outline">{project.status}</Badge>
                    <span className="font-mono text-[0.58rem] text-muted-foreground">
                      AYEB STUDY
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
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

function ProcessSection() {
  return (
    <section
      aria-labelledby="automation-process-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Implementation process"
          id="automation-process-heading"
          title="From workflow evidence to monitored operation."
          description="The process makes business logic, AI boundaries, testing, ownership, and post-launch responsibility explicit."
        />
        <div className="relative mt-12">
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-6 top-6 hidden h-px lg:block",
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

function AiAutomationFaq() {
  return (
    <section
      aria-labelledby="ai-faq-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <ServiceSectionIntroduction
          eyebrow="AI automation FAQ"
          id="ai-faq-heading"
          title="Practical answers before workflow discovery."
          description="These questions explain where AI automation can help, where it needs limits, and what responsible implementation involves."
        />
        <Accordion
          type="single"
          collapsible
          defaultValue="ai-faq-1"
          className="mt-12 space-y-3"
        >
          {aiAutomationFaqs.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`ai-faq-${index + 1}`}
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

function AiAutomationPage() {
  const pageUrl = new URL("/services/ai-automation", company.url).toString();
  const provider = {
    "@type": "Organization",
    name: company.name,
    url: company.url,
  } as const;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Automation",
    serviceType: "AI automation consulting and development",
    description:
      "AI automation systems that connect business workflows, tools, human oversight, and bounded AI assistance.",
    url: pageUrl,
    provider,
    areaServed: "Worldwide",
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AI Automation Services",
    description:
      "AI automation services from Ayeb Solutions, including AI agents, CRM, sales, support, messaging, and internal workflows.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    about: { "@type": "Service", name: "AI Automation", provider },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aiAutomationFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
  return (
    <>
      <AiAutomationHero />
      <WhatIsAutomationSection />
      <SolutionsSection />
      <InteractiveWorkflowSection />
      <IntegrationsSection />
      <BenefitsSection />
      <SecuritySection />
      <ExampleProjectsSection />
      <ProcessSection />
      <AiAutomationFaq />
      <ServiceFinalCta
        id="ai-final-heading"
        eyebrow="Start with the workflow"
        title="Where could responsible automation remove the most friction?"
        description="Bring one process, its current steps, and the systems involved. We'll help assess whether automation is appropriate and define the evidence needed for a useful next step."
        panelClassName={styles.finalPanel}
      />
      <StructuredData data={serviceSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export { AiAutomationPage };
