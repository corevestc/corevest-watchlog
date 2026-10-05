import { randomUUID } from "node:crypto";
import { DomainError, NotFoundError } from "../../domain/shared/errors.js";
import { emptyModelHits } from "../../domain/shared/model-hits.js";
import type {
  JournalEntryDraft,
  TradeJournal
} from "../../domain/journal/trade-journal.js";
import { computeRewardRisk } from "../../domain/watchlist/plan-math.js";
import { canOpenTrade } from "../../domain/watchlist/assert-decision.js";
import { applyWatchlistPatch } from "../../domain/watchlist/build-watchlist-item.js";
import type { JournalStore } from "../ports/journal-store.js";
import type { WatchlistStore } from "../ports/watchlist-store.js";

export class OpenJournalTrade {
  constructor(
    private readonly journal: JournalStore,
    private readonly watchlists: WatchlistStore
  ) {}

  async execute(draft: JournalEntryDraft): Promise<TradeJournal> {
    const item = await this.watchlists.getById(draft.watchlistItemId);
    if (!item) {
      throw new NotFoundError(
        `Watchlist row ${draft.watchlistItemId} not found`
      );
    }
    canOpenTrade(item);
    if (item.status !== "PENDING") {
      throw new DomainError("Watchlist row already has a trade");
    }

    const existing = await this.journal.getByWatchlistItemId(item.id);
    if (existing) {
      throw new DomainError("A journal row already exists for this watchlist plan");
    }

    if (draft.qty <= 0) {
      throw new DomainError("qty must be > 0");
    }
    if (draft.stop >= draft.entryPrice) {
      throw new DomainError("stop must be below entry_price");
    }
    if (draft.target1 <= draft.entryPrice) {
      throw new DomainError("target1 must be above entry_price");
    }

    const plannedRr =
      computeRewardRisk(draft.entryPrice, draft.stop, draft.target1);

    const trade: TradeJournal = {
      id: randomUUID(),
      tradeId: await this.journal.nextTradeCode(),
      watchlistItemId: item.id,
      entryDate: item.date,
      scrip: item.scrip,
      sourceCategory: item.category,
      prob: item.prob,
      setupType: draft.setupType,
      grade: item.grade,
      entryPrice: draft.entryPrice,
      qty: draft.qty,
      riskPct: draft.riskPct ?? null,
      stop: draft.stop,
      target1: draft.target1,
      target2: draft.target2 ?? null,
      plannedRr,
      marketDay: draft.marketDay ?? null,
      marketDayChangePct: draft.marketDayChangePct ?? null,
      emotion: draft.emotion ?? null,
      checklist: draft.checklist,
      exitDate: null,
      exitPrice: null,
      exitReason: null,
      pnlPct: null,
      pnlAmt: null,
      rMultiple: null,
      daysHeld: null,
      mfePct: null,
      maePct: null,
      modelHits: emptyModelHits(),
      violations: [],
      lesson: null,
      chartFile: null
    };

    const saved = await this.journal.save(trade);
    await this.watchlists.save(
      applyWatchlistPatch(item, { status: "OPEN" })
    );
    return saved;
  }
}
