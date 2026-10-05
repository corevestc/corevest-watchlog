import type { TradingLesson, Violation } from "../../domain/journal/index.js";
import type { JournalRepository } from "../ports/journal-repository.js";

export class GetJournal {
  constructor(private readonly journal: JournalRepository) {}

  async execute(): Promise<{
    lessons: TradingLesson[];
    violations: Violation[];
  }> {
    const [lessons, violations] = await Promise.all([
      this.journal.listLessons(),
      this.journal.listViolations()
    ]);
    return { lessons, violations };
  }
}
