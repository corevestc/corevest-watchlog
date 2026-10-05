import type { WatchlistItem } from "../../domain/watchlist";
import type { WatchLogApi } from "../ports/watchlog-api";

export class GetDailyWatchlist {
  constructor(private readonly api: WatchLogApi) {}

  execute(): Promise<WatchlistItem[]> {
    return this.api.getDailyWatchlist();
  }
}
