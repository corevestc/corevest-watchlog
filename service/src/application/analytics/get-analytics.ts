import type { PerformanceSnapshot } from "../../domain/analytics/index.js";

export class GetAnalytics {
  async execute(): Promise<PerformanceSnapshot> {
    return {
      expectancy: null,
      averageRMultiple: null,
      adherencePct: null
    };
  }
}
