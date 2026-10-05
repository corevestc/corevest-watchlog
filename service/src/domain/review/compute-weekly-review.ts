import { hasViolations, isWinningTrade } from "../journal/journal-math.js";
import { anyModelHit, hasModelOutcome } from "../shared/model-hits.js";
import type { TradeJournal } from "../journal/trade-journal.js";
import type { WatchlistItem } from "../watchlist/types.js";

export interface TradeHighlight {
  tradeId: string;
  scrip: string;
  rMultiple: number | null;
  reason: string | null;
}

export interface WeeklyReview {
  id: string;
  weekStart: string;
  weekEnd: string;
  trades: number;
  wins: number;
  winRate: number | null;
  avgWinR: number | null;
  avgLossR: number | null;
  expectancy: number | null;
  adherencePct: number | null;
  winPctByCategory: Record<string, number | null>;
  winPctBySetupType: Record<string, number | null>;
  skippedHitRate: number | null;
  bestTrade: TradeHighlight | null;
  worstTrade: TradeHighlight | null;
  topMistake: string | null;
  nextWeekFocus: string | null;
  summary: string | null;
}

export interface WeeklyReviewNotes {
  topMistake?: string | null;
  nextWeekFocus?: string | null;
}

function mean(values: number[]): number | null {
  if (values.length === 0) {
    return null;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function winRate(rows: TradeJournal[]): number | null {
  const closed = rows.filter((row) => row.rMultiple !== null);
  if (closed.length === 0) {
    return null;
  }
  const wins = closed.filter((row) => isWinningTrade(row) === true).length;
  return (wins / closed.length) * 100;
}

function groupWinPct(
  rows: TradeJournal[],
  keyOf: (row: TradeJournal) => string | null
): Record<string, number | null> {
  const groups = new Map<string, TradeJournal[]>();
  for (const row of rows) {
    const key = keyOf(row);
    if (!key) {
      continue;
    }
    const list = groups.get(key) ?? [];
    list.push(row);
    groups.set(key, list);
  }

  const result: Record<string, number | null> = {};
  for (const [key, list] of groups) {
    result[key] = winRate(list);
  }
  return result;
}

function highlight(row: TradeJournal | undefined): TradeHighlight | null {
  if (!row) {
    return null;
  }
  return {
    tradeId: row.tradeId,
    scrip: row.scrip,
    rMultiple: row.rMultiple,
    reason: row.lesson
  };
}

export function weekEndFromStart(weekStart: string): string {
  const start = new Date(`${weekStart}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() + 6);
  return start.toISOString().slice(0, 10);
}

export function inWeek(date: string, weekStart: string, weekEnd: string): boolean {
  return date >= weekStart && date <= weekEnd;
}

export function computeWeeklyReview(input: {
  id: string;
  weekStart: string;
  trades: TradeJournal[];
  watchlist: WatchlistItem[];
  notes?: WeeklyReviewNotes;
}): WeeklyReview {
  const weekEnd = weekEndFromStart(input.weekStart);
  const trades = input.trades.filter((trade) =>
    inWeek(trade.entryDate, input.weekStart, weekEnd)
  );
  const closed = trades.filter((trade) => trade.rMultiple !== null);
  const wins = closed.filter((trade) => isWinningTrade(trade) === true);
  const losses = closed.filter((trade) => isWinningTrade(trade) === false);
  const winFrac = closed.length === 0 ? null : wins.length / closed.length;
  const lossFrac = closed.length === 0 ? null : losses.length / closed.length;
  const avgWinR = mean(
    wins.map((trade) => trade.rMultiple).filter((value): value is number => value !== null)
  );
  const avgLossR = mean(
    losses
      .map((trade) => Math.abs(trade.rMultiple ?? 0))
      .filter((value) => Number.isFinite(value))
  );
  const expectancy =
    winFrac === null || lossFrac === null || avgWinR === null || avgLossR === null
      ? null
      : winFrac * avgWinR - lossFrac * avgLossR;

  const clean = trades.filter(
    (trade) => trade.violations.length === 0 || !hasViolations(trade.violations)
  );
  const adherencePct =
    trades.length === 0 ? null : (clean.length / trades.length) * 100;

  const ranked = [...closed].sort(
    (a, b) => (b.rMultiple ?? 0) - (a.rMultiple ?? 0)
  );

  const skipped = input.watchlist.filter(
    (row) =>
      row.decision === "SKIP" && inWeek(row.date, input.weekStart, weekEnd)
  );
  const skippedWithOutcome = skipped.filter((row) =>
    hasModelOutcome(row.modelHits)
  );
  const skippedHits = skippedWithOutcome.filter((row) =>
    anyModelHit(row.modelHits)
  );
  const skippedHitRate =
    skippedWithOutcome.length === 0
      ? null
      : (skippedHits.length / skippedWithOutcome.length) * 100;

  const notes = input.notes ?? {};

  return {
    id: input.id,
    weekStart: input.weekStart,
    weekEnd,
    trades: trades.length,
    wins: wins.length,
    winRate: winFrac === null ? null : winFrac * 100,
    avgWinR,
    avgLossR,
    expectancy,
    adherencePct,
    winPctByCategory: groupWinPct(closed, (row) => row.sourceCategory),
    winPctBySetupType: groupWinPct(closed, (row) => row.setupType),
    skippedHitRate,
    bestTrade: highlight(ranked[0]),
    worstTrade: highlight(ranked[ranked.length - 1]),
    topMistake: notes.topMistake ?? null,
    nextWeekFocus: notes.nextWeekFocus ?? null,
    summary: null
  };
}
