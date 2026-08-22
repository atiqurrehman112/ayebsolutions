import { Container } from "@/components/layout/primitives";
import { Skeleton } from "@/components/ui/status";
export default function SearchLoading() {
  return (
    <section
      aria-label="Loading search results"
      aria-busy="true"
      className="section-spacing min-h-[70vh]"
    >
      <Container size="wide">
        <Skeleton className="mx-auto h-14 max-w-3xl rounded-xl" />
        <div className="mx-auto mt-10 grid max-w-5xl gap-3 md:grid-cols-2">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-36 rounded-2xl" />
          ))}
        </div>
      </Container>
    </section>
  );
}
