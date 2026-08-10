import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import {
  BlogRepository,
  type PublicBlogQuery,
} from "@/lib/database/repositories/blog-repository";
import type { Database } from "@/types/database";

function repository() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return null;
  return new BlogRepository(
    createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } },
    ),
  );
}

export const getPublishedBlogPage = unstable_cache(
  async (options: PublicBlogQuery) => {
    const repo = repository();
    if (!repo) {
      const page = Math.max(1, options.page ?? 1);
      const pageSize = options.pageSize ?? 12;
      return { data: [], count: 0, page, pageSize, totalPages: 0 };
    }
    return repo.findPublishedPage(options);
  },
  ["published-blog-page"],
  { revalidate: 300, tags: ["blog"] },
);

export const getPublishedBlogFilters = unstable_cache(
  async () => {
    const repo = repository();
    if (!repo) return { categories: [], tags: [] };
    const [categories, tags] = await Promise.all([
      repo.findPublicCategories(),
      repo.findPublicTags(),
    ]);
    return { categories, tags };
  },
  ["published-blog-filters"],
  { revalidate: 300, tags: ["blog"] },
);

export const getPublishedArticle = unstable_cache(
  async (slug: string) => {
    const repo = repository();
    if (!repo) return null;
    const article = await repo.findPublishedBySlug(slug);
    if (!article) return null;
    const [context, related, adjacent] = await Promise.all([
      repo.findPublicContext(article),
      repo.findRelated(article),
      repo.findAdjacent(article),
    ]);
    return { article, context, related, adjacent };
  },
  ["published-blog-article"],
  { revalidate: 300, tags: ["blog"] },
);

export const getPublishedBlogSlugs = unstable_cache(
  async () => repository()?.findPublishedSlugs() ?? [],
  ["published-blog-slugs"],
  { revalidate: 300, tags: ["blog"] },
);
