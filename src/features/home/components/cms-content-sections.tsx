import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CmsMedia } from "@/components/media/cms-media";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PublicBlogArticle } from "@/lib/database/repositories/blog-repository";
import type { PublicTestimonial } from "@/lib/database/repositories/testimonials-repository";
import { TestimonialCarousel } from "./testimonial-carousel";

export function BlogPreviewSection({
  articles,
}: {
  readonly articles: readonly PublicBlogArticle[];
}) {
  if (!articles.length)
    return (
      <section
        className="border-b py-20 sm:py-24"
        aria-labelledby="latest-insights-heading"
      >
        <Container className="max-w-[100rem]">
          <Eyebrow>Latest insights</Eyebrow>
          <h2
            id="latest-insights-heading"
            className="mt-4 text-headline font-bold"
          >
            Practical thinking for modern digital work.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Published articles will appear here when the insights library is
            available.
          </p>
          <Button asChild variant="outline" className="mt-7">
            <Link href="/blog">
              Browse insights
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </Container>
      </section>
    );

  return (
    <section
      className="border-b py-20 sm:py-24"
      aria-labelledby="latest-insights-heading"
    >
      <Container className="max-w-[100rem]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Latest insights</Eyebrow>
            <h2
              id="latest-insights-heading"
              className="mt-4 text-headline font-bold"
            >
              Recently published thinking.
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/blog">
              Browse insights
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="flex flex-col rounded-2xl border bg-card p-6"
            >
              {article.featuredMedia ? (
                <CmsMedia
                  media={article.featuredMedia}
                  alt={article.featuredMedia.alt ?? article.title}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="mb-6 aspect-[16/9] w-full rounded-xl object-cover"
                />
              ) : null}
              <div className="flex gap-2">
                {article.is_featured ? <Badge>Featured</Badge> : null}
                <Badge variant="outline">Published</Badge>
              </div>
              <h3 className="mt-6 text-2xl font-bold">{article.title}</h3>
              <p className="mt-4 flex-1 leading-7 text-muted-foreground">
                {article.excerpt || article.description}
              </p>
              <Button asChild variant="ghost" className="mt-6 self-start">
                <Link href={`/blog/${article.slug}`}>
                  Read article
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TestimonialsPreviewSection({
  testimonials,
}: {
  readonly testimonials: readonly PublicTestimonial[];
}) {
  if (!testimonials.length)
    return (
      <section
        className="border-b bg-muted/[.12] py-20 sm:py-24"
        aria-labelledby="testimonials-heading"
      >
        <Container className="max-w-[100rem]">
          <Eyebrow>Testimonials</Eyebrow>
          <h2
            id="testimonials-heading"
            className="mt-4 text-headline font-bold"
          >
            Feedback is published only with approval and consent.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            No verified testimonials are currently available. We do not
            substitute sample quotes or fabricated reviews.
          </p>
        </Container>
      </section>
    );

  return (
    <section
      className="border-b bg-muted/[.12] py-20 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <Container className="max-w-[100rem]">
        <Eyebrow>Testimonials</Eyebrow>
        <h2
          id="testimonials-heading"
          className="mt-4 max-w-4xl text-balance text-headline font-bold"
        >
          Feedback published with approval, attribution, and consent.
        </h2>
        <TestimonialCarousel testimonials={testimonials} />
      </Container>
    </section>
  );
}
