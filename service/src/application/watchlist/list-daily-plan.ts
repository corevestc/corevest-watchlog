import type { WatchlistStore } from "../ports/watchlist-store.js";
import type { WatchlistItem } from "../../domain/watchlist/types.js";

export class ListDailyWatchlist {
  constructor(private readonly watchlists: WatchlistStore) {}

  execute(date: string): Promise<WatchlistItem[]> {
    return this.watchlists.listByDate(date);
  }
}
