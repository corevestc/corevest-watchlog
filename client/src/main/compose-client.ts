import { RegisterAccount } from "../application/user/register-account";
import { SignIn } from "../application/user/sign-in";
import { DecideWatchlistRow } from "../application/watchlist/decide-watchlist-row";
import { GetDailyWatchlist } from "../application/watchlist/get-daily-watchlist";
import { ListDailyWatchlist } from "../application/watchlist/list-daily-watchlist";
import { PatchWatchlistRow } from "../application/watchlist/patch-watchlist-row";
import { SaveWatchlistRow } from "../application/watchlist/save-watchlist-row";
import { HttpAuthApi } from "../infrastructure/http/http-auth-api";
import { HttpWatchlistApi } from "../infrastructure/http/http-watchlist-api";
import { HttpWatchLogApi } from "../infrastructure/http/http-watchlog-api";

export function composeClient() {
  const api = new HttpWatchLogApi();
  const watchlist = new HttpWatchlistApi();
  const auth = new HttpAuthApi();
  return {
    api,
    auth,
    watchlist,
    getDailyWatchlist: new GetDailyWatchlist(api),
    listDailyWatchlist: new ListDailyWatchlist(watchlist),
    saveWatchlistRow: new SaveWatchlistRow(watchlist),
    patchWatchlistRow: new PatchWatchlistRow(watchlist),
    decideWatchlistRow: new DecideWatchlistRow(watchlist),
    registerAccount: new RegisterAccount(auth),
    signIn: new SignIn(auth)
  };
}

export type ClientContainer = ReturnType<typeof composeClient>;
