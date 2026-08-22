import styles from "@/features/admin/components/admin-media.module.css";
export default function MediaLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading media library"
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
        Loading media library
      </span>
    </main>
  );
}
