import type { WeeklyReview } from "../../domain/review/index.js";
import type { ReviewRepository } from "../ports/review-repository.js";

export class GetReviews {
  constructor(private readonly reviews: ReviewRepository) {}

  execute(): Promise<WeeklyReview[]> {
    return this.reviews.list();
  }
}
