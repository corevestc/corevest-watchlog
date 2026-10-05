import type { WatchlistStore } from "../ports/watchlist-store.js";
import type { WatchlistItem } from "../../domain/watchlist/types.js";

export class ListAllWatchlist {
  constructor(private readonly watchlists: WatchlistStore) {}

  async execute(): Promise<WatchlistItem[]> {
    const rows = await this.watchlists.listBetween("1970-01-01", "2100-12-31");
    return [...rows].sort(
      (a, b) => b.date.localeCompare(a.date) || a.scrip.localeCompare(b.scrip)
    );
  }
}
