import { GetDailyWatchlist } from "../application/watchlist/get-daily-watchlist";
import { HttpWatchLogApi } from "../infrastructure/http/http-watchlog-api";

export function composeClient() {
  const api = new HttpWatchLogApi();
  return {
    api,
    getDailyWatchlist: new GetDailyWatchlist(api)
  };
}

export type ClientContainer = ReturnType<typeof composeClient>;
