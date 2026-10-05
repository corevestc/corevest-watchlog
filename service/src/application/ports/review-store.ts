import type { WeeklyReview } from "../../domain/review/compute-weekly-review.js";

export interface ReviewStore {
  list(): Promise<WeeklyReview[]>;
  getByWeekStart(weekStart: string): Promise<WeeklyReview | null>;
  save(review: WeeklyReview): Promise<WeeklyReview>;
}
