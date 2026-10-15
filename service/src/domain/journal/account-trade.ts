export interface AccountTrade {
  id: string;
  boId: string;
  entryDate: string;
  scrip: string;
  qty: number;
  entryPrice: number;
  stop: number | null;
  target: number | null;
  exitDate: string | null;
  exitPrice: number | null;
  note: string | null;
  pnlAmt: number | null;
  pnlPct: number | null;
}

export interface AccountTradeDraft {
  entryDate: string;
  scrip: string;
  qty: number;
  entryPrice: number;
  stop?: number | null;
  target?: number | null;
  exitDate?: string | null;
  exitPrice?: number | null;
  note?: string | null;
}
