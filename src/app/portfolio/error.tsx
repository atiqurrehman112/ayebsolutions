"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortfolioError({
  reset,
}: {
  readonly reset: () => void;
}) {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-3xl place-content-center px-4 py-20 text-center">
      <span className="mx-auto font-mono text-xs uppercase tracking-[.16em] text-muted-foreground">
        Portfolio status
      </span>
      <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
        The published collection is temporarily unavailable.
      </h1>
      <p className="mx-auto mt-6 max-w-xl leading-8 text-muted-foreground">
        The project library could not be loaded. Retry the request, or return
        home while the connection recovers.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button onClick={reset}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Retry portfolio
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </main>
  );
}
