import { Body, Controller, Get, HttpCode, Inject, Param, Post } from "@nestjs/common";
import { ExitJournalTrade } from "../../../application/journal/exit-journal-trade.js";
import { GetJournalTrade } from "../../../application/journal/get-journal-trade.js";
import { ListJournalTrades } from "../../../application/journal/list-journal-trades.js";
import { OpenJournalTrade } from "../../../application/journal/open-journal-trade.js";
import { journalExitSchema, journalOpenSchema } from "../dto/journal-dto.js";
import { parseDto } from "../parse-dto.js";

@Controller(["journal", "trades"])
export class JournalTradeController {
  constructor(
    @Inject(ListJournalTrades) private readonly listTrades: ListJournalTrades,
    @Inject(GetJournalTrade) private readonly getTrade: GetJournalTrade,
    @Inject(OpenJournalTrade) private readonly openTrade: OpenJournalTrade,
    @Inject(ExitJournalTrade) private readonly exitTrade: ExitJournalTrade
  ) {}

  @Get()
  async list() {
    const data = await this.listTrades.execute();
    return { data };
  }

  @Post()
  async open(@Body() body: unknown) {
    const parsed = parseDto(journalOpenSchema, body);
    const data = await this.openTrade.execute(parsed);
    return { data };
  }

  @Get(":tradeId")
  async get(@Param("tradeId") tradeId: string) {
    const data = await this.getTrade.execute(tradeId);
    return { data };
  }

  @Post(":tradeId/exit")
  @HttpCode(200)
  async exit(@Param("tradeId") tradeId: string, @Body() body: unknown) {
    const parsed = parseDto(journalExitSchema, body);
    const data = await this.exitTrade.execute(tradeId, parsed);
    return { data };
  }
}
