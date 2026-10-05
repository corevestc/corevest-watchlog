import type { WeeklyReview } from "../../domain/review/index.js";

export interface ReviewRepository {
  list(): Promise<WeeklyReview[]>;
}
