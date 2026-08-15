import type { DatabaseClient } from "../client";
import type { FounderProfileInsert } from "@/types/database";
import { DatabaseRepositoryError } from "./base-repository";

export class FounderRepository {
  constructor(private readonly client: DatabaseClient) {}

  async findSingleton() {
    const { data, error } = await this.client
      .from("founder_profile")
      .select("*")
      .eq("singleton_key", true)
      .maybeSingle();
    if (error) throw new DatabaseRepositoryError(error);
    return data;
  }

  async findPublished() {
    const { data, error } = await this.client
      .from("founder_profile")
      .select("*")
      .eq("singleton_key", true)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw new DatabaseRepositoryError(error);
    return data;
  }

  async save(input: FounderProfileInsert) {
    const existing = await this.findSingleton();
    const { created_by: _createdBy, ...update } = input;
    const { data, error } = existing
      ? await this.client
          .from("founder_profile")
          .update(update)
          .eq("id", existing.id)
          .select("*")
          .single()
      : await this.client
          .from("founder_profile")
          .insert({ ...input, singleton_key: true })
          .select("*")
          .single();
    if (error) throw new DatabaseRepositoryError(error);
    if (!data) throw new DatabaseRepositoryError();
    return data;
  }
}
