import type { FailedGate } from "../shared/errors.js";
import type { TradingRules } from "./trading-rules.js";

export interface OpenGateInput {
  plannedEntry: number | null;
  stopLoss: number | null;
  targetPrice: number | null;
  buyPrice: number;
  qty: number;
  checklist: boolean[];
  rules: TradingRules;
  openCount: number;
  realizedPnlToday: number;
  recentLoss: boolean;
}

function round4(value: number): number {
  return Math.round(value * 10000) / 10000;
}

/** A long plan needs all three prices and entry above the stop. */
function completePlan(
  entry: number | null,
  stop: number | null,
  target: number | null
): { entry: number; stop: number; target: number } | null {
  if (entry === null || stop === null || target === null || !(entry > stop)) {
    return null;
  }
  return { entry, stop, target };
}

export function evaluateOpenGates(input: OpenGateInput): FailedGate[] {
  const failures: FailedGate[] = [];
  const { plannedEntry, stopLoss, targetPrice, rules } = input;
  const plan = completePlan(plannedEntry, stopLoss, targetPrice);

  if (!plan) {
    failures.push({
      rule: "plan_complete",
      message: "Watchlist row needs entry, stop, and target, with entry above the stop"
    });
    failures.push({
      rule: "min_rr",
      message: "Reward/risk needs entry above the stop and a target"
    });
  } else {
    const rewardRisk = (plan.target - plan.entry) / (plan.entry - plan.stop);
    if (rewardRisk < rules.minRr) {
      failures.push({
        rule: "min_rr",
        message: `Reward/risk ${round4(rewardRisk)} is below ${rules.minRr}`
      });
    }
  }

  if (plannedEntry === null) {
    failures.push({
      rule: "max_run_up",
      message: "Run-up check needs a planned entry"
    });
  } else {
    const ceiling = plannedEntry * (1 + rules.maxRunUpPct / 100);
    // Run-up is the price paid, not the market close.
    if (input.buyPrice > ceiling) {
      failures.push({
        rule: "max_run_up",
        message: `Price is more than ${rules.maxRunUpPct}% above planned entry`
      });
    }
  }

  if (!(rules.accountCapital > 0)) {
    failures.push({
      rule: "position_size",
      message: "account_capital is not set on trading_rules"
    });
    failures.push({
      rule: "daily_loss_limit",
      message: "account_capital is not set on trading_rules"
    });
  } else if (!plan) {
    failures.push({
      rule: "position_size",
      message: "Position size needs entry above the stop"
    });
    const limit = rules.accountCapital * (rules.dailyLossLimitPct / 100);
    if (!(input.realizedPnlToday > -limit)) {
      failures.push({
        rule: "daily_loss_limit",
        message: `Today's realized P&L ${round4(input.realizedPnlToday)} has hit the ${rules.dailyLossLimitPct}% loss limit`
      });
    }
  } else {
    const riskPerShare = input.buyPrice - plan.stop;
    if (!(riskPerShare > 0)) {
      failures.push({
        rule: "position_size",
        message: "Buy price must be above the stop"
      });
    } else {
      const capitalRisk = rules.accountCapital * (rules.riskPerTradePct / 100);
      const maxQty = Math.floor(capitalRisk / riskPerShare + 1e-9);
      if (input.qty > maxQty) {
        failures.push({
          rule: "position_size",
          message: `Qty ${input.qty} is above the max ${maxQty} for ${rules.riskPerTradePct}% risk`
        });
      }
    }
    const limit = rules.accountCapital * (rules.dailyLossLimitPct / 100);
    if (!(input.realizedPnlToday > -limit)) {
      failures.push({
        rule: "daily_loss_limit",
        message: `Today's realized P&L ${round4(input.realizedPnlToday)} has hit the ${rules.dailyLossLimitPct}% loss limit`
      });
    }
  }

  if (!(input.openCount < rules.maxOpenPositions)) {
    failures.push({
      rule: "max_open_positions",
      message: `${input.openCount} open trades already; limit is ${rules.maxOpenPositions}`
    });
  }

  if (input.recentLoss) {
    failures.push({
      rule: "cooldown",
      message: `A losing close on this symbol is inside the ${rules.cooldownDays}-day cooldown`
    });
  }

  if (input.checklist.length !== 4 || input.checklist.some((item) => !item)) {
    failures.push({
      rule: "checklist",
      message: "All 4 checklist items must be true"
    });
  }

  return failures;
}
