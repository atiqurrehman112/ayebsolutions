import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import type { PublicSiteSettings } from "@/types/settings";
import styles from "./final-cta.module.css";

export function FinalCtaSection({
  settings,
}: {
  readonly settings: PublicSiteSettings;
}) {
  if (!settings.homepage_cta_heading) return null;
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
            {settings.homepage_cta_heading}
          </h2>
          {settings.homepage_cta_description ? (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/70">
              {settings.homepage_cta_description}
            </p>
          ) : null}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {settings.homepage_cta_primary_label &&
            settings.homepage_cta_primary_href ? (
              <Button asChild size="lg" variant="secondary">
                <Link href={settings.homepage_cta_primary_href}>
                  {settings.homepage_cta_primary_label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            ) : null}
            {settings.homepage_cta_secondary_label &&
            settings.homepage_cta_secondary_href ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/25 bg-transparent text-primary-foreground"
              >
                <Link href={settings.homepage_cta_secondary_href}>
                  {settings.homepage_cta_secondary_label}
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
