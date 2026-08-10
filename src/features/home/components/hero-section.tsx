import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/primitives";
import { CmsMedia } from "@/components/media/cms-media";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { Button } from "@/components/ui/button";
import type { PublicSiteSettings } from "@/types/settings";
import styles from "./hero-background.module.css";

interface Statistic {
  readonly label: string;
  readonly value: string;
}
function statistics(
  value: PublicSiteSettings["homepage_statistics"],
): readonly Statistic[] {
  return Array.isArray(value)
    ? value.filter((item): item is Statistic =>
        Boolean(
          item &&
          typeof item === "object" &&
          "label" in item &&
          "value" in item &&
          typeof item.label === "string" &&
          typeof item.value === "string",
        ),
      )
    : [];
}
export function HeroSection({
  settings,
}: {
  readonly settings: PublicSiteSettings;
}) {
  const stats = statistics(settings.homepage_statistics);
  const heading = settings.homepage_heading ?? settings.site_name;
  const subheading = settings.homepage_subheading ?? settings.tagline;
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-var(--header-height))] items-center overflow-hidden border-b py-16 sm:py-20 lg:py-24"
    >
      {settings.homepageBackgroundMedia ? (
        <CmsMedia
          media={settings.homepageBackgroundMedia}
          decorative
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover opacity-15"
        />
      ) : null}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${styles.background}`}
      />
      <Container className="relative z-10 max-w-[100rem]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
          <Stagger className="min-w-0 text-center lg:text-left">
            {settings.homepage_badge ? (
              <StaggerItem>
                <p className="mx-auto inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground backdrop-blur lg:mx-0">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {settings.homepage_badge}
                </p>
              </StaggerItem>
            ) : null}
            <StaggerItem>
              <h1
                id="hero-heading"
                className="mt-6 text-balance text-[clamp(2.7rem,11vw,5.75rem)] font-bold leading-[.94] tracking-[-.055em] lg:text-[clamp(4.25rem,6.2vw,6rem)]"
              >
                {heading}
              </h1>
            </StaggerItem>
            {subheading ? (
              <StaggerItem>
                <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground lg:mx-0">
                  {subheading}
                </p>
              </StaggerItem>
            ) : null}
            <StaggerItem>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                {settings.homepage_primary_cta_label &&
                settings.homepage_primary_cta_href ? (
                  <Button asChild size="lg">
                    <Link href={settings.homepage_primary_cta_href}>
                      {settings.homepage_primary_cta_label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                ) : null}
                {settings.homepage_secondary_cta_label &&
                settings.homepage_secondary_cta_href ? (
                  <Button asChild size="lg" variant="outline">
                    <Link href={settings.homepage_secondary_cta_href}>
                      {settings.homepage_secondary_cta_label}
                    </Link>
                  </Button>
                ) : null}
              </div>
            </StaggerItem>
            {settings.homepage_trust_indicators.length ? (
              <StaggerItem>
                <ul
                  aria-label="Trust indicators"
                  className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start"
                >
                  {settings.homepage_trust_indicators.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        className="size-4 text-success"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ) : null}
          </Stagger>
          <Fade>
            {settings.homepageHeroMedia ? (
              <div className="overflow-hidden rounded-2xl border bg-card shadow-elevated">
                <CmsMedia
                  media={settings.homepageHeroMedia}
                  alt={settings.homepageHeroMedia.alt ?? heading}
                  priority
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : (
              <div className="grid min-h-72 place-items-center rounded-2xl border bg-card/60">
                <Sparkles
                  className="size-12 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="sr-only">No hero media is configured</span>
              </div>
            )}
            {stats.length ? (
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border bg-card p-4"
                  >
                    <dt className="text-xs text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-xl font-bold">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </Fade>
        </div>
      </Container>
    </section>
  );
}
