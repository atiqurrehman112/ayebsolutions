import Image from "next/image";
import { Download, FileText, ImageOff } from "lucide-react";

import {
  cloudinaryMediaUrl,
  isImageMedia,
  isVideoMedia,
  mediaBlurUrl,
} from "@/lib/media/media";
import { cn } from "@/lib/utils";
import type { MediaLibraryRow } from "@/types/database";

interface CmsMediaProps {
  readonly alt?: string;
  readonly className?: string;
  readonly decorative?: boolean;
  readonly fill?: boolean;
  readonly media: MediaLibraryRow | null | undefined;
  readonly priority?: boolean;
  readonly sizes?: string;
}

export function CmsMedia({
  alt,
  className,
  decorative = false,
  fill = false,
  media,
  priority = false,
  sizes = "100vw",
}: CmsMediaProps) {
  if (!media) {
    return (
      <div
        className={cn(
          "grid min-h-40 place-items-center bg-muted/30",
          className,
        )}
        role="img"
        aria-label={decorative ? undefined : (alt ?? "Media is not configured")}
        aria-hidden={decorative || undefined}
      >
        <ImageOff className="size-8 text-muted-foreground" aria-hidden="true" />
      </div>
    );
  }

  if (isImageMedia(media)) {
    const blurDataURL = mediaBlurUrl(media);
    return (
      <Image
        alt={decorative ? "" : (alt ?? media.alt ?? media.file_name)}
        className={cn(fill && "absolute inset-0 size-full", className)}
        fill={fill}
        height={fill ? undefined : (media.height ?? 900)}
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        sizes={sizes}
        src={cloudinaryMediaUrl(media, { width: 1920 })}
        unoptimized={media.format === "svg"}
        width={fill ? undefined : (media.width ?? 1600)}
      />
    );
  }

  if (isVideoMedia(media)) {
    return (
      <video
        aria-label={
          decorative ? undefined : (alt ?? media.alt ?? media.file_name)
        }
        aria-hidden={decorative || undefined}
        className={cn(
          fill && "absolute inset-0 size-full object-cover",
          className,
        )}
        controls={!decorative}
        muted={decorative}
        playsInline
        preload="metadata"
      >
        <source src={media.secure_url} type={media.mime_type} />
      </video>
    );
  }

  return (
    <a
      className={cn(
        "focus-ring flex min-h-40 items-center justify-center gap-3 rounded-xl border bg-muted/20 p-6 text-sm font-semibold",
        className,
      )}
      href={media.secure_url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${media.file_name}`}
    >
      <FileText className="size-6" aria-hidden="true" />
      <span className="truncate">{media.file_name}</span>
      <Download className="size-4" aria-hidden="true" />
    </a>
  );
}
