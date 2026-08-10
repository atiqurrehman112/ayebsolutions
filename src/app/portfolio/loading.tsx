export default function PortfolioLoading() {
  return (
    <main aria-busy="true" aria-label="Loading portfolio">
      <div className="min-h-[70vh] animate-pulse bg-muted motion-reduce:animate-none" />
      <div className="mx-auto mt-8 min-h-[40rem] max-w-[100rem] animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
      <span className="sr-only" role="status">
        Loading published portfolio
      </span>
    </main>
  );
}
