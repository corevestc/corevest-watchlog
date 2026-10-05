import type {
  ConsensusWatchlistRow,
  MlWatchlistSignal,
  SignalCategory,
  SignalSource,
  WatchlistSelection
} from "../../domain/watchlist/signal-source.js";
import { toInt, toIsoDate, toNumber } from "../database/postgres/map-numeric.js";

export interface MlWatchlistDbRow {
  id: number;
  trade_date: Date | string;
  stock_id: number;
  scrip: string;
  source: SignalSource;
  probability: string | number | null;
  rank_position: number | null;
  category: SignalCategory | null;
  signal_price: string | number | null;
  setup_stage: string | null;
  market_structure: string | null;
  sector_id: number | null;
  extra_metrics: Record<string, unknown> | null;
  created_at: Date | string;
}

export function mapMlWatchlistRow(row: MlWatchlistDbRow): MlWatchlistSignal {
  return {
    id: row.id,
    tradeDate: toIsoDate(row.trade_date),
    stockId: row.stock_id,
    scrip: row.scrip,
    source: row.source,
    probability: toNumber(row.probability),
    rankPosition: toInt(row.rank_position),
    category: row.category,
    signalPrice: toNumber(row.signal_price),
    setupStage: row.setup_stage,
    marketStructure: row.market_structure,
    sectorId: toInt(row.sector_id),
    extraMetrics: row.extra_metrics ?? {},
    createdAt: toTimestamp(row.created_at)
  };
}

export interface ConsensusDbRow {
  kind: "CONSENSUS" | "HUMAN";
  stock_id: number;
  scrip: string;
  model_count: number;
  models: string[] | null;
  avg_probability: string | number | null;
  max_probability: string | number | null;
  signal_price: string | number | null;
  setup_stage: string | null;
  market_structure: string | null;
  category: SignalCategory | null;
  sector_id: number | null;
}

export function mapConsensusRow(row: ConsensusDbRow): ConsensusWatchlistRow {
  return {
    kind: row.kind,
    stockId: row.stock_id,
    scrip: row.scrip,
    modelCount: row.model_count,
    models: row.models ?? [],
    avgProbability: toNumber(row.avg_probability),
    maxProbability: toNumber(row.max_probability),
    signalPrice: toNumber(row.signal_price),
    setupStage: row.setup_stage,
    marketStructure: row.market_structure,
    category: row.category,
    sectorId: toInt(row.sector_id)
  };
}

export interface SelectionDbRow {
  id: number;
  trade_date: Date | string;
  stock_id: number;
  scrip: string;
  decision: WatchlistSelection["decision"];
  human_grade: WatchlistSelection["humanGrade"];
  decision_reason: string | null;
  planned_entry: string | number | null;
  planned_stop: string | number | null;
  planned_target: string | number | null;
  risk_reward: string | number | null;
  created_at: Date | string;
}

export function mapSelectionRow(row: SelectionDbRow): WatchlistSelection {
  return {
    id: row.id,
    tradeDate: toIsoDate(row.trade_date),
    stockId: row.stock_id,
    scrip: row.scrip,
    decision: row.decision,
    humanGrade: row.human_grade,
    decisionReason: row.decision_reason,
    plannedEntry: toNumber(row.planned_entry),
    plannedStop: toNumber(row.planned_stop),
    plannedTarget: toNumber(row.planned_target),
    riskReward: toNumber(row.risk_reward),
    createdAt: toTimestamp(row.created_at)
  };
}

function toTimestamp(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : String(value);
}
