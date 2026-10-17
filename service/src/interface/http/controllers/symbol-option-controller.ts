import { Body, Controller, Get, Inject, Param, Put, Req, UseGuards } from "@nestjs/common";
import { z } from "zod";
import { ListSymbolOptions } from "../../../application/market/list-symbol-options.js";
import { AuthGuard, type AuthedRequest } from "../guards/auth.guard.js";
import { parseDto } from "../parse-dto.js";

const codeSchema = z.string().trim().regex(/^[A-Za-z0-9.&-]+$/).max(50);
const sources = ["V0", "V1", "V2", "BO", "MANUAL"] as const;
const snapshotSchema = z.object({
  sources: z.array(z.enum(sources)).min(1).max(5),
  selectionPrice: z.number().finite().nullable(),
  selectionPriceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  rsi14: z.number().finite().nullable(),
  relativeVolume: z.number().finite().nullable(),
  featureSetupStage: z.string().trim().max(80).nullable(),
  marketStructure: z.string().trim().max(80).nullable(),
  preBreakoutScore: z.number().finite().nullable()
});

@Controller("stocks")
@UseGuards(AuthGuard)
export class SymbolOptionController {
  constructor(@Inject(ListSymbolOptions) private readonly list: ListSymbolOptions) {}

  @Get("options")
  async options() {
    const data = await this.list.execute();
    return { data };
  }

  @Get("snapshots")
  async snapshots(@Req() req: AuthedRequest) {
    const data = await this.list.listSaved(req.user.id);
    return { data };
  }

  @Put("snapshots/:id")
  async saveSnapshot(@Req() req: AuthedRequest, @Param("id") id: string, @Body() body: unknown) {
    const watchlistId = parseDto(z.string().uuid(), id);
    const snapshot = parseDto(snapshotSchema, body);
    await this.list.saveSnapshot(req.user.id, watchlistId, snapshot);
    return { data: { id: watchlistId } };
  }

  @Get(":code/snapshot")
  async snapshot(@Param("code") code: string) {
    const data = await this.list.snapshot(parseDto(codeSchema, code));
    return { data };
  }
}
