export interface ModelWatchlistV0Row {
  tradeDate: string;
  watchlistRank: number;
  scrip: string;
  category: string | null;
  chancePct: number | null;
  signalPrice: number | null;
  sector: string | null;
  setupStage: string | null;
  marketStructure: string | null;
  relativeVolume: number | null;
  breakoutPressure: number | null;
  resistanceDistancePct: number | null;
}
