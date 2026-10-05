import { NotImplementedError } from "../shared/not-implemented-error.js";

export class RecordTradeLesson {
  async execute(): Promise<never> {
    throw new NotImplementedError("RecordTradeLesson");
  }
}
