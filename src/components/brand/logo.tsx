import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  readonly className?: string;
  readonly compact?: boolean;
  readonly linked?: boolean;
}

function LogoMark({ className }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn("size-9 shrink-0", className)}
    >
      <rect width="40" height="40" rx="11" className="fill-primary" />
      <path
        d="m10.5 29 8-19h4l8 19h-5l-1.4-3.8h-8.5L14.1 29h-3.6Zm6.7-8h5.2L20 14.7 17.2 21Z"
        className="fill-primary-foreground"
      />
    </svg>
  );
}

function Logo({ className, compact = false, linked = true }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {!compact ? (
        <span className="text-base font-bold tracking-tight sm:text-lg">
          Ayeb Solutions
        </span>
      ) : null}
    </span>
  );

  return linked ? (
    <Link href="/" aria-label="Ayeb Solutions home" className="rounded-md">
      {content}
    </Link>
  ) : (
    content
  );
}

export { Logo, LogoMark };
export type { LogoProps };
