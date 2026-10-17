import type { DisciplineTrade, StatsRow } from "../../domain/discipline/discipline-trade.js";
import type { TradingRules } from "../../domain/discipline/trading-rules.js";

export interface OpenContext {
  watchlistId: string;
  symbol: string;
  source: string | null;
  setupType: string | null;
  plannedEntry: number | null;
  stopLoss: number | null;
  targetPrice: number | null;
  rules: TradingRules;
  openCount: number;
  realizedPnlToday: number;
  recentLoss: boolean;
}

export interface OpenTradeWrite {
  watchlistId: string;
  symbol: string;
  entryDate: string;
  entryPrice: number;
  qty: number;
  riskAmount: number;
  stop: number;
  target: number;
  source: string | null;
  setupType: string | null;
  checklistPassed: boolean;
  violations: string[];
  overrides: { rule: string; reason: string }[];
  referencePrice: number | null;
  referenceDate: string | null;
  mindset: string | null;
  target2: number | null;
  targetDate: string | null;
  term: string | null;
}

export interface CloseTradeWrite {
  exitDate: string;
  exitPrice: number;
  exitReason: string;
  pnlPct: number;
  pnlAmount: number;
  rMultiple: number | null;
  daysHeld: number;
  violations: string[];
  disciplineScore: number;
  lesson: string | null;
  result: "WIN" | "LOSS";
}

export interface DisciplineTx {
  lockUser(userId: string): Promise<void>;
  loadOpenContext(userId: string, watchlistId: string): Promise<OpenContext | null>;
  latestClose(symbol: string): Promise<{ price: number; date: string } | null>;
  insertOpen(userId: string, draft: OpenTradeWrite): Promise<DisciplineTrade>;
  getTrade(userId: string, id: string): Promise<DisciplineTrade | null>;
  setStop(userId: string, id: string, newStop: number): Promise<DisciplineTrade | null>;
  saveClose(userId: string, trade: DisciplineTrade, close: CloseTradeWrite): Promise<DisciplineTrade>;
}

export interface DisciplineStore {
  withTransaction<T>(work: (tx: DisciplineTx) => Promise<T>): Promise<T>;
  getRules(): Promise<TradingRules>;
  saveRules(rules: TradingRules): Promise<TradingRules>;
  listForStats(userId: string): Promise<{ today: string; rows: StatsRow[] }>;
  desk(userId: string): Promise<DisciplineDesk>;
}

export interface DisciplineDesk {
  openTrades: DisciplineTrade[];
  cooldownSymbols: string[];
  violationsThisWeek: number;
}
