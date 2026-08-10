import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import {
  PortfolioRepository,
  type PublicPortfolioQuery,
} from "@/lib/database/repositories/portfolio-repository";
import type { Database } from "@/types/database";

function repository() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return null;
  return new PortfolioRepository(
    createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } },
    ),
  );
}
export const getPublishedPortfolioPage = unstable_cache(
  async (options: PublicPortfolioQuery) => {
    const repo = repository();
    if (!repo) {
      const page = Math.max(1, options.page ?? 1);
      const pageSize = options.pageSize ?? 12;
      return { data: [], count: 0, page, pageSize, totalPages: 0 };
    }
    return repo.findPublishedPage(options);
  },
  ["published-portfolio-page"],
  { revalidate: 300, tags: ["portfolio", "homepage"] },
);
export const getPublishedPortfolioFilters = unstable_cache(
  async () => {
    const repo = repository();
    if (!repo) return { categories: [], tags: [] };
    const [categories, tags] = await Promise.all([
      repo.findPublicCategories(),
      repo.findPublicTags(),
    ]);
    return { categories, tags };
  },
  ["published-portfolio-filters"],
  { revalidate: 300, tags: ["portfolio"] },
);
export const getPublishedProject = unstable_cache(
  async (slug: string) => {
    const repo = repository();
    if (!repo) return null;
    const project = await repo.findPublishedBySlug(slug);
    if (!project) return null;
    const [context, related] = await Promise.all([
      repo.findPublicContext(project),
      repo.findRelated(project),
    ]);
    return { project, context, related };
  },
  ["published-portfolio-project"],
  { revalidate: 300, tags: ["portfolio"] },
);
export const getPublishedPortfolioSlugs = unstable_cache(
  async () => repository()?.findPublishedSlugs() ?? [],
  ["published-portfolio-slugs"],
  { revalidate: 300, tags: ["portfolio"] },
);
