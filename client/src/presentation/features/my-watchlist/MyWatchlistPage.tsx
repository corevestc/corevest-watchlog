import { FormEvent, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
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

type Source = "V1" | "V2" | "BO" | "MANUAL";
type Setup = "Breakout" | "Retest" | "Bounce" | "Accumulation";
type Status = "WATCHING" | "ACTIVE" | "CLOSED" | "REMOVED";
type Result = "WIN" | "LOSS" | "OPEN";
type StatusFilter = "all" | "WATCHING" | "ACTIVE" | "CLOSED";

type MyRow = {
  id: string;
  symbol: string;
  addedDate: string;
  source: Source;
  setupType: Setup | null;
  plannedEntry: number | null;
  stopLoss: number | null;
  targetPrice: number | null;
  reason: string | null;
  status: Status;
  result: Result;
  notes: string | null;
  rewardRisk: number | null;
};

type EntryForm = {
  symbol: string;
  addedDate: string;
  source: Source;
  setupType: "" | Setup;
  plannedEntry: string;
  stopLoss: string;
  targetPrice: string;
  reason: string;
};

const sources: { value: Source; label: string }[] = [
  { value: "V1", label: "V1" },
  { value: "V2", label: "V2" },
  { value: "BO", label: "BO" },
  { value: "MANUAL", label: "Manual" }
];

const setups: Setup[] = ["Breakout", "Retest", "Bounce", "Accumulation"];

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "WATCHING", label: "Watching" },
  { value: "ACTIVE", label: "Active" },
  { value: "CLOSED", label: "Closed" }
];

const statuses: { value: Status; label: string }[] = [
  { value: "WATCHING", label: "Watching" },
  { value: "ACTIVE", label: "Active" },
  { value: "CLOSED", label: "Closed" },
  { value: "REMOVED", label: "Removed" }
];

const results: { value: Result; label: string }[] = [
  { value: "OPEN", label: "Open" },
  { value: "WIN", label: "Win" },
  { value: "LOSS", label: "Loss" }
];

function todayLocal() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function emptyForm(): EntryForm {
  return {
    symbol: "",
    addedDate: todayLocal(),
    source: "V1",
    setupType: "",
    plannedEntry: "",
    stopLoss: "",
    targetPrice: "",
    reason: ""
  };
}

function priceOrNull(value: string): number | null {
  if (value.trim() === "") {
    return null;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/** Live preview. Blank until entry, stop, and target are valid and entry is above the stop. */
function liveRewardRisk(entry: string, stop: string, target: string): number | null {
  if (entry.trim() === "" || stop.trim() === "" || target.trim() === "") {
    return null;
  }
  const plannedEntry = Number(entry);
  const stopLoss = Number(stop);
  const targetPrice = Number(target);
  if (
    !Number.isFinite(plannedEntry) ||
    !Number.isFinite(stopLoss) ||
    !Number.isFinite(targetPrice) ||
    !(plannedEntry > stopLoss)
  ) {
    return null;
  }
  return Math.round(((targetPrice - plannedEntry) / (plannedEntry - stopLoss)) * 10000) / 10000;
}

function fmt(value: number | null, digits = 2) {
  return value === null ? "—" : value.toFixed(digits);
}

function sourceLabel(source: Source) {
  return source === "MANUAL" ? "Manual" : source;
}

function statusColor(status: Status): "gray" | "blue" | "success" | "error" {
  if (status === "ACTIVE") return "blue";
  if (status === "CLOSED") return "success";
  if (status === "REMOVED") return "error";
  return "gray";
}

function resultColor(result: Result): "success" | "error" | "gray" {
  if (result === "WIN") return "success";
  if (result === "LOSS") return "error";
  return "gray";
}

function statusLabel(status: Status) {
  return statuses.find((item) => item.value === status)?.label ?? status;
}

function resultLabel(result: Result) {
  return results.find((item) => item.value === result)?.label ?? result;
}

export function MyWatchlistPage() {
  const [form, setForm] = useState<EntryForm>(emptyForm);
  const [rows, setRows] = useState<MyRow[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | Source>("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<MyRow | null>(null);
  const [editStatus, setEditStatus] = useState<Status>("WATCHING");
  const [editResult, setEditResult] = useState<Result>("OPEN");
  const [editNotes, setEditNotes] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [deleteRow, setDeleteRow] = useState<MyRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const rewardRisk = liveRewardRisk(form.plannedEntry, form.stopLoss, form.targetPrice);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== "all") {
      params.set("status", statusFilter);
    }
    if (sourceFilter !== "all") {
      params.set("source", sourceFilter);
    }
    const query = params.toString();
    void httpJson<{ data: MyRow[] }>(
      "GET",
      `${apiPaths.myWatchlist}${query ? `?${query}` : ""}`
    )
      .then((payload) => {
        if (!cancelled) {
          setRows(payload.data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setRows([]);
          setError(err instanceof ApiError ? err.message : "Could not load your watchlist");
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
  }, [statusFilter, sourceFilter, reloadKey]);

  const stats = useMemo(() => {
    const closed = rows.filter((row) => row.status === "CLOSED");
    const wins = closed.filter((row) => row.result === "WIN").length;
    return {
      total: rows.length,
      closed: closed.length,
      winRate: closed.length === 0 ? null : (wins / closed.length) * 100
    };
  }, [rows]);

  function resetForm() {
    setForm(emptyForm());
  }

  async function onSave(event: FormEvent) {
    event.preventDefault();
    const plannedEntry = priceOrNull(form.plannedEntry);
    const stopLoss = priceOrNull(form.stopLoss);
    if (plannedEntry !== null && stopLoss !== null && stopLoss >= plannedEntry) {
      setError("stop_loss must be below planned_entry");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await httpJson("POST", apiPaths.myWatchlist, {
        symbol: form.symbol.trim().toUpperCase(),
        addedDate: form.addedDate,
        source: form.source,
        setupType: form.setupType || null,
        plannedEntry,
        stopLoss,
        targetPrice: priceOrNull(form.targetPrice),
        reason: form.reason.trim() || null
      });
      setNotice(`${form.symbol.trim().toUpperCase()} saved.`);
      resetForm();
      setReloadKey((key) => key + 1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save the symbol");
    } finally {
      setSaving(false);
    }
  }

  function openEdit(row: MyRow) {
    setEditRow(row);
    setEditStatus(row.status);
    setEditResult(row.result);
    setEditNotes(row.notes ?? "");
  }

  async function onEditSave() {
    if (!editRow) {
      return;
    }
    setEditSaving(true);
    setError(null);
    try {
      await httpJson("PUT", `${apiPaths.myWatchlist}/${editRow.id}`, {
        status: editStatus,
        result: editResult,
        notes: editNotes.trim() || null
      });
      setNotice(`${editRow.symbol} updated.`);
      setEditRow(null);
      setReloadKey((key) => key + 1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not update the symbol");
    } finally {
      setEditSaving(false);
    }
  }

  async function onDelete() {
    if (!deleteRow) {
      return;
    }
    setDeleting(true);
    setError(null);
    try {
      await httpJson("DELETE", `${apiPaths.myWatchlist}/${deleteRow.id}`);
      setNotice(`${deleteRow.symbol} removed.`);
      setDeleteRow(null);
      setReloadKey((key) => key + 1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not delete the symbol");
    } finally {
      setDeleting(false);
    }
  }

  const filteredEmpty = !loading && rows.length === 0;
  const filtersActive = statusFilter !== "all" || sourceFilter !== "all";

  return (
    <section>
      <PageHeader
        title="My Watchlist"
        description="Save a symbol with a plan, then close it later from the row."
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
          <CardTitle>New entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4" onSubmit={(event) => void onSave(event)}>
            <TextField>
              <Label>Symbol</Label>
              <Input
                required
                maxLength={50}
                value={form.symbol}
                onChange={(event) => setForm({ ...form, symbol: event.target.value.toUpperCase() })}
              />
            </TextField>
            <TextField>
              <Label>Date</Label>
              <Input
                type="date"
                required
                value={form.addedDate}
                onChange={(event) => setForm({ ...form, addedDate: event.target.value })}
              />
            </TextField>
            <TextField>
              <Label>Source</Label>
              <NativeSelect
                value={form.source}
                onChange={(event) => setForm({ ...form, source: event.target.value as Source })}
              >
                {sources.map((source) => (
                  <NativeSelectOption key={source.value} value={source.value}>
                    {source.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </TextField>
            <TextField>
              <Label>Setup</Label>
              <NativeSelect
                value={form.setupType}
                onChange={(event) =>
                  setForm({ ...form, setupType: event.target.value as EntryForm["setupType"] })
                }
              >
                <NativeSelectOption value="">—</NativeSelectOption>
                {setups.map((setup) => (
                  <NativeSelectOption key={setup} value={setup}>
                    {setup}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </TextField>

            <TextField>
              <Label>Entry</Label>
              <Input
                type="number"
                step="0.01"
                value={form.plannedEntry}
                onChange={(event) => setForm({ ...form, plannedEntry: event.target.value })}
              />
            </TextField>
            <TextField>
              <Label>Stop</Label>
              <Input
                type="number"
                step="0.01"
                value={form.stopLoss}
                onChange={(event) => setForm({ ...form, stopLoss: event.target.value })}
              />
            </TextField>
            <TextField>
              <Label>Target</Label>
              <Input
                type="number"
                step="0.01"
                value={form.targetPrice}
                onChange={(event) => setForm({ ...form, targetPrice: event.target.value })}
              />
            </TextField>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-text-50">Reward/Risk</p>
              <div className="flex h-11 items-center">
                <Badge color={rewardRisk === null ? "gray" : "primary"} size="md">
                  {rewardRisk === null ? "—" : rewardRisk.toFixed(2)}
                </Badge>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              <TextField>
                <Label>Reason</Label>
                <Input
                  value={form.reason}
                  onChange={(event) => setForm({ ...form, reason: event.target.value })}
                />
              </TextField>
            </div>

            <div className="flex flex-wrap gap-2 md:col-span-2 lg:col-span-4">
              <Button type="submit" disabled={saving || form.symbol.trim() === ""}>
                {saving ? "Saving…" : "Save to Watchlist"}
              </Button>
              <Button type="button" variant="ghost" onPress={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mb-4 flex flex-wrap gap-6 rounded-xl border border-base-100 bg-background-50 px-4 py-3 text-sm">
        <p>
          <span className="text-text-100">Entries </span>
          <span className="font-semibold text-title-50">{stats.total}</span>
        </p>
        <p>
          <span className="text-text-100">Closed </span>
          <span className="font-semibold text-title-50">{stats.closed}</span>
        </p>
        <p>
          <span className="text-text-100">Win rate </span>
          <span className="font-semibold text-title-50">
            {stats.winRate === null ? "—" : `${stats.winRate.toFixed(0)}%`}
          </span>
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1">
          {statusFilters.map((tab) => (
            <Button
              key={tab.value}
              size="sm"
              variant={statusFilter === tab.value ? "primary" : "ghost"}
              onPress={() => setStatusFilter(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <TextField className="w-44">
          <Label>Source</Label>
          <NativeSelect
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value as "all" | Source)}
          >
            <NativeSelectOption value="all">All</NativeSelectOption>
            {sources.map((source) => (
              <NativeSelectOption key={source.value} value={source.value}>
                {source.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </TextField>
      </div>

      {loading && rows.length === 0 ? (
        <p className="text-sm text-text-100">Loading watchlist…</p>
      ) : filteredEmpty ? (
        <p className="text-sm text-text-100">
          {filtersActive
            ? "No symbols match these filters."
            : "Nothing saved yet. Add a symbol above and it will show up here."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <TableRoot>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Setup</TableHead>
                <TableHead>Entry</TableHead>
                <TableHead>Stop</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>R/R</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="whitespace-nowrap text-title-50">{row.symbol}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.addedDate}</TableCell>
                  <TableCell>{sourceLabel(row.source)}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.setupType ?? "—"}</TableCell>
                  <TableCell>{fmt(row.plannedEntry)}</TableCell>
                  <TableCell>{fmt(row.stopLoss)}</TableCell>
                  <TableCell>{fmt(row.targetPrice)}</TableCell>
                  <TableCell>{fmt(row.rewardRisk)}</TableCell>
                  <TableCell>
                    <Badge color={statusColor(row.status)} size="sm">
                      {statusLabel(row.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge color={resultColor(row.result)} size="sm">
                      {resultLabel(row.result)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" appearance="outline" onPress={() => openEdit(row)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        appearance="outline"
                        onPress={() => setDeleteRow(row)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableRoot>
        </div>
      )}

      <Dialog
        isOpen={editRow !== null}
        onOpenChange={(open) => {
          if (!open && !editSaving) {
            setEditRow(null);
          }
        }}
      >
        {editRow ? (
          <>
            <DialogHeader>
              <DialogTitle>Update {editRow.symbol}</DialogTitle>
              <DialogDescription>Status, result, and notes.</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="grid gap-4">
                <TextField>
                  <Label>Status</Label>
                  <NativeSelect
                    value={editStatus}
                    onChange={(event) => setEditStatus(event.target.value as Status)}
                  >
                    {statuses.map((status) => (
                      <NativeSelectOption key={status.value} value={status.value}>
                        {status.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </TextField>
                <TextField>
                  <Label>Result</Label>
                  <NativeSelect
                    value={editResult}
                    onChange={(event) => setEditResult(event.target.value as Result)}
                  >
                    {results.map((result) => (
                      <NativeSelectOption key={result.value} value={result.value}>
                        {result.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </TextField>
                <TextField>
                  <Label>Notes</Label>
                  <TextArea rows={3} value={editNotes} onChange={setEditNotes} />
                </TextField>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button variant="ghost" disabled={editSaving} onPress={() => setEditRow(null)}>
                Cancel
              </Button>
              <Button disabled={editSaving} onPress={() => void onEditSave()}>
                {editSaving ? "Saving…" : "Save"}
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </Dialog>

      <Dialog
        isOpen={deleteRow !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) {
            setDeleteRow(null);
          }
        }}
      >
        {deleteRow ? (
          <>
            <DialogHeader>
              <DialogTitle>Delete {deleteRow.symbol}?</DialogTitle>
              <DialogDescription>This removes the row from your watchlist.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" disabled={deleting} onPress={() => setDeleteRow(null)}>
                Cancel
              </Button>
              <Button variant="danger" disabled={deleting} onPress={() => void onDelete()}>
                {deleting ? "Deleting…" : "Delete"}
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </Dialog>
    </section>
  );
}
