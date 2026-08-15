"use client";
import { Button } from "@/components/ui/button";
export default function FounderError({
  reset,
}: {
  readonly reset: () => void;
}) {
  return (
    <main className="grid min-h-[55vh] place-items-center text-center">
      <div>
        <h1 className="text-3xl font-bold">Founder Profile is unavailable</h1>
        <p className="mt-4 text-muted-foreground">
          The singleton profile could not be loaded. Confirm the migration and
          connection, then retry.
        </p>
        <Button className="mt-6" onClick={reset}>
          Retry
        </Button>
      </div>
    </main>
  );
}
