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
      <h2 className="editorial-heading text-headline">{title}</h2>
      {description ? <div className="body-copy mt-5">{description}</div> : null}
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
      <div className="relative isolate overflow-hidden rounded-3xl border border-primary-foreground/10 bg-primary px-6 py-12 text-primary-foreground shadow-elevated sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div
          className="pointer-events-none absolute -right-16 -top-24 -z-10 size-72 rounded-full bg-primary-foreground/[0.08] blur-ambient"
          aria-hidden="true"
        />
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
