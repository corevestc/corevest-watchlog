import type { WatchlistRow } from "../../domain/watchlist/watchlist-row";
import type { WatchlistApi } from "../ports/watchlist-api";

export class DecideWatchlistRow {
  constructor(private readonly api: WatchlistApi) {}

  execute(
    id: string,
    decision: WatchlistRow["decision"],
    skipReason?: string | null
  ): Promise<WatchlistRow> {
    return this.api.decide(id, decision, skipReason);
  }
}
