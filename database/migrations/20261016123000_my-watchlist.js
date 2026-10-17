/**
 * Personal watchlist. One row per symbol the signed-in user is tracking.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.createTable("my_watchlist", {
    id: { type: "uuid", primaryKey: true },
    user_id: { type: "uuid", notNull: true },
    symbol: { type: "varchar(50)", notNull: true },
    added_date: { type: "date", notNull: true, default: pgm.func("current_date") },
    source: { type: "varchar(20)", notNull: true },
    setup_type: { type: "varchar(30)" },
    planned_entry: { type: "numeric(12,4)" },
    stop_loss: { type: "numeric(12,4)" },
    target_price: { type: "numeric(12,4)" },
    reason: { type: "text" },
    status: { type: "varchar(20)", notNull: true, default: "WATCHING" },
    result: { type: "varchar(10)", notNull: true, default: "OPEN" },
    notes: { type: "text" },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
    updated_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") }
  });

  pgm.addConstraint("my_watchlist", "my_watchlist_user_id_fkey", {
    foreignKeys: {
      columns: "user_id",
      references: "users(id)"
    }
  });
  pgm.addConstraint("my_watchlist", "my_watchlist_source_check", {
    check: "source IN ('V1', 'V2', 'BO', 'MANUAL')"
  });
  pgm.addConstraint("my_watchlist", "my_watchlist_setup_type_check", {
    check: "setup_type IS NULL OR setup_type IN ('Breakout', 'Retest', 'Bounce', 'Accumulation')"
  });
  pgm.addConstraint("my_watchlist", "my_watchlist_status_check", {
    check: "status IN ('WATCHING', 'ACTIVE', 'CLOSED', 'REMOVED')"
  });
  pgm.addConstraint("my_watchlist", "my_watchlist_result_check", {
    check: "result IN ('WIN', 'LOSS', 'OPEN')"
  });

  pgm.createIndex("my_watchlist", ["status"]);
  pgm.createIndex("my_watchlist", ["source"]);
  pgm.createIndex("my_watchlist", ["added_date"]);
  pgm.createIndex("my_watchlist", ["user_id", "added_date"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropTable("my_watchlist");
};
