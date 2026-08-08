import {
  Accessibility,
  ArrowRight,
  Blocks,
  Bot,
  Braces,
  ChevronDown,
  CircleGauge,
  Cloud,
  Code2,
  Component,
  Database,
  FileCheck2,
  GitBranch,
  Globe2,
  Handshake,
  HeartHandshake,
  Layers3,
  Lightbulb,
  LockKeyhole,
  MessageSquare,
  Network,
  Palette,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Target,
  TestTube2,
  Users,
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
import styles from "./about-page.module.css";

interface IconItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface DifferenceItem extends IconItem {
  readonly focus: string;
}

const values: readonly IconItem[] = [
  {
    title: "Transparency",
    description:
      "Communicate decisions, assumptions, constraints, progress, and uncertainty in understandable terms.",
    icon: MessageSquare,
  },
  {
    title: "Quality",
    description:
      "Treat maintainability, correctness, accessibility, and operational readiness as product concerns.",
    icon: Sparkles,
  },
  {
    title: "Accessibility",
    description:
      "Consider keyboard, semantics, contrast, motion, input methods, and assistive technologies throughout delivery.",
    icon: Accessibility,
  },
  {
    title: "Performance",
    description:
      "Use meaningful evidence to guide rendering, data, asset, and infrastructure decisions.",
    icon: CircleGauge,
  },
  {
    title: "Scalability",
    description:
      "Design for credible product needs without adding premature infrastructure or avoidable coupling.",
    icon: Blocks,
  },
  {
    title: "Collaboration",
    description:
      "Connect business context, user needs, design reasoning, and engineering constraints through shared decisions.",
    icon: Users,
  },
  {
    title: "Continuous Learning",
    description:
      "Review evidence, challenge assumptions, document lessons, and adapt when context changes.",
    icon: Lightbulb,
  },
  {
    title: "Long-Term Partnership",
    description:
      "Prefer understandable systems and responsible handoff over short-lived fixes and hidden dependency.",
    icon: HeartHandshake,
  },
] as const;

const differences: readonly DifferenceItem[] = [
  {
    title: "Custom development",
    focus: "Start with the workflow",
    description:
      "Custom software is considered when business needs justify ownership, tailored behavior, or integration—not as an automatic answer.",
    icon: Code2,
  },
  {
    title: "Strategic planning",
    focus: "Define the decision",
    description:
      "Discovery clarifies users, constraints, evidence, risk, and what a useful outcome must enable before implementation expands.",
    icon: Target,
  },
  {
    title: "AI-first thinking",
    focus: "Evaluate appropriate leverage",
    description:
      "We examine where AI or automation may help, while preserving validation, privacy, human oversight, and non-AI alternatives.",
    icon: Bot,
  },
  {
    title: "Modern architecture",
    focus: "Separate responsibilities",
    description:
      "Typed contracts, clear boundaries, and suitable rendering and data patterns support change without chasing novelty.",
    icon: Network,
  },
  {
    title: "Long-term maintainability",
    focus: "Preserve context",
    description:
      "Reusable components, documentation, tests, version control, and visible ownership reduce avoidable technical drift.",
    icon: Wrench,
  },
  {
    title: "User-centered design",
    focus: "Make the task understandable",
    description:
      "Interface decisions follow user goals, content, accessibility, feedback, and responsive conditions rather than decoration alone.",
    icon: Palette,
  },
] as const;

const process = [
  {
    title: "Discovery",
    description:
      "Understand the business problem, users, workflow, evidence, and constraints.",
    icon: Search,
  },
  {
    title: "Planning",
    description:
      "Define scope, priorities, architecture questions, risks, and decision ownership.",
    icon: GitBranch,
  },
  {
    title: "Research",
    description:
      "Gather appropriate user, product, technical, and operational context.",
    icon: Lightbulb,
  },
  {
    title: "Design",
    description:
      "Shape information, flows, states, responsive behavior, and visual systems.",
    icon: Palette,
  },
  {
    title: "Development",
    description:
      "Build typed interfaces, application logic, data, and approved integrations.",
    icon: Code2,
  },
  {
    title: "Testing",
    description:
      "Review behavior, accessibility, performance, security assumptions, and regressions.",
    icon: TestTube2,
  },
  {
    title: "Launch",
    description:
      "Deploy through controlled environments and verify production configuration and behavior.",
    icon: Cloud,
  },
  {
    title: "Continuous Improvement",
    description:
      "Use evidence, monitoring, support context, and new needs to guide responsible change.",
    icon: Sparkles,
  },
] as const;

const technologies = [
  ["Next.js", "Application routing and rendering", Globe2],
  ["React", "Composable interface systems", Component],
  ["TypeScript", "Typed application contracts", Braces],
  ["Node.js", "Server-side product logic", ServerCog],
  ["PostgreSQL", "Relational product data", Database],
  ["Supabase", "Managed platform capabilities", Database],
  ["Docker", "Consistent runtime packaging", Blocks],
  ["OpenAI", "Bounded AI-assisted workflows", Bot],
  ["Stripe", "Supported payment workflows", Handshake],
  ["Tailwind CSS", "Token-aligned responsive styling", Layers3],
  ["Cloudflare", "Selected network and delivery services", ShieldCheck],
  ["Vercel", "Selected application deployment", Cloud],
] as const satisfies readonly (readonly [string, string, LucideIcon])[];

const workingPrinciples: readonly IconItem[] = [
  {
    title: "Clean code",
    description:
      "Prefer focused responsibilities, strong types, useful naming, and composition over hidden complexity.",
    icon: Code2,
  },
  {
    title: "Performance",
    description:
      "Evaluate experience and runtime behavior using representative conditions and appropriate evidence.",
    icon: CircleGauge,
  },
  {
    title: "Security",
    description:
      "Treat validation, access, secrets, dependencies, and data exposure according to actual risk.",
    icon: LockKeyhole,
  },
  {
    title: "Accessibility",
    description:
      "Include semantic structure, keyboard operation, focus, contrast, labels, and motion preferences.",
    icon: Accessibility,
  },
  {
    title: "SEO",
    description:
      "Build semantic content, metadata, crawlability, structured data, and performance foundations into public pages.",
    icon: Globe2,
  },
  {
    title: "Scalability",
    description:
      "Support credible change through clear boundaries without assuming every product needs enterprise complexity.",
    icon: Blocks,
  },
  {
    title: "Documentation",
    description:
      "Preserve decisions, contracts, operating context, limitations, and future considerations.",
    icon: FileCheck2,
  },
  {
    title: "Maintainability",
    description:
      "Design systems and software so future contributors can understand and change them responsibly.",
    icon: Wrench,
  },
] as const;

const aboutFaqs = [
  {
    question: "What is Ayeb Solutions?",
    answer:
      "Ayeb Solutions is a web development, software, design, and AI automation agency focused on helping businesses understand and build appropriate digital solutions. We emphasize planning, maintainability, accessibility, and transparent technical decisions.",
  },
  {
    question: "What services does Ayeb Solutions provide?",
    answer:
      "Our capabilities include custom web development, AI automation, SaaS and internal software, UI/UX design, API integration, and ongoing maintenance. The appropriate service depends on the business problem and existing systems.",
  },
  {
    question: "Who does Ayeb Solutions work with?",
    answer:
      "We design solutions for businesses and product teams with a clear operational, customer, or software problem. Fit depends on goals, scope, access, constraints, and whether our capabilities match the work—not a fabricated client count or company-size threshold.",
  },
  {
    question: "Where is Ayeb Solutions located?",
    answer:
      "We do not present an office-location claim on this page. Project communication and delivery expectations should be discussed directly so working arrangements, availability, and relevant time-zone needs are clear.",
  },
  {
    question: "How long has Ayeb Solutions been operating?",
    answer:
      "This page intentionally does not publish a founding date or years-in-business claim. Trust should be built through transparent scope, visible work, clear process, technical reasoning, and responsible communication.",
  },
  {
    question: "How large is the Ayeb Solutions team?",
    answer:
      "We do not publish an employee count here. The people, roles, responsibilities, and capacity relevant to a proposed engagement should be made explicit during planning rather than inferred from marketing language.",
  },
  {
    question: "How does a project begin?",
    answer:
      "Projects begin by clarifying the business problem, affected users, current workflow, evidence, constraints, dependencies, and what a useful change should enable. This discovery informs scope and technical direction.",
  },
  {
    question: "Does Ayeb Solutions always recommend custom software?",
    answer:
      "No. Existing products, process changes, configuration, or simpler integrations may be more appropriate. Custom development should be justified by differentiated workflow, ownership, integration, or product requirements.",
  },
  {
    question: "What does AI-first thinking mean at Ayeb Solutions?",
    answer:
      "It means actively evaluating whether AI or automation can support a workflow—not forcing AI into every product. Suitability depends on data, reliability, privacy, cost, validation, human oversight, and available non-AI alternatives.",
  },
  {
    question: "How do you approach accessibility?",
    answer:
      "We consider semantic structure, keyboard operation, focus, contrast, motion, labels, touch targets, error communication, and responsive content. Production accessibility requires implementation review and appropriate assistive-technology testing.",
  },
  {
    question: "How do you choose technologies?",
    answer:
      "Technology follows product requirements, team context, data, integrations, security needs, hosting constraints, and long-term ownership. Tools shown on this page represent capabilities, not partnerships, certifications, or universal recommendations.",
  },
  {
    question:
      "Do you provide guarantees about performance or business results?",
    answer:
      "No responsible software provider can guarantee a universal performance score, ranking, revenue result, uptime level, or business outcome. We can define practices, acceptance criteria, verification, and evidence appropriate to the project.",
  },
  {
    question: "Can Ayeb Solutions improve an existing product?",
    answer:
      "Potentially. We can assess an existing website, application, workflow, interface, or integration before recommending focused improvements, modernization, redesign, stabilization, or replacement.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Post-launch work can include production verification, monitoring, documentation, maintenance, support, optimization, and planned improvements. The actual coverage and response expectations are defined for each engagement.",
  },
  {
    question: "How can I evaluate whether Ayeb Solutions is a good fit?",
    answer:
      "Review our disclosed internal work, services, process, values, technical approach, and limitations. Then share the real problem and constraints in a consultation so both sides can evaluate scope, expectations, and fit without relying on unsupported claims.",
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

function PurposeVisual() {
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-4 sm:p-6",
        styles.purposeVisual,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
          purpose / system
        </span>
        <Badge variant="outline">Context first</Badge>
      </div>
      <div className="mt-6 space-y-3">
        {[
          ["01", "Understand", "Business problem"],
          ["02", "Design", "Useful system"],
          ["03", "Build", "Maintainable product"],
        ].map(([number, action, result], index) => (
          <div
            key={action}
            className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-xl border bg-background p-4"
          >
            <span className="font-mono text-[0.58rem] text-muted-foreground">
              {number}
            </span>
            <div>
              <strong className="text-sm">{action}</strong>
              <span className="mt-1 block text-[0.58rem] text-muted-foreground">
                {result}
              </span>
            </div>
            <span
              className={cn(
                "grid size-8 place-items-center rounded-lg",
                index === 1 ? "bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              <ArrowRight className="size-3" />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["People", "Technology", "Operations"].map((label) => (
          <span
            key={label}
            className="rounded-lg border bg-muted/30 px-2 py-3 text-center text-[0.54rem] font-semibold"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="about-title"
      className={cn(
        "relative overflow-hidden border-b py-16 sm:py-20 lg:py-28",
        styles.hero,
      )}
    >
      <Container className="relative z-10 max-w-[100rem]">
        <SiteBreadcrumbs items={[{ label: "About", href: "/about" }]} />
        <div className="mt-12 grid min-w-0 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow className="mb-5 text-xs">About Ayeb Solutions</Eyebrow>
            <h1
              id="about-title"
              className="text-balance text-display font-bold"
            >
              Building Modern Digital Products With Purpose
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Ayeb Solutions approaches business problems through modern
              software, thoughtful design, and appropriate AI-powered
              automation—connecting technical decisions to the people and
              operations they support.
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
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
            </div>
            <p className="mt-9 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
              This page does not claim a founding date, team size, client count,
              revenue, award, certification, partnership, or office location.
            </p>
          </div>
          <div className="min-w-0">
            <PurposeVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}

function StorySection() {
  return (
    <section
      aria-labelledby="story-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <SectionIntroduction
            eyebrow="Our story"
            id="story-heading"
            title="Built around the belief that software should clarify work—not complicate it."
            description="Ayeb Solutions exists to help turn business problems into understandable digital products, workflows, and technical decisions."
          />
          <div className="space-y-8 text-lg leading-8 text-muted-foreground">
            <p>
              Custom software can create value when it reflects real users,
              operating constraints, data ownership, and the work a business
              needs to perform. It can also create unnecessary cost when it
              begins with technology instead of a justified problem.
            </p>
            <p>
              Our philosophy is to understand the context first, evaluate
              simpler options honestly, and build only the level of system the
              problem requires. Design, architecture, accessibility, security,
              and maintenance are treated as connected parts of that decision.
            </p>
            <p>
              Long-term value comes from software people can understand, use,
              operate, and improve. That means preferring explicit boundaries,
              useful documentation, thoughtful interaction, and responsible
              handoff over quick fixes that hide future cost.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DirectionSection() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className={cn("p-7 sm:p-9", styles.editorialCard)}>
            <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Target className="size-5" aria-hidden="true" />
            </span>
            <Eyebrow className="mb-4 mt-9 text-xs">Mission</Eyebrow>
            <h2
              id="mission-heading"
              className="text-balance text-3xl font-bold tracking-tight"
            >
              Help businesses make better digital product decisions.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Our mission is to plan, design, and build appropriate software and
              automation that improves clarity, connects useful workflows, and
              remains understandable to the people responsible for it.
            </p>
          </Card>
          <Card className={cn("p-7 sm:p-9", styles.editorialCard)}>
            <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <Eyebrow className="mb-4 mt-9 text-xs">Vision</Eyebrow>
            <h2 className="text-balance text-3xl font-bold tracking-tight">
              Digital systems that support sustainable, responsible progress.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Our vision is for modern technology to make businesses more
              capable without obscuring ownership, excluding users, or creating
              complexity that future teams cannot reasonably maintain.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function ValuesSection() {
  return (
    <section
      aria-labelledby="values-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Core values"
          id="values-heading"
          title="Principles that shape how decisions are made."
          description="These values describe our intended working approach. They are not certifications, guarantees, or a substitute for project-specific expectations."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ title, description, icon: Icon }, index) => (
            <li key={title} className="group bg-background p-6">
              <div className="flex items-center justify-between">
                <Icon className="size-5" aria-hidden="true" />
                <span className="font-mono text-[0.58rem] text-muted-foreground">
                  V{String(index + 1).padStart(2, "0")}
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

function DifferencesSection() {
  return (
    <section
      aria-labelledby="differences-heading"
      className={cn(
        "border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        styles.differences,
      )}
    >
      <Container className="max-w-[100rem]">
        <div className="max-w-3xl">
          <Eyebrow className="mb-4 text-xs text-primary-foreground/55">
            What makes us different
          </Eyebrow>
          <h2
            id="differences-heading"
            className="text-balance text-headline font-bold"
          >
            A connected approach from business context to maintainable software.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-primary-foreground/65">
            These differences explain our focus without claiming that every
            alternative provider works the same way or that one approach fits
            every project.
          </p>
        </div>
        <dl className="divide-primary-foreground/12 border-primary-foreground/12 mt-12 divide-y border-y">
          {differences.map(
            ({ title, focus, description, icon: Icon }, index) => (
              <div
                key={title}
                className="grid gap-4 py-6 sm:grid-cols-[3rem_12rem_12rem_1fr] sm:items-start"
              >
                <span className="font-mono text-[0.58rem] text-primary-foreground/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <dt className="flex items-center gap-3 font-semibold">
                  <Icon className="size-4" aria-hidden="true" />
                  {title}
                </dt>
                <dd className="text-sm font-medium text-primary-foreground/80">
                  {focus}
                </dd>
                <dd className="text-primary-foreground/58 text-sm leading-6">
                  {description}
                </dd>
              </div>
            ),
          )}
        </dl>
      </Container>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      aria-labelledby="about-process-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Our process"
          id="about-process-heading"
          title="Eight stages for deliberate product delivery."
          description="The process connects business context, research, design, engineering, verification, and improvement. It describes disciplines—not a fixed schedule or guaranteed outcome."
        />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map(({ title, description, icon: Icon }, index) => (
            <li key={title} className="rounded-xl border bg-card p-5">
              <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="mt-6 block font-mono text-[0.58rem] text-muted-foreground">
                STAGE {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function TechnologiesSection() {
  return (
    <section
      aria-labelledby="technologies-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Technologies"
          id="technologies-heading"
          title="Tools selected around product requirements."
          description="Our capabilities span interface, application, data, automation, payments, delivery, and infrastructure. Final selection follows project context rather than a fixed stack."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map(([name, role, Icon], index) => (
            <div key={name} className="bg-card p-5">
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
          Technology references do not imply partnerships, certifications,
          endorsements, or guaranteed suitability. Provider access and terms may
          affect implementation.
        </p>
      </Container>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section
      aria-labelledby="working-principles-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <SectionIntroduction
            eyebrow="Working principles"
            id="working-principles-heading"
            title="Engineering quality made visible in the process."
            description="These practices guide implementation and review. Their depth and verification method should match the product's risk and scope."
          />
          <ol className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {workingPrinciples.map(
              ({ title, description, icon: Icon }, index) => (
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
              ),
            )}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      aria-labelledby="about-faq-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <SectionIntroduction
          eyebrow="About FAQ"
          id="about-faq-heading"
          title="Transparent answers about Ayeb Solutions."
          description="These answers explain capabilities, fit, process, technology, accessibility, limitations, and what this page intentionally does not claim."
        />
        <div className="mt-12 space-y-3">
          {aboutFaqs.map(({ question, answer }, index) => (
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

function AboutPage() {
  const pageUrl = new URL("/about", company.url).toString();
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Ayeb Solutions",
    description:
      "Ayeb Solutions' approach to modern software, thoughtful design, AI automation, accessibility, and maintainable digital products.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    about: { "@type": "Organization", name: company.name, url: company.url },
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About Ayeb Solutions",
    description:
      "Learn how Ayeb Solutions approaches business problems through software, design, and responsible automation.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aboutFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
  return (
    <>
      <Hero />
      <StorySection />
      <DirectionSection />
      <ValuesSection />
      <DifferencesSection />
      <ProcessSection />
      <TechnologiesSection />
      <PrinciplesSection />
      <FaqSection />
      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Build with context
          </Eyebrow>
        }
        title="Ready to discuss the problem behind your next digital product?"
        description={
          <p className="max-w-2xl leading-relaxed text-primary-foreground/70">
            Share the users, workflow, constraints, and decision you need to
            make. We’ll help identify a responsible discovery path before
            recommending technology.
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
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        }
        className={styles.finalCta}
      />
      <StructuredData data={aboutSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export { AboutPage };
