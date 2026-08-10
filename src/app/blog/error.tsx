"use client";

import { Button } from "@/components/ui/button";

export default function BlogError({ reset }: { readonly reset: () => void }) {
  return (
    <main className="mx-auto grid min-h-[65vh] max-w-3xl place-content-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        Insights are temporarily unavailable
      </h1>
      <p className="mt-5 text-muted-foreground">
        The published article library could not be loaded. Please try again.
      </p>
      <Button className="mx-auto mt-7" onClick={reset}>
        Retry
      </Button>
    </main>
  );
}
