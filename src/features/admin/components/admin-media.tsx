import {
  Archive,
  CheckCircle2,
  Eye,
  File,
  FileArchive,
  FileImage,
  FileText,
  Film,
  Folder,
  FolderPlus,
  Gauge,
  ImageIcon,
  Layers3,
  Pencil,
  Search,
  ShieldAlert,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import styles from "./admin-media.module.css";

type MediaType =
  | "Image"
  | "Logo"
  | "Icon"
  | "Video"
  | "PDF"
  | "Document"
  | "Download"
  | "Illustration";

interface MediaItem {
  readonly fileName: string;
  readonly type: MediaType;
  readonly usage: string;
  readonly icon: LucideIcon;
}

const mediaItems: readonly MediaItem[] = [
  {
    fileName: "homepage-hero-placeholder.webp",
    type: "Image",
    usage: "Homepage",
    icon: FileImage,
  },
  {
    fileName: "primary-logo-placeholder.svg",
    type: "Logo",
    usage: "Global shell",
    icon: Layers3,
  },
  {
    fileName: "service-icons-placeholder.zip",
    type: "Icon",
    usage: "Services",
    icon: FileArchive,
  },
  {
    fileName: "workflow-demo-placeholder.mp4",
    type: "Video",
    usage: "AI Automation",
    icon: Film,
  },
  {
    fileName: "case-study-placeholder.pdf",
    type: "PDF",
    usage: "Portfolio",
    icon: FileText,
  },
  {
    fileName: "project-brief-placeholder.docx",
    type: "Document",
    usage: "Downloads",
    icon: File,
  },
  {
    fileName: "brand-kit-placeholder.zip",
    type: "Download",
    usage: "Brand resources",
    icon: FileArchive,
  },
  {
    fileName: "automation-flow-placeholder.svg",
    type: "Illustration",
    usage: "Homepage",
    icon: ImageIcon,
  },
  {
    fileName: "portfolio-cover-placeholder.webp",
    type: "Image",
    usage: "Portfolio",
    icon: FileImage,
  },
  {
    fileName: "footer-mark-placeholder.svg",
    type: "Logo",
    usage: "Footer",
    icon: Layers3,
  },
  {
    fileName: "admin-icons-placeholder.zip",
    type: "Icon",
    usage: "Admin",
    icon: FileArchive,
  },
  {
    fileName: "product-tour-placeholder.webm",
    type: "Video",
    usage: "Services",
    icon: Film,
  },
  {
    fileName: "capabilities-placeholder.pdf",
    type: "PDF",
    usage: "Downloads",
    icon: FileText,
  },
  {
    fileName: "content-outline-placeholder.md",
    type: "Document",
    usage: "Blog",
    icon: File,
  },
  {
    fileName: "resource-pack-placeholder.zip",
    type: "Download",
    usage: "Downloads",
    icon: FileArchive,
  },
  {
    fileName: "saas-dashboard-placeholder.svg",
    type: "Illustration",
    usage: "Custom SaaS",
    icon: ImageIcon,
  },
  {
    fileName: "open-graph-placeholder.webp",
    type: "Image",
    usage: "Open Graph",
    icon: FileImage,
  },
  {
    fileName: "contact-pattern-placeholder.svg",
    type: "Illustration",
    usage: "Contact",
    icon: ImageIcon,
  },
  {
    fileName: "about-profile-placeholder.webp",
    type: "Image",
    usage: "About",
    icon: FileImage,
  },
  {
    fileName: "download-cover-placeholder.svg",
    type: "Illustration",
    usage: "Downloads",
    icon: ImageIcon,
  },
] as const;

const readiness = [
  ["Library", "Configured", "Placeholder records demonstrate organization"],
  ["Storage", "Planned", "No storage provider is connected"],
  ["Folders", "Available", "Folder structure is represented"],
  ["Optimization", "Ready", "Review criteria are visible"],
  ["Delivery", "Planned", "No CDN or asset delivery exists"],
  ["Search", "Available", "Search presentation is prepared"],
] as const;

const categories = [
  "Images",
  "Logos",
  "Icons",
  "Videos",
  "PDFs",
  "Documents",
  "Downloads",
  "Illustrations",
] as const;
const usageLocations = [
  "Homepage",
  "Portfolio",
  "Blog",
  "Services",
  "About",
  "Contact",
  "Admin",
  "Open Graph",
  "Downloads",
] as const;
const folders = [
  "Brand Assets",
  "Marketing",
  "Projects",
  "Articles",
  "Downloads",
  "Icons",
  "Illustrations",
  "Temporary Uploads",
] as const;
const uploadWorkflow = [
  ["Upload", "Receive a file through a future governed upload boundary."],
  ["Review", "Check ownership, purpose, format, and content safety."],
  ["Optimize", "Prepare delivery format, dimensions, and metadata."],
  ["Approve", "Record accountable approval and intended usage."],
  ["Publish", "Expose an approved asset through managed delivery."],
  ["Archive", "Retain or remove superseded versions intentionally."],
] as const;
const optimizationChecks = [
  "Image optimization",
  "WebP conversion",
  "Compression",
  "Naming convention",
  "Alt text",
  "Metadata",
  "SEO",
  "Accessibility",
  "Versioning",
  "Backup",
] as const;
const futureIntegrations = [
  "Cloud Storage",
  "CDN",
  "Image Optimizer",
  "Version History",
  "Bulk Upload",
  "Automatic Compression",
  "AI Tagging",
  "Media Search",
] as const;

const searchClass =
  "focus-ring h-11 w-full rounded-md border border-input bg-background px-3 pl-10 text-sm text-foreground shadow-xs placeholder:text-muted-foreground";

function AdminMedia() {
  return (
    <div className="mx-auto max-w-[100rem]">
      <section aria-labelledby="media-library-title" className={styles.hero}>
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <Badge>Media CMS</Badge>
            <Badge variant="outline">Static preview</Badge>
          </div>
          <h1
            id="media-library-title"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Media Library
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Organize future images, documents, downloads, and visual assets
            across the Ayeb Solutions platform. This interface is a static
            library preview; storage and media operations are not connected.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button type="button" disabled className="min-h-11">
              <UploadCloud className="size-4" aria-hidden="true" />
              Upload Media
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled
              className="min-h-11"
            >
              <FolderPlus className="size-4" aria-hidden="true" />
              Create Folder
            </Button>
          </div>
        </div>
        <div className={styles.heroNotice} role="note">
          <ShieldAlert className="size-5 shrink-0" aria-hidden="true" />
          <div>
            <strong>Media management is currently a preview.</strong>
            <p>
              No upload, storage, optimization, replacement, deletion, or
              delivery behavior exists in this sprint.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="media-readiness-heading" className="mt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className={styles.eyebrow}>Library readiness</span>
            <h2 id="media-readiness-heading" className={styles.sectionTitle}>
              Asset structure without invented totals
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Qualitative labels describe interface preparation only—not stored
            files, consumed capacity, transfer volume, or live processing.
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

      <section className={styles.overviewGrid}>
        <div
          className={styles.storagePanel}
          aria-labelledby="storage-overview-heading"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={styles.eyebrow}>Storage overview</span>
              <h2 id="storage-overview-heading" className={styles.sectionTitle}>
                Capacity awaits a provider
              </h2>
            </div>
            <Gauge
              className="size-6 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div className={styles.storageTrack} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <dl className={styles.storageStates}>
            <div>
              <dt>Provider</dt>
              <dd>Not Connected</dd>
            </div>
            <div>
              <dt>Usage</dt>
              <dd>Unavailable</dd>
            </div>
            <div>
              <dt>Capacity</dt>
              <dd>Planned</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>Not Connected</dd>
            </div>
          </dl>
        </div>
        <div
          className={styles.categoryPanel}
          aria-labelledby="media-categories-heading"
        >
          <span className={styles.eyebrow}>Media categories</span>
          <h2 id="media-categories-heading" className={styles.sectionTitle}>
            Planned asset groups
          </h2>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Folder aria-hidden="true" />
                <span>{category}</span>
                <Badge variant="outline">Available</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="media-index-heading" className="mt-14">
        <span className={styles.eyebrow}>Asset index</span>
        <h2 id="media-index-heading" className={styles.sectionTitle}>
          Placeholder media records
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Every filename is explicitly a placeholder. Cards contain no real
          file, preview, binary asset, upload date, measured size, or public
          visibility.
        </p>
        <div
          className={styles.libraryControls}
          aria-label="Static media library controls"
        >
          <div>
            <label htmlFor="media-search">Search</label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="media-search"
                type="search"
                placeholder="Search placeholder files"
                aria-describedby="media-controls-notice"
                className={searchClass}
              />
            </div>
          </div>
          <fieldset>
            <legend>File-type filters</legend>
            <div>
              {categories.map((category) => (
                <button key={category} type="button" disabled>
                  {category}
                </button>
              ))}
            </div>
          </fieldset>
          <p id="media-controls-notice">
            Search and file-type filters are presentation-only. No file index or
            filtering behavior exists.
          </p>
        </div>
        <ul className={styles.mediaGrid}>
          {mediaItems.map(({ fileName, type, usage, icon: Icon }) => (
            <li key={fileName} className={styles.mediaCard}>
              <div className={styles.mediaPreview}>
                <Icon aria-hidden="true" />
                <span>{type}</span>
                <Badge variant="warning">Placeholder</Badge>
              </div>
              <div className={styles.mediaBody}>
                <h3>{fileName}</h3>
                <dl>
                  <div>
                    <dt>Type</dt>
                    <dd>{type}</dd>
                  </div>
                  <div>
                    <dt>Size</dt>
                    <dd>Size pending</dd>
                  </div>
                  <div>
                    <dt>Visibility</dt>
                    <dd>Internal preview</dd>
                  </div>
                  <div>
                    <dt>Date</dt>
                    <dd>Date pending</dd>
                  </div>
                  <div>
                    <dt>Usage</dt>
                    <dd>{usage}</dd>
                  </div>
                </dl>
              </div>
              <div className={styles.actions}>
                <DisabledAction
                  icon={Eye}
                  label={`Preview ${fileName}, unavailable`}
                />
                <DisabledAction
                  icon={Pencil}
                  label={`Replace ${fileName}, unavailable`}
                />
                <DisabledAction
                  icon={Archive}
                  label={`Delete ${fileName}, unavailable`}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.organizationGrid}>
        <div
          className={styles.usagePanel}
          aria-labelledby="media-usage-heading"
        >
          <span className={styles.eyebrow}>Media usage</span>
          <h2 id="media-usage-heading" className={styles.sectionTitle}>
            Future destinations
          </h2>
          <p>
            These locations describe potential usage metadata, not live asset
            relationships.
          </p>
          <ul>
            {usageLocations.map((location, index) => (
              <li key={location}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{location}</strong>
                <Badge variant="outline">Planned</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={styles.folderPanel}
          aria-labelledby="folder-organization-heading"
        >
          <span className={styles.inverseEyebrow}>Folder organization</span>
          <h2 id="folder-organization-heading">A governed library structure</h2>
          <div className={styles.folderTree}>
            {folders.map((folder, index) => (
              <div
                key={folder}
                style={{ "--folder-depth": index % 3 } as React.CSSProperties}
              >
                <Folder aria-hidden="true" />
                <span>{folder}</span>
                <small>Empty preview</small>
              </div>
            ))}
          </div>
          <p>
            No directory, object key, or stored asset is created by this
            visualization.
          </p>
        </div>
      </section>

      <section className={styles.reviewGrid}>
        <div
          className={styles.workflowPanel}
          aria-labelledby="upload-workflow-heading"
        >
          <span className={styles.eyebrow}>Upload workflow</span>
          <h2 id="upload-workflow-heading" className={styles.sectionTitle}>
            A future path from file to delivery
          </h2>
          <ol className={styles.workflow}>
            {uploadWorkflow.map(([title, description], index) => (
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
          className={styles.optimizationPanel}
          aria-labelledby="optimization-checklist-heading"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={styles.inverseEyebrow}>Asset optimization</span>
              <h2 id="optimization-checklist-heading">Delivery checklist</h2>
            </div>
            <Sparkles
              className="size-6 text-primary-foreground/60"
              aria-hidden="true"
            />
          </div>
          <ul>
            {optimizationChecks.map((item) => (
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
            Checklist labels describe a future review process. No optimization
            or validation runs in this preview.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="media-integrations-heading"
        className="mt-14 pb-8"
      >
        <div className={styles.integrationsPanel}>
          <div className={styles.integrationsIntro}>
            <span className={styles.eyebrow}>Future integrations</span>
            <h2 id="media-integrations-heading" className={styles.sectionTitle}>
              Infrastructure boundaries to establish
            </h2>
            <p>
              Each capability requires explicit provider selection, permissions,
              cost controls, security review, retention rules, and operational
              ownership.
            </p>
          </div>
          <ul>
            {futureIntegrations.map((integration) => (
              <li key={integration}>
                <div>
                  <Layers3 aria-hidden="true" />
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
            <ShieldAlert aria-hidden="true" />
            <p>
              No storage provider, CDN, optimizer, AI service, search index, or
              background processing system is connected.
            </p>
          </div>
        </div>
      </section>
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

export { AdminMedia };
