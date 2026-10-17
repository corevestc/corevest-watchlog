export const EXIT_REASONS = ["TARGET", "STOP", "TRAIL", "MANUAL", "PANIC"] as const;
export const MINDSETS = ["calm", "confident", "FOMO", "anxious"] as const;
export const TERMS = ["short", "mid", "long"] as const;

export type ExitReason = (typeof EXIT_REASONS)[number];
export type Mindset = (typeof MINDSETS)[number];
export type Term = (typeof TERMS)[number];
export type TradeStatus = "OPEN" | "CLOSED";

export interface DisciplineTrade {
  id: string;
  watchlistId: string;
  symbol: string;
  entryDate: string;
  entryPrice: number;
  qty: number;
  riskAmount: number;
  stopInitial: number;
  stopCurrent: number;
  target: number;
  source: string | null;
  setupType: string | null;
  status: TradeStatus;
  exitDate: string | null;
  exitPrice: number | null;
  exitReason: ExitReason | null;
  pnlPct: number | null;
  pnlAmount: number | null;
  rMultiple: number | null;
  daysHeld: number | null;
  checklistPassed: boolean;
  violations: string[];
  disciplineScore: number | null;
  lesson: string | null;
  referencePrice: number | null;
  referenceDate: string | null;
  mindset: Mindset | null;
  target2: number | null;
  targetDate: string | null;
  term: Term | null;
  createdAt: string;
  updatedAt: string;
}

export interface CloseScoreInput {
  entryPrice: number;
  stopInitial: number;
  stopCurrent: number;
  target: number;
  qty: number;
  entryDate: string;
  exitDate: string;
  exitPrice: number;
  exitReason: ExitReason;
  openViolations: string[];
}

export interface CloseScore {
  pnlPct: number;
  pnlAmount: number;
  rMultiple: number | null;
  daysHeld: number;
  violations: string[];
  disciplineScore: number;
  result: "WIN" | "LOSS";
}

function round4(value: number): number {
  return Math.round(value * 10000) / 10000;
}

function daysBetween(start: string, end: string): number {
  const ms = Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`);
  return Math.round(ms / 86_400_000);
}

/** Long trade closed between the live stop and the target, so neither level was hit. */
function exitedEarly(exitPrice: number, stopCurrent: number, target: number): boolean {
  return exitPrice > stopCurrent && exitPrice < target;
}

export function scoreClose(input: CloseScoreInput): CloseScore {
  const pnlAmount = round4((input.exitPrice - input.entryPrice) * input.qty);
  const pnlPct = round4(((input.exitPrice - input.entryPrice) / input.entryPrice) * 100);
  const riskPerShare = input.entryPrice - input.stopInitial;
  const rMultiple = riskPerShare > 0 ? round4((input.exitPrice - input.entryPrice) / riskPerShare) : null;
  const violations = [...input.openViolations];
  const add = (tag: string) => {
    if (!violations.includes(tag)) {
      violations.push(tag);
    }
  };
  const early = exitedEarly(input.exitPrice, input.stopCurrent, input.target);
  if (input.exitReason === "PANIC") {
    add("PANIC_EXIT");
  }
  if (early) {
    add("EARLY_EXIT");
  }
  if (violations.some((tag) => tag.startsWith("OVERRIDE:"))) {
    add("OVERRIDE_USED");
  }
  const exitPerPlan =
    (input.exitReason === "TARGET" || input.exitReason === "STOP" || input.exitReason === "TRAIL") &&
    !early;
  const passed = [
    true,
    !violations.includes("OVERRIDE:min_rr"),
    !violations.includes("OVERRIDE:position_size"),
    input.stopCurrent + 0.0001 >= input.stopInitial,
    exitPerPlan
  ];
  return {
    pnlPct,
    pnlAmount,
    rMultiple,
    daysHeld: daysBetween(input.entryDate, input.exitDate),
    violations,
    disciplineScore: passed.filter(Boolean).length,
    result: pnlAmount > 0 ? "WIN" : "LOSS"
  };
}

export interface StatsRow {
  status: TradeStatus;
  disciplineScore: number | null;
  pnlAmount: number | null;
  exitDate: string | null;
  violations: string[];
}

export interface DisciplineStats {
  adherencePct: number | null;
  closedTrades: number;
  perfectTrades: number;
  violations: { type: string; count: number }[];
  winRateDisciplined: number | null;
  winRateOverridden: number | null;
  disciplinedClosed: number;
  overriddenClosed: number;
  openPositions: number;
  realizedPnlToday: number;
}

function rate(wins: number, total: number): number | null {
  if (total === 0) {
    return null;
  }
  return Math.round((wins / total) * 1000) / 10;
}

export function summarizeDiscipline(rows: StatsRow[], today: string): DisciplineStats {
  const closed = rows.filter((row) => row.status === "CLOSED");
  const overridden = (row: StatsRow) => row.violations.some((tag) => tag.startsWith("OVERRIDE:"));
  const disciplinedClosed = closed.filter((row) => !overridden(row));
  const overriddenClosed = closed.filter(overridden);
  const wins = (group: StatsRow[]) => group.filter((row) => (row.pnlAmount ?? 0) > 0).length;
  const counts = new Map<string, number>();
  for (const row of rows) {
    for (const tag of row.violations) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  const realizedPnlToday = round4(
    closed
      .filter((row) => row.exitDate === today)
      .reduce((sum, row) => sum + (row.pnlAmount ?? 0), 0)
  );
  return {
    adherencePct: rate(
      closed.filter((row) => row.disciplineScore === 5).length,
      closed.length
    ),
    closedTrades: closed.length,
    perfectTrades: closed.filter((row) => row.disciplineScore === 5).length,
    violations: [...counts.entries()]
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count || a.type.localeCompare(b.type)),
    winRateDisciplined: rate(wins(disciplinedClosed), disciplinedClosed.length),
    winRateOverridden: rate(wins(overriddenClosed), overriddenClosed.length),
    disciplinedClosed: disciplinedClosed.length,
    overriddenClosed: overriddenClosed.length,
    openPositions: rows.filter((row) => row.status === "OPEN").length,
    realizedPnlToday
  };
}
