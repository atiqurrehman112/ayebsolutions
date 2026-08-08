import {
  Archive,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileInput,
  FilePlus2,
  FileText,
  Link2,
  Megaphone,
  Pencil,
  RotateCcw,
  Search,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { cn } from "@/lib/utils";
import styles from "./admin-services.module.css";

type ServiceVisibility = "Public" | "Planned";

interface ServiceRow {
  readonly title: string;
  readonly category: string;
  readonly visibility: ServiceVisibility;
  readonly seo: "Prepared" | "Planned";
  readonly slug: string;
}

const services: readonly ServiceRow[] = [
  {
    title: "Web Development",
    category: "Engineering",
    visibility: "Public",
    seo: "Prepared",
    slug: "web-development",
  },
  {
    title: "AI Automation",
    category: "Automation",
    visibility: "Public",
    seo: "Prepared",
    slug: "ai-automation",
  },
  {
    title: "Custom SaaS Development",
    category: "Product Development",
    visibility: "Public",
    seo: "Prepared",
    slug: "custom-saas",
  },
  {
    title: "UI/UX Design",
    category: "Design",
    visibility: "Public",
    seo: "Prepared",
    slug: "ui-ux-design",
  },
  {
    title: "API Integration",
    category: "Systems",
    visibility: "Public",
    seo: "Prepared",
    slug: "api-integration",
  },
  {
    title: "Maintenance & Support",
    category: "Operations",
    visibility: "Public",
    seo: "Prepared",
    slug: "maintenance-support",
  },
  {
    title: "Consulting & Strategy",
    category: "Advisory",
    visibility: "Planned",
    seo: "Planned",
    slug: "consulting-strategy",
  },
] as const;

const readiness = [
  ["Services", "Configured", "Public and planned service records represented"],
  ["Categories", "Available", "Service groupings are prepared"],
  ["SEO", "Ready", "Publication fields are represented"],
  ["Visibility", "Configured", "Public and planned states remain explicit"],
  ["Publishing", "Planned", "No publishing workflow is connected"],
  ["Content Quality", "Ready", "Review criteria are visible"],
] as const;

const structure = [
  "Hero",
  "Benefits",
  "Features",
  "Process",
  "FAQ",
  "CTA",
] as const;

const workflow = [
  ["Planning", "Define audience, scope, intent, and the service relationship."],
  ["Writing", "Develop useful, specific copy around the service and process."],
  ["Review", "Check accuracy, clarity, consistency, and accessibility."],
  ["SEO", "Prepare metadata, headings, links, and structured context."],
  ["Approval", "Record accountable review before changing visibility."],
  ["Publish", "Release through a controlled and verified workflow."],
] as const;

const seoChecks = [
  "Meta Title",
  "Meta Description",
  "Canonical",
  "Open Graph",
  "Twitter",
  "Schema",
  "Headings",
  "Internal Links",
  "Accessibility",
  "Performance",
] as const;

const qualityChecks = [
  "Clear Value Proposition",
  "Unique Copy",
  "Proper Headings",
  "Service CTA",
  "Internal Linking",
  "FAQ Included",
  "Responsive Layout",
  "Accessibility Verified",
] as const;

const relationships = [
  ["Primary Service", "Web Development", "Current content record"],
  ["Related Services", "UI/UX + API Integration", "Contextual pathways"],
  ["Blog Articles", "Relevant insights", "Editorial support"],
  ["Portfolio Projects", "Related work", "Delivery context"],
  ["Contact CTA", "Book Consultation", "Conversion pathway"],
] as const;

const nativeControlClass =
  "focus-ring h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs placeholder:text-muted-foreground";

function AdminServices() {
  return (
    <div className="mx-auto max-w-[100rem]">
      <section
        aria-labelledby="services-management-title"
        className={styles.hero}
      >
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <Badge>Services CMS</Badge>
            <Badge variant="outline">Static preview</Badge>
          </div>
          <h1
            id="services-management-title"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Services Management
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Manage the services displayed across the public website. This
            interface previews the future CMS; editing, publishing, and
            synchronization are not available in this sprint.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button type="button" disabled className="min-h-11">
              <FilePlus2 className="size-4" aria-hidden="true" />
              Add Service
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled
              className="min-h-11"
            >
              <FileInput className="size-4" aria-hidden="true" />
              Import Services
            </Button>
          </div>
        </div>
        <div className={styles.heroNotice} role="note">
          <ShieldAlert className="size-5 shrink-0" aria-hidden="true" />
          <div>
            <strong>Service management is currently a preview.</strong>
            <p>
              Database integration, publishing workflows, and live editing will
              be implemented in a future sprint.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="service-readiness-heading" className="mt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className={styles.eyebrow}>Service readiness</span>
            <h2 id="service-readiness-heading" className={styles.sectionTitle}>
              Structured for future management
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Qualitative labels describe interface preparation only—not database
            totals, publishing activity, or synchronization state.
          </p>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {readiness.map(([label, value, description]) => (
            <div key={label} className={styles.statCard}>
              <dt>{label}</dt>
              <dd>{value}</dd>
              <p>{description}</p>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="services-index-heading" className="mt-14">
        <span className={styles.eyebrow}>Service index</span>
        <h2 id="services-index-heading" className={styles.sectionTitle}>
          Public and planned service records
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Six records map to existing public detail pages. Consulting &amp;
          Strategy remains explicitly planned and is not presented as a live
          route.
        </p>

        <div className={styles.filters} aria-label="Static service filters">
          <div className={styles.searchField}>
            <label htmlFor="service-search">Search</label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="service-search"
                type="search"
                placeholder="Search services"
                aria-describedby="service-filter-notice"
                className={cn(nativeControlClass, "pl-10")}
              />
            </div>
          </div>
          <StaticSelect
            id="service-category"
            label="Category"
            options={[
              "All categories",
              "Engineering",
              "Automation",
              "Design",
              "Systems",
            ]}
          />
          <StaticSelect
            id="service-status"
            label="Status"
            options={["All statuses", "Configured", "Planned"]}
          />
          <StaticSelect
            id="service-featured"
            label="Featured"
            options={["All services", "Featured", "Standard"]}
          />
          <StaticSelect
            id="service-sort"
            label="Sort"
            options={[
              "Configured order",
              "Service name",
              "Category",
              "Visibility",
            ]}
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
          <p id="service-filter-notice">
            Filters are presentation-only and do not search, sort, reset, or
            query service records.
          </p>
        </div>

        <div className={styles.indexLayout}>
          <div className={styles.tableFrame}>
            <table>
              <caption>Static services management preview</caption>
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Category</th>
                  <th scope="col">Visibility</th>
                  <th scope="col">SEO</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.slug}>
                    <th scope="row">
                      <span>{service.title}</span>
                      <code>/{service.slug}</code>
                    </th>
                    <td>{service.category}</td>
                    <td>
                      <span
                        className={cn(
                          styles.state,
                          service.visibility === "Planned" && styles.planned,
                        )}
                      >
                        <span aria-hidden="true" />
                        {service.visibility}
                      </span>
                    </td>
                    <td>
                      <Badge variant="outline">{service.seo}</Badge>
                    </td>
                    <td>Not connected</td>
                    <td>
                      <div className={styles.actions}>
                        <DisabledAction
                          icon={Eye}
                          label={`Preview ${service.title}, unavailable`}
                        />
                        <DisabledAction
                          icon={Pencil}
                          label={`Edit ${service.title}, unavailable`}
                        />
                        <DisabledAction
                          icon={Archive}
                          label={`Archive ${service.title}, unavailable`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside
            aria-labelledby="service-preview-heading"
            className={styles.previewPanel}
          >
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary">Selected Service</Badge>
              <Megaphone
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <h2
              id="service-preview-heading"
              className="mt-5 text-2xl font-bold tracking-tight"
            >
              Web Development
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Custom websites and applications designed around business goals,
              user needs, performance, accessibility, and maintainable delivery.
            </p>
            <dl className={styles.previewDetails}>
              <PreviewDetail term="Category" detail="Engineering" />
              <PreviewDetail
                term="Target Audience"
                detail="Organizations planning a custom web product"
              />
              <PreviewDetail term="Primary CTA" detail="Book Consultation" />
              <PreviewDetail
                term="Related Services"
                detail="UI/UX Design, API Integration"
              />
              <PreviewDetail term="SEO Status" detail="Prepared" />
              <PreviewDetail term="Slug" detail="web-development" code />
              <PreviewDetail
                term="Canonical URL"
                detail="/services/web-development"
                code
              />
              <PreviewDetail term="Open Graph" detail="Prepared" />
              <PreviewDetail term="Schema" detail="Prepared" />
              <PreviewDetail
                term="Public URL Preview"
                detail="/services/web-development"
                code
              />
            </dl>
          </aside>
        </div>
      </section>

      <section aria-labelledby="structure-preview-heading" className="mt-14">
        <div className={styles.structurePanel}>
          <div className={styles.structureHeader}>
            <div>
              <Badge variant="warning">Preview Only</Badge>
              <span>Content editing is disabled.</span>
            </div>
            <FileText
              className="size-5 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div className={styles.structureCanvas}>
            <div>
              <span className={styles.eyebrow}>Service structure preview</span>
              <h2
                id="structure-preview-heading"
                className={styles.sectionTitle}
              >
                A reusable conversion narrative
              </h2>
              <p>
                Each block has a clear purpose, reading order, and relationship
                to the service promise.
              </p>
            </div>
            <ol className={styles.structureFlow}>
              {structure.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                  {index < structure.length - 1 ? (
                    <ArrowRight aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.reviewGrid}>
        <div
          className={styles.workflowPanel}
          aria-labelledby="service-workflow-heading"
        >
          <span className={styles.eyebrow}>Publishing workflow</span>
          <h2 id="service-workflow-heading" className={styles.sectionTitle}>
            Deliberate review before visibility
          </h2>
          <ol className={styles.workflow}>
            {workflow.map(([title, description], index) => (
              <li key={title}>
                <span className={styles.stepNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.seoPanel} aria-labelledby="service-seo-heading">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={styles.inverseEyebrow}>SEO checklist</span>
              <h2 id="service-seo-heading">Publication foundations</h2>
            </div>
            <Sparkles
              className="size-6 text-primary-foreground/60"
              aria-hidden="true"
            />
          </div>
          <ul>
            {seoChecks.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <strong>
                  <CheckCircle2 aria-hidden="true" />
                  Prepared
                </strong>
              </li>
            ))}
          </ul>
          <p>
            Checklist labels describe preview fields, not an automated audit or
            publishing result.
          </p>
        </div>
      </section>

      <section aria-labelledby="service-quality-heading" className="mt-14">
        <span className={styles.eyebrow}>Content quality</span>
        <h2 id="service-quality-heading" className={styles.sectionTitle}>
          Review criteria for useful service content
        </h2>
        <ul className={styles.qualityGrid}>
          {qualityChecks.map((item) => (
            <li key={item}>
              <CheckCircle2 aria-hidden="true" />
              <span>{item}</span>
              <Badge variant="outline">Ready</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="service-relationships-heading"
        className="mt-14 pb-8"
      >
        <div className={styles.relationshipPanel}>
          <div className={styles.relationshipIntro}>
            <span className={styles.eyebrow}>Service relationships</span>
            <h2
              id="service-relationships-heading"
              className={styles.sectionTitle}
            >
              One service, connected content paths
            </h2>
            <p>
              This static map previews how a future CMS could make related
              content visible without implying a live data relationship.
            </p>
          </div>
          <div className={styles.relationshipMap}>
            {relationships.map(([type, label, context], index) => (
              <div key={type} className={styles.relationshipNode}>
                <span>{type}</span>
                <strong>{label}</strong>
                <small>{context}</small>
                {index < relationships.length - 1 ? (
                  <ArrowDown aria-hidden="true" />
                ) : null}
              </div>
            ))}
          </div>
          <div className={styles.relationshipLegend} role="note">
            <Link2 aria-hidden="true" />
            <p>
              <strong>Relationship preview only.</strong> No content graph,
              synchronized record, or database relationship exists in this
              sprint.
            </p>
          </div>
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
          aria-describedby="service-filter-notice"
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

function DisabledAction({
  icon: Icon,
  label,
}: {
  readonly icon: typeof Eye;
  readonly label: string;
}) {
  return (
    <button type="button" disabled aria-label={label}>
      <Icon aria-hidden="true" />
    </button>
  );
}

function PreviewDetail({
  term,
  detail,
  code = false,
}: {
  readonly term: string;
  readonly detail: string;
  readonly code?: boolean;
}) {
  return (
    <div>
      <dt>{term}</dt>
      <dd>{code ? <code>{detail}</code> : detail}</dd>
    </div>
  );
}

export { AdminServices };
