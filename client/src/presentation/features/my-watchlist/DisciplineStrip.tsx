import type { Tone, TradingRules } from "./discipline";
import { adherenceTone, lossTone, positionTone, violationTone } from "./discipline";

type Stats = {
  adherencePct: number | null;
  openPositions: number;
  realizedPnlToday: number;
};

const toneClass: Record<Tone, string> = {
  ok: "text-success-500",
  near: "text-warning-500",
  breach: "text-danger-500"
};

function Item({ label, value, tone }: { label: string; value: string; tone: Tone }) {
  return (
    <p>
      <span className="text-text-100">{label} </span>
      <span className={`font-semibold ${toneClass[tone]}`}>{value}</span>
    </p>
  );
}

export function DisciplineStrip({
  rules,
  stats,
  violationsThisWeek
}: {
  rules: TradingRules | null;
  stats: Stats | null;
  violationsThisWeek: number;
}) {
  const open = stats?.openPositions ?? 0;
  const pnl = stats?.realizedPnlToday ?? 0;
  const limit = rules ? rules.accountCapital * (rules.dailyLossLimitPct / 100) : 0;
  const maxOpen = rules?.maxOpenPositions ?? 0;

  return (
    <div className="mb-4 flex flex-wrap gap-6 rounded-xl border border-base-100 bg-background-50 px-4 py-3 text-sm">
      <Item
        label="Adherence"
        value={stats?.adherencePct === null || stats === null ? "—" : `${stats.adherencePct.toFixed(0)}%`}
        tone={adherenceTone(stats?.adherencePct ?? null)}
      />
      <Item
        label="Open"
        value={rules ? `${open} / ${maxOpen}` : "—"}
        tone={rules ? positionTone(open, maxOpen) : "ok"}
      />
      <Item
        label="Today P&L"
        value={rules ? `${pnl.toFixed(2)} / -${limit.toFixed(2)}` : "—"}
        tone={rules ? lossTone(pnl, limit) : "ok"}
      />
      <Item label="Violations this week" value={String(violationsThisWeek)} tone={violationTone(violationsThisWeek)} />
    </div>
  );
}
