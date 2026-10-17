import { NotFoundError } from "../../domain/shared/errors.js";
import type { MyWatchlistEntry } from "../../domain/watchlist/my-watchlist.js";
import type { MyWatchlistStore } from "../ports/my-watchlist-store.js";

export class GetMyWatchlist {
  constructor(private readonly watchlist: MyWatchlistStore) {}

  async execute(userId: string, id: string): Promise<MyWatchlistEntry> {
    const row = await this.watchlist.get(userId, id);
    if (!row) {
      throw new NotFoundError("Watchlist entry not found");
    }
    return row;
  }
}
