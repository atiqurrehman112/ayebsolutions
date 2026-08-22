import { Container, Eyebrow } from "@/components/layout/primitives";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { company } from "@/config/company";

export interface LegalSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}
export function LegalPage({
  description,
  path,
  sections,
  title,
}: {
  readonly description: string;
  readonly path: string;
  readonly sections: readonly LegalSection[];
  readonly title: string;
}) {
  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden border-b py-20 sm:py-28 lg:py-32">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_65%_0%,hsl(var(--foreground)/0.07),transparent_62%)]"
            aria-hidden="true"
          />
          <Container size="reading">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: title, href: path },
              ]}
            />
            <Eyebrow className="mt-14">Legal & standards</Eyebrow>
            <h1 className="editorial-heading mt-5 text-5xl leading-[0.98] sm:text-7xl">
              {title}
            </h1>
            <p className="body-copy mt-6">{description}</p>
          </Container>
        </header>
        <div className="py-16 sm:py-24">
          <Container size="reading" className="space-y-14">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold leading-tight tracking-[-0.025em] sm:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 leading-8 text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </Container>
        </div>
      </article>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: `${company.url}${path}`,
          publisher: { "@type": "Organization", name: company.name },
        }}
      />
    </>
  );
}
