import type { ReactNode } from "react";

import { Grid, SectionWrapper, Stack } from "@/components/layout/primitives";
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
      {<h2 className="text-balance text-headline font-bold">{title}</h2>}
      {description ? (
        <div className="mt-4 text-lg text-muted-foreground">{description}</div>
      ) : null}
      {actions ? (
        <div className="mt-6 flex flex-wrap gap-3">{actions}</div>
      ) : null}
    </div>
  );
}
function HeroLayout({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  id,
}: TemplateProps) {
  return (
    <SectionWrapper
      id={id}
      className={cn("overflow-hidden py-20 sm:py-24 lg:py-30", className)}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={actions}
          className="[&_h2]:text-display"
        />
        {children ? <div>{children}</div> : null}
      </div>
    </SectionWrapper>
  );
}
function FeatureLayout({
  eyebrow,
  title,
  description,
  children,
  className,
  id,
}: TemplateProps) {
  return (
    <SectionWrapper id={id} className={className}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        className="mx-auto text-center"
      />
      <div className="mt-10 lg:mt-14">{children}</div>
    </SectionWrapper>
  );
}
function ContentLayout({
  eyebrow,
  title,
  description,
  children,
  className,
  id,
}: TemplateProps) {
  return (
    <SectionWrapper id={id} containerSize="content" className={className}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="mt-10">{children}</div>
    </SectionWrapper>
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
function SplitLayout({
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
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={actions}
        />
        {children}
      </div>
    </SectionWrapper>
  );
}
function PricingLayout(props: TemplateProps) {
  return <FeatureLayout {...props} />;
}
function TestimonialLayout(props: TemplateProps) {
  return <FeatureLayout {...props} />;
}
function FAQLayout({ children, ...props }: TemplateProps) {
  return (
    <ContentLayout {...props}>
      <div className="mx-auto max-w-reading">{children}</div>
    </ContentLayout>
  );
}
function BlogLayout(props: TemplateProps) {
  return <FeatureLayout {...props} />;
}
function PortfolioLayout(props: TemplateProps) {
  return <FeatureLayout {...props} />;
}

interface SectionTemplateProps {
  readonly heading: Omit<TemplateProps, "children" | "id">;
  readonly items: readonly ReactNode[];
  readonly columns?: 2 | 3 | 4;
  readonly className?: string;
}
function SectionTemplate({
  heading,
  items,
  columns = 3,
  className,
}: SectionTemplateProps) {
  return (
    <SectionWrapper className={className}>
      <Stack gap="xl">
        <SectionHeading {...heading} />
        <Grid columns={columns}>
          {items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </Grid>
      </Stack>
    </SectionWrapper>
  );
}

export {
  BlogLayout,
  ContentLayout,
  CTALayout,
  FAQLayout,
  FeatureLayout,
  HeroLayout,
  PortfolioLayout,
  PricingLayout,
  SectionHeading,
  SectionTemplate,
  SplitLayout,
  TestimonialLayout,
};
export type { SectionTemplateProps, TemplateProps };
