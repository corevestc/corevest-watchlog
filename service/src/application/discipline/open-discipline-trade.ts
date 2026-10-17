import type { DisciplineStore } from "../ports/discipline-store.js";
import { evaluateOpenGates } from "../../domain/discipline/evaluate-gates.js";
import type { DisciplineTrade, Mindset, Term } from "../../domain/discipline/discipline-trade.js";
import { NotFoundError, UnprocessableError } from "../../domain/shared/errors.js";

export interface OpenChecklist {
  volume: boolean;
  setup: boolean;
  notChasing: boolean;
  size: boolean;
}

export interface OpenDisciplineInput {
  watchlistId: string;
  buyDate: string;
  buyPrice: number;
  qty: number;
  checklist: OpenChecklist;
  mindset?: Mindset;
  target2?: number;
  targetDate?: string;
  term?: Term;
  overrideReason?: string;
}

function round4(value: number): number {
  return Math.round(value * 10000) / 10000;
}

export class OpenDisciplineTrade {
  constructor(private readonly store: DisciplineStore) {}

  execute(userId: string, input: OpenDisciplineInput): Promise<DisciplineTrade> {
    const reason = input.overrideReason?.trim() ?? "";
    const checks = [
      input.checklist.volume,
      input.checklist.setup,
      input.checklist.notChasing,
      input.checklist.size
    ];
    return this.store.withTransaction(async (tx) => {
      await tx.lockUser(userId);
      const ctx = await tx.loadOpenContext(userId, input.watchlistId);
      if (!ctx) {
        throw new NotFoundError("Watchlist entry not found");
      }
      const failures = evaluateOpenGates({
        plannedEntry: ctx.plannedEntry,
        stopLoss: ctx.stopLoss,
        targetPrice: ctx.targetPrice,
        buyPrice: input.buyPrice,
        qty: input.qty,
        checklist: checks,
        rules: ctx.rules,
        openCount: ctx.openCount,
        realizedPnlToday: ctx.realizedPnlToday,
        recentLoss: ctx.recentLoss
      });
      const missingPlan = failures.some((gate) => gate.rule === "plan_complete");
      const overridable = failures.filter((gate) => gate.rule !== "plan_complete");
      if (missingPlan || (overridable.length > 0 && !reason)) {
        const detail = failures.map((gate) => `${gate.rule}: ${gate.message}`).join("; ");
        throw new UnprocessableError(`Trade blocked by discipline gates: ${detail}`, failures);
      }
      const entry = ctx.plannedEntry;
      const stop = ctx.stopLoss;
      const target = ctx.targetPrice;
      if (entry === null || stop === null || target === null || !(entry > stop)) {
        throw new UnprocessableError("Trade blocked by discipline gates", failures);
      }
      if (input.target2 !== undefined && !(input.target2 > target)) {
        throw new UnprocessableError("Second target must be above the plan target");
      }
      if (input.targetDate !== undefined && input.targetDate < input.buyDate) {
        throw new UnprocessableError("Target date cannot be before the buy date");
      }
      // Client market price is ignored. The close is read here.
      const reference = await tx.latestClose(ctx.symbol);
      return tx.insertOpen(userId, {
        watchlistId: ctx.watchlistId,
        symbol: ctx.symbol,
        entryDate: input.buyDate,
        entryPrice: input.buyPrice,
        qty: input.qty,
        riskAmount: round4((input.buyPrice - stop) * input.qty),
        stop,
        target,
        source: ctx.source,
        setupType: ctx.setupType,
        checklistPassed: checks.every(Boolean),
        violations: overridable.map((gate) => `OVERRIDE:${gate.rule}`),
        overrides: overridable.map((gate) => ({ rule: gate.rule, reason })),
        referencePrice: reference?.price ?? null,
        referenceDate: reference?.date ?? null,
        mindset: input.mindset ?? null,
        target2: input.target2 ?? null,
        targetDate: input.targetDate ?? null,
        term: input.term ?? null
      });
    });
  }
}
