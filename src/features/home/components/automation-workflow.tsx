"use client";

import {
  BellRing,
  Bot,
  CalendarCheck,
  Check,
  Database,
  FileCheck2,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import styles from "./automation-showcase.module.css";

interface WorkflowStep {
  readonly title: string;
  readonly description: string;
  readonly detail: string;
  readonly control: string;
  readonly icon: LucideIcon;
}

const workflowSteps: readonly WorkflowStep[] = [
  {
    title: "Website Form",
    description: "A visitor submits a structured enquiry.",
    detail:
      "The workflow begins with the information your team actually needs, captured through a clear, validated form.",
    control: "Required fields and consent rules are defined before launch.",
    icon: Send,
  },
  {
    title: "Lead Captured",
    description: "Contact and enquiry details are recorded.",
    detail:
      "Validated information enters a controlled workflow with source context and a traceable submission time.",
    control: "Validation and duplicate handling protect data quality.",
    icon: Database,
  },
  {
    title: "AI Qualification",
    description: "Defined criteria help organize priority and intent.",
    detail:
      "AI can assist with classification against agreed criteria while preserving the original enquiry for review.",
    control:
      "Confidence thresholds and human review govern consequential decisions.",
    icon: Bot,
  },
  {
    title: "CRM Updated",
    description: "Mapped fields synchronize with the sales record.",
    detail:
      "The workflow creates or updates the relevant contact and opportunity using an explicit field mapping.",
    control:
      "Idempotent updates and audit context reduce accidental duplication.",
    icon: Check,
  },
  {
    title: "Email Generated",
    description: "A contextual follow-up is prepared.",
    detail:
      "Approved templates and captured context can generate a useful first draft without hiding its source data.",
    control:
      "Review requirements are selected to match the message and risk level.",
    icon: Mail,
  },
  {
    title: "Sales Notification",
    description: "The right owner receives relevant context.",
    detail:
      "Routing rules notify the responsible person with the enquiry, classification, and recommended next action.",
    control: "Escalation paths handle missing owners and delivery failures.",
    icon: BellRing,
  },
  {
    title: "Meeting Scheduled",
    description: "Approved availability guides the next step.",
    detail:
      "Calendar rules can offer appropriate times and preserve the relationship between the meeting and CRM record.",
    control:
      "Availability, timezone, and rescheduling policies remain explicit.",
    icon: CalendarCheck,
  },
  {
    title: "Proposal Created",
    description: "A structured draft is assembled for review.",
    detail:
      "Approved business data and templates can prepare a consistent proposal draft for the responsible team member.",
    control: "Commercial terms remain reviewable before anything is shared.",
    icon: FileCheck2,
  },
] as const;

function requireWorkflowStep(
  steps: readonly WorkflowStep[],
  index: number,
): WorkflowStep {
  const step = steps[index] ?? steps[0];
  if (!step) {
    throw new Error("At least one automation workflow step is required.");
  }
  return step;
}

function AutomationWorkflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = requireWorkflowStep(workflowSteps, activeIndex);
  const ActiveIcon = activeStep.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card/75 p-3 shadow-elevated backdrop-blur-surface sm:p-5 lg:p-6">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          styles.workflowGrid,
        )}
      />
      <div className="relative flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Interactive workflow explorer
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Select a step to inspect its logic and control point.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border bg-background/75 px-3 py-1.5 text-xs font-medium">
          <span className="size-2 rounded-full bg-success" aria-hidden="true" />
          Illustrative system
        </div>
      </div>

      <div className="relative mt-5 grid gap-6 lg:grid-cols-[minmax(18rem,0.88fr)_1.12fr] lg:gap-8">
        <ol aria-label="Automation workflow steps" className="space-y-2">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const active = index === activeIndex;
            return (
              <li key={step.title} className={cn("relative", styles.connector)}>
                <button
                  type="button"
                  aria-pressed={active}
                  aria-controls="automation-step-detail"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "focus-ring group relative z-10 flex min-h-[4.75rem] w-full items-center gap-3 rounded-xl border p-3 text-left transition duration-normal sm:p-4",
                    active
                      ? "border-foreground/25 bg-foreground text-background shadow-soft"
                      : "bg-background/85 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft",
                    styles.interactiveCard,
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl border transition duration-normal group-hover:scale-105",
                      active
                        ? "border-background/15 bg-background/10"
                        : "bg-card",
                      styles.interactiveIcon,
                      active && styles.activePulse,
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-semibold">{step.title}</span>
                      <span
                        className={cn(
                          "font-mono text-[0.62rem]",
                          active
                            ? "text-background/55"
                            : "text-muted-foreground",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-xs leading-relaxed",
                        active ? "text-background/65" : "text-muted-foreground",
                      )}
                    >
                      {step.description}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div
          id="automation-step-detail"
          aria-live="polite"
          className="min-w-0 lg:sticky lg:top-32 lg:self-start"
        >
          <div
            key={activeStep.title}
            className={cn(
              "relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-elevated sm:p-8",
              styles.detailEnter,
            )}
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 size-56 rounded-full border border-primary-foreground/10"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.07] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground/65">
                  Step {String(activeIndex + 1).padStart(2, "0")} of 08
                </span>
                <span className="grid size-10 place-items-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.07]">
                  <ActiveIcon className="size-4" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">
                {activeStep.title}
              </h3>
              <p className="text-primary-foreground/72 mt-3 text-base leading-relaxed">
                {activeStep.detail}
              </p>

              <div className="border-primary-foreground/12 mt-8 rounded-xl border bg-primary-foreground/[0.055] p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-primary-foreground/55">
                  <ShieldCheck className="size-4" aria-hidden="true" />
                  Control point
                </p>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
                  {activeStep.control}
                </p>
              </div>

              <div className="mt-7 flex items-center gap-3 text-xs text-primary-foreground/55">
                <span className="h-px flex-1 bg-primary-foreground/15" />
                Human-aware by design
                <span className="h-px flex-1 bg-primary-foreground/15" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Illustrative workflow only. Steps, approvals, and integrations are
            tailored to each organization&apos;s systems and operating rules.
          </p>
        </div>
      </div>
    </div>
  );
}

export { AutomationWorkflow };
