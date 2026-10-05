import type { WatchlistItem } from "../../domain/watchlist";

export interface WatchLogApi {
  getDailyWatchlist(): Promise<WatchlistItem[]>;
  getHealth(): Promise<{
    status: "ok" | "degraded";
    service: "watchlog";
    database: "up" | "down";
  }>;
}
