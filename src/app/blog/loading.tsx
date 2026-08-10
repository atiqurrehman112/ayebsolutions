export default function BlogLoading() {
  return (
    <main aria-busy="true" aria-label="Loading insights">
      <div className="min-h-[65vh] animate-pulse bg-muted motion-reduce:animate-none" />
      <div className="mx-auto mt-8 min-h-[36rem] max-w-[100rem] animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
      <span className="sr-only" role="status">
        Loading published articles
      </span>
    </main>
  );
}
