import type { WatchlistPatch, WatchlistRow } from "../../domain/watchlist/watchlist-row";
import type { WatchlistApi } from "../ports/watchlist-api";

export class PatchWatchlistRow {
  constructor(private readonly api: WatchlistApi) {}

  execute(id: string, patch: WatchlistPatch): Promise<WatchlistRow> {
    return this.api.patch(id, patch);
  }
}
