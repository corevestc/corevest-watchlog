export interface MarketContext {
  asOf: string;
  structure?: string;
}

export interface MarketDataProvider {
  getContext(): Promise<MarketContext | null>;
}
