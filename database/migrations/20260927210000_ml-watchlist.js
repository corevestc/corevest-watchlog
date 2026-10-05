/**
 * Multi-model watchlist: every model signal, the human decision, and outcome tracking.
 * Does not alter watchlist_items.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.createTable("ml_watchlist", {
    id: { type: "serial", primaryKey: true },
    trade_date: { type: "date", notNull: true },
    stock_id: { type: "integer", notNull: true },
    scrip: { type: "varchar(50)", notNull: true },
    source: { type: "varchar(20)", notNull: true },
    probability: { type: "numeric" },
    rank_position: { type: "integer" },
    category: { type: "varchar(20)" },
    signal_price: { type: "numeric" },
    setup_stage: { type: "varchar(50)" },
    market_structure: { type: "varchar(50)" },
    sector_id: { type: "integer" },
    extra_metrics: {
      type: "jsonb",
      notNull: true,
      default: pgm.func("'{}'::jsonb")
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    }
  });

  pgm.addConstraint("ml_watchlist", "ml_watchlist_trade_date_stock_id_source_key", {
    unique: ["trade_date", "stock_id", "source"]
  });
  pgm.addConstraint("ml_watchlist", "ml_watchlist_source_check", {
    check: "source IN ('V1', 'V2', 'BO', 'HUMAN')"
  });
  pgm.addConstraint("ml_watchlist", "ml_watchlist_category_check", {
    check: "category IS NULL OR category IN ('PRIME', 'GOOD', 'NEW', 'EXTENDED')"
  });
  pgm.createIndex("ml_watchlist", ["trade_date"]);
  pgm.createIndex("ml_watchlist", ["source"]);
  pgm.createIndex("ml_watchlist", ["trade_date", "source"]);

  pgm.createTable("watchlist_selections", {
    id: { type: "serial", primaryKey: true },
    trade_date: { type: "date", notNull: true },
    stock_id: { type: "integer", notNull: true },
    scrip: { type: "varchar(50)", notNull: true },
    decision: { type: "varchar(20)", notNull: true },
    human_grade: { type: "varchar(5)" },
    decision_reason: { type: "text" },
    planned_entry: { type: "numeric" },
    planned_stop: { type: "numeric" },
    planned_target: { type: "numeric" },
    risk_reward: { type: "numeric" },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    }
  });

  pgm.addConstraint("watchlist_selections", "watchlist_selections_trade_date_stock_id_key", {
    unique: ["trade_date", "stock_id"]
  });
  pgm.addConstraint("watchlist_selections", "watchlist_selections_decision_check", {
    check: "decision IN ('BUY', 'WATCH', 'SKIP')"
  });
  pgm.addConstraint("watchlist_selections", "watchlist_selections_human_grade_check", {
    check: "human_grade IS NULL OR human_grade IN ('A', 'B', 'C')"
  });
  pgm.createIndex("watchlist_selections", ["trade_date"]);

  pgm.createTable("watchlist_outcomes", {
    id: { type: "serial", primaryKey: true },
    trade_date: { type: "date", notNull: true },
    stock_id: { type: "integer", notNull: true },
    scrip: { type: "varchar(50)", notNull: true },
    source: { type: "varchar(20)", notNull: true },
    signal_price: { type: "numeric" },
    target_pct: { type: "numeric" },
    max_return_actual: { type: "numeric" },
    hit_target: { type: "boolean" },
    days_to_hit: { type: "integer" },
    status: { type: "varchar(20)", notNull: true, default: "PENDING" },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    }
  });

  pgm.addConstraint("watchlist_outcomes", "watchlist_outcomes_trade_date_stock_id_source_key", {
    unique: ["trade_date", "stock_id", "source"]
  });
  pgm.addConstraint("watchlist_outcomes", "watchlist_outcomes_source_check", {
    check: "source IN ('V1', 'V2', 'BO', 'HUMAN')"
  });
  pgm.addConstraint("watchlist_outcomes", "watchlist_outcomes_status_check", {
    check: "status IN ('PENDING', 'HIT', 'MISSED', 'EXPIRED')"
  });
  pgm.createIndex("watchlist_outcomes", ["status"]);
  pgm.createIndex("watchlist_outcomes", ["trade_date"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropTable("watchlist_outcomes");
  pgm.dropTable("watchlist_selections");
  pgm.dropTable("ml_watchlist");
};
