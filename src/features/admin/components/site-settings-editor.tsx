"use client";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  initialSiteSettingsActionState,
  saveSiteSettings,
} from "@/lib/actions/site-settings";
import type { MediaLibraryRow, SiteConfigurationRow } from "@/types/database";
import styles from "./admin-site-settings.module.css";

type TextField = {
  readonly key: Extract<keyof SiteConfigurationRow, string>;
  readonly label: string;
  readonly type?: string;
};
const sections: readonly {
  readonly title: string;
  readonly fields: readonly TextField[];
}[] = [
  {
    title: "General",
    fields: [
      { key: "site_name", label: "Company name" },
      { key: "tagline", label: "Tagline" },
      { key: "short_description", label: "Short description" },
      { key: "long_description", label: "Long description" },
      { key: "site_url", label: "Site URL", type: "url" },
      { key: "canonical_base_url", label: "Canonical base URL", type: "url" },
      { key: "default_language", label: "Default language" },
      { key: "timezone", label: "Timezone" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { key: "contact_email", label: "Primary email", type: "email" },
      { key: "secondary_email", label: "Secondary email", type: "email" },
      { key: "contact_phone", label: "Phone", type: "tel" },
      { key: "whatsapp", label: "WhatsApp" },
      { key: "address", label: "Office address" },
      { key: "google_maps_url", label: "Google Maps URL", type: "url" },
      { key: "business_hours", label: "Business hours" },
    ],
  },
  {
    title: "Social",
    fields: [
      { key: "linkedin_url", label: "LinkedIn", type: "url" },
      { key: "github_url", label: "GitHub", type: "url" },
      { key: "facebook_url", label: "Facebook", type: "url" },
      { key: "instagram_url", label: "Instagram", type: "url" },
      { key: "x_url", label: "X", type: "url" },
      { key: "youtube_url", label: "YouTube", type: "url" },
    ],
  },
  {
    title: "SEO",
    fields: [
      { key: "default_meta_title", label: "Default title" },
      { key: "default_meta_description", label: "Default description" },
      { key: "default_keywords", label: "Default keywords, comma separated" },
    ],
  },
  {
    title: "Analytics",
    fields: [
      { key: "google_analytics_id", label: "Google Analytics ID" },
      { key: "google_tag_manager_id", label: "Google Tag Manager" },
      { key: "meta_pixel_id", label: "Meta Pixel" },
      { key: "microsoft_clarity_id", label: "Microsoft Clarity" },
    ],
  },
  {
    title: "Footer",
    fields: [
      { key: "footer_copyright", label: "Copyright" },
      { key: "footer_description", label: "Footer description" },
      { key: "footer_cta", label: "Footer CTA" },
      { key: "footer_button_text", label: "Footer button text" },
      { key: "footer_button_link", label: "Footer button link" },
    ],
  },
];
const mediaFields = [
  { key: "logo_media_id", label: "Logo" },
  { key: "white_logo_media_id", label: "White logo" },
  { key: "favicon_media_id", label: "Favicon" },
  { key: "default_share_media_id", label: "Default share image" },
  { key: "open_graph_media_id", label: "OpenGraph image" },
  { key: "twitter_media_id", label: "Twitter image" },
] as const;
export function SiteSettingsEditor({
  media,
  settings,
}: {
  readonly media: readonly MediaLibraryRow[];
  readonly settings: SiteConfigurationRow;
}) {
  const [state, action, pending] = useActionState(
    saveSiteSettings,
    initialSiteSettingsActionState,
  );
  const error = (key: string) => state.fieldErrors?.[key]?.[0];
  return (
    <form action={action} className={styles.form}>
      {sections.map((section) => (
        <fieldset key={section.title}>
          <legend>{section.title}</legend>
          <div className={styles.grid}>
            {section.fields.map(({ key, label, type = "text" }) => {
              const id = `${String(key)}-error`;
              const value = Array.isArray(settings[key])
                ? settings[key].join(", ")
                : String(settings[key] ?? "");
              return (
                <label key={key}>
                  <span>{label}</span>
                  {key === "long_description" ||
                  key === "default_meta_description" ||
                  key === "footer_description" ? (
                    <textarea
                      name={key}
                      defaultValue={value}
                      rows={4}
                      aria-invalid={Boolean(error(key))}
                      aria-describedby={error(key) ? id : undefined}
                    />
                  ) : (
                    <input
                      name={key}
                      type={type}
                      defaultValue={value}
                      aria-invalid={Boolean(error(key))}
                      aria-describedby={error(key) ? id : undefined}
                    />
                  )}{" "}
                  {error(key) ? <small id={id}>{error(key)}</small> : null}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
      <fieldset>
        <legend>Brand media</legend>
        <div className={styles.grid}>
          {mediaFields.map(({ key, label }) => (
            <label key={key}>
              <span>{label}</span>
              <select name={key} defaultValue={String(settings[key] ?? "")}>
                <option value="">No asset selected</option>
                {media.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.file_name}
                  </option>
                ))}
              </select>
              <small>Published Media Library assets only.</small>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Announcement banner</legend>
        <label className={styles.check}>
          <input
            type="checkbox"
            name="announcement_enabled"
            defaultChecked={settings.announcement_enabled}
          />
          <span>Enable announcement banner</span>
        </label>
        <div className={styles.grid}>
          {(
            [
              ["announcement_text", "Text"],
              ["announcement_button_text", "Button text"],
              ["announcement_button_url", "Button URL"],
            ] as const
          ).map(([key, label]) => (
            <label key={key}>
              <span>{label}</span>
              <input name={key} defaultValue={settings[key] ?? ""} />
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Maintenance</legend>
        <label className={styles.check}>
          <input
            type="checkbox"
            name="maintenance_mode"
            defaultChecked={settings.maintenance_mode}
          />
          <span>Enable maintenance mode</span>
        </label>
        <label>
          <span>Maintenance message</span>
          <textarea
            name="maintenance_message"
            defaultValue={settings.maintenance_message}
            rows={3}
          />
        </label>
      </fieldset>
      <div
        aria-live="polite"
        className={state.status === "error" ? styles.error : styles.message}
      >
        {pending
          ? "Saving settings…"
          : state.message || "Changes are validated before publishing."}
      </div>
      <div className={styles.actions}>
        <Button
          type="submit"
          name="intent"
          value="draft"
          variant="outline"
          disabled={pending}
        >
          Save draft
        </Button>
        <Button type="submit" name="intent" value="publish" disabled={pending}>
          Publish settings
        </Button>
      </div>
    </form>
  );
}
