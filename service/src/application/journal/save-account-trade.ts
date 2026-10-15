import { DomainError } from "../../domain/shared/errors.js";
import type { AccountTrade, AccountTradeDraft } from "../../domain/journal/account-trade.js";
import type { AccountJournalStore } from "../ports/account-journal-store.js";

export class SaveAccountTrade {
  constructor(private readonly journal: AccountJournalStore) {}

  async execute(userId: string, draft: AccountTradeDraft): Promise<AccountTrade> {
    const boId = await this.journal.getBoId(userId);
    if (!boId) {
      throw new DomainError("Set a BO ID before adding a trade");
    }
    const exitDate = draft.exitDate ?? null;
    const exitPrice = draft.exitPrice ?? null;
    if ((exitDate === null) !== (exitPrice === null)) {
      throw new DomainError("Exit date and exit price are saved together");
    }
    return this.journal.save(userId, boId, {
      ...draft,
      scrip: draft.scrip.trim().toUpperCase(),
      exitDate,
      exitPrice,
      note: draft.note?.trim() ? draft.note.trim() : null
    });
  }
}
