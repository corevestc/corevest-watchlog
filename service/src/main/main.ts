import "reflect-metadata";
import { RequestMethod } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { env } from "../infrastructure/config/env.js";
import { runPendingMigrations } from "../infrastructure/database/postgres/migrate.js";
import { logger } from "../infrastructure/logging/logger.js";
import { DomainExceptionFilter } from "../interface/http/filters/domain-exception.filter.js";
import { AppModule } from "./app.module.js";

await runPendingMigrations();

const app = await NestFactory.create(AppModule);
app.enableCors({ origin: env.CLIENT_ORIGIN });
app.setGlobalPrefix("api/v1", {
  exclude: [
    { path: "health", method: RequestMethod.GET },
    { path: "openapi.json", method: RequestMethod.GET },
    { path: "docs", method: RequestMethod.GET },
    { path: "swagger", method: RequestMethod.GET }
  ]
});
app.useGlobalFilters(new DomainExceptionFilter());
app.enableShutdownHooks();

await app.listen(env.PORT);
logger.info(`WatchLog service listening on port ${env.PORT}`);
