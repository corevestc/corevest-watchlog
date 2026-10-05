import {
  evaluateBuyEligibility,
  type BuyDecision,
  type WatchlistItem
} from "../../domain/watchlist";

export function evaluateWatchlistDecision(item: WatchlistItem): BuyDecision {
  return evaluateBuyEligibility(item);
}
