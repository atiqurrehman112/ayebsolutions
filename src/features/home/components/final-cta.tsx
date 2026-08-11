import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import styles from "./final-cta.module.css";

interface FinalCtaContent {
  readonly heading: string;
  readonly description: string;
  readonly primaryCta: { readonly label: string; readonly href: string };
  readonly secondaryCta: { readonly label: string; readonly href: string };
}

export function FinalCtaSection({
  content,
}: {
  readonly content: FinalCtaContent;
}) {
  return (
    <section
      className={`${styles.sectionBackground} border-b bg-primary py-20 text-primary-foreground sm:py-28`}
      aria-labelledby="final-cta-heading"
    >
      <Container className="max-w-[100rem]">
        <div className="max-w-4xl">
          <Eyebrow className="text-primary-foreground/60">Next step</Eyebrow>
          <h2
            id="final-cta-heading"
            className="mt-5 text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[.95] tracking-[-.05em]"
          >
            {content.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/70">
            {content.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href={content.primaryCta.href}>
                {content.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground"
            >
              <Link href={content.secondaryCta.href}>
                {content.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
