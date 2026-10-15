import { z } from "zod";
import { isoDate } from "./watchlist-dto.js";

const money = z.number().positive();
const optionalMoney = money.nullable().optional();

export const boIdSchema = z.object({
  boId: z.string().trim().regex(/^[A-Za-z0-9]{3,20}$/, "BO ID must be 3 to 20 letters or digits")
});

export const accountTradeSchema = z.object({
  entryDate: isoDate,
  scrip: z.string().trim().min(1).max(32),
  qty: z.number().int().positive(),
  entryPrice: money,
  stop: optionalMoney,
  target: optionalMoney,
  exitDate: isoDate.nullable().optional(),
  exitPrice: optionalMoney,
  note: z.string().trim().max(500).nullable().optional()
});
