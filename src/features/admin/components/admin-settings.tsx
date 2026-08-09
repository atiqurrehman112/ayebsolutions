import {
  CheckCircle2,
  ChevronDown,
  CloudCog,
  Download,
  FileInput,
  KeyRound,
  Link2Off,
  RotateCcw,
  Save,
  Settings2,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { cn } from "@/lib/utils";
import styles from "./admin-settings.module.css";

type SettingFieldType = "input" | "textarea" | "select" | "toggle";

interface SettingField {
  readonly label: string;
  readonly value: string;
  readonly type: SettingFieldType;
  readonly description: string;
}

interface SettingGroup {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly fields: readonly SettingField[];
}

const readiness = [
  ["Website Status", "Ready", "Public presentation is available"],
  ["CMS Configuration", "Preview", "Settings remain read-only"],
  ["Deployment Status", "Pending", "No deployment control is connected"],
  ["SEO Configuration", "Ready", "Existing defaults are represented"],
  ["Email Configuration", "Inactive", "No sender or transport is connected"],
  [
    "Security Configuration",
    "Awaiting Setup",
    "Identity controls arrive later",
  ],
] as const;

const settingGroups: readonly SettingGroup[] = [
  {
    id: "general",
    title: "General",
    description: "Core site identity and regional defaults.",
    fields: [
      {
        label: "Site Name",
        value: "Ayeb Solutions",
        type: "input",
        description: "Primary website identity.",
      },
      {
        label: "Tagline",
        value: "Premium web development and AI automation",
        type: "input",
        description: "Default supporting brand statement.",
      },
      {
        label: "Default Language",
        value: "English",
        type: "select",
        description: "Preview locale selection.",
      },
      {
        label: "Timezone",
        value: "Awaiting setup",
        type: "select",
        description: "No operational timezone is configured.",
      },
    ],
  },
  {
    id: "branding",
    title: "Branding",
    description: "Visual identity references and presentation defaults.",
    fields: [
      {
        label: "Logo",
        value: "Media reference unavailable",
        type: "input",
        description: "No upload or media selector exists.",
      },
      {
        label: "Favicon",
        value: "Placeholder reference",
        type: "input",
        description: "Static reference only.",
      },
      {
        label: "Theme",
        value: "System preference",
        type: "select",
        description: "Public theme behavior preview.",
      },
      {
        label: "Primary Color",
        value: "Semantic primary token",
        type: "input",
        description: "Managed through the design system.",
      },
    ],
  },
  {
    id: "seo",
    title: "SEO",
    description: "Default metadata and indexing policy previews.",
    fields: [
      {
        label: "Meta Title",
        value: "Ayeb Solutions",
        type: "input",
        description: "Default title preview.",
      },
      {
        label: "Meta Description",
        value: "Modern websites, software, and AI automation.",
        type: "textarea",
        description: "Default description preview.",
      },
      {
        label: "Open Graph",
        value: "Configured preview",
        type: "select",
        description: "No media selection occurs here.",
      },
      {
        label: "Robots",
        value: "Public defaults configured",
        type: "select",
        description: "Admin routes remain excluded.",
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    description: "Global link groups and menu presentation.",
    fields: [
      {
        label: "Header Navigation",
        value: "Configured in source",
        type: "input",
        description: "No menu editor is connected.",
      },
      {
        label: "Footer Navigation",
        value: "Configured in source",
        type: "input",
        description: "No ordering behavior exists.",
      },
      {
        label: "Mega Menu",
        value: "Available",
        type: "toggle",
        description: "Read-only presentation state.",
      },
    ],
  },
  {
    id: "homepage",
    title: "Homepage",
    description: "Homepage composition and feature visibility.",
    fields: [
      {
        label: "Hero Visibility",
        value: "Available",
        type: "toggle",
        description: "No public mutation occurs.",
      },
      {
        label: "Section Order",
        value: "Configured in source",
        type: "input",
        description: "Reordering is unavailable.",
      },
      {
        label: "Announcement",
        value: "Configured preview",
        type: "select",
        description: "No scheduling behavior exists.",
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    description: "Service presentation and conversion defaults.",
    fields: [
      {
        label: "Featured Service",
        value: "AI Automation",
        type: "select",
        description: "Read-only current presentation.",
      },
      {
        label: "Primary CTA",
        value: "Book Consultation",
        type: "input",
        description: "Static CTA label preview.",
      },
      {
        label: "Service Visibility",
        value: "Configured",
        type: "toggle",
        description: "Publishing is unavailable.",
      },
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Portfolio disclosure and display preferences.",
    fields: [
      {
        label: "Default Category",
        value: "All work",
        type: "select",
        description: "No filtering state is persisted.",
      },
      {
        label: "Disclosure Labels",
        value: "Required",
        type: "toggle",
        description: "Truthful origin labels remain visible.",
      },
      {
        label: "Featured Work",
        value: "Configured preview",
        type: "input",
        description: "No selection workflow exists.",
      },
    ],
  },
  {
    id: "blog",
    title: "Blog",
    description: "Editorial attribution and discovery defaults.",
    fields: [
      {
        label: "Article Author",
        value: "Ayeb Solutions",
        type: "input",
        description: "Default editorial identity preview.",
      },
      {
        label: "Reading Metadata",
        value: "Available",
        type: "toggle",
        description: "No calculation runs here.",
      },
      {
        label: "Default Category",
        value: "Insights",
        type: "select",
        description: "Static category preview.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    description: "Public contact and notification references.",
    fields: [
      {
        label: "Contact Email",
        value: "Configured through environment",
        type: "input",
        description: "Address is not exposed in this preview.",
      },
      {
        label: "Email Sender",
        value: "Not configured",
        type: "input",
        description: "No sender identity is connected.",
      },
      {
        label: "SMTP",
        value: "Inactive",
        type: "toggle",
        description: "No transport or delivery exists.",
      },
      {
        label: "Social Links",
        value: "Configured in source",
        type: "input",
        description: "No social account editor exists.",
      },
    ],
  },
  {
    id: "admin",
    title: "Admin",
    description: "Workspace behavior and administrative notices.",
    fields: [
      {
        label: "Workspace Name",
        value: "Ayeb Admin",
        type: "input",
        description: "Static interface label.",
      },
      {
        label: "Preview Notice",
        value: "Visible",
        type: "toggle",
        description: "Keeps disconnected behavior explicit.",
      },
      {
        label: "Admin Indexing",
        value: "Disabled",
        type: "select",
        description: "Admin routes remain noindex,nofollow.",
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    description: "Future identity and platform protection controls.",
    fields: [
      {
        label: "API Keys",
        value: "Not configured",
        type: "input",
        description: "No key value is stored or exposed.",
      },
      {
        label: "Two Factor",
        value: "Awaiting setup",
        type: "toggle",
        description: "Authentication is not implemented.",
      },
      {
        label: "Session Policy",
        value: "Planned",
        type: "select",
        description: "No session boundary exists.",
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Provider connection and synchronization settings.",
    fields: [
      {
        label: "Provider Connections",
        value: "Not connected",
        type: "input",
        description: "No OAuth or credentials exist.",
      },
      {
        label: "Webhook Delivery",
        value: "Inactive",
        type: "toggle",
        description: "No webhook engine exists.",
      },
      {
        label: "Synchronization",
        value: "Planned",
        type: "select",
        description: "No background processing runs.",
      },
    ],
  },
  {
    id: "backups",
    title: "Backups",
    description: "Future configuration and content recovery policy.",
    fields: [
      {
        label: "Backup Frequency",
        value: "Awaiting setup",
        type: "select",
        description: "No schedule or backup storage exists.",
      },
      {
        label: "Retention",
        value: "Planned",
        type: "select",
        description: "No retention period is claimed.",
      },
      {
        label: "Restore Verification",
        value: "Inactive",
        type: "toggle",
        description: "No restore workflow exists.",
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "High-impact platform behavior and experimental controls.",
    fields: [
      {
        label: "Feature Flags",
        value: "Configured in source",
        type: "input",
        description: "No runtime flag service exists.",
      },
      {
        label: "Maintenance Mode",
        value: "Inactive",
        type: "toggle",
        description: "No switch behavior is connected.",
      },
      {
        label: "Analytics ID",
        value: "Not configured",
        type: "input",
        description: "No analytics identifier is stored here.",
      },
    ],
  },
] as const;

const deploymentStates = [
  ["Development", "Preview Only"],
  ["Preview", "Planned"],
  ["Production", "Read-only"],
  ["Build Status", "Unavailable"],
  ["Environment Variables", "Not exposed"],
  ["Domains", "Configured externally"],
  ["SSL", "Provider managed"],
  ["CDN", "Awaiting setup"],
] as const;

const securityStates = [
  "Authentication",
  "Authorization",
  "Roles",
  "Permissions",
  "Audit Logs",
  "Rate Limiting",
  "Two Factor",
  "Sessions",
] as const;
const integrations = [
  "Vercel",
  "GitHub",
  "Supabase",
  "Cloudinary",
  "Resend",
  "Google Analytics",
  "Stripe",
  "OpenAI",
  "Slack",
  "Discord",
  "Zapier",
  "Webhook Engine",
] as const;
const maintenanceWorkflow = [
  ["Configure", "Prepare a change in a future controlled settings boundary."],
  ["Review", "Check scope, ownership, dependencies, and user impact."],
  ["Validate", "Confirm values, security constraints, and environment fit."],
  ["Deploy", "Apply an approved change through a governed release."],
  ["Monitor", "Observe expected behavior and unintended effects."],
  ["Rollback", "Restore the prior known configuration when necessary."],
] as const;
const configurationChecks = [
  "Brand assets",
  "SEO configured",
  "Metadata",
  "Robots",
  "Analytics",
  "Domains",
  "Email",
  "Security",
  "Backup",
  "Accessibility",
  "Performance",
] as const;

const controlClass =
  "h-11 w-full rounded-md border border-input bg-muted/25 px-3 text-sm text-muted-foreground shadow-xs disabled:cursor-not-allowed disabled:opacity-70";

function AdminSettings() {
  return (
    <div className="mx-auto max-w-[100rem]">
      <section aria-labelledby="settings-title" className={styles.hero}>
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <Badge>System Settings</Badge>
            <Badge variant="outline">Static preview</Badge>
          </div>
          <h1
            id="settings-title"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Settings Management
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Review how website, content, deployment, security, and integration
            configuration could be organized. Every setting remains read-only
            and disconnected in this sprint.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Button type="button" disabled className="min-h-11">
              <Save className="size-4" aria-hidden="true" />
              Save Settings
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled
              className="min-h-11"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Reset
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled
              className="min-h-11"
            >
              <FileInput className="size-4" aria-hidden="true" />
              Import Configuration
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled
              className="min-h-11"
            >
              <Download className="size-4" aria-hidden="true" />
              Export Configuration
            </Button>
          </div>
        </div>
        <div className={styles.heroNotice} role="note">
          <ShieldAlert className="size-5 shrink-0" aria-hidden="true" />
          <div>
            <strong>Settings are preview-only and cannot be saved.</strong>
            <p>
              No configuration, secret, environment, deployment, provider, or
              public content is changed.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="system-readiness-heading" className="mt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className={styles.eyebrow}>System overview</span>
            <h2 id="system-readiness-heading" className={styles.sectionTitle}>
              Configuration states without fake metrics
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Qualitative labels describe the preview interface and existing
            public presentation—not live infrastructure health.
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

      <section aria-labelledby="configuration-heading" className="mt-14">
        <span className={styles.eyebrow}>Configuration workspace</span>
        <h2 id="configuration-heading" className={styles.sectionTitle}>
          Organized settings, intentionally read-only
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Navigate the preview groups below. Every native control is disabled
          and no value can be submitted, stored, imported, exported, or
          synchronized.
        </p>
        <div className={styles.settingsLayout}>
          <nav aria-label="Settings groups" className={styles.settingsNav}>
            <span>Settings groups</span>
            <ul>
              {settingGroups.map((group, index) => (
                <li key={group.id}>
                  <a href={`#settings-${group.id}`} className="focus-ring">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.settingsGroups}>
            {settingGroups.map((group) => (
              <SettingsGroup key={group.id} group={group} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.systemGrid}>
        <div
          className={styles.deploymentPanel}
          aria-labelledby="deployment-settings-heading"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={styles.eyebrow}>Deployment</span>
              <h2
                id="deployment-settings-heading"
                className={styles.sectionTitle}
              >
                Environment visibility without control
              </h2>
            </div>
            <CloudCog
              className="size-6 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <dl>
            {deploymentStates.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p>
            Preview only. No build, domain, certificate, environment value, or
            CDN setting can be inspected or changed here.
          </p>
        </div>
        <div
          className={styles.securityPanel}
          aria-labelledby="security-settings-heading"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={styles.inverseEyebrow}>Security</span>
              <h2 id="security-settings-heading">
                Identity boundaries to establish
              </h2>
            </div>
            <KeyRound
              className="size-6 text-primary-foreground/60"
              aria-hidden="true"
            />
          </div>
          <ul>
            {securityStates.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <strong>Planned</strong>
              </li>
            ))}
          </ul>
          <p>
            No identity, permission, audit, rate-limit, two-factor, or session
            mechanism exists in this preview.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="settings-integrations-heading"
        className="mt-14"
      >
        <div className={styles.integrationsPanel}>
          <div className={styles.integrationsIntro}>
            <span className={styles.eyebrow}>Integrations</span>
            <h2
              id="settings-integrations-heading"
              className={styles.sectionTitle}
            >
              Provider connections remain planned
            </h2>
            <p>
              Each integration requires explicit ownership, credential handling,
              permissions, privacy review, failure behavior, and operational
              monitoring.
            </p>
          </div>
          <ul>
            {integrations.map((integration) => (
              <li key={integration}>
                <div>
                  <Settings2 aria-hidden="true" />
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
              No provider, account, OAuth grant, API key, webhook, analytics
              stream, payment system, AI service, email transport, or deployment
              control is connected.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.reviewGrid}>
        <div
          className={styles.workflowPanel}
          aria-labelledby="maintenance-workflow-heading"
        >
          <span className={styles.eyebrow}>Maintenance workflow</span>
          <h2 id="maintenance-workflow-heading" className={styles.sectionTitle}>
            A future path for controlled changes
          </h2>
          <ol className={styles.workflow}>
            {maintenanceWorkflow.map(([title, description], index) => (
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
          className={styles.checklistPanel}
          aria-labelledby="configuration-checklist-heading"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={styles.inverseEyebrow}>
                Configuration checklist
              </span>
              <h2 id="configuration-checklist-heading">
                Review before deployment
              </h2>
            </div>
            <Sparkles
              className="size-6 text-primary-foreground/60"
              aria-hidden="true"
            />
          </div>
          <ul>
            {configurationChecks.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <strong>
                  <CheckCircle2 aria-hidden="true" />
                  Preview
                </strong>
              </li>
            ))}
          </ul>
          <p>
            Checklist states demonstrate future governance. No automated
            validation or deployment decision runs here.
          </p>
        </div>
      </section>
    </div>
  );
}

function SettingsGroup({ group }: { readonly group: SettingGroup }) {
  return (
    <section
      id={`settings-${group.id}`}
      aria-labelledby={`settings-${group.id}-heading`}
      className={styles.settingsCard}
    >
      <div className={styles.settingsCardHeader}>
        <div>
          <span>{group.title}</span>
          <h3 id={`settings-${group.id}-heading`}>{group.title} settings</h3>
        </div>
        <Badge variant="outline">Preview Only</Badge>
      </div>
      <p>{group.description}</p>
      <div className={styles.fieldGrid}>
        {group.fields.map((field) => (
          <SettingControl key={field.label} field={field} groupId={group.id} />
        ))}
      </div>
    </section>
  );
}

function SettingControl({
  field,
  groupId,
}: {
  readonly field: SettingField;
  readonly groupId: string;
}) {
  const id = `${groupId}-${field.label.toLowerCase().replaceAll(" ", "-")}`;
  if (field.type === "toggle")
    return (
      <div className={styles.field}>
        <span id={`${id}-label`} className={styles.fieldLabel}>
          {field.label}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked="false"
          aria-labelledby={`${id}-label`}
          disabled
          className={styles.switch}
        >
          <span />
        </button>
        <small>
          {field.value}. {field.description}
        </small>
      </div>
    );
  if (field.type === "textarea")
    return (
      <div className={styles.field}>
        <label htmlFor={id}>{field.label}</label>
        <textarea
          id={id}
          value={field.value}
          disabled
          readOnly
          className={cn(controlClass, "min-h-24 resize-none py-3")}
        />
        <small>{field.description}</small>
      </div>
    );
  if (field.type === "select")
    return (
      <div className={styles.field}>
        <label htmlFor={id}>{field.label}</label>
        <div className="relative">
          <select
            id={id}
            value={field.value}
            disabled
            className={cn(controlClass, "appearance-none pr-10")}
          >
            <option>{field.value}</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <small>{field.description}</small>
      </div>
    );
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{field.label}</label>
      <input
        id={id}
        value={field.value}
        disabled
        readOnly
        className={controlClass}
      />
      <small>{field.description}</small>
    </div>
  );
}

export { AdminSettings };
