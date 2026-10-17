import { randomUUID } from "node:crypto";
import type { PoolClient } from "pg";
import type {
  CloseTradeWrite,
  DisciplineDesk,
  DisciplineStore,
  DisciplineTx,
  OpenContext,
  OpenTradeWrite
} from "../../application/ports/discipline-store.js";
import {
  MINDSETS,
  TERMS,
  type DisciplineTrade,
  type ExitReason,
  type Mindset,
  type StatsRow,
  type Term,
  type TradeStatus
} from "../../domain/discipline/discipline-trade.js";
import type { TradingRules } from "../../domain/discipline/trading-rules.js";
import { toInt, toIsoDate, toNumber } from "../database/postgres/map-numeric.js";
import type { PostgresPool } from "../database/postgres/pool.js";
import { rethrowPg } from "../database/postgres/pg-errors.js";
import { latestFeatureClose } from "./latest-feature-close.js";

const tradeColumns = `id, watchlist_id, symbol, entry_date, entry_price, qty, risk_amount,
  stop_initial, stop_current, target, source, setup_type, status, exit_date, exit_price,
  exit_reason, pnl_pct, pnl_amount, r_multiple, days_held, checklist_passed, violations,
  discipline_score, lesson, reference_price, reference_date, mindset, target_2,
  target_date, term,
  created_at, updated_at`;

interface TradeRow {
  id: string;
  watchlist_id: string;
  symbol: string;
  entry_date: Date | string;
  entry_price: unknown;
  qty: unknown;
  risk_amount: unknown;
  stop_initial: unknown;
  stop_current: unknown;
  target: unknown;
  source: string | null;
  setup_type: string | null;
  status: TradeStatus;
  exit_date: Date | string | null;
  exit_price: unknown;
  exit_reason: ExitReason | null;
  pnl_pct: unknown;
  pnl_amount: unknown;
  r_multiple: unknown;
  days_held: unknown;
  checklist_passed: boolean;
  violations: unknown;
  discipline_score: unknown;
  lesson: string | null;
  reference_price: unknown;
  reference_date: Date | string | null;
  mindset: string | null;
  target_2: unknown;
  target_date: Date | string | null;
  term: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

interface RulesRow {
  min_rr: unknown;
  max_run_up_pct: unknown;
  risk_per_trade_pct: unknown;
  max_open_positions: unknown;
  daily_loss_limit_pct: unknown;
  cooldown_days: unknown;
  horizon_days: unknown;
  account_capital: unknown;
}

function asViolations(value: unknown): string[] {
  const list = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? (JSON.parse(value) as unknown)
      : [];
  return Array.isArray(list) ? list.filter((item): item is string => typeof item === "string") : [];
}

function stamp(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function asMindset(value: string | null): Mindset | null {
  return MINDSETS.find((item) => item === value) ?? null;
}

function asTerm(value: string | null): Term | null {
  return TERMS.find((item) => item === value) ?? null;
}

function toTrade(row: TradeRow): DisciplineTrade {
  return {
    id: row.id,
    watchlistId: row.watchlist_id,
    symbol: row.symbol,
    entryDate: toIsoDate(row.entry_date),
    entryPrice: toNumber(row.entry_price) ?? 0,
    qty: toInt(row.qty) ?? 0,
    riskAmount: toNumber(row.risk_amount) ?? 0,
    stopInitial: toNumber(row.stop_initial) ?? 0,
    stopCurrent: toNumber(row.stop_current) ?? 0,
    target: toNumber(row.target) ?? 0,
    source: row.source,
    setupType: row.setup_type,
    status: row.status,
    exitDate: row.exit_date === null ? null : toIsoDate(row.exit_date),
    exitPrice: toNumber(row.exit_price),
    exitReason: row.exit_reason,
    pnlPct: toNumber(row.pnl_pct),
    pnlAmount: toNumber(row.pnl_amount),
    rMultiple: toNumber(row.r_multiple),
    daysHeld: toInt(row.days_held),
    checklistPassed: row.checklist_passed,
    violations: asViolations(row.violations),
    disciplineScore: toInt(row.discipline_score),
    lesson: row.lesson,
    referencePrice: toNumber(row.reference_price),
    referenceDate: row.reference_date === null ? null : toIsoDate(row.reference_date),
    mindset: asMindset(row.mindset),
    target2: toNumber(row.target_2),
    targetDate: row.target_date === null ? null : toIsoDate(row.target_date),
    term: asTerm(row.term),
    createdAt: stamp(row.created_at),
    updatedAt: stamp(row.updated_at)
  };
}

function toRules(row: RulesRow): TradingRules {
  return {
    minRr: toNumber(row.min_rr) ?? 2,
    maxRunUpPct: toNumber(row.max_run_up_pct) ?? 6,
    riskPerTradePct: toNumber(row.risk_per_trade_pct) ?? 1.5,
    maxOpenPositions: toInt(row.max_open_positions) ?? 5,
    dailyLossLimitPct: toNumber(row.daily_loss_limit_pct) ?? 3,
    cooldownDays: toInt(row.cooldown_days) ?? 5,
    horizonDays: toInt(row.horizon_days) ?? 5,
    accountCapital: toNumber(row.account_capital) ?? 0
  };
}

async function ensureRules(client: PoolClient | PostgresPool): Promise<TradingRules> {
  await client.query("INSERT INTO trading_rules (id) VALUES (1) ON CONFLICT (id) DO NOTHING");
  const result = await client.query<RulesRow>(
    `SELECT min_rr, max_run_up_pct, risk_per_trade_pct, max_open_positions,
            daily_loss_limit_pct, cooldown_days, horizon_days, account_capital
     FROM trading_rules WHERE id = 1`
  );
  const row = result.rows[0];
  if (!row) {
    throw new Error("trading_rules row is missing");
  }
  return toRules(row);
}

class PgDisciplineTx implements DisciplineTx {
  constructor(private readonly client: PoolClient) {}

  async lockUser(userId: string): Promise<void> {
    await this.client.query("SELECT pg_advisory_xact_lock(hashtext($1::text))", [userId]);
  }

  async loadOpenContext(userId: string, watchlistId: string): Promise<OpenContext | null> {
    const watch = await this.client.query<{
      id: string;
      symbol: string;
      source: string | null;
      setup_type: string | null;
      planned_entry: unknown;
      stop_loss: unknown;
      target_price: unknown;
    }>(
      `SELECT id, symbol, source, setup_type, planned_entry, stop_loss, target_price
       FROM my_watchlist WHERE id = $1 AND user_id = $2 FOR UPDATE`,
      [watchlistId, userId]
    );
    const row = watch.rows[0];
    if (!row) {
      return null;
    }
    const rules = await ensureRules(this.client);
    const open = await this.client.query<{ n: number }>(
      "SELECT COUNT(*)::int AS n FROM trades WHERE user_id = $1 AND status = 'OPEN'",
      [userId]
    );
    const pnl = await this.client.query<{ pnl: unknown }>(
      `SELECT COALESCE(SUM(pnl_amount), 0) AS pnl
       FROM trades
       WHERE user_id = $1 AND status = 'CLOSED' AND exit_date = CURRENT_DATE`,
      [userId]
    );
    const loss = await this.client.query<{ recent: boolean }>(
      `SELECT EXISTS (
         SELECT 1 FROM trades
         WHERE user_id = $1 AND symbol = $2 AND status = 'CLOSED'
           AND pnl_amount < 0
           AND exit_date >= CURRENT_DATE - $3::int
       ) AS recent`,
      [userId, row.symbol, rules.cooldownDays]
    );
    return {
      watchlistId: row.id,
      symbol: row.symbol,
      source: row.source,
      setupType: row.setup_type,
      plannedEntry: toNumber(row.planned_entry),
      stopLoss: toNumber(row.stop_loss),
      targetPrice: toNumber(row.target_price),
      rules,
      openCount: open.rows[0]?.n ?? 0,
      realizedPnlToday: toNumber(pnl.rows[0]?.pnl) ?? 0,
      recentLoss: loss.rows[0]?.recent ?? false
    };
  }

  latestClose(symbol: string): Promise<{ price: number; date: string } | null> {
    return latestFeatureClose(this.client, symbol);
  }

  async insertOpen(userId: string, draft: OpenTradeWrite): Promise<DisciplineTrade> {
    const id = randomUUID();
    try {
      const inserted = await this.client.query<TradeRow>(
        `INSERT INTO trades (
           id, user_id, watchlist_id, symbol, entry_date, entry_price, qty, risk_amount,
           stop_initial, stop_current, target, source, setup_type, checklist_passed, violations,
           reference_price, reference_date, mindset, target_2, target_date, term
         ) VALUES (
           $1, $2, $3, $4, $5::date, $6, $7, $8,
           $9, $9, $10, $11, $12, $13, $14::jsonb,
           $15, $16::date, $17, $18, $19::date, $20
         )
         RETURNING ${tradeColumns}`,
        [
          id,
          userId,
          draft.watchlistId,
          draft.symbol,
          draft.entryDate,
          draft.entryPrice,
          draft.qty,
          draft.riskAmount,
          draft.stop,
          draft.target,
          draft.source,
          draft.setupType,
          draft.checklistPassed,
          JSON.stringify(draft.violations),
          draft.referencePrice,
          draft.referenceDate,
          draft.mindset,
          draft.target2,
          draft.targetDate,
          draft.term
        ]
      );
      for (const override of draft.overrides) {
        await this.client.query(
          `INSERT INTO rule_overrides (id, trade_id, rule_name, reason, user_id)
           VALUES ($1, $2, $3, $4, $5)`,
          [randomUUID(), id, override.rule, override.reason, userId]
        );
      }
      await this.client.query(
        `UPDATE my_watchlist SET status = 'ACTIVE', updated_at = now()
         WHERE id = $1 AND user_id = $2`,
        [draft.watchlistId, userId]
      );
      const row = inserted.rows[0];
      if (!row) {
        throw new Error("trade insert returned no row");
      }
      return toTrade(row);
    } catch (error) {
      rethrowPg(error);
    }
  }

  async getTrade(userId: string, id: string): Promise<DisciplineTrade | null> {
    const result = await this.client.query<TradeRow>(
      `SELECT ${tradeColumns} FROM trades WHERE id = $1 AND user_id = $2 FOR UPDATE`,
      [id, userId]
    );
    const row = result.rows[0];
    return row ? toTrade(row) : null;
  }

  async setStop(userId: string, id: string, newStop: number): Promise<DisciplineTrade | null> {
    const result = await this.client.query<TradeRow>(
      `UPDATE trades
       SET stop_current = $3, updated_at = now()
       WHERE id = $1 AND user_id = $2 AND status = 'OPEN'
       RETURNING ${tradeColumns}`,
      [id, userId, newStop]
    );
    const row = result.rows[0];
    return row ? toTrade(row) : null;
  }

  async saveClose(
    userId: string,
    trade: DisciplineTrade,
    close: CloseTradeWrite
  ): Promise<DisciplineTrade> {
    const result = await this.client.query<TradeRow>(
      `UPDATE trades
       SET status = 'CLOSED',
           exit_date = $3,
           exit_price = $4,
           exit_reason = $5,
           pnl_pct = $6,
           pnl_amount = $7,
           r_multiple = $8,
           days_held = $9,
           violations = $10::jsonb,
           discipline_score = $11,
           lesson = $12,
           updated_at = now()
       WHERE id = $1 AND user_id = $2 AND status = 'OPEN'
       RETURNING ${tradeColumns}`,
      [
        trade.id,
        userId,
        close.exitDate,
        close.exitPrice,
        close.exitReason,
        close.pnlPct,
        close.pnlAmount,
        close.rMultiple,
        close.daysHeld,
        JSON.stringify(close.violations),
        close.disciplineScore,
        close.lesson
      ]
    );
    await this.client.query(
      `UPDATE my_watchlist
       SET status = 'CLOSED', result = $3, updated_at = now()
       WHERE id = $1 AND user_id = $2`,
      [trade.watchlistId, userId, close.result]
    );
    const row = result.rows[0];
    if (!row) {
      throw new Error("trade close returned no row");
    }
    return toTrade(row);
  }
}

export class PostgresDisciplineStore implements DisciplineStore {
  constructor(private readonly pool: PostgresPool) {}

  async withTransaction<T>(work: (tx: DisciplineTx) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const result = await work(new PgDisciplineTx(client));
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  getRules(): Promise<TradingRules> {
    return ensureRules(this.pool);
  }

  async saveRules(rules: TradingRules): Promise<TradingRules> {
    await ensureRules(this.pool);
    const result = await this.pool.query<RulesRow>(
      `UPDATE trading_rules
       SET min_rr = $1,
           max_run_up_pct = $2,
           risk_per_trade_pct = $3,
           max_open_positions = $4,
           daily_loss_limit_pct = $5,
           cooldown_days = $6,
           horizon_days = $7,
           account_capital = $8,
           updated_at = now()
       WHERE id = 1
       RETURNING min_rr, max_run_up_pct, risk_per_trade_pct, max_open_positions,
                 daily_loss_limit_pct, cooldown_days, horizon_days, account_capital`,
      [
        rules.minRr,
        rules.maxRunUpPct,
        rules.riskPerTradePct,
        rules.maxOpenPositions,
        rules.dailyLossLimitPct,
        rules.cooldownDays,
        rules.horizonDays,
        rules.accountCapital
      ]
    );
    const row = result.rows[0];
    if (!row) {
      throw new Error("trading_rules update returned no row");
    }
    return toRules(row);
  }

  async listForStats(userId: string): Promise<{ today: string; rows: StatsRow[] }> {
    const today = await this.pool.query<{ today: string }>("SELECT CURRENT_DATE::text AS today");
    const result = await this.pool.query<{
      status: TradeStatus;
      discipline_score: unknown;
      pnl_amount: unknown;
      exit_date: string | null;
      violations: unknown;
    }>(
      `SELECT status, discipline_score, pnl_amount, exit_date::text AS exit_date, violations
       FROM trades WHERE user_id = $1`,
      [userId]
    );
    return {
      today: today.rows[0]?.today.slice(0, 10) ?? "",
      rows: result.rows.map((row) => ({
        status: row.status,
        disciplineScore: toInt(row.discipline_score),
        pnlAmount: toNumber(row.pnl_amount),
        exitDate: row.exit_date === null ? null : row.exit_date.slice(0, 10),
        violations: asViolations(row.violations)
      }))
    };
  }

  async desk(userId: string): Promise<DisciplineDesk> {
    const rules = await this.getRules();
    const open = await this.pool.query<TradeRow>(
      `SELECT ${tradeColumns}
       FROM trades
       WHERE user_id = $1 AND status = 'OPEN'
       ORDER BY entry_date DESC, created_at DESC`,
      [userId]
    );
    const losses = await this.pool.query<{ symbol: string }>(
      `SELECT DISTINCT symbol
       FROM trades
       WHERE user_id = $1 AND status = 'CLOSED' AND pnl_amount < 0
         AND exit_date >= CURRENT_DATE - $2::int`,
      [userId, rules.cooldownDays]
    );
    const week = await this.pool.query<{ violations: unknown }>(
      `SELECT violations FROM trades
       WHERE user_id = $1 AND updated_at >= CURRENT_DATE - 6`,
      [userId]
    );
    const violationsThisWeek = week.rows.reduce(
      (sum, row) => sum + asViolations(row.violations).length,
      0
    );
    return {
      openTrades: open.rows.map(toTrade),
      cooldownSymbols: losses.rows.map((row) => row.symbol),
      violationsThisWeek
    };
  }
}
