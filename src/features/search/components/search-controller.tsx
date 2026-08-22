"use client";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function SearchController({
  initialQuery,
}: {
  readonly initialQuery: string;
}) {
  const [value, setValue] = useState(initialQuery);
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = window.setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      const query = value.trim();
      if (query) next.set("q", query);
      else next.delete("q");
      router.replace(`${pathname}${next.size ? `?${next}` : ""}`, {
        scroll: false,
      });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [params, pathname, router, value]);
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <label htmlFor="global-search-query" className="sr-only">
        Search services, portfolio projects, and articles
      </label>
      <input
        id="global-search-query"
        name="q"
        type="search"
        autoComplete="off"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search services, work, and insights"
        className="h-14 w-full rounded-xl border bg-background px-12 text-base shadow-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      {value ? (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="focus-ring absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
