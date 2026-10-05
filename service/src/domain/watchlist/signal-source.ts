import { computeRewardRisk } from "./plan-math.js";

export const SIGNAL_SOURCES = ["V1", "V2", "BO", "HUMAN"] as const;
export type SignalSource = (typeof SIGNAL_SOURCES)[number];

export const MODEL_SOURCES = ["V1", "V2", "BO"] as const;
export type ModelSource = (typeof MODEL_SOURCES)[number];

export const SIGNAL_CATEGORIES = ["PRIME", "GOOD", "NEW", "EXTENDED"] as const;
export type SignalCategory = (typeof SIGNAL_CATEGORIES)[number];

export interface WatchlistSignalDraft {
  stockId: number;
  scrip: string;
  probability: number | null;
  rankPosition: number | null;
  category: SignalCategory | null;
  signalPrice: number | null;
  setupStage: string | null;
  marketStructure: string | null;
  sectorId: number | null;
  extraMetrics: Record<string, unknown> | null;
}

export interface MlWatchlistSignal extends WatchlistSignalDraft {
  id: number;
  tradeDate: string;
  source: SignalSource;
  createdAt: string;
}

/** Pull a predicted return from flexible model metrics. Same unit as stock_ml_features_daily. */
export function readTargetPct(extra: Record<string, unknown> | null): number | null {
  if (!extra) {
    return null;
  }
  const raw = extra.targetPct ?? extra.target_pct;
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return raw;
  }
  if (typeof raw === "string" && raw.trim() !== "") {
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export interface ConsensusWatchlistRow {
  kind: "CONSENSUS" | "HUMAN";
  stockId: number;
  scrip: string;
  modelCount: number;
  models: string[];
  avgProbability: number | null;
  maxProbability: number | null;
  signalPrice: number | null;
  setupStage: string | null;
  marketStructure: string | null;
  category: SignalCategory | null;
  sectorId: number | null;
}

export interface WatchlistSelectionDraft {
  tradeDate: string;
  stockId: number;
  scrip: string;
  decision: "BUY" | "WATCH" | "SKIP";
  humanGrade: "A" | "B" | "C" | null;
  decisionReason: string | null;
  plannedEntry: number | null;
  plannedStop: number | null;
  plannedTarget: number | null;
}

export interface WatchlistSelection extends WatchlistSelectionDraft {
  id: number;
  riskReward: number | null;
  createdAt: string;
}

/** Reward/risk from the planned prices. Null when any price is missing or risk is zero. */
export function selectionRiskReward(draft: WatchlistSelectionDraft): number | null {
  return computeRewardRisk(draft.plannedEntry, draft.plannedStop, draft.plannedTarget);
}
