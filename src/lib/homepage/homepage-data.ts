import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import { ServicesRepository } from "@/lib/database/repositories/services-repository";
import { TestimonialsRepository } from "@/lib/database/repositories/testimonials-repository";
import type { Database } from "@/types/database";

function databaseClient() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return null;
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
export const getHomepageTestimonials = unstable_cache(
  async (limit: number) => {
    const client = databaseClient();
    return client
      ? new TestimonialsRepository(client).findPublishedApproved(limit)
      : [];
  },
  ["homepage-testimonials"],
  { revalidate: 300, tags: ["homepage", "testimonials", "media"] },
);
export const getHomepageServices = unstable_cache(
  async (limit: number) => {
    const client = databaseClient();
    return client
      ? new ServicesRepository(client).findHomepagePublished(limit)
      : [];
  },
  ["homepage-services"],
  { revalidate: 300, tags: ["homepage", "services", "media"] },
);
