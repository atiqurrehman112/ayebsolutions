import {
  ArrowRight,
  BarChart3,
  Bot,
  CircleDot,
  Columns3,
  Database,
  Gavel,
  GraduationCap,
  MessageSquareText,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { cn } from "@/lib/utils";
import styles from "./portfolio-preview.module.css";

type ProjectStatus = "Live" | "Internal" | "Demo" | "Concept";
type ProjectVisualKind =
  "lead" | "school" | "auction" | "support" | "analytics" | "crm";

interface Project {
  readonly title: string;
  readonly category: string;
  readonly summary: string;
  readonly technologies: readonly string[];
  readonly status: ProjectStatus;
  readonly href: string;
  readonly icon: LucideIcon;
  readonly visual: ProjectVisualKind;
  readonly disclosure: string;
}

const projects: readonly Project[] = [
  {
    title: "AI Lead Qualification Workflow",
    category: "AI Automation",
    summary:
      "An internal workflow demonstration for capturing, evaluating, and routing inbound enquiries with human oversight.",
    technologies: ["Next.js", "TypeScript", "Node.js", "OpenAI", "PostgreSQL"],
    status: "Demo",
    href: "/portfolio/ai-lead-qualification-workflow",
    icon: Workflow,
    visual: "lead",
    disclosure: "Internal technology demonstration",
  },
  {
    title: "Custom School Management Portal",
    category: "Web Application",
    summary:
      "An internal product prototype that organizes student records, attendance, schedules, and staff workflows.",
    technologies: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL"],
    status: "Internal",
    href: "/portfolio/school-management-portal",
    icon: GraduationCap,
    visual: "school",
    disclosure: "Internal product prototype",
  },
  {
    title: "Car Auction Platform",
    category: "Marketplace Demo",
    summary:
      "A real-time auction interface demonstration focused on inventory discovery, bid visibility, and clear event states.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    status: "Demo",
    href: "/portfolio/car-auction-platform",
    icon: Gavel,
    visual: "auction",
    disclosure: "Independent interface demonstration",
  },
  {
    title: "AI Customer Support Agent",
    category: "AI Experience",
    summary:
      "A controlled support-agent demonstration for knowledge retrieval, response drafting, and escalation paths.",
    technologies: ["Next.js", "OpenAI", "Node.js", "TypeScript"],
    status: "Demo",
    href: "/portfolio/ai-customer-support-agent",
    icon: Bot,
    visual: "support",
    disclosure: "Internal technology demonstration",
  },
  {
    title: "Business Analytics Dashboard",
    category: "Data Product",
    summary:
      "An internal dashboard system exploring clear operational views, filters, trends, and decision-ready reporting.",
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL"],
    status: "Internal",
    href: "/portfolio/business-analytics-dashboard",
    icon: BarChart3,
    visual: "analytics",
    disclosure: "Internal design and engineering study",
  },
  {
    title: "SaaS CRM Platform",
    category: "Product Concept",
    summary:
      "A modular CRM concept for pipeline management, contact context, team activity, and repeatable sales operations.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
    status: "Concept",
    href: "/portfolio/saas-crm-platform",
    icon: Columns3,
    visual: "crm",
    disclosure: "Original product concept",
  },
] as const;

function requireFirstProject(items: readonly Project[]): Project {
  const project = items[0];
  if (!project) {
    throw new Error("A featured portfolio project is required.");
  }
  return project;
}

const featuredProject = requireFirstProject(projects);

const statusVariants = {
  Live: "success",
  Internal: "secondary",
  Demo: "outline",
  Concept: "warning",
} as const satisfies Record<
  ProjectStatus,
  "success" | "secondary" | "outline" | "warning"
>;

function StatusBadge({
  status,
  inverse = false,
}: {
  readonly status: ProjectStatus;
  readonly inverse?: boolean;
}) {
  return (
    <Badge
      variant={statusVariants[status]}
      className={cn(
        inverse &&
          "border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground",
      )}
    >
      {status}
    </Badge>
  );
}

function TechnologyBadges({
  technologies,
  inverse = false,
}: {
  readonly technologies: readonly string[];
  readonly inverse?: boolean;
}) {
  return (
    <ul aria-label="Technology stack" className="flex flex-wrap gap-2">
      {technologies.map((technology) => (
        <li
          key={technology}
          className={cn(
            "rounded-md border px-2.5 py-1 font-mono text-[0.65rem] font-medium",
            inverse
              ? "border-primary-foreground/14 text-primary-foreground/72 bg-primary-foreground/[0.06]"
              : "bg-background/75 text-muted-foreground",
          )}
        >
          {technology}
        </li>
      ))}
    </ul>
  );
}

function ProductFrame({
  title,
  icon: Icon,
  children,
  featured = false,
}: {
  readonly title: string;
  readonly icon: LucideIcon;
  readonly children: React.ReactNode;
  readonly featured?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-full min-h-52 overflow-hidden border bg-background/90 shadow-soft",
        featured ? "rounded-2xl" : "rounded-t-xl border-x-0 border-t-0",
        styles.visualNoise,
      )}
    >
      <div className="flex h-10 items-center justify-between border-b bg-background/80 px-3 backdrop-blur-surface">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-destructive/65" />
          <span className="size-2 rounded-full bg-warning/70" />
          <span className="size-2 rounded-full bg-success/65" />
        </div>
        <span className="flex items-center gap-1.5 text-[0.6rem] font-medium text-muted-foreground">
          <Icon className="size-3" /> {title}
        </span>
        <span className="size-8" />
      </div>
      {children}
    </div>
  );
}

function ProjectVisual({
  project,
  featured = false,
}: {
  readonly project: Project;
  readonly featured?: boolean;
}) {
  const content = {
    lead: (
      <div className="grid h-full place-items-center p-5">
        <div className="flex w-full max-w-lg items-center justify-center gap-2 sm:gap-3">
          {[MessageSquareText, Bot, Database].map((Icon, index) => (
            <div key={index} className="contents">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border bg-card shadow-xs sm:size-14">
                <Icon className="size-5" />
              </span>
              {index < 2 ? (
                <span
                  className={cn(
                    "h-px min-w-5 flex-1 origin-center bg-foreground/25",
                    styles.flowPulse,
                  )}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    ),
    school: (
      <div className="grid grid-cols-[3rem_1fr] gap-3 p-4">
        <div className="space-y-2 rounded-lg bg-primary p-2">
          {[1, 2, 3, 4].map((item) => (
            <span
              key={item}
              className="block h-6 rounded bg-primary-foreground/10"
            />
          ))}
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((item) => (
              <span key={item} className="h-10 rounded-lg border bg-card" />
            ))}
          </div>
          <div className="space-y-2 rounded-lg border bg-card p-3">
            {[1, 2, 3].map((item) => (
              <span key={item} className="block h-2 rounded-full bg-muted" />
            ))}
          </div>
        </div>
      </div>
    ),
    auction: (
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="rounded-xl border bg-card p-3">
          <div className="h-16 rounded-lg bg-muted" />
          <div className="mt-3 h-2 w-2/3 rounded bg-foreground/15" />
          <div className="mt-2 h-5 w-1/2 rounded bg-primary" />
        </div>
        <div className="rounded-xl border bg-card p-3">
          <div className="flex items-center justify-between">
            <Gavel className="size-4" />
            <span className="bg-success/12 rounded px-2 py-1 text-[0.55rem] text-success">
              Open
            </span>
          </div>
          <div className="mt-5 h-7 rounded-lg border" />
          <div className="mt-2 h-7 rounded-lg bg-primary" />
        </div>
      </div>
    ),
    support: (
      <div className="space-y-3 p-5">
        <div className="mr-12 rounded-xl rounded-tl-sm border bg-card p-3">
          <span className="block h-2 w-3/4 rounded bg-muted-foreground/20" />
          <span className="mt-2 block h-2 w-1/2 rounded bg-muted-foreground/15" />
        </div>
        <div className="ml-12 rounded-xl rounded-tr-sm bg-primary p-3">
          <span className="block h-2 w-4/5 rounded bg-primary-foreground/30" />
          <span className="mt-2 block h-2 w-2/3 rounded bg-primary-foreground/20" />
        </div>
        <div className="flex items-center gap-2 text-[0.6rem] text-muted-foreground">
          <Sparkles className="size-3" /> Knowledge source verified
        </div>
      </div>
    ),
    analytics: (
      <div className="grid grid-cols-[1fr_5rem] gap-3 p-4">
        <div className="flex h-28 items-end gap-2 rounded-xl border bg-card p-3">
          {[42, 70, 54, 88, 64, 96].map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-t bg-primary/80"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="grid h-[3.25rem] place-items-center rounded-xl border bg-card"
            >
              <span className="size-5 rounded-full border-4 border-foreground/20" />
            </div>
          ))}
        </div>
      </div>
    ),
    crm: (
      <div className="grid grid-cols-3 gap-2 p-4">
        {[2, 3, 2].map((count, column) => (
          <div key={column} className="rounded-lg bg-muted/55 p-2">
            <span className="mb-2 block h-2 w-2/3 rounded bg-muted-foreground/20" />
            {Array.from({ length: count }, (_, index) => (
              <span
                key={index}
                className="mb-2 block h-10 rounded-md border bg-card last:mb-0"
              />
            ))}
          </div>
        ))}
      </div>
    ),
  } satisfies Record<ProjectVisualKind, React.ReactNode>;

  return (
    <ProductFrame
      title={project.category}
      icon={project.icon}
      featured={featured}
    >
      {content[project.visual]}
    </ProductFrame>
  );
}

function ProjectAction({
  project,
  inverse = false,
}: {
  readonly project: Project;
  readonly inverse?: boolean;
}) {
  return (
    <Button
      asChild
      variant={inverse ? "secondary" : "ghost"}
      className={cn(
        "group/link min-h-11",
        !inverse && "-ml-4",
        styles.interactiveLink,
      )}
    >
      <Link
        href={project.href}
        aria-label={`View details for ${project.title}`}
      >
        View Details
        <ArrowRight
          className={cn(
            "size-4 transition-transform duration-normal group-hover/link:translate-x-1",
            styles.interactiveArrow,
          )}
          aria-hidden="true"
        />
      </Link>
    </Button>
  );
}

function ProjectCard({ project }: { readonly project: Project }) {
  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden bg-card/80 transition duration-normal hover:-translate-y-1 hover:border-foreground/20 hover:shadow-elevated",
        styles.interactiveCard,
      )}
    >
      <div
        className={cn(
          "transition duration-slow group-hover:scale-[1.015]",
          styles.interactiveVisual,
        )}
      >
        <ProjectVisual project={project} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
            {project.category}
          </p>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <CircleDot className="size-3.5" aria-hidden="true" />
          {project.disclosure}
        </p>
        <div className="mt-5 border-t pt-5">
          <TechnologyBadges technologies={project.technologies} />
          <div className="mt-4">
            <ProjectAction project={project} />
          </div>
        </div>
      </div>
    </Card>
  );
}

function CaseStudyDetail() {
  const details = [
    {
      term: "Problem",
      description:
        "Inbound enquiries often arrive with inconsistent context, making timely qualification and routing harder to manage.",
    },
    {
      term: "Solution",
      description:
        "A reviewable workflow that structures enquiry data, applies explicit qualification rules, and prepares the next action.",
    },
    {
      term: "Architecture highlights",
      description:
        "Typed workflow states, auditable decision steps, isolated AI boundaries, and human approval before consequential actions.",
    },
    {
      term: "Design approach",
      description:
        "Make confidence, source context, and current workflow state visible without overwhelming the operator.",
    },
    {
      term: "Lessons learned",
      description:
        "Useful automation depends less on novelty and more on clear inputs, exception handling, and accountable human control.",
    },
  ] as const;

  return (
    <dl className="border-primary-foreground/12 bg-primary-foreground/12 grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2">
      {details.map((detail, index) => (
        <div
          key={detail.term}
          className={cn(
            "bg-primary p-5",
            index === details.length - 1 && "sm:col-span-2",
          )}
        >
          <dt className="text-xs font-semibold uppercase tracking-[0.13em] text-primary-foreground/55">
            {detail.term}
          </dt>
          <dd className="text-primary-foreground/72 mt-2 text-sm leading-relaxed">
            {detail.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function FeaturedCaseStudy({ project }: { readonly project: Project }) {
  return (
    <Fade>
      <article className="overflow-hidden rounded-2xl border border-primary bg-primary text-primary-foreground shadow-elevated">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} inverse />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/55">
                Featured case study · {project.disclosure}
              </span>
            </div>
            <h3 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
            </h3>
            <p className="text-primary-foreground/72 mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
              {project.summary}
            </p>
            <div className="mt-6">
              <TechnologyBadges technologies={project.technologies} inverse />
            </div>
            <div className="mt-7">
              <ProjectAction project={project} inverse />
            </div>
          </div>
          <div className="grid gap-4 border-t border-primary-foreground/10 bg-primary-foreground/[0.035] p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
            <ProjectVisual project={project} featured />
            <CaseStudyDetail />
          </div>
        </div>
      </article>
    </Fade>
  );
}

function PortfolioCta() {
  return (
    <Fade>
      <div className="relative overflow-hidden rounded-2xl border bg-card/80 p-6 shadow-soft sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-20 size-64 rounded-full border bg-muted/35"
        />
        <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Want Your Business To Be Our Next Success Story?
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Let&apos;s discuss how we can design a modern digital solution
              tailored to your business.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className={cn(
                "group h-12 rounded-lg px-6",
                styles.interactiveLink,
              )}
            >
              <Link href="/portfolio">
                View Full Portfolio
                <ArrowRight
                  className={cn(
                    "size-4 transition-transform group-hover:translate-x-1",
                    styles.interactiveArrow,
                  )}
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
              <Link href="/book-consultation">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </Fade>
  );
}

function PortfolioPreviewSection() {
  const remainingProjects = projects.slice(1);
  return (
    <section
      aria-labelledby="portfolio-preview-heading"
      className="relative overflow-hidden border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          styles.sectionBackground,
        )}
      />
      <Container className="relative max-w-[100rem]">
        <Fade>
          <div className="max-w-3xl">
            <Eyebrow className="mb-4 text-xs">Featured Work</Eyebrow>
            <h2
              id="portfolio-preview-heading"
              className="text-balance text-headline font-bold"
            >
              Solutions We&apos;ve Designed &amp; Built
            </h2>
            <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              Explore a selection of web applications, AI automation workflows,
              SaaS platforms, and digital experiences that reflect our
              engineering approach and design philosophy.
            </p>
          </div>
        </Fade>
        <div className="mt-12 sm:mt-14">
          <FeaturedCaseStudy project={featuredProject} />
          <Stagger className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            {remainingProjects.map((project, index) => (
              <StaggerItem
                key={project.title}
                className={cn(
                  "h-full",
                  index < 2 ? "xl:col-span-3" : "xl:col-span-2",
                )}
              >
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <div className="mt-16 sm:mt-20">
          <PortfolioCta />
        </div>
      </Container>
    </section>
  );
}

export { PortfolioPreviewSection };
