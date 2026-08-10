import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/features/services";
import {
  getPublishedService,
  getPublishedServiceSlugs,
} from "@/lib/services/public-services";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";
import { mediaSeoUrl } from "@/lib/media/media";

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
  const image = context.gallery[0] ?? settings.openGraphImage;
  const imageUrl = mediaSeoUrl(image);
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
      images: imageUrl
        ? [{ url: imageUrl, alt: image?.alt ?? service.title }]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
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
