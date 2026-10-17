import type { TradingRules } from "../../domain/discipline/trading-rules.js";
import type { DisciplineStore } from "../ports/discipline-store.js";

export class GetTradingRules {
  constructor(private readonly store: DisciplineStore) {}

  execute(): Promise<TradingRules> {
    return this.store.getRules();
  }
}
