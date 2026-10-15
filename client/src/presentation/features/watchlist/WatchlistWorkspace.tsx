import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { TabContent, TabList, TabRoot, TabTrigger } from "@/components/ui/tabs";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";
import { Toast } from "@/components/ui/toast";
import { evaluateRowBuyGates } from "@/domain/watchlist/watchlist-row";
import type {
  WatchlistCategory,
  WatchlistDecision,
  WatchlistDraft,
  WatchlistGrade,
  WatchlistRow
} from "@/domain/watchlist/watchlist-row";
import { apiPaths } from "@/infrastructure/http/api-paths";
import { ApiError, httpJson } from "@/infrastructure/http/http-json";
import { PageHeader } from "@/presentation/layouts/PageHeader";
import { useClient } from "@/presentation/hooks/useClient";

type SectorOption = {
  id: number;
  name: string;
};

type BoardRow = {
  tradeDate: string;
  watchlistRank: number;
  scrip: string;
  category: string | null;
  earlyPct: number | null;
  earlyRank: number | null;
  strongPct: number | null;
  strongRank: number | null;
  signalPrice: number | null;
  sector: string | null;
  setupStage: string | null;
  marketStructure: string | null;
  relativeVolume: number | null;
  rsi14: number | null;
  preBreakoutScore: number | null;
};

type V0Row = {
  tradeDate: string;
  watchlistRank: number;
  scrip: string;
  category: string | null;
  chancePct: number | null;
  signalPrice: number | null;
  sector: string | null;
  setupStage: string | null;
  marketStructure: string | null;
  relativeVolume: number | null;
  breakoutPressure: number | null;
  resistanceDistancePct: number | null;
};

type SummaryRow = {
  summaryRank: number;
  scrip: string;
  dayCount: number;
  windowDays: number;
  streak: number;
  models: string;
  latestDate: string;
  category: string | null;
  v0Pct: number | null;
  earlyPct: number | null;
  strongPct: number | null;
  signalPrice: number | null;
  sector: string | null;
  marketStructure: string | null;
  windowFrom: string;
  windowTo: string;
};

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

function num(value: string): number | null {
  if (value.trim() === "") {
    return null;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function fmt(value: number | null, digits = 2) {
  return value === null ? "—" : value.toFixed(digits);
}

function decisionColor(decision: WatchlistDecision) {
  if (decision === "BUY") {
    return "success" as const;
  }
  if (decision === "SKIP") {
    return "error" as const;
  }
  return "gray" as const;
}

type SignalSource = "" | "V1" | "V2" | "BO" | "HUMAN";
type EntryCategory = WatchlistCategory | "EXTENDED";

type FormState = {
  date: string;
  scrip: string;
  source: SignalSource;
  category: EntryCategory;
  probability: string;
  streak: string;
  runUpPct: string;
  signalPrice: string;
  setupStage: string;
  marketStructure: string;
  sectorId: string;
  grade: "" | WatchlistGrade;
  decision: "" | WatchlistDecision;
  planEntry: string;
  planStop: string;
  planTarget: string;
  decisionReason: string;
};

function emptyForm(date: string): FormState {
  return {
    date,
    scrip: "",
    source: "",
    category: "PRIME",
    probability: "",
    streak: "",
    runUpPct: "",
    signalPrice: "",
    setupStage: "",
    marketStructure: "",
    sectorId: "",
    grade: "",
    decision: "",
    planEntry: "",
    planStop: "",
    planTarget: "",
    decisionReason: ""
  };
}

function fromRow(row: WatchlistRow): FormState {
  return {
    date: row.date,
    scrip: row.scrip,
    source: "",
    category: row.category,
    probability: row.prob === null ? "" : String(row.prob),
    streak: row.streak === null ? "" : String(row.streak),
    runUpPct: row.runUpPct === null ? "" : String(row.runUpPct),
    signalPrice: row.close === null ? "" : String(row.close),
    setupStage: row.setupStage ?? "",
    marketStructure: row.marketStructure ?? "",
    sectorId: row.sectorId === null ? "" : String(row.sectorId),
    grade: row.grade ?? "",
    decision: row.decision,
    planEntry: row.planEntry === null ? "" : String(row.planEntry),
    planStop: row.planStop === null ? "" : String(row.planStop),
    planTarget: row.planTarget === null ? "" : String(row.planTarget),
    decisionReason: row.skipReason ?? ""
  };
}

/** (target - entry) / (entry - stop). Blank until entry is above the stop. */
function previewRewardRisk(form: FormState): number | null {
  const entry = num(form.planEntry);
  const stop = num(form.planStop);
  const target = num(form.planTarget);
  if (entry === null || stop === null || target === null || !(entry > stop)) {
    return null;
  }
  return (target - entry) / (entry - stop);
}

function intOrNull(value: string): number | null {
  const n = num(value);
  return n === null ? null : Math.trunc(n);
}

function ScripLink({ scrip }: { scrip: string }) {
  const symbol = encodeURIComponent(scrip.trim());
  return (
    <a
      className="text-title-50 underline-offset-2 hover:underline"
      href={`https://stocknow.com.bd/search?symbol=${symbol}`}
      target="_blank"
      rel="noreferrer"
    >
      {scrip}
    </a>
  );
}

/** Stable id so the same scrip updates one signal row. The form does not collect a stock id. */
function stockIdFromScrip(scrip: string): number {
  let hash = 0;
  for (const char of scrip) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return (hash % 2_000_000_000) || 1;
}

type EntryPayload = {
  trade_date: string;
  scrip: string;
  source: Exclude<SignalSource, "">;
  category: EntryCategory | null;
  probability: number | null;
  streak: number | null;
  run_up_pct: number | null;
  signal_price: number | null;
  setup_stage: string | null;
  market_structure: string | null;
  sector_id: number | null;
  human_grade: WatchlistGrade | null;
  decision: WatchlistDecision | null;
  planned_entry: number | null;
  planned_stop: number | null;
  planned_target: number | null;
  risk_reward: number | null;
  decision_reason: string | null;
};

function toEntryPayload(form: FormState): EntryPayload {
  const scrip = form.scrip.trim().toUpperCase();
  return {
    trade_date: form.date,
    scrip,
    source: form.source as Exclude<SignalSource, "">,
    category: form.category || null,
    probability: num(form.probability),
    streak: intOrNull(form.streak),
    run_up_pct: num(form.runUpPct),
    signal_price: num(form.signalPrice),
    setup_stage: form.setupStage.trim() || null,
    market_structure: form.marketStructure.trim() || null,
    sector_id: intOrNull(form.sectorId),
    human_grade: form.grade || null,
    decision: form.decision || null,
    planned_entry: num(form.planEntry),
    planned_stop: num(form.planStop),
    planned_target: num(form.planTarget),
    risk_reward: previewRewardRisk(form),
    decision_reason: form.decisionReason.trim() || null
  };
}

function legacyCategory(category: EntryCategory): WatchlistCategory | null {
  if (category === "EXTENDED") {
    return null;
  }
  return category;
}

function toLegacyDraft(form: FormState): WatchlistDraft | null {
  const category = legacyCategory(form.category);
  if (!category) {
    return null;
  }
  const payload = toEntryPayload(form);
  return {
    date: payload.trade_date,
    scrip: payload.scrip,
    category,
    grade: payload.human_grade,
    prob: payload.probability,
    streak: payload.streak,
    runUpPct: payload.run_up_pct,
    close: payload.signal_price,
    marketStructure: payload.market_structure,
    setupStage: payload.setup_stage,
    sectorId: payload.sector_id,
    planEntry: payload.planned_entry,
    planStop: payload.planned_stop,
    planTarget: payload.planned_target,
    decision: payload.decision ?? "WATCH",
    skipReason: payload.decision === "SKIP" ? payload.decision_reason : null
  };
}

/** Signal row stores model fields. Streak and run-up live in extra_metrics. */
async function saveSignal(payload: EntryPayload): Promise<void> {
  await httpJson("POST", `${apiPaths.watchlist}/save`, {
    trade_date: payload.trade_date,
    source: payload.source,
    signals: [
      {
        stock_id: stockIdFromScrip(payload.scrip),
        scrip: payload.scrip,
        probability: payload.probability,
        category: payload.category,
        signal_price: payload.signal_price,
        setup_stage: payload.setup_stage,
        market_structure: payload.market_structure,
        sector_id: payload.sector_id,
        extra_metrics: {
          streak: payload.streak,
          run_up_pct: payload.run_up_pct,
          risk_reward: payload.risk_reward
        }
      }
    ]
  });
}

async function saveSelection(payload: EntryPayload): Promise<void> {
  if (!payload.decision) {
    return;
  }
  await httpJson("POST", `${apiPaths.watchlist}/selection`, {
    trade_date: payload.trade_date,
    stock_id: stockIdFromScrip(payload.scrip),
    scrip: payload.scrip,
    decision: payload.decision,
    human_grade: payload.human_grade,
    decision_reason: payload.decision_reason,
    planned_entry: payload.planned_entry,
    planned_stop: payload.planned_stop,
    planned_target: payload.planned_target,
    risk_reward: payload.risk_reward
  });
}

function groupByDateDesc<T extends { tradeDate: string }>(rows: T[]) {
  const groups = new Map<string, T[]>();
  for (const row of rows) {
    const list = groups.get(row.tradeDate) ?? [];
    list.push(row);
    groups.set(row.tradeDate, list);
  }
  return [...groups.entries()].sort(([a], [b]) => b.localeCompare(a));
}

export function WatchlistWorkspace() {
  const client = useClient();
  const [rows, setRows] = useState<BoardRow[]>([]);
  const [v0Rows, setV0Rows] = useState<V0Row[]>([]);
  const [summaryRows, setSummaryRows] = useState<SummaryRow[]>([]);
  const [summaryModels, setSummaryModels] = useState<"all" | "v0" | "v12">("all");
  const [stockQuery, setStockQuery] = useState("");
  const [stockSearch, setStockSearch] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [date, setDate] = useState(todayUtc);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(() => emptyForm(todayUtc()));
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [decideRow, setDecideRow] = useState<WatchlistRow | null>(null);
  const [skipReason, setSkipReason] = useState("");
  const [deciding, setDeciding] = useState(false);
  const [sectors, setSectors] = useState<SectorOption[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = date ? `?date=${encodeURIComponent(date)}` : "";
      const [payload, v0] = await Promise.all([
        httpJson<{ data: BoardRow[] }>("GET", `${apiPaths.watchlist}/board${query}`),
        httpJson<{ data: V0Row[] }>("GET", `${apiPaths.watchlist}/v0${query}`)
      ]);
      setRows(payload.data);
      setV0Rows(v0.data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not load watchlist");
      setRows([]);
      setV0Rows([]);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const timer = window.setTimeout(() => setStockSearch(stockQuery.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [stockQuery]);

  useEffect(() => {
    let cancelled = false;
    setSummaryLoading(true);
    const params = new URLSearchParams();
    if (date) {
      params.set("date", date);
    }
    if (summaryModels !== "all") {
      params.set("models", summaryModels);
    }
    if (stockSearch) {
      params.set("scrip", stockSearch);
    }
    const queryText = params.toString();
    const query = queryText ? `?${queryText}` : "";
    void httpJson<{ data: SummaryRow[] }>("GET", `${apiPaths.watchlist}/summary${query}`)
      .then((payload) => {
        if (!cancelled) {
          setSummaryRows(payload.data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "Could not load summary");
          setSummaryRows([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setSummaryLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [date, summaryModels, stockSearch]);

  useEffect(() => {
    let cancelled = false;
    void httpJson<{ data: SectorOption[] }>("GET", "/api/v1/sectors")
      .then((payload) => {
        if (!cancelled) {
          setSectors(payload.data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSectors([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (formOpen) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [formOpen, editingId]);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm(date));
    setFormOpen(true);
  }

  function openEdit(row: WatchlistRow) {
    setEditingId(row.id);
    setForm(fromRow(row));
    setFormOpen(true);
  }

  function closeForm() {
    setEditingId(null);
    setForm(emptyForm(date));
    setFormOpen(false);
  }

  const groups = useMemo(() => groupByDateDesc(rows), [rows]);
  const v0Groups = useMemo(() => groupByDateDesc(v0Rows), [v0Rows]);

  async function onSaveRow(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    if (!form.date || !form.scrip.trim() || !form.source) {
      setError("Date, scrip, and source are required.");
      return;
    }
    if (form.source !== "HUMAN" && form.probability.trim() === "") {
      setError("Probability is expected for a model signal.");
      return;
    }
    if (form.decision === "SKIP" && !form.decisionReason.trim()) {
      setError("A reason is required when the decision is SKIP.");
      return;
    }
    setSaving(true);
    try {
      const payload = toEntryPayload(form);
      const legacy = toLegacyDraft(form);
      await saveSignal(payload);
      await saveSelection(payload);
      if (legacy) {
        if (editingId) {
          await client.patchWatchlistRow.execute(editingId, legacy);
        } else {
          await client.saveWatchlistRow.execute(legacy);
        }
      }
      const label = editingId ? "updated" : "added";
      setEditingId(null);
      setForm(emptyForm(form.date));
      setNotice(`${payload.scrip} ${label}.`);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save row");
    } finally {
      setSaving(false);
    }
  }

  async function onDecide(decision: WatchlistDecision) {
    if (!decideRow) {
      return;
    }
    setDeciding(true);
    setError(null);
    try {
      await client.decideWatchlistRow.execute(
        decideRow.id,
        decision,
        decision === "SKIP" ? skipReason : null
      );
      setDecideRow(null);
      setSkipReason("");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Decision rejected");
    } finally {
      setDeciding(false);
    }
  }

  return (
    <section>
      <PageHeader
        title="Daily Watchlist"
        description="V1 and V2 stay on the first tab. Early is +15% within 3 days. Strong is +20% within 5 days. V0 is the chance of touching +5% within 5 days. Summary rolls the last five list days into one row per stock."
        actions={
          <Button iconOnly size="sm" aria-label="Add watchlist row" onPress={openAdd}>
            <PlusIcon />
          </Button>
        }
      />

      {notice ? (
        <div className="mb-4">
          <Toast variant="success" message={notice} />
        </div>
      ) : null}

      {formOpen ? (
      <div ref={formRef}>
      <Card className="mb-6 border border-base-100 shadow-xs">
        <CardHeader>
          <CardTitle className="text-lg">
            {editingId ? `Edit ${form.scrip || "scrip"}` : "New Watchlist Entry"}
          </CardTitle>
          <CardDescription>
            Signal first, then your plan. Reward/risk is calculated from the prices.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-5">
          <form className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" onSubmit={onSaveRow}>
            {/* Signal source: which list and which model produced the name. */}
            <SectionLabel dotClass="bg-primary-500">Signal source</SectionLabel>
            <TextField>
              <Label>Trade date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(event) => setForm({ ...form, date: event.target.value })}
                required
              />
            </TextField>
            <TextField>
              <Label>Scrip</Label>
              <Input
                value={form.scrip}
                onChange={(event) => setForm({ ...form, scrip: event.target.value.toUpperCase() })}
                required
                autoComplete="off"
              />
            </TextField>
            <div className="flex flex-col gap-3">
              <Label>Source</Label>
              <NativeSelect
                value={form.source}
                onChange={(event) =>
                  setForm({ ...form, source: event.target.value as SignalSource })
                }
                required
              >
                <NativeSelectOption value="">Select</NativeSelectOption>
                <NativeSelectOption value="V1">V1</NativeSelectOption>
                <NativeSelectOption value="V2">V2</NativeSelectOption>
                <NativeSelectOption value="BO">BO</NativeSelectOption>
                <NativeSelectOption value="HUMAN">HUMAN</NativeSelectOption>
              </NativeSelect>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <NativeSelect
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value as EntryCategory })
                }
              >
                <NativeSelectOption value="PRIME">PRIME</NativeSelectOption>
                <NativeSelectOption value="GOOD">GOOD</NativeSelectOption>
                <NativeSelectOption value="NEW">NEW</NativeSelectOption>
                <NativeSelectOption value="EXTENDED">EXTENDED</NativeSelectOption>
                {form.category === "LIVE" ? (
                  <NativeSelectOption value="LIVE">LIVE</NativeSelectOption>
                ) : null}
              </NativeSelect>
            </div>

            {/* Model signal. Optional when the source is a human pick. */}
            <SectionLabel dotClass="bg-info-500">Model signal</SectionLabel>
            <TextField>
              <Label>Probability</Label>
              <Input
                type="number"
                min="0"
                max="1"
                step="0.01"
                placeholder="0.00–1.00"
                value={form.probability}
                onChange={(event) => setForm({ ...form, probability: event.target.value })}
                required={form.source !== "" && form.source !== "HUMAN"}
              />
            </TextField>
            <TextField>
              <Label>Streak</Label>
              <Input
                type="number"
                step="1"
                value={form.streak}
                onChange={(event) => setForm({ ...form, streak: event.target.value })}
              />
            </TextField>
            <TextField>
              <Label>Run-up %</Label>
              <Input
                type="number"
                step="0.01"
                value={form.runUpPct}
                onChange={(event) => setForm({ ...form, runUpPct: event.target.value })}
              />
            </TextField>
            <TextField>
              <Label>Signal price</Label>
              <Input
                type="number"
                step="0.01"
                value={form.signalPrice}
                onChange={(event) => setForm({ ...form, signalPrice: event.target.value })}
              />
            </TextField>
            <TextField>
              <Label>Setup stage</Label>
              <Input
                value={form.setupStage}
                onChange={(event) => setForm({ ...form, setupStage: event.target.value })}
              />
            </TextField>
            <TextField>
              <Label>Market structure</Label>
              <Input
                value={form.marketStructure}
                onChange={(event) =>
                  setForm({ ...form, marketStructure: event.target.value })
                }
              />
            </TextField>
            <div className="flex flex-col gap-3">
              <Label>Sector</Label>
              <NativeSelect
                value={form.sectorId}
                onChange={(event) => setForm({ ...form, sectorId: event.target.value })}
              >
                <NativeSelectOption value="">Unset</NativeSelectOption>
                {sectors.map((sector) => (
                  <NativeSelectOption key={sector.id} value={String(sector.id)}>
                    {sector.name}
                  </NativeSelectOption>
                ))}
                {form.sectorId &&
                !sectors.some((sector) => String(sector.id) === form.sectorId) ? (
                  <NativeSelectOption value={form.sectorId}>
                    {`Sector ${form.sectorId}`}
                  </NativeSelectOption>
                ) : null}
              </NativeSelect>
            </div>

            {/* Human plan. Reward/risk is derived and is not an input. */}
            <SectionLabel dotClass="bg-success-500">My trade plan</SectionLabel>
            <div className="flex flex-col gap-3">
              <Label>Grade</Label>
              <NativeSelect
                value={form.grade}
                onChange={(event) =>
                  setForm({ ...form, grade: event.target.value as FormState["grade"] })
                }
              >
                <NativeSelectOption value="">Unset</NativeSelectOption>
                <NativeSelectOption value="A">A</NativeSelectOption>
                <NativeSelectOption value="B">B</NativeSelectOption>
                <NativeSelectOption value="C">C</NativeSelectOption>
              </NativeSelect>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Decision</Label>
              <NativeSelect
                value={form.decision}
                onChange={(event) =>
                  setForm({ ...form, decision: event.target.value as FormState["decision"] })
                }
              >
                <NativeSelectOption value="">Unset</NativeSelectOption>
                <NativeSelectOption value="BUY">BUY</NativeSelectOption>
                <NativeSelectOption value="WATCH">WATCH</NativeSelectOption>
                <NativeSelectOption value="SKIP">SKIP</NativeSelectOption>
              </NativeSelect>
            </div>
            <TextField>
              <Label>Planned entry</Label>
              <Input
                type="number"
                step="0.01"
                value={form.planEntry}
                onChange={(event) => setForm({ ...form, planEntry: event.target.value })}
              />
            </TextField>
            <TextField>
              <Label>Planned stop</Label>
              <Input
                type="number"
                step="0.01"
                value={form.planStop}
                onChange={(event) => setForm({ ...form, planStop: event.target.value })}
              />
            </TextField>
            <TextField>
              <Label>Planned target</Label>
              <Input
                type="number"
                step="0.01"
                value={form.planTarget}
                onChange={(event) => setForm({ ...form, planTarget: event.target.value })}
              />
            </TextField>
            <div className="flex flex-col justify-end gap-2">
              <Label>Reward / risk</Label>
              {previewRewardRisk(form) === null ? (
                <span className="text-sm text-text-100">—</span>
              ) : (
                <Badge color="primary" size="sm" className="w-fit">
                  {previewRewardRisk(form)!.toFixed(1)} R
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-4">
              <Label>Decision reason</Label>
              <TextArea
                rows={3}
                value={form.decisionReason}
                onChange={(value) => setForm({ ...form, decisionReason: value })}
              />
            </div>
            <div className="flex items-center justify-end gap-2 sm:col-span-2 lg:col-span-4">
              <Button type="button" variant="ghost" onPress={closeForm}>
                Close
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : editingId ? "Update" : "Add to List"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
      ) : null}

      <div className="mb-4 flex flex-wrap items-end gap-3">
        <TextField className="w-44">
          <Label>List day</Label>
          <Input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </TextField>
        <p className="pb-2 text-sm text-text-100">
          {loading ? "Loading…" : "Same list day for every tab. Summary looks back five list days."}
        </p>
      </div>

      {error ? (
        <p className="mb-4 text-sm text-danger-500" role="alert">
          {error}
        </p>
      ) : null}

      <TabRoot defaultValue="v12" variant="minimal" className="border-0 bg-transparent p-0 shadow-none">
        <TabList>
          <TabTrigger value="v12">V1 / V2</TabTrigger>
          <TabTrigger value="v0">V0</TabTrigger>
          <TabTrigger value="summary">Summary</TabTrigger>
        </TabList>
        <TabContent value="v12" className="px-0 pt-4">
          {loading ? null : groups.length === 0 ? (
            <p className="text-sm text-text-100">No V1 or V2 rows yet.</p>
          ) : (
            groups.map(([day, dayRows]) => (
              <div key={day} className="mb-6">
                <h2 className="mb-2 text-sm font-semibold text-title-50">
                  {day} · {dayRows.length} rows
                </h2>
                <div className="overflow-x-auto">
                  <TableRoot>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Scrip</TableHead>
                        <TableHead>Cat</TableHead>
                        <TableHead>Early %</TableHead>
                        <TableHead>Early rank</TableHead>
                        <TableHead>Strong %</TableHead>
                        <TableHead>Strong rank</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead>Setup</TableHead>
                        <TableHead>Structure</TableHead>
                        <TableHead>Rel vol</TableHead>
                        <TableHead>RSI</TableHead>
                        <TableHead>Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dayRows.map((row) => (
                        <TableRow key={`${row.tradeDate}-${row.watchlistRank}-${row.scrip}`}>
                          <TableCell>{row.watchlistRank}</TableCell>
                          <TableCell>
                            <ScripLink scrip={row.scrip} />
                          </TableCell>
                          <TableCell>{row.category ?? "—"}</TableCell>
                          <TableCell>{row.earlyPct === null ? "—" : `${fmt(row.earlyPct)}%`}</TableCell>
                          <TableCell>{row.earlyRank ?? "—"}</TableCell>
                          <TableCell>{row.strongPct === null ? "—" : `${fmt(row.strongPct)}%`}</TableCell>
                          <TableCell>{row.strongRank ?? "—"}</TableCell>
                          <TableCell>{fmt(row.signalPrice)}</TableCell>
                          <TableCell>{row.sector ?? "—"}</TableCell>
                          <TableCell>{row.setupStage ?? "—"}</TableCell>
                          <TableCell>{row.marketStructure ?? "—"}</TableCell>
                          <TableCell>{fmt(row.relativeVolume)}</TableCell>
                          <TableCell>{fmt(row.rsi14, 1)}</TableCell>
                          <TableCell>{fmt(row.preBreakoutScore)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TableRoot>
                </div>
              </div>
            ))
          )}
        </TabContent>
        <TabContent value="v0" className="px-0 pt-4">
          {loading ? null : v0Groups.length === 0 ? (
            <p className="text-sm text-text-100">No V0 rows for this day.</p>
          ) : (
            v0Groups.map(([day, dayRows]) => (
              <div key={day} className="mb-6">
                <h2 className="mb-2 text-sm font-semibold text-title-50">
                  {day} · {dayRows.length} rows · chance of touching +5% within 5 days
                </h2>
                <div className="overflow-x-auto">
                  <TableRoot>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Scrip</TableHead>
                        <TableHead>Cat</TableHead>
                        <TableHead>Chance %</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead>Setup</TableHead>
                        <TableHead>Structure</TableHead>
                        <TableHead>Rel vol</TableHead>
                        <TableHead>Pressure</TableHead>
                        <TableHead>Resistance %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dayRows.map((row) => (
                        <TableRow key={`${row.tradeDate}-${row.watchlistRank}-${row.scrip}`}>
                          <TableCell>{row.watchlistRank}</TableCell>
                          <TableCell>
                            <ScripLink scrip={row.scrip} />
                          </TableCell>
                          <TableCell>{row.category ?? "—"}</TableCell>
                          <TableCell>{row.chancePct === null ? "—" : `${fmt(row.chancePct)}%`}</TableCell>
                          <TableCell>{fmt(row.signalPrice)}</TableCell>
                          <TableCell>{row.sector ?? "—"}</TableCell>
                          <TableCell>{row.setupStage ?? "—"}</TableCell>
                          <TableCell>{row.marketStructure ?? "—"}</TableCell>
                          <TableCell>{fmt(row.relativeVolume)}</TableCell>
                          <TableCell>{fmt(row.breakoutPressure)}</TableCell>
                          <TableCell>
                            {row.resistanceDistancePct === null
                              ? "—"
                              : `${fmt(row.resistanceDistancePct)}%`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TableRoot>
                </div>
              </div>
            ))
          )}
        </TabContent>
        <TabContent value="summary" className="px-0 pt-4">
          <div className="mb-4 flex flex-wrap items-end gap-3">
            <TextField className="w-44">
              <Label>Models</Label>
              <NativeSelect
                value={summaryModels}
                onChange={(event) =>
                  setSummaryModels(event.target.value as "all" | "v0" | "v12")
                }
              >
                <NativeSelectOption value="all">All</NativeSelectOption>
                <NativeSelectOption value="v0">V0</NativeSelectOption>
                <NativeSelectOption value="v12">V1 &amp; V2</NativeSelectOption>
              </NativeSelect>
            </TextField>
            <TextField className="w-52">
              <Label>Stock</Label>
              <Input
                value={stockQuery}
                placeholder="Scrip"
                onChange={(event) => setStockQuery(event.target.value)}
              />
            </TextField>
          </div>
          {summaryLoading && summaryRows.length === 0 ? (
            <p className="text-sm text-text-100">Loading summary…</p>
          ) : summaryRows.length === 0 ? (
            <p className="text-sm text-text-100">No stock matches that filter in the last five list days.</p>
          ) : (
            <div className="mb-6">
              <h2 className="mb-1 text-sm font-semibold text-title-50">
                {summaryRows[0].windowFrom} to {summaryRows[0].windowTo} · {summaryRows.length} stocks
              </h2>
              <p className="mb-2 text-sm text-text-100">
                Filtered in the database. One row per stock. Days counts only the selected models.
              </p>
              <div className="overflow-x-auto">
                <TableRoot>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Scrip</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Streak</TableHead>
                      <TableHead>Models</TableHead>
                      <TableHead>Latest</TableHead>
                      <TableHead>Cat</TableHead>
                      <TableHead>V0 %</TableHead>
                      <TableHead>Early %</TableHead>
                      <TableHead>Strong %</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Structure</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {summaryRows.map((row) => (
                      <TableRow key={row.scrip}>
                        <TableCell>{row.summaryRank}</TableCell>
                        <TableCell>
                          <ScripLink scrip={row.scrip} />
                        </TableCell>
                        <TableCell>
                          {row.dayCount}/{row.windowDays}
                        </TableCell>
                        <TableCell>{row.streak}</TableCell>
                        <TableCell>{row.models}</TableCell>
                        <TableCell>{row.latestDate}</TableCell>
                        <TableCell>{row.category ?? "—"}</TableCell>
                        <TableCell>{row.v0Pct === null ? "—" : `${fmt(row.v0Pct)}%`}</TableCell>
                        <TableCell>{row.earlyPct === null ? "—" : `${fmt(row.earlyPct)}%`}</TableCell>
                        <TableCell>{row.strongPct === null ? "—" : `${fmt(row.strongPct)}%`}</TableCell>
                        <TableCell>{fmt(row.signalPrice)}</TableCell>
                        <TableCell>{row.sector ?? "—"}</TableCell>
                        <TableCell>{row.marketStructure ?? "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableRoot>
              </div>
            </div>
          )}
        </TabContent>
      </TabRoot>

      <Dialog
        isOpen={decideRow !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDecideRow(null);
          }
        }}
      >
        {decideRow ? (
          <>
            <DialogHeader>
              <DialogTitle>Decide {decideRow.scrip}</DialogTitle>
              <DialogDescription>
                {evaluateRowBuyGates(decideRow).allowed
                  ? "Gates pass. BUY is allowed."
                  : evaluateRowBuyGates(decideRow).reasons.join(" · ")}
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <TextField>
                <Label>Skip reason (required for SKIP)</Label>
                <Input
                  value={skipReason}
                  onChange={(event) => setSkipReason(event.target.value)}
                />
              </TextField>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="ghost"
                disabled={deciding}
                onPress={() => void onDecide("WATCH")}
              >
                WATCH
              </Button>
              <Button
                appearance="outline"
                disabled={deciding}
                onPress={() => void onDecide("SKIP")}
              >
                SKIP
              </Button>
              <Button disabled={deciding} onPress={() => void onDecide("BUY")}>
                BUY
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </Dialog>
    </section>
  );
}

function SectionLabel({
  children,
  dotClass
}: {
  children: string;
  dotClass: string;
}) {
  return (
    <div className="mt-2 flex items-center gap-2 sm:col-span-2 lg:col-span-4">
      <span className={`size-1.5 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
      <span className="text-xs font-medium uppercase tracking-wide text-text-100">{children}</span>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
