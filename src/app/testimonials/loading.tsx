import { Container } from "@/components/layout/primitives";

export default function TestimonialsLoading() {
  return (
    <main aria-busy="true" aria-label="Loading testimonials">
      <section className="border-b bg-muted/[0.18] py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[100rem]">
          <div className="h-4 w-28 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
          <div className="mt-14 max-w-5xl space-y-5">
            <div className="h-14 w-full max-w-4xl animate-pulse rounded-2xl bg-muted motion-reduce:animate-none sm:h-24" />
            <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-muted motion-reduce:animate-none sm:h-24" />
          </div>
        </Container>
      </section>
      <section className="py-20 sm:py-24">
        <Container className="max-w-[100rem]">
          <div className="h-28 animate-pulse rounded-3xl bg-muted motion-reduce:animate-none" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl bg-muted motion-reduce:animate-none"
              />
            ))}
          </div>
        </Container>
      </section>
      <span className="sr-only" role="status">
        Loading published testimonials
      </span>
    </main>
  );
}
