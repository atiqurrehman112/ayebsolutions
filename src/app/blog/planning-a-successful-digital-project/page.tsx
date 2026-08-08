import {
  BlogArticlePage,
  getBlogArticle,
  getBlogArticleMetadata,
} from "@/features/blog";

const slug = "planning-a-successful-digital-project" as const;
export const metadata = getBlogArticleMetadata(slug);
export default function ArticleRoute() {
  return <BlogArticlePage article={getBlogArticle(slug)} />;
}
