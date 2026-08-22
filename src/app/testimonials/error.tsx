"use client";

import { MessageSquareQuote } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function TestimonialsError({
  reset,
}: {
  readonly reset: () => void;
}) {
  return (
    <main className="mx-auto grid min-h-[72vh] max-w-3xl place-content-center px-4 py-24 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl border bg-card shadow-soft">
        <MessageSquareQuote className="size-6" aria-hidden="true" />
      </span>
      <p className="mt-7 text-xs font-semibold uppercase tracking-[.18em] text-muted-foreground">
        Published feedback
      </p>
      <h1 className="mt-4 text-balance text-4xl font-bold sm:text-5xl">
        Testimonials are temporarily unavailable.
      </h1>
      <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">
        The approved feedback collection could not be loaded. No substitute
        content has been inserted. Please retry the request.
      </p>
      <Button className="mx-auto mt-8 min-h-12" onClick={reset}>
        Retry testimonials
      </Button>
    </main>
  );
}
