import type { DisciplineStore } from "../ports/discipline-store.js";
import type { DisciplineTrade } from "../../domain/discipline/discipline-trade.js";
import { ConflictError, NotFoundError, UnprocessableError } from "../../domain/shared/errors.js";

export class MoveDisciplineStop {
  constructor(private readonly store: DisciplineStore) {}

  execute(userId: string, id: string, newStop: number): Promise<DisciplineTrade> {
    return this.store.withTransaction(async (tx) => {
      await tx.lockUser(userId);
      const trade = await tx.getTrade(userId, id);
      if (!trade) {
        throw new NotFoundError("Trade not found");
      }
      if (trade.status !== "OPEN") {
        throw new ConflictError("Trade is already closed");
      }
      if (newStop < trade.stopCurrent) {
        throw new UnprocessableError("Stop can only move in your favor", [
          {
            rule: "stop_widened",
            message: "new_stop cannot be below stop_current"
          }
        ]);
      }
      const saved = await tx.setStop(userId, id, newStop);
      if (!saved) {
        throw new NotFoundError("Trade not found");
      }
      return saved;
    });
  }
}
