/**
 * BO account id on the user, and trades recorded against that account.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.addColumns("users", {
    bo_id: { type: "text" }
  });
  pgm.addConstraint("users", "users_bo_id_key", { unique: ["bo_id"] });

  pgm.createTable("account_trades", {
    id: { type: "uuid", primaryKey: true },
    user_id: { type: "uuid", notNull: true },
    bo_id: { type: "text", notNull: true },
    entry_date: { type: "date", notNull: true },
    scrip: { type: "text", notNull: true },
    qty: { type: "integer", notNull: true },
    entry_price: { type: "numeric(12,4)", notNull: true },
    stop: { type: "numeric(12,4)" },
    target: { type: "numeric(12,4)" },
    exit_date: { type: "date" },
    exit_price: { type: "numeric(12,4)" },
    note: { type: "text" },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    }
  });

  pgm.addConstraint("account_trades", "account_trades_user_id_fkey", {
    foreignKeys: {
      columns: "user_id",
      references: "users(id)"
    }
  });
  pgm.createIndex("account_trades", ["user_id", "entry_date"]);
  pgm.createIndex("account_trades", ["user_id", "scrip"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropTable("account_trades");
  pgm.dropConstraint("users", "users_bo_id_key");
  pgm.dropColumns("users", ["bo_id"]);
};
