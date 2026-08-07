"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";

export default function GlobalError({
  error: _error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="grid min-h-dvh place-items-center bg-background p-6 text-foreground">
        <main className="max-w-xl text-center">
          <TriangleAlert
            className="mx-auto size-12 text-destructive"
            aria-hidden="true"
          />
          <p className="mt-6 font-mono text-sm font-semibold tracking-[0.2em] text-muted-foreground">
            500
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            The application encountered an error
          </h1>
          <p className="mt-5 text-muted-foreground">
            Refresh this application shell and try the request again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
