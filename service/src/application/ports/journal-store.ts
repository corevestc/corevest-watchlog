import type { TradeJournal } from "../../domain/journal/trade-journal.js";

export interface JournalStore {
  list(): Promise<TradeJournal[]>;
  listBetween(start: string, end: string): Promise<TradeJournal[]>;
  getByTradeId(tradeId: string): Promise<TradeJournal | null>;
  getByWatchlistItemId(watchlistItemId: string): Promise<TradeJournal | null>;
  nextTradeCode(): Promise<string>;
  save(trade: TradeJournal): Promise<TradeJournal>;
}
