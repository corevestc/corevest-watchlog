import { NotFoundError } from "../../domain/shared/errors.js";
import type { MyWatchlistStore } from "../ports/my-watchlist-store.js";

export class DeleteMyWatchlist {
  constructor(private readonly watchlist: MyWatchlistStore) {}

  async execute(userId: string, id: string): Promise<void> {
    const removed = await this.watchlist.delete(userId, id);
    if (!removed) {
      throw new NotFoundError("Watchlist entry not found");
    }
  }
}
