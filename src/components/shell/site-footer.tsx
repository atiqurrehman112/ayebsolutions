import { ArrowRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/shell/newsletter-form";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { company } from "@/config/company";
import { footerNavigation, socialChannels } from "@/config/footer";
import { consultationLink } from "@/config/navigation";

function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-muted/20">
      <div className="mx-auto w-full max-w-[min(87.5rem,100vw)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 rounded-2xl border bg-card p-6 shadow-soft sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Build what moves your business forward
            </p>
            <h2 className="mt-3 max-w-3xl text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Turn your next digital initiative into a durable growth system.
            </h2>
          </div>
          <Button asChild size="lg">
            <Link href={consultationLink.href}>
              {consultationLink.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.35fr_3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {company.description}
            </p>
            <address className="mt-6 space-y-3 not-italic">
              <a
                href={`mailto:${company.email}`}
                className="focus-ring flex min-h-11 items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" aria-hidden="true" />
                {company.email}
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" aria-hidden="true" />
                {company.location}
              </p>
            </address>
            <div className="mt-6 flex gap-2">
              {socialChannels.map(({ href, icon: Icon, label }) => (
                <IconButton
                  key={label}
                  asChild
                  label={label}
                  variant="outline"
                  size="sm"
                >
                  <a href={href} target="_blank" rel="noreferrer">
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
            © {year} {company.name}. All rights reserved.
          </p>
          <p>{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
