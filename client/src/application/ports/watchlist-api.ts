import type {
  BuyGateResult,
  WatchlistDraft,
  WatchlistPatch,
  WatchlistRow
} from "../../domain/watchlist/watchlist-row";

export interface WatchlistApi {
  list(scope: "active" | "all", date: string): Promise<WatchlistRow[]>;
  get(id: string): Promise<WatchlistRow>;
  create(draft: WatchlistDraft): Promise<WatchlistRow>;
  patch(id: string, patch: WatchlistPatch): Promise<WatchlistRow>;
  decide(
    id: string,
    decision: WatchlistRow["decision"],
    skipReason?: string | null
  ): Promise<WatchlistRow>;
  eligibility(id: string): Promise<{ item: WatchlistRow; eligibility: BuyGateResult }>;
}
