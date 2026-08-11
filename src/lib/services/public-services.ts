import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import {
  ServicesRepository,
  type PublicServiceQuery,
} from "@/lib/database/repositories/services-repository";
import type { Database } from "@/types/database";

function repository() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return null;
  return new ServicesRepository(
    createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } },
    ),
  );
}

export const getPublishedServicesPage = unstable_cache(
  async (options: PublicServiceQuery) => {
    const repo = repository();
    if (!repo) {
      const page = Math.max(1, options.page ?? 1);
      const pageSize = options.pageSize ?? 12;
      return { data: [], count: 0, page, pageSize, totalPages: 0 };
    }
    return repo.findPublishedPage(options);
  },
  ["published-services-page"],
  { revalidate: 300, tags: ["services", "homepage", "media"] },
);
