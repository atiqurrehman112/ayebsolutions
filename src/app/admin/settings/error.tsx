"use client";
import { Button } from "@/components/ui/button";
import styles from "@/features/admin/components/admin-settings.module.css";
export default function SettingsError({
  reset,
}: {
  readonly reset: () => void;
}) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <h1>Site settings are unavailable</h1>
          <p>
            Confirm the production configuration migration and database
            connection, then retry.
          </p>
          <Button className="mt-6" onClick={reset}>
            Retry
          </Button>
        </div>
      </section>
    </main>
  );
}
