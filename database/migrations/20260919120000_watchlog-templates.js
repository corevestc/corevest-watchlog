/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.createType("watchlist_category", ["PRIME", "GOOD", "NEW", "LIVE"]);
  pgm.createType("watchlist_grade", ["A", "B", "C"]);
  pgm.createType("watchlist_decision", ["BUY", "WATCH", "SKIP"]);
  pgm.createType("watchlist_status", ["PENDING", "OPEN", "CLOSED"]);
  pgm.createType("setup_type", [
    "breakout",
    "retest",
    "pullback",
    "swing",
    "bounce"
  ]);
  pgm.createType("market_day_tone", ["RED", "GREEN", "SIDE"]);
  pgm.createType("trade_emotion", ["calm", "FOMO", "greedy", "anxious"]);
  pgm.createType("exit_reason", [
    "target",
    "stop",
    "time",
    "discretionary",
    "other"
  ]);

  pgm.createTable("watchlist_items", {
    id: { type: "uuid", primaryKey: true },
    date: { type: "date", notNull: true },
    scrip: { type: "text", notNull: true },
    category: { type: "watchlist_category", notNull: true },
    prob: { type: "numeric(8,4)" },
    streak: { type: "integer" },
    run_up_pct: { type: "numeric(8,4)" },
    close: { type: "numeric(12,4)" },
    market_structure: { type: "text" },
    setup_stage: { type: "text" },
    sector_id: { type: "integer" },
    relative_volume: { type: "numeric(8,4)" },
    my_grade: { type: "watchlist_grade" },
    plan_entry: { type: "numeric(12,4)" },
    plan_stop: { type: "numeric(12,4)" },
    plan_target: { type: "numeric(12,4)" },
    rr: { type: "numeric(8,4)" },
    decision: { type: "watchlist_decision", notNull: true, default: "WATCH" },
    skip_reason: { type: "text" },
    status: { type: "watchlist_status", notNull: true, default: "PENDING" },
    model_hit_5d: { type: "boolean" },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    }
  });

  pgm.addConstraint("watchlist_items", "watchlist_items_date_scrip_key", {
    unique: ["date", "scrip"]
  });
  pgm.createIndex("watchlist_items", ["date"]);
  pgm.createIndex("watchlist_items", ["scrip"]);

  pgm.createSequence("trade_journal_code_seq");

  pgm.createTable("trade_journal", {
    id: { type: "uuid", primaryKey: true },
    trade_id: { type: "text", notNull: true, unique: true },
    watchlist_item_id: { type: "uuid", notNull: true, unique: true },
    entry_date: { type: "date", notNull: true },
    scrip: { type: "text", notNull: true },
    source_category: { type: "text", notNull: true },
    prob: { type: "numeric(8,4)" },
    setup_type: { type: "setup_type", notNull: true },
    grade: { type: "text" },
    entry_price: { type: "numeric(12,4)", notNull: true },
    qty: { type: "integer", notNull: true },
    risk_pct: { type: "numeric(8,4)" },
    stop: { type: "numeric(12,4)", notNull: true },
    target1: { type: "numeric(12,4)", notNull: true },
    target2: { type: "numeric(12,4)" },
    planned_rr: { type: "numeric(8,4)" },
    market_day: { type: "market_day_tone" },
    market_day_change_pct: { type: "numeric(8,4)" },
    emotion: { type: "trade_emotion" },
    checklist: { type: "jsonb", notNull: true },
    exit_date: { type: "date" },
    exit_price: { type: "numeric(12,4)" },
    exit_reason: { type: "exit_reason" },
    pnl_pct: { type: "numeric(8,4)" },
    pnl_amt: { type: "numeric(14,4)" },
    r_multiple: { type: "numeric(8,4)" },
    days_held: { type: "integer" },
    mfe_pct: { type: "numeric(8,4)" },
    mae_pct: { type: "numeric(8,4)" },
    model_hit_5d: { type: "boolean" },
    violations: { type: "text[]", notNull: true, default: pgm.func("'{}'::text[]") },
    lesson: { type: "text" },
    chart_file: { type: "text" },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    }
  });

  pgm.addConstraint("trade_journal", "trade_journal_watchlist_item_id_fkey", {
    foreignKeys: {
      columns: "watchlist_item_id",
      references: "watchlist_items(id)"
    }
  });
  pgm.createIndex("trade_journal", ["entry_date"]);
  pgm.createIndex("trade_journal", ["scrip"]);

  pgm.createTable("weekly_reviews", {
    id: { type: "uuid", primaryKey: true },
    week_start: { type: "date", notNull: true, unique: true },
    week_end: { type: "date", notNull: true },
    trades: { type: "integer", notNull: true, default: 0 },
    wins: { type: "integer", notNull: true, default: 0 },
    win_rate: { type: "numeric(8,4)" },
    avg_win_r: { type: "numeric(8,4)" },
    avg_loss_r: { type: "numeric(8,4)" },
    expectancy: { type: "numeric(8,4)" },
    adherence_pct: { type: "numeric(8,4)" },
    win_pct_by_category: { type: "jsonb", notNull: true, default: pgm.func("'{}'::jsonb") },
    win_pct_by_setup_type: { type: "jsonb", notNull: true, default: pgm.func("'{}'::jsonb") },
    skipped_hit_rate: { type: "numeric(8,4)" },
    best_trade: { type: "jsonb" },
    worst_trade: { type: "jsonb" },
    top_mistake: { type: "text" },
    next_week_focus: { type: "text" },
    summary: { type: "text" },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropTable("weekly_reviews");
  pgm.dropTable("trade_journal");
  pgm.dropSequence("trade_journal_code_seq");
  pgm.dropTable("watchlist_items");
  pgm.dropType("exit_reason");
  pgm.dropType("trade_emotion");
  pgm.dropType("market_day_tone");
  pgm.dropType("setup_type");
  pgm.dropType("watchlist_status");
  pgm.dropType("watchlist_decision");
  pgm.dropType("watchlist_grade");
  pgm.dropType("watchlist_category");
};
