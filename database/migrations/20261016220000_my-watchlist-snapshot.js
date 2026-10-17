/**
 * Several model sources, the close at selection, and a few daily features.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.addColumns("my_watchlist", {
    sources: { type: "text[]", notNull: true, default: pgm.func("'{}'::text[]") },
    selection_price: { type: "numeric(12,4)" },
    selection_price_date: { type: "date" },
    rsi14: { type: "numeric(8,2)" },
    relative_volume: { type: "numeric(12,4)" },
    feature_setup_stage: { type: "varchar(80)" },
    market_structure: { type: "varchar(80)" },
    pre_breakout_score: { type: "numeric(8,2)" }
  });
  pgm.sql(`
    UPDATE my_watchlist
    SET sources = ARRAY[source]::text[]
    WHERE cardinality(sources) = 0
  `);
  pgm.dropConstraint("my_watchlist", "my_watchlist_source_check");
  pgm.addConstraint("my_watchlist", "my_watchlist_source_check", {
    check: "source IN ('V0', 'V1', 'V2', 'BO', 'MANUAL')"
  });
  pgm.addConstraint("my_watchlist", "my_watchlist_sources_check", {
    check: "sources <@ ARRAY['V0','V1','V2','BO','MANUAL']::text[]"
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropConstraint("my_watchlist", "my_watchlist_sources_check");
  pgm.dropConstraint("my_watchlist", "my_watchlist_source_check");
  pgm.addConstraint("my_watchlist", "my_watchlist_source_check", {
    check: "source IN ('V1', 'V2', 'BO', 'MANUAL')"
  });
  pgm.dropColumns("my_watchlist", [
    "sources",
    "selection_price",
    "selection_price_date",
    "rsi14",
    "relative_volume",
    "feature_setup_stage",
    "market_structure",
    "pre_breakout_score"
  ]);
};
