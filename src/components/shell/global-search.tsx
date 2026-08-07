"use client";

import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command-menu";
import { IconButton } from "@/components/ui/icon-button";
import { searchNavigation } from "@/config/navigation";

function GlobalSearch() {
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
        title="Search Ayeb Solutions"
        description="Search available website destinations."
      >
        <CommandInput placeholder="Search pages and services…" />
        <CommandList>
          <CommandEmpty>No matching destination found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {searchNavigation.map((item) => (
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
      </CommandDialog>
    </>
  );
}

export { GlobalSearch };
