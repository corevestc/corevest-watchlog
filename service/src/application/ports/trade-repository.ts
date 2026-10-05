import type { Trade } from "../../domain/trade/index.js";

export interface TradeRepository {
  list(): Promise<Trade[]>;
}
