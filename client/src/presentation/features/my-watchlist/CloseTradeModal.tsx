import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { rewardRiskTo, type OpenTrade } from "./discipline";

const reasons = ["TARGET", "STOP", "TRAIL", "MANUAL", "PANIC"] as const;

function todayLocal() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function CloseTradeModal({
  trade,
  onClose,
  onClosed,
  onError
}: {
  trade: OpenTrade | null;
  onClose: () => void;
  onClosed: () => void;
  onError: (message: string) => void;
}) {
  const [exitDate, setExitDate] = useState(todayLocal);
  const [exitPrice, setExitPrice] = useState("");
  const [exitReason, setExitReason] = useState<(typeof reasons)[number]>("TARGET");
  const [lesson, setLesson] = useState("");
  const [saving, setSaving] = useState(false);
  const lessonRequired = exitReason === "MANUAL" || exitReason === "PANIC";
  const price = exitPrice.trim() === "" ? null : Number(exitPrice);
  const preview =
    trade && price !== null && Number.isFinite(price)
      ? rewardRiskTo(trade.entryPrice, trade.stopInitial, price)
      : null;
  const canSave =
    trade !== null &&
    exitDate !== "" &&
    price !== null &&
    Number.isFinite(price) &&
    price > 0 &&
    (!lessonRequired || lesson.trim() !== "");

  async function confirm() {
    if (!trade || !canSave || price === null) {
      return;
    }
    setSaving(true);
    try {
      await httpJson("POST", `${apiPaths.trades}/${trade.id}/close`, {
        exitDate,
        exitPrice: price,
        exitReason,
        ...(lesson.trim() ? { lesson: lesson.trim() } : {})
      });
      onClosed();
    } catch (err) {
      onError(err instanceof ApiError ? err.message : "Could not close the trade");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      isOpen={trade !== null}
      onOpenChange={(open) => {
        if (!open && !saving) {
          onClose();
        }
      }}
    >
      {trade ? (
        <>
          <DialogHeader>
            <DialogTitle>Close {trade.symbol}</DialogTitle>
            <DialogDescription>
              R multiple {preview === null ? "—" : preview.toFixed(2)}
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="grid gap-3">
              <TextField>
                <Label>Exit date</Label>
                <Input type="date" required value={exitDate} onChange={(event) => setExitDate(event.target.value)} />
              </TextField>
              <TextField>
                <Label>Exit price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={exitPrice}
                  onChange={(event) => setExitPrice(event.target.value)}
                />
              </TextField>
              <TextField>
                <Label>Exit reason</Label>
                <NativeSelect
                  value={exitReason}
                  onChange={(event) => setExitReason(event.target.value as (typeof reasons)[number])}
                >
                  {reasons.map((reason) => (
                    <NativeSelectOption key={reason} value={reason}>
                      {reason}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </TextField>
              <TextField>
                <Label>{lessonRequired ? "Lesson" : "Lesson (optional)"}</Label>
                <TextArea
                  rows={3}
                  value={lesson}
                  onChange={(event) => setLesson(event.target.value)}
                />
              </TextField>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" disabled={saving} onPress={onClose}>
              Cancel
            </Button>
            <Button disabled={!canSave || saving} onPress={() => void confirm()}>
              {saving ? "Closing…" : "Confirm close"}
            </Button>
          </DialogFooter>
        </>
      ) : null}
    </Dialog>
  );
}
