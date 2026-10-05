import type {
  ConsensusWatchlistRow,
  MlWatchlistSignal,
  SignalSource,
  WatchlistSelection,
  WatchlistSelectionDraft,
  WatchlistSignalDraft
} from "../../domain/watchlist/signal-source.js";

export interface MlWatchlistStore {
  saveSignals(
    tradeDate: string,
    source: SignalSource,
    signals: WatchlistSignalDraft[]
  ): Promise<MlWatchlistSignal[]>;
  listSignals(tradeDate: string): Promise<MlWatchlistSignal[]>;
  consensus(tradeDate: string): Promise<ConsensusWatchlistRow[]>;
  saveSelection(draft: WatchlistSelectionDraft, riskReward: number | null): Promise<WatchlistSelection>;
  listSelections(tradeDate: string): Promise<WatchlistSelection[]>;
  updatePendingOutcomes(): Promise<number>;
}
