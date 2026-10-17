/**
 * Drops fee columns if an earlier draft of the execution-price migration added them.
 * target_2 itself is created by 20261017200000_trade-execution-price.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.sql(`
    ALTER TABLE trades DROP COLUMN IF EXISTS fees;
    ALTER TABLE trades DROP COLUMN IF EXISTS close_fees;
    ALTER TABLE trades ADD COLUMN IF NOT EXISTS target_date date;
    ALTER TABLE trades ADD COLUMN IF NOT EXISTS term varchar(10);
    DO $$ BEGIN
      ALTER TABLE trades ADD CONSTRAINT trades_term_check
        CHECK (term IS NULL OR term IN ('short', 'mid', 'long'));
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `);
};

exports.down = () => {};
