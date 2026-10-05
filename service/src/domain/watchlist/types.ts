import type { ModelHits } from "../shared/model-hits.js";
import type { TradingPlan } from "./trading-plan.js";

export type WatchlistCategory = "PRIME" | "GOOD" | "NEW" | "LIVE";

export type WatchlistGrade = "A" | "B" | "C";

export type WatchlistDecision = "BUY" | "WATCH" | "SKIP";

export type WatchlistStatus = "PENDING" | "OPEN" | "CLOSED";

export interface WatchlistItem {
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
  status?: WatchlistStatus;
  modelHits?: Partial<ModelHits> | null;
}

export type WatchlistPatch = Partial<
  Omit<WatchlistDraft, "date" | "scrip">
> & {
  date?: string;
  scrip?: string;
};
