import {
  Accessibility,
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  BellRing,
  Bug,
  CalendarClock,
  Check,
  ChevronRight,
  CircleGauge,
  ClipboardCheck,
  CloudCog,
  Code2,
  Database,
  FileCheck2,
  FileClock,
  Gauge,
  GitBranch,
  HardDriveDownload,
  HeartPulse,
  LifeBuoy,
  ListChecks,
  LockKeyhole,
  MonitorCheck,
  PackageCheck,
  RefreshCw,
  Rocket,
  RotateCcw,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TestTube2,
  TimerReset,
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
import styles from "./maintenance-support-page.module.css";

interface IconItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface MaintenanceService extends IconItem {
  readonly focus: readonly [string, string, string];
}

interface SupportConcept {
  readonly title: string;
  readonly status: "Internal Concept" | "Prototype" | "Demo";
  readonly description: string;
  readonly signals: readonly [string, string, string];
  readonly icon: LucideIcon;
}

const maintenanceReasons: readonly IconItem[] = [
  {
    title: "Continuous improvements",
    description:
      "Prioritize useful refinements as business needs, content, and user expectations change.",
    icon: Sparkles,
  },
  {
    title: "Security updates",
    description:
      "Review applicable patches, provider notices, access boundaries, and changing security risks.",
    icon: ShieldCheck,
  },
  {
    title: "Bug fixes",
    description:
      "Reproduce reported behavior, diagnose the cause, test the correction, and document material changes.",
    icon: Bug,
  },
  {
    title: "Performance optimization",
    description:
      "Investigate measured bottlenecks across code, data, media, caching, and third-party services.",
    icon: Gauge,
  },
  {
    title: "Dependency updates",
    description:
      "Evaluate releases, compatibility, migration requirements, and risk before changing production software.",
    icon: PackageCheck,
  },
  {
    title: "Monitoring",
    description:
      "Use relevant signals to make failures, degraded behavior, and operational trends more visible.",
    icon: Activity,
  },
  {
    title: "Long-term stability",
    description:
      "Reduce avoidable drift through routine review, documentation, and deliberate technical decisions.",
    icon: HeartPulse,
  },
] as const;

const maintenanceServices: readonly MaintenanceService[] = [
  {
    title: "Security Updates",
    description:
      "Assess and apply relevant fixes with change review, testing, and deployment controls.",
    focus: ["Patch review", "Access checks", "Release validation"],
    icon: ShieldCheck,
  },
  {
    title: "Performance Optimization",
    description:
      "Use evidence to target slow rendering, queries, assets, caching, or external dependencies.",
    focus: ["Runtime analysis", "Query review", "Delivery tuning"],
    icon: CircleGauge,
  },
  {
    title: "Bug Fixes",
    description:
      "Turn reproducible defects into scoped corrections with regression awareness.",
    focus: ["Reproduction", "Root-cause analysis", "Regression checks"],
    icon: Bug,
  },
  {
    title: "Feature Enhancements",
    description:
      "Extend existing products through planned, maintainable changes rather than unmanaged patches.",
    focus: ["Scope review", "Implementation", "Documentation"],
    icon: Sparkles,
  },
  {
    title: "Server Monitoring",
    description:
      "Observe relevant application and infrastructure signals according to the hosting environment.",
    focus: ["Health signals", "Error visibility", "Resource trends"],
    icon: ServerCog,
  },
  {
    title: "Database Maintenance",
    description:
      "Review data integrity, query behavior, indexes, growth, and migration safety.",
    focus: ["Query analysis", "Index review", "Migration planning"],
    icon: Database,
  },
  {
    title: "Backup Strategy",
    description:
      "Define backup scope, retention, access, and verification around business recovery needs.",
    focus: ["Recovery needs", "Retention rules", "Restore checks"],
    icon: HardDriveDownload,
  },
  {
    title: "Technical Support",
    description:
      "Provide scoped engineering help for incidents, questions, changes, and technical decisions.",
    focus: ["Issue triage", "Technical guidance", "Change records"],
    icon: LifeBuoy,
  },
] as const;

const lifecycle = [
  {
    title: "Monitor",
    description: "Collect relevant operational signals.",
    icon: MonitorCheck,
  },
  {
    title: "Detect",
    description: "Surface a change, failure, or concern.",
    icon: BellRing,
  },
  {
    title: "Diagnose",
    description: "Reproduce and identify likely causes.",
    icon: Search,
  },
  {
    title: "Fix",
    description: "Implement a bounded correction.",
    icon: Wrench,
  },
  {
    title: "Test",
    description: "Verify behavior and related paths.",
    icon: TestTube2,
  },
  {
    title: "Deploy",
    description: "Release through a controlled process.",
    icon: Rocket,
  },
  {
    title: "Review",
    description: "Confirm production behavior and records.",
    icon: ClipboardCheck,
  },
  {
    title: "Improve",
    description: "Apply lessons to systems and process.",
    icon: RefreshCw,
  },
] as const;

const coverage: readonly IconItem[] = [
  {
    title: "Security patches",
    description: "Relevant application and platform fixes",
    icon: ShieldCheck,
  },
  {
    title: "Framework upgrades",
    description: "Compatibility-aware version planning",
    icon: Code2,
  },
  {
    title: "Dependency management",
    description: "Release, risk, and migration review",
    icon: PackageCheck,
  },
  {
    title: "Database optimization",
    description: "Queries, indexes, and data growth",
    icon: Database,
  },
  {
    title: "Caching",
    description: "Freshness, invalidation, and delivery",
    icon: TimerReset,
  },
  {
    title: "CDN",
    description: "Asset distribution and configuration",
    icon: CloudCog,
  },
  {
    title: "Logging",
    description: "Useful context with data minimization",
    icon: FileClock,
  },
  {
    title: "Monitoring",
    description: "Application and infrastructure signals",
    icon: Activity,
  },
  {
    title: "Analytics review",
    description: "Product and delivery observations",
    icon: BarChart3,
  },
  {
    title: "Backup verification",
    description: "Coverage, retention, and restore review",
    icon: HardDriveDownload,
  },
  {
    title: "Uptime awareness",
    description: "Availability signals without guarantees",
    icon: MonitorCheck,
  },
  {
    title: "Documentation",
    description: "Change, operating, and recovery context",
    icon: FileCheck2,
  },
] as const;

const practices: readonly IconItem[] = [
  {
    title: "Version control",
    description: "Changes remain attributable and reviewable.",
    icon: GitBranch,
  },
  {
    title: "Deployment verification",
    description: "Production behavior is checked after release.",
    icon: ClipboardCheck,
  },
  {
    title: "Rollback planning",
    description: "Material changes consider a responsible recovery path.",
    icon: RotateCcw,
  },
  {
    title: "Testing",
    description: "Checks reflect the risk and affected behavior.",
    icon: TestTube2,
  },
  {
    title: "Monitoring",
    description: "Useful signals support operational awareness.",
    icon: Activity,
  },
  {
    title: "Security reviews",
    description:
      "Access, dependencies, and exposure receive regular attention.",
    icon: LockKeyhole,
  },
  {
    title: "Accessibility reviews",
    description:
      "Changes are assessed for keyboard, semantic, contrast, and motion impact.",
    icon: Accessibility,
  },
  {
    title: "Performance audits",
    description:
      "Optimization follows evidence and meaningful user conditions.",
    icon: Gauge,
  },
  {
    title: "Documentation",
    description: "Decisions and operating context remain discoverable.",
    icon: FileCheck2,
  },
  {
    title: "Continuous improvement",
    description: "Recurring issues inform better systems and process.",
    icon: RefreshCw,
  },
] as const;

const workflow = [
  {
    title: "Review",
    description:
      "Understand the current product, ownership, documentation, and operating context.",
    icon: ListChecks,
  },
  {
    title: "Assessment",
    description:
      "Identify risks, dependencies, symptoms, constraints, and available evidence.",
    icon: Search,
  },
  {
    title: "Planning",
    description: "Prioritize work by impact, risk, effort, and business need.",
    icon: CalendarClock,
  },
  {
    title: "Development",
    description:
      "Implement bounded updates using the established architecture and controls.",
    icon: Code2,
  },
  {
    title: "Testing",
    description:
      "Verify intended behavior, regressions, accessibility, and relevant performance.",
    icon: TestTube2,
  },
  {
    title: "Deployment",
    description:
      "Release with environment checks, change context, and rollback awareness.",
    icon: Rocket,
  },
  {
    title: "Monitoring",
    description:
      "Observe production behavior and investigate material signals.",
    icon: MonitorCheck,
  },
  {
    title: "Continuous Improvement",
    description:
      "Use findings to strengthen code, documentation, and future maintenance.",
    icon: RefreshCw,
  },
] as const;

const concepts: readonly SupportConcept[] = [
  {
    title: "Monitoring Dashboard",
    status: "Internal Concept",
    description:
      "A focused view of application signals, recent events, and investigation context.",
    signals: ["Health", "Errors", "Latency"],
    icon: MonitorCheck,
  },
  {
    title: "Deployment Pipeline",
    status: "Prototype",
    description:
      "A controlled release sequence with verification and recovery checkpoints.",
    signals: ["Build", "Verify", "Release"],
    icon: Rocket,
  },
  {
    title: "Incident Tracker",
    status: "Demo",
    description:
      "A structured record for symptoms, ownership, actions, and follow-up learning.",
    signals: ["Triage", "Owner", "Review"],
    icon: BellRing,
  },
  {
    title: "Maintenance Scheduler",
    status: "Internal Concept",
    description:
      "A risk-aware calendar for recurring reviews, upgrades, and technical tasks.",
    signals: ["Review", "Plan", "Record"],
    icon: CalendarClock,
  },
  {
    title: "Backup Monitor",
    status: "Prototype",
    description:
      "A verification surface for backup coverage, recency, retention, and restore checks.",
    signals: ["Coverage", "Retention", "Restore"],
    icon: HardDriveDownload,
  },
  {
    title: "Performance Report",
    status: "Demo",
    description:
      "An evidence-led summary of experience signals, changes, and investigation areas.",
    signals: ["Measure", "Compare", "Explain"],
    icon: BarChart3,
  },
] as const;

const maintenanceFaqs = [
  {
    question: "What does website maintenance include?",
    answer:
      "Maintenance can include security and dependency updates, defect correction, performance review, monitoring, database care, backups, documentation, and scoped enhancements. The actual coverage is defined around the product, hosting environment, risk, and business needs.",
  },
  {
    question: "Why does a website need ongoing maintenance?",
    answer:
      "Software dependencies, browsers, provider APIs, security risks, content, and business requirements continue to change after launch. Maintenance helps teams evaluate those changes deliberately rather than waiting for accumulated drift to become a larger problem.",
  },
  {
    question: "Do you offer fixed response times?",
    answer:
      "Response expectations depend on an agreed support scope, operating hours, severity model, and current availability. We do not present a universal response-time guarantee. Any service-level commitments must be explicitly documented for the engagement.",
  },
  {
    question: "Can you maintain a website built by another developer?",
    answer:
      "Potentially. We first review the repository, deployment access, dependencies, documentation, hosting, data model, and known issues. The assessment identifies whether the system can be supported responsibly and what stabilization work may be needed.",
  },
  {
    question: "How do you handle security updates?",
    answer:
      "We review relevant advisories and release notes, assess applicability and compatibility, test the update according to risk, deploy through controlled environments, and verify production behavior. Applying every release immediately is not always the safest approach.",
  },
  {
    question: "Will maintenance prevent every outage or security issue?",
    answer:
      "No. Maintenance can reduce avoidable risk and improve awareness, but no responsible provider can guarantee uninterrupted availability or complete security. External platforms, infrastructure, unknown vulnerabilities, and operational events remain meaningful dependencies.",
  },
  {
    question: "Can you improve Core Web Vitals and performance?",
    answer:
      "We can investigate measured experience and runtime issues across rendering, JavaScript, media, queries, caching, hosting, and third-party tools. Results depend on content, devices, networks, infrastructure, and the changes the product can reasonably support.",
  },
  {
    question: "How are bugs prioritized?",
    answer:
      "Prioritization considers user impact, business impact, security, data integrity, reproducibility, affected scope, available workaround, and implementation risk. Criticality should be based on evidence and agreed definitions rather than whoever reports an issue first.",
  },
  {
    question: "Do you monitor website uptime?",
    answer:
      "Availability monitoring can be included using suitable external or platform signals. Monitoring creates awareness; it does not guarantee uptime or prove that every user journey is working. Critical workflows may need additional synthetic or application-level checks.",
  },
  {
    question: "What is included in database maintenance?",
    answer:
      "Depending on the system, work may cover query behavior, index review, data growth, migration planning, integrity concerns, connection usage, and backup or recovery context. Production changes require review and appropriate safeguards.",
  },
  {
    question: "How do backups fit into maintenance?",
    answer:
      "A backup strategy defines what is protected, how often, how long it is retained, who can access it, and how recovery is verified. Provider-reported backup success should not automatically be treated as proof that a useful restore is possible.",
  },
  {
    question: "Can maintenance include new features?",
    answer:
      "Yes, scoped enhancements can be planned alongside ongoing care. Larger features may require separate discovery, design, architecture, and delivery planning so routine maintenance remains predictable and important operational work is not displaced.",
  },
  {
    question: "How do you manage framework and dependency upgrades?",
    answer:
      "We review release notes, support status, known issues, migration requirements, compatibility, security relevance, and testing needs. Updates are grouped or staged according to risk rather than changed without context.",
  },
  {
    question: "Will we receive documentation about maintenance work?",
    answer:
      "The appropriate record can include change summaries, decisions, deployment context, known limitations, operating guidance, and follow-up recommendations. Documentation depth depends on the system and scope, but material changes should remain understandable.",
  },
  {
    question: "How do we start a maintenance engagement?",
    answer:
      "Begin with the repository, technology stack, hosting, access constraints, documentation, known issues, current providers, and business-critical workflows. An initial review can then identify supportability, immediate risks, and a sensible maintenance scope.",
  },
] as const;

function MonitoringVisual() {
  const bars = [34, 55, 42, 68, 52, 76, 63, 84] as const;
  return (
    <div
      className={cn("relative rounded-2xl border p-4 sm:p-6", styles.dashboard)}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
          operations / overview
        </span>
        <span className="flex items-center gap-2 text-[0.58rem] font-medium">
          <span
            className={cn("size-2 rounded-full bg-success", styles.statusPulse)}
          />
          Signal map
        </span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          ["Checks", "Mapped"],
          ["Review", "Planned"],
          ["Changes", "Logged"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border bg-background p-3">
            <span className="text-[0.52rem] text-muted-foreground">
              {label}
            </span>
            <strong className="mt-2 block text-xs font-semibold sm:text-sm">
              {value}
            </strong>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-xl border bg-background p-4">
          <div className="flex items-center justify-between">
            <span className="text-[0.6rem] font-semibold">
              Application signals
            </span>
            <Activity className="size-3 text-muted-foreground" />
          </div>
          <div className="mt-5 flex h-24 items-end gap-2">
            {bars.map((height, index) => (
              <span
                key={height}
                className={cn(
                  "flex-1 rounded-t bg-primary/15",
                  index === bars.length - 1 && styles.activeBar,
                )}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-background p-4">
          <span className="text-[0.6rem] font-semibold">Review queue</span>
          <div className="mt-4 space-y-3">
            {["Dependency", "Database", "Performance"].map((item, index) => (
              <div key={item} className="flex items-center gap-2">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    index === 0 ? "bg-warning" : "bg-foreground/20",
                  )}
                />
                <span className="text-[0.54rem]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3 text-[0.58rem]">
        <span>Last review recorded</span>
        <span className="font-mono text-muted-foreground">
          change / verified
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="maintenance-title"
      className={cn(
        "relative overflow-hidden border-b py-16 sm:py-20 lg:py-28",
        styles.hero,
      )}
    >
      <Container className="relative z-10 max-w-[100rem]">
        <SiteBreadcrumbs
          items={[
            { label: "Services", href: "/services" },
            {
              label: "Maintenance & Support",
              href: "/services/maintenance-support",
            },
          ]}
        />
        <div className="mt-12 grid min-w-0 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Fade className="min-w-0">
            <div>
              <Eyebrow className="mb-5 text-xs">Maintenance & Support</Eyebrow>
              <h1
                id="maintenance-title"
                className="text-balance text-display font-bold"
              >
                Keep your digital product healthy, current, and understood.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                We provide structured technical care for websites and
                applications through measured improvements, responsible updates,
                operational visibility, and clear documentation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="group h-12">
                  <Link href="/book-consultation">
                    Discuss Maintenance{" "}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12">
                  <Link href="#maintenance-services">Explore Coverage</Link>
                </Button>
              </div>
              <ul
                aria-label="Maintenance priorities"
                className="mt-10 grid gap-3 border-t pt-6 sm:grid-cols-3"
              >
                {[
                  "Measured changes",
                  "Visible operations",
                  "Documented context",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs font-medium"
                  >
                    <Check className="size-3.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
          <Fade className="min-w-0">
            <MonitoringVisual />
          </Fade>
        </div>
      </Container>
    </section>
  );
}

function WhyMaintenanceSection() {
  return (
    <section
      aria-labelledby="why-maintenance-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <ServiceSectionIntroduction
              eyebrow="Why ongoing maintenance"
              id="why-maintenance-heading"
              title="Launch is a transition—not the end of engineering."
              description="A production product continues to encounter new content, users, dependencies, provider changes, and operating conditions. Maintenance keeps those changes visible and deliberate."
            />
            <p className="mt-8 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
              Maintenance reduces avoidable uncertainty; it cannot eliminate
              outages, vulnerabilities, or third-party risk. Scope and response
              expectations are agreed for each engagement.
            </p>
          </div>
          <dl className="divide-y border-y">
            {maintenanceReasons.map(
              ({ title, description, icon: Icon }, index) => (
                <div
                  key={title}
                  className="group grid gap-4 py-5 sm:grid-cols-[3rem_12rem_1fr] sm:items-start"
                >
                  <span className="font-mono text-[0.62rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <dt className="flex items-center gap-3 font-semibold">
                    <Icon
                      className="size-4 transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />
                    {title}
                  </dt>
                  <dd className="text-sm leading-6 text-muted-foreground">
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

function ServicesSection() {
  return (
    <section
      id="maintenance-services"
      aria-labelledby="maintenance-services-heading"
      className="scroll-mt-28 border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Maintenance services"
          id="maintenance-services-heading"
          title="Technical care shaped around the product's actual risk."
          description="Coverage can combine routine reviews, responsive investigation, planned improvements, and operational safeguards without treating every system as if it has the same needs."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {maintenanceServices.map(
            ({ title, description, focus, icon: Icon }, index) => (
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
                    aria-label={`${title} focus areas`}
                  >
                    {focus.map((item) => (
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

function LifecycleSection() {
  return (
    <section
      aria-labelledby="lifecycle-heading"
      className={cn(
        "border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        styles.lifecycle,
      )}
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          className="[&_p]:!text-primary-foreground/65"
          eyebrow="Support lifecycle"
          id="lifecycle-heading"
          title="Turn operational signals into safer improvements."
          description="The lifecycle connects observation, diagnosis, controlled change, verification, and learning. Not every signal becomes a fix, and urgent changes still require appropriate validation."
        />
        <div className="relative mt-14">
          <span
            className={cn(
              "absolute left-[6.25%] right-[6.25%] top-6 hidden h-px xl:block",
              styles.lifecycleLine,
            )}
            aria-hidden="true"
          />
          <ol
            aria-label="Maintenance support lifecycle"
            className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8"
          >
            {lifecycle.map(({ title, description, icon: Icon }, index) => (
              <li
                key={title}
                className="relative rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.06] p-5"
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
                {index < lifecycle.length - 1 && (
                  <ArrowDown
                    className="mx-auto mt-4 size-3 text-primary-foreground/35 xl:hidden"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function CoverageSection() {
  return (
    <section
      aria-labelledby="coverage-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Maintenance coverage"
          id="coverage-heading"
          title="A practical operating layer around the product."
          description="Coverage is selected according to architecture, hosting, data, business criticality, and available access. The list below describes possible areas—not a universal package."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {coverage.map(({ title, description, icon: Icon }, index) => (
            <div key={title} className="group bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-lg bg-muted">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="font-mono text-[0.56rem] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-sm font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PracticesSection() {
  return (
    <section
      aria-labelledby="practices-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <ServiceSectionIntroduction
            eyebrow="Maintenance best practices"
            id="practices-heading"
            title="Change carefully, verify visibly, and preserve context."
            description="Our process emphasizes traceable changes, proportionate checks, recovery awareness, and documentation. Specific practices are adapted to the system and engagement scope."
          />
          <ul className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {practices.map(({ title, description, icon: Icon }, index) => (
              <li key={title} className="bg-background p-5">
                <div className="flex items-center justify-between">
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="font-mono text-[0.55rem] text-muted-foreground">
                    P{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section
      aria-labelledby="maintenance-workflow-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Maintenance workflow"
          id="maintenance-workflow-heading"
          title="Eight stages for accountable technical change."
          description="Work moves from current-state review through assessment, prioritized delivery, production observation, and continuous improvement. The cadence changes with scope and need."
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
            {workflow.map(({ title, description, icon: Icon }, index) => (
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

function ConceptVisual({ concept }: { readonly concept: SupportConcept }) {
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
          support.system
        </span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {concept.signals.map((signal, index) => (
          <div
            key={signal}
            className="rounded-lg border bg-card p-3 text-center"
          >
            <span
              className={cn(
                "mx-auto block h-1.5 rounded-full bg-primary/20",
                index === 0 ? "w-full" : index === 1 ? "w-3/4" : "w-1/2",
              )}
            />
            <p className="mt-3 text-[0.55rem] font-semibold">{signal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConceptsSection() {
  return (
    <section
      aria-labelledby="support-concepts-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Internal support concepts"
          id="support-concepts-heading"
          title="Original studies for operating and maintaining software."
          description="These concepts, prototypes, and demos explore support workflows and operational interfaces. They are not commissioned client work and do not demonstrate client outcomes."
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
      aria-labelledby="maintenance-faq-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <ServiceSectionIntroduction
          eyebrow="Maintenance FAQ"
          id="maintenance-faq-heading"
          title="Questions to resolve before ongoing support begins."
          description="Practical guidance about scope, inherited systems, security, availability, performance, databases, backups, upgrades, documentation, and engagement planning."
        />
        <Accordion
          type="single"
          collapsible
          defaultValue="maintenance-faq-1"
          className="mt-12 space-y-3"
        >
          {maintenanceFaqs.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`maintenance-faq-${index + 1}`}
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

function MaintenanceSupportPage() {
  const pageUrl = new URL(
    "/services/maintenance-support",
    company.url,
  ).toString();
  const provider = {
    "@type": "Organization",
    name: company.name,
    url: company.url,
  } as const;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Maintenance & Technical Support",
    serviceType: "Website and application maintenance and technical support",
    description:
      "Ongoing maintenance for websites and software products covering security updates, performance, monitoring, technical improvements, and operational support.",
    url: pageUrl,
    provider,
    areaServed: "Worldwide",
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Website Maintenance & Technical Support",
    description:
      "Maintenance and technical support services from Ayeb Solutions for websites, applications, databases, deployments, monitoring, and ongoing improvement.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    about: {
      "@type": "Service",
      name: "Maintenance & Technical Support",
      provider,
    },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: maintenanceFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
  return (
    <>
      <Hero />
      <WhyMaintenanceSection />
      <ServicesSection />
      <LifecycleSection />
      <CoverageSection />
      <PracticesSection />
      <WorkflowSection />
      <ConceptsSection />
      <FaqSection />
      <ServiceFinalCta
        id="maintenance-final-heading"
        eyebrow="Make maintenance part of the product strategy"
        title="Ready to give your digital product more structured technical care?"
        description="Bring the repository, hosting context, known concerns, providers, and critical workflows. We'll help assess supportability and define a maintenance scope around the system's actual needs."
        panelClassName={styles.finalPanel}
      />
      <StructuredData data={serviceSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export { MaintenanceSupportPage };
