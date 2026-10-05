import type { MlWatchlistStore } from "../ports/ml-watchlist-store.js";

/**
 * Close PENDING outcomes once stock_ml_features_daily has future_max_return_5d.
 * Compares that column to target_pct with no rescaling — both must use the features-table unit.
 * Rows stay PENDING while the forward window is still null.
 */
export class UpdateWatchlistOutcomes {
  constructor(private readonly store: MlWatchlistStore) {}

  execute(): Promise<number> {
    return this.store.updatePendingOutcomes();
  }
}
