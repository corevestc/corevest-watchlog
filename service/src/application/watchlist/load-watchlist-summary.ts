import type { ModelWatchlistSummaryRow } from "../../domain/watchlist/model-watchlist-summary.js";
import type { MlWatchlistStore } from "../ports/ml-watchlist-store.js";

const SUMMARY_SOURCES = {
  all: ["V0", "V1", "V2"],
  v0: ["V0"],
  v12: ["V1", "V2"]
} as const;

export type SummaryModelFilter = keyof typeof SUMMARY_SOURCES;

/** Last five list days up to the chosen day, one row per stock. */
export class LoadWatchlistSummary {
  constructor(private readonly store: MlWatchlistStore) {}

  execute(
    requestedDate: string | null,
    models: SummaryModelFilter,
    scrip: string
  ): Promise<ModelWatchlistSummaryRow[]> {
    const today = new Date().toISOString().slice(0, 10);
    return this.store.loadSummary(requestedDate, today, SUMMARY_SOURCES[models], scrip);
  }
}
