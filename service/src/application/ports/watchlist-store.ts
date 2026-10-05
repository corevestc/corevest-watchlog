import type { WatchlistItem } from "../../domain/watchlist/types.js";

export interface WatchlistStore {
  listByDate(date: string): Promise<WatchlistItem[]>;
  listBetween(start: string, end: string): Promise<WatchlistItem[]>;
  getById(id: string): Promise<WatchlistItem | null>;
  save(item: WatchlistItem): Promise<WatchlistItem>;
}
