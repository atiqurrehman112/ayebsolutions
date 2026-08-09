import { AlertCircle, LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface AuthFeedbackProps {
  readonly children: React.ReactNode;
  readonly title: string;
  readonly variant: "error" | "loading";
}

function AuthFeedback({ children, title, variant }: AuthFeedbackProps) {
  const Icon = variant === "error" ? AlertCircle : LoaderCircle;

  return (
    <div
      className={cn(
        "rounded-lg border p-4 text-sm",
        variant === "error"
          ? "border-destructive/40 bg-destructive/10"
          : "border-border bg-muted/50",
      )}
      role={variant === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <Icon
          className={cn(
            "mt-0.5 size-4 shrink-0",
            variant === "loading" && "animate-spin motion-reduce:animate-none",
          )}
          aria-hidden="true"
        />
        <div>
          <strong>{title}</strong>
          <p className="mt-1 leading-6 text-muted-foreground">{children}</p>
        </div>
      </div>
    </div>
  );
}

export { AuthFeedback };
