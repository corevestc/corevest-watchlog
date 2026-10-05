import { runPendingMigrations } from "../infrastructure/database/postgres/migrate.js";

await runPendingMigrations();
