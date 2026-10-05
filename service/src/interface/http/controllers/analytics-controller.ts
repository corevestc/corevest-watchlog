import { Controller, Get, Inject } from "@nestjs/common";
import { GetAnalytics } from "../../../application/analytics/get-analytics.js";

@Controller("analytics")
export class AnalyticsController {
  constructor(@Inject(GetAnalytics) private readonly getAnalytics: GetAnalytics) {}

  @Get()
  async show() {
    const data = await this.getAnalytics.execute();
    return { data };
  }
}
