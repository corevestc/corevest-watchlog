export interface ModelWatchlistSummaryRow {
  summaryRank: number;
  scrip: string;
  dayCount: number;
  windowDays: number;
  streak: number;
  models: string;
  latestDate: string;
  category: string | null;
  v0Pct: number | null;
  earlyPct: number | null;
  strongPct: number | null;
  signalPrice: number | null;
  sector: string | null;
  marketStructure: string | null;
  windowFrom: string;
  windowTo: string;
}
