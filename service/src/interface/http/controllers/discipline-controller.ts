import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from "@nestjs/common";
import { z } from "zod";
import { CloseDisciplineTrade } from "../../../application/discipline/close-discipline-trade.js";
import { GetDisciplineDesk } from "../../../application/discipline/get-discipline-desk.js";
import { GetDisciplineStats } from "../../../application/discipline/get-discipline-stats.js";
import { GetTradingRules } from "../../../application/discipline/get-trading-rules.js";
import { MoveDisciplineStop } from "../../../application/discipline/move-discipline-stop.js";
import { OpenDisciplineTrade } from "../../../application/discipline/open-discipline-trade.js";
import { SaveTradingRules } from "../../../application/discipline/save-trading-rules.js";
import {
  closeDisciplineSchema,
  moveStopSchema,
  openDisciplineSchema,
  tradingRulesSchema
} from "../dto/discipline-dto.js";
import { AuthGuard, type AuthedRequest } from "../guards/auth.guard.js";
import { parseDto } from "../parse-dto.js";

@Controller()
@UseGuards(AuthGuard)
export class DisciplineController {
  constructor(
    @Inject(OpenDisciplineTrade) private readonly openTrade: OpenDisciplineTrade,
    @Inject(MoveDisciplineStop) private readonly moveStop: MoveDisciplineStop,
    @Inject(CloseDisciplineTrade) private readonly closeTrade: CloseDisciplineTrade,
    @Inject(GetDisciplineStats) private readonly stats: GetDisciplineStats,
    @Inject(GetDisciplineDesk) private readonly desk: GetDisciplineDesk,
    @Inject(GetTradingRules) private readonly readRules: GetTradingRules,
    @Inject(SaveTradingRules) private readonly writeRules: SaveTradingRules
  ) {}

  @Post("trades/open")
  async open(@Req() req: AuthedRequest, @Body() body: unknown) {
    const parsed = parseDto(openDisciplineSchema, body);
    const data = await this.openTrade.execute(req.user.id, parsed);
    return { data };
  }

  @Put("trades/:id/stop")
  async stop(@Req() req: AuthedRequest, @Param("id") id: string, @Body() body: unknown) {
    const parsed = parseDto(moveStopSchema, body);
    const data = await this.moveStop.execute(req.user.id, parseDto(z.string().uuid(), id), parsed.newStop);
    return { data };
  }

  @Post("trades/:id/close")
  @HttpCode(200)
  async close(@Req() req: AuthedRequest, @Param("id") id: string, @Body() body: unknown) {
    const parsed = parseDto(closeDisciplineSchema, body);
    const data = await this.closeTrade.execute(req.user.id, parseDto(z.string().uuid(), id), parsed);
    return { data };
  }

  @Get("discipline/trades")
  async trades(@Req() req: AuthedRequest) {
    const data = await this.desk.execute(req.user.id);
    return { data };
  }

  @Get("discipline/stats")
  async disciplineStats(@Req() req: AuthedRequest) {
    const data = await this.stats.execute(req.user.id);
    return { data };
  }

  @Get("discipline/rules")
  async rules() {
    const data = await this.readRules.execute();
    return { data };
  }

  @Put("discipline/rules")
  async saveRules(@Body() body: unknown) {
    const parsed = parseDto(tradingRulesSchema, body);
    const data = await this.writeRules.execute(parsed);
    return { data };
  }
}
