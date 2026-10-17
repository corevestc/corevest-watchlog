import type { DisciplineStore } from "../ports/discipline-store.js";
import {
  scoreClose,
  type DisciplineTrade,
  type ExitReason
} from "../../domain/discipline/discipline-trade.js";
import { ConflictError, NotFoundError, UnprocessableError } from "../../domain/shared/errors.js";

export interface CloseDisciplineInput {
  exitDate: string;
  exitPrice: number;
  exitReason: ExitReason;
  lesson?: string;
}

export class CloseDisciplineTrade {
  constructor(private readonly store: DisciplineStore) {}

  execute(userId: string, id: string, input: CloseDisciplineInput): Promise<DisciplineTrade> {
    const lesson = input.lesson?.trim() ?? "";
    return this.store.withTransaction(async (tx) => {
      await tx.lockUser(userId);
      const trade = await tx.getTrade(userId, id);
      if (!trade) {
        throw new NotFoundError("Trade not found");
      }
      if (trade.status !== "OPEN") {
        throw new ConflictError("Trade is already closed");
      }
      if (input.exitDate < trade.entryDate) {
        throw new UnprocessableError("exit_date cannot be before the entry date", [
          { rule: "exit_date", message: "exit_date cannot be before the entry date" }
        ]);
      }
      if ((input.exitReason === "MANUAL" || input.exitReason === "PANIC") && !lesson) {
        throw new UnprocessableError("lesson is required for a MANUAL or PANIC exit", [
          { rule: "lesson", message: "lesson is required for a MANUAL or PANIC exit" }
        ]);
      }
      const scored = scoreClose({
        entryPrice: trade.entryPrice,
        stopInitial: trade.stopInitial,
        stopCurrent: trade.stopCurrent,
        target: trade.target,
        qty: trade.qty,
        entryDate: trade.entryDate,
        exitDate: input.exitDate,
        exitPrice: input.exitPrice,
        exitReason: input.exitReason,
        openViolations: trade.violations
      });
      return tx.saveClose(userId, trade, {
        exitDate: input.exitDate,
        exitPrice: input.exitPrice,
        exitReason: input.exitReason,
        pnlPct: scored.pnlPct,
        pnlAmount: scored.pnlAmount,
        rMultiple: scored.rMultiple,
        daysHeld: scored.daysHeld,
        violations: scored.violations,
        disciplineScore: scored.disciplineScore,
        lesson: lesson || null,
        result: scored.result
      });
    });
  }
}
