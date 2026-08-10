import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { serviceIcon } from "@/features/services";
import type { ServiceRow } from "@/types/database";
import styles from "./services-overview.module.css";

export function ServicesOverviewSection({
  services,
}: {
  readonly services: readonly ServiceRow[];
}) {
  if (!services.length)
    return (
      <section className="border-b py-20">
        <Container>
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-4 text-headline font-bold">
            Published services will appear here.
          </h2>
          <p className="mt-4 text-muted-foreground">
            No services are currently available from the CMS.
          </p>
        </Container>
      </section>
    );
  return (
    <section
      className="border-b py-20 sm:py-24"
      aria-labelledby="home-services-heading"
    >
      <Container className="max-w-[100rem]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow>Services</Eyebrow>
            <h2
              id="home-services-heading"
              className="mt-4 text-balance text-headline font-bold"
            >
              Published capabilities for modern digital work.
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/services">
              Explore all services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIcon(service.icon);
            return (
              <article
                key={service.id}
                className={`${styles.serviceCard} flex flex-col rounded-2xl border bg-card p-6`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-6" aria-hidden="true" />
                  {service.is_featured ? <Badge>Featured</Badge> : null}
                </div>
                <h3 className="mt-6 text-2xl font-bold">{service.title}</h3>
                <p className="mt-4 flex-1 leading-7 text-muted-foreground">
                  {service.summary}
                </p>
                {service.features.length ? (
                  <ul className="mt-6 space-y-2">
                    {service.features.slice(0, 4).map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <Check
                          className="mt-1 size-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Button asChild variant="ghost" className="mt-6 self-start">
                  <Link href={`/services/${service.slug}`}>
                    Learn more
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
