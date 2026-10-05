import type { JournalRepository } from "../../application/ports/journal-repository.js";
import type { TradingLesson, Violation } from "../../domain/journal/index.js";
import type { PostgresPool } from "../database/postgres/pool.js";

export class PostgresJournalRepository implements JournalRepository {
  constructor(private readonly _pool: PostgresPool) {}

  async listLessons(): Promise<TradingLesson[]> {
    void this._pool;
    return [];
  }

  async listViolations(): Promise<Violation[]> {
    return [];
  }
}
