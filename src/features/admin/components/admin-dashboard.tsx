import {
  ArrowUpRight,
  BookOpen,
  CircleDashed,
  Clock3,
  FolderKanban,
  ImageIcon,
  Mail,
  MessageSquareQuote,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Badge } from "@/components/ui/status";
import { cn } from "@/lib/utils";
import styles from "./admin-dashboard.module.css";

interface DashboardDestination {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly icon: LucideIcon;
}

const destinations: readonly DashboardDestination[] = [
  {
    title: "Portfolio",
    description:
      "Project records, disclosures, technology, and case-study content.",
    href: "/admin/portfolio",
    icon: FolderKanban,
  },
  {
    title: "Blog",
    description:
      "Editorial articles, categories, metadata, and publishing status.",
    href: "/admin/blog",
    icon: BookOpen,
  },
  {
    title: "Testimonials",
    description:
      "Moderation, consent, publication, and featured testimonial controls.",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  {
    title: "Team",
    description:
      "Member profiles, expertise, Media Library portraits, and publishing order.",
    href: "/admin/team",
    icon: Users,
  },
  {
    title: "Contact Leads",
    description:
      "Inquiry intake, qualification context, assignment, and response history.",
    href: "/admin/contact-leads",
    icon: Mail,
  },
  {
    title: "Media Library",
    description:
      "Managed assets, metadata, usage context, and Cloudinary delivery state.",
    href: "/admin/media",
    icon: ImageIcon,
  },
] as const;

const statistics = [
  ["Portfolio", "Connected", "Published project workflow available"],
  ["Blog", "Connected", "Editorial workflow available"],
  ["Testimonials", "Connected", "Consent-aware moderation available"],
  ["Team", "Connected", "Profile publishing workflow available"],
  ["Contact Leads", "Connected", "CRM workflow available"],
] as const;

const activity = [
  [
    "Content operations",
    "Portfolio and Blog publishing workflows are available through protected modules.",
  ],
  [
    "Trust content",
    "Testimonials use approval, consent, publication, and placement controls.",
  ],
  [
    "Media delivery",
    "Cloudinary uploads and Supabase metadata remain available to retained CMS modules.",
  ],
  [
    "Protected administration",
    "Supabase authentication, session refresh, roles, and middleware protect this workspace.",
  ],
] as const;

function AdminDashboard() {
  return (
    <div className="mx-auto max-w-[100rem]">
      <section aria-labelledby="admin-dashboard-title" className={styles.hero}>
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Admin workspace</Badge>
            <Badge variant="outline">Authenticated operations</Badge>
          </div>
          <h1
            id="admin-dashboard-title"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Content operations with a focused, maintainable scope.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Manage published work, editorial content, approved testimonials,
            media assets, and contact inquiries from one protected workspace.
          </p>
        </div>
        <div className={styles.systemNotice} role="note">
          <ShieldAlert className="size-5 shrink-0" aria-hidden="true" />
          <div>
            <strong>Role-aware access</strong>
            <p>
              Authentication, application permissions, and database policies
              work together to protect administrative operations.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="overview-heading" className="mt-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
              System overview
            </span>
            <h2
              id="overview-heading"
              className="mt-2 text-2xl font-bold tracking-tight"
            >
              Connection status
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Labels replace fabricated counts until real, authorized data sources
            are implemented.
          </p>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map(([label, value, description]) => (
            <div key={label} className={styles.statCard}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-5 text-xl font-bold">{value}</dd>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="modules-heading" className="mt-14">
        <div>
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
            Workspace modules
          </span>
          <h2
            id="modules-heading"
            className="mt-2 text-3xl font-bold tracking-tight"
          >
            Primary content modules
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Each destination preserves its existing workflow and persistence
            boundary. Site-wide marketing configuration is intentionally static.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {destinations.map(
            ({ title, description, href, icon: Icon }, index) => (
              <Card
                key={title}
                className={cn(
                  "group flex min-h-64 flex-col p-6",
                  styles.moduleCard,
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[0.56rem] text-muted-foreground">
                    M{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
                <Link
                  href={href}
                  aria-label={`Open ${title} admin module`}
                  className="focus-ring mt-auto inline-flex min-h-11 items-center gap-2 rounded-md pt-6 text-sm font-semibold"
                >
                  Open module{" "}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </Card>
            ),
          )}
        </div>
      </section>

      <section
        aria-labelledby="activity-heading"
        className="mt-14 grid gap-6 pb-8 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className={styles.activityPanel}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
                Recent activity
              </span>
              <h2
                id="activity-heading"
                className="mt-2 text-2xl font-bold tracking-tight"
              >
                Operational boundaries
              </h2>
            </div>
            <Clock3
              className="size-5 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <ol className="mt-8 space-y-0">
            {activity.map(([title, description], index) => (
              <li key={title} className={styles.activityItem}>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border bg-background">
                  <CircleDashed className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <span className="font-mono text-[0.55rem] text-muted-foreground">
                    STATE {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside
          aria-labelledby="next-boundary-heading"
          className={styles.boundaryPanel}
        >
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-primary-foreground/50">
            Security boundary
          </span>
          <h2
            id="next-boundary-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-primary-foreground"
          >
            Administration stays behind verified access.
          </h2>
          <p className="mt-5 text-sm leading-7 text-primary-foreground/65">
            Supabase Auth, refreshed sessions, protected routing, application
            roles, and Row Level Security form the access boundary for retained
            CMS operations.
          </p>
          <ButtonLink />
        </aside>
      </section>
    </div>
  );
}

function ButtonLink() {
  return (
    <Link
      href="/admin/login"
      className="focus-ring mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-primary-foreground px-4 text-sm font-semibold text-primary"
    >
      Review account access{" "}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export { AdminDashboard };
