import { NotImplementedError } from "../shared/not-implemented-error.js";

export class RecordViolation {
  async execute(): Promise<never> {
    throw new NotImplementedError("RecordViolation");
  }
}
