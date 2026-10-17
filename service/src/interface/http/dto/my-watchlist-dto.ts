import { z } from "zod";
import {
  MY_WATCHLIST_RESULTS,
  MY_WATCHLIST_SETUPS,
  MY_WATCHLIST_SOURCES,
  MY_WATCHLIST_STATUSES
} from "../../../domain/watchlist/my-watchlist.js";
import { isoDate } from "./watchlist-dto.js";

const price = z.number().finite().nullable().optional();
const note = z.string().trim().max(4000).nullable().optional();

export const myWatchlistCreateSchema = z.object({
  symbol: z.string().trim().min(1).max(50),
  addedDate: isoDate.optional(),
  source: z.enum(MY_WATCHLIST_SOURCES),
  setupType: z.enum(MY_WATCHLIST_SETUPS).nullable().optional(),
  plannedEntry: price,
  stopLoss: price,
  targetPrice: price,
  reason: note,
  status: z.enum(MY_WATCHLIST_STATUSES).optional(),
  result: z.enum(MY_WATCHLIST_RESULTS).optional(),
  notes: note
});

export const myWatchlistUpdateSchema = myWatchlistCreateSchema.partial();

export const myWatchlistFilterSchema = z.object({
  status: z.enum(MY_WATCHLIST_STATUSES).optional(),
  source: z.enum(MY_WATCHLIST_SOURCES).optional(),
  result: z.enum(MY_WATCHLIST_RESULTS).optional()
});

export function blankText(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : null;
}
