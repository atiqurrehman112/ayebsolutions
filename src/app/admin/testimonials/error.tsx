"use client";
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "@/features/admin/components/admin-testimonials.module.css";
export default function TestimonialsError({
  reset,
}: {
  readonly reset: () => void;
}) {
  return (
    <main className={styles.errorPage}>
      <div>
        <CircleAlert aria-hidden="true" />
        <h1>Testimonial data is unavailable</h1>
        <p>
          We could not load the moderation library. Check the database
          connection, then try again.
        </p>
        <Button onClick={reset}>Retry</Button>
      </div>
    </main>
  );
}
