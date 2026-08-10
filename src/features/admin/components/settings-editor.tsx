"use client";
import { useActionState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  initialSettingsActionState,
  updateSiteSettings,
} from "@/lib/actions/settings";
import type { MediaLibraryRow } from "@/types/database";
import type { SiteConfiguration } from "@/types/settings";
import styles from "./admin-settings.module.css";

interface Props {
  readonly canEdit: boolean;
  readonly media: readonly MediaLibraryRow[];
  readonly settings: SiteConfiguration;
}
const navText = (settings: SiteConfiguration) =>
  settings.header_navigation
    .map((item) => `${item.label}|${item.href}`)
    .join("\n");
const footerText = (settings: SiteConfiguration) =>
  settings.footer_navigation
    .flatMap((group) =>
      group.links.map((item) => `${group.title}|${item.label}|${item.href}`),
    )
    .join("\n");
export function SettingsEditor({ canEdit, media, settings }: Props) {
  const [state, action, pending] = useActionState(
    updateSiteSettings,
    initialSettingsActionState,
  );
  return (
    <form action={action} className={styles.editor} noValidate>
      <nav aria-label="Settings sections" className={styles.nav}>
        <a href="#general">General</a>
        <a href="#branding">Branding</a>
        <a href="#seo">SEO</a>
        <a href="#contact">Contact</a>
        <a href="#social">Social</a>
        <a href="#navigation">Navigation</a>
        <a href="#business">Business</a>
        <a href="#analytics">Analytics</a>
        <a href="#features">Features</a>
        <a href="#maintenance">Maintenance</a>
      </nav>
      <fieldset disabled={!canEdit} className={styles.disableOverlay}>
        <div className={styles.sections}>
          <Group
            id="general"
            title="General"
            description="Core identity and regional behavior."
          >
            <Field
              label="Site Name"
              name="site_name"
              value={settings.site_name}
            />
            <Field label="Tagline" name="tagline" value={settings.tagline} />
            <Field
              label="Site URL"
              name="site_url"
              type="url"
              value={settings.site_url}
            />
            <Field
              label="Default Language"
              name="default_language"
              value={settings.default_language}
            />
            <Field label="Timezone" name="timezone" value={settings.timezone} />
          </Group>
          <Group
            id="branding"
            title="Branding"
            description="Select published assets from the Media Library; direct URL entry is intentionally unavailable."
          >
            <Media
              label="Logo"
              media={media}
              name="logo_media_id"
              value={settings.logo_media_id}
            />
            <Media
              label="Favicon"
              media={media}
              name="favicon_media_id"
              value={settings.favicon_media_id}
            />
            <Media
              label="OpenGraph Image"
              media={media}
              name="open_graph_media_id"
              value={settings.open_graph_media_id}
            />
          </Group>
          <Group
            id="seo"
            title="SEO"
            description="Defaults inherited by pages that do not provide a more specific value."
          >
            <Field
              label="Default Meta Title"
              name="default_meta_title"
              value={settings.default_meta_title}
            />
            <Field
              label="Default Meta Description"
              name="default_meta_description"
              textarea
              value={settings.default_meta_description}
            />
            <Field
              label="Default Keywords"
              name="default_keywords"
              value={settings.default_keywords.join(", ")}
            />
            <Select
              label="Robots"
              name="robots"
              options={["index,follow", "noindex,nofollow"]}
              value={settings.robots}
            />
            <Field
              label="Canonical Base URL"
              name="canonical_base_url"
              type="url"
              value={settings.canonical_base_url}
            />
          </Group>
          <Group
            id="contact"
            title="Contact"
            description="Public communication and location references."
          >
            <Field
              label="Email"
              name="contact_email"
              type="email"
              value={settings.contact_email}
            />
            <Field
              label="Phone"
              name="contact_phone"
              value={settings.contact_phone}
            />
            <Field label="WhatsApp" name="whatsapp" value={settings.whatsapp} />
            <Field
              label="Address"
              name="address"
              textarea
              value={settings.address}
            />
            <Field
              label="Google Maps URL"
              name="google_maps_url"
              type="url"
              value={settings.google_maps_url}
            />
          </Group>
          <Group
            id="social"
            title="Social Media"
            description="Only configured channels are rendered publicly."
          >
            {(
              [
                ["Facebook", "facebook_url"],
                ["Instagram", "instagram_url"],
                ["LinkedIn", "linkedin_url"],
                ["GitHub", "github_url"],
                ["X", "x_url"],
                ["YouTube", "youtube_url"],
              ] as const
            ).map(([label, name]) => (
              <Field
                key={name}
                label={label}
                name={name}
                type="url"
                value={
                  settings[name as keyof SiteConfiguration] as string | null
                }
              />
            ))}
          </Group>
          <Group
            id="navigation"
            title="Navigation"
            description="One entry per line. Header: Label|Path. Footer: Group|Label|Path."
          >
            <Field
              label="Header Navigation"
              name="header_navigation"
              textarea
              value={navText(settings)}
            />
            <Field
              label="Footer Navigation"
              name="footer_navigation"
              textarea
              value={footerText(settings)}
            />
            <Field
              label="Footer Copyright"
              name="footer_copyright"
              value={settings.footer_copyright}
            />
          </Group>
          <Group
            id="business"
            title="Business"
            description="Operational information shown only where appropriate."
          >
            <Field
              label="Working Hours"
              name="working_hours"
              textarea
              value={settings.working_hours}
            />
            <Field
              label="Emergency Contact"
              name="emergency_contact"
              value={settings.emergency_contact}
            />
            <Field
              label="Business Registration Number"
              name="business_registration_number"
              value={settings.business_registration_number}
            />
          </Group>
          <Group
            id="analytics"
            title="Analytics"
            description="Identifiers only; consent-aware script activation remains governed by the application."
          >
            <Field
              label="Google Analytics ID"
              name="google_analytics_id"
              value={settings.google_analytics_id}
            />
            <Field
              label="Google Tag Manager ID"
              name="google_tag_manager_id"
              value={settings.google_tag_manager_id}
            />
            <Field
              label="Microsoft Clarity ID"
              name="microsoft_clarity_id"
              value={settings.microsoft_clarity_id}
            />
          </Group>
          <Group
            id="features"
            title="Feature Toggles"
            description="Control public feature availability without deleting content."
          >
            <Toggle
              label="Enable Blog"
              name="enable_blog"
              value={settings.enable_blog}
            />
            <Toggle
              label="Enable Testimonials"
              name="enable_testimonials"
              value={settings.enable_testimonials}
            />
            <Toggle
              label="Enable Contact Form"
              name="enable_contact_form"
              value={settings.enable_contact_form}
            />
            <Toggle
              label="Enable Newsletter"
              name="enable_newsletter"
              value={settings.enable_newsletter}
            />
            <Toggle
              label="Enable AI Features"
              name="enable_ai_features"
              value={settings.enable_ai_features}
            />
          </Group>
          <Group
            id="maintenance"
            title="Maintenance"
            description="Publish a controlled temporary interruption state."
          >
            <Toggle
              label="Maintenance Mode"
              name="maintenance_mode"
              value={settings.maintenance_mode}
            />
            <Field
              label="Maintenance Message"
              name="maintenance_message"
              textarea
              value={settings.maintenance_message}
            />
          </Group>
          <div className={styles.saveBar}>
            <div>
              <strong>
                {canEdit
                  ? "Ready to publish configuration"
                  : "Read-only configuration"}
              </strong>
              <p aria-live="polite">
                {state.message ||
                  (canEdit
                    ? "Saving refreshes public layout and metadata caches."
                    : "Only administrators can save changes.")}
              </p>
              {state.fieldErrors ? (
                <ul
                  className={styles.errors}
                  aria-label="Settings validation errors"
                >
                  {Object.entries(state.fieldErrors).flatMap(
                    ([field, messages]) =>
                      messages.map((message) => (
                        <li key={`${field}-${message}`}>
                          {field.replaceAll("_", " ")}: {message}
                        </li>
                      )),
                  )}
                </ul>
              ) : null}
            </div>
            <Button disabled={!canEdit || pending} type="submit">
              <Save aria-hidden="true" />
              {pending ? "Saving…" : "Save Settings"}
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
function Group({
  children,
  description,
  id,
  title,
}: {
  readonly children: React.ReactNode;
  readonly description: string;
  readonly id: string;
  readonly title: string;
}) {
  return (
    <section className={styles.group} id={id} aria-labelledby={`${id}-heading`}>
      <header>
        <span className={styles.eyebrow}>{id}</span>
        <h2 id={`${id}-heading`}>{title}</h2>
        <p>{description}</p>
      </header>
      <div className={styles.grid}>{children}</div>
    </section>
  );
}
function Field({
  label,
  name,
  textarea = false,
  type = "text",
  value,
}: {
  readonly label: string;
  readonly name: string;
  readonly textarea?: boolean;
  readonly type?: string;
  readonly value: string | null;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {textarea ? (
        <textarea defaultValue={value ?? ""} name={name} />
      ) : (
        <input defaultValue={value ?? ""} name={name} type={type} />
      )}
    </label>
  );
}
function Select({
  label,
  name,
  options,
  value,
}: {
  readonly label: string;
  readonly name: string;
  readonly options: readonly string[];
  readonly value: string;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <select defaultValue={value} name={name}>
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </label>
  );
}
function Media({
  label,
  media,
  name,
  value,
}: {
  readonly label: string;
  readonly media: readonly MediaLibraryRow[];
  readonly name: string;
  readonly value: string | null;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <select defaultValue={value ?? ""} name={name}>
        <option value="">Use code-rendered default</option>
        {media.map((item) => (
          <option key={item.id} value={item.id}>
            {item.file_name} · {item.format.toUpperCase()}
          </option>
        ))}
      </select>
      <small>Media Library asset only</small>
    </label>
  );
}
function Toggle({
  label,
  name,
  value,
}: {
  readonly label: string;
  readonly name: string;
  readonly value: boolean;
}) {
  return (
    <label className={styles.toggle}>
      <input defaultChecked={value} name={name} type="checkbox" />
      <span>{label}</span>
    </label>
  );
}
