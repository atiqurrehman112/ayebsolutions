import { Check } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

function Timeline({ className, ...props }: HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("relative ml-3 border-l", className)} {...props} />;
}
interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
  readonly title: string;
  readonly date?: string;
  readonly icon?: ReactNode;
}
function TimelineItem({
  title,
  date,
  icon,
  children,
  className,
  ...props
}: TimelineItemProps) {
  return (
    <li className={cn("relative ml-7 pb-8 last:pb-0", className)} {...props}>
      <span className="absolute -left-[2.15rem] top-0 grid size-5 place-items-center rounded-full border bg-background text-muted-foreground">
        {icon}
      </span>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-semibold">{title}</h3>
        {date ? (
          <time className="text-sm text-muted-foreground">{date}</time>
        ) : null}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </li>
  );
}

interface Step {
  readonly label: string;
  readonly description?: string;
}
interface StepIndicatorProps {
  readonly steps: readonly Step[];
  readonly currentStep: number;
  readonly className?: string;
}
function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  return (
    <ol
      aria-label="Progress"
      className={cn("grid gap-4 sm:grid-flow-col sm:grid-cols-none", className)}
    >
      {steps.map((step, index) => {
        const number = index + 1;
        const complete = number < currentStep;
        const current = number === currentStep;
        return (
          <li
            key={step.label}
            aria-current={current ? "step" : undefined}
            className="flex items-start gap-3"
          >
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold",
                (complete || current) &&
                  "border-primary bg-primary text-primary-foreground",
              )}
            >
              {complete ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                number
              )}
            </span>
            <span>
              <span className="block text-sm font-medium">{step.label}</span>
              {step.description ? (
                <span className="block text-xs text-muted-foreground">
                  {step.description}
                </span>
              ) : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export { StepIndicator, Timeline, TimelineItem };
export type { Step, StepIndicatorProps, TimelineItemProps };
