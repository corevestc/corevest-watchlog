import { Controller, Get, Inject, Res } from "@nestjs/common";
import type { Response } from "express";
import { DATABASE_HEALTH, type DatabaseHealthCheck } from "../database-health.js";

@Controller()
export class HealthController {
  constructor(@Inject(DATABASE_HEALTH) private readonly databaseHealth: DatabaseHealthCheck) {}

  @Get("health")
  async show(@Res() res: Response): Promise<void> {
    const databaseUp = await this.databaseHealth();
    res.status(databaseUp ? 200 : 503).json({
      status: databaseUp ? "ok" : "degraded",
      service: "watchlog",
      database: databaseUp ? "up" : "down"
    });
  }
}
