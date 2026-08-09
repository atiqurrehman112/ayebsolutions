"use client";
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "@/features/admin/components/admin-services.module.css";
export default function ServicesError({
  reset,
}: {
  readonly reset: () => void;
}) {
  return (
    <main className={styles.errorPage}>
      <div>
        <CircleAlert aria-hidden="true" />
        <h1>Service data is unavailable</h1>
        <p>
          We could not load the service catalogue. Check the database
          connection, then try again.
        </p>
        <Button onClick={reset}>Retry</Button>
      </div>
    </main>
  );
}
