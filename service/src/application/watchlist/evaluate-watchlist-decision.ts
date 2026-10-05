import {
  evaluateBuyEligibility,
  type BuyDecision,
  type WatchlistItem
} from "../../domain/watchlist/index.js";

export class EvaluateWatchlistDecision {
  execute(item: WatchlistItem): BuyDecision {
    return evaluateBuyEligibility(item);
  }
}
