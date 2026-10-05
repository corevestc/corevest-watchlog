import type { TradingPlan } from "./trading-plan.js";

export type WatchlistGrade = "A" | "B" | "C";

export interface WatchlistItem {
  id: string;
  symbol: string;
  grade: WatchlistGrade;
  rewardRisk: number | null;
  runUpPct: number | null;
  plan: TradingPlan;
}
