import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/primitives";

interface SystemStateProps {
  readonly code?: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: React.ReactNode;
  readonly retry?: React.ReactNode;
}

function SystemState({
  code,
  title,
  description,
  icon,
  retry,
}: SystemStateProps) {
  return (
    <Container
      size="content"
      className="flex min-h-[65dvh] min-w-0 max-w-[100vw] items-center justify-center py-16 text-center"
    >
      <div className="w-full min-w-0 max-w-xl">
        {icon ? (
          <div className="mx-auto mb-6 grid size-16 place-items-center rounded-2xl border bg-muted text-muted-foreground">
            {icon}
          </div>
        ) : null}
        {code ? (
          <p className="font-mono text-sm font-semibold tracking-[0.2em] text-muted-foreground">
            {code}
          </p>
        ) : null}
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {retry}
          <Button asChild>
            <Link href="/">
              <Home className="size-4" aria-hidden="true" />
              Go home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Contact support
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}

export { SystemState };
