import type { DisciplineDesk, DisciplineStore } from "../ports/discipline-store.js";

export class GetDisciplineDesk {
  constructor(private readonly store: DisciplineStore) {}

  execute(userId: string): Promise<DisciplineDesk> {
    return this.store.desk(userId);
  }
}
