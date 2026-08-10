import type { PostgrestError } from "@supabase/supabase-js";

import type { ContentStatus, LeadStatus } from "@/types/database";
import type { DatabaseClient } from "../client";

export interface PaginationOptions {
  readonly page?: number;
  readonly pageSize?: number;
}

export interface PaginatedResult<Row> {
  readonly data: readonly Row[];
  readonly count: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

export abstract class BaseRepository<
  Row extends { readonly id: string },
  Insert,
  Update,
  Status extends string,
> {
  protected constructor(protected readonly client: DatabaseClient) {}

  abstract findAll(): Promise<readonly Row[]>;
  abstract findById(id: string): Promise<Row | null>;
  abstract create(input: Insert): Promise<Row>;
  abstract update(id: string, input: Update): Promise<Row>;
  abstract delete(id: string): Promise<void>;
  abstract search(query: string): Promise<readonly Row[]>;
  abstract paginate(options?: PaginationOptions): Promise<PaginatedResult<Row>>;
  abstract setStatus(id: string, status: Status): Promise<Row>;

  protected getRange(options: PaginationOptions = {}) {
    const page = Math.max(1, options.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, options.pageSize ?? 20));
    const from = (page - 1) * pageSize;
    return { page, pageSize, from, to: from + pageSize - 1 } as const;
  }

  protected paginateResult<ResultRow extends Row = Row>(
    data: readonly ResultRow[],
    count: number | null,
    page: number,
    pageSize: number,
  ): PaginatedResult<ResultRow> {
    const total = count ?? 0;
    return {
      data,
      count: total,
      page,
      pageSize,
      totalPages: total === 0 ? 0 : Math.ceil(total / pageSize),
    };
  }

  protected requireData(data: Row | null): Row {
    if (!data) throw new DatabaseRepositoryError();
    return data;
  }

  protected throwIfError(error: PostgrestError | null): void {
    if (error) throw new DatabaseRepositoryError(error);
  }
}

export abstract class ContentRepository<
  Row extends { readonly id: string },
  Insert,
  Update,
> extends BaseRepository<Row, Insert, Update, ContentStatus> {
  publish(id: string): Promise<Row> {
    return this.setStatus(id, "published");
  }

  archive(id: string): Promise<Row> {
    return this.setStatus(id, "archived");
  }

  restore(id: string): Promise<Row> {
    return this.setStatus(id, "draft");
  }
}

export abstract class LeadRepository<
  Row extends { readonly id: string },
  Insert,
  Update,
> extends BaseRepository<Row, Insert, Update, LeadStatus> {
  archive(id: string): Promise<Row> {
    return this.setStatus(id, "archived");
  }

  restore(id: string): Promise<Row> {
    return this.setStatus(id, "new");
  }
}

export class DatabaseRepositoryError extends Error {
  readonly code: string;
  readonly details: string;
  readonly hint: string;

  constructor(error?: PostgrestError) {
    super("The database operation could not be completed.");
    this.name = "DatabaseRepositoryError";
    this.code = error?.code ?? "missing_data";
    this.details = error?.details ?? "The requested record was not returned.";
    this.hint =
      error?.hint ??
      "Confirm the record exists and the active role permits this operation.";
  }
}
