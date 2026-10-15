import { randomUUID } from "node:crypto";
import type { AccountJournalStore, AccountTradeFilter } from "../../application/ports/account-journal-store.js";
import type { AccountTrade, AccountTradeDraft } from "../../domain/journal/account-trade.js";
import { NotFoundError } from "../../domain/shared/errors.js";
import { toIsoDate, toInt, toNumber } from "../database/postgres/map-numeric.js";
import type { PostgresPool } from "../database/postgres/pool.js";
import { rethrowPg } from "../database/postgres/pg-errors.js";

interface TradeRow {
  id: string;
  bo_id: string;
  entry_date: Date | string;
  scrip: string;
  qty: unknown;
  entry_price: unknown;
  stop: unknown;
  target: unknown;
  exit_date: Date | string | null;
  exit_price: unknown;
  note: string | null;
}

function pnl(entry: number | null, exit: number | null, qty: number | null) {
  if (entry === null || exit === null || qty === null || entry === 0) {
    return { pnlAmt: null, pnlPct: null };
  }
  const amount = (exit - entry) * qty;
  return {
    pnlAmt: Math.round(amount * 100) / 100,
    pnlPct: Math.round(((exit - entry) / entry) * 10000) / 100
  };
}

function toTrade(row: TradeRow): AccountTrade {
  const entryPrice = toNumber(row.entry_price);
  const exitPrice = toNumber(row.exit_price);
  const qty = toInt(row.qty);
  return {
    id: row.id,
    boId: row.bo_id,
    entryDate: toIsoDate(row.entry_date),
    scrip: row.scrip,
    qty: qty ?? 0,
    entryPrice: entryPrice ?? 0,
    stop: toNumber(row.stop),
    target: toNumber(row.target),
    exitDate: row.exit_date === null ? null : toIsoDate(row.exit_date),
    exitPrice,
    note: row.note,
    ...pnl(entryPrice, exitPrice, qty)
  };
}

function likeContains(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  return `%${trimmed.replace(/[\\%_]/g, (char) => `\\${char}`)}%`;
}

export class PostgresAccountJournalStore implements AccountJournalStore {
  constructor(private readonly pool: PostgresPool) {}

  async getBoId(userId: string): Promise<string | null> {
    const result = await this.pool.query<{ bo_id: string | null }>(
      "SELECT bo_id FROM users WHERE id = $1",
      [userId]
    );
    const row = result.rows[0];
    if (!row) {
      throw new NotFoundError("Account not found");
    }
    return row.bo_id;
  }

  async setBoId(userId: string, boId: string): Promise<void> {
    try {
      const result = await this.pool.query(
        "UPDATE users SET bo_id = $2, updated_at = now() WHERE id = $1",
        [userId, boId]
      );
      if (result.rowCount === 0) {
        throw new NotFoundError("Account not found");
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      rethrowPg(error);
    }
  }

  async list(userId: string, filter: AccountTradeFilter): Promise<AccountTrade[]> {
    const result = await this.pool.query<TradeRow>(
      `SELECT id, bo_id, entry_date, scrip, qty, entry_price, stop, target,
              exit_date, exit_price, note
       FROM account_trades
       WHERE user_id = $1
         AND ($2::date IS NULL OR entry_date = $2::date)
         AND ($3::text IS NULL OR scrip ILIKE $3 ESCAPE '\\')
       ORDER BY entry_date DESC, scrip`,
      [userId, filter.entryDate, likeContains(filter.scrip)]
    );
    return result.rows.map(toTrade);
  }

  async save(userId: string, boId: string, draft: AccountTradeDraft): Promise<AccountTrade> {
    try {
      const result = await this.pool.query<TradeRow>(
        `INSERT INTO account_trades (
           id, user_id, bo_id, entry_date, scrip, qty, entry_price,
           stop, target, exit_date, exit_price, note
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
         RETURNING id, bo_id, entry_date, scrip, qty, entry_price, stop, target,
                   exit_date, exit_price, note`,
        [
          randomUUID(),
          userId,
          boId,
          draft.entryDate,
          draft.scrip,
          draft.qty,
          draft.entryPrice,
          draft.stop ?? null,
          draft.target ?? null,
          draft.exitDate ?? null,
          draft.exitPrice ?? null,
          draft.note ?? null
        ]
      );
      const row = result.rows[0];
      if (!row) {
        throw new Error("account trade insert returned no row");
      }
      return toTrade(row);
    } catch (error) {
      rethrowPg(error);
    }
  }
}
