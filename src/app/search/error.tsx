"use client";
import { Button } from "@/components/ui/button";
export default function SearchError({ reset }: { readonly reset: () => void }) {
  return (
    <section className="section-spacing mx-auto min-h-[60vh] max-w-xl px-4 text-center">
      <h1 className="text-3xl font-bold">Search is temporarily unavailable.</h1>
      <p className="mt-4 text-muted-foreground">
        Your query was not lost. Please retry in a moment.
      </p>
      <Button className="mt-6" onClick={reset}>
        Retry search
      </Button>
    </section>
  );
}
