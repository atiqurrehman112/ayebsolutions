import styles from "@/features/admin/components/admin-contact-leads.module.css";
export default function ContactLeadsLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading contact leads"
      className={styles.page}
    >
      <div className="min-h-72 animate-pulse rounded-3xl bg-muted motion-reduce:animate-none" />
      <div className="mt-4 min-h-[32rem] animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
      <span className="sr-only" role="status">
        Loading contact leads
      </span>
    </main>
  );
}
