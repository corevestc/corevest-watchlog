import { z } from "zod";

export const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD");

const nullableNumber = z.number().finite().nullable().optional();

export const modelHitsSchema = z
  .object({
    d3: z.boolean().nullable().optional(),
    d5: z.boolean().nullable().optional(),
    d7: z.boolean().nullable().optional()
  })
  .optional();

export const watchlistCreateSchema = z.object({
  date: isoDate,
  scrip: z.string().min(1).max(32),
  category: z.enum(["PRIME", "GOOD", "NEW", "LIVE"]),
  prob: nullableNumber,
  streak: z.number().int().nullable().optional(),
  runUpPct: nullableNumber,
  close: nullableNumber,
  marketStructure: z.string().nullable().optional(),
  setupStage: z.string().nullable().optional(),
  sectorId: z.number().int().nullable().optional(),
  relativeVolume: nullableNumber,
  grade: z.enum(["A", "B", "C"]).nullable().optional(),
  planEntry: nullableNumber,
  planStop: nullableNumber,
  planTarget: nullableNumber,
  decision: z.enum(["BUY", "WATCH", "SKIP"]).optional(),
  skipReason: z.string().nullable().optional(),
  modelHits: modelHitsSchema
});

export const watchlistPatchSchema = watchlistCreateSchema.partial();

export const watchlistDecisionSchema = z.object({
  decision: z.enum(["BUY", "WATCH", "SKIP"]),
  skipReason: z.string().nullable().optional()
});

export type WatchlistCreateBody = z.infer<typeof watchlistCreateSchema>;
export type WatchlistPatchBody = z.infer<typeof watchlistPatchSchema>;
