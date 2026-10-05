import type { WatchlistStore } from "../../application/ports/watchlist-store.js";
import type { WatchlistItem } from "../../domain/watchlist/types.js";
import type { PostgresPool } from "../database/postgres/pool.js";
import { rethrowPg } from "../database/postgres/pg-errors.js";
import { mapWatchlistRow, type WatchlistRow } from "./watchlist-row-map.js";

const COLUMNS = `
  id, date, scrip, category, prob, streak, run_up_pct, close,
  market_structure, setup_stage, sector_id, relative_volume, my_grade,
  plan_entry, plan_stop, plan_target, rr, decision, skip_reason, status,
  model_hits
`;

export class PostgresWatchlistStore implements WatchlistStore {
  constructor(private readonly pool: PostgresPool) {}

  async listByDate(date: string): Promise<WatchlistItem[]> {
    const result = await this.pool.query<WatchlistRow>(
      `SELECT ${COLUMNS} FROM watchlist_items WHERE date = $1 ORDER BY scrip`,
      [date]
    );
    return result.rows.map(mapWatchlistRow);
  }

  async listBetween(start: string, end: string): Promise<WatchlistItem[]> {
    const result = await this.pool.query<WatchlistRow>(
      `SELECT ${COLUMNS} FROM watchlist_items
       WHERE date BETWEEN $1 AND $2
       ORDER BY date, scrip`,
      [start, end]
    );
    return result.rows.map(mapWatchlistRow);
  }

  async getById(id: string): Promise<WatchlistItem | null> {
    const result = await this.pool.query<WatchlistRow>(
      `SELECT ${COLUMNS} FROM watchlist_items WHERE id = $1`,
      [id]
    );
    return result.rows[0] ? mapWatchlistRow(result.rows[0]) : null;
  }

  async save(item: WatchlistItem): Promise<WatchlistItem> {
    try {
      const result = await this.pool.query<WatchlistRow>(
        `INSERT INTO watchlist_items (
           id, date, scrip, category, prob, streak, run_up_pct, close,
           market_structure, setup_stage, sector_id, relative_volume, my_grade,
           plan_entry, plan_stop, plan_target, rr, decision, skip_reason,
           status, model_hits, updated_at
         ) VALUES (
           $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21::jsonb, now()
         )
         ON CONFLICT (id) DO UPDATE SET
           date = EXCLUDED.date,
           scrip = EXCLUDED.scrip,
           category = EXCLUDED.category,
           prob = EXCLUDED.prob,
           streak = EXCLUDED.streak,
           run_up_pct = EXCLUDED.run_up_pct,
           close = EXCLUDED.close,
           market_structure = EXCLUDED.market_structure,
           setup_stage = EXCLUDED.setup_stage,
           sector_id = EXCLUDED.sector_id,
           relative_volume = EXCLUDED.relative_volume,
           my_grade = EXCLUDED.my_grade,
           plan_entry = EXCLUDED.plan_entry,
           plan_stop = EXCLUDED.plan_stop,
           plan_target = EXCLUDED.plan_target,
           rr = EXCLUDED.rr,
           decision = EXCLUDED.decision,
           skip_reason = EXCLUDED.skip_reason,
           status = EXCLUDED.status,
           model_hits = EXCLUDED.model_hits,
           updated_at = now()
         RETURNING ${COLUMNS}`,
        [
          item.id,
          item.date,
          item.scrip,
          item.category,
          item.prob,
          item.streak,
          item.runUpPct,
          item.close,
          item.marketStructure,
          item.setupStage,
          item.sectorId,
          item.relativeVolume,
          item.grade,
          item.planEntry,
          item.planStop,
          item.planTarget,
          item.rewardRisk,
          item.decision,
          item.skipReason,
          item.status,
          JSON.stringify(item.modelHits)
        ]
      );
      if (!result.rows[0]) {
        throw new Error("watchlist save returned no row");
      }
      return mapWatchlistRow(result.rows[0]);
    } catch (error) {
      rethrowPg(error);
    }
  }
}
