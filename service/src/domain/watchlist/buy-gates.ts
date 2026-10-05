import { computeRewardRisk, isWatchlistPlanComplete } from "./plan-math.js";
import type { WatchlistGrade, WatchlistItem } from "./types.js";

export interface BuyDecision {
  allowed: boolean;
  reasons: string[];
}

export interface BuyGateInput {
  grade: WatchlistGrade | null;
  rewardRisk: number | null;
  runUpPct: number | null;
  planEntry: number | null;
  planStop: number | null;
  planTarget: number | null;
}

export function evaluateBuyGates(item: BuyGateInput): BuyDecision {
  const reasons: string[] = [];
  const rr =
    item.rewardRisk ??
    computeRewardRisk(item.planEntry, item.planStop, item.planTarget);

  if (item.grade !== "A" && item.grade !== "B") {
    reasons.push("grade must be A or B");
  }

  if (rr === null || rr < 2) {
    reasons.push("RR must be >= 2");
  }

  if (item.runUpPct === null || item.runUpPct >= 6) {
    reasons.push("run_up_pct must be < 6");
  }

  if (
    !isWatchlistPlanComplete({
      entry: item.planEntry,
      stop: item.planStop,
      target: item.planTarget
    })
  ) {
    reasons.push("plan must be complete (plan_entry, plan_stop, plan_target)");
  }

  return {
    allowed: reasons.length === 0,
    reasons
  };
}

export function toBuyGateInput(item: WatchlistItem): BuyGateInput {
  return {
    grade: item.grade,
    rewardRisk: item.rewardRisk,
    runUpPct: item.runUpPct,
    planEntry: item.planEntry ?? item.plan.entry,
    planStop: item.planStop ?? item.plan.stop,
    planTarget: item.planTarget ?? item.plan.target
  };
}
