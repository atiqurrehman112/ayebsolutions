import { Badge } from "@/components/ui/status";
import type { MediaLibraryRow } from "@/types/database";
import type { SiteConfiguration } from "@/types/settings";
import { SettingsEditor } from "./settings-editor";
import styles from "./admin-settings.module.css";

interface Props {
  readonly canEdit: boolean;
  readonly media: readonly MediaLibraryRow[];
  readonly settings: SiteConfiguration;
}
export function AdminSettings({ canEdit, media, settings }: Props) {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Production configuration</span>
          <h1>Site Settings</h1>
          <p>
            Manage public identity, metadata, navigation, contact details,
            analytics references, feature availability, and maintenance state
            from one governed source.
          </p>
        </div>
        <div className={styles.heroStatus}>
          <Badge variant={canEdit ? "secondary" : "outline"}>
            {canEdit ? "Administrator access" : "Read only"}
          </Badge>
          <p>
            Published settings feed the application shell and metadata
            automatically.
          </p>
        </div>
      </header>
      <SettingsEditor canEdit={canEdit} media={media} settings={settings} />
    </main>
  );
}
