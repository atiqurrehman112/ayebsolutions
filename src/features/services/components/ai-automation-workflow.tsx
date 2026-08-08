"use client";

import {
  BellRing,
  Bot,
  CalendarCheck,
  Check,
  ClipboardCheck,
  Database,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import styles from "./ai-automation-page.module.css";

interface AutomationStep {
  readonly title: string;
  readonly summary: string;
  readonly detail: string;
  readonly safeguard: string;
  readonly icon: LucideIcon;
}

const automationSteps: readonly AutomationStep[] = [
  {
    title: "Website Form",
    summary: "A visitor submits a structured enquiry.",
    detail:
      "The workflow begins with validated information, relevant consent, and enough context for the next step to act responsibly.",
    safeguard:
      "Required fields, input validation, consent, and abuse controls are defined before release.",
    icon: Send,
  },
  {
    title: "Lead Capture",
    summary: "The enquiry enters a traceable workflow.",
    detail:
      "Contact details, source context, and submission data are normalized before other systems receive them.",
    safeguard:
      "Duplicate detection and explicit field mapping help preserve data quality.",
    icon: Database,
  },
  {
    title: "AI Qualification",
    summary: "AI assists with bounded classification.",
    detail:
      "Agreed criteria can help organize intent, fit, or urgency while preserving the original enquiry for human inspection.",
    safeguard:
      "Confidence thresholds route uncertain or consequential cases to a person.",
    icon: Bot,
  },
  {
    title: "CRM Update",
    summary: "Approved fields synchronize to the record.",
    detail:
      "The workflow creates or updates the relevant contact and opportunity with source and decision context attached.",
    safeguard:
      "Idempotent operations and audit events reduce accidental duplication or silent changes.",
    icon: Check,
  },
  {
    title: "Email",
    summary: "A contextual response is prepared.",
    detail:
      "Approved templates and captured information can generate a relevant draft or trigger a deterministic message.",
    safeguard:
      "Sending rules and review requirements match the message's purpose and risk.",
    icon: Mail,
  },
  {
    title: "Notification",
    summary: "The responsible team receives context.",
    detail:
      "Routing logic delivers the enquiry, classification, and recommended next action to an appropriate owner.",
    safeguard:
      "Fallback ownership and failure alerts cover unavailable people or delivery errors.",
    icon: BellRing,
  },
  {
    title: "Meeting Booking",
    summary: "Qualified availability guides scheduling.",
    detail:
      "Calendar rules can present suitable times and connect the booking to the correct contact and workflow state.",
    safeguard:
      "Timezone, availability, rescheduling, and calendar permissions remain explicit.",
    icon: CalendarCheck,
  },
  {
    title: "Human Review",
    summary: "A person checks the proposed action.",
    detail:
      "A review queue presents source data, AI assistance, confidence context, and the action awaiting approval.",
    safeguard:
      "Approval, rejection, editing, and escalation are recorded rather than hidden.",
    icon: ShieldCheck,
  },
  {
    title: "Completed",
    summary: "The outcome and history are recorded.",
    detail:
      "The workflow closes only after required actions succeed, with status available for operational review and follow-up.",
    safeguard:
      "Completion rules distinguish success, partial completion, retry, and exception states.",
    icon: ClipboardCheck,
  },
] as const;

function requireAutomationStep(
  steps: readonly AutomationStep[],
  index: number,
): AutomationStep {
  const step = steps[index] ?? steps[0];
  if (!step) {
    throw new Error("At least one automation workflow step is required.");
  }
  return step;
}

function AiAutomationWorkflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = requireAutomationStep(automationSteps, activeIndex);
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
            Interactive workflow
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Select a step to inspect its role and safeguard.
          </p>
        </div>
        <p className="flex items-center gap-2 self-start rounded-full border bg-background/75 px-3 py-1.5 text-xs font-medium">
          <span className="size-2 rounded-full bg-success" aria-hidden="true" />
          Illustrative system
        </p>
      </div>

      <div className="relative mt-5 grid min-w-0 gap-6 lg:grid-cols-[minmax(18rem,0.9fr)_1.1fr] lg:gap-8">
        <ol aria-label="AI automation workflow steps" className="space-y-2">
          {automationSteps.map((step, index) => {
            const Icon = step.icon;
            const active = index === activeIndex;
            return (
              <li key={step.title} className={cn("relative", styles.connector)}>
                <button
                  type="button"
                  aria-pressed={active}
                  aria-controls="ai-automation-step-detail"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "focus-ring group relative z-10 flex min-h-[4.75rem] w-full items-center gap-3 rounded-xl border p-3 text-left transition duration-normal sm:p-4",
                    active
                      ? "border-foreground/25 bg-foreground text-background shadow-soft"
                      : "bg-background/90 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft",
                    styles.workflowButton,
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl border transition duration-normal group-hover:scale-105",
                      active
                        ? "border-background/15 bg-background/10"
                        : "bg-card",
                      styles.workflowIcon,
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
                      {step.summary}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div
          id="ai-automation-step-detail"
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
                  Step {String(activeIndex + 1).padStart(2, "0")} of 09
                </span>
                <span className="grid size-10 place-items-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.07]">
                  <ActiveIcon className="size-4" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">
                {activeStep.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-primary-foreground/70">
                {activeStep.detail}
              </p>
              <div className="mt-8 rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.055] p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-primary-foreground/55">
                  <ShieldCheck className="size-4" aria-hidden="true" />
                  Safeguard
                </p>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
                  {activeStep.safeguard}
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
            Illustrative workflow only. Data, steps, approvals, and integrations
            must be tailored to each organization&apos;s systems and operating
            rules.
          </p>
        </div>
      </div>
    </div>
  );
}

export { AiAutomationWorkflow };
