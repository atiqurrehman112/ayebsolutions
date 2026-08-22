import styles from "@/features/admin/components/admin-testimonials.module.css";
export default function TestimonialsLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading testimonials"
      className={styles.page}
    >
      <div className={styles.skeleton} style={{ minHeight: "18rem" }} />
      <div className={styles.summary}>
        {[0, 1, 2].map((item) => (
          <div className={styles.skeleton} key={item} />
        ))}
      </div>
      <div className={styles.skeleton} style={{ minHeight: "30rem" }} />
      <span className="sr-only" role="status">
        Loading testimonials
      </span>
    </main>
  );
}
