import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company } from "@/config/company";
import { BlogArticlePage } from "@/features/blog";
import {
  getPublishedArticle,
  getPublishedBlogSlugs,
} from "@/lib/blog/public-blog";
import { mediaSeoUrl } from "@/lib/media/media";

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
  const data = await getPublishedArticle(slug);
  if (!data) return {};
  const { article, context } = data;
  const title = article.meta_title ?? article.title;
  const description = article.meta_description ?? article.description;
  const path = `/blog/${article.slug}`;
  const image = context.featuredMedia;
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
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at,
      authors: article.author_name ? [article.author_name] : undefined,
      tags: context.tags.map((tag) => tag.name),
      images: imageUrl
        ? [{ url: imageUrl, alt: image?.alt ?? article.title }]
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
export default async function ArticleRoute({ params }: Props) {
  const { slug } = await params;
  const data = await getPublishedArticle(slug);
  if (!data) notFound();
  return (
    <BlogArticlePage
      adjacent={data.adjacent}
      article={data.article}
      context={data.context}
      related={data.related}
      siteName={company.name}
      siteUrl={company.url}
    />
  );
}
