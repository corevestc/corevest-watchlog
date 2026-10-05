import type { ModelHits } from "./model-hits";
import type { TradingPlan } from "./trading-plan";

export type WatchlistCategory = "PRIME" | "GOOD" | "NEW" | "LIVE";

export type WatchlistGrade = "A" | "B" | "C";

export type WatchlistDecision = "BUY" | "WATCH" | "SKIP";

export type WatchlistStatus = "PENDING" | "OPEN" | "CLOSED";

export interface WatchlistRow {
  id: string;
  date: string;
  scrip: string;
  category: WatchlistCategory;
  prob: number | null;
  streak: number | null;
  runUpPct: number | null;
  close: number | null;
  marketStructure: string | null;
  setupStage: string | null;
  sectorId: number | null;
  relativeVolume: number | null;
  grade: WatchlistGrade | null;
  planEntry: number | null;
  planStop: number | null;
  planTarget: number | null;
  rewardRisk: number | null;
  decision: WatchlistDecision;
  skipReason: string | null;
  status: WatchlistStatus;
  modelHits: ModelHits;
  plan: TradingPlan;
}

export interface WatchlistDraft {
  date: string;
  scrip: string;
  category: WatchlistCategory;
  prob?: number | null;
  streak?: number | null;
  runUpPct?: number | null;
  close?: number | null;
  marketStructure?: string | null;
  setupStage?: string | null;
  sectorId?: number | null;
  relativeVolume?: number | null;
  grade?: WatchlistGrade | null;
  planEntry?: number | null;
  planStop?: number | null;
  planTarget?: number | null;
  decision?: WatchlistDecision;
  skipReason?: string | null;
  modelHits?: Partial<ModelHits> | null;
}

export type WatchlistPatch = Partial<WatchlistDraft>;

export interface BuyGateResult {
  allowed: boolean;
  reasons: string[];
}

export function evaluateRowBuyGates(row: WatchlistRow): BuyGateResult {
  const reasons: string[] = [];
  const entry = row.planEntry ?? row.plan.entry;
  const stop = row.planStop ?? row.plan.stop;
  const target = row.planTarget ?? row.plan.target;
  const rr = row.rewardRisk;

  if (row.grade !== "A" && row.grade !== "B") {
    reasons.push("grade must be A or B");
  }
  if (rr === null || rr < 2) {
    reasons.push("RR must be >= 2");
  }
  if (row.runUpPct === null || row.runUpPct >= 6) {
    reasons.push("run_up_pct must be < 6");
  }
  if (entry === null || stop === null || target === null) {
    reasons.push("plan must be complete (entry, stop, target)");
  }

  return { allowed: reasons.length === 0, reasons };
}
