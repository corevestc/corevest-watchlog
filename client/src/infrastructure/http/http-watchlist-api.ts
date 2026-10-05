import type { WatchlistApi } from "../../application/ports/watchlist-api";
import type {
  BuyGateResult,
  WatchlistDraft,
  WatchlistPatch,
  WatchlistRow
} from "../../domain/watchlist/watchlist-row";
import { normalizeModelHits } from "../../domain/watchlist/model-hits";
import { apiPaths } from "./api-paths";
import { httpJson } from "./http-json";

interface Envelope<T> {
  data: T;
}

function mapRow(row: WatchlistRow): WatchlistRow {
  return {
    ...row,
    modelHits: normalizeModelHits(row.modelHits)
  };
}

export class HttpWatchlistApi implements WatchlistApi {
  async list(scope: "active" | "all", date: string): Promise<WatchlistRow[]> {
    const query =
      scope === "all"
        ? "scope=all"
        : `date=${encodeURIComponent(date)}`;
    const payload = await httpJson<Envelope<WatchlistRow[]>>(
      "GET",
      `${apiPaths.watchlist}?${query}`
    );
    return payload.data.map(mapRow);
  }

  async get(id: string): Promise<WatchlistRow> {
    const payload = await httpJson<Envelope<WatchlistRow>>(
      "GET",
      `${apiPaths.watchlist}/${id}`
    );
    return mapRow(payload.data);
  }

  async create(draft: WatchlistDraft): Promise<WatchlistRow> {
    const payload = await httpJson<Envelope<WatchlistRow>>(
      "POST",
      apiPaths.watchlist,
      draft
    );
    return mapRow(payload.data);
  }

  async patch(id: string, patch: WatchlistPatch): Promise<WatchlistRow> {
    const payload = await httpJson<Envelope<WatchlistRow>>(
      "PATCH",
      `${apiPaths.watchlist}/${id}`,
      patch
    );
    return mapRow(payload.data);
  }

  async decide(
    id: string,
    decision: WatchlistRow["decision"],
    skipReason?: string | null
  ): Promise<WatchlistRow> {
    const payload = await httpJson<Envelope<WatchlistRow>>(
      "POST",
      `${apiPaths.watchlist}/${id}/decision`,
      { decision, skipReason }
    );
    return mapRow(payload.data);
  }

  async eligibility(
    id: string
  ): Promise<{ item: WatchlistRow; eligibility: BuyGateResult }> {
    const payload = await httpJson<
      Envelope<{ item: WatchlistRow; eligibility: BuyGateResult }>
    >("GET", `${apiPaths.watchlist}/${id}/eligibility`);
    return {
      item: mapRow(payload.data.item),
      eligibility: payload.data.eligibility
    };
  }
}
