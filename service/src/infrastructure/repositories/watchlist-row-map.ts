import { normalizeModelHits, type ModelHits } from "../../domain/shared/model-hits.js";
import { buildWatchlistItem } from "../../domain/watchlist/build-watchlist-item.js";
import type {
  WatchlistCategory,
  WatchlistDecision,
  WatchlistGrade,
  WatchlistItem,
  WatchlistStatus
} from "../../domain/watchlist/types.js";
import { toInt, toIsoDate, toNumber } from "../database/postgres/map-numeric.js";

export interface WatchlistRow {
  id: string;
  date: Date | string;
  scrip: string;
  category: WatchlistCategory;
  prob: string | number | null;
  streak: number | null;
  run_up_pct: string | number | null;
  close: string | number | null;
  market_structure: string | null;
  setup_stage: string | null;
  sector_id: number | null;
  relative_volume: string | number | null;
  my_grade: WatchlistGrade | null;
  plan_entry: string | number | null;
  plan_stop: string | number | null;
  plan_target: string | number | null;
  rr: string | number | null;
  decision: WatchlistDecision;
  skip_reason: string | null;
  status: WatchlistStatus;
  model_hits: ModelHits | null;
}

export function mapWatchlistRow(row: WatchlistRow): WatchlistItem {
  return buildWatchlistItem(
    {
      date: toIsoDate(row.date),
      scrip: row.scrip,
      category: row.category,
      prob: toNumber(row.prob),
      streak: row.streak,
      runUpPct: toNumber(row.run_up_pct),
      close: toNumber(row.close),
      marketStructure: row.market_structure,
      setupStage: row.setup_stage,
      sectorId: toInt(row.sector_id),
      relativeVolume: toNumber(row.relative_volume),
      grade: row.my_grade,
      planEntry: toNumber(row.plan_entry),
      planStop: toNumber(row.plan_stop),
      planTarget: toNumber(row.plan_target),
      decision: row.decision,
      skipReason: row.skip_reason,
      status: row.status,
      modelHits: normalizeModelHits(row.model_hits)
    },
    row.id
  );
}
