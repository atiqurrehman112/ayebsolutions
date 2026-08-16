import type { MediaLibraryRow, SiteConfigurationRow } from "@/types/database";
import { SiteSettingsEditor } from "./site-settings-editor";
import styles from "./admin-site-settings.module.css";

export function AdminSiteSettings({
  media,
  settings,
}: {
  readonly media: readonly MediaLibraryRow[];
  readonly settings: SiteConfigurationRow;
}) {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span>Global singleton</span>
          <h1>Site Settings</h1>
          <p>
            Manage the organization identity, contact channels, search defaults,
            brand media, footer, analytics, announcement, and maintenance state
            from one authoritative record.
          </p>
        </div>
        <strong>{settings.status}</strong>
      </header>
      <section className={styles.summary} aria-label="Configuration status">
        <article>
          <span>Record</span>
          <strong>Singleton enforced</strong>
        </article>
        <article>
          <span>Media source</span>
          <strong>Cloudinary library</strong>
        </article>
        <article>
          <span>Public cache</span>
          <strong>Five-minute ISR</strong>
        </article>
      </section>
      <section className={styles.panel} aria-labelledby="settings-editor">
        <div>
          <span>Configuration editor</span>
          <h2 id="settings-editor">Business identity and platform defaults</h2>
          <p>
            Only administrators can publish changes. Empty optional values are
            hidden publicly.
          </p>
        </div>
        <SiteSettingsEditor media={media} settings={settings} />
      </section>
    </main>
  );
}
