import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  Bot,
  Braces,
  ExternalLink,
  Facebook,
  Github,
  HeartHandshake,
  Instagram,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Twitter,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { CmsMedia } from "@/components/media/cms-media";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { company } from "@/config/company";
import type { PublicTeamMember } from "@/lib/team/public-team";
import type { PublicFounderProfile } from "@/lib/founder/public-founder";
import { cn } from "@/lib/utils";

import styles from "./team-page.module.css";

interface TeamPageProps {
  readonly founder: PublicFounderProfile | null;
  readonly members: readonly PublicTeamMember[];
}

interface Principle {
  readonly description: string;
  readonly icon: LucideIcon;
  readonly title: string;
}

const culturePrinciples: readonly Principle[] = [
  {
    title: "Engineering excellence",
    description:
      "We treat architecture, accessibility, performance, and maintainability as one connected quality system.",
    icon: Braces,
  },
  {
    title: "Continuous learning",
    description:
      "We question assumptions, study emerging tools, and adopt them only when they improve the work responsibly.",
    icon: Lightbulb,
  },
  {
    title: "Ownership",
    description:
      "Clear responsibilities and visible decisions help ideas move from discovery to dependable delivery.",
    icon: Target,
  },
  {
    title: "Quality",
    description:
      "Thoughtful review, testing, documentation, and refinement are built into the process rather than saved for the end.",
    icon: BadgeCheck,
  },
  {
    title: "Innovation",
    description:
      "We combine product thinking and modern engineering to find useful, grounded ways through complex problems.",
    icon: Sparkles,
  },
  {
    title: "Client-first mindset",
    description:
      "Technology decisions stay connected to business goals, real users, operating constraints, and long-term ownership.",
    icon: Users,
  },
  {
    title: "Long-term partnerships",
    description:
      "Transparent communication and maintainable systems preserve context beyond a single release.",
    icon: HeartHandshake,
  },
] as const;

const coreValues: readonly Principle[] = [
  {
    title: "Ownership",
    description: "Take responsibility for decisions, details, and outcomes.",
    icon: Target,
  },
  {
    title: "Transparency",
    description:
      "Make progress, uncertainty, tradeoffs, and constraints clear.",
    icon: Blocks,
  },
  {
    title: "Security",
    description:
      "Consider access, validation, privacy, and operational risk early.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    description:
      "Use new capabilities with purpose, evidence, and human judgment.",
    icon: Bot,
  },
  {
    title: "Quality",
    description:
      "Build experiences that are coherent, resilient, and maintainable.",
    icon: Sparkles,
  },
  {
    title: "Partnership",
    description:
      "Work openly across business, product, design, and engineering.",
    icon: HeartHandshake,
  },
] as const;

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
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-4 text-balance text-headline font-bold">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function Hero() {
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
            { label: "Team", href: "/team" },
          ]}
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div className="max-w-5xl">
            <Eyebrow>Engineering with purpose</Eyebrow>
            <h1 className="mt-5 text-balance text-[clamp(3.25rem,8vw,7.8rem)] font-bold leading-[.9] tracking-[-.065em]">
              Meet the People Behind Ayeb Solutions
            </h1>
          </div>
          <div className="lg:pb-3">
            <p className="max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
              A focused team bringing engineering, product thinking, and
              responsible innovation together to help businesses navigate
              meaningful digital transformation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group">
                <Link href="/contact#contact-form">
                  Start Your Project
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.editorBar}>
            <span />
            <span />
            <span />
            <code>team.tsx</code>
          </div>
          <div className={styles.codeGrid}>
            <div>
              <span className={styles.lineNumber}>01</span>
              <code>people.map(idea =&gt;</code>
            </div>
            <div>
              <span className={styles.lineNumber}>02</span>
              <code>&nbsp;&nbsp;craft.withPurpose(idea)</code>
            </div>
            <div>
              <span className={styles.lineNumber}>03</span>
              <code>);</code>
            </div>
          </div>
          <div className={styles.orbit}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </Container>
    </section>
  );
}

function FounderSpotlight({
  founder,
}: {
  readonly founder: PublicFounderProfile | null;
}) {
  if (!founder) {
    return (
      <section
        id="founder"
        aria-labelledby="founder-heading"
        className="border-b py-20 sm:py-24 lg:py-30"
      >
        <Container className="max-w-[100rem]">
          <div className={styles.emptyState} role="status">
            <Users className="size-7" aria-hidden="true" />
            <div>
              <Eyebrow>Founder spotlight</Eyebrow>
              <h2 id="founder-heading" className="mt-3 text-2xl font-bold">
                Founder profile coming soon.
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The founder profile has not been published yet. Team and culture
                information remain available below.
              </p>
            </div>
          </div>
        </Container>
      </section>
    );
  }
  const founderLinks = [
    { label: "LinkedIn", href: founder.linkedin_url, icon: Linkedin },
    { label: "GitHub", href: founder.github_url, icon: Github },
    { label: "X", href: founder.twitter_url, icon: Twitter },
    { label: "Facebook", href: founder.facebook_url, icon: Facebook },
    { label: "Instagram", href: founder.instagram_url, icon: Instagram },
    {
      label: "Email",
      href: founder.email ? `mailto:${founder.email}` : null,
      icon: Mail,
    },
    {
      label: "Phone",
      href: founder.phone ? `tel:${founder.phone}` : null,
      icon: Phone,
    },
    { label: "Website", href: founder.portfolio_url, icon: ExternalLink },
    { label: "Resume", href: founder.resume_url, icon: ExternalLink },
  ].filter((item): item is { href: string; label: string; icon: LucideIcon } =>
    Boolean(item.href),
  );
  const expertise = [...new Set([...founder.skills, ...founder.technologies])];
  const founderFacts = [
    { label: "Years of experience", value: founder.years_experience },
    { label: "Projects completed", value: founder.projects_completed },
    { label: "Happy clients", value: founder.happy_clients },
  ].filter(
    (item): item is { label: string; value: number } => item.value !== null,
  );

  const badgeLabel =
    founder.featured_badge ||
    founder.availability_status?.replaceAll("_", " ") ||
    "Founder";

  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className={styles.founderCard}>
          <div className={styles.founderPortrait}>
            {founder.coverImage ? (
              <CmsMedia
                media={founder.coverImage}
                decorative
                fill
                className="object-cover opacity-35"
              />
            ) : null}
            {founder.profilePhoto ? (
              <CmsMedia
                media={founder.profilePhoto}
                alt={
                  founder.profilePhoto.alt ?? `Portrait of ${founder.full_name}`
                }
                sizes="(min-width: 1024px) 40vw, 92vw"
                className={styles.founderPhoto}
              />
            ) : (
              <div
                role="img"
                aria-label={`Portrait placeholder for ${founder.full_name}`}
              >
                <span className={styles.founderMonogram}>
                  {founder.full_name
                    .split(/\s+/)
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
            )}
            <span className={styles.portraitLabel}>{badgeLabel}</span>
          </div>
          <div className="p-7 sm:p-10 lg:p-14">
            <Eyebrow>Founder spotlight</Eyebrow>
            <h2
              id="founder-heading"
              className="mt-4 text-balance text-headline font-bold"
            >
              {founder.full_name}
            </h2>
            <p className="mt-3 text-lg font-semibold text-muted-foreground">
              {founder.role_title}
            </p>
            {founder.location ? (
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" aria-hidden="true" />
                {founder.location}
              </p>
            ) : null}
            <p className="mt-5 text-xl font-medium leading-8">
              {founder.short_introduction}
            </p>
            <FounderBiography content={founder.biography} />
            {founder.personal_quote ? (
              <blockquote className="mt-8 border-l-2 pl-5 text-lg italic leading-8">
                “{founder.personal_quote}”
              </blockquote>
            ) : null}
            {expertise.length ? (
              <div className="mt-9 border-t pt-8">
                <h3 className="text-sm font-semibold uppercase tracking-[.14em] text-muted-foreground">
                  Core expertise
                </h3>
                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label="Founder expertise"
                >
                  {expertise.map((item) => (
                    <li key={item}>
                      <Badge variant="outline" className="px-3 py-1.5">
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {founderFacts.length ? (
              <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
                {founderFacts.map(({ label, value }) => (
                  <div key={label} className="bg-card p-4">
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="mt-2 text-2xl font-bold">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {founder.certifications.length ? (
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-[.14em] text-muted-foreground">
                  Certifications
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {founder.certifications.map((item) => (
                    <li key={item} className="flex gap-2">
                      <BadgeCheck
                        className="mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {founder.vision_statement || founder.mission_statement ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {founder.vision_statement ? (
                  <div>
                    <h3 className="font-semibold">Vision</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {founder.vision_statement}
                    </p>
                  </div>
                ) : null}
                {founder.mission_statement ? (
                  <div>
                    <h3 className="font-semibold">Mission</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {founder.mission_statement}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
            {founderLinks.length ? (
              <div
                className="mt-8 flex flex-wrap gap-2"
                aria-label="Founder links"
              >
                {founderLinks.map(({ label, href, icon: Icon }) => (
                  <Button key={label} asChild size="sm" variant="ghost">
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {label}
                    </a>
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FounderBiography({ content }: { readonly content: string }) {
  const blocks = content.trim().split(/\n{2,}/);
  return (
    <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground">
      {blocks.map((block, index) => {
        const lines = block.split("\n");
        if (block.startsWith("## "))
          return (
            <h3
              key={`${index}-${block}`}
              className="text-xl font-semibold text-foreground"
            >
              {block.slice(3)}
            </h3>
          );
        if (block.startsWith("> "))
          return (
            <blockquote
              key={`${index}-${block}`}
              className="border-l-2 pl-5 italic text-foreground"
            >
              {block.slice(2)}
            </blockquote>
          );
        if (lines.every((line) => line.startsWith("- ")))
          return (
            <ul key={`${index}-${block}`} className="list-disc space-y-2 pl-5">
              {lines.map((line, lineIndex) => (
                <li key={`${lineIndex}-${line}`}>{line.slice(2)}</li>
              ))}
            </ul>
          );
        return (
          <p key={`${index}-${block}`} className="whitespace-pre-line">
            {block}
          </p>
        );
      })}
    </div>
  );
}

function MemberLinks({ member }: { readonly member: PublicTeamMember }) {
  const links = [
    { href: member.linkedin_url, label: "LinkedIn", icon: Linkedin },
    { href: member.github_url, label: "GitHub", icon: Github },
    { href: member.portfolio_url, label: "Website", icon: ExternalLink },
    {
      href: member.email ? `mailto:${member.email}` : null,
      label: "Email",
      icon: Mail,
    },
  ].filter((item): item is { href: string; label: string; icon: LucideIcon } =>
    Boolean(item.href),
  );

  if (!links.length) return null;
  return (
    <div
      className="mt-6 flex flex-wrap gap-2 border-t pt-5"
      aria-label={`${member.name} links`}
    >
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={`${label} for ${member.name}`}
        >
          <Icon className="size-4" aria-hidden="true" />
          {label}
        </a>
      ))}
    </div>
  );
}

function TeamMemberCard({
  member,
  index,
}: {
  readonly index: number;
  readonly member: PublicTeamMember;
}) {
  return (
    <article
      className={cn(
        styles.memberCard,
        member.featured && styles.featuredMember,
      )}
      style={{ "--member-index": index } as CSSProperties}
    >
      <div className={styles.memberPortrait}>
        {member.profileMedia ? (
          <CmsMedia
            media={member.profileMedia}
            alt={member.profileMedia.alt ?? `Portrait of ${member.name}`}
            sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 92vw"
            className="size-full object-cover"
          />
        ) : (
          <div
            className={styles.memberFallback}
            role="img"
            aria-label={`Portrait placeholder for ${member.name}`}
          >
            <span>
              {member.name
                .split(/\s+/)
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
          </div>
        )}
        {member.featured ? (
          <Badge className="absolute left-5 top-5">Featured</Badge>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {member.department ? (
          <Eyebrow className="text-[.68rem]">{member.department}</Eyebrow>
        ) : null}
        <h3 className="mt-3 text-2xl font-bold tracking-tight">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">
          {member.role}
        </p>
        <p className="mt-5 flex-1 text-sm leading-7 text-muted-foreground">
          {member.short_bio}
        </p>
        {member.skills.length ? (
          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label={`${member.name} skills`}
          >
            {member.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border bg-muted/30 px-2.5 py-1 text-xs font-medium"
              >
                {skill}
              </li>
            ))}
          </ul>
        ) : null}
        <MemberLinks member={member} />
      </div>
    </article>
  );
}

function TeamGrid({ members }: Pick<TeamPageProps, "members">) {
  return (
    <section
      id="team-members"
      aria-labelledby="team-members-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionHeading
          eyebrow="Meet our team"
          id="team-members-heading"
          title="Different disciplines. One shared standard."
          description="Published team profiles appear directly from the Team CMS. Featured members lead the sequence, followed by the deliberate display order maintained by the team."
        />
        {members.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {members.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState} role="status">
            <Users className="size-7" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">
                No team members have been published yet.
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The founder spotlight remains available while additional
                profiles move through the publishing workflow.
              </p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function CultureSection() {
  return (
    <section
      aria-labelledby="culture-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <SectionHeading
            eyebrow="Company culture"
            id="culture-heading"
            title="The environment shapes the quality of the work."
            description="Our culture is designed around curiosity, responsibility, and collaboration—not ceremony for its own sake."
          />
          <ul className={styles.cultureGrid}>
            {culturePrinciples.map(
              ({ title, description, icon: Icon }, index) => (
                <li key={title} className={styles.cultureCard}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[.62rem] tracking-[.14em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-7 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {description}
                  </p>
                </li>
              ),
            )}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function ValuesSection() {
  return (
    <section
      aria-labelledby="values-heading"
      className="border-b bg-primary py-20 text-primary-foreground sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionHeading
          eyebrow="Core values"
          id="values-heading"
          title="Principles that survive changing tools."
          description="These values guide how we communicate, make tradeoffs, and protect the long-term quality of each engagement."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-2 xl:grid-cols-3">
          {coreValues.map(({ title, description, icon: Icon }) => (
            <li key={title} className={styles.valueCard}>
              <Icon className="size-6" aria-hidden="true" />
              <h3 className="mt-8 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-primary-foreground/65">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function TeamPage({ founder, members }: TeamPageProps) {
  const pageUrl = new URL("/team", company.url).toString();
  return (
    <>
      <Hero />
      <FounderSpotlight founder={founder} />
      <TeamGrid members={members} />
      <CultureSection />
      <ValuesSection />
      <CTALayout
        className={styles.finalCta}
        eyebrow={
          <Eyebrow className="mb-3 text-primary-foreground/60">
            Join the journey
          </Eyebrow>
        }
        title="Want to Build Amazing Products With Us?"
        description={
          <p className="max-w-2xl leading-7 text-primary-foreground/70">
            Bring us a meaningful problem to solve—or introduce yourself for
            future opportunities as the team grows.
          </p>
        }
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              disabled
              className="border-primary-foreground/25 bg-transparent text-primary-foreground"
            >
              View Careers{" "}
              <span className="text-xs opacity-65">Coming Soon</span>
            </Button>
          </div>
        }
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Meet the Team at Ayeb Solutions",
          description: "The people, culture, and values behind Ayeb Solutions.",
          url: pageUrl,
          isPartOf: {
            "@type": "WebSite",
            name: company.name,
            url: company.url,
          },
          about: {
            "@type": "Organization",
            name: company.name,
            url: company.url,
          },
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: company.name,
          legalName: company.legalName,
          url: company.url,
          email: company.email,
          founder: founder
            ? {
                "@type": "Person",
                name: founder.full_name,
                jobTitle: founder.role_title,
                url: `${pageUrl}#founder`,
              }
            : undefined,
        }}
      />
      {founder ? (
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: founder.full_name,
            jobTitle: founder.role_title,
            description: founder.short_introduction,
            worksFor: {
              "@type": "Organization",
              name: company.name,
              url: company.url,
            },
            url: `${pageUrl}#founder`,
            email: founder.email ?? undefined,
            image: founder.profilePhoto?.secure_url,
            homeLocation: founder.location
              ? { "@type": "Place", name: founder.location }
              : undefined,
            knowsAbout: [...founder.skills, ...founder.technologies],
            sameAs: [
              founder.linkedin_url,
              founder.github_url,
              founder.twitter_url,
              founder.facebook_url,
              founder.instagram_url,
              founder.portfolio_url,
            ].filter((url): url is string => Boolean(url)),
          }}
        />
      ) : null}
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: company.url,
            },
            { "@type": "ListItem", position: 2, name: "Team", item: pageUrl },
          ],
        }}
      />
    </>
  );
}
