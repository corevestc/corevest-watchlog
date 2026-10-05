import type { JournalStore } from "../../application/ports/journal-store.js";
import { formatTradeCode } from "../../domain/journal/trade-code.js";
import type { TradeJournal } from "../../domain/journal/trade-journal.js";
import type { PostgresPool } from "../database/postgres/pool.js";
import { rethrowPg } from "../database/postgres/pg-errors.js";
import { mapJournalRow, type JournalRow } from "./journal-row-map.js";

const COLUMNS = `
  id, trade_id, watchlist_item_id, entry_date, scrip, source_category, prob,
  setup_type, grade, entry_price, qty, risk_pct, stop, target1, target2,
  planned_rr, market_day, market_day_change_pct, emotion, checklist,
  exit_date, exit_price, exit_reason, pnl_pct, pnl_amt, r_multiple,
  days_held, mfe_pct, mae_pct, model_hits, violations, lesson, chart_file
`;

export class PostgresJournalStore implements JournalStore {
  constructor(private readonly pool: PostgresPool) {}

  async list(): Promise<TradeJournal[]> {
    const result = await this.pool.query<JournalRow>(
      `SELECT ${COLUMNS} FROM trade_journal ORDER BY entry_date DESC, trade_id DESC`
    );
    return result.rows.map(mapJournalRow);
  }

  async listBetween(start: string, end: string): Promise<TradeJournal[]> {
    const result = await this.pool.query<JournalRow>(
      `SELECT ${COLUMNS} FROM trade_journal
       WHERE entry_date BETWEEN $1 AND $2
       ORDER BY entry_date, trade_id`,
      [start, end]
    );
    return result.rows.map(mapJournalRow);
  }

  async getByTradeId(tradeId: string): Promise<TradeJournal | null> {
    const result = await this.pool.query<JournalRow>(
      `SELECT ${COLUMNS} FROM trade_journal WHERE trade_id = $1`,
      [tradeId]
    );
    return result.rows[0] ? mapJournalRow(result.rows[0]) : null;
  }

  async getByWatchlistItemId(
    watchlistItemId: string
  ): Promise<TradeJournal | null> {
    const result = await this.pool.query<JournalRow>(
      `SELECT ${COLUMNS} FROM trade_journal WHERE watchlist_item_id = $1`,
      [watchlistItemId]
    );
    return result.rows[0] ? mapJournalRow(result.rows[0]) : null;
  }

  async nextTradeCode(): Promise<string> {
    const result = await this.pool.query<{ n: string }>(
      "SELECT nextval('trade_journal_code_seq') AS n"
    );
    const n = Number(result.rows[0]?.n);
    if (!Number.isFinite(n)) {
      throw new Error("trade_journal_code_seq returned no value");
    }
    return formatTradeCode(n);
  }

  async save(trade: TradeJournal): Promise<TradeJournal> {
    try {
      const result = await this.pool.query<JournalRow>(
        `INSERT INTO trade_journal (
           id, trade_id, watchlist_item_id, entry_date, scrip, source_category,
           prob, setup_type, grade, entry_price, qty, risk_pct, stop, target1,
           target2, planned_rr, market_day, market_day_change_pct, emotion,
           checklist, exit_date, exit_price, exit_reason, pnl_pct, pnl_amt,
           r_multiple, days_held, mfe_pct, mae_pct, model_hits, violations,
           lesson, chart_file, updated_at
         ) VALUES (
           $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,
           $20::jsonb,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30::jsonb,$31,$32,$33, now()
         )
         ON CONFLICT (id) DO UPDATE SET
           trade_id = EXCLUDED.trade_id,
           watchlist_item_id = EXCLUDED.watchlist_item_id,
           entry_date = EXCLUDED.entry_date,
           scrip = EXCLUDED.scrip,
           source_category = EXCLUDED.source_category,
           prob = EXCLUDED.prob,
           setup_type = EXCLUDED.setup_type,
           grade = EXCLUDED.grade,
           entry_price = EXCLUDED.entry_price,
           qty = EXCLUDED.qty,
           risk_pct = EXCLUDED.risk_pct,
           stop = EXCLUDED.stop,
           target1 = EXCLUDED.target1,
           target2 = EXCLUDED.target2,
           planned_rr = EXCLUDED.planned_rr,
           market_day = EXCLUDED.market_day,
           market_day_change_pct = EXCLUDED.market_day_change_pct,
           emotion = EXCLUDED.emotion,
           checklist = EXCLUDED.checklist,
           exit_date = EXCLUDED.exit_date,
           exit_price = EXCLUDED.exit_price,
           exit_reason = EXCLUDED.exit_reason,
           pnl_pct = EXCLUDED.pnl_pct,
           pnl_amt = EXCLUDED.pnl_amt,
           r_multiple = EXCLUDED.r_multiple,
           days_held = EXCLUDED.days_held,
           mfe_pct = EXCLUDED.mfe_pct,
           mae_pct = EXCLUDED.mae_pct,
           model_hits = EXCLUDED.model_hits,
           violations = EXCLUDED.violations,
           lesson = EXCLUDED.lesson,
           chart_file = EXCLUDED.chart_file,
           updated_at = now()
         RETURNING ${COLUMNS}`,
        [
          trade.id,
          trade.tradeId,
          trade.watchlistItemId,
          trade.entryDate,
          trade.scrip,
          trade.sourceCategory,
          trade.prob,
          trade.setupType,
          trade.grade,
          trade.entryPrice,
          trade.qty,
          trade.riskPct,
          trade.stop,
          trade.target1,
          trade.target2,
          trade.plannedRr,
          trade.marketDay,
          trade.marketDayChangePct,
          trade.emotion,
          JSON.stringify(trade.checklist),
          trade.exitDate,
          trade.exitPrice,
          trade.exitReason,
          trade.pnlPct,
          trade.pnlAmt,
          trade.rMultiple,
          trade.daysHeld,
          trade.mfePct,
          trade.maePct,
          JSON.stringify(trade.modelHits),
          trade.violations,
          trade.lesson,
          trade.chartFile
        ]
      );
      if (!result.rows[0]) {
        throw new Error("journal save returned no row");
      }
      return mapJournalRow(result.rows[0]);
    } catch (error) {
      rethrowPg(error);
    }
  }
}
