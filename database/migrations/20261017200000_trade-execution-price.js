/**
 * Market close at buy time and the trader's mindset.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.addColumns("trades", {
    reference_price: { type: "numeric(12,4)" },
    reference_date: { type: "date" },
    mindset: { type: "varchar(10)" },
    target_2: { type: "numeric(12,4)" }
  });
  pgm.addConstraint("trades", "trades_mindset_check", {
    check: "mindset IS NULL OR mindset IN ('calm', 'confident', 'FOMO', 'anxious')"
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropConstraint("trades", "trades_mindset_check");
  pgm.dropColumns("trades", ["reference_price", "reference_date", "mindset", "target_2"]);
};
