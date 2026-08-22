"use client";
import { Button } from "@/components/ui/button";
export default function ErrorState({ reset }: { readonly reset: () => void }) {
  return (
    <main>
      <h1>Site Settings unavailable</h1>
      <p>
        The singleton could not be loaded. Confirm the Sprint 13D migration and
        retry.
      </p>
      <Button onClick={reset}>Retry</Button>
    </main>
  );
}
