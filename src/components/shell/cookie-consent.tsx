"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CookieConsentConfig } from "@/types/global-settings";

type ConsentLevel = "essential" | "all";

function CookieConsent({ config }: { readonly config: CookieConsentConfig }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(config.storageKey) === null);
  }, [config.storageKey]);

  function choose(level: ConsentLevel) {
    localStorage.setItem(config.storageKey, level);
    window.dispatchEvent(
      new CustomEvent("cookie-consent-change", { detail: level }),
    );
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-4 bottom-4 z-modal mx-auto max-w-2xl rounded-xl border bg-background/95 p-5 shadow-elevated backdrop-blur-surface sm:p-6"
    >
      <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <h2 id="cookie-consent-title" className="font-semibold">
            {config.title}
          </h2>
          <p
            id="cookie-consent-description"
            className="mt-2 text-sm leading-relaxed text-muted-foreground"
          >
            {config.description}{" "}
            <Link
              href={config.policyHref}
              className="focus-ring rounded-sm font-medium text-foreground underline underline-offset-4"
            >
              Cookie policy
            </Link>
          </p>
        </div>
        <div className="flex flex-col-reverse gap-2">
          <Button variant="ghost" size="sm" onClick={() => choose("essential")}>
            Essential only
          </Button>
          <Button size="sm" onClick={() => choose("all")}>
            Accept all
          </Button>
        </div>
      </div>
    </section>
  );
}

export { CookieConsent };
