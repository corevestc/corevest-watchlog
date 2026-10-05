import { z } from "zod";
import { isoDate } from "./watchlist-dto.js";

export const weeklyReviewCreateSchema = z.object({
  weekStart: isoDate,
  topMistake: z.string().nullable().optional(),
  nextWeekFocus: z.string().nullable().optional()
});

export type WeeklyReviewCreateBody = z.infer<typeof weeklyReviewCreateSchema>;
