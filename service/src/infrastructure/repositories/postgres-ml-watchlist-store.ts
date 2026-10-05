import type { MlWatchlistStore } from "../../application/ports/ml-watchlist-store.js";
import { readTargetPct } from "../../domain/watchlist/signal-source.js";
import type {
  ConsensusWatchlistRow,
  MlWatchlistSignal,
  SignalSource,
  WatchlistSelection,
  WatchlistSelectionDraft,
  WatchlistSignalDraft
} from "../../domain/watchlist/signal-source.js";
import type { PostgresPool } from "../database/postgres/pool.js";
import { rethrowPg } from "../database/postgres/pg-errors.js";
import {
  mapConsensusRow,
  mapMlWatchlistRow,
  mapSelectionRow,
  type ConsensusDbRow,
  type MlWatchlistDbRow,
  type SelectionDbRow
} from "./ml-watchlist-row-map.js";

const SIGNAL_COLUMNS = `
  id, trade_date, stock_id, scrip, source, probability, rank_position, category,
  signal_price, setup_stage, market_structure, sector_id, extra_metrics, created_at
`;

const RETURN_COLUMNS = ["future_max_return_5d", "future_max_return"] as const;
const DATE_COLUMNS = ["trade_date", "date"] as const;
const DAYS_COLUMNS = ["days_to_hit", "future_days_to_max_5d", "days_to_peak_5d"] as const;

export class PostgresMlWatchlistStore implements MlWatchlistStore {
  constructor(private readonly pool: PostgresPool) {}

  /** Insert or replace signals for one source, and open a PENDING outcome row for each. */
  async saveSignals(
    tradeDate: string,
    source: SignalSource,
    signals: WatchlistSignalDraft[]
  ): Promise<MlWatchlistSignal[]> {
    if (signals.length === 0) {
      return [];
    }
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const saved: MlWatchlistSignal[] = [];
      for (const signal of signals) {
        const extra = signal.extraMetrics ?? {};
        const result = await client.query<MlWatchlistDbRow>(
          `INSERT INTO ml_watchlist (
             trade_date, stock_id, scrip, source, probability, rank_position, category,
             signal_price, setup_stage, market_structure, sector_id, extra_metrics
           ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb)
           ON CONFLICT (trade_date, stock_id, source) DO UPDATE SET
             scrip = EXCLUDED.scrip,
             probability = EXCLUDED.probability,
             rank_position = EXCLUDED.rank_position,
             category = EXCLUDED.category,
             signal_price = EXCLUDED.signal_price,
             setup_stage = EXCLUDED.setup_stage,
             market_structure = EXCLUDED.market_structure,
             sector_id = EXCLUDED.sector_id,
             extra_metrics = EXCLUDED.extra_metrics
           RETURNING ${SIGNAL_COLUMNS}`,
          [
            tradeDate,
            signal.stockId,
            signal.scrip,
            source,
            signal.probability,
            signal.rankPosition,
            signal.category,
            signal.signalPrice,
            signal.setupStage,
            signal.marketStructure,
            signal.sectorId,
            JSON.stringify(extra)
          ]
        );
        const row = result.rows[0];
        if (!row) {
          throw new Error("ml_watchlist upsert returned no row");
        }
        saved.push(mapMlWatchlistRow(row));
        await client.query(
          `INSERT INTO watchlist_outcomes (
             trade_date, stock_id, scrip, source, signal_price, target_pct, status
           ) VALUES ($1,$2,$3,$4,$5,$6,'PENDING')
           ON CONFLICT (trade_date, stock_id, source) DO UPDATE SET
             scrip = EXCLUDED.scrip,
             signal_price = EXCLUDED.signal_price,
             target_pct = COALESCE(EXCLUDED.target_pct, watchlist_outcomes.target_pct),
             updated_at = now()
           WHERE watchlist_outcomes.status = 'PENDING'`,
          [
            tradeDate,
            signal.stockId,
            signal.scrip,
            source,
            signal.signalPrice,
            readTargetPct(extra)
          ]
        );
      }
      await client.query("COMMIT");
      return saved;
    } catch (error) {
      await client.query("ROLLBACK");
      rethrowPg(error);
    } finally {
      client.release();
    }
  }

  async listSignals(tradeDate: string): Promise<MlWatchlistSignal[]> {
    const result = await this.pool.query<MlWatchlistDbRow>(
      `SELECT ${SIGNAL_COLUMNS}
       FROM ml_watchlist
       WHERE trade_date = $1
       ORDER BY source, rank_position NULLS LAST, scrip`,
      [tradeDate]
    );
    return result.rows.map(mapMlWatchlistRow);
  }

  /** Group V1/V2/BO by stock, then append HUMAN rows with kind HUMAN. */
  async consensus(tradeDate: string): Promise<ConsensusWatchlistRow[]> {
    const result = await this.pool.query<ConsensusDbRow>(
      `WITH model_rows AS (
         SELECT *
         FROM ml_watchlist
         WHERE trade_date = $1 AND source IN ('V1', 'V2', 'BO')
       ),
       grouped AS (
         SELECT
           stock_id,
           (ARRAY_AGG(scrip ORDER BY probability DESC NULLS LAST))[1] AS scrip,
           COUNT(DISTINCT source)::int AS model_count,
           ARRAY_AGG(DISTINCT source ORDER BY source)::text[] AS models,
           AVG(probability) AS avg_probability,
           MAX(probability) AS max_probability,
           (ARRAY_AGG(signal_price ORDER BY probability DESC NULLS LAST))[1] AS signal_price,
           (ARRAY_AGG(setup_stage ORDER BY probability DESC NULLS LAST))[1] AS setup_stage,
           (ARRAY_AGG(market_structure ORDER BY probability DESC NULLS LAST))[1] AS market_structure,
           (ARRAY_AGG(category ORDER BY probability DESC NULLS LAST))[1] AS category,
           (ARRAY_AGG(sector_id ORDER BY probability DESC NULLS LAST))[1] AS sector_id
         FROM model_rows
         GROUP BY stock_id
       )
       SELECT
         'CONSENSUS'::text AS kind,
         stock_id, scrip, model_count, models, avg_probability, max_probability,
         signal_price, setup_stage, market_structure, category, sector_id
       FROM grouped
       UNION ALL
       SELECT
         'HUMAN'::text AS kind,
         stock_id,
         scrip,
         0,
         ARRAY['HUMAN']::text[],
         probability,
         probability,
         signal_price,
         setup_stage,
         market_structure,
         category,
         sector_id
       FROM ml_watchlist
       WHERE trade_date = $1 AND source = 'HUMAN'
       ORDER BY kind ASC, model_count DESC, avg_probability DESC NULLS LAST, scrip`,
      [tradeDate]
    );
    return result.rows.map(mapConsensusRow);
  }

  /** One decision per stock per day. A second post updates the same row. */
  async saveSelection(
    draft: WatchlistSelectionDraft,
    riskReward: number | null
  ): Promise<WatchlistSelection> {
    try {
      const result = await this.pool.query<SelectionDbRow>(
        `INSERT INTO watchlist_selections (
           trade_date, stock_id, scrip, decision, human_grade, decision_reason,
           planned_entry, planned_stop, planned_target, risk_reward
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         ON CONFLICT (trade_date, stock_id) DO UPDATE SET
           scrip = EXCLUDED.scrip,
           decision = EXCLUDED.decision,
           human_grade = EXCLUDED.human_grade,
           decision_reason = EXCLUDED.decision_reason,
           planned_entry = EXCLUDED.planned_entry,
           planned_stop = EXCLUDED.planned_stop,
           planned_target = EXCLUDED.planned_target,
           risk_reward = EXCLUDED.risk_reward
         RETURNING
           id, trade_date, stock_id, scrip, decision, human_grade, decision_reason,
           planned_entry, planned_stop, planned_target, risk_reward, created_at`,
        [
          draft.tradeDate,
          draft.stockId,
          draft.scrip,
          draft.decision,
          draft.humanGrade,
          draft.decisionReason,
          draft.plannedEntry,
          draft.plannedStop,
          draft.plannedTarget,
          riskReward
        ]
      );
      const row = result.rows[0];
      if (!row) {
        throw new Error("watchlist_selections upsert returned no row");
      }
      return mapSelectionRow(row);
    } catch (error) {
      rethrowPg(error);
    }
  }

  async listSelections(tradeDate: string): Promise<WatchlistSelection[]> {
    const result = await this.pool.query<SelectionDbRow>(
      `SELECT id, trade_date, stock_id, scrip, decision, human_grade, decision_reason,
              planned_entry, planned_stop, planned_target, risk_reward, created_at
       FROM watchlist_selections
       WHERE trade_date = $1
       ORDER BY scrip`,
      [tradeDate]
    );
    return result.rows.map(mapSelectionRow);
  }

  /**
   * Mark PENDING rows HIT or MISSED from public.stock_ml_features_daily.
   * future_max_return_5d and target_pct are compared as stored (no /100).
   * A null forward return means the window is still open, so the row stays PENDING.
   */
  async updatePendingOutcomes(): Promise<number> {
    const columns = await this.pool.query<{ column_name: string }>(
      `SELECT column_name
       FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'stock_ml_features_daily'`
    );
    const names = new Set(columns.rows.map((row) => row.column_name));
    const returnCol = RETURN_COLUMNS.find((name) => names.has(name));
    const dateCol = DATE_COLUMNS.find((name) => names.has(name));
    if (!returnCol || !dateCol || !names.has("stock_id")) {
      return 0;
    }
    const daysCol = DAYS_COLUMNS.find((name) => names.has(name));
    const daysSql = daysCol ? `f.${daysCol}` : "NULL";
    const result = await this.pool.query(
      `UPDATE watchlist_outcomes AS o
       SET max_return_actual = f.${returnCol},
           days_to_hit = ${daysSql},
           hit_target = CASE
             WHEN o.target_pct IS NULL THEN NULL
             WHEN f.${returnCol} >= o.target_pct THEN TRUE
             ELSE FALSE
           END,
           status = CASE
             WHEN o.target_pct IS NULL THEN 'PENDING'
             WHEN f.${returnCol} >= o.target_pct THEN 'HIT'
             ELSE 'MISSED'
           END,
           updated_at = now()
       FROM public.stock_ml_features_daily AS f
       WHERE o.status = 'PENDING'
         AND f.stock_id = o.stock_id
         AND f.${dateCol} = o.trade_date
         AND f.${returnCol} IS NOT NULL`
    );
    return result.rowCount ?? 0;
  }
}
