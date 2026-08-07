import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

import { company } from "@/config/company";
import { cn } from "@/lib/utils";

interface BreadcrumbEntry {
  readonly label: string;
  readonly href: string;
}

interface SiteBreadcrumbsProps {
  readonly items: readonly [BreadcrumbEntry, ...BreadcrumbEntry[]];
  readonly className?: string;
}

function SiteBreadcrumbs({ items, className }: SiteBreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, company.url).toString(),
    })),
  };
  const safeSchema = JSON.stringify(schema).replaceAll("<", "\\u003c");

  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
          {items.map((item, index) => {
            const current = index === items.length - 1;
            return (
              <li key={item.href} className="inline-flex items-center gap-2">
                {index > 0 ? (
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                ) : null}
                {current ? (
                  <span
                    aria-current="page"
                    className="font-medium text-foreground"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                  >
                    {index === 0 ? (
                      <Home className="size-3.5" aria-hidden="true" />
                    ) : null}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeSchema }}
      />
    </>
  );
}

export { SiteBreadcrumbs };
export type { BreadcrumbEntry, SiteBreadcrumbsProps };
