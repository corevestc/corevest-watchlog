import { DomainError, NotFoundError } from "../../domain/shared/errors.js";
import { normalizeModelHits } from "../../domain/shared/model-hits.js";
import { computeExitMetrics } from "../../domain/journal/journal-math.js";
import type {
  JournalExitDraft,
  TradeJournal
} from "../../domain/journal/trade-journal.js";
import { applyWatchlistPatch } from "../../domain/watchlist/build-watchlist-item.js";
import type { JournalStore } from "../ports/journal-store.js";
import type { WatchlistStore } from "../ports/watchlist-store.js";

export class ExitJournalTrade {
  constructor(
    private readonly journal: JournalStore,
    private readonly watchlists: WatchlistStore
  ) {}

  async execute(tradeId: string, exit: JournalExitDraft): Promise<TradeJournal> {
    const current = await this.journal.getByTradeId(tradeId);
    if (!current) {
      throw new NotFoundError(`Journal trade ${tradeId} not found`);
    }
    if (current.exitDate) {
      throw new DomainError("Trade already has an exit block");
    }

    const metrics = computeExitMetrics(current, exit);
    const next: TradeJournal = {
      ...current,
      exitDate: exit.exitDate,
      exitPrice: exit.exitPrice,
      exitReason: exit.exitReason,
      pnlPct: metrics.pnlPct,
      pnlAmt: metrics.pnlAmt,
      rMultiple: metrics.rMultiple,
      daysHeld: metrics.daysHeld,
      mfePct: exit.mfePct ?? null,
      maePct: exit.maePct ?? null,
      modelHits: normalizeModelHits(exit.modelHits),
      violations: exit.violations ?? ["none"],
      lesson: exit.lesson ?? null,
      chartFile: exit.chartFile ?? null
    };

    const saved = await this.journal.save(next);
    const item = await this.watchlists.getById(current.watchlistItemId);
    if (item) {
      await this.watchlists.save(
        applyWatchlistPatch(item, {
          status: "CLOSED",
          modelHits: next.modelHits
        })
      );
    }
    return saved;
  }
}
