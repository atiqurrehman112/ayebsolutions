import styles from "@/features/admin/components/admin-portfolio.module.css";

export default function PortfolioLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading portfolio projects"
      className={styles.page}
    >
      <div className={styles.skeleton} style={{ minHeight: "18rem" }} />
      <div className={styles.summary}>
        {[0, 1, 2].map((item) => (
          <div className={styles.skeleton} key={item} />
        ))}
      </div>
      <div className={styles.skeleton} style={{ minHeight: "28rem" }} />
      <span className="sr-only" role="status">
        Loading portfolio projects
      </span>
    </main>
  );
}
