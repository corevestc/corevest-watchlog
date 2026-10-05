import { Controller, Get, Inject } from "@nestjs/common";
import { ListSectors } from "../../../application/market/list-sectors.js";

@Controller("sectors")
export class SectorController {
  constructor(@Inject(ListSectors) private readonly listSectors: ListSectors) {}

  @Get()
  async list() {
    const data = await this.listSectors.execute();
    return { data };
  }
}
