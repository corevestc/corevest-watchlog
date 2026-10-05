import type {
  MarketContext,
  MarketDataProvider
} from "../../application/ports/market-data-provider.js";

export class DseMarketDataClient implements MarketDataProvider {
  constructor(
    private readonly config: { baseUrl: string; apiKey?: string }
  ) {}

  async getContext(): Promise<MarketContext | null> {
    void this.config;
    return null;
  }
}
