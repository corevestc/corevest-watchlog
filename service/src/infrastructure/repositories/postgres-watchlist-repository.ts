import type { WatchlistRepository } from "../../application/ports/watchlist-repository.js";
import type { WatchlistItem } from "../../domain/watchlist/index.js";
import type { PostgresPool } from "../database/postgres/pool.js";

export class PostgresWatchlistRepository implements WatchlistRepository {
  constructor(private readonly _pool: PostgresPool) {}

  async listDaily(): Promise<WatchlistItem[]> {
    void this._pool;
    return [];
  }
}
