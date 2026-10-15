export interface ModelWatchlistBoardRow {
  tradeDate: string;
  watchlistRank: number;
  scrip: string;
  category: string | null;
  earlyPct: number | null;
  earlyRank: number | null;
  strongPct: number | null;
  strongRank: number | null;
  signalPrice: number | null;
  sector: string | null;
  setupStage: string | null;
  marketStructure: string | null;
  relativeVolume: number | null;
  rsi14: number | null;
  preBreakoutScore: number | null;
}
