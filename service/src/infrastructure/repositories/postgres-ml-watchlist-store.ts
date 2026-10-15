import type { MlWatchlistStore } from "../../application/ports/ml-watchlist-store.js";
import type { ModelWatchlistBoardRow } from "../../domain/watchlist/model-watchlist-board.js";
import type { ModelWatchlistSummaryRow } from "../../domain/watchlist/model-watchlist-summary.js";
import type { ModelWatchlistV0Row } from "../../domain/watchlist/model-watchlist-v0.js";
import { readTargetPct } from "../../domain/watchlist/signal-source.js";
import type {
  ConsensusWatchlistRow,
  MlWatchlistSignal,
  SignalSource,
  WatchlistSelection,
  WatchlistSelectionDraft,
  WatchlistSignalDraft
} from "../../domain/watchlist/signal-source.js";
import { toInt, toIsoDate, toNumber } from "../database/postgres/map-numeric.js";
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

const WATCHLIST_BOARD_SQL = `
WITH chosen AS (
    SELECT CASE
        WHEN $1::date IS NULL OR $1::date > $2::date THEN (
            SELECT max(trade_date)
            FROM watchlog.ml_watchlist
            WHERE source IN ('V1', 'V2')
        )
        ELSE $1::date
    END AS trade_date
),
rows AS (
    SELECT
        w.trade_date,
        w.scrip,
        w.stock_id,
        w.category,
        w.signal_price,
        w.setup_stage,
        w.market_structure,
        sec.name AS sector,
        max(w.probability) FILTER (WHERE w.source = 'V1') AS early_probability,
        max(w.rank_position) FILTER (WHERE w.source = 'V1') AS early_rank,
        max(w.probability) FILTER (WHERE w.source = 'V2') AS strong_probability,
        max(w.rank_position) FILTER (WHERE w.source = 'V2') AS strong_rank,
        max((w.extra_metrics ->> 'relative_volume')::numeric) AS relative_volume,
        max((w.extra_metrics ->> 'rsi14')::numeric) AS rsi14,
        max((w.extra_metrics ->> 'pre_breakout_score')::numeric) AS pre_breakout_score
    FROM watchlog.ml_watchlist w
    JOIN chosen c ON c.trade_date = w.trade_date
    LEFT JOIN public.sectors sec ON sec.id = w.sector_id
    WHERE w.source IN ('V1', 'V2')
    GROUP BY w.trade_date, w.scrip, w.stock_id, w.category,
             w.signal_price, w.setup_stage, w.market_structure, sec.name
)
SELECT
    trade_date,
    row_number() OVER (
        ORDER BY (category = 'PRIME') DESC,
                 greatest(early_probability, strong_probability) DESC,
                 scrip
    ) AS watchlist_rank,
    scrip,
    category,
    round(early_probability * 100, 2) AS early_pct,
    early_rank,
    round(strong_probability * 100, 2) AS strong_pct,
    strong_rank,
    signal_price,
    sector,
    setup_stage,
    market_structure,
    round(relative_volume, 2) AS relative_volume,
    round(rsi14, 1) AS rsi14,
    round(pre_breakout_score, 2) AS pre_breakout_score
FROM rows
ORDER BY watchlist_rank
`;

const WATCHLIST_V0_SQL = `
WITH chosen AS (
    SELECT CASE
        WHEN $1::date IS NULL OR $1::date > $2::date THEN (
            SELECT max(trade_date)
            FROM watchlog.ml_watchlist
            WHERE source = 'V0'
        )
        ELSE $1::date
    END AS trade_date
)
SELECT
    w.trade_date,
    COALESCE(w.rank_position, 0) AS watchlist_rank,
    w.scrip,
    w.category,
    round(w.probability * 100, 2) AS chance_pct,
    w.signal_price,
    sec.name AS sector,
    w.setup_stage,
    w.market_structure,
    round((w.extra_metrics ->> 'relative_volume')::numeric, 2) AS relative_volume,
    round((w.extra_metrics ->> 'breakout_pressure_score')::numeric, 2) AS breakout_pressure,
    round((w.extra_metrics ->> 'resistance_distance_pct')::numeric, 2) AS resistance_distance_pct
FROM watchlog.ml_watchlist w
JOIN chosen c ON c.trade_date = w.trade_date
LEFT JOIN public.sectors sec ON sec.id = w.sector_id
WHERE w.source = 'V0'
ORDER BY w.rank_position NULLS LAST, w.probability DESC, w.scrip
`;

interface WatchlistV0DbRow {
  trade_date: Date | string;
  watchlist_rank: unknown;
  scrip: string;
  category: string | null;
  chance_pct: unknown;
  signal_price: unknown;
  sector: string | null;
  setup_stage: string | null;
  market_structure: string | null;
  relative_volume: unknown;
  breakout_pressure: unknown;
  resistance_distance_pct: unknown;
}

const WATCHLIST_SUMMARY_SQL = `
WITH anchor AS (
    SELECT CASE
        WHEN $1::date IS NULL OR $1::date > $2::date THEN (
            SELECT max(trade_date)
            FROM watchlog.ml_watchlist
            WHERE source = ANY($3::text[])
        )
        ELSE $1::date
    END AS trade_date
),
days AS (
    SELECT trade_date
    FROM (
        SELECT DISTINCT w.trade_date
        FROM watchlog.ml_watchlist w
        JOIN anchor a ON w.trade_date <= a.trade_date
        WHERE w.source = ANY($3::text[])
        ORDER BY w.trade_date DESC
        LIMIT 5
    ) recent
),
ranked_days AS (
    SELECT trade_date, row_number() OVER (ORDER BY trade_date DESC) AS day_rank
    FROM days
),
hits AS (
    SELECT
        w.scrip,
        w.trade_date,
        w.source,
        w.category,
        w.probability,
        w.signal_price,
        w.market_structure,
        w.sector_id,
        d.day_rank
    FROM watchlog.ml_watchlist w
    JOIN ranked_days d ON d.trade_date = w.trade_date
    WHERE w.source = ANY($3::text[])
      AND ($4::text IS NULL OR w.scrip ILIKE $4 ESCAPE '\')
),
presence AS (
    SELECT scrip, day_rank
    FROM hits
    GROUP BY scrip, day_rank
),
streaks AS (
    SELECT scrip, count(*)::int AS streak
    FROM (
        SELECT
            scrip,
            day_rank - row_number() OVER (PARTITION BY scrip ORDER BY day_rank) AS grp
        FROM presence
    ) sequenced
    WHERE grp = 0
    GROUP BY scrip
),
latest_hit AS (
    SELECT DISTINCT ON (scrip)
        scrip,
        trade_date,
        category,
        signal_price,
        market_structure,
        sector_id
    FROM hits
    ORDER BY scrip, trade_date DESC,
             CASE category WHEN 'PRIME' THEN 0 WHEN 'GOOD' THEN 1 ELSE 2 END,
             probability DESC NULLS LAST
),
model_latest AS (
    SELECT DISTINCT ON (scrip, source)
        scrip,
        source,
        round(probability * 100, 2) AS pct
    FROM hits
    ORDER BY scrip, source, trade_date DESC
),
rolled AS (
    SELECT
        h.scrip,
        count(DISTINCT h.trade_date)::int AS day_count,
        (SELECT count(*)::int FROM days) AS window_days,
        COALESCE(max(st.streak), 0)::int AS streak,
        (
            (bool_or(h.source = 'V0'))::int
            + (bool_or(h.source = 'V1'))::int
            + (bool_or(h.source = 'V2'))::int
        ) AS model_count,
        concat_ws(', ',
            CASE WHEN bool_or(h.source = 'V0') THEN 'V0' END,
            CASE WHEN bool_or(h.source = 'V1') THEN 'V1' END,
            CASE WHEN bool_or(h.source = 'V2') THEN 'V2' END
        ) AS models,
        lh.trade_date AS latest_date,
        lh.category,
        max(ml.pct) FILTER (WHERE ml.source = 'V0') AS v0_pct,
        max(ml.pct) FILTER (WHERE ml.source = 'V1') AS early_pct,
        max(ml.pct) FILTER (WHERE ml.source = 'V2') AS strong_pct,
        greatest(
            COALESCE(max(ml.pct) FILTER (WHERE ml.source = 'V0'), 0),
            COALESCE(max(ml.pct) FILTER (WHERE ml.source = 'V1'), 0),
            COALESCE(max(ml.pct) FILTER (WHERE ml.source = 'V2'), 0)
        ) AS best_pct,
        lh.signal_price,
        sec.name AS sector,
        lh.market_structure,
        (SELECT min(trade_date) FROM days) AS window_from,
        (SELECT max(trade_date) FROM days) AS window_to
    FROM hits h
    LEFT JOIN streaks st ON st.scrip = h.scrip
    JOIN latest_hit lh ON lh.scrip = h.scrip
    LEFT JOIN model_latest ml ON ml.scrip = h.scrip
    LEFT JOIN public.sectors sec ON sec.id = lh.sector_id
    GROUP BY h.scrip, lh.trade_date, lh.category, lh.signal_price, lh.market_structure, sec.name
)
SELECT
    row_number() OVER (
        ORDER BY day_count DESC, model_count DESC, streak DESC, best_pct DESC, scrip
    ) AS summary_rank,
    scrip,
    day_count,
    window_days,
    streak,
    models,
    latest_date,
    category,
    v0_pct,
    early_pct,
    strong_pct,
    signal_price,
    sector,
    market_structure,
    window_from,
    window_to
FROM rolled
ORDER BY summary_rank
`;

interface WatchlistSummaryDbRow {
  summary_rank: unknown;
  scrip: string;
  day_count: unknown;
  window_days: unknown;
  streak: unknown;
  models: string;
  latest_date: Date | string;
  category: string | null;
  v0_pct: unknown;
  early_pct: unknown;
  strong_pct: unknown;
  signal_price: unknown;
  sector: string | null;
  market_structure: string | null;
  window_from: Date | string;
  window_to: Date | string;
}

interface WatchlistBoardDbRow {
  trade_date: Date | string;
  watchlist_rank: unknown;
  scrip: string;
  category: string | null;
  early_pct: unknown;
  early_rank: unknown;
  strong_pct: unknown;
  strong_rank: unknown;
  signal_price: unknown;
  sector: string | null;
  setup_stage: string | null;
  market_structure: string | null;
  relative_volume: unknown;
  rsi14: unknown;
  pre_breakout_score: unknown;
}

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

  async loadBoard(requestedDate: string | null, today: string): Promise<ModelWatchlistBoardRow[]> {
    const result = await this.pool.query<WatchlistBoardDbRow>(WATCHLIST_BOARD_SQL, [
      requestedDate,
      today
    ]);
    return result.rows.map((row) => ({
      tradeDate: toIsoDate(row.trade_date),
      watchlistRank: toInt(row.watchlist_rank) ?? 0,
      scrip: row.scrip,
      category: row.category,
      earlyPct: toNumber(row.early_pct),
      earlyRank: toInt(row.early_rank),
      strongPct: toNumber(row.strong_pct),
      strongRank: toInt(row.strong_rank),
      signalPrice: toNumber(row.signal_price),
      sector: row.sector,
      setupStage: row.setup_stage,
      marketStructure: row.market_structure,
      relativeVolume: toNumber(row.relative_volume),
      rsi14: toNumber(row.rsi14),
      preBreakoutScore: toNumber(row.pre_breakout_score)
    }));
  }

  async loadV0(requestedDate: string | null, today: string): Promise<ModelWatchlistV0Row[]> {
    const result = await this.pool.query<WatchlistV0DbRow>(WATCHLIST_V0_SQL, [
      requestedDate,
      today
    ]);
    return result.rows.map((row) => ({
      tradeDate: toIsoDate(row.trade_date),
      watchlistRank: toInt(row.watchlist_rank) ?? 0,
      scrip: row.scrip,
      category: row.category,
      chancePct: toNumber(row.chance_pct),
      signalPrice: toNumber(row.signal_price),
      sector: row.sector,
      setupStage: row.setup_stage,
      marketStructure: row.market_structure,
      relativeVolume: toNumber(row.relative_volume),
      breakoutPressure: toNumber(row.breakout_pressure),
      resistanceDistancePct: toNumber(row.resistance_distance_pct)
    }));
  }

  async loadSummary(
    requestedDate: string | null,
    today: string,
    sources: readonly string[],
    scrip: string
  ): Promise<ModelWatchlistSummaryRow[]> {
    const needle = scrip.trim();
    const pattern =
      needle === "" ? null : `%${needle.replace(/[\\%_]/g, (char) => `\\${char}`)}%`;
    const result = await this.pool.query<WatchlistSummaryDbRow>(WATCHLIST_SUMMARY_SQL, [
      requestedDate,
      today,
      sources,
      pattern
    ]);
    return result.rows.map((row) => ({
      summaryRank: toInt(row.summary_rank) ?? 0,
      scrip: row.scrip,
      dayCount: toInt(row.day_count) ?? 0,
      windowDays: toInt(row.window_days) ?? 0,
      streak: toInt(row.streak) ?? 0,
      models: row.models,
      latestDate: toIsoDate(row.latest_date),
      category: row.category,
      v0Pct: toNumber(row.v0_pct),
      earlyPct: toNumber(row.early_pct),
      strongPct: toNumber(row.strong_pct),
      signalPrice: toNumber(row.signal_price),
      sector: row.sector,
      marketStructure: row.market_structure,
      windowFrom: toIsoDate(row.window_from),
      windowTo: toIsoDate(row.window_to)
    }));
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
