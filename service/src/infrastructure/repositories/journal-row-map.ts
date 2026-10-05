import {
  normalizeModelHits,
  type ModelHits
} from "../../domain/shared/model-hits.js";
import type {
  ExitReason,
  MarketDayTone,
  SetupType,
  TradeChecklist,
  TradeEmotion,
  TradeJournal,
  ViolationCode
} from "../../domain/journal/trade-journal.js";
import { toInt, toIsoDate, toNumber } from "../database/postgres/map-numeric.js";

export interface JournalRow {
  id: string;
  trade_id: string;
  watchlist_item_id: string;
  entry_date: Date | string;
  scrip: string;
  source_category: string;
  prob: string | number | null;
  setup_type: SetupType;
  grade: string | null;
  entry_price: string | number;
  qty: number;
  risk_pct: string | number | null;
  stop: string | number;
  target1: string | number;
  target2: string | number | null;
  planned_rr: string | number | null;
  market_day: MarketDayTone | null;
  market_day_change_pct: string | number | null;
  emotion: TradeEmotion | null;
  checklist: TradeChecklist;
  exit_date: Date | string | null;
  exit_price: string | number | null;
  exit_reason: ExitReason | null;
  pnl_pct: string | number | null;
  pnl_amt: string | number | null;
  r_multiple: string | number | null;
  days_held: number | null;
  mfe_pct: string | number | null;
  mae_pct: string | number | null;
  model_hits: ModelHits | null;
  violations: string[] | null;
  lesson: string | null;
  chart_file: string | null;
}

function requiredNumber(value: string | number, field: string): number {
  const n = toNumber(value);
  if (n === null) {
    throw new Error(`Missing ${field}`);
  }
  return n;
}

export function mapJournalRow(row: JournalRow): TradeJournal {
  return {
    id: row.id,
    tradeId: row.trade_id,
    watchlistItemId: row.watchlist_item_id,
    entryDate: toIsoDate(row.entry_date),
    scrip: row.scrip,
    sourceCategory: row.source_category,
    prob: toNumber(row.prob),
    setupType: row.setup_type,
    grade: row.grade,
    entryPrice: requiredNumber(row.entry_price, "entry_price"),
    qty: row.qty,
    riskPct: toNumber(row.risk_pct),
    stop: requiredNumber(row.stop, "stop"),
    target1: requiredNumber(row.target1, "target1"),
    target2: toNumber(row.target2),
    plannedRr: toNumber(row.planned_rr),
    marketDay: row.market_day,
    marketDayChangePct: toNumber(row.market_day_change_pct),
    emotion: row.emotion,
    checklist: row.checklist,
    exitDate: row.exit_date ? toIsoDate(row.exit_date) : null,
    exitPrice: toNumber(row.exit_price),
    exitReason: row.exit_reason,
    pnlPct: toNumber(row.pnl_pct),
    pnlAmt: toNumber(row.pnl_amt),
    rMultiple: toNumber(row.r_multiple),
    daysHeld: toInt(row.days_held),
    mfePct: toNumber(row.mfe_pct),
    maePct: toNumber(row.mae_pct),
    modelHits: normalizeModelHits(row.model_hits),
    violations: (row.violations ?? []) as ViolationCode[],
    lesson: row.lesson,
    chartFile: row.chart_file
  };
}
