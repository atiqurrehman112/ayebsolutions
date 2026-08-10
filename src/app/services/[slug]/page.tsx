import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/features/services";
import {
  getPublishedService,
  getPublishedServiceSlugs,
} from "@/lib/services/public-services";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";

export const revalidate = 300;
interface Props {
  readonly params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  try {
    return (await getPublishedServiceSlugs()).map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [data, settings] = await Promise.all([
    getPublishedService(slug),
    getPublicSiteSettings(),
  ]);
  if (!data) return {};
  const { service, context } = data;
  const title = service.meta_title ?? service.title;
  const description = service.meta_description ?? service.summary;
  const path = `/services/${service.slug}`;
  const image = context.gallery[0];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: settings.site_name,
      images: image
        ? [{ url: image.secure_url, alt: image.alt ?? service.title }]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image.secure_url] : undefined,
    },
  };
}
export default async function ServiceRoute({ params }: Props) {
  const { slug } = await params;
  const [data, settings] = await Promise.all([
    getPublishedService(slug),
    getPublicSiteSettings(),
  ]);
  if (!data) notFound();
  return (
    <ServiceDetailPage
      context={data.context}
      related={data.related}
      service={data.service}
      siteName={settings.site_name}
      siteUrl={settings.site_url}
    />
  );
}
