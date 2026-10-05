import { isPlanComplete } from "./trading-plan";
import type { WatchlistItem } from "./watchlist-item";

export interface BuyDecision {
  allowed: boolean;
  reasons: string[];
}

export function evaluateBuyEligibility(item: WatchlistItem): BuyDecision {
  const reasons: string[] = [];

  if (item.grade !== "A" && item.grade !== "B") {
    reasons.push("grade must be A or B");
  }

  if (item.rewardRisk === null || item.rewardRisk < 2) {
    reasons.push("RR must be >= 2");
  }

  if (item.runUpPct === null || item.runUpPct >= 6) {
    reasons.push("run_up_pct must be < 6");
  }

  if (!isPlanComplete(item.plan)) {
    reasons.push("plan must be complete");
  }

  return {
    allowed: reasons.length === 0,
    reasons
  };
}
