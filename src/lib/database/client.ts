import type { SupabaseClient } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export type DatabaseClient = SupabaseClient<Database>;

export async function createDatabaseClient(): Promise<DatabaseClient> {
  return createClient();
}
