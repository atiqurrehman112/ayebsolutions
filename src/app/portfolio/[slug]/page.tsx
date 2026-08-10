import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioProjectPage } from "@/features/portfolio";
import {
  getPublishedPortfolioSlugs,
  getPublishedProject,
} from "@/lib/portfolio/public-portfolio";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";
import { mediaSeoUrl } from "@/lib/media/media";

export const revalidate = 300;
interface Props {
  readonly params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  try {
    return (await getPublishedPortfolioSlugs()).map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [data, settings] = await Promise.all([
    getPublishedProject(slug),
    getPublicSiteSettings(),
  ]);
  if (!data) return {};
  const { project, context } = data;
  const title = project.meta_title ?? project.title;
  const description = project.meta_description ?? project.summary;
  const path = `/portfolio/${project.slug}`;
  const image = context.gallery[0] ?? settings.openGraphImage;
  const imageUrl = mediaSeoUrl(image);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title,
      description,
      siteName: settings.site_name,
      publishedTime: project.published_at ?? undefined,
      modifiedTime: project.updated_at,
      images: imageUrl
        ? [{ url: imageUrl, alt: image?.alt ?? project.title }]
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
export default async function PortfolioProjectRoute({ params }: Props) {
  const { slug } = await params;
  const [data, settings] = await Promise.all([
    getPublishedProject(slug),
    getPublicSiteSettings(),
  ]);
  if (!data) notFound();
  return (
    <PortfolioProjectPage
      category={data.context.category}
      gallery={data.context.gallery}
      project={data.project}
      related={data.related}
      siteName={settings.site_name}
      siteUrl={settings.site_url}
      tags={data.context.tags}
    />
  );
}
