import pg from "pg";
import { env } from "../../config/env.js";

const { Pool } = pg;

export function createPool() {
  return new Pool({
    connectionString: env.DATABASE_URL
  });
}

export type PostgresPool = ReturnType<typeof createPool>;

export async function checkDatabaseConnection(
  pool: PostgresPool
): Promise<boolean> {
  try {
    await pool.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}
