import { ArrowRight, FileSearch } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/primitives";
import type { SearchGroup } from "@/lib/search/public-search";
import { SearchController } from "./search-controller";

function Highlight({
  query,
  text,
}: {
  readonly query: string;
  readonly text: string;
}) {
  const term = query.trim();
  if (!term) return text;
  const index = text.toLocaleLowerCase().indexOf(term.toLocaleLowerCase());
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded bg-primary/10 px-0.5 text-foreground">
        {text.slice(index, index + term.length)}
      </mark>
      {text.slice(index + term.length)}
    </>
  );
}
export function SearchPage({
  groups,
  query,
}: {
  readonly groups: readonly SearchGroup[];
  readonly query: string;
}) {
  const count = groups.reduce(
    (total, group) => total + group.results.length,
    0,
  );
  return (
    <section
      aria-labelledby="search-heading"
      className="section-spacing min-h-[70vh]"
    >
      <Container size="wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Global search
          </p>
          <h1
            id="search-heading"
            className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-6xl"
          >
            Find the right path forward.
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            Search published services, project work, and practical insights from
            one place.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <SearchController initialQuery={query} />
        </div>
        <div aria-live="polite" className="mx-auto mt-10 max-w-5xl">
          {query.trim().length < 2 ? (
            <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
              <FileSearch className="mx-auto size-8" aria-hidden="true" />
              <p className="mt-4 font-medium text-foreground">
                Start with at least two characters
              </p>
              <p className="mt-2 text-sm">
                Results update after a short pause while you type.
              </p>
            </div>
          ) : count === 0 ? (
            <div className="rounded-2xl border border-dashed p-10 text-center">
              <p className="font-semibold">
                No published content matched “{query}”.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a broader term or browse the main navigation.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              <p className="text-sm text-muted-foreground">
                {count} {count === 1 ? "result" : "results"} across published
                content
              </p>
              {groups
                .filter((group) => group.results.length)
                .map((group) => (
                  <section
                    key={group.label}
                    aria-labelledby={`search-${group.label.toLowerCase()}`}
                  >
                    <h2
                      id={`search-${group.label.toLowerCase()}`}
                      className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      {group.label}
                    </h2>
                    <ul className="mt-4 grid gap-3 md:grid-cols-2">
                      {group.results.map((result) => (
                        <li key={result.href}>
                          <Link
                            prefetch
                            href={result.href}
                            className="focus-ring group flex h-full min-h-36 flex-col rounded-2xl border bg-card p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-md"
                          >
                            <span className="font-semibold">
                              <Highlight query={query} text={result.title} />
                            </span>
                            <span className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                              <Highlight
                                query={query}
                                text={result.description}
                              />
                            </span>
                            <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold">
                              Open{" "}
                              <ArrowRight
                                className="size-4 transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                              />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
