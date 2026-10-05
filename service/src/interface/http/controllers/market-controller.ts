import { Controller, Get, Inject } from "@nestjs/common";
import { GetMarketContext } from "../../../application/market/get-market-context.js";

@Controller("market")
export class MarketController {
  constructor(@Inject(GetMarketContext) private readonly getMarketContext: GetMarketContext) {}

  @Get()
  async show() {
    const data = await this.getMarketContext.execute();
    return { data };
  }
}
