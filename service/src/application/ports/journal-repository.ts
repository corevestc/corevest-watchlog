import type { TradingLesson, Violation } from "../../domain/journal/index.js";

export interface JournalRepository {
  listLessons(): Promise<TradingLesson[]>;
  listViolations(): Promise<Violation[]>;
}
