import type { ReviewStore } from "../../application/ports/review-store.js";
import type { WeeklyReview } from "../../domain/review/compute-weekly-review.js";
import type { PostgresPool } from "../database/postgres/pool.js";
import { rethrowPg } from "../database/postgres/pg-errors.js";
import { mapReviewRow, type ReviewRow } from "./review-row-map.js";

const COLUMNS = `
  id, week_start, week_end, trades, wins, win_rate, avg_win_r, avg_loss_r,
  expectancy, adherence_pct, win_pct_by_category, win_pct_by_setup_type,
  skipped_hit_rate, best_trade, worst_trade, top_mistake, next_week_focus,
  summary
`;

export class PostgresReviewStore implements ReviewStore {
  constructor(private readonly pool: PostgresPool) {}

  async list(): Promise<WeeklyReview[]> {
    const result = await this.pool.query<ReviewRow>(
      `SELECT ${COLUMNS} FROM weekly_reviews ORDER BY week_start DESC`
    );
    return result.rows.map(mapReviewRow);
  }

  async getByWeekStart(weekStart: string): Promise<WeeklyReview | null> {
    const result = await this.pool.query<ReviewRow>(
      `SELECT ${COLUMNS} FROM weekly_reviews WHERE week_start = $1`,
      [weekStart]
    );
    return result.rows[0] ? mapReviewRow(result.rows[0]) : null;
  }

  async save(review: WeeklyReview): Promise<WeeklyReview> {
    try {
      const result = await this.pool.query<ReviewRow>(
        `INSERT INTO weekly_reviews (
           id, week_start, week_end, trades, wins, win_rate, avg_win_r,
           avg_loss_r, expectancy, adherence_pct, win_pct_by_category,
           win_pct_by_setup_type, skipped_hit_rate, best_trade, worst_trade,
           top_mistake, next_week_focus, summary, updated_at
         ) VALUES (
           $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12::jsonb,$13,$14::jsonb,
           $15::jsonb,$16,$17,$18, now()
         )
         ON CONFLICT (week_start) DO UPDATE SET
           week_end = EXCLUDED.week_end,
           trades = EXCLUDED.trades,
           wins = EXCLUDED.wins,
           win_rate = EXCLUDED.win_rate,
           avg_win_r = EXCLUDED.avg_win_r,
           avg_loss_r = EXCLUDED.avg_loss_r,
           expectancy = EXCLUDED.expectancy,
           adherence_pct = EXCLUDED.adherence_pct,
           win_pct_by_category = EXCLUDED.win_pct_by_category,
           win_pct_by_setup_type = EXCLUDED.win_pct_by_setup_type,
           skipped_hit_rate = EXCLUDED.skipped_hit_rate,
           best_trade = EXCLUDED.best_trade,
           worst_trade = EXCLUDED.worst_trade,
           top_mistake = EXCLUDED.top_mistake,
           next_week_focus = EXCLUDED.next_week_focus,
           summary = EXCLUDED.summary,
           updated_at = now()
         RETURNING ${COLUMNS}`,
        [
          review.id,
          review.weekStart,
          review.weekEnd,
          review.trades,
          review.wins,
          review.winRate,
          review.avgWinR,
          review.avgLossR,
          review.expectancy,
          review.adherencePct,
          JSON.stringify(review.winPctByCategory),
          JSON.stringify(review.winPctBySetupType),
          review.skippedHitRate,
          review.bestTrade ? JSON.stringify(review.bestTrade) : null,
          review.worstTrade ? JSON.stringify(review.worstTrade) : null,
          review.topMistake,
          review.nextWeekFocus,
          review.summary
        ]
      );
      if (!result.rows[0]) {
        throw new Error("review save returned no row");
      }
      return mapReviewRow(result.rows[0]);
    } catch (error) {
      rethrowPg(error);
    }
  }
}
