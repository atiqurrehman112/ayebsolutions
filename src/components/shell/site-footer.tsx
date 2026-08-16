import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/shell/newsletter-form";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { footerNavigation } from "@/config/footer";
import { consultationLink } from "@/config/navigation";
import type { PublicSiteSettings } from "@/lib/site-settings/public-site-settings";

function SiteFooter({
  settings,
}: {
  readonly settings: PublicSiteSettings | null;
}) {
  const year = new Date().getFullYear();
  const config = settings?.configuration;
  const logo = config?.logo_media_id
    ? settings?.media[config.logo_media_id]
    : null;
  const channels = config
    ? [
        { label: "LinkedIn", href: config.linkedin_url, icon: Linkedin },
        { label: "GitHub", href: config.github_url, icon: Github },
        { label: "X", href: config.x_url, icon: Twitter },
        { label: "Facebook", href: config.facebook_url, icon: Facebook },
        { label: "Instagram", href: config.instagram_url, icon: Instagram },
        { label: "YouTube", href: config.youtube_url, icon: Youtube },
      ].filter((item) => Boolean(item.href))
    : [];
  return (
    <footer className="border-t bg-muted/20">
      <div className="mx-auto w-full max-w-[min(87.5rem,100vw)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 rounded-2xl border bg-card p-6 shadow-soft sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Build what moves your business forward
            </p>
            <h2 className="mt-3 max-w-3xl text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              {config?.footer_cta ??
                "Turn your next digital initiative into a durable growth system."}
            </h2>
          </div>
          <Button asChild size="lg">
            <Link href={config?.footer_button_link ?? consultationLink.href}>
              {config?.footer_button_text ?? consultationLink.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.35fr_3fr]">
          <div>
            <Logo name={config?.site_name} media={logo} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {config?.footer_description ?? config?.short_description}
            </p>
            <address className="mt-6 space-y-3 not-italic">
              {config?.contact_email ? (
                <a
                  href={`mailto:${config.contact_email}`}
                  className="focus-ring flex min-h-11 items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {config.contact_email}
                </a>
              ) : null}
              {config?.address ? (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" aria-hidden="true" />
                  {config.address}
                </p>
              ) : null}
            </address>
            <div className="mt-6 flex gap-2">
              {channels.map(({ href, icon: Icon, label }) => (
                <IconButton
                  key={label}
                  asChild
                  label={label}
                  variant="outline"
                  size="sm"
                >
                  <a href={href ?? "#"} target="_blank" rel="noreferrer">
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </IconButton>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-5">
            {footerNavigation.map((group) => {
              const id = `footer-${group.title.toLowerCase()}`;
              return (
                <nav key={group.title} aria-labelledby={id}>
                  <h2 id={id} className="text-sm font-semibold">
                    {group.title}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="focus-ring inline-flex min-h-11 items-center rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        </div>

        <div className="grid gap-8 border-y py-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-semibold">Ideas worth building on</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Occasional insights on product engineering, automation, and
              digital growth.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="flex flex-col gap-3 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {config?.footer_copyright ?? config?.site_name ?? ""}
          </p>
          {config?.tagline ? <p>{config.tagline}</p> : null}
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
