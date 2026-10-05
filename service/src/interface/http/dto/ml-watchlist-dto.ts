import { z } from "zod";
import { isoDate } from "./watchlist-dto.js";

const nullableNumber = z.number().finite().nullable().optional();
const nullableText = z.string().nullable().optional();
const categorySchema = z.enum(["PRIME", "GOOD", "NEW", "EXTENDED"]).nullable().optional();
const extraSchema = z.record(z.string(), z.unknown()).nullable().optional();

export const signalSourceSchema = z.enum(["V1", "V2", "BO", "HUMAN"]);

const signalFields = {
  scrip: z.string().min(1).max(50),
  probability: nullableNumber,
  category: categorySchema
};

const camelSignalSchema = z.object({
  ...signalFields,
  stockId: z.number().int(),
  rankPosition: z.number().int().nullable().optional(),
  signalPrice: nullableNumber,
  setupStage: z.string().max(50).nullable().optional(),
  marketStructure: z.string().max(50).nullable().optional(),
  sectorId: z.number().int().nullable().optional(),
  extraMetrics: extraSchema
});

const snakeSignalSchema = z
  .object({
    ...signalFields,
    stock_id: z.number().int(),
    rank_position: z.number().int().nullable().optional(),
    signal_price: nullableNumber,
    setup_stage: z.string().max(50).nullable().optional(),
    market_structure: z.string().max(50).nullable().optional(),
    sector_id: z.number().int().nullable().optional(),
    extra_metrics: extraSchema
  })
  .transform((signal) => ({
    stockId: signal.stock_id,
    scrip: signal.scrip,
    probability: signal.probability ?? null,
    rankPosition: signal.rank_position ?? null,
    category: signal.category ?? null,
    signalPrice: signal.signal_price ?? null,
    setupStage: signal.setup_stage ?? null,
    marketStructure: signal.market_structure ?? null,
    sectorId: signal.sector_id ?? null,
    extraMetrics: signal.extra_metrics ?? null
  }));

const normalizedSignalSchema = z.union([
  camelSignalSchema.transform((signal) => ({
    stockId: signal.stockId,
    scrip: signal.scrip,
    probability: signal.probability ?? null,
    rankPosition: signal.rankPosition ?? null,
    category: signal.category ?? null,
    signalPrice: signal.signalPrice ?? null,
    setupStage: signal.setupStage ?? null,
    marketStructure: signal.marketStructure ?? null,
    sectorId: signal.sectorId ?? null,
    extraMetrics: signal.extraMetrics ?? null
  })),
  snakeSignalSchema
]);

export const saveSignalsSchema = z.union([
  z.object({
    tradeDate: isoDate,
    source: signalSourceSchema,
    signals: z.array(normalizedSignalSchema)
  }),
  z
    .object({
      trade_date: isoDate,
      source: signalSourceSchema,
      signals: z.array(normalizedSignalSchema)
    })
    .transform((body) => ({
      tradeDate: body.trade_date,
      source: body.source,
      signals: body.signals
    }))
]);

const selectionFields = {
  scrip: z.string().min(1).max(50),
  decision: z.enum(["BUY", "WATCH", "SKIP"]),
  humanGrade: z.enum(["A", "B", "C"]).nullable().optional(),
  decisionReason: nullableText,
  plannedEntry: nullableNumber,
  plannedStop: nullableNumber,
  plannedTarget: nullableNumber
};

export const selectionSchema = z.union([
  z.object({
    tradeDate: isoDate,
    stockId: z.number().int(),
    ...selectionFields
  }),
  z
    .object({
      trade_date: isoDate,
      stock_id: z.number().int(),
      scrip: z.string().min(1).max(50),
      decision: z.enum(["BUY", "WATCH", "SKIP"]),
      human_grade: z.enum(["A", "B", "C"]).nullable().optional(),
      decision_reason: nullableText,
      planned_entry: nullableNumber,
      planned_stop: nullableNumber,
      planned_target: nullableNumber
    })
    .transform((body) => ({
      tradeDate: body.trade_date,
      stockId: body.stock_id,
      scrip: body.scrip,
      decision: body.decision,
      humanGrade: body.human_grade ?? null,
      decisionReason: body.decision_reason ?? null,
      plannedEntry: body.planned_entry ?? null,
      plannedStop: body.planned_stop ?? null,
      plannedTarget: body.planned_target ?? null
    }))
]);
