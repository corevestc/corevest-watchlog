import {
  assertStopBelowEntry,
  type MyWatchlistDraft,
  type MyWatchlistEntry
} from "../../domain/watchlist/my-watchlist.js";
import type { MyWatchlistStore } from "../ports/my-watchlist-store.js";

export class CreateMyWatchlist {
  constructor(private readonly watchlist: MyWatchlistStore) {}

  async execute(userId: string, draft: MyWatchlistDraft): Promise<MyWatchlistEntry> {
    assertStopBelowEntry(draft.plannedEntry, draft.stopLoss);
    return this.watchlist.insert(userId, draft);
  }
}
