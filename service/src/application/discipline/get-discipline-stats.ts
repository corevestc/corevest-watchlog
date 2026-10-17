import { summarizeDiscipline, type DisciplineStats } from "../../domain/discipline/discipline-trade.js";
import type { DisciplineStore } from "../ports/discipline-store.js";

export class GetDisciplineStats {
  constructor(private readonly store: DisciplineStore) {}

  async execute(userId: string): Promise<DisciplineStats> {
    const { today, rows } = await this.store.listForStats(userId);
    return summarizeDiscipline(rows, today);
  }
}
