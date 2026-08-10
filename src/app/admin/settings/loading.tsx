import styles from "@/features/admin/components/admin-settings.module.css";
export default function SettingsLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading site settings"
      className={styles.page}
    >
      <div className="min-h-72 animate-pulse rounded-3xl bg-muted motion-reduce:animate-none" />
      <div className="mt-4 min-h-[45rem] animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
      <span className="sr-only" role="status">
        Loading site settings
      </span>
    </main>
  );
}
