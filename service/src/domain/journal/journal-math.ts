import { DomainError } from "../shared/errors.js";
import type { JournalExitDraft, TradeJournal, ViolationCode } from "./trade-journal.js";

export function isoDateDiffDays(from: string, to: string): number {
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end)) {
    throw new DomainError("invalid date");
  }
  return Math.round((end - start) / 86_400_000);
}

export function computeExitMetrics(trade: TradeJournal, exit: JournalExitDraft) {
  const risk = trade.entryPrice - trade.stop;
  const pnlAmt =
    exit.pnlAmt ?? (exit.exitPrice - trade.entryPrice) * trade.qty;
  const pnlPct =
    exit.pnlPct ??
    ((exit.exitPrice - trade.entryPrice) / trade.entryPrice) * 100;
  const rMultiple =
    exit.rMultiple ?? (risk === 0 ? null : (exit.exitPrice - trade.entryPrice) / risk);
  const daysHeld = exit.daysHeld ?? isoDateDiffDays(trade.entryDate, exit.exitDate);

  return { pnlAmt, pnlPct, rMultiple, daysHeld };
}

export function hasViolations(violations: ViolationCode[]): boolean {
  return violations.some((code) => code !== "none");
}

export function isWinningTrade(trade: TradeJournal): boolean | null {
  if (trade.rMultiple === null) {
    return null;
  }
  return trade.rMultiple > 0;
}
