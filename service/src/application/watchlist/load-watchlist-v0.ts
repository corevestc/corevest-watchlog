import type { ModelWatchlistV0Row } from "../../domain/watchlist/model-watchlist-v0.js";
import type { MlWatchlistStore } from "../ports/ml-watchlist-store.js";

/** V0 board. A date on or before today filters that day. A missing or future date uses the latest saved V0 day. */
export class LoadWatchlistV0 {
  constructor(private readonly store: MlWatchlistStore) {}

  execute(requestedDate: string | null): Promise<ModelWatchlistV0Row[]> {
    const today = new Date().toISOString().slice(0, 10);
    return this.store.loadV0(requestedDate, today);
  }
}
