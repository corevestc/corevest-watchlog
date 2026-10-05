import path from "node:path";
import { fileURLToPath } from "node:url";
import { runner } from "node-pg-migrate";
import { env } from "../../config/env.js";
import { logger } from "../../logging/logger.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.resolve(here, "../../../../../database/migrations");

function databaseTarget(): string {
  try {
    const url = new URL(env.DATABASE_URL);
    const name = url.pathname.replace(/^\//, "") || "unknown";
    const port = url.port || "5432";
    return `${name}.watchlog @ ${url.hostname}:${port}`;
  } catch {
    return "configured DATABASE_URL";
  }
}

const migrateLog = {
  debug: () => undefined,
  info: () => undefined,
  warn: () => undefined,
  error: (message: string) => {
    if (String(message).startsWith("Can't determine timestamp")) {
      return;
    }
    if (String(message).includes("No migrations to run")) {
      return;
    }
    logger.error(message);
  }
};

export async function runPendingMigrations(): Promise<void> {
  const applied = await runner({
    databaseUrl: env.DATABASE_URL,
    dir: migrationsDir,
    direction: "up",
    schema: "watchlog",
    createSchema: true,
    migrationsSchema: "watchlog",
    migrationsTable: "pgmigrations",
    verbose: false,
    logger: migrateLog
  });

  if (applied.length === 0) {
    return;
  }

  logger.info(
    `Applied ${applied.length} migration(s) to ${databaseTarget()}: ${applied.map((m) => m.name).join(", ")}`
  );
}
