"use client";

import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command-menu";
import { IconButton } from "@/components/ui/icon-button";
import { searchNavigation } from "@/config/navigation";
import type { ShellLink } from "@/types/global-settings";

function GlobalSearch({
  brandName = "Ayeb Solutions",
  links = searchNavigation,
}: {
  readonly brandName?: string;
  readonly links?: readonly ShellLink[];
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  function navigate(href: string) {
    setOpen(false);
    router.push(href);
  }
  return (
    <>
      <IconButton
        label="Search site"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <Search className="size-5" aria-hidden="true" />
      </IconButton>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={`Search ${brandName}`}
        description="Search published services, projects, articles, or website destinations."
      >
        <form action="/search" method="get" className="border-b">
          <div className="flex items-center gap-2 px-3">
            <Search
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="header-search" className="sr-only">
              Search published content
            </label>
            <input
              id="header-search"
              name="q"
              type="search"
              minLength={2}
              maxLength={100}
              placeholder="Search services, work, and insights"
              className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="focus-ring rounded-md px-3 py-2 text-xs font-semibold hover:bg-accent"
            >
              Search
            </button>
          </div>
        </form>
        <CommandList>
          <CommandGroup heading="Quick navigation">
            {links.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.label} ${item.description ?? ""}`}
                onSelect={() => navigate(item.href)}
              >
                {item.icon ? (
                  <item.icon className="size-4" aria-hidden="true" />
                ) : (
                  <ArrowRight className="size-4" aria-hidden="true" />
                )}
                <span>{item.label}</span>
                <CommandShortcut>Go</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <div className="border-t p-2 text-center text-xs text-muted-foreground">
          Press Enter for live CMS results · Esc closes search
        </div>
      </CommandDialog>
    </>
  );
}
export { GlobalSearch };
