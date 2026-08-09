import {
  Archive,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  Eye,
  FileInput,
  FilePlus2,
  LayoutTemplate,
  Link2Off,
  MessageSquareQuote,
  Pencil,
  RotateCcw,
  Search,
  ShieldAlert,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { cn } from "@/lib/utils";
import styles from "./admin-testimonials.module.css";

type SampleLabel =
  "Placeholder Preview" | "Sample Content" | "Internal Example";

interface TestimonialRow {
  readonly reviewer: string;
  readonly company: string;
  readonly status: "Review" | "Ready" | "Draft";
  readonly featured: "Planned" | "Available";
  readonly visibility: "Hidden";
  readonly label: SampleLabel;
}

const testimonials: readonly TestimonialRow[] = [
  {
    reviewer: "Sample Reviewer A",
    company: "Placeholder Company A",
    status: "Review",
    featured: "Planned",
    visibility: "Hidden",
    label: "Placeholder Preview",
  },
  {
    reviewer: "Sample Reviewer B",
    company: "Placeholder Company B",
    status: "Ready",
    featured: "Available",
    visibility: "Hidden",
    label: "Sample Content",
  },
  {
    reviewer: "Sample Reviewer C",
    company: "Placeholder Company C",
    status: "Draft",
    featured: "Planned",
    visibility: "Hidden",
    label: "Internal Example",
  },
  {
    reviewer: "Sample Reviewer D",
    company: "Placeholder Company D",
    status: "Review",
    featured: "Available",
    visibility: "Hidden",
    label: "Placeholder Preview",
  },
  {
    reviewer: "Sample Reviewer E",
    company: "Placeholder Company E",
    status: "Draft",
    featured: "Planned",
    visibility: "Hidden",
    label: "Sample Content",
  },
  {
    reviewer: "Sample Reviewer F",
    company: "Placeholder Company F",
    status: "Ready",
    featured: "Available",
    visibility: "Hidden",
    label: "Internal Example",
  },
  {
    reviewer: "Sample Reviewer G",
    company: "Placeholder Company G",
    status: "Review",
    featured: "Planned",
    visibility: "Hidden",
    label: "Placeholder Preview",
  },
  {
    reviewer: "Sample Reviewer H",
    company: "Placeholder Company H",
    status: "Draft",
    featured: "Available",
    visibility: "Hidden",
    label: "Sample Content",
  },
] as const;

const readiness = [
  [
    "Testimonials",
    "Configured",
    "Placeholder records demonstrate the interface",
  ],
  ["Review Queue", "Available", "Review states are represented, not connected"],
  ["Featured", "Ready", "Placement fields are prepared"],
  ["Visibility", "Configured", "Every sample remains hidden"],
  ["Moderation", "Planned", "No moderation logic exists"],
  ["Publishing", "Planned", "No publishing action exists"],
] as const;

const moderationWorkflow = [
  ["Submitted", "Receive feedback with source and consent context."],
  ["Review", "Check content quality and identify missing information."],
  [
    "Verification",
    "Confirm authenticity and permission through a future process.",
  ],
  ["Approval", "Record accountable approval before changing visibility."],
  ["Publish", "Release only after review, consent, and display checks."],
] as const;

const qualityChecks = [
  "Authenticity Review",
  "Grammar",
  "Length",
  "Service Mention",
  "Accessibility",
  "Formatting",
  "Consent",
  "Visibility",
] as const;

const placements = [
  "Homepage",
  "Service Pages",
  "Portfolio",
  "About",
  "Landing Pages",
] as const;

const integrations = [
  "Google Reviews",
  "Clutch",
  "Trustpilot",
  "LinkedIn",
  "Manual Entry",
] as const;

const nativeControlClass =
  "focus-ring h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs placeholder:text-muted-foreground";

function AdminTestimonials() {
  return (
    <div className="mx-auto max-w-[100rem]">
      <section
        aria-labelledby="testimonials-management-title"
        className={styles.hero}
      >
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <Badge>Testimonials CMS</Badge>
            <Badge variant="outline">Static preview</Badge>
          </div>
          <h1
            id="testimonials-management-title"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Testimonials Management
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Manage customer feedback, reviews, and featured testimonials. This
            interface previews the future CMS; creating, editing, approving, and
            publishing testimonials are not available in this sprint.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button type="button" disabled className="min-h-11">
              <FilePlus2 className="size-4" aria-hidden="true" />
              Add Testimonial
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled
              className="min-h-11"
            >
              <FileInput className="size-4" aria-hidden="true" />
              Import Reviews
            </Button>
          </div>
        </div>
        <div className={styles.heroNotice} role="note">
          <ShieldAlert className="size-5 shrink-0" aria-hidden="true" />
          <div>
            <strong>Testimonials shown here are placeholder examples.</strong>
            <p>
              Real management, moderation, verification, integrations, and
              publishing will be implemented in a future sprint.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="testimonial-readiness-heading" className="mt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className={styles.eyebrow}>Module readiness</span>
            <h2
              id="testimonial-readiness-heading"
              className={styles.sectionTitle}
            >
              Prepared without invented counts
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Qualitative states describe interface preparation only. They do not
            represent real feedback, moderation, or publication activity.
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

      <section aria-labelledby="testimonial-index-heading" className="mt-14">
        <span className={styles.eyebrow}>Placeholder index</span>
        <h2 id="testimonial-index-heading" className={styles.sectionTitle}>
          Sample records for interface review
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Every row uses fictional placeholder labels and remains hidden.
          Nothing below represents a real customer, company, review, or
          endorsement.
        </p>

        <div className={styles.filters} aria-label="Static testimonial filters">
          <div className={styles.searchField}>
            <label htmlFor="testimonial-search">Search</label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="testimonial-search"
                type="search"
                placeholder="Search samples"
                aria-describedby="testimonial-filter-notice"
                className={cn(nativeControlClass, "pl-10")}
              />
            </div>
          </div>
          <StaticSelect
            id="testimonial-status"
            label="Status"
            options={["All statuses", "Draft", "Review", "Ready"]}
          />
          <StaticSelect
            id="testimonial-featured"
            label="Featured"
            options={["All samples", "Available", "Planned"]}
          />
          <StaticSelect
            id="testimonial-rating"
            label="Rating"
            options={["All ratings", "Illustrative 5", "Illustrative 4"]}
          />
          <StaticSelect
            id="testimonial-source"
            label="Source"
            options={["All sources", "Placeholder", "Internal example"]}
          />
          <StaticSelect
            id="testimonial-sort"
            label="Sort"
            options={[
              "Configured order",
              "Reviewer label",
              "Status",
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
          <p id="testimonial-filter-notice">
            Filters are presentation-only and do not search, sort, reset, or
            query testimonial data.
          </p>
        </div>

        <div className={styles.indexLayout}>
          <div className={styles.tableFrame}>
            <table>
              <caption>
                Static placeholder testimonials management preview
              </caption>
              <thead>
                <tr>
                  <th scope="col">Reviewer</th>
                  <th scope="col">Company</th>
                  <th scope="col">Status</th>
                  <th scope="col">Featured</th>
                  <th scope="col">Visibility</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.reviewer}>
                    <th scope="row">
                      <span>{testimonial.reviewer}</span>
                      <Badge variant="outline">{testimonial.label}</Badge>
                    </th>
                    <td>{testimonial.company}</td>
                    <td>
                      <Badge variant="outline">{testimonial.status}</Badge>
                    </td>
                    <td>{testimonial.featured}</td>
                    <td>
                      <span className={styles.hiddenState}>
                        <span aria-hidden="true" />
                        {testimonial.visibility}
                      </span>
                    </td>
                    <td>Not connected</td>
                    <td>
                      <div className={styles.actions}>
                        <DisabledAction
                          icon={Eye}
                          label={`Preview ${testimonial.reviewer}, unavailable`}
                        />
                        <DisabledAction
                          icon={Pencil}
                          label={`Edit ${testimonial.reviewer}, unavailable`}
                        />
                        <DisabledAction
                          icon={Archive}
                          label={`Archive ${testimonial.reviewer}, unavailable`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside
            aria-labelledby="selected-testimonial-heading"
            className={styles.previewPanel}
          >
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary">Selected Testimonial</Badge>
              <MessageSquareQuote
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <div className={styles.sampleWarning}>
              <ShieldAlert aria-hidden="true" />
              <p>
                <strong>Placeholder Preview</strong>This is fictional sample
                content—not a customer testimonial.
              </p>
            </div>
            <h2 id="selected-testimonial-heading">Sample Reviewer A</h2>
            <p className={styles.previewRole}>
              Example Operations Lead · Placeholder Company A
            </p>
            <div
              className={styles.rating}
              aria-label="Illustrative rating, five out of five"
            >
              <span>Illustrative rating</span>
              <span>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} aria-hidden="true" />
                ))}
              </span>
            </div>
            <blockquote>
              “This placeholder quote demonstrates testimonial typography,
              reading length, and visual hierarchy. It is not feedback from a
              real client or organization.”
            </blockquote>
            <dl className={styles.previewDetails}>
              <PreviewDetail term="Reviewer" detail="Sample Reviewer A" />
              <PreviewDetail term="Company" detail="Placeholder Company A" />
              <PreviewDetail term="Role" detail="Example Operations Lead" />
              <PreviewDetail
                term="Summary"
                detail="Illustrative workflow feedback"
              />
              <PreviewDetail term="Related Service" detail="Web Development" />
              <PreviewDetail term="Display Status" detail="Hidden" />
              <PreviewDetail term="SEO Visibility" detail="Excluded" />
              <PreviewDetail term="Public Preview" detail="Unavailable" />
            </dl>
          </aside>
        </div>
      </section>

      <section className={styles.reviewGrid}>
        <div
          className={styles.workflowPanel}
          aria-labelledby="moderation-workflow-heading"
        >
          <span className={styles.eyebrow}>Moderation workflow</span>
          <h2 id="moderation-workflow-heading" className={styles.sectionTitle}>
            A future path from submission to display
          </h2>
          <ol className={styles.workflow}>
            {moderationWorkflow.map(([title, description], index) => (
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
        <div
          className={styles.qualityPanel}
          aria-labelledby="testimonial-quality-heading"
        >
          <span className={styles.inverseEyebrow}>Quality checklist</span>
          <h2 id="testimonial-quality-heading">Review before visibility</h2>
          <ul>
            {qualityChecks.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <strong>
                  <CheckCircle2 aria-hidden="true" />
                  Planned
                </strong>
              </li>
            ))}
          </ul>
          <p>
            Checklist states preview a future process. No testimonial has been
            authenticated, approved, or cleared for publication.
          </p>
        </div>
      </section>

      <section aria-labelledby="featured-placement-heading" className="mt-14">
        <span className={styles.eyebrow}>Featured placement preview</span>
        <h2 id="featured-placement-heading" className={styles.sectionTitle}>
          Potential display contexts
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          These frames demonstrate future placement controls only. No
          placeholder testimonial appears on a public page.
        </p>
        <ul className={styles.placementGrid}>
          {placements.map((placement, index) => (
            <li key={placement}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <LayoutTemplate aria-hidden="true" />
              <h3>{placement}</h3>
              <Badge variant="outline">Preview Only</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="future-integrations-heading"
        className="mt-14 pb-8"
      >
        <div className={styles.integrationsPanel}>
          <div className={styles.integrationsIntro}>
            <span className={styles.eyebrow}>Future integrations</span>
            <h2
              id="future-integrations-heading"
              className={styles.sectionTitle}
            >
              Disconnected by design
            </h2>
            <p>
              External review sources require API access, consent handling,
              verification rules, attribution, and operational ownership before
              integration.
            </p>
          </div>
          <ul className={styles.integrationGrid}>
            {integrations.map((integration) => (
              <li key={integration}>
                <div>
                  <CircleUserRound aria-hidden="true" />
                  <h3>{integration}</h3>
                </div>
                <div>
                  <Badge variant="warning">Planned</Badge>
                  <Badge variant="outline">Not Connected</Badge>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.integrationNotice} role="note">
            <Link2Off aria-hidden="true" />
            <p>
              No provider connection, partnership, certification, imported
              review, or moderation workflow is implied.
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
          aria-describedby="testimonial-filter-notice"
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
}: {
  readonly term: string;
  readonly detail: string;
}) {
  return (
    <div>
      <dt>{term}</dt>
      <dd>{detail}</dd>
    </div>
  );
}

export { AdminTestimonials };
