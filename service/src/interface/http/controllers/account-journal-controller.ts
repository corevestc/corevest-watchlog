import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { z } from "zod";
import { ListAccountTrades } from "../../../application/journal/list-account-trades.js";
import { SaveAccountTrade } from "../../../application/journal/save-account-trade.js";
import { SetAccountBoId } from "../../../application/journal/set-account-bo-id.js";
import { accountTradeSchema, boIdSchema } from "../dto/account-journal-dto.js";
import { isoDate } from "../dto/watchlist-dto.js";
import { AuthGuard, type AuthedRequest } from "../guards/auth.guard.js";
import { parseDto, queryString } from "../parse-dto.js";

const scripQuery = z.string().trim().max(32);

@Controller("journal/account")
@UseGuards(AuthGuard)
export class AccountJournalController {
  constructor(
    @Inject(ListAccountTrades) private readonly listTrades: ListAccountTrades,
    @Inject(SaveAccountTrade) private readonly saveTrade: SaveAccountTrade,
    @Inject(SetAccountBoId) private readonly setBoId: SetAccountBoId
  ) {}

  @Get()
  async list(
    @Req() req: AuthedRequest,
    @Query("date") date?: unknown,
    @Query("scrip") scrip?: unknown
  ) {
    const rawDate = queryString(date);
    const entryDate = rawDate ? parseDto(isoDate, rawDate) : null;
    const stock = parseDto(scripQuery, queryString(scrip) ?? "");
    const data = await this.listTrades.execute(req.user.id, { entryDate, scrip: stock });
    return { data };
  }

  @Put("bo")
  async saveBo(@Req() req: AuthedRequest, @Body() body: unknown) {
    const parsed = parseDto(boIdSchema, body);
    const data = await this.setBoId.execute(req.user.id, parsed.boId);
    return { data };
  }

  @Post()
  @HttpCode(200)
  async create(@Req() req: AuthedRequest, @Body() body: unknown) {
    const parsed = parseDto(accountTradeSchema, body);
    const data = await this.saveTrade.execute(req.user.id, parsed);
    return { data };
  }
}
