import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company } from "@/config/company";
import { PortfolioProjectPage } from "@/features/portfolio";
import {
  getPublishedPortfolioSlugs,
  getPublishedProject,
} from "@/lib/portfolio/public-portfolio";
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
  const data = await getPublishedProject(slug);
  if (!data) return {};
  const { project, context } = data;
  const title = project.meta_title ?? project.title;
  const description = project.meta_description ?? project.summary;
  const path = `/portfolio/${project.slug}`;
  const image = context.gallery[0];
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
      siteName: company.name,
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
  const data = await getPublishedProject(slug);
  if (!data) notFound();
  return (
    <PortfolioProjectPage
      category={data.context.category}
      gallery={data.context.gallery}
      project={data.project}
      related={data.related}
      siteName={company.name}
      siteUrl={company.url}
      tags={data.context.tags}
    />
  );
}
