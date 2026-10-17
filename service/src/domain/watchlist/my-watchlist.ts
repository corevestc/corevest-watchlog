import { UnprocessableError } from "../shared/errors.js";

export const MY_WATCHLIST_SOURCES = ["V1", "V2", "BO", "MANUAL"] as const;
export const MY_WATCHLIST_SETUPS = ["Breakout", "Retest", "Bounce", "Accumulation"] as const;
export const MY_WATCHLIST_STATUSES = ["WATCHING", "ACTIVE", "CLOSED", "REMOVED"] as const;
export const MY_WATCHLIST_RESULTS = ["WIN", "LOSS", "OPEN"] as const;

export type MyWatchlistSource = (typeof MY_WATCHLIST_SOURCES)[number];
export type MyWatchlistSetup = (typeof MY_WATCHLIST_SETUPS)[number];
export type MyWatchlistStatus = (typeof MY_WATCHLIST_STATUSES)[number];
export type MyWatchlistResult = (typeof MY_WATCHLIST_RESULTS)[number];

export interface MyWatchlistEntry {
  id: string;
  symbol: string;
  addedDate: string;
  source: MyWatchlistSource;
  setupType: MyWatchlistSetup | null;
  plannedEntry: number | null;
  stopLoss: number | null;
  targetPrice: number | null;
  reason: string | null;
  status: MyWatchlistStatus;
  result: MyWatchlistResult;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  rewardRisk: number | null;
  latestClose: number | null;
  latestCloseDate: string | null;
}

export interface MyWatchlistPatch {
  symbol?: string;
  addedDate?: string;
  source?: MyWatchlistSource;
  setupType?: MyWatchlistSetup | null;
  plannedEntry?: number | null;
  stopLoss?: number | null;
  targetPrice?: number | null;
  reason?: string | null;
  status?: MyWatchlistStatus;
  result?: MyWatchlistResult;
  notes?: string | null;
}

export interface MyWatchlistDraft {
  symbol: string;
  addedDate: string | null;
  source: MyWatchlistSource;
  setupType: MyWatchlistSetup | null;
  plannedEntry: number | null;
  stopLoss: number | null;
  targetPrice: number | null;
  reason: string | null;
  status: MyWatchlistStatus;
  result: MyWatchlistResult;
  notes: string | null;
}

/** Not stored. Null unless entry is above the stop and a target exists. */
export function rewardRisk(
  plannedEntry: number | null,
  stopLoss: number | null,
  targetPrice: number | null
): number | null {
  if (
    plannedEntry === null ||
    stopLoss === null ||
    targetPrice === null ||
    !(plannedEntry > stopLoss)
  ) {
    return null;
  }
  const value = (targetPrice - plannedEntry) / (plannedEntry - stopLoss);
  return Math.round(value * 10000) / 10000;
}

export function assertStopBelowEntry(
  plannedEntry: number | null,
  stopLoss: number | null
): void {
  if (plannedEntry !== null && stopLoss !== null && stopLoss >= plannedEntry) {
    throw new UnprocessableError("stop_loss must be below planned_entry");
  }
}
