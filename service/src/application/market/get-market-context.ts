import type {
  MarketContext,
  MarketDataProvider
} from "../ports/market-data-provider.js";

export class GetMarketContext {
  constructor(private readonly market: MarketDataProvider) {}

  execute(): Promise<MarketContext | null> {
    return this.market.getContext();
  }
}
