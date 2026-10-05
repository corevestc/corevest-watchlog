export function computeRewardRisk(
  entry: number | null,
  stop: number | null,
  target: number | null
): number | null {
  if (entry === null || stop === null || target === null) {
    return null;
  }
  const risk = entry - stop;
  if (risk === 0) {
    return null;
  }
  return (target - entry) / risk;
}

export function isWatchlistPlanComplete(plan: {
  entry: number | null;
  stop: number | null;
  target: number | null;
}): boolean {
  return plan.entry !== null && plan.stop !== null && plan.target !== null;
}
