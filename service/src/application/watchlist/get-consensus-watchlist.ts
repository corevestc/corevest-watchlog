import type { ConsensusWatchlistRow } from "../../domain/watchlist/signal-source.js";
import type { MlWatchlistStore } from "../ports/ml-watchlist-store.js";

/** Ranked list: stocks flagged by more models first, then higher average probability. Human picks are marked. */
export class GetConsensusWatchlist {
  constructor(private readonly store: MlWatchlistStore) {}

  execute(tradeDate: string): Promise<ConsensusWatchlistRow[]> {
    return this.store.consensus(tradeDate);
  }
}
