import { MiddlewareConsumer, Module, RequestMethod, type NestModule } from "@nestjs/common";
import { AnalyticsController } from "../interface/http/controllers/analytics-controller.js";
import { AuthController } from "../interface/http/controllers/auth-controller.js";
import { DocsController } from "../interface/http/controllers/docs-controller.js";
import { HealthController } from "../interface/http/controllers/health-controller.js";
import { JournalTradeController } from "../interface/http/controllers/journal-trade-controller.js";
import { MarketController } from "../interface/http/controllers/market-controller.js";
import { ModelSignalController } from "../interface/http/controllers/model-signal-controller.js";
import { SectorController } from "../interface/http/controllers/sector-controller.js";
import { WatchlistPlanController } from "../interface/http/controllers/watchlist-plan-controller.js";
import { WeeklyReviewController } from "../interface/http/controllers/weekly-review-controller.js";
import { AuthGuard } from "../interface/http/guards/auth.guard.js";
import { RequestLoggerMiddleware } from "../interface/http/middleware/request-logger.middleware.js";
import { watchlogProviders } from "./watchlog.providers.js";

@Module({
  controllers: [
    HealthController,
    DocsController,
    AuthController,
    WatchlistPlanController,
    JournalTradeController,
    WeeklyReviewController,
    AnalyticsController,
    MarketController,
    SectorController,
    ModelSignalController
  ],
  providers: [AuthGuard, RequestLoggerMiddleware, ...watchlogProviders]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes({ path: "{*splat}", method: RequestMethod.ALL });
  }
}
