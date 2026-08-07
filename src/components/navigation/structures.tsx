import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/primitives";
import { MobileNavigation } from "@/components/navigation/navigation";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import type { NavigationItem, SocialLink } from "@/types/navigation";

function MegaMenu({ item }: { readonly item: NavigationItem }) {
  return (
    <div className="group relative">
      <Button asChild variant="ghost">
        <Link href={item.href}>{item.label}</Link>
      </Button>
      {item.children?.length ? (
        <div className="invisible absolute left-0 top-full z-dropdown min-w-[32rem] translate-y-2 rounded-xl border bg-popover p-4 opacity-0 shadow-elevated transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <div className="grid grid-cols-2 gap-2">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="rounded-lg p-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex items-center gap-2 font-medium">
                  {child.icon ? (
                    <child.icon className="size-4" aria-hidden="true" />
                  ) : null}
                  {child.label}
                </span>
                {child.description ? (
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {child.description}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

interface NavbarProps {
  readonly brand: ReactNode;
  readonly items: readonly NavigationItem[];
  readonly actions?: ReactNode;
  readonly className?: string;
}

function Navbar({ brand, items, actions, className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-sticky border-b bg-background/90 backdrop-blur-surface",
        className,
      )}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-4">
        <Link href="/" aria-label="Home" className="shrink-0 font-bold">
          {brand}
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {items.map((item) =>
            item.children?.length ? (
              <MegaMenu key={item.href} item={item} />
            ) : (
              <Button key={item.href} asChild variant="ghost">
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ),
          )}
        </nav>
        <div className="flex items-center gap-1">
          {actions}
          <div className="lg:hidden">
            <MobileNavigation items={items} brand={brand} />
          </div>
        </div>
      </Container>
    </header>
  );
}

interface FooterProps {
  readonly brand: ReactNode;
  readonly description: string;
  readonly groups: readonly {
    readonly title: string;
    readonly links: readonly NavigationItem[];
  }[];
  readonly socials?: readonly SocialLink[];
  readonly copyright: string;
}

function Footer({
  brand,
  description,
  groups,
  socials = [],
  copyright,
}: FooterProps) {
  return (
    <footer className="border-t bg-muted/20">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="text-lg font-bold">
              {brand}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {description}
            </p>
          </div>
          {groups.map((group) => {
            const id = `footer-${group.title.toLowerCase().replaceAll(" ", "-")}`;
            return (
              <nav
                key={group.title}
                aria-labelledby={id}
                className="lg:col-span-2"
              >
                <h2 id={id} className="text-sm font-semibold">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{copyright}</p>
          <div className="flex gap-2">
            {socials.map((social) => (
              <IconButton
                key={social.href}
                asChild
                label={social.label}
                variant="ghost"
                size="sm"
              >
                <Link href={social.href}>
                  <social.icon className="size-4" aria-hidden="true" />
                </Link>
              </IconButton>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  readonly label?: string;
}
function Sidebar({
  label = "Sidebar navigation",
  className,
  children,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={cn("w-full border-r bg-muted/20 lg:w-64", className)}
      {...props}
    >
      <nav aria-label={label} className="p-4">
        {children}
      </nav>
    </aside>
  );
}
function SidebarGroup({
  title,
  children,
}: {
  readonly title: string;
  readonly children: ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
function SidebarLink({
  href,
  icon: Icon,
  children,
  active,
}: {
  readonly href: string;
  readonly icon?: NavigationItem["icon"];
  readonly children: ReactNode;
  readonly active?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
        active && "bg-accent font-medium",
      )}
    >
      {Icon ? <Icon className="size-4" aria-hidden="true" /> : null}
      {children}
    </Link>
  );
}

export { Footer, MegaMenu, Navbar, Sidebar, SidebarGroup, SidebarLink };
export type { FooterProps, NavbarProps, SidebarProps };
