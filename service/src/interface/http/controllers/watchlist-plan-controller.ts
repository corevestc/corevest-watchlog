import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { DecideWatchlistRow } from "../../../application/watchlist/decide-watchlist-row.js";
import { GetConsensusWatchlist } from "../../../application/watchlist/get-consensus-watchlist.js";
import { GetDailyModelWatchlist } from "../../../application/watchlist/get-daily-model-watchlist.js";
import { GetWatchlistRow } from "../../../application/watchlist/get-watchlist-row.js";
import { ListAllWatchlist } from "../../../application/watchlist/list-all-watchlist.js";
import { ListDailyWatchlist } from "../../../application/watchlist/list-daily-plan.js";
import { PatchWatchlistRow } from "../../../application/watchlist/patch-watchlist-row.js";
import { SaveWatchlistRow } from "../../../application/watchlist/save-watchlist-row.js";
import { SaveWatchlistSelection } from "../../../application/watchlist/save-watchlist-selection.js";
import { SaveWatchlistSignals } from "../../../application/watchlist/save-watchlist-signals.js";
import { UpdateWatchlistOutcomes } from "../../../application/watchlist/update-watchlist-outcomes.js";
import { evaluateBuyGates, toBuyGateInput } from "../../../domain/watchlist/buy-gates.js";
import { selectionSchema, saveSignalsSchema } from "../dto/ml-watchlist-dto.js";
import {
  isoDate,
  watchlistCreateSchema,
  watchlistDecisionSchema,
  watchlistPatchSchema
} from "../dto/watchlist-dto.js";
import { parseDto, queryString, todayUtcDate } from "../parse-dto.js";

@Controller("watchlist")
export class WatchlistPlanController {
  constructor(
    @Inject(SaveWatchlistSignals) private readonly saveSignals: SaveWatchlistSignals,
    @Inject(GetConsensusWatchlist) private readonly consensusWatchlist: GetConsensusWatchlist,
    @Inject(SaveWatchlistSelection) private readonly saveSelection: SaveWatchlistSelection,
    @Inject(GetDailyModelWatchlist) private readonly dailyModel: GetDailyModelWatchlist,
    @Inject(UpdateWatchlistOutcomes) private readonly updateOutcomes: UpdateWatchlistOutcomes,
    @Inject(ListDailyWatchlist) private readonly listDaily: ListDailyWatchlist,
    @Inject(ListAllWatchlist) private readonly listAll: ListAllWatchlist,
    @Inject(GetWatchlistRow) private readonly getRow: GetWatchlistRow,
    @Inject(SaveWatchlistRow) private readonly saveRow: SaveWatchlistRow,
    @Inject(PatchWatchlistRow) private readonly patchRow: PatchWatchlistRow,
    @Inject(DecideWatchlistRow) private readonly decideRow: DecideWatchlistRow
  ) {}

  @Post("save")
  async save(@Body() body: unknown) {
    const parsed = parseDto(saveSignalsSchema, body);
    const data = await this.saveSignals.execute(parsed.tradeDate, parsed.source, parsed.signals);
    return { data };
  }

  @Get("consensus")
  async consensus(@Query("trade_date") tradeDate?: unknown, @Query("date") date?: unknown) {
    const data = await this.consensusWatchlist.execute(this.readTradeDate(tradeDate, date));
    return { data };
  }

  @Post("selection")
  async selection(@Body() body: unknown) {
    const parsed = parseDto(selectionSchema, body);
    const data = await this.saveSelection.execute({
      tradeDate: parsed.tradeDate,
      stockId: parsed.stockId,
      scrip: parsed.scrip,
      decision: parsed.decision,
      humanGrade: parsed.humanGrade ?? null,
      decisionReason: parsed.decisionReason ?? null,
      plannedEntry: parsed.plannedEntry ?? null,
      plannedStop: parsed.plannedStop ?? null,
      plannedTarget: parsed.plannedTarget ?? null
    });
    return { data };
  }

  @Get("daily")
  async daily(@Query("trade_date") tradeDate?: unknown, @Query("date") date?: unknown) {
    const data = await this.dailyModel.execute(this.readTradeDate(tradeDate, date));
    return { data };
  }

  @Post("outcomes")
  @HttpCode(200)
  async outcomes() {
    const updated = await this.updateOutcomes.execute();
    return { data: { updated } };
  }

  @Get()
  async list(@Query("scope") scope?: unknown, @Query("date") date?: unknown) {
    if (queryString(scope) === "all") {
      return { data: await this.listAll.execute() };
    }
    const raw = queryString(date) ?? todayUtcDate();
    return { data: await this.listDaily.execute(parseDto(isoDate, raw)) };
  }

  @Post()
  async create(@Body() body: unknown) {
    const parsed = parseDto(watchlistCreateSchema, body);
    const data = await this.saveRow.execute(parsed);
    return { data };
  }

  @Get(":id/eligibility")
  async eligibility(@Param("id") id: string) {
    const item = await this.getRow.execute(id);
    return { data: { item, eligibility: evaluateBuyGates(toBuyGateInput(item)) } };
  }

  @Post(":id/decision")
  @HttpCode(200)
  async decide(@Param("id") id: string, @Body() body: unknown) {
    const parsed = parseDto(watchlistDecisionSchema, body);
    const data = await this.decideRow.execute({
      id,
      decision: parsed.decision,
      skipReason: parsed.skipReason
    });
    return { data };
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    const data = await this.getRow.execute(id);
    return { data };
  }

  @Patch(":id")
  async patch(@Param("id") id: string, @Body() body: unknown) {
    const parsed = parseDto(watchlistPatchSchema, body);
    const data = await this.patchRow.execute(id, parsed);
    return { data };
  }

  private readTradeDate(tradeDate: unknown, date: unknown): string {
    const raw = queryString(tradeDate) ?? queryString(date) ?? todayUtcDate();
    return parseDto(isoDate, raw);
  }
}
