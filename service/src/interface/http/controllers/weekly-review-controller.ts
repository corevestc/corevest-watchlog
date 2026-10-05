import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { GetWeeklyReview } from "../../../application/review/get-weekly-review.js";
import { ListWeeklyReviews } from "../../../application/review/list-weekly-reviews.js";
import { SaveWeeklyReview } from "../../../application/review/save-weekly-review.js";
import { weeklyReviewCreateSchema } from "../dto/review-dto.js";
import { isoDate } from "../dto/watchlist-dto.js";
import { parseDto } from "../parse-dto.js";

@Controller("reviews")
export class WeeklyReviewController {
  constructor(
    @Inject(ListWeeklyReviews) private readonly listReviews: ListWeeklyReviews,
    @Inject(GetWeeklyReview) private readonly getReview: GetWeeklyReview,
    @Inject(SaveWeeklyReview) private readonly saveReview: SaveWeeklyReview
  ) {}

  @Get()
  async list() {
    const data = await this.listReviews.execute();
    return { data };
  }

  @Post()
  async create(@Body() body: unknown) {
    const parsed = parseDto(weeklyReviewCreateSchema, body);
    const data = await this.saveReview.execute(parsed.weekStart, {
      topMistake: parsed.topMistake,
      nextWeekFocus: parsed.nextWeekFocus
    });
    return { data };
  }

  @Get(":weekStart")
  async get(@Param("weekStart") weekStart: string) {
    const data = await this.getReview.execute(parseDto(isoDate, weekStart));
    return { data };
  }
}
