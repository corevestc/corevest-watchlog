import type { TradingRules } from "../../domain/discipline/trading-rules.js";
import type { DisciplineStore } from "../ports/discipline-store.js";

export class SaveTradingRules {
  constructor(private readonly store: DisciplineStore) {}

  execute(rules: TradingRules): Promise<TradingRules> {
    return this.store.saveRules(rules);
  }
}
