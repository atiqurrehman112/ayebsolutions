import { Container } from "@/components/layout/primitives";
import { Skeleton } from "@/components/ui/status";

export default function Loading() {
  return (
    <Container
      aria-busy="true"
      aria-label="Loading page"
      className="min-h-[60dvh] py-16 sm:py-20"
    >
      <span className="sr-only">Loading page</span>
      <div className="mx-auto max-w-4xl">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-6 h-12 w-full max-w-2xl sm:h-16" />
        <Skeleton className="mt-4 h-6 w-full max-w-xl" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="rounded-xl border p-5">
              <Skeleton className="size-11" />
              <Skeleton className="mt-5 h-6 w-2/3" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
