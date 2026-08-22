export default function Loading() {
  return (
    <main aria-busy="true">
      <p className="sr-only" role="status">
        Loading Site Settings
      </p>
      <p>Loading global configuration…</p>
    </main>
  );
}
