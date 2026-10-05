/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.createType("auth_provider", ["local", "google", "github"]);

  pgm.createTable("users", {
    id: { type: "uuid", primaryKey: true },
    email: { type: "text", notNull: true, unique: true },
    password_hash: { type: "text" },
    provider: { type: "auth_provider", notNull: true, default: "local" },
    provider_id: { type: "text" },
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

  pgm.addConstraint("users", "users_provider_provider_id_key", {
    unique: ["provider", "provider_id"]
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropTable("users");
  pgm.dropType("auth_provider");
};
