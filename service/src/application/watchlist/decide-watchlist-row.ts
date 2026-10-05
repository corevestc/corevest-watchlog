import { DomainError, NotFoundError } from "../../domain/shared/errors.js";
import { assertWatchlistDecision } from "../../domain/watchlist/assert-decision.js";
import { applyWatchlistPatch } from "../../domain/watchlist/build-watchlist-item.js";
import type {
  WatchlistDecision,
  WatchlistItem
} from "../../domain/watchlist/types.js";
import type { WatchlistStore } from "../ports/watchlist-store.js";

export class DecideWatchlistRow {
  constructor(private readonly watchlists: WatchlistStore) {}

  async execute(input: {
    id: string;
    decision: WatchlistDecision;
    skipReason?: string | null;
  }): Promise<WatchlistItem> {
    const current = await this.watchlists.getById(input.id);
    if (!current) {
      throw new NotFoundError(`Watchlist row ${input.id} not found`);
    }
    if (current.status !== "PENDING") {
      throw new DomainError(
        `Cannot change decision after status is ${current.status}`
      );
    }
    const next = applyWatchlistPatch(current, {
      decision: input.decision,
      skipReason: input.skipReason ?? null
    });
    assertWatchlistDecision(next);
    return this.watchlists.save(next);
  }
}
