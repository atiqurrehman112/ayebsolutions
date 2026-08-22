import { Badge } from "@/components/ui/status";
import type { FounderProfileRow, MediaLibraryRow } from "@/types/database";
import { FounderProfileEditor } from "./founder-profile-editor";
import styles from "./admin-founder.module.css";

export function AdminFounder({
  canEdit,
  media,
  profile,
}: {
  readonly canEdit: boolean;
  readonly media: readonly MediaLibraryRow[];
  readonly profile: FounderProfileRow | null;
}) {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Singleton identity</span>
          <h1>Founder Profile</h1>
          <p>
            Manage the founder story, credentials, contact channels, Media
            Library imagery, and public visibility from one authoritative
            record.
          </p>
        </div>
        <Badge
          variant={profile?.status === "published" ? "success" : "outline"}
        >
          {profile ? profile.status : "Not configured"}
        </Badge>
      </header>
      <section className={styles.summary} aria-label="Founder profile status">
        <article>
          <span>Record integrity</span>
          <strong>{profile ? "Singleton active" : "Ready to create"}</strong>
        </article>
        <article>
          <span>Public visibility</span>
          <strong>
            {profile?.status === "published" ? "Published" : "Hidden"}
          </strong>
        </article>
        <article>
          <span>Access</span>
          <strong>{canEdit ? "Content editor" : "Read only"}</strong>
        </article>
      </section>
      <section
        className={styles.panel}
        aria-labelledby="founder-editor-heading"
      >
        <div className={styles.panelHeading}>
          <div>
            <span className={styles.eyebrow}>Profile editor</span>
            <h2 id="founder-editor-heading">
              Founder content and presentation
            </h2>
          </div>
          <p>One record only. Media must come from the existing library.</p>
        </div>
        <FounderProfileEditor
          canEdit={canEdit}
          media={media}
          profile={profile}
        />
      </section>
    </main>
  );
}
