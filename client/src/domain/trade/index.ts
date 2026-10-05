export type TradeSide = "BUY" | "SELL";
export type TradeStatus = "planned" | "open" | "closed";

export interface Trade {
  id: string;
  symbol: string;
  side: TradeSide;
  status: TradeStatus;
  plannedEntry: number | null;
  plannedStop: number | null;
  plannedTarget: number | null;
  plannedRisk: number | null;
  quantity: number | null;
}

export interface TradeExit {
  tradeId: string;
  pnl: number | null;
  rMultiple: number | null;
  daysHeld: number | null;
  mfe: number | null;
  mae: number | null;
}
