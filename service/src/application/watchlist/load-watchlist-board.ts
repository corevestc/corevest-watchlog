import type { ModelWatchlistBoardRow } from "../../domain/watchlist/model-watchlist-board.js";
import type { MlWatchlistStore } from "../ports/ml-watchlist-store.js";

/** V1/V2 board. A date on or before today filters that day. A missing or future date uses the latest saved day. */
export class LoadWatchlistBoard {
  constructor(private readonly store: MlWatchlistStore) {}

  execute(requestedDate: string | null): Promise<ModelWatchlistBoardRow[]> {
    const today = new Date().toISOString().slice(0, 10);
    return this.store.loadBoard(requestedDate, today);
  }
}
