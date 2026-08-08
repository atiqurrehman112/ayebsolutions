import {
  Accessibility,
  ArrowRight,
  Blend,
  Blocks,
  Check,
  ChevronRight,
  Component,
  Figma,
  Frame,
  Gauge,
  GitBranch,
  Grid2X2,
  LayoutDashboard,
  MousePointer2,
  Palette,
  PanelsTopLeft,
  PencilRuler,
  ScanSearch,
  Smartphone,
  Sparkles,
  TestTube2,
  Type,
  Users,
  WandSparkles,
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
import styles from "./ui-ux-design-page.module.css";

interface IconItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface DesignService extends IconItem {
  readonly outputs: readonly [string, string, string];
}

interface DesignConcept {
  readonly title: string;
  readonly status: "Internal Concept" | "Prototype" | "Design Study";
  readonly description: string;
  readonly visual:
    "commerce" | "health" | "finance" | "learning" | "workspace" | "mobile";
}

const philosophy: readonly IconItem[] = [
  {
    title: "User-centered",
    description:
      "Decisions begin with user goals, context, constraints, and the tasks an interface must support.",
    icon: Users,
  },
  {
    title: "Accessible",
    description:
      "Contrast, focus, semantics, input methods, and readable interaction states are considered during design—not after it.",
    icon: Accessibility,
  },
  {
    title: "Usable",
    description:
      "Clear language, familiar patterns, and deliberate feedback help people understand what happened and what comes next.",
    icon: MousePointer2,
  },
  {
    title: "Consistent",
    description:
      "Shared rules for type, spacing, color, and components create a coherent experience across screens.",
    icon: Component,
  },
  {
    title: "Responsive",
    description:
      "Layouts are designed for changing content and viewport constraints, rather than reduced from a single desktop canvas.",
    icon: Smartphone,
  },
  {
    title: "Purposeful",
    description:
      "Conversion paths are made clear while preserving user agency and avoiding manipulative interface patterns.",
    icon: ArrowRight,
  },
  {
    title: "Systematic",
    description:
      "Reusable foundations make future interface decisions faster to reason about and easier to maintain.",
    icon: Blocks,
  },
] as const;

const designServices: readonly DesignService[] = [
  {
    title: "UX Research",
    description:
      "Frame product questions through stakeholder context, user evidence, and practical constraints.",
    outputs: ["Research plan", "Interview themes", "Insight synthesis"],
    icon: ScanSearch,
  },
  {
    title: "User Flows",
    description:
      "Map decisions, system states, and handoffs before visual detail obscures the journey.",
    outputs: ["Task flows", "Edge cases", "State mapping"],
    icon: GitBranch,
  },
  {
    title: "Wireframing",
    description:
      "Test hierarchy and interaction structure with low-cost, content-aware interface models.",
    outputs: ["Screen structure", "Content priority", "Interaction notes"],
    icon: PanelsTopLeft,
  },
  {
    title: "High-Fidelity UI Design",
    description:
      "Translate validated structure into a polished, responsive visual language.",
    outputs: ["Responsive screens", "Interaction states", "Developer specs"],
    icon: Palette,
  },
  {
    title: "Interactive Prototypes",
    description:
      "Connect key journeys so behavior and assumptions can be reviewed before implementation.",
    outputs: ["Clickable flows", "Motion intent", "Usability scenarios"],
    icon: MousePointer2,
  },
  {
    title: "Design Systems",
    description:
      "Define tokens, components, guidance, and governance for a reusable interface foundation.",
    outputs: ["Design tokens", "Component library", "Usage guidance"],
    icon: Component,
  },
  {
    title: "Mobile App Design",
    description:
      "Shape touch-first experiences around platform patterns, reach, and constrained space.",
    outputs: ["Mobile flows", "Touch states", "Adaptive layouts"],
    icon: Smartphone,
  },
  {
    title: "Dashboard Design",
    description:
      "Turn complex operations and data into focused views with clear next actions.",
    outputs: ["Information model", "Data views", "Role-aware states"],
    icon: LayoutDashboard,
  },
] as const;

const process = [
  {
    title: "Discovery",
    description:
      "Clarify goals, users, scope, constraints, and how decisions will be made.",
    icon: Sparkles,
  },
  {
    title: "Research",
    description:
      "Gather the evidence needed to test assumptions and prioritize user needs.",
    icon: ScanSearch,
  },
  {
    title: "User Flows",
    description:
      "Map core journeys, alternate paths, system states, and failure conditions.",
    icon: Workflow,
  },
  {
    title: "Wireframes",
    description:
      "Establish content hierarchy and interaction structure without visual distraction.",
    icon: PanelsTopLeft,
  },
  {
    title: "Visual Design",
    description:
      "Apply typography, color, spacing, imagery direction, and responsive behavior.",
    icon: Palette,
  },
  {
    title: "Prototype",
    description:
      "Connect critical interactions for stakeholder and usability review.",
    icon: MousePointer2,
  },
  {
    title: "Testing",
    description:
      "Evaluate comprehension, navigation, accessibility, and task completion with appropriate methods.",
    icon: TestTube2,
  },
  {
    title: "Handoff",
    description:
      "Deliver states, specifications, assets, and implementation context to engineering.",
    icon: PencilRuler,
  },
] as const;

const improvements = [
  ["Layout hierarchy", "Competing panels", "One clear task path"],
  ["Typography", "Uniform emphasis", "Distinct reading levels"],
  ["Spacing", "Crowded relationships", "Purposeful grouping"],
  ["Navigation", "Unclear destinations", "Predictable wayfinding"],
  ["Calls-to-action", "Multiple equal actions", "Visible priority and context"],
  ["Accessibility", "Color-dependent states", "Labeled, high-contrast states"],
] as const;

const principles: readonly IconItem[] = [
  {
    title: "Visual hierarchy",
    description:
      "Emphasis follows the order in which people need to understand and act.",
    icon: Blend,
  },
  {
    title: "Consistency",
    description:
      "Repeated behaviors use shared language, structure, and feedback.",
    icon: Grid2X2,
  },
  {
    title: "Accessibility",
    description:
      "Interfaces account for keyboard, screen, contrast, motion, and semantic needs.",
    icon: Accessibility,
  },
  {
    title: "Responsive layouts",
    description:
      "Composition adapts to available space without losing meaning or order.",
    icon: Smartphone,
  },
  {
    title: "Performance-conscious design",
    description:
      "Visual choices consider rendering cost, asset weight, and interaction responsiveness.",
    icon: Gauge,
  },
  {
    title: "Clear navigation",
    description:
      "People can identify their location, choices, and route back without guesswork.",
    icon: GitBranch,
  },
  {
    title: "Readability",
    description:
      "Line length, contrast, type scale, and language support sustained comprehension.",
    icon: Type,
  },
  {
    title: "Scalable components",
    description:
      "Reusable parts accommodate meaningful variants without fragmenting the system.",
    icon: Component,
  },
] as const;

const tools = [
  ["Figma", "Interface design and shared component libraries"],
  ["FigJam", "Collaborative mapping, workshops, and early flows"],
  ["Adobe Illustrator", "Custom vector systems and visual assets"],
  ["Photoshop", "Raster editing and production preparation"],
  ["React", "Component behavior and implementation context"],
  ["Next.js", "Production interface architecture"],
  ["Tailwind CSS", "Token-aligned responsive styling"],
  ["TypeScript", "Typed component contracts"],
  ["Framer Motion", "Purposeful interaction and motion studies"],
  ["Storybook", "Isolated component review and documentation"],
] as const;

const concepts: readonly DesignConcept[] = [
  {
    title: "Commerce Operations",
    status: "Internal Concept",
    description:
      "A calm control surface for orders, inventory exceptions, and team actions.",
    visual: "commerce",
  },
  {
    title: "Care Navigation",
    status: "Design Study",
    description:
      "An accessible appointment journey organized around clarity and preparation.",
    visual: "health",
  },
  {
    title: "Financial Overview",
    status: "Prototype",
    description:
      "A responsive decision dashboard with explicit status and reporting context.",
    visual: "finance",
  },
  {
    title: "Learning Workspace",
    status: "Internal Concept",
    description:
      "A focused course experience connecting progress, lessons, and next steps.",
    visual: "learning",
  },
  {
    title: "Team Planning",
    status: "Prototype",
    description:
      "A collaborative workspace for priorities, ownership, and delivery visibility.",
    visual: "workspace",
  },
  {
    title: "Mobile Service Flow",
    status: "Design Study",
    description:
      "A touch-first booking path designed for interruption and small screens.",
    visual: "mobile",
  },
] as const;

const uiUxFaqs = [
  {
    question: "What is included in a UI/UX design engagement?",
    answer:
      "Scope can include discovery, research, user flows, wireframes, interface design, prototypes, design systems, usability review, and developer handoff. The appropriate combination depends on the product stage, evidence available, and implementation needs.",
  },
  {
    question: "What is the difference between UI and UX design?",
    answer:
      "UX design focuses on how a product is understood and used: journeys, structure, states, and feedback. UI design shapes its visual and interactive expression. They inform one another and are usually most effective when considered together.",
  },
  {
    question:
      "Can you improve an existing product rather than redesign it completely?",
    answer:
      "Yes. An improvement engagement can preserve working patterns while addressing specific navigation, accessibility, consistency, or usability concerns. We first identify what should remain, what evidence supports change, and where implementation effort is justified.",
  },
  {
    question: "How do you learn about our users?",
    answer:
      "Depending on access and scope, research may include stakeholder interviews, user conversations, product analytics, support themes, workflow observation, competitive context, and usability evaluation. We distinguish evidence from assumptions throughout the work.",
  },
  {
    question: "Do you design responsive interfaces?",
    answer:
      "Yes. Responsive behavior is considered during structure and visual design, including content order, control sizing, navigation, complex data, and intermediate widths. Final behavior still needs verification in the implemented product.",
  },
  {
    question: "How is accessibility included in the design process?",
    answer:
      "We consider contrast, focus order, keyboard paths, labels, error communication, touch targets, motion, and semantic intent while designing. Development and assistive-technology testing remain important because a design file alone cannot establish conformance.",
  },
  {
    question: "Will we receive a design system?",
    answer:
      "A design system can be part of the scope when reuse and product scale justify it. Deliverables may include tokens, components, states, usage guidance, and governance recommendations rather than only a collection of visual screens.",
  },
  {
    question: "Can you work with our existing brand guidelines?",
    answer:
      "Yes. We can translate an established identity into digital interface rules and identify where additional responsive, interaction, or accessibility guidance is needed without unnecessarily replacing the brand.",
  },
  {
    question: "Do you create interactive prototypes?",
    answer:
      "Yes. Prototypes can communicate key transitions, validate flows, and support usability review. Their fidelity and coverage are chosen around the questions being tested; they are not substitutes for production implementation.",
  },
  {
    question: "How do designers and developers collaborate?",
    answer:
      "We align early on component boundaries, responsive behavior, technical constraints, content states, and acceptance criteria. Handoff includes implementation context and review rather than treating static screens as the complete specification.",
  },
  {
    question: "What tools do you use for UI/UX design?",
    answer:
      "The workflow may use Figma, FigJam, Adobe tools, prototypes, and implementation-aware tools such as Storybook. Tool selection follows collaboration, asset, testing, and delivery requirements and does not imply partnership or certification.",
  },
  {
    question: "How long does UI/UX design take?",
    answer:
      "Duration varies with scope, product complexity, research access, review cadence, number of states, and stakeholder availability. Discovery is used to define stages and a realistic plan rather than applying a fixed timeline to every engagement.",
  },
  {
    question: "How many design revisions are included?",
    answer:
      "Review cycles are defined in the engagement scope around clear decision points. We prefer focused feedback tied to goals and user needs over an undefined revision count, which can obscure ownership and slow decisions.",
  },
  {
    question: "Can you test designs with users?",
    answer:
      "Usability evaluation can be included when suitable participants, tasks, consent, and research scope are available. Findings inform decisions but should be interpreted in context rather than treated as universal proof.",
  },
  {
    question: "How do we start a UI/UX project?",
    answer:
      "Begin with the product, audience, current evidence, business goal, technical context, and the decision you need design to support. A consultation can then identify useful discovery work and whether Ayeb Solutions is an appropriate fit.",
  },
] as const;

function DesignCanvas() {
  return (
    <div
      className={cn("relative rounded-2xl border p-3 sm:p-5", styles.canvas)}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/10" />
          <span className="ml-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
            product / overview
          </span>
        </div>
        <Figma className="size-4 text-muted-foreground" />
      </div>
      <div className="mt-3 grid min-h-[22rem] grid-cols-[3.5rem_1fr] gap-3 sm:grid-cols-[5rem_1fr]">
        <div className="rounded-xl border bg-muted/30 p-2">
          <span className="block h-7 rounded-lg bg-primary" />
          {["w-4/5", "w-3/5", "w-full", "w-2/3"].map((width) => (
            <span
              key={width}
              className={cn(
                "mx-auto mt-4 block h-1.5 rounded-full bg-foreground/10",
                width,
              )}
            />
          ))}
        </div>
        <div className="relative overflow-hidden rounded-xl border bg-background p-3 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="block h-2 w-16 rounded-full bg-primary/60" />
              <span className="mt-2 block h-1.5 w-28 rounded-full bg-foreground/10" />
            </div>
            <span className="rounded-md bg-primary px-2 py-1 text-[0.5rem] text-primary-foreground">
              New project
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <span className="h-16 rounded-lg border bg-muted/30" />
            <span className="h-16 rounded-lg border bg-muted/30" />
            <span className="col-span-2 h-16 rounded-lg border bg-primary/5 sm:col-span-1" />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1.5fr_1fr]">
            <div className="rounded-xl border p-3">
              <div className="flex h-24 items-end gap-2">
                {[38, 62, 48, 78, 57, 88].map((height, index) => (
                  <span
                    key={height}
                    className={cn(
                      "flex-1 rounded-t bg-primary/20",
                      index === 5 && styles.activeBar,
                    )}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-xl border p-3">
              <span className="block h-2 w-2/3 rounded bg-foreground/10" />
              <span className="mt-3 block h-12 rounded-lg bg-muted" />
              <span className="mt-2 block h-6 rounded-lg bg-primary/10" />
            </div>
          </div>
          <div
            className={cn(
              "absolute bottom-4 right-4 rounded-lg border bg-card px-3 py-2 shadow-soft",
              styles.cursorNote,
            )}
          >
            <span className="flex items-center gap-2 text-[0.58rem] font-medium">
              <MousePointer2 className="size-3" />
              Review hierarchy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="ui-ux-title"
      className={cn(
        "relative overflow-hidden border-b py-16 sm:py-20 lg:py-28",
        styles.hero,
      )}
    >
      <Container className="relative z-10 max-w-[100rem]">
        <SiteBreadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: "UI/UX Design", href: "/services/ui-ux-design" },
          ]}
        />
        <div className="mt-12 grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <Fade>
            <div>
              <Eyebrow className="mb-5 text-xs">UI / UX Design</Eyebrow>
              <h1
                id="ui-ux-title"
                className="text-balance text-display font-bold"
              >
                Design interfaces people can understand—and products teams can
                evolve.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                We shape accessible digital experiences through research, clear
                interaction design, responsive visual systems, and
                implementation-aware collaboration.
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
                  <Link href="#design-services">Explore Design Services</Link>
                </Button>
              </div>
              <ul
                aria-label="Design engagement priorities"
                className="mt-10 grid gap-3 border-t pt-6 sm:grid-cols-3"
              >
                {[
                  "Evidence before decoration",
                  "Responsive by design",
                  "Built for handoff",
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
          <Fade>
            <DesignCanvas />
          </Fade>
        </div>
      </Container>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <ServiceSectionIntroduction
              eyebrow="Design philosophy"
              id="philosophy-heading"
              title="Useful design begins with responsibility."
              description="A polished screen is only one output. The deeper work is deciding what the interface should help people understand, choose, and complete across real conditions."
            />
            <p className="mt-8 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
              Conversion-focused design should make a valuable next step easier
              to see—not pressure users into decisions or hide material context.
            </p>
          </div>
          <dl className="divide-y border-y">
            {philosophy.map(({ title, description, icon: Icon }, index) => (
              <div
                key={title}
                className="group grid gap-4 py-5 sm:grid-cols-[3rem_11rem_1fr] sm:items-start"
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
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="design-services"
      aria-labelledby="design-services-heading"
      className="scroll-mt-28 border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Design services"
          id="design-services-heading"
          title="The right level of design for the question at hand."
          description="Each engagement combines only the activities needed to reduce uncertainty, clarify behavior, and prepare the product for implementation."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {designServices.map(
            ({ title, description, outputs, icon: Icon }, index) => (
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
                    aria-label={`${title} typical outputs`}
                  >
                    {outputs.map((output) => (
                      <li
                        key={output}
                        className="flex items-center gap-2 text-xs"
                      >
                        <ChevronRight
                          className="size-3 text-muted-foreground"
                          aria-hidden="true"
                        />
                        {output}
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

function ProcessSection() {
  return (
    <section
      aria-labelledby="design-process-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Design process"
          id="design-process-heading"
          title="Eight stages, one connected line of reasoning."
          description="The process progresses from context to evidence, structure, expression, validation, and an implementation-ready handoff. Stages can overlap when the work requires it."
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

function InterfacePanel({ improved }: { readonly improved: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 sm:p-5",
        improved ? "bg-background" : "bg-muted/35",
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex items-center justify-between border-b pb-3",
          !improved && "opacity-60",
        )}
      >
        <span
          className={cn(
            "rounded bg-foreground/10",
            improved ? "h-3 w-20" : "h-2 w-12",
          )}
        />
        <div className="flex gap-2">
          <span className="h-2 w-7 rounded bg-foreground/10" />
          <span className="h-2 w-7 rounded bg-foreground/10" />
        </div>
      </div>
      <div
        className={cn(
          "mt-5 grid gap-3",
          improved ? "grid-cols-[1.25fr_0.75fr]" : "grid-cols-2",
        )}
      >
        <div>
          <span
            className={cn(
              "block rounded bg-foreground",
              improved ? "h-4 w-3/4" : "h-2 w-full opacity-30",
            )}
          />
          <span className="mt-3 block h-2 w-full rounded bg-foreground/10" />
          <span
            className={cn(
              "mt-2 block h-2 rounded bg-foreground/10",
              improved ? "w-4/5" : "w-full",
            )}
          />
          <span
            className={cn(
              "mt-5 block rounded",
              improved ? "h-8 w-28 bg-primary" : "h-6 w-full bg-foreground/20",
            )}
          />
        </div>
        <div
          className={cn(
            "rounded-lg border",
            improved ? "bg-primary/5 p-3" : "bg-foreground/5 p-2",
          )}
        >
          <span
            className={cn(
              "block rounded-full bg-primary/30",
              improved ? "size-8" : "h-3 w-full",
            )}
          />
          <span className="mt-3 block h-2 w-full rounded bg-foreground/10" />
          <span className="mt-2 block h-2 w-2/3 rounded bg-foreground/10" />
        </div>
      </div>
      <div
        className={cn(
          "mt-5 grid gap-2",
          improved ? "grid-cols-3" : "grid-cols-4",
        )}
      >
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className={cn(
              "block rounded-lg border",
              improved ? "h-14 bg-card" : "h-10 bg-foreground/5",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function ComparisonSection() {
  return (
    <section
      aria-labelledby="comparison-heading"
      className={cn(
        "border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        styles.comparison,
      )}
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          className="[&_p]:!text-primary-foreground/65"
          eyebrow="Before and after"
          id="comparison-heading"
          title="Design turns visual noise into meaningful priority."
          description="This conceptual comparison demonstrates how the same interface can become easier to scan and operate. It is an original design study, not a client screenshot or outcome claim."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <figure className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.05] p-4 sm:p-6">
            <figcaption className="mb-5 flex items-center justify-between">
              <span className="font-semibold">Before / competing signals</span>
              <Badge
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground"
              >
                Concept state
              </Badge>
            </figcaption>
            <InterfacePanel improved={false} />
          </figure>
          <figure className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/[0.09] p-4 sm:p-6">
            <figcaption className="mb-5 flex items-center justify-between">
              <span className="font-semibold">After / ordered decisions</span>
              <Badge
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground"
              >
                Design direction
              </Badge>
            </figcaption>
            <InterfacePanel improved />
          </figure>
        </div>
        <dl className="divide-primary-foreground/12 border-primary-foreground/12 mt-8 divide-y border-y">
          {improvements.map(([topic, before, after]) => (
            <div
              key={topic}
              className="grid gap-2 py-4 text-sm sm:grid-cols-[0.8fr_1fr_1fr] sm:gap-6"
            >
              <dt className="font-semibold">{topic}</dt>
              <dd className="text-primary-foreground/55">Before: {before}</dd>
              <dd className="flex items-center gap-2 text-primary-foreground/80">
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
          <ServiceSectionIntroduction
            eyebrow="Design principles"
            id="principles-heading"
            title="A system for making thousands of small decisions coherent."
            description="These principles help teams evaluate interface choices beyond taste. Their application changes with the product, audience, content, and technical environment."
          />
          <ol className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {principles.map(({ title, description, icon: Icon }, index) => (
              <li key={title} className="group bg-background p-6">
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

function ToolsSection() {
  return (
    <section
      aria-labelledby="tools-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Tools and technologies"
          id="tools-heading"
          title="Design work grounded in the environment where it ships."
          description="We use design and implementation tools to communicate intent, build reusable systems, and reduce ambiguity between interface and code."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {tools.map(([name, role], index) => (
            <div key={name} className="bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-lg bg-muted">
                  <Frame className="size-4" aria-hidden="true" />
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
          These are tools used within our workflow. Their inclusion does not
          imply a partnership, certification, or endorsement. The final toolset
          depends on collaboration and delivery requirements.
        </p>
      </Container>
    </section>
  );
}

function ConceptVisual({ visual }: Pick<DesignConcept, "visual">) {
  const patterns = {
    commerce: ["w-2/3", "w-full", "w-1/2"],
    health: ["w-1/2", "w-3/4", "w-full"],
    finance: ["w-full", "w-2/3", "w-4/5"],
    learning: ["w-3/4", "w-1/2", "w-full"],
    workspace: ["w-full", "w-4/5", "w-2/3"],
    mobile: ["w-1/2", "w-full", "w-3/4"],
  } as const;
  return (
    <div
      className={cn(
        "rounded-xl border bg-background/75 p-4",
        styles.conceptVisual,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-3">
        <span className="h-2 w-20 rounded bg-foreground/15" />
        <WandSparkles className="size-4 text-muted-foreground" />
      </div>
      <div className="mt-4 grid grid-cols-[0.7fr_1.3fr] gap-3">
        <div className="rounded-lg bg-muted p-3">
          {patterns[visual].map((width) => (
            <span
              key={width}
              className={cn("mb-3 block h-1.5 rounded bg-foreground/10", width)}
            />
          ))}
        </div>
        <div>
          <span className="block h-12 rounded-lg bg-primary/10" />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <span className="h-10 rounded-lg border" />
            <span className="h-10 rounded-lg border bg-card" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ConceptsSection() {
  return (
    <section
      aria-labelledby="concepts-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <ServiceSectionIntroduction
          eyebrow="Internal design concepts"
          id="concepts-heading"
          title="Original studies for different interface problems."
          description="These concepts and prototypes explore hierarchy, interaction, and responsive product patterns. They are not commissioned client work and do not represent client outcomes."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {concepts.map((concept) => (
            <StaggerItem key={concept.title} className="h-full">
              <Card className={cn("group h-full p-4", styles.hoverCard)}>
                <ConceptVisual visual={concept.visual} />
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
      aria-labelledby="ui-ux-faq-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <ServiceSectionIntroduction
          eyebrow="UI/UX design FAQ"
          id="ui-ux-faq-heading"
          title="Questions to resolve before the first frame."
          description="Practical answers about research, accessibility, responsive design, collaboration, deliverables, and product decision-making."
        />
        <Accordion
          type="single"
          collapsible
          defaultValue="ui-ux-faq-1"
          className="mt-12 space-y-3"
        >
          {uiUxFaqs.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`ui-ux-faq-${index + 1}`}
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

function UiUxDesignPage() {
  const pageUrl = new URL("/services/ui-ux-design", company.url).toString();
  const provider = {
    "@type": "Organization",
    name: company.name,
    url: company.url,
  } as const;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "UI/UX Design",
    serviceType: "User experience and user interface design",
    description:
      "User-centered interface design for accessible websites, software products, dashboards, mobile experiences, and design systems.",
    url: pageUrl,
    provider,
    areaServed: "Worldwide",
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "UI/UX Design Services",
    description:
      "UI/UX design services from Ayeb Solutions covering research, flows, wireframes, interface design, prototypes, accessibility, and design systems.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    about: { "@type": "Service", name: "UI/UX Design", provider },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: uiUxFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
  return (
    <>
      <Hero />
      <PhilosophySection />
      <ServicesSection />
      <ProcessSection />
      <ComparisonSection />
      <PrinciplesSection />
      <ToolsSection />
      <ConceptsSection />
      <FaqSection />
      <ServiceFinalCta
        id="ui-ux-final-heading"
        eyebrow="Design the decision before the screen"
        title="Ready to make your product clearer, more usable, and easier to evolve?"
        description="Bring the product context, user questions, constraints, and current evidence. We'll help identify the design work that can create a responsible path toward implementation."
        panelClassName={styles.finalPanel}
      />
      <StructuredData data={serviceSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export { UiUxDesignPage };
