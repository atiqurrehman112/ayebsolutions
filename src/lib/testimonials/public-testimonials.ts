import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import {
  TestimonialsRepository,
  type PublicTestimonialQuery,
} from "@/lib/database/repositories/testimonials-repository";
import type { Database } from "@/types/database";

function repository() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return null;
  return new TestimonialsRepository(
    createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } },
    ),
  );
}
export const getPublishedTestimonialsPage = unstable_cache(
  async (options: PublicTestimonialQuery) => {
    const repo = repository();
    if (!repo) {
      const page = Math.max(1, options.page ?? 1);
      const pageSize = options.pageSize ?? 12;
      return { data: [], count: 0, page, pageSize, totalPages: 0 };
    }
    return repo.findPublicPage(options);
  },
  ["published-testimonials-page"],
  { revalidate: 300, tags: ["testimonials", "homepage"] },
);
export const getPublishedTestimonialIndustries = unstable_cache(
  async () => repository()?.findPublicIndustries() ?? [],
  ["published-testimonial-industries"],
  { revalidate: 300, tags: ["testimonials"] },
);
