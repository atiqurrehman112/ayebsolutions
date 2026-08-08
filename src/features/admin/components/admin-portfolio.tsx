import {
  Archive,
  CheckCircle2,
  ChevronDown,
  FileCheck2,
  FileSearch,
  FolderKanban,
  Pencil,
  RotateCcw,
  Search,
  ShieldAlert,
  UploadCloud,
} from "lucide-react";

import { Badge } from "@/components/ui/status";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import styles from "./admin-portfolio.module.css";

interface PortfolioRow {
  readonly project: string;
  readonly category: string;
  readonly status:
    "Prototype" | "Demo" | "Internal Concept" | "Experimental" | "Case Study";
  readonly visibility: "Public";
  readonly slug: string;
}

const portfolioRows: readonly PortfolioRow[] = [
  {
    project: "School Operations Portal",
    category: "SaaS",
    status: "Prototype",
    visibility: "Public",
    slug: "school-operations-portal",
  },
  {
    project: "AI Lead Routing Workflow",
    category: "AI Automation",
    status: "Demo",
    visibility: "Public",
    slug: "ai-lead-routing-workflow",
  },
  {
    project: "Auction Marketplace Architecture",
    category: "Web Development",
    status: "Internal Concept",
    visibility: "Public",
    slug: "auction-marketplace-architecture",
  },
  {
    project: "Support Knowledge Assistant",
    category: "AI Automation",
    status: "Experimental",
    visibility: "Public",
    slug: "support-knowledge-assistant",
  },
  {
    project: "Commerce Analytics Workspace",
    category: "Dashboard",
    status: "Demo",
    visibility: "Public",
    slug: "commerce-analytics-workspace",
  },
  {
    project: "SaaS CRM Workspace",
    category: "SaaS",
    status: "Prototype",
    visibility: "Public",
    slug: "saas-crm-workspace",
  },
  {
    project: "Accessible Booking Experience",
    category: "UI/UX",
    status: "Case Study",
    visibility: "Public",
    slug: "accessible-booking-experience",
  },
  {
    project: "API Operations Console",
    category: "API Integration",
    status: "Experimental",
    visibility: "Public",
    slug: "api-operations-console",
  },
] as const;

const statistics = [
  ["Projects", "Configured", "Eight public project records represented"],
  ["Categories", "Available", "Static category labels are present"],
  ["Drafts", "Planned", "Draft persistence is not connected"],
  ["Published", "Configured", "Public routes exist outside this CMS"],
  ["Featured", "Ready", "Presentation field planned for integration"],
  ["Technologies", "Available", "Static technology context is represented"],
] as const;

const technologies = ["Next.js", "TypeScript", "PostgreSQL", "Prisma"] as const;

const workflow = [
  [
    "Draft",
    "Prepare content, disclosure, project structure, and supporting metadata.",
  ],
  [
    "Review",
    "Review accuracy, accessibility, responsive behavior, and content integrity.",
  ],
  [
    "Approval",
    "Record accountable approval before a visibility or publishing decision.",
  ],
  [
    "Publish",
    "Release through a controlled workflow with production verification.",
  ],
] as const;

const seoChecklist = [
  ["Meta title", "Configured"],
  ["Description", "Configured"],
  ["Open Graph", "Ready"],
  ["Schema", "Ready"],
  ["Slug", "Available"],
  ["Canonical", "Configured"],
  ["Alt text", "Planned"],
  ["Performance", "Ready"],
] as const;

const nativeControlClass =
  "focus-ring h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";

function AdminPortfolio() {
  return (
    <div className="mx-auto max-w-[100rem]">
      <section
        aria-labelledby="portfolio-management-title"
        className={styles.hero}
      >
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <Badge>Portfolio CMS</Badge>
            <Badge variant="outline">Static preview</Badge>
          </div>
          <h1
            id="portfolio-management-title"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Portfolio Management
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Manage portfolio projects shown on the public website. This preview
            demonstrates the future CMS experience; no information is editable
            in this sprint.
          </p>
        </div>
        <div className={styles.heroNotice} role="note">
          <ShieldAlert className="size-5 shrink-0" aria-hidden="true" />
          <div>
            <strong>Portfolio editing is disabled in this preview.</strong>
            <p>
              Database integration arrives later. Controls below are
              intentionally static or disabled.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="portfolio-status-heading" className="mt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
              Portfolio status
            </span>
            <h2
              id="portfolio-status-heading"
              className="mt-2 text-2xl font-bold tracking-tight"
            >
              CMS readiness, without invented counts
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Labels describe interface readiness only. They do not represent
            database records or publishing activity.
          </p>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {statistics.map(([label, value, description]) => (
            <div key={label} className={styles.statCard}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-5 text-lg font-bold">{value}</dd>
              <p className="mt-2 text-[0.68rem] leading-5 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="portfolio-index-heading" className="mt-14">
        <div>
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
            Project index
          </span>
          <h2
            id="portfolio-index-heading"
            className="mt-2 text-3xl font-bold tracking-tight"
          >
            Configured public portfolio records
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            Rows reflect the existing public project labels. Last-updated data
            and management actions remain disconnected.
          </p>
        </div>

        <div className={styles.filters} aria-label="Static portfolio filters">
          <div className={styles.searchField}>
            <label htmlFor="portfolio-search">Search</label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="portfolio-search"
                type="search"
                placeholder="Search projects"
                aria-describedby="filter-notice"
                className={cn(nativeControlClass, "pl-10")}
              />
            </div>
          </div>
          <StaticSelect
            id="portfolio-category"
            label="Category"
            options={[
              "All categories",
              "SaaS",
              "AI Automation",
              "Web Development",
              "UI/UX",
              "API Integration",
            ]}
          />
          <StaticSelect
            id="portfolio-status"
            label="Status"
            options={[
              "All statuses",
              "Prototype",
              "Demo",
              "Internal Concept",
              "Experimental",
              "Case Study",
            ]}
          />
          <StaticSelect
            id="portfolio-sort"
            label="Sort"
            options={["Configured order", "Project name", "Category", "Status"]}
          />
          <Button
            type="button"
            variant="outline"
            disabled
            className="h-11 self-end"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset
          </Button>
          <p id="filter-notice" className="sm:col-span-2 lg:col-span-5">
            Filters are presentation-only and do not search, sort, reset, or
            query data.
          </p>
        </div>

        <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className={styles.tableFrame}>
            <table>
              <caption>Static portfolio project management preview</caption>
              <thead>
                <tr>
                  <th scope="col">Project</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Visibility</th>
                  <th scope="col">Last Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolioRows.map((project) => (
                  <tr key={project.slug}>
                    <th scope="row">
                      <span>{project.project}</span>
                      <code>/{project.slug}</code>
                    </th>
                    <td>{project.category}</td>
                    <td>
                      <Badge variant="outline">{project.status}</Badge>
                    </td>
                    <td>
                      <span className={styles.visibility}>
                        <span aria-hidden="true" />
                        {project.visibility}
                      </span>
                    </td>
                    <td>Not connected</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          disabled
                          aria-label={`View ${project.project}, unavailable`}
                        >
                          <FileSearch aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          disabled
                          aria-label={`Edit ${project.project}, unavailable`}
                        >
                          <Pencil aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          disabled
                          aria-label={`Archive ${project.project}, unavailable`}
                        >
                          <Archive aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside
            aria-labelledby="project-preview-heading"
            className={styles.previewPanel}
          >
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary">Selected Project</Badge>
              <FolderKanban
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <h2
              id="project-preview-heading"
              className="mt-5 text-2xl font-bold tracking-tight"
            >
              School Operations Portal
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Internal product prototype exploring school operations, structured
              permissions, and connected administrative workflows.
            </p>
            <dl className={styles.previewDetails}>
              <div>
                <dt>Current Status</dt>
                <dd>Prototype</dd>
              </div>
              <div>
                <dt>Visibility</dt>
                <dd>Public</dd>
              </div>
              <div>
                <dt>SEO Ready</dt>
                <dd>Configured</dd>
              </div>
              <div>
                <dt>Slug</dt>
                <dd>
                  <code>school-operations-portal</code>
                </dd>
              </div>
              <div>
                <dt>URL Preview</dt>
                <dd>
                  <code>/portfolio/school-operations-portal</code>
                </dd>
              </div>
            </dl>
            <div className="mt-7 border-t pt-6">
              <h3 className="text-sm font-semibold">Technologies</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <li key={technology}>
                    <Badge variant="outline">{technology}</Badge>
                  </li>
                ))}
              </ul>
            </div>
            <Button type="button" disabled className="mt-7 w-full">
              Preview selection unavailable
            </Button>
          </aside>
        </div>
      </section>

      <section aria-labelledby="media-upload-heading" className="mt-14">
        <div className={styles.uploadArea}>
          <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <UploadCloud className="size-6" aria-hidden="true" />
          </span>
          <h2
            id="media-upload-heading"
            className="mt-6 text-2xl font-bold tracking-tight"
          >
            Drop project assets here
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            Future media uploads will support governed project assets,
            descriptions, alternative text, usage context, and delivery state.
          </p>
          <Badge variant="outline" className="mt-6">
            Not available yet
          </Badge>
        </div>
      </section>

      <section className="mt-14 grid gap-6 pb-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          className={styles.workflowPanel}
          aria-labelledby="publishing-workflow-heading"
        >
          <div>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
              Publishing workflow
            </span>
            <h2
              id="publishing-workflow-heading"
              className="mt-2 text-3xl font-bold tracking-tight"
            >
              A controlled path to public visibility
            </h2>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {workflow.map(([title, description], index) => (
              <li key={title} className={styles.workflowStep}>
                <span className="font-mono text-[0.56rem] text-muted-foreground">
                  STEP {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div
          className={styles.seoPanel}
          aria-labelledby="seo-checklist-heading"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-primary-foreground/50">
                SEO checklist
              </span>
              <h2
                id="seo-checklist-heading"
                className="mt-2 text-3xl font-bold tracking-tight text-primary-foreground"
              >
                Publication foundations
              </h2>
            </div>
            <FileCheck2
              className="size-6 text-primary-foreground/60"
              aria-hidden="true"
            />
          </div>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-2">
            {seoChecklist.map(([label, status]) => (
              <li
                key={label}
                className="flex items-center justify-between gap-3 bg-primary p-4 text-sm"
              >
                <span className="text-primary-foreground/65">{label}</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-primary-foreground">
                  <CheckCircle2 className="size-3.5" aria-hidden="true" />
                  {status}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-6 text-primary-foreground/55">
            These labels describe the existing public presentation or planned
            CMS field—not a database validation result.
          </p>
        </div>
      </section>
    </div>
  );
}

function StaticSelect({
  id,
  label,
  options,
}: {
  readonly id: string;
  readonly label: string;
  readonly options: readonly string[];
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <select
          id={id}
          defaultValue={options[0]}
          aria-describedby="filter-notice"
          className={cn(nativeControlClass, "appearance-none pr-10")}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export { AdminPortfolio };
