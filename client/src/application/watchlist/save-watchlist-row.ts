import type { WatchlistDraft, WatchlistRow } from "../../domain/watchlist/watchlist-row";
import type { WatchlistApi } from "../ports/watchlist-api";

export class SaveWatchlistRow {
  constructor(private readonly api: WatchlistApi) {}

  execute(draft: WatchlistDraft): Promise<WatchlistRow> {
    return this.api.create(draft);
  }
}
