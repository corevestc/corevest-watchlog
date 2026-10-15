import type { AccountTrade } from "../../domain/journal/account-trade.js";
import type { AccountJournalStore, AccountTradeFilter } from "../ports/account-journal-store.js";

export class ListAccountTrades {
  constructor(private readonly journal: AccountJournalStore) {}

  async execute(
    userId: string,
    filter: AccountTradeFilter
  ): Promise<{ boId: string | null; trades: AccountTrade[] }> {
    const boId = await this.journal.getBoId(userId);
    if (!boId) {
      return { boId: null, trades: [] };
    }
    const trades = await this.journal.list(userId, filter);
    return { boId, trades };
  }
}
