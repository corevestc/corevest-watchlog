import { randomUUID } from "node:crypto";
import type { MyWatchlistFilter, MyWatchlistStore } from "../../application/ports/my-watchlist-store.js";
import type {
  MyWatchlistDraft,
  MyWatchlistEntry,
  MyWatchlistResult,
  MyWatchlistSetup,
  MyWatchlistSource,
  MyWatchlistStatus
} from "../../domain/watchlist/my-watchlist.js";
import { rewardRisk } from "../../domain/watchlist/my-watchlist.js";
import { toIsoDate, toNumber } from "../database/postgres/map-numeric.js";
import type { PostgresPool } from "../database/postgres/pool.js";
import { rethrowPg } from "../database/postgres/pg-errors.js";
import { featureCloseColumn } from "./latest-feature-close.js";

const columns = `id, symbol, added_date, source, setup_type, planned_entry, stop_loss,
  target_price, reason, status, result, notes, created_at, updated_at`;

interface WatchlistRow {
  id: string;
  symbol: string;
  added_date: Date | string;
  source: MyWatchlistSource;
  setup_type: MyWatchlistSetup | null;
  planned_entry: unknown;
  stop_loss: unknown;
  target_price: unknown;
  reason: string | null;
  status: MyWatchlistStatus;
  result: MyWatchlistResult;
  notes: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  latest_close?: unknown;
  latest_close_date?: Date | string | null;
}

function toTimestamp(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function toEntry(row: WatchlistRow): MyWatchlistEntry {
  const plannedEntry = toNumber(row.planned_entry);
  const stopLoss = toNumber(row.stop_loss);
  const targetPrice = toNumber(row.target_price);
  return {
    id: row.id,
    symbol: row.symbol,
    addedDate: toIsoDate(row.added_date),
    source: row.source,
    setupType: row.setup_type,
    plannedEntry,
    stopLoss,
    targetPrice,
    reason: row.reason,
    status: row.status,
    result: row.result,
    notes: row.notes,
    createdAt: toTimestamp(row.created_at),
    updatedAt: toTimestamp(row.updated_at),
    rewardRisk: rewardRisk(plannedEntry, stopLoss, targetPrice),
    latestClose: toNumber(row.latest_close),
    latestCloseDate:
      row.latest_close_date == null ? null : String(row.latest_close_date).slice(0, 10)
  };
}

/** Latest close from stock_ml_features_daily, attached only when that column exists. */
async function closeSelect(pool: PostgresPool): Promise<{ select: string; join: string }> {
  const column = await featureCloseColumn(pool);
  if (!column) {
    return { select: "", join: "" };
  }
  return {
    select: ", latest.latest_close, latest.latest_close_date",
    join: `LEFT JOIN LATERAL (
         SELECT f.${column} AS latest_close, f.trade_date::text AS latest_close_date
         FROM public.stock_ml_features_daily f
         WHERE upper(f.scrip) = upper(my_watchlist.symbol)
         ORDER BY f.trade_date DESC
         LIMIT 1
       ) latest ON true`
  };
}

export class PostgresMyWatchlistStore implements MyWatchlistStore {
  constructor(private readonly pool: PostgresPool) {}

  async list(userId: string, filter: MyWatchlistFilter): Promise<MyWatchlistEntry[]> {
    const close = await closeSelect(this.pool);
    const result = await this.pool.query<WatchlistRow>(
      `SELECT ${columns}${close.select}
       FROM my_watchlist
       ${close.join}
       WHERE user_id = $1
         AND ($2::text IS NULL OR status = $2)
         AND ($3::text IS NULL OR source = $3)
         AND ($4::text IS NULL OR result = $4)
       ORDER BY added_date DESC, id DESC`,
      [userId, filter.status, filter.source, filter.result]
    );
    return result.rows.map(toEntry);
  }

  async get(userId: string, id: string): Promise<MyWatchlistEntry | null> {
    const close = await closeSelect(this.pool);
    const result = await this.pool.query<WatchlistRow>(
      `SELECT ${columns}${close.select}
       FROM my_watchlist
       ${close.join}
       WHERE user_id = $1 AND id = $2`,
      [userId, id]
    );
    const row = result.rows[0];
    return row ? toEntry(row) : null;
  }

  async insert(userId: string, draft: MyWatchlistDraft): Promise<MyWatchlistEntry> {
    try {
      const result = await this.pool.query<WatchlistRow>(
        `INSERT INTO my_watchlist (
           id, user_id, symbol, added_date, source, setup_type,
           planned_entry, stop_loss, target_price, reason, status, result, notes
         ) VALUES (
           $1, $2, $3, COALESCE($4::date, current_date), $5, $6,
           $7, $8, $9, $10, $11, $12, $13
         )
         RETURNING ${columns}`,
        [
          randomUUID(),
          userId,
          draft.symbol,
          draft.addedDate,
          draft.source,
          draft.setupType,
          draft.plannedEntry,
          draft.stopLoss,
          draft.targetPrice,
          draft.reason,
          draft.status,
          draft.result,
          draft.notes
        ]
      );
      const row = result.rows[0];
      if (!row) {
        throw new Error("my_watchlist insert returned no row");
      }
      return toEntry(row);
    } catch (error) {
      rethrowPg(error);
    }
  }

  async update(
    userId: string,
    id: string,
    draft: MyWatchlistDraft
  ): Promise<MyWatchlistEntry | null> {
    try {
      const result = await this.pool.query<WatchlistRow>(
        `UPDATE my_watchlist
         SET symbol = $3,
             added_date = COALESCE($4::date, added_date),
             source = $5,
             setup_type = $6,
             planned_entry = $7,
             stop_loss = $8,
             target_price = $9,
             reason = $10,
             status = $11,
             result = $12,
             notes = $13,
             updated_at = now()
         WHERE user_id = $1 AND id = $2
         RETURNING ${columns}`,
        [
          userId,
          id,
          draft.symbol,
          draft.addedDate,
          draft.source,
          draft.setupType,
          draft.plannedEntry,
          draft.stopLoss,
          draft.targetPrice,
          draft.reason,
          draft.status,
          draft.result,
          draft.notes
        ]
      );
      const row = result.rows[0];
      return row ? toEntry(row) : null;
    } catch (error) {
      rethrowPg(error);
    }
  }

  async delete(userId: string, id: string): Promise<boolean> {
    const result = await this.pool.query(
      "DELETE FROM my_watchlist WHERE user_id = $1 AND id = $2",
      [userId, id]
    );
    return result.rowCount === 1;
  }
}
