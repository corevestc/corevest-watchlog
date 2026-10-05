export function formatTradeCode(sequence: number): string {
  return `CV-${String(sequence).padStart(4, "0")}`;
}
