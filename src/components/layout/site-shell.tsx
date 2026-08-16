import { CookieConsent } from "@/components/shell/cookie-consent";
import { PageTransition } from "@/components/shell/page-transition";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { cookieConsentConfig } from "@/config/shell";
import { getPublicSiteSettings } from "@/lib/site-settings/public-site-settings";

interface SiteShellProps {
  readonly children: React.ReactNode;
}

export async function SiteShell({ children }: SiteShellProps) {
  const settings = await getPublicSiteSettings();
  const maintenance = settings?.configuration.maintenance_mode;
  return (
    <div className="flex min-h-dvh w-full min-w-0 max-w-[100vw] flex-col overflow-x-clip">
      <a href="#main-content" className="sr-only-focusable">
        Skip to main content
      </a>
      <SiteHeader settings={settings} />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-[50dvh] flex-1 scroll-mt-[var(--header-height)] outline-none"
      >
        {maintenance ? (
          <section className="mx-auto grid min-h-[65dvh] max-w-3xl place-content-center px-4 py-24 text-center">
            <p className="text-sm font-semibold uppercase tracking-[.14em] text-muted-foreground">
              Scheduled maintenance
            </p>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              We’ll be back shortly.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              {settings.configuration.maintenance_message}
            </p>
          </section>
        ) : (
          <PageTransition>{children}</PageTransition>
        )}
      </main>
      <SiteFooter settings={settings} />
      <CookieConsent config={cookieConsentConfig} />
    </div>
  );
}
