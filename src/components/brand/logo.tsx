import Link from "next/link";

import { cn } from "@/lib/utils";
import { CmsMedia } from "@/components/media/cms-media";
import type { MediaLibraryRow } from "@/types/database";

interface LogoProps {
  readonly className?: string;
  readonly compact?: boolean;
  readonly linked?: boolean;
  readonly media?: MediaLibraryRow | null;
  readonly name?: string;
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

function Logo({
  className,
  compact = false,
  linked = true,
  media,
  name = "Ayeb Solutions",
}: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {media ? (
        <CmsMedia
          alt=""
          className="size-9 rounded-xl object-contain"
          decorative
          media={media}
          sizes="36px"
        />
      ) : (
        <LogoMark />
      )}
      {!compact ? (
        <span className="text-base font-bold tracking-tight sm:text-lg">
          {name}
        </span>
      ) : null}
    </span>
  );

  return linked ? (
    <Link href="/" aria-label={`${name} home`} className="rounded-md">
      {content}
    </Link>
  ) : (
    content
  );
}

export { Logo, LogoMark };
export type { LogoProps };
