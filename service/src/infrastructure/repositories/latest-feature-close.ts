import type { QueryResult, QueryResultRow } from "pg";
import { toNumber } from "../database/postgres/map-numeric.js";

/** External feature table. Close column name varies, so pick from this list only. */
const CLOSE_COLUMNS = ["close", "adj_close", "close_price", "last_close", "adjclose"] as const;

interface Queryable {
  query<T extends QueryResultRow = QueryResultRow>(
    sql: string,
    params?: unknown[]
  ): Promise<QueryResult<T>>;
}

let closeColumn: string | null | undefined;

export async function featureCloseColumn(db: Queryable): Promise<string | null> {
  if (closeColumn !== undefined) {
    return closeColumn;
  }
  const result = await db.query<{ column_name: string }>(
    `SELECT column_name
     FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = 'stock_ml_features_daily'`
  );
  const names = new Set(result.rows.map((row) => row.column_name));
  const found = CLOSE_COLUMNS.find((name) => names.has(name));
  closeColumn = names.has("scrip") && names.has("trade_date") && found ? found : null;
  return closeColumn;
}

/** Most recent close for a symbol. Null when the feature table has no close. */
export async function latestFeatureClose(
  db: Queryable,
  symbol: string
): Promise<{ price: number; date: string } | null> {
  const column = await featureCloseColumn(db);
  if (!column) {
    return null;
  }
  const result = await db.query<{ close: unknown; trade_date: string }>(
    `SELECT ${column} AS close, trade_date::text AS trade_date
     FROM public.stock_ml_features_daily
     WHERE upper(scrip) = upper($1)
     ORDER BY trade_date DESC
     LIMIT 1`,
    [symbol]
  );
  const row = result.rows[0];
  const price = toNumber(row?.close);
  if (!row || price === null) {
    return null;
  }
  return { price, date: row.trade_date.slice(0, 10) };
}
