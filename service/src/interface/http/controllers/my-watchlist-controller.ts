import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { z } from "zod";
import { CreateMyWatchlist } from "../../../application/my-watchlist/create-my-watchlist.js";
import { DeleteMyWatchlist } from "../../../application/my-watchlist/delete-my-watchlist.js";
import { GetMyWatchlist } from "../../../application/my-watchlist/get-my-watchlist.js";
import { ListMyWatchlist } from "../../../application/my-watchlist/list-my-watchlist.js";
import { UpdateMyWatchlist } from "../../../application/my-watchlist/update-my-watchlist.js";
import type { MyWatchlistDraft } from "../../../domain/watchlist/my-watchlist.js";
import {
  blankText,
  myWatchlistCreateSchema,
  myWatchlistFilterSchema,
  myWatchlistUpdateSchema
} from "../dto/my-watchlist-dto.js";
import { AuthGuard, type AuthedRequest } from "../guards/auth.guard.js";
import { parseDto, queryString } from "../parse-dto.js";

const idSchema = z.string().uuid();

@Controller("my-watchlist")
@UseGuards(AuthGuard)
export class MyWatchlistController {
  constructor(
    @Inject(ListMyWatchlist) private readonly listRows: ListMyWatchlist,
    @Inject(CreateMyWatchlist) private readonly createRow: CreateMyWatchlist,
    @Inject(GetMyWatchlist) private readonly getRow: GetMyWatchlist,
    @Inject(UpdateMyWatchlist) private readonly updateRow: UpdateMyWatchlist,
    @Inject(DeleteMyWatchlist) private readonly deleteRow: DeleteMyWatchlist
  ) {}

  @Get()
  async list(
    @Req() req: AuthedRequest,
    @Query("status") status?: unknown,
    @Query("source") source?: unknown,
    @Query("result") result?: unknown
  ) {
    const filter = parseDto(myWatchlistFilterSchema, {
      status: queryString(status) || undefined,
      source: queryString(source) || undefined,
      result: queryString(result) || undefined
    });
    const data = await this.listRows.execute(req.user.id, {
      status: filter.status ?? null,
      source: filter.source ?? null,
      result: filter.result ?? null
    });
    return { data };
  }

  @Post()
  async create(@Req() req: AuthedRequest, @Body() body: unknown) {
    const parsed = parseDto(myWatchlistCreateSchema, body);
    const draft: MyWatchlistDraft = {
      symbol: parsed.symbol.trim().toUpperCase(),
      addedDate: parsed.addedDate ?? null,
      source: parsed.source,
      setupType: parsed.setupType ?? null,
      plannedEntry: parsed.plannedEntry ?? null,
      stopLoss: parsed.stopLoss ?? null,
      targetPrice: parsed.targetPrice ?? null,
      reason: blankText(parsed.reason),
      status: parsed.status ?? "WATCHING",
      result: parsed.result ?? "OPEN",
      notes: blankText(parsed.notes)
    };
    const data = await this.createRow.execute(req.user.id, draft);
    return { data };
  }

  @Get(":id")
  async get(@Req() req: AuthedRequest, @Param("id") id: string) {
    const data = await this.getRow.execute(req.user.id, parseDto(idSchema, id));
    return { data };
  }

  @Put(":id")
  async update(@Req() req: AuthedRequest, @Param("id") id: string, @Body() body: unknown) {
    const parsed = parseDto(myWatchlistUpdateSchema, body);
    const data = await this.updateRow.execute(req.user.id, parseDto(idSchema, id), {
      ...parsed,
      symbol: parsed.symbol?.trim().toUpperCase(),
      reason: parsed.reason === undefined ? undefined : blankText(parsed.reason),
      notes: parsed.notes === undefined ? undefined : blankText(parsed.notes)
    });
    return { data };
  }

  @Delete(":id")
  async remove(@Req() req: AuthedRequest, @Param("id") id: string) {
    const entryId = parseDto(idSchema, id);
    await this.deleteRow.execute(req.user.id, entryId);
    return { data: { id: entryId } };
  }
}
