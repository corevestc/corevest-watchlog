import type { WatchLogApi } from "../../application/ports/watchlog-api";
import type { WatchlistItem } from "../../domain/watchlist";
import { apiPaths } from "./api-paths";
import { httpGet } from "./http-client";

interface CollectionResponse<T> {
  data: T;
}

export class HttpWatchLogApi implements WatchLogApi {
  async getDailyWatchlist(): Promise<WatchlistItem[]> {
    const payload = await httpGet<CollectionResponse<WatchlistItem[]>>(
      apiPaths.watchlist
    );
    return payload.data;
  }

  getHealth() {
    return httpGet<{
      status: "ok" | "degraded";
      service: "watchlog";
      database: "up" | "down";
    }>(apiPaths.health);
  }
}
