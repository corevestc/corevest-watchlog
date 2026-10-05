import { DomainError, NotFoundError } from "../../domain/shared/errors.js";
import { assertWatchlistDecision } from "../../domain/watchlist/assert-decision.js";
import { applyWatchlistPatch } from "../../domain/watchlist/build-watchlist-item.js";
import type { WatchlistItem, WatchlistPatch } from "../../domain/watchlist/types.js";
import type { WatchlistStore } from "../ports/watchlist-store.js";

const lockedAfterPending: (keyof WatchlistPatch)[] = [
  "decision",
  "planEntry",
  "planStop",
  "planTarget",
  "grade"
];

export class PatchWatchlistRow {
  constructor(private readonly watchlists: WatchlistStore) {}

  async execute(id: string, patch: WatchlistPatch): Promise<WatchlistItem> {
    const current = await this.watchlists.getById(id);
    if (!current) {
      throw new NotFoundError(`Watchlist row ${id} not found`);
    }

    if (current.status !== "PENDING") {
      const blocked = lockedAfterPending.filter((key) => patch[key] !== undefined);
      if (blocked.length > 0) {
        throw new DomainError(
          `Cannot change ${blocked.join(", ")} after status is ${current.status}`
        );
      }
    }

    const next = applyWatchlistPatch(current, patch);
    assertWatchlistDecision(next);
    return this.watchlists.save(next);
  }
}
