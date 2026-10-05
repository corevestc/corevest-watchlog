import type { TradeJournal } from "../../domain/journal/trade-journal.js";
import type { JournalStore } from "../ports/journal-store.js";

export class ListJournalTrades {
  constructor(private readonly journal: JournalStore) {}

  execute(): Promise<TradeJournal[]> {
    return this.journal.list();
  }
}
