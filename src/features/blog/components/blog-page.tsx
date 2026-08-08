import {
  Accessibility,
  ArrowRight,
  Blocks,
  BookOpen,
  Bot,
  Braces,
  CheckCircle2,
  ChevronDown,
  CircleGauge,
  Code2,
  Component,
  FileText,
  GitBranch,
  GraduationCap,
  Layers3,
  Lightbulb,
  Link2,
  Mail,
  Network,
  Palette,
  Route,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";
import styles from "./blog-page.module.css";

interface IconItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface ArticlePreview {
  readonly title: string;
  readonly summary: string;
  readonly category: string;
  readonly readingTime: string;
  readonly difficulty: "Beginner" | "Intermediate" | "Advanced";
  readonly status: "Internal Draft" | "Editorial Preview" | "Planned Article";
  readonly insight: string;
  readonly icon: LucideIcon;
}

const categories: readonly IconItem[] = [
  {
    title: "Web Development",
    description:
      "Architecture, rendering, performance, accessibility, and maintainable frontend delivery.",
    icon: Code2,
  },
  {
    title: "AI Automation",
    description:
      "Governed workflows, useful AI boundaries, human review, and operational safeguards.",
    icon: Bot,
  },
  {
    title: "Custom SaaS",
    description:
      "Product scope, multi-tenant systems, permissions, data models, and responsible evolution.",
    icon: Blocks,
  },
  {
    title: "UI/UX Design",
    description:
      "Research, information hierarchy, interaction design, inclusion, and scalable systems.",
    icon: Palette,
  },
  {
    title: "API Integration",
    description:
      "Contracts, authentication, data flow, failure handling, observability, and ownership.",
    icon: Link2,
  },
  {
    title: "Business Growth",
    description:
      "Practical digital decisions that connect customer experience with sustainable operations.",
    icon: TrendingUp,
  },
] as const;

const articles: readonly ArticlePreview[] = [
  {
    title: "Designing Web Architecture Around Change",
    summary:
      "A practical framework for separating stable product responsibilities from decisions likely to evolve.",
    category: "Web Development",
    readingTime: "8 min preview",
    difficulty: "Intermediate",
    status: "Internal Draft",
    insight:
      "The full draft examines boundaries, typed contracts, rendering choices, and the cost of premature abstraction. It remains under editorial review and is not a published article.",
    icon: GitBranch,
  },
  {
    title: "Where Human Approval Belongs in AI Workflows",
    summary:
      "How confidence, consequence, reversibility, and data sensitivity can shape review checkpoints.",
    category: "AI Automation",
    readingTime: "7 min preview",
    difficulty: "Intermediate",
    status: "Editorial Preview",
    insight:
      "This preview maps approval decisions to workflow risk rather than treating autonomy as the goal. Publication and final technical review are still pending.",
    icon: ShieldCheck,
  },
  {
    title: "The First Decisions in a Multi-Tenant SaaS",
    summary:
      "A grounded introduction to tenant boundaries, roles, data ownership, billing, and operational context.",
    category: "Custom SaaS",
    readingTime: "10 min preview",
    difficulty: "Advanced",
    status: "Internal Draft",
    insight:
      "The working article focuses on decisions that are expensive to reverse and questions teams should answer before selecting implementation patterns.",
    icon: Layers3,
  },
  {
    title: "Accessibility Is a Product Constraint, Not a Polish Step",
    summary:
      "Why semantics, keyboard behavior, focus, content, motion, and testing belong in product planning.",
    category: "UI/UX Design",
    readingTime: "6 min preview",
    difficulty: "Beginner",
    status: "Planned Article",
    insight:
      "The planned article will connect accessibility decisions to discovery, design, implementation, and verification without presenting compliance as a one-time checklist.",
    icon: Accessibility,
  },
  {
    title: "Reliable Integrations Start With Failure Design",
    summary:
      "An operational view of validation, idempotency, retries, logging, reconciliation, and provider limits.",
    category: "API Integration",
    readingTime: "9 min preview",
    difficulty: "Advanced",
    status: "Internal Draft",
    insight:
      "This draft explores how explicit failure states can make an integration understandable without promising that external services will always be available.",
    icon: Network,
  },
  {
    title: "Choosing Between Configuration and Custom Software",
    summary:
      "Questions for evaluating workflow fit, ownership, differentiation, integration, and long-term operating cost.",
    category: "Business Growth",
    readingTime: "7 min preview",
    difficulty: "Beginner",
    status: "Editorial Preview",
    insight:
      "The preview treats custom development as one option among configuration, process change, and integration—not an automatic recommendation.",
    icon: Target,
  },
  {
    title: "Performance Budgets That Reflect User Conditions",
    summary:
      "How teams can turn broad performance ambition into measurable constraints and review habits.",
    category: "Web Development",
    readingTime: "8 min preview",
    difficulty: "Intermediate",
    status: "Planned Article",
    insight:
      "The planned article will cover representative devices, networks, content, third-party scripts, Core Web Vitals, and regression ownership without guaranteeing a universal score.",
    icon: CircleGauge,
  },
  {
    title: "Mapping a Workflow Before Automating It",
    summary:
      "A discovery method for clarifying triggers, decisions, exceptions, ownership, and useful outcomes.",
    category: "AI Automation",
    readingTime: "6 min preview",
    difficulty: "Beginner",
    status: "Editorial Preview",
    insight:
      "This preview explains why documenting the current workflow and its exceptions comes before choosing an automation platform or AI model.",
    icon: Route,
  },
] as const;

const learningPath: readonly IconItem[] = [
  {
    title: "Beginner",
    description:
      "Build a clear vocabulary for product, design, software, integration, and automation decisions.",
    icon: BookOpen,
  },
  {
    title: "Intermediate",
    description:
      "Connect principles to architecture, workflows, accessibility, performance, and delivery trade-offs.",
    icon: Route,
  },
  {
    title: "Advanced",
    description:
      "Examine system boundaries, operational risk, governance, failure modes, and long-term ownership.",
    icon: GraduationCap,
  },
] as const;

const values: readonly IconItem[] = [
  {
    title: "Practical",
    description:
      "Start with decisions, constraints, examples, and questions that can inform real work.",
    icon: CheckCircle2,
  },
  {
    title: "No Hype",
    description:
      "Separate capability from marketing language and make limitations visible.",
    icon: ShieldCheck,
  },
  {
    title: "Actionable",
    description:
      "Turn broad principles into clearer review points, choices, and next steps.",
    icon: Target,
  },
  {
    title: "Modern Stack",
    description:
      "Discuss current tools through their responsibilities, trade-offs, and fit.",
    icon: Braces,
  },
  {
    title: "Real Workflows",
    description:
      "Ground automation and software thinking in triggers, states, people, and exceptions.",
    icon: Route,
  },
  {
    title: "Accessibility",
    description:
      "Include semantics, input methods, content, motion, contrast, and testing context.",
    icon: Accessibility,
  },
  {
    title: "Performance",
    description:
      "Consider user conditions, rendering, assets, third parties, and evidence together.",
    icon: CircleGauge,
  },
  {
    title: "Long-Term Thinking",
    description:
      "Ask who will own, operate, understand, and responsibly change the system later.",
    icon: Lightbulb,
  },
] as const;

const blogFaqs = [
  {
    question: "Are these published blog articles?",
    answer:
      "No. The articles shown here are clearly labeled internal drafts, editorial previews, or planned articles. They are not presented as a published archive, and no publication date is implied.",
  },
  {
    question: "Why show article previews before publication?",
    answer:
      "The previews communicate the subjects and level of reasoning the Insights library is being designed to cover. They also make the current editorial status explicit instead of linking to unfinished article routes.",
  },
  {
    question: "Who are these insights for?",
    answer:
      "They are intended for business owners, product teams, designers, developers, and operations leaders evaluating digital product or automation decisions. Each preview includes a difficulty label to clarify its expected depth.",
  },
  {
    question: "What topics will the library cover?",
    answer:
      "The planned scope includes web development, AI automation, custom SaaS, UI/UX design, API integration, accessibility, performance, and responsible digital growth.",
  },
  {
    question: "Are the articles professional or legal advice?",
    answer:
      "No. The content is educational and cannot replace project-specific technical, security, privacy, legal, financial, or regulatory advice from appropriately qualified professionals.",
  },
  {
    question: "Will the content recommend one technology for every project?",
    answer:
      "No. Technology choices depend on product requirements, existing systems, team context, data, risk, providers, hosting, budget, and long-term ownership. Articles should explain fit and trade-offs rather than universal answers.",
  },
  {
    question: "How are AI automation topics approached?",
    answer:
      "AI topics emphasize workflow mapping, suitable boundaries, validation, permissions, exception handling, human oversight, privacy considerations, and operating constraints rather than autonomous or guaranteed outcomes.",
  },
  {
    question: "Will articles include fabricated case studies or results?",
    answer:
      "No. Internal examples and hypothetical scenarios will be labeled clearly. We will not invent clients, metrics, testimonials, revenue, awards, or business outcomes to make an argument appear stronger.",
  },
  {
    question: "How should I use the difficulty labels?",
    answer:
      "Beginner topics establish concepts, Intermediate topics connect decisions across a delivery workflow, and Advanced topics examine architecture, governance, reliability, or operational trade-offs in greater depth.",
  },
  {
    question: "Does the reading time represent a published article?",
    answer:
      "No. Reading-time labels describe the intended editorial depth of each preview. Final length may change during review, and the label is not a publication or availability claim.",
  },
  {
    question: "Can I subscribe to the newsletter now?",
    answer:
      "Not through this page. Newsletter subscription functionality is not yet implemented, so this section does not collect, transmit, or store an email address.",
  },
  {
    question: "When will newsletter functionality be available?",
    answer:
      "No date is promised. A future implementation would require consent language, delivery infrastructure, privacy handling, preference management, and verification before subscription is enabled.",
  },
  {
    question: "Can I request a topic?",
    answer:
      "You can share a business or technical question through the Contact page. A request may inform editorial planning, but it does not guarantee publication or a specific response.",
  },
  {
    question: "How will articles be reviewed?",
    answer:
      "The intended process includes editorial review, technical review where appropriate, accessible structure, claim qualification, source checks, and updates when material context changes.",
  },
  {
    question: "How can I discuss one of these topics for my project?",
    answer:
      "Use the consultation or contact path to describe the real workflow, users, constraints, and decision. General educational content can frame a conversation, but recommendations require project-specific discovery.",
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

function EditorialIndex() {
  return (
    <div className={styles.editorialIndex} aria-hidden="true">
      <div className="flex items-center justify-between border-b pb-4">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
          insights / working index
        </span>
        <Badge variant="outline">Internal previews</Badge>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
        <div className={styles.indexFeature}>
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-primary-foreground/55">
            Featured question
          </span>
          <strong className="mt-4 block max-w-xs text-xl leading-tight text-primary-foreground">
            Build, configure, integrate—or wait?
          </strong>
          <span className="mt-8 inline-flex items-center gap-2 text-xs text-primary-foreground/60">
            <Search className="size-3" /> Context before tools
          </span>
        </div>
        <div className="grid gap-3">
          {["Workflow", "Architecture", "Experience"].map((label, index) => (
            <div key={label} className={styles.indexRow}>
              <span className="font-mono text-[0.56rem] text-muted-foreground">
                0{index + 1}
              </span>
              <span className="text-xs font-semibold">{label}</span>
              <span className={styles.indexSignal} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {["Practical", "Reviewed", "No hype"].map((label) => (
          <span
            key={label}
            className="rounded-full border bg-background px-3 py-1.5 text-[0.58rem] font-medium"
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
      aria-labelledby="blog-title"
      className={cn(
        "relative overflow-hidden border-b py-16 sm:py-20 lg:py-28",
        styles.hero,
      )}
    >
      <Container className="relative z-10 max-w-[100rem]">
        <SiteBreadcrumbs items={[{ label: "Insights", href: "/blog" }]} />
        <div className="mt-12 grid min-w-0 items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow className="mb-5 text-xs">Insights & Resources</Eyebrow>
            <h1
              id="blog-title"
              className="text-balance break-words text-[clamp(2.55rem,11.5vw,4.75rem)] font-bold leading-[0.98] tracking-tight lg:text-display"
            >
              Practical Thinking for Better Digital Decisions
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Practical articles about web development, AI automation, custom
              software, UI/UX, APIs, and digital growth—written to clarify
              decisions rather than amplify hype.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group h-12">
                <Link href="#articles">
                  Browse Articles{" "}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12">
                <Link href="/contact">Start a Project</Link>
              </Button>
            </div>
            <p className="mt-9 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
              Every article shown on this page is an internal draft, editorial
              preview, or planned article—not a published post.
            </p>
          </div>
          <div className="min-w-0">
            <EditorialIndex />
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeaturedArticle() {
  return (
    <section
      aria-labelledby="featured-article-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <article className={styles.featuredArticle}>
          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Editorial Preview</Badge>
              <Badge
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground"
              >
                Business Systems
              </Badge>
            </div>
            <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-primary-foreground/55">
              Featured article · 9 min preview · Intermediate
            </p>
            <h2
              id="featured-article-heading"
              className="mt-4 max-w-4xl text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl"
            >
              Why Custom Software Beats Off-the-Shelf Tools—When the Problem
              Justifies It
            </h2>
            <p className="text-primary-foreground/68 mt-6 max-w-2xl text-lg leading-8">
              A balanced decision framework for comparing workflow fit,
              ownership, integration, differentiation, operating cost, and the
              responsibility that comes with custom software.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/65">
              <span className="inline-flex items-center gap-2">
                <FileText className="size-4" aria-hidden="true" /> Internal
                editorial preview
              </span>
              <span aria-hidden="true">•</span>
              <span>Not a published post</span>
            </div>
          </div>
          <div className={styles.featuredMark} aria-hidden="true">
            <Component className="size-10" />
          </div>
        </article>
      </Container>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Explore by subject"
          id="categories-heading"
          title="Six lenses for understanding digital work."
          description="Categories organize the planned editorial library by the decision being examined—not by a promise that every topic already has a published article."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ title, description, icon: Icon }, index) => (
            <li key={title} className="group bg-background p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-muted">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-[0.58rem] text-muted-foreground">
                  C{String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ArticlesSection() {
  return (
    <section
      id="articles"
      aria-labelledby="articles-heading"
      className="scroll-mt-24 border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Latest article previews"
          id="articles-heading"
          title="Working notes shaped into useful editorial paths."
          description="These eight previews are internal editorial material. Continue Reading expands the current preview; it does not open an unpublished article route."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <article key={article.title} className={styles.articleCard}>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[0.58rem] text-muted-foreground">
                    A{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <Badge variant="secondary">{article.status}</Badge>
                </div>
                <h3 className="mt-5 text-balance text-2xl font-bold tracking-tight">
                  {article.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {article.summary}
                </p>
                <dl className="mt-7 grid grid-cols-2 gap-3 border-y py-4 text-xs">
                  <div>
                    <dt className="text-muted-foreground">Reading depth</dt>
                    <dd className="mt-1 font-semibold">
                      {article.readingTime}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Difficulty</dt>
                    <dd className="mt-1 font-semibold">{article.difficulty}</dd>
                  </div>
                </dl>
                <details className={styles.articleDisclosure}>
                  <summary className="focus-ring group mt-5 flex min-h-11 cursor-pointer list-none items-center justify-between rounded-lg text-sm font-semibold">
                    Continue Reading{" "}
                    <ArrowRight
                      className="size-4 transition-transform group-open:rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-2 border-l-2 border-primary pl-4 text-sm leading-7 text-muted-foreground">
                    {article.insight}
                  </p>
                </details>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function LearningPathSection() {
  return (
    <section
      aria-labelledby="learning-path-heading"
      className={cn(
        "border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        styles.learningPath,
      )}
    >
      <Container className="max-w-[100rem]">
        <div className="max-w-3xl">
          <Eyebrow className="mb-4 text-xs text-primary-foreground/55">
            Learning path
          </Eyebrow>
          <h2
            id="learning-path-heading"
            className="text-balance text-headline font-bold"
          >
            Start with vocabulary. Progress toward systems thinking.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-primary-foreground/65">
            Difficulty reflects conceptual depth, not professional certification
            or a fixed curriculum.
          </p>
        </div>
        <ol className="relative mt-14 grid gap-5 lg:grid-cols-3">
          {learningPath.map(({ title, description, icon: Icon }, index) => (
            <li key={title} className={styles.pathStep}>
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-primary-foreground text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-[0.58rem] text-primary-foreground/45">
                  LEVEL 0{index + 1}
                </span>
              </div>
              <h3 className="mt-8 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-primary-foreground/60">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function ValuesSection() {
  return (
    <section
      aria-labelledby="insight-values-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionIntroduction
            eyebrow="Why read our insights"
            id="insight-values-heading"
            title="A library designed to make complexity more understandable."
            description="The editorial standard prioritizes context, qualified claims, practical reasoning, and the long-term consequences of technical decisions."
          />
          <ol className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {values.map(({ title, description, icon: Icon }, index) => (
              <li key={title} className="bg-background p-6">
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
          </ol>
        </div>
      </Container>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className={styles.newsletterPanel}>
          <div className="relative z-10 max-w-3xl">
            <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <Eyebrow className="mb-4 mt-8 text-xs">Newsletter</Eyebrow>
            <h2
              id="newsletter-heading"
              className="text-balance text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Thoughtful updates, when the delivery system is ready.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Newsletter subscription is not yet implemented. This section does
              not collect, transmit, or store an email address. A future release
              would add consent, preferences, delivery infrastructure, and
              privacy handling before accepting subscriptions.
            </p>
            <Badge variant="outline" className="mt-8">
              Subscription unavailable in Sprint 6E
            </Badge>
          </div>
          <div className={styles.newsletterVisual} aria-hidden="true">
            <Mail className="size-8" />
            <span>Editorial review</span>
            <ArrowRight className="size-4" />
            <span>Consent & delivery</span>
            <ArrowRight className="size-4" />
            <span>Future subscription</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      aria-labelledby="blog-faq-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <SectionIntroduction
          eyebrow="Insights FAQ"
          id="blog-faq-heading"
          title="Clear answers about the editorial library."
          description="Publication status, intended audience, topic depth, newsletter limitations, review expectations, and content boundaries are explained here."
        />
        <div className="mt-12 space-y-3">
          {blogFaqs.map(({ question, answer }, index) => (
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

function BlogPage() {
  const pageUrl = new URL("/blog", company.url).toString();
  const blogId = `${pageUrl}#blog`;
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": blogId,
    name: "Ayeb Solutions Insights & Resources",
    description:
      "Internal editorial previews about modern web development, AI automation, software, design, integrations, and digital growth.",
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: company.name,
      url: company.url,
    },
    hasPart: articles.map((article) => ({
      "@type": "CreativeWork",
      name: article.title,
      description: article.summary,
      creativeWorkStatus: article.status,
      educationalLevel: article.difficulty,
    })),
  } as const;
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Insights & Resources",
    description:
      "A collection of clearly labeled internal editorial previews from Ayeb Solutions.",
    url: pageUrl,
    mainEntity: { "@id": blogId },
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Ayeb Solutions Insights & Resources",
    description:
      "Practical internal article previews about digital products, software engineering, design, automation, and business systems.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    mainEntity: { "@id": blogId },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: blogFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
  return (
    <>
      <Hero />
      <FeaturedArticle />
      <CategoriesSection />
      <ArticlesSection />
      <LearningPathSection />
      <ValuesSection />
      <NewsletterSection />
      <FaqSection />
      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Turn insight into direction
          </Eyebrow>
        }
        title="Have a digital decision that needs project-specific context?"
        description={
          <p className="max-w-2xl leading-relaxed text-primary-foreground/70">
            Share the workflow, users, constraints, and outcome you are
            considering. Educational content can frame the question; discovery
            turns it into an appropriate project path.
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
              <Link href="/contact">Start a Project</Link>
            </Button>
          </div>
        }
        className={styles.finalCta}
      />
      <StructuredData data={collectionSchema} />
      <StructuredData data={blogSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export { BlogPage };
