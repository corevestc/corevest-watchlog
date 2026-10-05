import type {
  TradeHighlight,
  WeeklyReview
} from "../../domain/review/compute-weekly-review.js";
import { toIsoDate, toNumber } from "../database/postgres/map-numeric.js";

export interface ReviewRow {
  id: string;
  week_start: Date | string;
  week_end: Date | string;
  trades: number;
  wins: number;
  win_rate: string | number | null;
  avg_win_r: string | number | null;
  avg_loss_r: string | number | null;
  expectancy: string | number | null;
  adherence_pct: string | number | null;
  win_pct_by_category: Record<string, number | null>;
  win_pct_by_setup_type: Record<string, number | null>;
  skipped_hit_rate: string | number | null;
  best_trade: TradeHighlight | null;
  worst_trade: TradeHighlight | null;
  top_mistake: string | null;
  next_week_focus: string | null;
  summary: string | null;
}

export function mapReviewRow(row: ReviewRow): WeeklyReview {
  return {
    id: row.id,
    weekStart: toIsoDate(row.week_start),
    weekEnd: toIsoDate(row.week_end),
    trades: row.trades,
    wins: row.wins,
    winRate: toNumber(row.win_rate),
    avgWinR: toNumber(row.avg_win_r),
    avgLossR: toNumber(row.avg_loss_r),
    expectancy: toNumber(row.expectancy),
    adherencePct: toNumber(row.adherence_pct),
    winPctByCategory: row.win_pct_by_category ?? {},
    winPctBySetupType: row.win_pct_by_setup_type ?? {},
    skippedHitRate: toNumber(row.skipped_hit_rate),
    bestTrade: row.best_trade,
    worstTrade: row.worst_trade,
    topMistake: row.top_mistake,
    nextWeekFocus: row.next_week_focus,
    summary: row.summary
  };
}
