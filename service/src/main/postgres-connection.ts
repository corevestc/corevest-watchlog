import { Inject, Injectable, type OnApplicationShutdown } from "@nestjs/common";
import type { PostgresPool } from "../infrastructure/database/postgres/pool.js";
import { PG_POOL } from "../infrastructure/database/postgres/injection-tokens.js";

@Injectable()
export class PostgresConnection implements OnApplicationShutdown {
  constructor(@Inject(PG_POOL) private readonly pool: PostgresPool) {}

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
  }
}
