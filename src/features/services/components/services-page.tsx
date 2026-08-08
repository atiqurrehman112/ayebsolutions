import {
  ArrowRight,
  Blocks,
  Bot,
  Check,
  CircleCheck,
  Cloud,
  Code2,
  ContainerIcon,
  Database,
  Figma,
  Gauge,
  Github,
  Globe2,
  Handshake,
  Layers3,
  LifeBuoy,
  Link2,
  LockKeyhole,
  MessageSquareText,
  Palette,
  PanelsTopLeft,
  Rocket,
  SearchCheck,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Badge } from "@/components/ui/status";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/disclosure";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";
import styles from "./services-page.module.css";

interface ServiceOffering {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly technologies: readonly string[];
  readonly icon: LucideIcon;
}

const serviceOfferings: readonly ServiceOffering[] = [
  {
    slug: "custom-web-development",
    title: "Custom Web Development",
    description:
      "Editorial websites and web applications engineered around your audience, content, and business operations.",
    features: [
      "Business and corporate websites",
      "Conversion-focused landing pages",
      "Customer and internal portals",
      "Performance and accessibility reviews",
    ],
    technologies: ["Next.js", "React", "TypeScript"],
    icon: Code2,
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    description:
      "Reviewable automation systems that connect repetitive work, business data, and appropriate AI assistance.",
    features: [
      "Workflow and approval design",
      "AI agents for bounded tasks",
      "CRM and email automation",
      "Operational controls and monitoring",
    ],
    technologies: ["OpenAI", "Node.js", "PostgreSQL"],
    icon: Bot,
  },
  {
    slug: "custom-saas",
    title: "Custom SaaS",
    description:
      "Purpose-built software products with clear user journeys, maintainable architecture, and room to evolve.",
    features: [
      "Multi-tenant product foundations",
      "Dashboards and permissions",
      "Subscriptions and account flows",
      "Internal business platforms",
    ],
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    icon: PanelsTopLeft,
  },
  {
    slug: "ui-ux-design",
    title: "UI / UX Design",
    description:
      "Product experiences that turn complex requirements into understandable, accessible interfaces.",
    features: [
      "User and workflow research",
      "Information architecture",
      "Wireframes and prototypes",
      "Reusable design systems",
    ],
    technologies: ["Figma", "React", "Tailwind CSS"],
    icon: Palette,
  },
  {
    slug: "api-integration",
    title: "API Integration",
    description:
      "Dependable connections between applications, payments, customer systems, and operational data.",
    features: [
      "Third-party API integration",
      "Payment and identity flows",
      "CRM and ERP connections",
      "Data validation and synchronization",
    ],
    technologies: ["Node.js", "REST", "Docker"],
    icon: Link2,
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    description:
      "Structured technical care for systems that need ongoing reliability, security, and improvement.",
    features: [
      "Dependency and security updates",
      "Performance optimization",
      "Monitoring and issue response",
      "Planned feature development",
    ],
    technologies: ["Vercel", "GitHub", "Cloudinary"],
    icon: LifeBuoy,
  },
] as const;

const comparisonItems = [
  {
    title: "Quality",
    description:
      "Reviews are built into design, implementation, testing, and release—not treated as a final pass.",
    icon: CircleCheck,
  },
  {
    title: "Communication",
    description:
      "Progress, decisions, dependencies, and open questions remain visible throughout delivery.",
    icon: MessageSquareText,
  },
  {
    title: "Performance",
    description:
      "Loading, rendering, assets, and runtime behavior are considered part of the product experience.",
    icon: Gauge,
  },
  {
    title: "Scalability",
    description:
      "Architecture reflects present requirements and credible future change without premature complexity.",
    icon: Blocks,
  },
  {
    title: "Security",
    description:
      "Validation, permissions, safe configuration, and integration boundaries follow the system's risk.",
    icon: LockKeyhole,
  },
  {
    title: "Maintainability",
    description:
      "Strong types, clear responsibilities, documentation, and reviewable changes support future work.",
    icon: Layers3,
  },
] as const;

const processSteps = [
  {
    title: "Discovery",
    description:
      "Clarify the business goal, users, constraints, and existing systems.",
    icon: SearchCheck,
  },
  {
    title: "Planning",
    description:
      "Define scope, architecture, dependencies, milestones, and decision points.",
    icon: Workflow,
  },
  {
    title: "Design",
    description:
      "Resolve flows, information structure, responsive behavior, and interface language.",
    icon: Figma,
  },
  {
    title: "Development",
    description:
      "Build in typed, reviewable increments across frontend, backend, data, and integrations.",
    icon: Code2,
  },
  {
    title: "Testing",
    description:
      "Review important scenarios, accessibility, responsiveness, performance, and reliability.",
    icon: TestTube2,
  },
  {
    title: "Launch",
    description:
      "Prepare deployment, verify production behavior, and document operational decisions.",
    icon: Rocket,
  },
  {
    title: "Support",
    description:
      "Maintain the system and prioritize improvements using agreed needs and feedback.",
    icon: Handshake,
  },
] as const;

const technologies = [
  { name: "Next.js", role: "Web platform", icon: Globe2 },
  { name: "React", role: "Interface system", icon: Layers3 },
  { name: "Node.js", role: "Application services", icon: ServerCog },
  { name: "Postgres", role: "Relational data", icon: Database },
  { name: "Prisma", role: "Typed data access", icon: ContainerIcon },
  { name: "Docker", role: "Portable runtime", icon: Blocks },
  { name: "OpenAI", role: "Bounded AI assistance", icon: Sparkles },
  { name: "Cloudinary", role: "Media workflows", icon: Cloud },
  { name: "Vercel", role: "Web deployment", icon: Rocket },
  { name: "GitHub", role: "Version control", icon: Github },
] as const;

const serviceFaqs = [
  {
    question: "Which service is the right starting point for my project?",
    answer:
      "The right starting point depends on the business problem, users, existing systems, and desired outcome. Discovery helps determine whether the need is primarily a website, product, automation, integration, design engagement, or a combination.",
  },
  {
    question: "Can services be combined into one engagement?",
    answer:
      "Yes. Many useful projects combine strategy, UI/UX, development, integrations, automation, and ongoing support. We organize those disciplines around one coherent delivery plan rather than treating them as disconnected add-ons.",
  },
  {
    question: "How is project scope defined?",
    answer:
      "Scope is shaped through discovery, requirements, user flows, technical constraints, dependencies, and agreed priorities. We document boundaries and decision points before implementation so assumptions are visible.",
  },
  {
    question: "How long will a services project take?",
    answer:
      "Duration varies with scope, complexity, integrations, content readiness, review cycles, and stakeholder availability. A realistic delivery plan is created after discovery instead of promising a timeline before the work is understood.",
  },
  {
    question: "Can you work with an existing website or application?",
    answer:
      "Yes. We can review an existing codebase, interface, infrastructure, content, and operating constraints before recommending focused improvements, staged modernization, or replacement where justified.",
  },
  {
    question: "Do you support early-stage product ideas?",
    answer:
      "Yes. For early-stage products, we can help clarify the core user problem, reduce unnecessary scope, prototype important flows, and build a maintainable first release designed to support learning.",
  },
  {
    question: "How do you approach AI automation safely?",
    answer:
      "We define suitable tasks, source data, permissions, confidence thresholds, human review, error handling, and audit needs according to the workflow. Consequential decisions should not be hidden behind an unreviewable AI step.",
  },
  {
    question: "Can you integrate our current business tools?",
    answer:
      "Often, yes. Feasibility depends on available APIs, authentication, permissions, usage limits, data quality, and provider restrictions. Those constraints are assessed before an integration is committed.",
  },
  {
    question: "Are accessibility and responsive design included?",
    answer:
      "They are part of our normal design and engineering review. We consider semantic structure, keyboard operation, focus, contrast, motion preferences, touch targets, and layout behavior across agreed viewport and browser ranges.",
  },
  {
    question: "Do you guarantee SEO rankings or performance scores?",
    answer:
      "No. We can improve technical foundations, content structure, metadata, rendering, and asset delivery, but rankings and measured scores depend on content, competition, third parties, infrastructure, and the tested environment.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Post-launch work can include monitoring, updates, issue resolution, performance reviews, documentation, and planned improvements. The appropriate support model depends on the system and operating needs.",
  },
  {
    question: "How do we begin?",
    answer:
      "Share the goal, current challenge, intended users, existing tools, and any known constraints. An initial consultation helps identify the most useful discovery step and whether Ayeb Solutions is a suitable fit.",
  },
] as const;

function ServicesHero() {
  return (
    <section
      aria-labelledby="services-hero-heading"
      className={cn(
        "relative overflow-hidden border-b pb-24 pt-10 sm:pb-30 lg:pb-36 lg:pt-14",
        styles.heroBackground,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
      <Container className="relative max-w-[100rem]">
        <SiteBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
          ]}
        />
        <div className="mt-16 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:gap-20">
          <Fade>
            <Eyebrow className="mb-5 text-xs">
              Digital product engineering
            </Eyebrow>
            <h1
              id="services-hero-heading"
              className="text-balance text-display font-bold"
            >
              Services designed around the work your business needs to do.
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              From premium web experiences to AI-enabled operations, we plan and
              build systems that connect customer needs, business goals, and
              maintainable engineering.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group h-12 rounded-lg px-6">
                <Link href="/book-consultation">
                  Book Free Consultation
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
                <Link href="#services-grid">Explore Services</Link>
              </Button>
            </div>
          </Fade>
          <Fade>
            <div
              aria-hidden="true"
              className={cn(
                "relative overflow-hidden rounded-2xl border p-4 sm:p-6",
                styles.blueprint,
              )}
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-foreground/20" />
                  <span className="size-2 rounded-full bg-foreground/20" />
                  <span className="size-2 rounded-full bg-foreground/20" />
                </div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Solution blueprint
                </span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-[0.7fr_1.3fr]">
                <div className="space-y-3">
                  {["Discover", "Design", "Build", "Evolve"].map(
                    (label, index) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 rounded-xl border bg-background/75 p-3"
                      >
                        <span
                          className={cn(
                            "grid size-7 place-items-center rounded-lg bg-primary font-mono text-[0.6rem] text-primary-foreground",
                            index === 1 && styles.blueprintPulse,
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-medium">{label}</span>
                      </div>
                    ),
                  )}
                </div>
                <div className="rounded-xl border bg-background/75 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <ShieldCheck className="size-4" />
                    Delivery system
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      { icon: Globe2, label: "Experience" },
                      { icon: Workflow, label: "Workflow" },
                      { icon: Database, label: "Data" },
                      { icon: Gauge, label: "Quality" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="rounded-lg border bg-card p-3"
                      >
                        <Icon className="size-4" />
                        <p className="mt-3 text-[0.68rem] font-medium">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-3/4 rounded-full bg-primary" />
                  </div>
                  <p className="mt-2 text-[0.62rem] text-muted-foreground">
                    Scope becomes clearer through discovery.
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </Container>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section
      id="services-grid"
      aria-labelledby="services-grid-heading"
      className="relative border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <Fade>
          <div className="max-w-3xl">
            <Eyebrow className="mb-4 text-xs">What we build</Eyebrow>
            <h2
              id="services-grid-heading"
              className="text-balance text-headline font-bold"
            >
              Six capabilities. One connected delivery approach.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Each service can stand alone or combine into a focused engagement
              shaped around the problem—not a preset package.
            </p>
          </div>
        </Fade>
        <Stagger className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 xl:grid-cols-6">
          {serviceOfferings.map((service, index) => {
            const Icon = service.icon;
            return (
              <StaggerItem
                key={service.slug}
                className={cn(
                  "h-full xl:col-span-2",
                  index < 2 && "xl:col-span-3",
                )}
              >
                <Card
                  id={service.slug}
                  className={cn(
                    "group flex h-full scroll-mt-28 flex-col bg-card/80 p-6 sm:p-7",
                    styles.serviceCard,
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-xl border bg-background shadow-xs group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.62rem] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <ul
                    aria-label={`${service.title} features`}
                    className="mt-6 space-y-2.5 border-t pt-5"
                  >
                    {service.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-sm">
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <ul
                    aria-label={`${service.title} technology stack`}
                    className="mt-5 flex flex-wrap gap-2"
                  >
                    {service.technologies.map((technology) => (
                      <li key={technology}>
                        <Badge
                          variant="outline"
                          className="font-mono text-[0.64rem]"
                        >
                          {technology}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button
                      asChild
                      variant="ghost"
                      className="group/link -ml-4"
                    >
                      <Link
                        href="#services-consultation"
                        aria-label={`Learn more about ${service.title} in a consultation`}
                      >
                        Learn More
                        <ArrowRight
                          className="size-4 transition-transform group-hover/link:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

function WhyChoose() {
  return (
    <section
      aria-labelledby="services-quality-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
          <Fade>
            <div className="lg:sticky lg:top-32">
              <Eyebrow className="mb-4 text-xs">Why choose Ayeb</Eyebrow>
              <h2
                id="services-quality-heading"
                className="text-balance text-headline font-bold"
              >
                The quality of the process shapes the quality of the product.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Our approach connects engineering decisions to usability,
                operations, risk, and the people who maintain the system after
                launch.
              </p>
            </div>
          </Fade>
          <dl className="overflow-hidden rounded-2xl border bg-card/75">
            {comparisonItems.map(
              ({ title, description, icon: Icon }, index) => (
                <div
                  key={title}
                  className="grid gap-4 border-b p-5 last:border-b-0 sm:grid-cols-[3rem_0.55fr_1.45fr] sm:items-start sm:p-6"
                >
                  <span className="grid size-10 place-items-center rounded-xl border bg-background shadow-xs">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <dt className="font-semibold tracking-tight sm:pt-2">
                    {title}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground sm:pt-2">
                    {description}
                  </dd>
                  <span className="sr-only">Item {index + 1}</span>
                </div>
              ),
            )}
          </dl>
        </div>
      </Container>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      aria-labelledby="services-process-heading"
      className="relative border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <Fade>
          <div className="max-w-3xl">
            <Eyebrow className="mb-4 text-xs">Development process</Eyebrow>
            <h2
              id="services-process-heading"
              className="text-balance text-headline font-bold"
            >
              A visible path from business question to production system.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              The stages adapt to scope, but the reasoning, review, and release
              responsibilities stay explicit.
            </p>
          </div>
        </Fade>
        <div className="relative mt-12">
          <span
            aria-hidden="true"
            className={cn(
              "absolute bottom-auto left-8 right-8 top-6 hidden h-px w-auto xl:block",
              styles.processLine,
            )}
          />
          <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
            {processSteps.map(({ title, description, icon: Icon }, index) => (
              <li
                key={title}
                className="relative z-10 rounded-xl border bg-background p-5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[0.62rem] text-muted-foreground">
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

function TechnologySection() {
  return (
    <section
      aria-labelledby="services-tech-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16">
          <Fade>
            <div>
              <Eyebrow className="mb-4 text-xs">Technology stack</Eyebrow>
              <h2
                id="services-tech-heading"
                className="text-balance text-headline font-bold"
              >
                Tools selected for a clear technical role.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                The final stack depends on product needs, existing systems,
                security, team capability, and deployment constraints.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Technology references do not indicate official partnerships,
                certifications, or endorsements.
              </p>
            </div>
          </Fade>
          <Stagger className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {technologies.map(({ name, role, icon: Icon }, index) => (
              <StaggerItem key={name} className="bg-background">
                <div className="flex items-center gap-4 p-5 sm:p-6">
                  <span className="grid size-10 place-items-center rounded-xl border bg-card shadow-xs">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold tracking-tight">{name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{role}</p>
                  </div>
                  <span className="ml-auto font-mono text-[0.6rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function ServicesFaq() {
  return (
    <section
      aria-labelledby="services-faq-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <Fade>
          <div className="max-w-3xl">
            <Eyebrow className="mb-4 text-xs">Services FAQ</Eyebrow>
            <h2
              id="services-faq-heading"
              className="text-balance text-headline font-bold"
            >
              Useful answers before we define the work.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Clear expectations make discovery more productive and help both
              teams decide on the right next step.
            </p>
          </div>
        </Fade>
        <Accordion
          type="single"
          collapsible
          defaultValue="services-faq-1"
          className="mt-12 space-y-3"
        >
          {serviceFaqs.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`services-faq-${index + 1}`}
              className="overflow-hidden rounded-xl border bg-card/75 px-5 sm:px-6"
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

function ServicesFinalCta() {
  return (
    <section
      id="services-consultation"
      aria-labelledby="services-final-heading"
      className="scroll-mt-28 py-20 sm:py-24 lg:py-30"
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
                  Build with clarity
                </Eyebrow>
                <h2
                  id="services-final-heading"
                  className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Let&apos;s define the right solution before writing the first
                  line of code.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/70 sm:text-lg">
                  Tell us what needs to change. We&apos;ll use the first
                  conversation to understand the goal, constraints, and most
                  useful next step.
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

function ServicesPage() {
  const pageUrl = new URL("/services", company.url).toString();
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Digital Services",
    description:
      "Web development, AI automation, SaaS, UI/UX, API integration, and maintenance services from Ayeb Solutions.",
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: serviceOfferings.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@type": "Organization",
            name: company.name,
            url: company.url,
          },
          url: `${pageUrl}#${service.slug}`,
        },
      })),
    },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <WhyChoose />
      <ProcessSection />
      <TechnologySection />
      <ServicesFaq />
      <ServicesFinalCta />
      <StructuredData data={pageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export { ServicesPage };
