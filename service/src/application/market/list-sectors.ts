import type { Sector } from "../../domain/market/sector.js";
import type { SectorStore } from "../ports/sector-store.js";

/** Names from public.sectors for the watchlist sector select. */
export class ListSectors {
  constructor(private readonly sectors: SectorStore) {}

  execute(): Promise<Sector[]> {
    return this.sectors.list();
  }
}
