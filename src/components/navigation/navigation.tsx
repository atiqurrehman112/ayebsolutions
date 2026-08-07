"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { IconButton } from "@/components/ui/icon-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/overlays";
import type { NavigationItem } from "@/types/navigation";

interface MobileNavigationProps {
  readonly items: readonly NavigationItem[];
  readonly brand: React.ReactNode;
}

function MobileNavigation({ items, brand }: MobileNavigationProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <IconButton label="Open navigation" variant="ghost">
          <Menu className="size-5" aria-hidden="true" />
        </IconButton>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{brand}</SheetTitle>
          <SheetDescription>Primary navigation</SheetDescription>
        </SheetHeader>
        <nav
          aria-label="Mobile navigation"
          className="mt-6 flex flex-col gap-1"
        >
          {items.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 font-medium hover:bg-accent"
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="ml-4 block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNavigation };
export type { MobileNavigationProps };
