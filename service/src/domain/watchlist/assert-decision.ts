import { DomainError } from "../shared/errors.js";
import { evaluateBuyGates, toBuyGateInput } from "./buy-gates.js";
import type { WatchlistDecision, WatchlistItem } from "./types.js";

export function assertWatchlistDecision(item: WatchlistItem): void {
  if (item.decision !== "BUY") {
    return;
  }

  const result = evaluateBuyGates(toBuyGateInput(item));
  if (!result.allowed) {
    throw new DomainError(
      `BUY rejected: ${result.reasons.join("; ")}. No completed eligible plan means no trade.`
    );
  }
}

export function canOpenTrade(item: WatchlistItem): void {
  if (item.decision !== "BUY") {
    throw new DomainError("No trade without a BUY decision on the watchlist row.");
  }
  assertWatchlistDecision(item);
}

export function normalizeDecision(
  decision: WatchlistDecision | undefined
): WatchlistDecision {
  return decision ?? "WATCH";
}
