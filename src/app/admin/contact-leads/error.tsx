"use client";
import { Button } from "@/components/ui/button";
import styles from "@/features/admin/components/admin-contact-leads.module.css";
export default function ContactLeadsError({
  reset,
}: {
  readonly reset: () => void;
}) {
  return (
    <main className={styles.page}>
      <div className={styles.empty}>
        <h1>Contact leads are unavailable</h1>
        <p>Check the database connection and migration status, then retry.</p>
        <Button onClick={reset}>Retry</Button>
      </div>
    </main>
  );
}
