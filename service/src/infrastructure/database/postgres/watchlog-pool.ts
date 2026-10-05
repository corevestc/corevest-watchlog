import pg from "pg";
import { env } from "../../config/env.js";

const { Pool } = pg;

export function createWatchlogPool() {
  return new Pool({
    connectionString: env.DATABASE_URL,
    options: "-c search_path=watchlog,public"
  });
}
