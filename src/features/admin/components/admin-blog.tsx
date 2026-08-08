import {
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileInput,
  FilePlus2,
  FileText,
  Pencil,
  RotateCcw,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { cn } from "@/lib/utils";
import styles from "./admin-blog.module.css";

type ArticleStatus = "Draft" | "Review" | "Ready";

interface ArticleRow {
  readonly title: string;
  readonly category: string;
  readonly status: ArticleStatus;
  readonly readingTime: string;
  readonly seo: "Prepared";
  readonly slug: string;
}

const articles: readonly ArticleRow[] = [
  {
    title: "Why Custom Software Beats Off-the-Shelf Tools",
    category: "Custom Software",
    status: "Ready",
    readingTime: "9 minute read",
    seo: "Prepared",
    slug: "why-custom-software-beats-off-the-shelf-tools",
  },
  {
    title: "How AI Automation Saves Business Hours",
    category: "AI Automation",
    status: "Review",
    readingTime: "8 minute read",
    seo: "Prepared",
    slug: "how-ai-automation-saves-business-hours",
  },
  {
    title: "API Integration Best Practices",
    category: "API Integration",
    status: "Ready",
    readingTime: "10 minute read",
    seo: "Prepared",
    slug: "api-integration-best-practices",
  },
  {
    title: "Designing Accessible Web Applications",
    category: "Accessibility",
    status: "Review",
    readingTime: "9 minute read",
    seo: "Prepared",
    slug: "designing-accessible-web-applications",
  },
  {
    title: "Choosing the Right Tech Stack",
    category: "Software Architecture",
    status: "Draft",
    readingTime: "8 minute read",
    seo: "Prepared",
    slug: "choosing-the-right-tech-stack",
  },
  {
    title: "Building Scalable SaaS Products",
    category: "Custom SaaS",
    status: "Draft",
    readingTime: "10 minute read",
    seo: "Prepared",
    slug: "building-scalable-saas-products",
  },
  {
    title: "Improving Website Performance",
    category: "Web Performance",
    status: "Ready",
    readingTime: "8 minute read",
    seo: "Prepared",
    slug: "improving-website-performance",
  },
  {
    title: "Planning a Successful Digital Project",
    category: "Project Strategy",
    status: "Review",
    readingTime: "8 minute read",
    seo: "Prepared",
    slug: "planning-a-successful-digital-project",
  },
] as const;

const readiness = [
  ["Articles", "Configured", "Public article records are represented"],
  ["Drafts", "Available", "Editorial states are prepared for integration"],
  ["Categories", "Configured", "Topic labels support future organization"],
  ["SEO", "Ready", "Publication fields are represented"],
  ["Editorial Review", "Planned", "Approval behavior is not connected"],
  ["Publishing", "Planned", "No publishing action exists in this preview"],
] as const;

const workflow = [
  ["Idea", "Capture the audience need, question, and useful outcome."],
  ["Outline", "Shape a logical reading path before writing detail."],
  ["Draft", "Develop original guidance with clear supporting context."],
  ["Review", "Check accuracy, clarity, accessibility, and editorial tone."],
  ["SEO", "Prepare discoverability fields without distorting the content."],
  ["Publish", "Release only after accountable review and verification."],
] as const;

const seoChecks = [
  "Title",
  "Description",
  "Keywords",
  "Canonical",
  "Open Graph",
  "Twitter",
  "Schema",
  "Headings",
  "Internal Links",
  "Accessibility",
] as const;

const qualityChecks = [
  "Readable structure",
  "Proper headings",
  "Unique content",
  "Clear CTA",
  "Related services",
  "FAQ included",
  "Semantic HTML",
  "Performance friendly",
] as const;

const keywords = [
  "custom software",
  "software planning",
  "workflow fit",
  "digital transformation",
] as const;

const nativeControlClass =
  "focus-ring h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs placeholder:text-muted-foreground";

function AdminBlog() {
  return (
    <div className="mx-auto max-w-[100rem]">
      <section aria-labelledby="blog-management-title" className={styles.hero}>
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <Badge>Editorial CMS</Badge>
            <Badge variant="outline">Static preview</Badge>
          </div>
          <h1
            id="blog-management-title"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Blog Management
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Manage articles, drafts, editorial workflow, and publishing
            readiness. This interface is a static CMS preview; editing and
            publishing are not available in this sprint.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button type="button" disabled className="min-h-11">
              <FilePlus2 className="size-4" aria-hidden="true" />
              New Article
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled
              className="min-h-11"
            >
              <FileInput className="size-4" aria-hidden="true" />
              Import Content
            </Button>
          </div>
        </div>
        <div className={styles.heroNotice} role="note">
          <ShieldAlert className="size-5 shrink-0" aria-hidden="true" />
          <div>
            <strong>Content management is disabled in this preview.</strong>
            <p>
              Database integration and publishing workflows arrive in a later
              sprint.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="blog-readiness-heading" className="mt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className={styles.eyebrow}>Editorial readiness</span>
            <h2 id="blog-readiness-heading" className={styles.sectionTitle}>
              Qualitative states, not invented counts
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            These states describe interface preparation only. They do not
            represent database records, reviews, or publishing activity.
          </p>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {readiness.map(([label, value, description]) => (
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

      <section aria-labelledby="article-index-heading" className="mt-14">
        <span className={styles.eyebrow}>Article index</span>
        <h2 id="article-index-heading" className={styles.sectionTitle}>
          Public editorial records
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Article identity and reading context mirror the public Insights
          library. Workflow states below demonstrate the future CMS only.
        </p>

        <div className={styles.filters} aria-label="Static article filters">
          <div className={styles.searchField}>
            <label htmlFor="article-search">Search</label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="article-search"
                type="search"
                placeholder="Search articles"
                aria-describedby="article-filter-notice"
                className={cn(nativeControlClass, "pl-10")}
              />
            </div>
          </div>
          <StaticSelect
            id="article-category"
            label="Category"
            options={[
              "All categories",
              "AI Automation",
              "Custom SaaS",
              "API Integration",
            ]}
          />
          <StaticSelect
            id="article-status"
            label="Status"
            options={["All statuses", "Draft", "Review", "Ready"]}
          />
          <StaticSelect
            id="article-author"
            label="Author"
            options={["All authors", "Ayeb Solutions"]}
          />
          <StaticSelect
            id="article-sort"
            label="Sort"
            options={["Configured order", "Title", "Category", "Status"]}
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
          <p id="article-filter-notice">
            Filters are presentation-only and do not search, sort, reset, or
            query content.
          </p>
        </div>

        <div className={styles.indexLayout}>
          <div className={styles.tableFrame}>
            <table>
              <caption>Static article management preview</caption>
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Reading Time</th>
                  <th scope="col">SEO</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.slug}>
                    <th scope="row">
                      <span>{article.title}</span>
                      <code>/{article.slug}</code>
                    </th>
                    <td>{article.category}</td>
                    <td>
                      <Badge variant="outline">{article.status}</Badge>
                    </td>
                    <td>{article.readingTime}</td>
                    <td>
                      <span className={styles.prepared}>
                        <span aria-hidden="true" />
                        {article.seo}
                      </span>
                    </td>
                    <td>Not connected</td>
                    <td>
                      <div className={styles.actions}>
                        <DisabledAction
                          icon={Eye}
                          label={`Preview ${article.title}, unavailable`}
                        />
                        <DisabledAction
                          icon={Pencil}
                          label={`Edit ${article.title}, unavailable`}
                        />
                        <DisabledAction
                          icon={Send}
                          label={`Publish ${article.title}, unavailable`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside
            aria-labelledby="article-preview-heading"
            className={styles.previewPanel}
          >
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary">Selected Article</Badge>
              <BookOpenCheck
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <h2
              id="article-preview-heading"
              className="mt-5 text-2xl font-bold tracking-tight"
            >
              Why Custom Software Beats Off-the-Shelf Tools
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              A practical framework for comparing workflow fit, ownership,
              integration needs, operating cost, and long-term change.
            </p>
            <dl className={styles.previewDetails}>
              <PreviewDetail term="Category" detail="Custom Software" />
              <PreviewDetail term="Reading Time" detail="9 minute read" />
              <PreviewDetail term="Meta Title" detail="Prepared" />
              <PreviewDetail term="Meta Description" detail="Prepared" />
              <PreviewDetail term="Canonical" detail="Configured" />
              <PreviewDetail term="Open Graph" detail="Prepared" />
              <PreviewDetail term="Internal Links" detail="Configured" />
              <PreviewDetail
                term="Slug"
                detail="why-custom-software-beats-off-the-shelf-tools"
                code
              />
              <PreviewDetail
                term="URL Preview"
                detail="/blog/why-custom-software-beats-off-the-shelf-tools"
                code
              />
            </dl>
            <div className="mt-7 border-t pt-6">
              <h3 className="text-sm font-semibold">Keywords</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <li key={keyword}>
                    <Badge variant="outline">{keyword}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.editorialGrid}>
        <div
          className={styles.workflowPanel}
          aria-labelledby="editorial-workflow-heading"
        >
          <span className={styles.eyebrow}>Editorial workflow</span>
          <h2 id="editorial-workflow-heading" className={styles.sectionTitle}>
            A deliberate path from idea to publication
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
        <div
          className={styles.seoPanel}
          aria-labelledby="editorial-seo-heading"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={styles.inverseEyebrow}>SEO checklist</span>
              <h2 id="editorial-seo-heading">Publication foundations</h2>
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
            Checklist states describe preview fields, not an automated
            validation or publishing result.
          </p>
        </div>
      </section>

      <section aria-labelledby="content-quality-heading" className="mt-14">
        <span className={styles.eyebrow}>Content quality</span>
        <h2 id="content-quality-heading" className={styles.sectionTitle}>
          Editorial checks before release
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

      <section aria-labelledby="draft-preview-heading" className="mt-14 pb-8">
        <div className={styles.draftShell}>
          <div className={styles.draftToolbar}>
            <div>
              <Badge variant="warning">Preview only</Badge>
              <span>Editing is disabled.</span>
            </div>
            <div className={styles.toolbarMarks} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className={styles.draftCanvas}>
            <div className={styles.documentRail} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <article aria-labelledby="draft-preview-heading">
              <span className={styles.eyebrow}>Draft preview</span>
              <h2 id="draft-preview-heading">
                Design the workflow before choosing the tool
              </h2>
              <p className={styles.lede}>
                A useful technology decision begins with the work people need to
                complete, the decisions they make, and the exceptions the system
                must support.
              </p>
              <h3>Start with operating reality</h3>
              <p>
                Map triggers, responsibilities, approval points, information
                flow, and ownership before comparing platforms or planning
                custom development.
              </p>
              <aside>
                <FileText aria-hidden="true" />
                <p>
                  <strong>Editorial callout</strong> The preview demonstrates
                  hierarchy and reading rhythm. It does not contain an editable
                  document surface.
                </p>
              </aside>
              <h3>Conclusion</h3>
              <p>
                The right solution should fit the workflow and its likely
                change—not simply the current list of features.
              </p>
            </article>
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
          aria-describedby="article-filter-notice"
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

export { AdminBlog };
