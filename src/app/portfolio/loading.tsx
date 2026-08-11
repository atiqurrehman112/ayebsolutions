import { Container } from "@/components/layout/primitives";

export default function PortfolioLoading() {
  return (
    <main aria-busy="true" aria-label="Loading portfolio">
      <section className="border-b py-20 sm:py-28">
        <Container className="max-w-[100rem]">
          <div className="h-4 w-36 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
          <div className="mt-10 h-16 max-w-4xl animate-pulse rounded-2xl bg-muted motion-reduce:animate-none sm:h-28" />
          <div className="mt-6 h-6 max-w-2xl animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div
                className="h-24 animate-pulse bg-card motion-reduce:animate-none"
                key={item}
              />
            ))}
          </div>
        </Container>
      </section>
      <section className="py-16 sm:py-24">
        <Container className="max-w-[100rem]">
          <div className="h-28 animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div
                className="overflow-hidden rounded-2xl border bg-card"
                key={item}
              >
                <div className="aspect-[16/10] animate-pulse bg-muted motion-reduce:animate-none" />
                <div className="space-y-4 p-6">
                  <div className="h-5 w-24 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
                  <div className="h-8 w-3/4 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                  <div className="h-16 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <span className="sr-only" role="status">
        Loading published portfolio
      </span>
    </main>
  );
}
