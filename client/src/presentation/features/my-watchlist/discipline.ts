export type TradingRules = {
  minRr: number;
  maxRunUpPct: number;
  riskPerTradePct: number;
  maxOpenPositions: number;
  dailyLossLimitPct: number;
  cooldownDays: number;
  horizonDays: number;
  accountCapital: number;
};

export type DisciplineStats = {
  adherencePct: number | null;
  openPositions: number;
  realizedPnlToday: number;
};

export type OpenTrade = {
  id: string;
  watchlistId: string;
  symbol: string;
  entryDate: string;
  entryPrice: number;
  qty: number;
  stopInitial: number;
  stopCurrent: number;
  target: number;
  target2?: number | null;
  targetDate?: string | null;
  term?: "short" | "mid" | "long" | null;
};

export type GateRow = {
  rule: string;
  label: string;
  detail: string;
  pass: boolean;
};

export type Tone = "ok" | "near" | "breach";

function round4(value: number): number {
  return Math.round(value * 10000) / 10000;
}

export function asPlan(entry: number | null, stop: number | null, target: number | null) {
  if (entry === null || stop === null || target === null || !(entry > stop)) {
    return null;
  }
  return { entry, stop, target };
}

export function planComplete(entry: number | null, stop: number | null, target: number | null): boolean {
  return asPlan(entry, stop, target) !== null;
}

/** Same open checks the server runs, except a missing plan which the Buy button already blocks. */
export function liveGates(input: {
  entry: number;
  stop: number;
  target: number;
  buyPrice: number | null;
  qty: number | null;
  rules: TradingRules;
  openPositions: number;
  realizedPnlToday: number;
  cooldown: boolean;
}): GateRow[] {
  const planRisk = input.entry - input.stop;
  const rewardRisk = (input.target - input.entry) / planRisk;
  const maxQty =
    input.buyPrice === null
      ? null
      : floorMaxQty(input.buyPrice, input.stop, input.rules.accountCapital, input.rules.riskPerTradePct);
  const runUp =
    input.buyPrice === null ? null : ((input.buyPrice - input.entry) / input.entry) * 100;
  const ceiling = input.entry * (1 + input.rules.maxRunUpPct / 100);
  const lossLimit = input.rules.accountCapital * (input.rules.dailyLossLimitPct / 100);
  const sizeDetail =
    input.rules.accountCapital <= 0
      ? "Account capital is not set"
      : input.buyPrice === null
        ? "Enter the buy price"
        : maxQty === null
          ? "Buy price must be above the stop"
          : input.qty === null
            ? `Max qty ${maxQty}`
            : `Qty ${input.qty} vs max ${maxQty}`;

  return [
    {
      rule: "min_rr",
      label: "Reward / risk",
      detail: `${round4(rewardRisk).toFixed(2)} vs min ${input.rules.minRr}`,
      pass: rewardRisk >= input.rules.minRr
    },
    {
      rule: "max_run_up",
      label: "Run-up",
      detail:
        runUp === null
          ? "Enter the buy price"
          : `${round4(runUp).toFixed(2)}% vs max ${input.rules.maxRunUpPct}%`,
      pass: input.buyPrice !== null && input.buyPrice <= ceiling
    },
    {
      rule: "position_size",
      label: "Size",
      detail: sizeDetail,
      pass: maxQty !== null && input.qty !== null && input.qty > 0 && input.qty <= maxQty
    },
    {
      rule: "max_open_positions",
      label: "Open positions",
      detail: `${input.openPositions} open vs max ${input.rules.maxOpenPositions}`,
      pass: input.openPositions < input.rules.maxOpenPositions
    },
    {
      rule: "daily_loss_limit",
      label: "Daily loss",
      detail:
        input.rules.accountCapital > 0
          ? `${round4(input.realizedPnlToday).toFixed(2)} vs limit -${round4(lossLimit).toFixed(2)}`
          : "Account capital is not set",
      pass: input.rules.accountCapital > 0 && input.realizedPnlToday > -lossLimit
    },
    {
      rule: "cooldown",
      label: "Cooldown",
      detail: input.cooldown
        ? `Losing close inside ${input.rules.cooldownDays} days`
        : `No loss in ${input.rules.cooldownDays} days`,
      pass: !input.cooldown
    }
  ];
}

export function rewardRiskTo(entry: number, stop: number, target: number): number | null {
  const risk = entry - stop;
  if (!(risk > 0)) {
    return null;
  }
  return round4((target - entry) / risk);
}

/** Whole shares the risk % allows at the price actually paid. */
export function floorMaxQty(buyPrice: number, stop: number, capital: number, riskPct: number): number | null {
  const riskPerShare = buyPrice - stop;
  if (!(capital > 0) || !(riskPerShare > 0) || !(riskPct >= 0)) {
    return null;
  }
  return Math.floor((capital * (riskPct / 100)) / riskPerShare + 1e-9);
}

export function daysHeld(entryDate: string, today: string): number {
  const ms = Date.parse(`${today}T00:00:00`) - Date.parse(`${entryDate}T00:00:00`);
  return Math.max(0, Math.round(ms / 86_400_000));
}

export function adherenceTone(pct: number | null): Tone {
  if (pct === null) return "ok";
  if (pct < 50) return "breach";
  if (pct < 80) return "near";
  return "ok";
}

export function positionTone(open: number, max: number): Tone {
  if (open >= max) return "breach";
  if (max > 1 && open >= max - 1) return "near";
  return "ok";
}

export function lossTone(pnl: number, limit: number): Tone {
  if (!(limit > 0)) return "breach";
  if (pnl <= -limit) return "breach";
  if (pnl <= -limit * 0.7) return "near";
  return "ok";
}

export function violationTone(count: number): Tone {
  if (count >= 3) return "breach";
  if (count >= 1) return "near";
  return "ok";
}
