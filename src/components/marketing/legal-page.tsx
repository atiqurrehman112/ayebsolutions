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
        <header className="border-b py-20 sm:py-28">
          <Container size="reading">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: title, href: path },
              ]}
            />
            <Eyebrow className="mt-14">Legal & standards</Eyebrow>
            <h1 className="mt-5 text-balance text-5xl font-bold tracking-tight sm:text-7xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {description}
            </p>
          </Container>
        </header>
        <div className="py-16 sm:py-24">
          <Container size="reading" className="space-y-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold tracking-tight">
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
