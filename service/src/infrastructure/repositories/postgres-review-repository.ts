import type { ReviewRepository } from "../../application/ports/review-repository.js";
import type { WeeklyReview } from "../../domain/review/index.js";
import type { PostgresPool } from "../database/postgres/pool.js";

export class PostgresReviewRepository implements ReviewRepository {
  constructor(private readonly _pool: PostgresPool) {}

  async list(): Promise<WeeklyReview[]> {
    void this._pool;
    return [];
  }
}
