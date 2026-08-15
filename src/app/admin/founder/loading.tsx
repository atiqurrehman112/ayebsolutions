export default function FounderLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading Founder Profile"
      className="mx-auto max-w-[100rem]"
    >
      <div className="h-64 animate-pulse rounded-3xl bg-muted" />
      <div className="mt-6 h-96 animate-pulse rounded-3xl bg-muted" />
    </main>
  );
}
