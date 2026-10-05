import {
  selectionRiskReward,
  type WatchlistSelection,
  type WatchlistSelectionDraft
} from "../../domain/watchlist/signal-source.js";
import type { MlWatchlistStore } from "../ports/ml-watchlist-store.js";

/** Store the human BUY / WATCH / SKIP call and the reward-to-risk from the planned prices. */
export class SaveWatchlistSelection {
  constructor(private readonly store: MlWatchlistStore) {}

  execute(draft: WatchlistSelectionDraft): Promise<WatchlistSelection> {
    return this.store.saveSelection(draft, selectionRiskReward(draft));
  }
}
