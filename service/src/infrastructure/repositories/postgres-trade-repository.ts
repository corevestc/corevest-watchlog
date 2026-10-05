import type { TradeRepository } from "../../application/ports/trade-repository.js";
import type { Trade } from "../../domain/trade/index.js";
import type { PostgresPool } from "../database/postgres/pool.js";

export class PostgresTradeRepository implements TradeRepository {
  constructor(private readonly _pool: PostgresPool) {}

  async list(): Promise<Trade[]> {
    void this._pool;
    return [];
  }
}
