import { CookieConsent } from "@/components/shell/cookie-consent";
import { PageTransition } from "@/components/shell/page-transition";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { cookieConsentConfig } from "@/config/shell";

interface SiteShellProps {
  readonly children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-dvh w-full min-w-0 max-w-[100vw] flex-col overflow-x-clip">
      <a href="#main-content" className="sr-only-focusable">
        Skip to main content
      </a>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-[50dvh] flex-1 outline-none"
      >
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />
      <CookieConsent config={cookieConsentConfig} />
    </div>
  );
}
