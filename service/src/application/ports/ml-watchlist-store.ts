import type { ModelWatchlistBoardRow } from "../../domain/watchlist/model-watchlist-board.js";
import type { ModelWatchlistSummaryRow } from "../../domain/watchlist/model-watchlist-summary.js";
import type { ModelWatchlistV0Row } from "../../domain/watchlist/model-watchlist-v0.js";
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
  loadBoard(requestedDate: string | null, today: string): Promise<ModelWatchlistBoardRow[]>;
  loadV0(requestedDate: string | null, today: string): Promise<ModelWatchlistV0Row[]>;
  loadSummary(
    requestedDate: string | null,
    today: string,
    sources: readonly string[],
    scrip: string
  ): Promise<ModelWatchlistSummaryRow[]>;
  consensus(tradeDate: string): Promise<ConsensusWatchlistRow[]>;
  saveSelection(draft: WatchlistSelectionDraft, riskReward: number | null): Promise<WatchlistSelection>;
  listSelections(tradeDate: string): Promise<WatchlistSelection[]>;
  updatePendingOutcomes(): Promise<number>;
}
