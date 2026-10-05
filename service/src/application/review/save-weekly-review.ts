import { randomUUID } from "node:crypto";
import {
  computeWeeklyReview,
  weekEndFromStart,
  type WeeklyReview,
  type WeeklyReviewNotes
} from "../../domain/review/compute-weekly-review.js";
import type { JournalStore } from "../ports/journal-store.js";
import type { ReviewStore } from "../ports/review-store.js";
import type { WatchlistStore } from "../ports/watchlist-store.js";

export class SaveWeeklyReview {
  constructor(
    private readonly reviews: ReviewStore,
    private readonly journal: JournalStore,
    private readonly watchlists: WatchlistStore
  ) {}

  async execute(
    weekStart: string,
    notes: WeeklyReviewNotes = {}
  ): Promise<WeeklyReview> {
    const weekEnd = weekEndFromStart(weekStart);
    const existing = await this.reviews.getByWeekStart(weekStart);
    const [trades, watchlist] = await Promise.all([
      this.journal.listBetween(weekStart, weekEnd),
      this.watchlists.listBetween(weekStart, weekEnd)
    ]);

    const review = computeWeeklyReview({
      id: existing?.id ?? randomUUID(),
      weekStart,
      trades,
      watchlist,
      notes: {
        topMistake: notes.topMistake ?? existing?.topMistake ?? null,
        nextWeekFocus: notes.nextWeekFocus ?? existing?.nextWeekFocus ?? null
      }
    });

    return this.reviews.save(review);
  }
}
