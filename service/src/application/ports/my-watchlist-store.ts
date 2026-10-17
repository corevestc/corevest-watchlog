import type {
  MyWatchlistDraft,
  MyWatchlistEntry,
  MyWatchlistResult,
  MyWatchlistSource,
  MyWatchlistStatus
} from "../../domain/watchlist/my-watchlist.js";

export interface MyWatchlistFilter {
  status: MyWatchlistStatus | null;
  source: MyWatchlistSource | null;
  result: MyWatchlistResult | null;
}

export interface MyWatchlistStore {
  list(userId: string, filter: MyWatchlistFilter): Promise<MyWatchlistEntry[]>;
  get(userId: string, id: string): Promise<MyWatchlistEntry | null>;
  insert(userId: string, draft: MyWatchlistDraft): Promise<MyWatchlistEntry>;
  update(userId: string, id: string, draft: MyWatchlistDraft): Promise<MyWatchlistEntry | null>;
  delete(userId: string, id: string): Promise<boolean>;
}
