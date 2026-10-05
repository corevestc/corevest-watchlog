import { assertWatchlistDecision } from "../../domain/watchlist/assert-decision.js";
import { buildWatchlistItem } from "../../domain/watchlist/build-watchlist-item.js";
import type { WatchlistDraft, WatchlistItem } from "../../domain/watchlist/types.js";
import type { WatchlistStore } from "../ports/watchlist-store.js";

export class SaveWatchlistRow {
  constructor(private readonly watchlists: WatchlistStore) {}

  execute(draft: WatchlistDraft): Promise<WatchlistItem> {
    const item = buildWatchlistItem(draft);
    assertWatchlistDecision(item);
    return this.watchlists.save(item);
  }
}
