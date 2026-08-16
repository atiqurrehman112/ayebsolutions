"use client";

import { ArrowRight, ChevronDown, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { AnnouncementBar } from "@/components/shell/announcement-bar";
import { GlobalSearch } from "@/components/shell/global-search";
import { ThemeSwitcher } from "@/components/shell/theme-switcher";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/feedback";
import { IconButton } from "@/components/ui/icon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/overlays";
import {
  consultationLink,
  featuredNavigation,
  megaMenuSections,
  primaryNavigation,
  solutionNavigation,
} from "@/config/navigation";
import { cn } from "@/lib/utils";
import type { NavigationSection, ShellLink } from "@/types/global-settings";
import type { PublicSiteSettings } from "@/lib/site-settings/public-site-settings";

function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavigationLink({
  item,
  pathname,
}: {
  readonly item: ShellLink;
  readonly pathname: string;
}) {
  const active = isActivePath(pathname, item.href);
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-normal hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active &&
          "text-foreground after:absolute after:inset-x-3 after:-bottom-[1.12rem] after:h-0.5 after:bg-primary",
      )}
    >
      {item.label}
    </Link>
  );
}

function MegaMenuLink({ item }: { readonly item: ShellLink }) {
  return (
    <DropdownMenuItem
      asChild
      className="h-auto items-start p-0 focus:bg-transparent"
    >
      <Link
        href={item.href}
        className="group/link flex w-full gap-3 rounded-lg p-3 hover:bg-accent focus-visible:bg-accent"
      >
        {item.icon ? (
          <span className="grid size-9 shrink-0 place-items-center rounded-md border bg-background text-muted-foreground transition-colors group-hover/link:text-foreground">
            <item.icon className="size-4" aria-hidden="true" />
          </span>
        ) : null}
        <span>
          <span className="block text-sm font-semibold">{item.label}</span>
          {item.description ? (
            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
              {item.description}
            </span>
          ) : null}
        </span>
      </Link>
    </DropdownMenuItem>
  );
}

function ServicesMegaMenu({ pathname }: { readonly pathname: string }) {
  const active = isActivePath(pathname, "/services");
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-current={active ? "page" : undefined}
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active && "text-foreground",
          )}
        >
          Services
          <ChevronDown className="size-3.5" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={12}
        className="w-[min(76rem,calc(100vw-2rem))] p-3"
      >
        <div className="grid gap-3 xl:grid-cols-[1fr_17rem]">
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
            {megaMenuSections.map((section) => (
              <div key={section.title}>
                <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {section.title}
                </p>
                <div className="space-y-1">
                  {section.links.slice(0, 4).map((item) => (
                    <MegaMenuLink key={item.href} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Link
            href={featuredNavigation.href}
            className="group flex min-h-52 flex-col justify-between overflow-hidden rounded-xl bg-primary p-5 text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] opacity-70">
                {featuredNavigation.eyebrow}
              </span>
              <p className="mt-3 text-xl font-semibold leading-tight">
                {featuredNavigation.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed opacity-75">
                {featuredNavigation.description}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              {featuredNavigation.actionLabel}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SolutionsMenu({ pathname }: { readonly pathname: string }) {
  const active = isActivePath(pathname, "/solutions");
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-current={active ? "page" : undefined}
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active && "text-foreground",
          )}
        >
          Solutions
          <ChevronDown className="size-3.5" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={12}
        className="w-[26rem] p-2"
      >
        {solutionNavigation.map((item) => (
          <MegaMenuLink key={item.href} item={item} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DesktopNavigation({
  links = primaryNavigation,
}: {
  readonly links?: readonly ShellLink[];
}) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center xl:flex"
    >
      {links.map((item) => {
        if (item.label === "Services")
          return <ServicesMegaMenu key={item.href} pathname={pathname} />;
        if (item.label === "Solutions")
          return <SolutionsMenu key={item.href} pathname={pathname} />;
        return (
          <NavigationLink key={item.href} item={item} pathname={pathname} />
        );
      })}
    </nav>
  );
}

function MobileSection({
  section,
  close,
}: {
  readonly section: NavigationSection;
  readonly close: () => void;
}) {
  return (
    <details className="group border-b">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 font-semibold [&::-webkit-details-marker]:hidden">
        {section.title}
        <ChevronDown
          className="size-4 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="grid gap-1 pb-4 sm:grid-cols-2">
        {section.links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            {item.icon ? (
              <item.icon className="size-4 shrink-0" aria-hidden="true" />
            ) : null}
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

function MobileNavigation({
  brandName,
  links = primaryNavigation,
}: {
  readonly brandName?: string;
  readonly links?: readonly ShellLink[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const simpleLinks = links.filter(
    (item) => item.label !== "Services" && item.label !== "Solutions",
  );
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <IconButton
          label="Open navigation"
          variant="ghost"
          className="xl:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent className="!bottom-0 !left-auto !right-0 !top-0 mt-0 h-dvh max-h-none w-[min(92vw,28rem)] rounded-none rounded-l-xl border-l">
        <DrawerClose asChild>
          <IconButton
            label="Close navigation"
            variant="ghost"
            className="absolute right-3 top-3 z-10"
          >
            <X className="size-5" aria-hidden="true" />
          </IconButton>
        </DrawerClose>
        <DrawerHeader className="border-b text-left">
          <DrawerTitle>
            <Logo linked={false} />
          </DrawerTitle>
          <DrawerDescription>
            Navigate {brandName ?? "the website"}
          </DrawerDescription>
        </DrawerHeader>
        <nav
          aria-label="Mobile navigation"
          className="flex-1 overflow-y-auto px-5 py-3"
        >
          <div className="grid grid-cols-2 gap-1 border-b py-3">
            {simpleLinks.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                    active && "bg-accent",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          {megaMenuSections.map((section) => (
            <MobileSection
              key={section.title}
              section={section}
              close={() => setOpen(false)}
            />
          ))}
        </nav>
        <div className="border-t p-5">
          <Button asChild className="w-full">
            <Link href={consultationLink.href} onClick={() => setOpen(false)}>
              <Sparkles className="size-4" aria-hidden="true" />
              {consultationLink.label}
            </Link>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function SiteHeader({
  settings,
}: {
  readonly settings: PublicSiteSettings | null;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 12);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="sticky top-0 z-sticky">
      {settings?.configuration.announcement_enabled &&
      settings.configuration.announcement_text ? (
        <AnnouncementBar
          config={{
            enabled: true,
            id: `site-${settings.configuration.updated_at}`,
            message: settings.configuration.announcement_text,
            actionLabel:
              settings.configuration.announcement_button_text ?? undefined,
            actionHref:
              settings.configuration.announcement_button_url ?? undefined,
          }}
        />
      ) : null}
      <header
        className={cn(
          "border-b transition-all duration-normal ease-standard",
          scrolled
            ? "border-border/70 bg-background/85 shadow-xs backdrop-blur-surface"
            : "border-transparent bg-background/40",
        )}
      >
        <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[min(87.5rem,100vw)] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo
            name={settings?.configuration.site_name}
            media={
              settings?.configuration.logo_media_id
                ? settings.media[settings.configuration.logo_media_id]
                : null
            }
          />
          <DesktopNavigation />
          <div className="flex items-center gap-0.5">
            <GlobalSearch brandName={settings?.configuration.site_name} />
            <ThemeSwitcher />
            <Button asChild size="sm" className="ml-1 hidden xl:inline-flex">
              <Link href={consultationLink.href}>{consultationLink.label}</Link>
            </Button>
            <MobileNavigation brandName={settings?.configuration.site_name} />
          </div>
        </div>
      </header>
    </div>
  );
}

export { SiteHeader };
