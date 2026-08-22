import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicSiteSettings } from "@/lib/site-settings/public-site-settings";
import { marketingServices } from "@/config/marketing";
import { ServiceDetailPage, serviceDetailContent } from "@/features/services";
import { getPublishedPortfolioPage } from "@/lib/portfolio/public-portfolio";

interface Props {
  readonly params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  return marketingServices.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ slug }, settings] = await Promise.all([
    params,
    getPublicSiteSettings(),
  ]);
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
      siteName: settings?.configuration.site_name,
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
  const content = serviceDetailContent[slug];
  if (!content) notFound();
  const [portfolio, settings] = await Promise.all([
    getPublishedPortfolioPage({
      page: 1,
      pageSize: 3,
      sort: "newest",
    })
      .then((result) => result.data)
      .catch(() => []),
    getPublicSiteSettings(),
  ]);
  return (
    <ServiceDetailPage
      content={content}
      portfolio={portfolio}
      related={marketingServices
        .filter((item) => item.slug !== slug)
        .slice(0, 5)}
      service={service}
      siteName={settings?.configuration.site_name ?? "Digital product studio"}
      siteUrl={
        settings?.configuration.canonical_base_url ??
        process.env.NEXT_PUBLIC_SITE_URL ??
        "http://localhost:3000"
      }
    />
  );
}
