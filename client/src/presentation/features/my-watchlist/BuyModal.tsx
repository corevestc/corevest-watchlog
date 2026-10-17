import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";
import { apiPaths } from "@/infrastructure/http/api-paths";
import { ApiError, httpJson } from "@/infrastructure/http/http-json";
import { asPlan, floorMaxQty, liveGates, rewardRiskTo, type TradingRules } from "./discipline";

type BuyRow = {
  id: string;
  symbol: string;
  plannedEntry: number | null;
  stopLoss: number | null;
  targetPrice: number | null;
  latestClose?: number | null;
  latestCloseDate?: string | null;
};

const checks = [
  { key: "volume", label: "Volume confirms" },
  { key: "setup", label: "Setup aligns" },
  { key: "chase", label: "Not chasing" },
  { key: "size", label: "Size ok" }
] as const;

const mindsets = ["calm", "confident", "FOMO", "anxious"] as const;

const terms = [
  { value: "short", label: "Short term · 10 days" },
  { value: "mid", label: "Mid term · 30 days" },
  { value: "long", label: "Long term · 3 months + 1 day" }
] as const;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function todayLocal() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function isoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Short is 10 days, mid is 30 days, long is one day past 3 calendar months. */
function targetDateForTerm(buyDate: string, term: string) {
  const [year, month, day] = buyDate.split("-").map(Number);
  if (!year || !month || !day) {
    return "";
  }
  if (term === "short") {
    return isoDate(new Date(year, month - 1, day + 10));
  }
  if (term === "mid") {
    return isoDate(new Date(year, month - 1, day + 30));
  }
  if (term === "long") {
    return isoDate(new Date(year, month - 1 + 3, day + 1));
  }
  return "";
}

function marketLabel(price: number | null | undefined, date: string | null | undefined) {
  if (price == null || !Number.isFinite(price)) {
    return "—";
  }
  const stamp = date?.slice(0, 10) ?? "";
  const [year, month, day] = stamp.split("-");
  const monthName = months[Number(month) - 1];
  const asOf = monthName && day && year ? ` (as of ${Number(day)}-${monthName}-${year})` : "";
  return `${price.toFixed(2)}${asOf}`;
}

function money(value: number | null) {
  return value === null ? "—" : value.toFixed(2);
}

export function BuyModal({
  row,
  rules,
  openPositions,
  realizedPnlToday,
  cooldownSymbols,
  onClose,
  onOpened,
  onError
}: {
  row: BuyRow | null;
  rules: TradingRules | null;
  openPositions: number;
  realizedPnlToday: number;
  cooldownSymbols: string[];
  onClose: () => void;
  onOpened: () => void;
  onError: (message: string) => void;
}) {
  const [buyDate, setBuyDate] = useState(todayLocal);
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [ticks, setTicks] = useState([false, false, false, false]);
  const [mindset, setMindset] = useState("");
  const [target2, setTarget2] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [term, setTerm] = useState("");
  const [overrideReason, setOverrideReason] = useState("");
  const [saving, setSaving] = useState(false);

  const plan = row ? asPlan(row.plannedEntry, row.stopLoss, row.targetPrice) : null;
  const ready = plan !== null && rules !== null;
  const buyPrice = price.trim() === "" ? null : Number(price);
  const qtyNumber = qty.trim() === "" ? null : Number(qty);
  const target2Number = target2.trim() === "" ? null : Number(target2);
  const priceOk = buyPrice !== null && Number.isFinite(buyPrice) && buyPrice > 0;
  const target2Ok =
    target2Number === null ||
    (plan !== null && Number.isFinite(target2Number) && target2Number > plan.target);
  const targetDateOk = targetDate === "" || targetDate >= buyDate;

  const maxQty =
    plan && rules && buyPrice !== null && Number.isFinite(buyPrice) && buyPrice > 0
      ? floorMaxQty(buyPrice, plan.stop, rules.accountCapital, rules.riskPerTradePct)
      : null;

  const gates = useMemo(() => {
    if (!ready || !row || !rules || !plan) {
      return [];
    }
    return liveGates({
      entry: plan.entry,
      stop: plan.stop,
      target: plan.target,
      buyPrice: buyPrice !== null && Number.isFinite(buyPrice) && buyPrice > 0 ? buyPrice : null,
      qty: qtyNumber !== null && Number.isFinite(qtyNumber) ? qtyNumber : null,
      rules,
      openPositions,
      realizedPnlToday,
      cooldown: cooldownSymbols.includes(row.symbol)
    });
  }, [ready, row, plan, rules, priceOk, buyPrice, qtyNumber, openPositions, realizedPnlToday, cooldownSymbols]);

  const failed = gates.some((gate) => !gate.pass);
  const checked = ticks.every(Boolean);
  const qtyOk = qtyNumber !== null && Number.isInteger(qtyNumber) && qtyNumber > 0;
  const canConfirm =
    plan !== null &&
    buyDate !== "" &&
    priceOk &&
    target2Ok &&
    targetDateOk &&
    qtyOk &&
    checked;

  const rewardRisk = plan === null ? null : rewardRiskTo(plan.entry, plan.stop, plan.target);
  const rewardRisk2 =
    plan === null || target2Number === null || !Number.isFinite(target2Number)
      ? null
      : rewardRiskTo(plan.entry, plan.stop, target2Number);

  async function confirm() {
    if (!row || !canConfirm || buyPrice === null || qtyNumber === null) {
      return;
    }
    setSaving(true);
    try {
      await httpJson("POST", `${apiPaths.trades}/open`, {
        watchlistId: row.id,
        buyDate,
        buyPrice,
        qty: qtyNumber,
        checklist: {
          volume: ticks[0],
          setup: ticks[1],
          notChasing: ticks[2],
          size: ticks[3]
        },
        ...(mindset ? { mindset } : {}),
        ...(target2Number !== null ? { target2: target2Number } : {}),
        ...(targetDate ? { targetDate } : {}),
        ...(term ? { term } : {}),
        ...(failed ? { overrideReason: overrideReason.trim() } : {})
      });
      onOpened();
    } catch (err) {
      onError(err instanceof ApiError ? err.message : "Could not open the trade");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      className="!max-w-4xl max-h-[calc(100vh-2rem)] overflow-y-auto"
      isOpen={row !== null}
      onOpenChange={(open) => {
        if (!open && !saving) {
          onClose();
        }
      }}
    >
      {row && plan ? (
        <>
          <DialogHeader>
            <DialogTitle>Buy {row.symbol}</DialogTitle>
            <DialogDescription>Gates are checked here and again on the server.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="grid gap-4">
              <div className="grid gap-2">
                {gates.map((gate) => (
                  <div key={gate.rule} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-title-50">{gate.label}</span>
                    <span className="text-text-100">{gate.detail}</span>
                    <Badge color={gate.pass ? "success" : "error"} size="sm">
                      {gate.pass ? "PASS" : "FAIL"}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <TextField>
                  <Label>Buy date</Label>
                  <Input
                    type="date"
                    required
                    value={buyDate}
                    onChange={(event) => {
                      const next = event.target.value;
                      setBuyDate(next);
                      if (term) {
                        setTargetDate(targetDateForTerm(next, term));
                      }
                    }}
                  />
                </TextField>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-input-label-text">Market price</p>
                  <div className="flex h-11 items-center">
                    <Badge color="gray" size="md">
                      {marketLabel(row.latestClose, row.latestCloseDate)}
                    </Badge>
                  </div>
                </div>
                <TextField>
                  <Label>Buy price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </TextField>
                <TextField>
                  <Label>Qty</Label>
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={qty}
                    onChange={(event) => setQty(event.target.value)}
                  />
                </TextField>
              </div>
              <div className="grid gap-3 rounded-lg border border-base-100 px-3 py-3 sm:grid-cols-3">
                <p className="text-sm sm:col-span-3 text-title-50">Size</p>
                <p className="text-sm text-text-100">Risk % <span className="font-medium text-title-50">{rules ? rules.riskPerTradePct : "—"}</span></p>
                <p className="text-sm text-text-100">Suggested qty <span className="font-medium text-title-50">{maxQty === null ? "—" : maxQty}</span></p>
                <p className="text-sm text-text-100">Max qty <span className="font-medium text-title-50">{maxQty === null ? "—" : maxQty}</span></p>
              </div>
              <div className="grid gap-3 rounded-lg border border-base-100 px-3 py-3 sm:grid-cols-3">
                <p className="text-sm sm:col-span-3 text-title-50">Plan</p>
                <p className="text-sm text-text-100">Stop <span className="font-medium text-title-50">{money(plan.stop)}</span></p>
                <p className="text-sm text-text-100">Target <span className="font-medium text-title-50">{money(plan.target)}</span></p>
                <p className="text-sm text-text-100">R/R <span className="font-medium text-title-50">{rewardRisk === null ? "—" : rewardRisk.toFixed(2)}</span></p>
                <TextField className="sm:col-span-2">
                  <Label>Target 2</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={target2}
                    onChange={(event) => setTarget2(event.target.value)}
                  />
                </TextField>
                <p className="text-sm text-text-100">R/R 2 <span className="font-medium text-title-50">{rewardRisk2 === null ? "—" : rewardRisk2.toFixed(2)}</span></p>
                {target2Number !== null && !target2Ok ? (
                  <p className="text-sm text-danger-500 sm:col-span-3">Second target must be above the plan target</p>
                ) : null}
                <TextField>
                  <Label>Term</Label>
                  <NativeSelect
                    value={term}
                    onChange={(event) => {
                      const next = event.target.value;
                      setTerm(next);
                      setTargetDate(next ? targetDateForTerm(buyDate, next) : "");
                    }}
                  >
                    <NativeSelectOption value="">—</NativeSelectOption>
                    {terms.map((item) => (
                      <NativeSelectOption key={item.value} value={item.value}>
                        {item.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </TextField>
                <TextField>
                  <Label>Target date</Label>
                  <Input type="date" value={targetDate} onChange={(event) => setTargetDate(event.target.value)} />
                </TextField>
                {targetDate !== "" && !targetDateOk ? (
                  <p className="text-sm text-danger-500 sm:col-span-3">Target date cannot be before the buy date</p>
                ) : null}
              </div>
              <div className="grid gap-2">
                {checks.map((item, index) => (
                  <div key={item.key} className="flex items-center gap-2 text-sm text-title-50">
                    <Checkbox
                      id={`buy-${item.key}`}
                      checked={ticks[index]}
                      onChange={(event) =>
                        setTicks((current) => current.map((value, i) => (i === index ? event.target.checked : value)))
                      }
                    />
                    <label htmlFor={`buy-${item.key}`}>{item.label}</label>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 sm:max-w-xs">
                <TextField>
                  <Label>Mindset</Label>
                  <NativeSelect value={mindset} onChange={(event) => setMindset(event.target.value)}>
                    <NativeSelectOption value="">—</NativeSelectOption>
                    {mindsets.map((item) => (
                      <NativeSelectOption key={item} value={item}>
                        {item}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </TextField>
              </div>
              {failed ? (
                <TextField>
                  <Label>Override reason</Label>
                  <TextArea
                    rows={3}
                    value={overrideReason}
                    onChange={(event) => setOverrideReason(event.target.value)}
                  />
                </TextField>
              ) : null}
              {rules ? null : (
                <p className="text-sm text-danger-500">Trading rules are not loaded, so this buy cannot be confirmed yet.</p>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" disabled={saving} onPress={onClose}>
              Cancel
            </Button>
            <Button disabled={!canConfirm || saving} onPress={() => void confirm()}>
              {saving ? "Opening…" : "Confirm Buy"}
            </Button>
          </DialogFooter>
        </>
      ) : row ? (
        <>
          <DialogHeader>
            <DialogTitle>Buy {row.symbol}</DialogTitle>
            <DialogDescription>Entry, stop, and target are required before a buy.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onPress={onClose}>
              Close
            </Button>
          </DialogFooter>
        </>
      ) : null}
    </Dialog>
  );
}
