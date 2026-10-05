import { randomUUID } from "node:crypto";
import { DomainError } from "../shared/errors.js";
import { mergeModelHits, normalizeModelHits } from "../shared/model-hits.js";
import { computeRewardRisk } from "./plan-math.js";
import type { TradingPlan } from "./trading-plan.js";
import type {
  WatchlistDraft,
  WatchlistItem,
  WatchlistPatch
} from "./types.js";

function planOf(item: {
  planEntry: number | null;
  planStop: number | null;
  planTarget: number | null;
}): TradingPlan {
  return {
    entry: item.planEntry,
    stop: item.planStop,
    target: item.planTarget,
    risk: null,
    quantity: null
  };
}

export function buildWatchlistItem(
  draft: WatchlistDraft,
  id: string = randomUUID()
): WatchlistItem {
  const scrip = draft.scrip.trim().toUpperCase();
  if (!scrip) {
    throw new DomainError("scrip is required");
  }

  const planEntry = draft.planEntry ?? null;
  const planStop = draft.planStop ?? null;
  const planTarget = draft.planTarget ?? null;
  const decision = draft.decision ?? "WATCH";
  const skipReason = draft.skipReason ?? null;

  if (decision === "SKIP" && !skipReason?.trim()) {
    throw new DomainError("skip_reason is required when decision is SKIP");
  }

  const item: WatchlistItem = {
    id,
    date: draft.date,
    scrip,
    category: draft.category,
    prob: draft.prob ?? null,
    streak: draft.streak ?? null,
    runUpPct: draft.runUpPct ?? null,
    close: draft.close ?? null,
    marketStructure: draft.marketStructure ?? null,
    setupStage: draft.setupStage ?? null,
    sectorId: draft.sectorId ?? null,
    relativeVolume: draft.relativeVolume ?? null,
    grade: draft.grade ?? null,
    planEntry,
    planStop,
    planTarget,
    rewardRisk: computeRewardRisk(planEntry, planStop, planTarget),
    decision,
    skipReason: decision === "SKIP" ? skipReason : skipReason,
    status: draft.status ?? "PENDING",
    modelHits: normalizeModelHits(draft.modelHits),
    plan: planOf({ planEntry, planStop, planTarget })
  };

  return item;
}

export function applyWatchlistPatch(
  current: WatchlistItem,
  patch: WatchlistPatch
): WatchlistItem {
  return buildWatchlistItem(
    {
      date: patch.date ?? current.date,
      scrip: patch.scrip ?? current.scrip,
      category: patch.category ?? current.category,
      prob: patch.prob !== undefined ? patch.prob : current.prob,
      streak: patch.streak !== undefined ? patch.streak : current.streak,
      runUpPct: patch.runUpPct !== undefined ? patch.runUpPct : current.runUpPct,
      close: patch.close !== undefined ? patch.close : current.close,
      marketStructure:
        patch.marketStructure !== undefined
          ? patch.marketStructure
          : current.marketStructure,
      setupStage:
        patch.setupStage !== undefined ? patch.setupStage : current.setupStage,
      sectorId: patch.sectorId !== undefined ? patch.sectorId : current.sectorId,
      relativeVolume:
        patch.relativeVolume !== undefined
          ? patch.relativeVolume
          : current.relativeVolume,
      grade: patch.grade !== undefined ? patch.grade : current.grade,
      planEntry:
        patch.planEntry !== undefined ? patch.planEntry : current.planEntry,
      planStop: patch.planStop !== undefined ? patch.planStop : current.planStop,
      planTarget:
        patch.planTarget !== undefined ? patch.planTarget : current.planTarget,
      decision: patch.decision ?? current.decision,
      skipReason:
        patch.skipReason !== undefined ? patch.skipReason : current.skipReason,
      status: patch.status ?? current.status,
      modelHits: mergeModelHits(current.modelHits, patch.modelHits)
    },
    current.id
  );
}
