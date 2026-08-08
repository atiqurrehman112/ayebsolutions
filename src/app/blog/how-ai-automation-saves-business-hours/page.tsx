import {
  BlogArticlePage,
  getBlogArticle,
  getBlogArticleMetadata,
} from "@/features/blog";

const slug = "how-ai-automation-saves-business-hours" as const;
export const metadata = getBlogArticleMetadata(slug);
export default function ArticleRoute() {
  return <BlogArticlePage article={getBlogArticle(slug)} />;
}
