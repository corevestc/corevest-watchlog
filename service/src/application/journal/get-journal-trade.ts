import { NotFoundError } from "../../domain/shared/errors.js";
import type { TradeJournal } from "../../domain/journal/trade-journal.js";
import type { JournalStore } from "../ports/journal-store.js";

export class GetJournalTrade {
  constructor(private readonly journal: JournalStore) {}

  async execute(tradeId: string): Promise<TradeJournal> {
    const trade = await this.journal.getByTradeId(tradeId);
    if (!trade) {
      throw new NotFoundError(`Journal trade ${tradeId} not found`);
    }
    return trade;
  }
}
