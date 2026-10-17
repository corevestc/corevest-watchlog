export type SymbolOption = {
  code: string;
  name: string | null;
  fromModel: boolean;
};

export type ModelSource = "V0" | "V1" | "V2";

export type SavedSource = ModelSource | "BO" | "MANUAL";

export type StockSnapshot = {
  code: string;
  sources: ModelSource[];
  selectionPrice: number | null;
  selectionPriceDate: string | null;
  rsi14: number | null;
  relativeVolume: number | null;
  featureSetupStage: string | null;
  marketStructure: string | null;
  preBreakoutScore: number | null;
};

export type SavedSnapshot = {
  id: string;
  sources: SavedSource[];
  selectionPrice: number | null;
  selectionPriceDate: string | null;
  rsi14: number | null;
  relativeVolume: number | null;
  featureSetupStage: string | null;
  marketStructure: string | null;
  preBreakoutScore: number | null;
};

export type SavedSnapshotWrite = Omit<SavedSnapshot, "id">;

export interface SymbolOptionStore {
  list(): Promise<SymbolOption[]>;
  snapshot(code: string): Promise<StockSnapshot>;
  listSaved(userId: string): Promise<SavedSnapshot[]>;
  saveSnapshot(userId: string, id: string, snapshot: SavedSnapshotWrite): Promise<boolean>;
}
