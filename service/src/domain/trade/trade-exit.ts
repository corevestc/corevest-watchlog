export interface TradeExit {
  tradeId: string;
  pnl: number | null;
  rMultiple: number | null;
  daysHeld: number | null;
  mfe: number | null;
  mae: number | null;
}
