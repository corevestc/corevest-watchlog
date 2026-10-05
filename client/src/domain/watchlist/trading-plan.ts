export interface TradingPlan {
  entry: number | null;
  stop: number | null;
  target: number | null;
  risk: number | null;
  quantity: number | null;
}

export function isPlanComplete(plan: TradingPlan): boolean {
  return (
    plan.entry !== null &&
    plan.stop !== null &&
    plan.target !== null &&
    plan.risk !== null &&
    plan.quantity !== null
  );
}
