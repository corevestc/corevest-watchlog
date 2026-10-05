import type { WatchlistItem } from "../../domain/watchlist/index.js";
import type { WatchlistRepository } from "../ports/watchlist-repository.js";

export class GetDailyWatchlist {
  constructor(private readonly watchlists: WatchlistRepository) {}

  execute(): Promise<WatchlistItem[]> {
    return this.watchlists.listDaily();
  }
}
