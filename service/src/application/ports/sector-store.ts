import type { Sector } from "../../domain/market/sector.js";

export interface SectorStore {
  list(): Promise<Sector[]>;
}
