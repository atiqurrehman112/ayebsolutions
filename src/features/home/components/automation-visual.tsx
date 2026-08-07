import {
  ArrowRight,
  Bot,
  Check,
  Database,
  Gauge,
  Layers3,
  Mail,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import styles from "./hero-background.module.css";

function WorkflowNode({
  icon: Icon,
  label,
  detail,
  complete = true,
}: {
  readonly icon: typeof Zap;
  readonly label: string;
  readonly detail: string;
  readonly complete?: boolean;
}) {
  return (
    <div className="relative flex items-center gap-3 rounded-xl border bg-background/85 p-3 shadow-xs backdrop-blur-surface sm:p-4">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground sm:size-10">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold sm:text-sm">{label}</p>
        <p className="mt-0.5 truncate text-[0.68rem] text-muted-foreground sm:text-xs">
          {detail}
        </p>
      </div>
      {complete ? (
        <span className="grid size-5 place-items-center rounded-full bg-success text-success-foreground">
          <Check className="size-3" aria-hidden="true" />
        </span>
      ) : (
        <span
          className={cn("size-2 rounded-full bg-success", styles.statusPulse)}
        />
      )}
    </div>
  );
}

function AutomationVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[38rem] lg:mx-0 lg:ml-auto"
    >
      <div className="absolute -left-8 top-16 hidden rounded-xl border bg-background/80 p-3 shadow-soft backdrop-blur-surface sm:block">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-secondary">
            <Gauge className="size-4" />
          </span>
          <span>
            <span className="block text-[0.65rem] text-muted-foreground">
              Automation
            </span>
            <span className="block text-xs font-semibold">
              Running smoothly
            </span>
          </span>
        </div>
      </div>
      <div className="absolute -right-4 bottom-16 z-10 hidden rounded-xl border bg-background/85 p-3 shadow-soft backdrop-blur-surface md:block">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-success/15 text-success">
            <Sparkles className="size-4" />
          </span>
          <span>
            <span className="block text-[0.65rem] text-muted-foreground">
              AI assistant
            </span>
            <span className="block text-xs font-semibold">Task completed</span>
          </span>
        </div>
      </div>

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-foreground/10 bg-card/75 p-2 shadow-elevated backdrop-blur-surface sm:rounded-[1.75rem] sm:p-3",
          styles.visual,
          styles.shine,
        )}
      >
        <div className="overflow-hidden rounded-xl border bg-background/90 sm:rounded-2xl">
          <div className="flex h-11 items-center justify-between border-b px-3 sm:h-12 sm:px-4">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-destructive/70" />
              <span className="size-2.5 rounded-full bg-warning/80" />
              <span className="size-2.5 rounded-full bg-success/70" />
            </div>
            <div className="flex items-center gap-2 text-[0.65rem] font-medium text-muted-foreground sm:text-xs">
              <Workflow className="size-3.5" />
              Automation Studio
            </div>
            <div className="flex items-center gap-1.5 rounded-full border bg-success/10 px-2 py-1 text-[0.6rem] font-semibold text-success">
              <span
                className={cn(
                  "size-1.5 rounded-full bg-success",
                  styles.statusPulse,
                )}
              />
              Live
            </div>
          </div>

          <div className="grid gap-3 p-3 sm:grid-cols-[1fr_9rem] sm:p-5">
            <div className="rounded-xl border bg-muted/25 p-3 sm:p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Lead workflow
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    Qualify and sync inquiries
                  </p>
                </div>
                <span className="rounded-md border bg-background px-2 py-1 text-[0.6rem] text-muted-foreground">
                  Active
                </span>
              </div>
              <div className="relative space-y-3 before:absolute before:bottom-8 before:left-[1.85rem] before:top-8 before:w-px before:bg-border">
                <WorkflowNode
                  icon={Mail}
                  label="New inquiry received"
                  detail="Website form submitted"
                />
                <WorkflowNode
                  icon={Bot}
                  label="AI qualification"
                  detail="Intent and priority analyzed"
                />
                <WorkflowNode
                  icon={Database}
                  label="CRM updated"
                  detail="Contact routed automatically"
                  complete={false}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
              <div className="rounded-xl border bg-card p-3">
                <div className="flex items-center justify-between text-muted-foreground">
                  <Layers3 className="size-4" />
                  <ArrowRight className="size-3" />
                </div>
                <p className="mt-5 text-lg font-bold">3</p>
                <p className="text-[0.65rem] text-muted-foreground">
                  Connected systems
                </p>
              </div>
              <div className="rounded-xl border bg-primary p-3 text-primary-foreground">
                <Zap className="size-4" />
                <p className="mt-5 text-sm font-semibold">Always on</p>
                <p className="mt-1 text-[0.65rem] opacity-70">
                  Built to scale with you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AutomationVisual };
