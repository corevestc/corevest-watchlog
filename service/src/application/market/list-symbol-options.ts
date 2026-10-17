import type {
  SavedSnapshot,
  SavedSnapshotWrite,
  StockSnapshot,
  SymbolOption,
  SymbolOptionStore
} from "../ports/symbol-option-store.js";
import { NotFoundError } from "../../domain/shared/errors.js";

export class ListSymbolOptions {
  constructor(private readonly symbols: SymbolOptionStore) {}

  execute(): Promise<SymbolOption[]> {
    return this.symbols.list();
  }

  snapshot(code: string): Promise<StockSnapshot> {
    return this.symbols.snapshot(code);
  }

  listSaved(userId: string): Promise<SavedSnapshot[]> {
    return this.symbols.listSaved(userId);
  }

  async saveSnapshot(userId: string, id: string, snapshot: SavedSnapshotWrite): Promise<void> {
    const saved = await this.symbols.saveSnapshot(userId, id, snapshot);
    if (!saved) {
      throw new NotFoundError("Watchlist entry not found");
    }
  }
}
