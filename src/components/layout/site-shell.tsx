import { PageTransition } from "@/components/shell/page-transition";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { CookieConsent } from "@/components/shell/cookie-consent";
import { cookieConsentConfig } from "@/config/shell";
import type { PublicSiteSettings } from "@/types/settings";

interface SiteShellProps {
  readonly children: React.ReactNode;
  readonly settings: PublicSiteSettings;
}

export function SiteShell({ children, settings }: SiteShellProps) {
  const links = settings.header_navigation.filter((item) =>
    item.href === "/blog"
      ? settings.enable_blog
      : item.href === "/contact"
        ? settings.enable_contact_form
        : true,
  );
  return (
    <div className="flex min-h-dvh w-full min-w-0 max-w-[100vw] flex-col overflow-x-clip">
      <a href="#main-content" className="sr-only-focusable">
        Skip to main content
      </a>
      <SiteHeader
        brandName={settings.site_name}
        links={links}
        logo={settings.logo}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-[50dvh] flex-1 outline-none"
      >
        <PageTransition>
          {settings.maintenance_mode ? (
            <section className="mx-auto grid min-h-[65vh] max-w-3xl place-content-center px-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Scheduled maintenance
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                We’ll be back shortly.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {settings.maintenance_message}
              </p>
            </section>
          ) : (
            children
          )}
        </PageTransition>
      </main>
      <SiteFooter settings={settings} />
      <CookieConsent config={cookieConsentConfig} />
    </div>
  );
}
