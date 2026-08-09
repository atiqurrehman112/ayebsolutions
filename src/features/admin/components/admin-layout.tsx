import {
  BookOpen,
  BriefcaseBusiness,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Mail,
  MenuSquare,
  MessageSquareQuote,
  Settings,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/status";
import { cn } from "@/lib/utils";
import styles from "./admin-layout.module.css";

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

interface AdminNavigationItem {
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
  readonly status?: string;
}

const navigation: readonly AdminNavigationItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    label: "Portfolio",
    href: "/admin/portfolio",
    icon: FolderKanban,
  },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  {
    label: "Services",
    href: "/admin/services",
    icon: BriefcaseBusiness,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  { label: "Media", href: "/admin/media", icon: MenuSquare },
  {
    label: "Contact Leads",
    href: "/admin/contact-leads",
    icon: Mail,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    status: "Future",
  },
] as const;

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={styles.workspace}>
      <aside className={styles.sidebar} aria-label="Admin workspace">
        <div className="border-b p-5 lg:p-6">
          <Logo />
        </div>
        <nav aria-label="Admin navigation" className={styles.navigation}>
          <ul>
            {navigation.map(({ label, href, icon: Icon, status }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={cn("focus-ring group", styles.navigationLink)}
                  aria-label={status ? `${label}, planned admin route` : label}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                  {status ? (
                    <span className={styles.futureLabel}>{status}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.sidebarFooter}>
          <p>
            Static workspace preview. Authentication, authorization, and CMS
            data are not connected.
          </p>
          <Link
            href="/admin/login"
            className={cn("focus-ring", styles.logoutLink)}
          >
            <LogOut className="size-4" aria-hidden="true" />
            Logout
          </Link>
        </div>
      </aside>

      <div className={styles.mainColumn}>
        <header className={styles.topbar}>
          <div>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
              Workspace / Foundation
            </span>
            <p className="mt-1 text-sm font-semibold">Content operations</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="warning">Not connected</Badge>
            <Link
              href="/"
              className="focus-ring hidden rounded-md text-sm font-semibold sm:inline-flex"
            >
              View website
            </Link>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export { AdminLayout };
