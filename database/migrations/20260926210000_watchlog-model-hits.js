/**
 * Replace model_hit_5d with model_hits JSON for 3d / 5d / 7d models.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  const empty = pgm.func(`'{"d3":null,"d5":null,"d7":null}'::jsonb`);

  pgm.addColumns("watchlist_items", {
    model_hits: { type: "jsonb", notNull: true, default: empty }
  });
  pgm.addColumns("trade_journal", {
    model_hits: { type: "jsonb", notNull: true, default: empty }
  });

  pgm.sql(`
    UPDATE watchlist_items
    SET model_hits = jsonb_build_object(
      'd3', null,
      'd5', to_jsonb(model_hit_5d),
      'd7', null
    )
    WHERE model_hit_5d IS NOT NULL
  `);
  pgm.sql(`
    UPDATE trade_journal
    SET model_hits = jsonb_build_object(
      'd3', null,
      'd5', to_jsonb(model_hit_5d),
      'd7', null
    )
    WHERE model_hit_5d IS NOT NULL
  `);

  pgm.dropColumns("watchlist_items", ["model_hit_5d"]);
  pgm.dropColumns("trade_journal", ["model_hit_5d"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.addColumns("watchlist_items", {
    model_hit_5d: { type: "boolean" }
  });
  pgm.addColumns("trade_journal", {
    model_hit_5d: { type: "boolean" }
  });

  pgm.sql(`
    UPDATE watchlist_items
    SET model_hit_5d = (model_hits->>'d5')::boolean
    WHERE model_hits ? 'd5' AND model_hits->>'d5' IS NOT NULL
  `);
  pgm.sql(`
    UPDATE trade_journal
    SET model_hit_5d = (model_hits->>'d5')::boolean
    WHERE model_hits ? 'd5' AND model_hits->>'d5' IS NOT NULL
  `);

  pgm.dropColumns("watchlist_items", ["model_hits"]);
  pgm.dropColumns("trade_journal", ["model_hits"]);
};
