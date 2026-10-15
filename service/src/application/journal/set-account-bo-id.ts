import { ConflictError, DomainError } from "../../domain/shared/errors.js";
import type { AccountJournalStore } from "../ports/account-journal-store.js";

const BO_ID = /^[A-Za-z0-9]{3,20}$/;

export class SetAccountBoId {
  constructor(private readonly journal: AccountJournalStore) {}

  async execute(userId: string, boId: string): Promise<{ boId: string }> {
    const code = boId.trim().toUpperCase();
    if (!BO_ID.test(code)) {
      throw new DomainError("BO ID must be 3 to 20 letters or digits");
    }
    await this.journal.getBoId(userId);
    try {
      await this.journal.setBoId(userId, code);
    } catch (error) {
      if (error instanceof ConflictError) {
        throw new ConflictError("That BO ID is already on another account");
      }
      throw error;
    }
    return { boId: code };
  }
}
