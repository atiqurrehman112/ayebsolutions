"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { IconButton } from "@/components/ui/icon-button";
import type { AnnouncementConfig } from "@/types/global-settings";

function AnnouncementBar({ config }: { readonly config: AnnouncementConfig }) {
  const storageKey = `announcement:${config.id}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(
      config.enabled && localStorage.getItem(storageKey) !== "dismissed",
    );
  }, [config.enabled, storageKey]);

  if (!visible) return null;

  function dismiss() {
    localStorage.setItem(storageKey, "dismissed");
    setVisible(false);
  }

  return (
    <aside
      aria-label="Announcement"
      className="relative z-sticky border-b border-primary-foreground/15 bg-primary text-primary-foreground"
    >
      <div className="mx-auto flex min-h-10 max-w-[87.5rem] items-center justify-center gap-2 px-12 py-2 text-center text-xs sm:text-sm">
        <p>{config.message}</p>
        {config.actionLabel && config.actionHref ? (
          <Link
            href={config.actionHref}
            className="inline-flex shrink-0 items-center gap-1 font-semibold underline-offset-4 hover:underline"
          >
            {config.actionLabel}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
      <IconButton
        label="Dismiss announcement"
        variant="ghost"
        size="sm"
        onClick={dismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
      >
        <X className="size-4" aria-hidden="true" />
      </IconButton>
    </aside>
  );
}

export { AnnouncementBar };
