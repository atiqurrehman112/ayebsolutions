import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CircleDashed,
  Clock3,
  FolderKanban,
  ImageIcon,
  Mail,
  MessageSquareQuote,
  Settings,
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
    title: "Services",
    description: "Service-page content, capabilities, FAQs, and positioning.",
    href: "/admin/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "Testimonials",
    description:
      "Future review workflow for approved, attributable customer evidence.",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  {
    title: "Leads",
    description:
      "Future inquiry intake, qualification context, ownership, and status.",
    href: "/admin/leads",
    icon: Mail,
  },
  {
    title: "Media Library",
    description:
      "Future managed assets, metadata, usage context, and delivery state.",
    href: "/admin/media",
    icon: ImageIcon,
  },
  {
    title: "Settings",
    description:
      "Future organization, navigation, SEO, integration, and system settings.",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Users",
    description:
      "Future identities, roles, permissions, access review, and audit context.",
    href: "/admin/users",
    icon: Users,
  },
] as const;

const statistics = [
  ["Portfolio Projects", "No data", "Repository not connected"],
  ["Articles", "Not connected", "CMS integration pending"],
  ["Services", "Pending integration", "Static public content only"],
  ["Messages", "No data", "Lead capture not connected"],
] as const;

const activity = [
  [
    "CMS initialized",
    "Dashboard presentation foundation is available; content persistence is not.",
  ],
  [
    "Content pending",
    "Editable content models and publishing workflows remain deferred.",
  ],
  [
    "Media library pending",
    "Upload, storage, transformation, and asset governance are not connected.",
  ],
  [
    "Authentication pending",
    "Identity, session, authorization, and protected routing remain deferred.",
  ],
] as const;

function AdminDashboard() {
  return (
    <div className="mx-auto max-w-[100rem]">
      <section aria-labelledby="admin-dashboard-title" className={styles.hero}>
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Admin foundation</Badge>
            <Badge variant="outline">Static preview</Badge>
          </div>
          <h1
            id="admin-dashboard-title"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Content operations, clearly staged for what comes next.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            This dashboard establishes the reusable administrative workspace.
            Authentication, CMS persistence, statistics, media, leads, and
            publishing workflows are intentionally not connected in Sprint 7A.
          </p>
        </div>
        <div className={styles.systemNotice} role="note">
          <ShieldAlert className="size-5 shrink-0" aria-hidden="true" />
          <div>
            <strong>Foundation only</strong>
            <p>
              Nothing here proves identity, protects a route, reads a database,
              or changes public content.
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
            Future content surfaces
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Each destination is a planned placeholder route. Sprint 7A provides
            navigation architecture only, not CRUD screens or persistence.
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
                  aria-label={`Open planned ${title} admin route`}
                  className="focus-ring mt-auto inline-flex min-h-11 items-center gap-2 rounded-md pt-6 text-sm font-semibold"
                >
                  Open placeholder{" "}
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
                Foundation timeline
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
            Authentication comes before administration.
          </h2>
          <p className="mt-5 text-sm leading-7 text-primary-foreground/65">
            A future sprint must establish identity, session handling,
            authorization, protected routing, credential policy, audit context,
            and secure recovery before this workspace can control data.
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
      Review login preview{" "}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export { AdminDashboard };
