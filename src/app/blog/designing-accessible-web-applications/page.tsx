import {
  BlogArticlePage,
  getBlogArticle,
  getBlogArticleMetadata,
} from "@/features/blog";

const slug = "designing-accessible-web-applications" as const;
export const metadata = getBlogArticleMetadata(slug);
export default function ArticleRoute() {
  return <BlogArticlePage article={getBlogArticle(slug)} />;
}
