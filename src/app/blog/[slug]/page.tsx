import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/features/blog";
import {
  getPublishedArticle,
  getPublishedBlogSlugs,
} from "@/lib/blog/public-blog";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";

export const revalidate = 300;
interface Props {
  readonly params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  try {
    return (await getPublishedBlogSlugs()).map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [data, settings] = await Promise.all([
    getPublishedArticle(slug),
    getPublicSiteSettings(),
  ]);
  if (!data) return {};
  const { article, context } = data;
  const title = article.meta_title ?? article.title;
  const description = article.meta_description ?? article.description;
  const path = `/blog/${article.slug}`;
  const image = context.featuredMedia;
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
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at,
      authors: article.author_name ? [article.author_name] : undefined,
      tags: context.tags.map((tag) => tag.name),
      images: image
        ? [{ url: image.secure_url, alt: image.alt ?? article.title }]
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
export default async function ArticleRoute({ params }: Props) {
  const { slug } = await params;
  const [data, settings] = await Promise.all([
    getPublishedArticle(slug),
    getPublicSiteSettings(),
  ]);
  if (!data) notFound();
  return (
    <BlogArticlePage
      adjacent={data.adjacent}
      article={data.article}
      context={data.context}
      newsletterEnabled={settings.enable_newsletter}
      related={data.related}
      siteName={settings.site_name}
      siteUrl={settings.site_url}
    />
  );
}
