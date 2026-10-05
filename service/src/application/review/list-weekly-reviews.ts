import type { WeeklyReview } from "../../domain/review/compute-weekly-review.js";
import type { ReviewStore } from "../ports/review-store.js";

export class ListWeeklyReviews {
  constructor(private readonly reviews: ReviewStore) {}

  execute(): Promise<WeeklyReview[]> {
    return this.reviews.list();
  }
}
