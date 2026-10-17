import type {
  ModelSource,
  SavedSnapshot,
  SavedSnapshotWrite,
  SavedSource,
  StockSnapshot,
  SymbolOption,
  SymbolOptionStore
} from "../../application/ports/symbol-option-store.js";
import { toIsoDate, toNumber } from "../database/postgres/map-numeric.js";
import type { PostgresPool } from "../database/postgres/pool.js";

interface CodeRow {
  code: string;
  name: string | null;
  active?: boolean | number | null;
}

/** Latest V1 watchlist first. Remaining codes come from public.stocks. */
export class PostgresSymbolOptionStore implements SymbolOptionStore {
  constructor(private readonly pool: PostgresPool) {}

  async list(): Promise<SymbolOption[]> {
    const model = await this.pool.query<CodeRow>(
      `SELECT DISTINCT ON (upper(w.scrip))
          upper(w.scrip) AS code,
          s.name
       FROM watchlog.ml_watchlist w
       LEFT JOIN public.stocks s ON upper(s.code) = upper(w.scrip)
       WHERE w.source = 'V1'
         AND w.trade_date = (
           SELECT max(trade_date) FROM watchlog.ml_watchlist WHERE source = 'V1'
         )
       ORDER BY upper(w.scrip)`
    );
    const stocks = await this.pool.query<CodeRow>(
      `SELECT upper(code) AS code, name, active
       FROM public.stocks
       ORDER BY upper(code)`
    );
    const seen = new Set<string>();
    const options: SymbolOption[] = [];
    for (const row of model.rows) {
      pushOption(options, seen, row, true);
    }
    for (const row of stocks.rows) {
      if (row.active === false || row.active === 0) {
        continue;
      }
      pushOption(options, seen, row, false);
    }
    return options;
  }

  async snapshot(code: string): Promise<StockSnapshot> {
    const symbol = code.trim().toUpperCase();
    const models = await this.pool.query<{ source: ModelSource }>(
      `SELECT DISTINCT w.source
       FROM watchlog.ml_watchlist w
       WHERE upper(w.scrip) = $1
         AND w.source IN ('V0', 'V1', 'V2')
         AND w.trade_date = (
           SELECT max(trade_date)
           FROM watchlog.ml_watchlist latest
           WHERE latest.source = w.source
         )`,
      [symbol]
    );
    const price = await this.pool.query<{ close: unknown; trade_date: Date | string }>(
      `SELECT close, trade_date
       FROM public.historical_day_data
       WHERE upper(scrip) = $1
       ORDER BY trade_date DESC
       LIMIT 1`,
      [symbol]
    );
    const features = await this.pool.query<{
      rsi14: unknown;
      relative_volume: unknown;
      setup_stage: unknown;
      market_structure: unknown;
      pre_breakout_score: unknown;
    }>(
      `SELECT rsi14, relative_volume, setup_stage, market_structure, pre_breakout_score
       FROM public.stock_ml_features_daily
       WHERE upper(scrip) = $1
       ORDER BY trade_date DESC
       LIMIT 1`,
      [symbol]
    );
    const order: ModelSource[] = ["V0", "V1", "V2"];
    const present = new Set(models.rows.map((row) => row.source));
    const feature = features.rows[0];
    const close = price.rows[0];
    return {
      code: symbol,
      sources: order.filter((item) => present.has(item)),
      selectionPrice: toNumber(close?.close),
      selectionPriceDate: close ? toIsoDate(close.trade_date) : null,
      rsi14: toNumber(feature?.rsi14),
      relativeVolume: toNumber(feature?.relative_volume),
      featureSetupStage: text(feature?.setup_stage),
      marketStructure: text(feature?.market_structure),
      preBreakoutScore: toNumber(feature?.pre_breakout_score)
    };
  }

  async listSaved(userId: string): Promise<SavedSnapshot[]> {
    const result = await this.pool.query<SavedRow>(
      `SELECT id, source, sources, selection_price, selection_price_date, rsi14,
              relative_volume, feature_setup_stage, market_structure, pre_breakout_score
       FROM my_watchlist
       WHERE user_id = $1`,
      [userId]
    );
    return result.rows.map(toSaved);
  }

  async saveSnapshot(userId: string, id: string, snapshot: SavedSnapshotWrite): Promise<boolean> {
    const sources = sourceOrder.filter((item) => snapshot.sources.includes(item));
    const result = await this.pool.query(
      `UPDATE my_watchlist
       SET sources = $3::text[],
           source = $4,
           selection_price = $5,
           selection_price_date = $6::date,
           rsi14 = $7,
           relative_volume = $8,
           feature_setup_stage = $9,
           market_structure = $10,
           pre_breakout_score = $11,
           updated_at = now()
       WHERE user_id = $1 AND id = $2`,
      [
        userId,
        id,
        sources,
        sources[0] ?? "MANUAL",
        snapshot.selectionPrice,
        snapshot.selectionPriceDate,
        snapshot.rsi14,
        snapshot.relativeVolume,
        snapshot.featureSetupStage,
        snapshot.marketStructure,
        snapshot.preBreakoutScore
      ]
    );
    return result.rowCount === 1;
  }
}

const sourceOrder: SavedSource[] = ["V0", "V1", "V2", "BO", "MANUAL"];

interface SavedRow {
  id: string;
  source: SavedSource;
  sources: string[] | null;
  selection_price: unknown;
  selection_price_date: Date | string | null;
  rsi14: unknown;
  relative_volume: unknown;
  feature_setup_stage: string | null;
  market_structure: string | null;
  pre_breakout_score: unknown;
}

function text(value: unknown): string | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return String(value);
}

function toSaved(row: SavedRow): SavedSnapshot {
  const listed = (row.sources ?? []).filter((item): item is SavedSource =>
    sourceOrder.includes(item as SavedSource)
  );
  const sources = listed.length > 0 ? listed : [row.source];
  return {
    id: row.id,
    sources: sourceOrder.filter((item) => sources.includes(item)),
    selectionPrice: toNumber(row.selection_price),
    selectionPriceDate: row.selection_price_date ? toIsoDate(row.selection_price_date) : null,
    rsi14: toNumber(row.rsi14),
    relativeVolume: toNumber(row.relative_volume),
    featureSetupStage: row.feature_setup_stage,
    marketStructure: row.market_structure,
    preBreakoutScore: toNumber(row.pre_breakout_score)
  };
}

function pushOption(options: SymbolOption[], seen: Set<string>, row: CodeRow, fromModel: boolean) {
  const code = row.code.trim().toUpperCase();
  if (code === "" || seen.has(code)) {
    return;
  }
  seen.add(code);
  options.push({ code, name: row.name, fromModel });
}
