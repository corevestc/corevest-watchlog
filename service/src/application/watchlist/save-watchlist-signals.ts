import type { SignalSource, WatchlistSignalDraft, MlWatchlistSignal } from "../../domain/watchlist/signal-source.js";
import type { MlWatchlistStore } from "../ports/ml-watchlist-store.js";

/** Upsert one model's (or human) signals for a trade date. Re-runs replace the same stock+source. */
export class SaveWatchlistSignals {
  constructor(private readonly store: MlWatchlistStore) {}

  execute(
    tradeDate: string,
    source: SignalSource,
    signals: WatchlistSignalDraft[]
  ): Promise<MlWatchlistSignal[]> {
    return this.store.saveSignals(tradeDate, source, signals);
  }
}
