import type { ReactNode } from "react";
import { SectionWrapper } from "@/components/layout/primitives";
import { cn } from "@/lib/utils";

interface TemplateProps {
  readonly eyebrow?: ReactNode;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly actions?: ReactNode;
  readonly children?: ReactNode;
  readonly className?: string;
  readonly id?: string;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  className,
}: Omit<TemplateProps, "children" | "id">) {
  return (
    <div className={cn("max-w-reading", className)}>
      {eyebrow}
      <h2 className="text-balance text-headline font-bold">{title}</h2>
      {description ? (
        <div className="mt-4 text-lg text-muted-foreground">{description}</div>
      ) : null}
      {actions ? (
        <div className="mt-6 flex flex-wrap gap-3">{actions}</div>
      ) : null}
    </div>
  );
}

function CTALayout({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  id,
}: TemplateProps) {
  return (
    <SectionWrapper id={id} className={className}>
      <div className="overflow-hidden rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-10 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            actions={actions}
            className="[&_*]:text-inherit"
          />
          {children}
        </div>
      </div>
    </SectionWrapper>
  );
}

export { CTALayout };
