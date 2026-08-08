import {
  BlogArticlePage,
  getBlogArticle,
  getBlogArticleMetadata,
} from "@/features/blog";

const slug = "api-integration-best-practices" as const;
export const metadata = getBlogArticleMetadata(slug);
export default function ArticleRoute() {
  return <BlogArticlePage article={getBlogArticle(slug)} />;
}
