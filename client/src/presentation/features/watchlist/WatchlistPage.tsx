import { evaluateWatchlistDecision } from "@/application/watchlist/evaluate-watchlist-decision";
import type { WatchlistItem } from "@/domain/watchlist";
import { PageHeader } from "@/presentation/layouts/PageHeader";

export function WatchlistPage() {
  const items: WatchlistItem[] = [];
  const decisions = items.map((item) => evaluateWatchlistDecision(item));

  return (
    <section>
      <PageHeader
        title="Daily Watchlist"
        description="BUY eligibility is decided by the watchlist application/domain rule, not by this page."
      />
      {items.length === 0 ? (
        <p className="text-sm text-text-100">
          No watchlist rows yet. Eligible BUY count: {decisions.filter((d) => d.allowed).length}.
        </p>
      ) : null}
    </section>
  );
}
