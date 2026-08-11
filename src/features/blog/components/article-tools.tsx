"use client";

import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./blog-article-page.module.css";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={styles.progressTrack} aria-hidden="true">
      <span
        className={styles.progressValue}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function CopyArticleLink({ url }: { readonly url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button type="button" variant="outline" onClick={copy} aria-live="polite">
      {copied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Link2 className="size-4" aria-hidden="true" />
      )}
      {copied ? "Link copied" : "Copy link"}
    </Button>
  );
}
