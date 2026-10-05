import type { WatchlistItem } from "../../domain/watchlist/index.js";

export interface WatchlistRepository {
  listDaily(): Promise<WatchlistItem[]>;
}
