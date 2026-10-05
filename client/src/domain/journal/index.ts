export interface Violation {
  id: string;
  tradeId: string;
  code: string;
  note: string | null;
}

export interface TradingLesson {
  id: string;
  tradeId: string;
  lesson: string;
}
