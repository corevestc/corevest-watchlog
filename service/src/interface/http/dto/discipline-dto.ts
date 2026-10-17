import { z } from "zod";
import { EXIT_REASONS, MINDSETS, TERMS } from "../../../domain/discipline/discipline-trade.js";
import { isoDate } from "./watchlist-dto.js";

export const openDisciplineSchema = z.object({
  watchlistId: z.string().uuid(),
  buyDate: isoDate,
  buyPrice: z.number().finite().positive(),
  qty: z.number().int().positive(),
  checklist: z.object({
    volume: z.boolean(),
    setup: z.boolean(),
    notChasing: z.boolean(),
    size: z.boolean()
  }),
  mindset: z.enum(MINDSETS).optional(),
  target2: z.number().finite().positive().optional(),
  targetDate: isoDate.optional(),
  term: z.enum(TERMS).optional(),
  overrideReason: z.string().trim().max(500).optional()
});

export const moveStopSchema = z.object({
  newStop: z.number().finite().positive()
});

export const closeDisciplineSchema = z.object({
  exitDate: isoDate,
  exitPrice: z.number().finite().positive(),
  exitReason: z.enum(EXIT_REASONS),
  lesson: z.string().trim().max(4000).optional()
});

const percent = z.number().finite().nonnegative();

export const tradingRulesSchema = z.object({
  minRr: z.number().finite().positive(),
  maxRunUpPct: percent,
  riskPerTradePct: percent,
  maxOpenPositions: z.number().int().positive(),
  dailyLossLimitPct: percent,
  cooldownDays: z.number().int().nonnegative(),
  horizonDays: z.number().int().positive(),
  accountCapital: z.number().finite().nonnegative()
});
