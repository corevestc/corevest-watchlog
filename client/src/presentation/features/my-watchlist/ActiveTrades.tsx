import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextField } from "@/components/ui/text-field";
import { apiPaths } from "@/infrastructure/http/api-paths";
import { ApiError, httpJson } from "@/infrastructure/http/http-json";
import { daysHeld, type OpenTrade } from "./discipline";

function money(value: number) {
  return value.toFixed(2);
}

export function ActiveTrades({
  trades,
  horizonDays,
  today,
  onChanged,
  onError,
  onCloseTrade
}: {
  trades: OpenTrade[];
  horizonDays: number | null;
  today: string;
  onChanged: () => void;
  onError: (message: string) => void;
  onCloseTrade: (trade: OpenTrade) => void;
}) {
  const [stops, setStops] = useState<Record<string, string>>({});
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  async function saveStop(event: FormEvent, trade: OpenTrade) {
    event.preventDefault();
    const next = Number(stops[trade.id] ?? "");
    if (!Number.isFinite(next) || next <= 0) {
      onError("Enter a stop price");
      return;
    }
    setSavingId(trade.id);
    try {
      await httpJson("PUT", `${apiPaths.trades}/${trade.id}/stop`, { newStop: next });
      setStops((current) => ({ ...current, [trade.id]: "" }));
      onChanged();
    } catch (err) {
      onError(err instanceof ApiError ? err.message : "Could not move the stop");
    } finally {
      setSavingId(null);
    }
  }

  if (trades.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 grid gap-3">
      <h2 className="text-sm font-semibold text-title-50">Active trades</h2>
      {trades.map((trade) => {
        const held = daysHeld(trade.entryDate, today);
        const mark = Number(marks[trade.id] ?? "");
        const live = Number.isFinite(mark) && marks[trade.id]?.trim()
          ? ((mark - trade.entryPrice) / trade.entryPrice) * 100
          : null;
        const expired = horizonDays !== null && held > horizonDays;
        return (
          <Card key={trade.id} className="border border-base-100 shadow-xs">
            <CardHeader>
              <CardTitle>{trade.symbol}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {expired ? (
                <p className="rounded-lg border border-warning-500/40 bg-warning-500/10 px-3 py-2 text-sm text-title-50">
                  Model window expired - review or close
                </p>
              ) : null}
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <p><span className="text-text-100">Entry </span>{money(trade.entryPrice)}</p>
                <p><span className="text-text-100">Stop </span>{money(trade.stopCurrent)}</p>
                <p><span className="text-text-100">Target </span>{money(trade.target)}</p>
                {trade.target2 != null ? (
                  <p><span className="text-text-100">Target 2 </span>{money(trade.target2)}</p>
                ) : null}
                {trade.targetDate ? (
                  <p><span className="text-text-100">Target date </span>{trade.targetDate}</p>
                ) : null}
                {trade.term ? (
                  <p>
                    <span className="text-text-100">Term </span>
                    {trade.term === "short" ? "Short term" : trade.term === "mid" ? "Mid term" : "Long term"}
                  </p>
                ) : null}
                <p><span className="text-text-100">Days </span>{held}</p>
                <p>
                  <span className="text-text-100">P&L </span>
                  {live === null ? "—" : `${live.toFixed(2)}%`}
                </p>
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <TextField className="w-36">
                  <Label>Last</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={marks[trade.id] ?? ""}
                    onChange={(event) => setMarks((current) => ({ ...current, [trade.id]: event.target.value }))}
                  />
                </TextField>
                <form className="flex flex-wrap items-end gap-2" onSubmit={(event) => void saveStop(event, trade)}>
                  <TextField className="w-36">
                    <Label>New stop</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={stops[trade.id] ?? ""}
                      onChange={(event) => setStops((current) => ({ ...current, [trade.id]: event.target.value }))}
                    />
                  </TextField>
                  <Button type="submit" size="sm" disabled={savingId === trade.id}>
                    {savingId === trade.id ? "Saving…" : "Move stop"}
                  </Button>
                </form>
                <Button size="sm" appearance="outline" onPress={() => onCloseTrade(trade)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
