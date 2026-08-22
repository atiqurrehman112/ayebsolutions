import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CmsMedia } from "@/components/media/cms-media";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PublicPortfolioProject } from "@/lib/database/repositories/portfolio-repository";
import styles from "./portfolio-preview.module.css";

export function PortfolioPreviewSection({
  projects,
}: {
  readonly projects: readonly PublicPortfolioProject[];
}) {
  if (!projects.length)
    return (
      <section
        className="border-b py-20 sm:py-24"
        aria-labelledby="featured-work-heading"
      >
        <Container className="max-w-[100rem]">
          <Eyebrow>Featured work</Eyebrow>
          <h2
            id="featured-work-heading"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Thoughtful solutions, documented honestly.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Published portfolio projects will appear here when the project
            library is available. Explore the portfolio for internal concepts,
            prototypes, and demonstrations.
          </p>
          <Button asChild variant="outline" className="mt-7">
            <Link href="/portfolio">
              Explore portfolio
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </Container>
      </section>
    );
  const featured = projects[0];
  if (!featured) return null;
  const remaining = projects.slice(1);
  return (
    <section
      aria-labelledby="featured-work-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow>Featured work</Eyebrow>
            <h2
              id="featured-work-heading"
              className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl"
            >
              Solutions designed and published through our portfolio.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Explore current CMS-managed projects, their engineering context,
              and the technology behind each approach.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/portfolio">
              View full portfolio
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <article className="mt-12 grid overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-elevated lg:grid-cols-[.9fr_1.1fr]">
          {featured.cover ? (
            <CmsMedia
              media={featured.cover}
              alt={featured.cover.alt ?? `${featured.title} preview`}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-full min-h-72 w-full border-primary-foreground/15 object-cover lg:border-r"
            />
          ) : (
            <div
              className={`${styles.visualNoise} grid min-h-72 place-items-center border-primary-foreground/15 p-8 lg:border-r`}
            >
              <Sparkles
                className="size-14 text-primary-foreground/50"
                aria-hidden="true"
              />
              <span className="sr-only">
                No featured project media is configured
              </span>
            </div>
          )}
          <div className="flex flex-col p-7 sm:p-10">
            <div className="flex flex-wrap gap-2">
              <Badge className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground">
                {featured.project_type}
              </Badge>
              <Badge className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground">
                Featured
              </Badge>
            </div>
            <h3 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              {featured.title}
            </h3>
            <p className="mt-5 flex-1 leading-8 text-primary-foreground/70">
              {featured.summary}
            </p>
            <Technology technologies={featured.technologies} inverse />
            <Button asChild className="mt-7 self-start" variant="secondary">
              <Link href={`/portfolio/${featured.slug}`}>
                View project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </article>
        {remaining.length ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {remaining.map((project) => (
              <Card
                className={`${styles.interactiveCard} flex h-full flex-col p-6`}
                key={project.id}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge>{project.project_type}</Badge>
                  {project.is_featured ? (
                    <Badge variant="secondary">Featured</Badge>
                  ) : null}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {project.summary}
                </p>
                <Technology technologies={project.technologies} />
                <Button asChild className="mt-5" variant="ghost">
                  <Link href={`/portfolio/${project.slug}`}>
                    View details
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
function Technology({
  inverse = false,
  technologies,
}: {
  readonly inverse?: boolean;
  readonly technologies: readonly string[];
}) {
  return (
    <ul aria-label="Technology stack" className="mt-6 flex flex-wrap gap-2">
      {technologies.map((item) => (
        <li
          className={`rounded-md border px-2.5 py-1 font-mono text-[.65rem] ${inverse ? "border-primary-foreground/20 text-primary-foreground/70" : "text-muted-foreground"}`}
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
