import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow
} from "@/components/ui/table";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";
import { Toast } from "@/components/ui/toast";
import { apiPaths } from "@/infrastructure/http/api-paths";
import { ApiError, httpJson } from "@/infrastructure/http/http-json";
import { PageHeader } from "@/presentation/layouts/PageHeader";

type AccountTrade = {
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
};

type JournalBook = {
  boId: string | null;
  trades: AccountTrade[];
};

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

function fmt(value: number | null, digits = 2) {
  return value === null ? "—" : value.toFixed(digits);
}

function emptyTrade() {
  return {
    entryDate: todayUtc(),
    scrip: "",
    qty: "",
    entryPrice: "",
    stop: "",
    target: "",
    exitDate: "",
    exitPrice: "",
    note: ""
  };
}

export function JournalPage() {
  const [boId, setBoId] = useState<string | null>(null);
  const [boInput, setBoInput] = useState("");
  const [trades, setTrades] = useState<AccountTrade[]>([]);
  const [date, setDate] = useState("");
  const [stockQuery, setStockQuery] = useState("");
  const [stockSearch, setStockSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingBo, setSavingBo] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyTrade);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setStockSearch(stockQuery.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [stockQuery]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams();
    if (date) {
      params.set("date", date);
    }
    if (stockSearch) {
      params.set("scrip", stockSearch);
    }
    const query = params.toString();
    void httpJson<{ data: JournalBook }>(
      "GET",
      `${apiPaths.journal}/account${query ? `?${query}` : ""}`
    )
      .then((payload) => {
        if (!cancelled) {
          setBoId(payload.data.boId);
          setBoInput(payload.data.boId ?? "");
          setTrades(payload.data.trades);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "Could not load the journal");
          setTrades([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [date, stockSearch, notice]);

  async function onSaveBo(event: FormEvent) {
    event.preventDefault();
    setSavingBo(true);
    setError(null);
    try {
      const payload = await httpJson<{ data: { boId: string } }>("PUT", `${apiPaths.journal}/account/bo`, {
        boId: boInput
      });
      setBoId(payload.data.boId);
      setBoInput(payload.data.boId);
      setNotice("BO ID saved.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save the BO ID");
    } finally {
      setSavingBo(false);
    }
  }

  async function onSaveTrade(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    const qty = Number(form.qty);
    const entryPrice = Number(form.entryPrice);
    const stop = form.stop.trim() === "" ? null : Number(form.stop);
    const target = form.target.trim() === "" ? null : Number(form.target);
    const exitPrice = form.exitPrice.trim() === "" ? null : Number(form.exitPrice);
    try {
      await httpJson("POST", `${apiPaths.journal}/account`, {
        entryDate: form.entryDate,
        scrip: form.scrip,
        qty,
        entryPrice,
        stop,
        target,
        exitDate: form.exitDate || null,
        exitPrice,
        note: form.note.trim() || null
      });
      setForm(emptyTrade());
      setFormOpen(false);
      setNotice(`${form.scrip.trim().toUpperCase()} added.`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save the trade");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section>
      <PageHeader
        title="Trade Journal"
        description="Set the BO ID for this account, then record trades against it. The list shows every trade until you filter by day or scrip."
        actions={
          boId ? (
            <Button size="sm" onPress={() => setFormOpen((open) => !open)}>
              {formOpen ? "Close" : "Add trade"}
            </Button>
          ) : null
        }
      />

      {notice ? (
        <div className="mb-4">
          <Toast variant="success" message={notice} />
        </div>
      ) : null}
      {error ? (
        <p className="mb-4 text-sm text-danger-500" role="alert">
          {error}
        </p>
      ) : null}

      <Card className="mb-6 border border-base-100 shadow-xs">
        <CardHeader>
          <CardTitle>{boId ? `Account ${boId}` : "BO ID"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap items-end gap-3" onSubmit={(event) => void onSaveBo(event)}>
            <TextField className="w-64">
              <Label>BO ID</Label>
              <Input
                maxLength={20}
                placeholder="ODS749"
                value={boInput}
                onChange={(event) => setBoInput(event.target.value)}
              />
            </TextField>
            <Button type="submit" disabled={savingBo || !/^[A-Za-z0-9]{3,20}$/.test(boInput.trim())}>
              {savingBo ? "Saving…" : boId ? "Update BO ID" : "Save BO ID"}
            </Button>
          </form>
          {boId ? null : (
            <p className="mt-3 text-sm text-text-100">
              Save the BO ID before adding trades. Each trade is stored against this account.
            </p>
          )}
        </CardContent>
      </Card>

      {boId && formOpen ? (
        <Card className="mb-6 border border-base-100 shadow-xs">
          <CardHeader>
            <CardTitle>New trade</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" onSubmit={(event) => void onSaveTrade(event)}>
              <TextField>
                <Label>Entry day</Label>
                <Input
                  type="date"
                  required
                  value={form.entryDate}
                  onChange={(event) => setForm({ ...form, entryDate: event.target.value })}
                />
              </TextField>
              <TextField>
                <Label>Scrip</Label>
                <Input
                  required
                  value={form.scrip}
                  onChange={(event) => setForm({ ...form, scrip: event.target.value })}
                />
              </TextField>
              <TextField>
                <Label>Qty</Label>
                <Input
                  type="number"
                  min="1"
                  required
                  value={form.qty}
                  onChange={(event) => setForm({ ...form, qty: event.target.value })}
                />
              </TextField>
              <TextField>
                <Label>Entry price</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={form.entryPrice}
                  onChange={(event) => setForm({ ...form, entryPrice: event.target.value })}
                />
              </TextField>
              <TextField>
                <Label>Stop</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.stop}
                  onChange={(event) => setForm({ ...form, stop: event.target.value })}
                />
              </TextField>
              <TextField>
                <Label>Target</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.target}
                  onChange={(event) => setForm({ ...form, target: event.target.value })}
                />
              </TextField>
              <TextField>
                <Label>Exit day</Label>
                <Input
                  type="date"
                  value={form.exitDate}
                  onChange={(event) => setForm({ ...form, exitDate: event.target.value })}
                />
              </TextField>
              <TextField>
                <Label>Exit price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.exitPrice}
                  onChange={(event) => setForm({ ...form, exitPrice: event.target.value })}
                />
              </TextField>
              <div className="sm:col-span-2 lg:col-span-4">
                <Label>Note</Label>
                <TextArea
                  rows={2}
                  value={form.note}
                  onChange={(value) => setForm({ ...form, note: value })}
                />
              </div>
              <div className="flex justify-end sm:col-span-2 lg:col-span-4">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Add to journal"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}

      {boId ? (
        <>
          <div className="mb-4 flex flex-wrap items-end gap-3">
            <TextField className="w-44">
              <Label>Entry day</Label>
              <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </TextField>
            <TextField className="w-52">
              <Label>Stock</Label>
              <Input
                value={stockQuery}
                placeholder="Scrip"
                onChange={(event) => setStockQuery(event.target.value)}
              />
            </TextField>
            <p className="pb-2 text-sm text-text-100">
              {loading ? "Loading…" : date || stockSearch ? "Filtered in the database." : "Showing all trades."}
            </p>
          </div>

          {loading && trades.length === 0 ? (
            <p className="text-sm text-text-100">Loading journal…</p>
          ) : trades.length === 0 ? (
            <p className="text-sm text-text-100">No trades for this account yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <TableRoot>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Scrip</TableHead>
                    <TableHead>BO ID</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Entry</TableHead>
                    <TableHead>Stop</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Exit</TableHead>
                    <TableHead>P&L</TableHead>
                    <TableHead>P&L %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell>{trade.entryDate}</TableCell>
                      <TableCell className="text-title-50">{trade.scrip}</TableCell>
                      <TableCell>{trade.boId}</TableCell>
                      <TableCell>{trade.qty}</TableCell>
                      <TableCell>{fmt(trade.entryPrice)}</TableCell>
                      <TableCell>{fmt(trade.stop)}</TableCell>
                      <TableCell>{fmt(trade.target)}</TableCell>
                      <TableCell>
                        {trade.exitPrice === null ? "Open" : `${trade.exitDate} · ${fmt(trade.exitPrice)}`}
                      </TableCell>
                      <TableCell>{fmt(trade.pnlAmt)}</TableCell>
                      <TableCell>{trade.pnlPct === null ? "—" : `${fmt(trade.pnlPct)}%`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableRoot>
            </div>
          )}
        </>
      ) : null}
    </section>
  );
}
