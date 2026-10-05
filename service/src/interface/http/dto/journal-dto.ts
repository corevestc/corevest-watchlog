import { z } from "zod";
import { isoDate, modelHitsSchema } from "./watchlist-dto.js";

const checklistSchema = z.object({
  volConfirm: z.boolean(),
  trendAlign: z.boolean(),
  notChasing: z.boolean(),
  sizeOk: z.boolean()
});

export const journalOpenSchema = z.object({
  watchlistItemId: z.string().uuid(),
  setupType: z.enum(["breakout", "retest", "pullback", "swing", "bounce"]),
  entryPrice: z.number().positive(),
  qty: z.number().int().positive(),
  riskPct: z.number().finite().nullable().optional(),
  stop: z.number().positive(),
  target1: z.number().positive(),
  target2: z.number().positive().nullable().optional(),
  marketDay: z.enum(["RED", "GREEN", "SIDE"]).nullable().optional(),
  marketDayChangePct: z.number().finite().nullable().optional(),
  emotion: z.enum(["calm", "FOMO", "greedy", "anxious"]).nullable().optional(),
  checklist: checklistSchema
});

export const journalExitSchema = z.object({
  exitDate: isoDate,
  exitPrice: z.number().positive(),
  exitReason: z.enum(["target", "stop", "time", "discretionary", "other"]),
  mfePct: z.number().finite().nullable().optional(),
  maePct: z.number().finite().nullable().optional(),
  modelHits: modelHitsSchema,
  violations: z
    .array(
      z.enum([
        "none",
        "moved_stop",
        "oversized",
        "chased",
        "early_exit",
        "late_exit",
        "revenge"
      ])
    )
    .optional(),
  lesson: z.string().nullable().optional(),
  chartFile: z.string().nullable().optional()
});

export type JournalOpenBody = z.infer<typeof journalOpenSchema>;
export type JournalExitBody = z.infer<typeof journalExitSchema>;
