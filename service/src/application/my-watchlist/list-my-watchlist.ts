import type { MyWatchlistEntry } from "../../domain/watchlist/my-watchlist.js";
import type { MyWatchlistFilter, MyWatchlistStore } from "../ports/my-watchlist-store.js";

export class ListMyWatchlist {
  constructor(private readonly watchlist: MyWatchlistStore) {}

  execute(userId: string, filter: MyWatchlistFilter): Promise<MyWatchlistEntry[]> {
    return this.watchlist.list(userId, filter);
  }
}
