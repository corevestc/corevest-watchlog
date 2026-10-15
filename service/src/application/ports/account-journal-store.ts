import type { AccountTrade, AccountTradeDraft } from "../../domain/journal/account-trade.js";

export interface AccountTradeFilter {
  entryDate: string | null;
  scrip: string;
}

export interface AccountJournalStore {
  getBoId(userId: string): Promise<string | null>;
  setBoId(userId: string, boId: string): Promise<void>;
  list(userId: string, filter: AccountTradeFilter): Promise<AccountTrade[]>;
  save(userId: string, boId: string, draft: AccountTradeDraft): Promise<AccountTrade>;
}
