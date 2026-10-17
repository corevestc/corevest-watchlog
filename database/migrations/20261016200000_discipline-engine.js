/**
 * Shared trading rules, gated trades, and logged overrides.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.createTable("trading_rules", {
    id: { type: "smallint", primaryKey: true },
    min_rr: { type: "numeric(8,4)", notNull: true, default: 2 },
    max_run_up_pct: { type: "numeric(8,4)", notNull: true, default: 6 },
    risk_per_trade_pct: { type: "numeric(8,4)", notNull: true, default: 1.5 },
    max_open_positions: { type: "integer", notNull: true, default: 5 },
    daily_loss_limit_pct: { type: "numeric(8,4)", notNull: true, default: 3 },
    cooldown_days: { type: "integer", notNull: true, default: 5 },
    horizon_days: { type: "integer", notNull: true, default: 5 },
    account_capital: { type: "numeric(14,2)", notNull: true, default: 0 },
    updated_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") }
  });
  pgm.addConstraint("trading_rules", "trading_rules_singleton_check", {
    check: "id = 1"
  });

  pgm.createTable("trades", {
    id: { type: "uuid", primaryKey: true },
    user_id: { type: "uuid", notNull: true },
    watchlist_id: { type: "uuid", notNull: true },
    symbol: { type: "varchar(50)", notNull: true },
    entry_date: { type: "date", notNull: true },
    entry_price: { type: "numeric(12,4)", notNull: true },
    qty: { type: "integer", notNull: true },
    risk_amount: { type: "numeric(14,4)", notNull: true },
    stop_initial: { type: "numeric(12,4)", notNull: true },
    stop_current: { type: "numeric(12,4)", notNull: true },
    target: { type: "numeric(12,4)", notNull: true },
    source: { type: "varchar(20)" },
    setup_type: { type: "varchar(30)" },
    status: { type: "varchar(10)", notNull: true, default: "OPEN" },
    exit_date: { type: "date" },
    exit_price: { type: "numeric(12,4)" },
    exit_reason: { type: "varchar(10)" },
    pnl_pct: { type: "numeric(12,4)" },
    pnl_amount: { type: "numeric(14,4)" },
    r_multiple: { type: "numeric(12,4)" },
    days_held: { type: "integer" },
    checklist_passed: { type: "boolean", notNull: true, default: false },
    violations: { type: "jsonb", notNull: true, default: pgm.func("'[]'::jsonb") },
    discipline_score: { type: "integer" },
    lesson: { type: "text" },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
    updated_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") }
  });
  pgm.addConstraint("trades", "trades_user_id_fkey", {
    foreignKeys: { columns: "user_id", references: "users(id)" }
  });
  pgm.addConstraint("trades", "trades_watchlist_id_fkey", {
    foreignKeys: { columns: "watchlist_id", references: "my_watchlist(id)" }
  });
  pgm.addConstraint("trades", "trades_status_check", {
    check: "status IN ('OPEN', 'CLOSED')"
  });
  pgm.addConstraint("trades", "trades_exit_reason_check", {
    check: "exit_reason IS NULL OR exit_reason IN ('TARGET', 'STOP', 'TRAIL', 'MANUAL', 'PANIC')"
  });
  pgm.addConstraint("trades", "trades_discipline_score_check", {
    check: "discipline_score IS NULL OR (discipline_score >= 0 AND discipline_score <= 5)"
  });
  pgm.createIndex("trades", ["user_id", "status"]);
  pgm.createIndex("trades", ["user_id", "symbol"]);
  pgm.createIndex("trades", ["watchlist_id"]);

  pgm.createTable("rule_overrides", {
    id: { type: "uuid", primaryKey: true },
    trade_id: { type: "uuid", notNull: true },
    rule_name: { type: "varchar(40)", notNull: true },
    reason: { type: "text", notNull: true },
    user_id: { type: "uuid", notNull: true },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") }
  });
  pgm.addConstraint("rule_overrides", "rule_overrides_trade_id_fkey", {
    foreignKeys: { columns: "trade_id", references: "trades(id)" }
  });
  pgm.addConstraint("rule_overrides", "rule_overrides_user_id_fkey", {
    foreignKeys: { columns: "user_id", references: "users(id)" }
  });
  pgm.createIndex("rule_overrides", ["trade_id"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropTable("rule_overrides");
  pgm.dropTable("trades");
  pgm.dropTable("trading_rules");
};
