import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container, Eyebrow } from "@/components/layout/primitives";
import { Fade } from "@/components/motion/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceSectionIntroductionProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly id: string;
  readonly className?: string;
}

function ServiceSectionIntroduction({
  eyebrow,
  title,
  description,
  id,
  className,
}: ServiceSectionIntroductionProps) {
  return (
    <Fade>
      <div className={cn("max-w-3xl", className)}>
        <Eyebrow className="mb-4 text-xs">{eyebrow}</Eyebrow>
        <h2 id={id} className="text-balance text-headline font-bold">
          {title}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </Fade>
  );
}

interface ServiceFinalCtaProps {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly primaryLabel?: string;
  readonly primaryHref?: string;
  readonly secondaryLabel?: string;
  readonly secondaryHref?: string;
  readonly panelClassName?: string;
}

function ServiceFinalCta({
  id,
  eyebrow,
  title,
  description,
  primaryLabel = "Book Consultation",
  primaryHref = "/book-consultation",
  secondaryLabel = "Contact Us",
  secondaryHref = "/contact",
  panelClassName,
}: ServiceFinalCtaProps) {
  return (
    <section aria-labelledby={id} className="py-20 sm:py-24 lg:py-30">
      <Container className="max-w-[100rem]">
        <Fade>
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-elevated sm:p-10 lg:p-14",
              panelClassName,
            )}
          >
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
                  {eyebrow}
                </Eyebrow>
                <h2
                  id={id}
                  className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  {title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/70 sm:text-lg">
                  {description}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="group h-12 rounded-lg px-6"
                >
                  <Link href={primaryHref}>
                    {primaryLabel}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-lg border-primary-foreground/25 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href={secondaryHref}>{secondaryLabel}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Container>
    </section>
  );
}

export { ServiceFinalCta, ServiceSectionIntroduction };
