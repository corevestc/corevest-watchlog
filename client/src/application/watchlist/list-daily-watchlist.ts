import type { WatchlistRow } from "../../domain/watchlist/watchlist-row";
import type { WatchlistApi } from "../ports/watchlist-api";

export class ListDailyWatchlist {
  constructor(private readonly api: WatchlistApi) {}

  execute(scope: "active" | "all", date: string): Promise<WatchlistRow[]> {
    return this.api.list(scope, date);
  }
}
