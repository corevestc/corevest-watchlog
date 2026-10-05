import type { Trade } from "../../domain/trade/index.js";
import type { TradeRepository } from "../ports/trade-repository.js";

export class GetTrades {
  constructor(private readonly trades: TradeRepository) {}

  execute(): Promise<Trade[]> {
    return this.trades.list();
  }
}
