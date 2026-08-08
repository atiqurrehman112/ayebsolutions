import {
  Accessibility,
  ArrowRight,
  Blocks,
  ClipboardList,
  Code2,
  Handshake,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Container, Eyebrow } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { Button } from "@/components/ui/button";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui/form-controls";
import { cn } from "@/lib/utils";
import styles from "./final-cta.module.css";

interface ValueHighlight {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

const valueHighlights: readonly ValueHighlight[] = [
  {
    title: "Dedicated planning",
    description: "Discovery before technical commitments.",
    icon: ClipboardList,
  },
  {
    title: "Modern architecture",
    description: "Supported tools selected for the work.",
    icon: Code2,
  },
  {
    title: "Scalable solutions",
    description: "Foundations shaped around credible change.",
    icon: Blocks,
  },
  {
    title: "Transparent communication",
    description: "Visible progress, decisions, and dependencies.",
    icon: MessageSquareText,
  },
  {
    title: "Long-term support",
    description: "Options for maintenance and measured iteration.",
    icon: Handshake,
  },
  {
    title: "Accessible development",
    description: "Semantics, keyboard paths, contrast, and motion.",
    icon: Accessibility,
  },
] as const;

const expectations = [
  "Every project begins with discovery.",
  "Solutions are tailored to business goals.",
  "Technology recommendations depend on project needs.",
  "Timelines vary based on project complexity.",
] as const;

const projectTypes = [
  "Business Website",
  "Web Application",
  "AI Automation",
  "Custom SaaS",
  "Other",
] as const;

const budgetContexts = [
  "Not defined yet",
  "Budget range available",
  "Need scope guidance",
] as const;

const timelineContexts = [
  "No target date yet",
  "Flexible timeline",
  "Target date in mind",
  "Time-sensitive — needs review",
] as const;

function PlanningSelect({
  id,
  label,
  description,
  placeholder,
  options,
}: {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly placeholder: string;
  readonly options: readonly string[];
}) {
  const descriptionId = `${id}-description`;
  return (
    <div className="space-y-2.5">
      <Label htmlFor={id} className="text-primary-foreground">
        {label}
      </Label>
      <Select>
        <SelectTrigger
          id={id}
          aria-describedby={descriptionId}
          className="h-12 border-primary-foreground/15 bg-background text-foreground shadow-soft"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p
        id={descriptionId}
        className="text-xs leading-relaxed text-primary-foreground/55"
      >
        {description}
      </p>
    </div>
  );
}

function ConsultationPreview() {
  return (
    <div
      aria-labelledby="consultation-preview-heading"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-primary-foreground/15 p-5 backdrop-blur-surface sm:p-7 lg:p-8",
        styles.previewCard,
      )}
    >
      <div className="border-primary-foreground/12 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/55">
            Consultation preview
          </p>
          <h3
            id="consultation-preview-heading"
            className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Give the conversation a useful starting point.
          </h3>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.06] px-3 py-1.5 text-xs text-primary-foreground/70">
          <Sparkles className="size-3.5" aria-hidden="true" />
          UI preview only
        </span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <PlanningSelect
          id="project-type"
          label="Project Type"
          description="Choose the closest starting category."
          placeholder="Select project type"
          options={projectTypes}
        />
        <PlanningSelect
          id="budget-context"
          label="Budget Range"
          description="No prices or commitments are created here."
          placeholder="Select budget context"
          options={budgetContexts}
        />
        <div className="sm:col-span-2">
          <PlanningSelect
            id="timeline-context"
            label="Timeline"
            description="Any delivery plan follows discovery and scope review."
            placeholder="Select timeline context"
            options={timelineContexts}
          />
        </div>
        <div className="space-y-2.5 sm:col-span-2">
          <Label htmlFor="project-goals" className="text-primary-foreground">
            Project Goals
          </Label>
          <Textarea
            id="project-goals"
            aria-describedby="project-goals-description"
            rows={5}
            placeholder="What are you trying to improve, launch, or automate?"
            className="min-h-32 border-primary-foreground/15 bg-background text-foreground shadow-soft"
          />
          <p
            id="project-goals-description"
            className="text-xs leading-relaxed text-primary-foreground/55"
          >
            This preview does not save or send anything you enter.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="group h-12 rounded-lg px-5"
        >
          <Link href="/book-consultation">
            Book Free Consultation
            <ArrowRight
              className="size-4 transition-transform duration-normal group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-12 rounded-lg border-primary-foreground/25 bg-transparent px-5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed text-primary-foreground/50">
        Visual planning preview only. No form submission, booking, or message is
        created.
      </p>
    </div>
  );
}

function ValueHighlights() {
  return (
    <div aria-labelledby="final-cta-values-heading">
      <h3 id="final-cta-values-heading" className="sr-only">
        How we support your project
      </h3>
      <Stagger className="grid gap-2 sm:grid-cols-2">
        {valueHighlights.map(({ title, description, icon: Icon }) => (
          <StaggerItem key={title} className="h-full">
            <div
              className={cn(
                "flex h-full gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.035] p-4",
                styles.valueItem,
              )}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary-foreground/10">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <h4 className="text-sm font-semibold">{title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-primary-foreground/60">
                  {description}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function ExpectationPanel() {
  return (
    <div
      aria-labelledby="project-expectations-heading"
      className="border-primary-foreground/12 rounded-2xl border bg-primary-foreground/[0.045] p-5 sm:p-6"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-primary-foreground/10">
          <Route className="size-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-primary-foreground/50">
            What to expect
          </p>
          <h3 id="project-expectations-heading" className="mt-1 font-semibold">
            A clear path, shaped around the work.
          </h3>
        </div>
      </div>
      <ol className="mt-5 space-y-3">
        {expectations.map((expectation, index) => (
          <li
            key={expectation}
            className="flex items-start gap-3 text-sm leading-relaxed text-primary-foreground/70"
          >
            <span className="mt-0.5 font-mono text-[0.65rem] text-primary-foreground/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            {expectation}
          </li>
        ))}
      </ol>
    </div>
  );
}

function AvailabilityNotice() {
  return (
    <aside
      aria-label="Project availability"
      className="border-primary-foreground/12 flex gap-3 rounded-xl border bg-primary-foreground/[0.045] p-4"
    >
      <span className="relative mt-1 flex size-3 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-40 motion-reduce:animate-none" />
        <span className="relative inline-flex size-3 rounded-full bg-success" />
      </span>
      <div>
        <p className="text-sm font-semibold">
          Currently accepting new project enquiries.
        </p>
        <p className="mt-1 text-xs leading-relaxed text-primary-foreground/60">
          Consultation scheduling depends on availability, and response times
          may vary.
        </p>
      </div>
    </aside>
  );
}

function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className={cn(
        "relative overflow-hidden py-20 text-primary-foreground sm:py-24 lg:py-30",
        styles.sectionBackground,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-24 top-16 size-80 rounded-full",
          styles.ambientOrb,
        )}
      />
      <Container className="relative max-w-[100rem]">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-14 lg:gap-y-8 xl:grid-cols-[0.82fr_1.18fr] xl:gap-x-20">
          <div className="lg:col-start-1 lg:row-start-1">
            <Fade>
              <Eyebrow className="mb-4 text-xs text-primary-foreground/55">
                Let&apos;s Build Something Great
              </Eyebrow>
              <h2
                id="final-cta-heading"
                className="text-balance text-headline font-bold"
              >
                Ready to Turn Your Ideas Into Powerful Digital Solutions?
              </h2>
              <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-primary-foreground/70">
                Whether you&apos;re launching a startup, modernizing an existing
                business, or exploring AI automation, we&apos;re here to help
                you plan, design, and build the right solution.
              </p>
            </Fade>
            <div className="mt-8">
              <AvailabilityNotice />
            </div>
          </div>
          <Fade className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <ConsultationPreview />
          </Fade>
          <div className="lg:col-start-1 lg:row-start-2">
            <ValueHighlights />
            <div className="mt-8">
              <ExpectationPanel />
            </div>
            <div className="mt-6 flex items-start gap-3 text-xs leading-relaxed text-primary-foreground/55">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              <p>
                Recommendations follow discovery and technical review. Scope,
                technology, and delivery planning remain specific to each
                project.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { FinalCtaSection };
