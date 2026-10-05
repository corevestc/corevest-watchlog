import type {
  ConsensusWatchlistRow,
  MlWatchlistSignal,
  WatchlistSelection
} from "../../domain/watchlist/signal-source.js";
import type { MlWatchlistStore } from "../ports/ml-watchlist-store.js";

export interface DailyModelWatchlist {
  tradeDate: string;
  signals: MlWatchlistSignal[];
  selections: WatchlistSelection[];
  consensus: ConsensusWatchlistRow[];
}

/** Full dashboard payload: raw signals, human decisions, and the consensus ranking. */
export class GetDailyModelWatchlist {
  constructor(private readonly store: MlWatchlistStore) {}

  async execute(tradeDate: string): Promise<DailyModelWatchlist> {
    const [signals, selections, consensus] = await Promise.all([
      this.store.listSignals(tradeDate),
      this.store.listSelections(tradeDate),
      this.store.consensus(tradeDate)
    ]);
    return { tradeDate, signals, selections, consensus };
  }
}
