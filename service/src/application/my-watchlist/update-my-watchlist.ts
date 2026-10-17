import { NotFoundError } from "../../domain/shared/errors.js";
import {
  assertStopBelowEntry,
  type MyWatchlistDraft,
  type MyWatchlistEntry,
  type MyWatchlistPatch
} from "../../domain/watchlist/my-watchlist.js";
import type { MyWatchlistStore } from "../ports/my-watchlist-store.js";

export class UpdateMyWatchlist {
  constructor(private readonly watchlist: MyWatchlistStore) {}

  async execute(
    userId: string,
    id: string,
    patch: MyWatchlistPatch
  ): Promise<MyWatchlistEntry> {
    const current = await this.watchlist.get(userId, id);
    if (!current) {
      throw new NotFoundError("Watchlist entry not found");
    }
    const draft: MyWatchlistDraft = {
      symbol: patch.symbol ?? current.symbol,
      addedDate: patch.addedDate ?? current.addedDate,
      source: patch.source ?? current.source,
      setupType: patch.setupType === undefined ? current.setupType : patch.setupType,
      plannedEntry: patch.plannedEntry === undefined ? current.plannedEntry : patch.plannedEntry,
      stopLoss: patch.stopLoss === undefined ? current.stopLoss : patch.stopLoss,
      targetPrice: patch.targetPrice === undefined ? current.targetPrice : patch.targetPrice,
      reason: patch.reason === undefined ? current.reason : patch.reason,
      status: patch.status ?? current.status,
      result: patch.result ?? current.result,
      notes: patch.notes === undefined ? current.notes : patch.notes
    };
    assertStopBelowEntry(draft.plannedEntry, draft.stopLoss);
    const row = await this.watchlist.update(userId, id, draft);
    if (!row) {
      throw new NotFoundError("Watchlist entry not found");
    }
    return row;
  }
}
