export interface TradingRules {
  minRr: number;
  maxRunUpPct: number;
  riskPerTradePct: number;
  maxOpenPositions: number;
  dailyLossLimitPct: number;
  cooldownDays: number;
  horizonDays: number;
  accountCapital: number;
}
