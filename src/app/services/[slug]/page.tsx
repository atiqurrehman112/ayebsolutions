import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company } from "@/config/company";
import { marketingServices } from "@/config/marketing";
import { ServiceDetailPage } from "@/features/services";

interface Props {
  readonly params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  return marketingServices.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = marketingServices.find((item) => item.slug === slug);
  if (!service) return {};
  const title = service.meta_title ?? service.title;
  const description = service.meta_description ?? service.summary;
  const path = `/services/${service.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: company.name,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
export default async function ServiceRoute({ params }: Props) {
  const { slug } = await params;
  const service = marketingServices.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <ServiceDetailPage
      context={{ category: null, gallery: [] }}
      related={marketingServices
        .filter((item) => item.slug !== slug)
        .slice(0, 3)}
      service={service}
      siteName={company.name}
      siteUrl={company.url}
    />
  );
}
