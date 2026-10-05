import type { ModelHits } from "../shared/model-hits.js";

export type SetupType =
  | "breakout"
  | "retest"
  | "pullback"
  | "swing"
  | "bounce";

export type MarketDayTone = "RED" | "GREEN" | "SIDE";

export type TradeEmotion = "calm" | "FOMO" | "greedy" | "anxious";

export type ExitReason =
  | "target"
  | "stop"
  | "time"
  | "discretionary"
  | "other";

export type ViolationCode =
  | "none"
  | "moved_stop"
  | "oversized"
  | "chased"
  | "early_exit"
  | "late_exit"
  | "revenge";

export interface TradeChecklist {
  volConfirm: boolean;
  trendAlign: boolean;
  notChasing: boolean;
  sizeOk: boolean;
}

export interface TradeJournal {
  id: string;
  tradeId: string;
  watchlistItemId: string;
  entryDate: string;
  scrip: string;
  sourceCategory: string;
  prob: number | null;
  setupType: SetupType;
  grade: string | null;
  entryPrice: number;
  qty: number;
  riskPct: number | null;
  stop: number;
  target1: number;
  target2: number | null;
  plannedRr: number | null;
  marketDay: MarketDayTone | null;
  marketDayChangePct: number | null;
  emotion: TradeEmotion | null;
  checklist: TradeChecklist;
  exitDate: string | null;
  exitPrice: number | null;
  exitReason: ExitReason | null;
  pnlPct: number | null;
  pnlAmt: number | null;
  rMultiple: number | null;
  daysHeld: number | null;
  mfePct: number | null;
  maePct: number | null;
  modelHits: ModelHits;
  violations: ViolationCode[];
  lesson: string | null;
  chartFile: string | null;
}

export interface JournalEntryDraft {
  watchlistItemId: string;
  setupType: SetupType;
  entryPrice: number;
  qty: number;
  riskPct?: number | null;
  stop: number;
  target1: number;
  target2?: number | null;
  marketDay?: MarketDayTone | null;
  marketDayChangePct?: number | null;
  emotion?: TradeEmotion | null;
  checklist: TradeChecklist;
}

export interface JournalExitDraft {
  exitDate: string;
  exitPrice: number;
  exitReason: ExitReason;
  mfePct?: number | null;
  maePct?: number | null;
  modelHits?: Partial<ModelHits> | null;
  violations?: ViolationCode[];
  lesson?: string | null;
  chartFile?: string | null;
  pnlPct?: number | null;
  pnlAmt?: number | null;
  rMultiple?: number | null;
  daysHeld?: number | null;
}
