import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Gauge,
  Handshake,
  Layers3,
  LockKeyhole,
  MessageSquareQuote,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { CmsMedia } from "@/components/media/cms-media";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type {
  PublicTestimonial,
  PublicTestimonialSort,
} from "@/lib/database/repositories/testimonials-repository";
import { cn } from "@/lib/utils";

import styles from "./testimonials-page.module.css";

export interface TestimonialFilters {
  readonly featured?: boolean;
  readonly industry?: string;
  readonly pageSize: number;
  readonly query?: string;
  readonly rating?: number;
  readonly sort: PublicTestimonialSort;
}

interface Props {
  readonly filters: TestimonialFilters;
  readonly industries: readonly string[];
  readonly siteName: string;
  readonly siteUrl: string;
  readonly testimonials: PaginatedResult<PublicTestimonial>;
}

interface IconItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

const trustPrinciples: readonly IconItem[] = [
  {
    title: "Transparent process",
    description:
      "Scope, assumptions, decisions, and project changes stay visible throughout delivery.",
    icon: Workflow,
  },
  {
    title: "Modern engineering",
    description:
      "Technology choices follow product needs, operational constraints, and future ownership.",
    icon: Layers3,
  },
  {
    title: "Long-term partnership",
    description:
      "Documentation, support, and planned improvement help preserve context after launch.",
    icon: Handshake,
  },
  {
    title: "Performance focus",
    description:
      "User experience, responsive behavior, and efficient delivery inform implementation choices.",
    icon: Gauge,
  },
  {
    title: "Security-minded delivery",
    description:
      "Access, validation, dependencies, data handling, and deployment risk are considered early.",
    icon: LockKeyhole,
  },
  {
    title: "Scalable foundations",
    description:
      "Architecture is shaped around realistic growth, maintainability, and changing workflows.",
    icon: Sparkles,
  },
] as const;

const reviewSteps: readonly IconItem[] = [
  {
    title: "Feedback received",
    description:
      "A review begins as submitted feedback linked to the work it describes.",
    icon: MessageSquareQuote,
  },
  {
    title: "Consent verified",
    description:
      "Publication requires recorded consent; missing consent keeps feedback private.",
    icon: ShieldCheck,
  },
  {
    title: "Review approved",
    description:
      "The CMS moderation workflow must mark a testimonial as approved before publishing.",
    icon: BadgeCheck,
  },
  {
    title: "Published clearly",
    description:
      "Only approved, consented, published records can appear on this public page.",
    icon: CheckCircle2,
  },
] as const;

const faqs = [
  {
    question: "How are testimonials collected?",
    answer:
      "Feedback is collected from people connected to completed or ongoing work. It enters a private review workflow and does not appear publicly unless its publication requirements are satisfied.",
  },
  {
    question: "What does consent verified mean?",
    answer:
      "It means permission to publish the feedback has been recorded in the testimonial workflow. Records without verified consent are excluded from this page, even if other fields are complete.",
  },
  {
    question: "Can a client ask to edit or remove a review?",
    answer:
      "A reviewer can contact Ayeb Solutions to discuss an attribution correction, clarification, or removal request. Any change should preserve the meaning of the original feedback and respect the recorded consent decision.",
  },
  {
    question: "Do you remove negative feedback?",
    answer:
      "The moderation workflow is intended to verify consent, attribution, and publication readiness—not to promise only positive commentary. Concerns about a project are more useful when they are addressed directly and responsibly.",
  },
  {
    question: "How are featured testimonials selected?",
    answer:
      "Featured placement is an editorial display choice applied only after a testimonial is approved, consent verified, and published. It does not change the review text or imply a ranking of clients.",
  },
  {
    question: "Why might a testimonial have no rating, logo, or industry?",
    answer:
      "Those fields are optional. This page hides unavailable details rather than inferring a rating, company identity, industry, image, or result that was not supplied through the CMS.",
  },
] as const;

function pageHref(filters: TestimonialFilters, page: number) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.industry) params.set("industry", filters.industry);
  if (filters.rating) params.set("rating", String(filters.rating));
  if (filters.featured !== undefined)
    params.set("featured", String(filters.featured));
  params.set("sort", filters.sort);
  params.set("pageSize", String(filters.pageSize));
  params.set("page", String(page));
  return `/testimonials?${params}`;
}

function SectionHeading({
  description,
  eyebrow,
  id,
  title,
}: {
  readonly description: string;
  readonly eyebrow: string;
  readonly id: string;
  readonly title: string;
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow className="text-xs">{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-4 text-balance text-headline font-bold">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function Rating({ rating }: { readonly rating: number }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-sm font-semibold"
      aria-label={`${rating} out of 5 stars`}
    >
      <Star className="size-4 fill-current" aria-hidden="true" />
      {rating}
    </span>
  );
}

function Identity({
  item,
  featured = false,
}: {
  readonly featured?: boolean;
  readonly item: PublicTestimonial;
}) {
  return (
    <figcaption className="flex min-w-0 items-center gap-3">
      {item.avatar ? (
        <span className={cn(styles.avatar, featured && styles.featuredAvatar)}>
          <CmsMedia
            media={item.avatar}
            alt={item.avatar.alt ?? item.reviewer_name}
            sizes={featured ? "64px" : "48px"}
            className="size-full object-cover"
          />
        </span>
      ) : (
        <span
          className={cn(
            styles.avatarFallback,
            featured && styles.featuredAvatar,
          )}
          aria-hidden="true"
        >
          {item.reviewer_name.slice(0, 1).toUpperCase()}
        </span>
      )}
      <span className="min-w-0">
        <strong className="block truncate">{item.reviewer_name}</strong>
        {item.reviewer_role || item.company_name ? (
          <span className="mt-1 block text-sm text-muted-foreground">
            {[item.reviewer_role, item.company_name]
              .filter(Boolean)
              .join(" · ")}
          </span>
        ) : null}
      </span>
      {item.companyLogo ? (
        <CmsMedia
          media={item.companyLogo}
          alt={item.companyLogo.alt ?? `${item.company_name ?? "Company"} logo`}
          sizes="120px"
          className="ml-auto max-h-8 max-w-24 object-contain"
        />
      ) : null}
    </figcaption>
  );
}

function Hero({ count }: { readonly count: number }) {
  return (
    <section
      className={cn(
        styles.hero,
        "relative overflow-hidden border-b py-20 sm:py-28 lg:py-36",
      )}
    >
      <Container className="relative z-10 max-w-[100rem]">
        <SiteBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Testimonials", href: "/testimonials" },
          ]}
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div className="max-w-5xl">
            <Eyebrow>Published with verified consent</Eyebrow>
            <h1 className="mt-5 text-balance text-[clamp(3.2rem,8vw,7.6rem)] font-bold leading-[.9] tracking-[-.065em]">
              The work matters. So does the experience of building it.
            </h1>
          </div>
          <div className="lg:pb-3">
            <p className="max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Read genuine feedback that has passed approval, consent, and
              publication checks in the Ayeb Solutions CMS.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group h-12">
                <Link href="/contact#contact-form">
                  Start a Project
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12">
                <Link href="#published-feedback">Read Feedback</Link>
              </Button>
            </div>
            <p className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
              {count
                ? `${count} matching published ${count === 1 ? "review" : "reviews"}`
                : "No matching published reviews"}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeaturedSection({
  items,
}: {
  readonly items: readonly PublicTestimonial[];
}) {
  if (!items.length) return null;
  return (
    <section
      aria-labelledby="featured-testimonials-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionHeading
          eyebrow="Featured feedback"
          id="featured-testimonials-heading"
          title="Client perspective, given room to speak."
          description="Featured placement highlights selected published feedback without changing its words, attribution, or consent requirements."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {items.map((item, index) => (
            <figure
              key={item.id}
              className={cn(
                styles.featuredCard,
                "relative flex min-h-[32rem] flex-col overflow-hidden rounded-3xl border bg-card p-7 sm:p-10",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">
                  <Quote className="size-5" aria-hidden="true" />
                  Featured review {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Badge>Featured</Badge>
                  {item.rating ? <Rating rating={item.rating} /> : null}
                </div>
              </div>
              <blockquote className="my-12 flex-1 text-balance text-2xl font-medium leading-[1.5] tracking-tight sm:text-3xl">
                “{item.quote}”
              </blockquote>
              {item.industry ? (
                <p className="mb-5 text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">
                  {item.industry}
                </p>
              ) : null}
              <div className="border-t pt-6">
                <Identity item={item} featured />
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Filters({
  filters,
  industries,
}: {
  readonly filters: TestimonialFilters;
  readonly industries: readonly string[];
}) {
  return (
    <form
      method="get"
      role="search"
      className={cn(
        styles.filters,
        "rounded-3xl border bg-card p-4 shadow-soft sm:p-6",
      )}
    >
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
        <label className={styles.filter}>
          <span>Search published feedback</span>
          <span className="relative">
            <Search
              className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              name="q"
              defaultValue={filters.query}
              className={cn(styles.control, "focus-ring w-full pl-11")}
              placeholder="Reviewer, company, role, or quote"
            />
          </span>
        </label>
        <label className={styles.filter}>
          <span>Industry</span>
          <span className="relative">
            <select
              name="industry"
              defaultValue={filters.industry ?? ""}
              className={cn(
                styles.control,
                "focus-ring w-full appearance-none pr-10",
              )}
            >
              <option value="">All industries</option>
              {industries.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </span>
        </label>
        <label className={styles.filter}>
          <span>Rating</span>
          <span className="relative">
            <select
              name="rating"
              defaultValue={filters.rating ?? ""}
              className={cn(
                styles.control,
                "focus-ring w-full appearance-none pr-10",
              )}
            >
              <option value="">All available ratings</option>
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} stars
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </span>
        </label>
      </div>
      <div className="mt-4 grid gap-4 border-t pt-4 lg:grid-cols-[1.4fr_1fr_1fr_auto_auto] lg:items-end">
        <fieldset className="min-w-0">
          <legend className={styles.filterLabel}>Placement</legend>
          <div className={styles.segmented}>
            {[
              ["", "All"],
              ["true", "Featured"],
              ["false", "Standard"],
            ].map(([value, label]) => (
              <label key={label}>
                <input
                  type="radio"
                  name="featured"
                  value={value}
                  defaultChecked={
                    filters.featured === undefined
                      ? value === ""
                      : value === String(filters.featured)
                  }
                  className="peer sr-only"
                />
                <span className={styles.segment}>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={styles.filter}>
          <span>Sort</span>
          <select
            name="sort"
            defaultValue={filters.sort}
            className={cn(styles.control, "focus-ring")}
          >
            <option value="display">Display order</option>
            <option value="highest-rating">Highest rating</option>
            <option value="newest">Newest</option>
          </select>
        </label>
        <label className={styles.filter}>
          <span>Per page</span>
          <select
            name="pageSize"
            defaultValue={filters.pageSize}
            className={cn(styles.control, "focus-ring")}
          >
            {[12, 24, 48].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <Button type="submit" className="min-h-12">
          Apply filters
        </Button>
        <Button asChild variant="ghost" className="min-h-12">
          <Link href="/testimonials">Reset</Link>
        </Button>
      </div>
    </form>
  );
}

function TestimonialCard({
  item,
  index,
}: {
  readonly item: PublicTestimonial;
  readonly index: number;
}) {
  return (
    <figure
      className={cn(
        styles.card,
        "flex break-inside-avoid flex-col rounded-2xl border bg-card p-6 sm:p-7",
      )}
      style={{ "--card-index": index } as CSSProperties}
    >
      <div className="flex items-start justify-between gap-4">
        <Quote className="size-6 text-primary/45" aria-hidden="true" />
        <div className="flex flex-wrap items-center justify-end gap-2">
          {item.is_featured ? <Badge>Featured</Badge> : null}
          {item.rating ? <Rating rating={item.rating} /> : null}
        </div>
      </div>
      <blockquote className="mt-7 flex-1 text-lg leading-8">
        “{item.quote}”
      </blockquote>
      {item.industry ? (
        <p className="mt-7 text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">
          {item.industry}
        </p>
      ) : null}
      <div className="mt-5 border-t pt-5">
        <Identity item={item} />
      </div>
    </figure>
  );
}

function TrustSnapshot({
  count,
  industries,
}: {
  readonly count: number;
  readonly industries: number;
}) {
  const facts = [
    { value: String(count), label: "Matching published reviews" },
    { value: String(industries), label: "Published industries represented" },
    { value: "3", label: "Required publication gates" },
    { value: "CMS", label: "Single feedback source" },
  ] as const;
  return (
    <section
      aria-labelledby="trust-snapshot-heading"
      className="border-b bg-primary py-16 text-primary-foreground sm:py-20"
    >
      <Container className="max-w-[100rem]">
        <h2 id="trust-snapshot-heading" className="sr-only">
          Published feedback snapshot
        </h2>
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(({ value, label }) => (
            <div key={label} className="bg-primary px-6 py-8 sm:px-8">
              <dt className="text-sm leading-6 text-primary-foreground/60">
                {label}
              </dt>
              <dd className="mt-3 text-4xl font-bold tracking-tight">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function TrustSection() {
  return (
    <section
      aria-labelledby="trust-principles-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionHeading
          eyebrow="Why Ayeb Solutions"
          id="trust-principles-heading"
          title="Trust is built into the way the work moves."
          description="Social proof is only one signal. The delivery process itself should make quality, ownership, and communication visible."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border md:grid-cols-2 xl:grid-cols-3">
          {trustPrinciples.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className={cn(styles.trustCard, "bg-card p-7 sm:p-8")}
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-7 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ReviewProcess() {
  return (
    <section
      aria-labelledby="review-process-heading"
      className="border-b bg-muted/[0.14] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <SectionHeading
            eyebrow="Review integrity"
            id="review-process-heading"
            title="Feedback reaches this page through a defined workflow."
            description="The public query itself enforces the final eligibility rules. A record that is unpublished, unapproved, or missing consent does not render here."
          />
          <ol className="grid gap-4 sm:grid-cols-2">
            {reviewSteps.map(({ title, description, icon: Icon }, index) => (
              <li key={title} className="rounded-2xl border bg-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-10 place-items-center rounded-xl bg-muted">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[.6rem] tracking-[.16em] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      aria-labelledby="testimonials-faq-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <SectionHeading
          eyebrow="Testimonials FAQ"
          id="testimonials-faq-heading"
          title="How public feedback is handled."
          description="Clear answers about collection, consent, moderation, featured placement, and optional review details."
        />
        <div className="mt-12 space-y-3">
          {faqs.map(({ question, answer }, index) => (
            <details
              key={question}
              className={cn(
                styles.disclosure,
                "group overflow-hidden rounded-2xl border bg-card px-5 sm:px-6",
              )}
              open={index === 0}
            >
              <summary className="focus-ring flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5 text-left font-semibold sm:text-lg">
                <span className="flex items-start gap-4">
                  <span className="font-mono text-[.62rem] text-muted-foreground">
                    0{index + 1}
                  </span>
                  {question}
                </span>
                <ChevronDown
                  className="size-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="ml-8 border-t pb-6 pt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TestimonialsPage({
  filters,
  industries,
  siteName,
  siteUrl,
  testimonials,
}: Props) {
  const featuredItems = testimonials.data
    .filter((item) => item.is_featured)
    .slice(0, 2);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Testimonials",
        item: `${siteUrl}/testimonials`,
      },
    ],
  } as const;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;

  return (
    <>
      <Hero count={testimonials.count} />
      <FeaturedSection items={featuredItems} />
      <section
        id="published-feedback"
        aria-labelledby="testimonial-list-heading"
        className="scroll-mt-24 border-b py-20 sm:py-24 lg:py-30"
      >
        <Container className="max-w-[100rem]">
          <SectionHeading
            eyebrow="Published feedback"
            id="testimonial-list-heading"
            title="Explore every eligible client perspective."
            description="Search and refine the current published collection. Filters use the existing server-rendered CMS query and never expose private or unapproved records."
          />
          <div className="mt-10">
            <Filters filters={filters} industries={industries} />
          </div>
          <div className="mt-12 flex items-center justify-between gap-5 border-b pb-5">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Showing {testimonials.data.length} of {testimonials.count}{" "}
              matching{" "}
              {testimonials.count === 1 ? "testimonial" : "testimonials"}
            </p>
            <span className="text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">
              Page {testimonials.page}
            </span>
          </div>
          {testimonials.data.length ? (
            <div className={cn(styles.masonry, "mt-8")}>
              {testimonials.data.map((item, index) => (
                <TestimonialCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border bg-card px-6 py-16 text-center sm:px-10">
              <Quote
                className="mx-auto size-9 text-muted-foreground"
                aria-hidden="true"
              />
              <h3 className="mt-6 text-2xl font-semibold">
                No published testimonials match these filters.
              </h3>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
                Clear the current filters to explore other approved,
                consent-verified feedback. No sample review is inserted in its
                place.
              </p>
              <Button asChild variant="outline" className="mt-7">
                <Link href="/testimonials">Clear filters</Link>
              </Button>
            </div>
          )}
          {testimonials.totalPages > 1 ? (
            <nav
              className="mt-12 flex items-center justify-between gap-4 border-t pt-8"
              aria-label="Testimonial pages"
            >
              <Button
                asChild={testimonials.page > 1}
                disabled={testimonials.page <= 1}
                variant="outline"
              >
                {testimonials.page > 1 ? (
                  <Link href={pageHref(filters, testimonials.page - 1)}>
                    Previous
                  </Link>
                ) : (
                  <span>Previous</span>
                )}
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {testimonials.page} of {testimonials.totalPages}
              </span>
              <Button
                asChild={testimonials.page < testimonials.totalPages}
                disabled={testimonials.page >= testimonials.totalPages}
                variant="outline"
              >
                {testimonials.page < testimonials.totalPages ? (
                  <Link href={pageHref(filters, testimonials.page + 1)}>
                    Next
                  </Link>
                ) : (
                  <span>Next</span>
                )}
              </Button>
            </nav>
          ) : null}
        </Container>
      </section>
      <TrustSnapshot
        count={testimonials.count}
        industries={industries.length}
      />
      <TrustSection />
      <ReviewProcess />
      <FaqSection />
      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Your next chapter
          </Eyebrow>
        }
        title="Let’s build work worth talking about."
        description={
          <p className="max-w-2xl leading-relaxed text-primary-foreground/70">
            Bring the goal, the constraint, or the early idea. We’ll help shape
            a clear technical path from discovery to delivery.
          </p>
        }
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact#contact-form">
                Start a Project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </div>
        }
        className={styles.finalCta}
      />
      <StructuredData data={organization} />
      <StructuredData data={breadcrumb} />
      <StructuredData data={faqSchema} />
      {testimonials.data.map((item) => (
        <StructuredData
          key={item.id}
          data={{
            "@context": "https://schema.org",
            "@type": "Review",
            author: { "@type": "Person", name: item.reviewer_name },
            reviewBody: item.quote,
            itemReviewed: {
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
            },
            reviewRating: item.rating
              ? {
                  "@type": "Rating",
                  ratingValue: item.rating,
                  bestRating: 5,
                  worstRating: 1,
                }
              : undefined,
          }}
        />
      ))}
    </>
  );
}
