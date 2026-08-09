import {
  Archive,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileInput,
  FileOutput,
  Link2Off,
  Mail,
  MessageSquareReply,
  Search,
  ShieldAlert,
  Sparkles,
  Trash2,
  UserPlus,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { cn } from "@/lib/utils";
import styles from "./admin-contact-leads.module.css";

type LeadLabel =
  "Placeholder Lead" | "Preview Record" | "Internal Example" | "Sample Inquiry";

interface LeadRecord {
  readonly name: string;
  readonly company: string;
  readonly email: string;
  readonly service: string;
  readonly priority: "Preview High" | "Preview Normal" | "Preview Low";
  readonly status: "Preview Only" | "Pending" | "Inactive";
  readonly source: string;
  readonly label: LeadLabel;
}

const leads: readonly LeadRecord[] = [
  {
    name: "Placeholder Lead A",
    company: "Sample Company A",
    email: "lead-a@placeholder.invalid",
    service: "Web Development",
    priority: "Preview High",
    status: "Preview Only",
    source: "Contact preview",
    label: "Placeholder Lead",
  },
  {
    name: "Placeholder Lead B",
    company: "Sample Company B",
    email: "lead-b@placeholder.invalid",
    service: "AI Automation",
    priority: "Preview Normal",
    status: "Pending",
    source: "Consultation preview",
    label: "Preview Record",
  },
  {
    name: "Placeholder Lead C",
    company: "Sample Company C",
    email: "lead-c@placeholder.invalid",
    service: "Custom SaaS",
    priority: "Preview Low",
    status: "Inactive",
    source: "Internal preview",
    label: "Internal Example",
  },
  {
    name: "Placeholder Lead D",
    company: "Sample Company D",
    email: "lead-d@placeholder.invalid",
    service: "UI/UX Design",
    priority: "Preview Normal",
    status: "Preview Only",
    source: "Contact preview",
    label: "Sample Inquiry",
  },
  {
    name: "Placeholder Lead E",
    company: "Sample Company E",
    email: "lead-e@placeholder.invalid",
    service: "API Integration",
    priority: "Preview High",
    status: "Pending",
    source: "Consultation preview",
    label: "Placeholder Lead",
  },
  {
    name: "Placeholder Lead F",
    company: "Sample Company F",
    email: "lead-f@placeholder.invalid",
    service: "Maintenance & Support",
    priority: "Preview Low",
    status: "Inactive",
    source: "Internal preview",
    label: "Preview Record",
  },
  {
    name: "Placeholder Lead G",
    company: "Sample Company G",
    email: "lead-g@placeholder.invalid",
    service: "Web Development",
    priority: "Preview Normal",
    status: "Preview Only",
    source: "Contact preview",
    label: "Internal Example",
  },
  {
    name: "Placeholder Lead H",
    company: "Sample Company H",
    email: "lead-h@placeholder.invalid",
    service: "AI Automation",
    priority: "Preview High",
    status: "Pending",
    source: "Consultation preview",
    label: "Sample Inquiry",
  },
  {
    name: "Placeholder Lead I",
    company: "Sample Company I",
    email: "lead-i@placeholder.invalid",
    service: "Custom SaaS",
    priority: "Preview Normal",
    status: "Inactive",
    source: "Internal preview",
    label: "Placeholder Lead",
  },
  {
    name: "Placeholder Lead J",
    company: "Sample Company J",
    email: "lead-j@placeholder.invalid",
    service: "UI/UX Design",
    priority: "Preview Low",
    status: "Preview Only",
    source: "Contact preview",
    label: "Preview Record",
  },
  {
    name: "Placeholder Lead K",
    company: "Sample Company K",
    email: "lead-k@placeholder.invalid",
    service: "API Integration",
    priority: "Preview High",
    status: "Pending",
    source: "Consultation preview",
    label: "Internal Example",
  },
  {
    name: "Placeholder Lead L",
    company: "Sample Company L",
    email: "lead-l@placeholder.invalid",
    service: "Maintenance & Support",
    priority: "Preview Normal",
    status: "Inactive",
    source: "Internal preview",
    label: "Sample Inquiry",
  },
] as const;

const readiness = [
  ["Inbox Status", "Ready", "Preview structure is prepared"],
  ["Unread Queue", "Pending", "No read state is persisted"],
  ["Follow-up Queue", "Awaiting Setup", "No reminders are connected"],
  ["Archived Leads", "Preview Only", "No archive storage exists"],
  ["Response Workflow", "Planned", "No reply delivery exists"],
  ["CRM Sync Status", "Inactive", "No CRM is connected"],
] as const;

const workflow = [
  ["Received", "Capture an inquiry through a future secure intake boundary."],
  ["Reviewed", "Check completeness, relevance, consent, and spam indicators."],
  ["Assigned", "Route the inquiry to an accountable owner."],
  ["Proposal", "Prepare a suitable response or scoped next step."],
  ["Follow-up", "Track agreed communication without automated pressure."],
  ["Closed", "Record the outcome and retention decision responsibly."],
] as const;

const qualityChecks = [
  "Required fields",
  "Email verification",
  "Service selected",
  "Requirements provided",
  "Timeline clarified",
  "Budget discussed",
  "Internal notes",
  "Spam review",
  "Priority assigned",
] as const;

const integrations = [
  "CRM",
  "Email notifications",
  "Slack",
  "Discord",
  "Zapier",
  "Webhooks",
  "Analytics",
  "Auto-tagging",
  "AI Lead Classification",
] as const;

const nativeControlClass =
  "focus-ring h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60";

function AdminContactLeads() {
  return (
    <div className="mx-auto max-w-[100rem]">
      <section aria-labelledby="contact-leads-title" className={styles.hero}>
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <Badge>Lead Inbox</Badge>
            <Badge variant="outline">Static preview</Badge>
          </div>
          <h1
            id="contact-leads-title"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Contact Leads Management
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Preview how future inquiries could be reviewed, prioritized,
            assigned, and followed through. No lead data or communication
            workflow is connected in this sprint.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button type="button" disabled className="min-h-11">
              <FileOutput className="size-4" aria-hidden="true" />
              Export Leads
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled
              className="min-h-11"
            >
              <UserPlus className="size-4" aria-hidden="true" />
              Add Lead
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled
              className="min-h-11"
            >
              <FileInput className="size-4" aria-hidden="true" />
              Import
            </Button>
          </div>
        </div>
        <div className={styles.heroNotice} role="note">
          <ShieldAlert className="size-5 shrink-0" aria-hidden="true" />
          <div>
            <strong>Every lead shown here is placeholder content.</strong>
            <p>
              No inbox, CRM, email, assignment, response, export, or storage
              behavior exists.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="lead-readiness-heading" className="mt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className={styles.eyebrow}>Inbox readiness</span>
            <h2 id="lead-readiness-heading" className={styles.sectionTitle}>
              Qualitative states, never fake totals
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Labels describe interface readiness only—not real messages, unread
            inquiries, response activity, or CRM records.
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

      <section aria-labelledby="lead-index-heading" className="mt-14">
        <span className={styles.eyebrow}>Inquiry index</span>
        <h2 id="lead-index-heading" className={styles.sectionTitle}>
          Synthetic records for workflow review
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Names and companies use explicit sample labels. Email addresses use
          the reserved `.invalid` domain and cannot identify a real inbox.
        </p>

        <div className={styles.filters} aria-label="Disabled lead filters">
          <div className={styles.searchField}>
            <label htmlFor="lead-search">Search</label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="lead-search"
                type="search"
                placeholder="Search placeholder leads"
                disabled
                aria-describedby="lead-filter-notice"
                className={cn(nativeControlClass, "pl-10")}
              />
            </div>
          </div>
          <StaticSelect
            id="lead-status"
            label="Status"
            options={["All statuses", "Preview Only", "Pending", "Inactive"]}
          />
          <StaticSelect
            id="lead-service"
            label="Service"
            options={[
              "All services",
              "Web Development",
              "AI Automation",
              "Custom SaaS",
            ]}
          />
          <StaticSelect
            id="lead-priority"
            label="Priority"
            options={[
              "All priorities",
              "Preview High",
              "Preview Normal",
              "Preview Low",
            ]}
          />
          <StaticSelect
            id="lead-date"
            label="Date Range"
            options={[
              "Any placeholder date",
              "Recent preview",
              "Earlier preview",
            ]}
          />
          <StaticSelect
            id="lead-source"
            label="Source"
            options={[
              "All sources",
              "Contact preview",
              "Consultation preview",
              "Internal preview",
            ]}
          />
          <StaticSelect
            id="lead-sort"
            label="Sort"
            options={["Configured order", "Name label", "Priority", "Status"]}
          />
          <Button
            type="button"
            variant="outline"
            disabled
            className="h-11 self-end"
          >
            Reset
          </Button>
          <p id="lead-filter-notice">
            All controls are disabled preview controls. No search, filtering,
            date query, sorting, or reset behavior exists.
          </p>
        </div>

        <div className={styles.indexLayout}>
          <div className={styles.tableFrame}>
            <table>
              <caption>
                Static placeholder contact leads management preview
              </caption>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Email</th>
                  <th scope="col">Interested Service</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Status</th>
                  <th scope="col">Received</th>
                  <th scope="col">Source</th>
                  <th scope="col">Assigned To</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.name}>
                    <th scope="row">
                      <span>{lead.name}</span>
                      <Badge variant="outline">{lead.label}</Badge>
                    </th>
                    <td>{lead.company}</td>
                    <td>
                      <code>{lead.email}</code>
                    </td>
                    <td>{lead.service}</td>
                    <td>{lead.priority}</td>
                    <td>
                      <Badge variant="outline">{lead.status}</Badge>
                    </td>
                    <td>Date unavailable</td>
                    <td>{lead.source}</td>
                    <td>Unassigned preview</td>
                    <td>
                      <div className={styles.actions}>
                        <DisabledAction
                          icon={Eye}
                          label={`View ${lead.name}, unavailable`}
                        />
                        <DisabledAction
                          icon={UserPlus}
                          label={`Assign ${lead.name}, unavailable`}
                        />
                        <DisabledAction
                          icon={Archive}
                          label={`Archive ${lead.name}, unavailable`}
                        />
                        <DisabledAction
                          icon={MessageSquareReply}
                          label={`Reply to ${lead.name}, unavailable`}
                        />
                        <DisabledAction
                          icon={Trash2}
                          label={`Delete ${lead.name}, unavailable`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside
            aria-labelledby="selected-lead-heading"
            className={styles.previewPanel}
          >
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary">Selected Lead</Badge>
              <Mail
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <div className={styles.placeholderNotice}>
              <ShieldAlert aria-hidden="true" />
              <p>
                <strong>Placeholder Lead</strong>All details in this panel are
                synthetic preview content.
              </p>
            </div>
            <h2 id="selected-lead-heading">Website modernization inquiry</h2>
            <p className={styles.previewIdentity}>
              Placeholder Lead A · Sample Company A
            </p>
            <dl className={styles.previewDetails}>
              <PreviewDetail
                term="Project Summary"
                detail="Sample website modernization planning inquiry"
              />
              <PreviewDetail
                term="Interested Service"
                detail="Web Development"
              />
              <PreviewDetail
                term="Estimated Timeline"
                detail="Placeholder timeline · not confirmed"
              />
              <PreviewDetail
                term="Budget Range"
                detail="Placeholder range · not discussed"
              />
              <PreviewDetail
                term="Requirements Summary"
                detail="Sample requirements for layout demonstration only"
              />
              <PreviewDetail
                term="Attachments"
                detail="No placeholder attachments"
              />
              <PreviewDetail
                term="Internal Notes"
                detail="Preview note · no lead record exists"
              />
            </dl>
            <div className={styles.previewFooter}>
              <Badge variant="warning">Preview Record</Badge>
              <span>No reply available</span>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.reviewGrid}>
        <div
          className={styles.workflowPanel}
          aria-labelledby="lead-workflow-heading"
        >
          <span className={styles.eyebrow}>Lead workflow</span>
          <h2 id="lead-workflow-heading" className={styles.sectionTitle}>
            A future path from inquiry to outcome
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
          className={styles.qualityPanel}
          aria-labelledby="inquiry-quality-heading"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={styles.inverseEyebrow}>Inquiry quality</span>
              <h2 id="inquiry-quality-heading">Review before response</h2>
            </div>
            <Sparkles
              className="size-6 text-primary-foreground/60"
              aria-hidden="true"
            />
          </div>
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
            No verification, qualification, spam detection, priority assignment,
            or response decision runs in this preview.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="lead-integrations-heading"
        className="mt-14 pb-8"
      >
        <div className={styles.integrationsPanel}>
          <div className={styles.integrationsIntro}>
            <span className={styles.eyebrow}>Future integrations</span>
            <h2 id="lead-integrations-heading" className={styles.sectionTitle}>
              Communication boundaries to establish
            </h2>
            <p>
              Each future connection requires explicit permissions, privacy
              review, retention rules, failure handling, auditability, and
              operational ownership.
            </p>
          </div>
          <ul>
            {integrations.map((integration) => (
              <li key={integration}>
                <div>
                  <UsersRound aria-hidden="true" />
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
              No CRM, email provider, messaging platform, webhook, analytics
              system, automation service, or AI classifier is connected.
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
          disabled
          aria-describedby="lead-filter-notice"
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

export { AdminContactLeads };
