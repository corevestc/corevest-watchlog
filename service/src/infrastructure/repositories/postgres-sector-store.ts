import type { SectorStore } from "../../application/ports/sector-store.js";
import type { Sector } from "../../domain/market/sector.js";
import type { PostgresPool } from "../database/postgres/pool.js";
import { toInt } from "../database/postgres/map-numeric.js";

interface SectorDbRow {
  id: number;
  name: string;
  created_at: Date | string;
  updated_at: Date | string;
}

function toTimestamp(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : String(value);
}

export class PostgresSectorStore implements SectorStore {
  constructor(private readonly pool: PostgresPool) {}

  async list(): Promise<Sector[]> {
    const result = await this.pool.query<SectorDbRow>(
      `SELECT id, name, created_at, updated_at
       FROM public.sectors
       ORDER BY name`
    );
    return result.rows.map((row) => ({
      id: toInt(row.id) ?? row.id,
      name: row.name,
      createdAt: toTimestamp(row.created_at),
      updatedAt: toTimestamp(row.updated_at)
    }));
  }
}
