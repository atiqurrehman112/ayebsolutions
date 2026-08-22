"use client";
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "@/features/admin/components/admin-media.module.css";
export default function MediaError({ reset }: { readonly reset: () => void }) {
  return (
    <main className={styles.errorPage}>
      <div>
        <CircleAlert aria-hidden="true" />
        <h1>Media data is unavailable</h1>
        <p>
          We could not load the asset library. Check Cloudinary and database
          configuration, then try again.
        </p>
        <Button onClick={reset}>Retry</Button>
      </div>
    </main>
  );
}
