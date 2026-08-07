"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";

import { SystemState } from "@/components/shell/system-state";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error: _error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  return (
    <SystemState
      code="500"
      title="Something went wrong"
      description="We could not complete this request. Try again, or return to a safe starting point."
      icon={<TriangleAlert className="size-7" aria-hidden="true" />}
      retry={
        <Button onClick={reset}>
          <RefreshCw className="size-4" aria-hidden="true" />
          Try again
        </Button>
      }
    />
  );
}
