import { NotFoundError } from "../../domain/shared/errors.js";
import type { WatchlistItem } from "../../domain/watchlist/types.js";
import type { WatchlistStore } from "../ports/watchlist-store.js";

export class GetWatchlistRow {
  constructor(private readonly watchlists: WatchlistStore) {}

  async execute(id: string): Promise<WatchlistItem> {
    const item = await this.watchlists.getById(id);
    if (!item) {
      throw new NotFoundError(`Watchlist row ${id} not found`);
    }
    return item;
  }
}
