import { NotFoundError } from "../../domain/shared/errors.js";
import type { WeeklyReview } from "../../domain/review/compute-weekly-review.js";
import type { ReviewStore } from "../ports/review-store.js";

export class GetWeeklyReview {
  constructor(private readonly reviews: ReviewStore) {}

  async execute(weekStart: string): Promise<WeeklyReview> {
    const review = await this.reviews.getByWeekStart(weekStart);
    if (!review) {
      throw new NotFoundError(`Weekly review for ${weekStart} not found`);
    }
    return review;
  }
}
