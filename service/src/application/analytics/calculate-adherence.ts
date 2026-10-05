import { NotImplementedError } from "../shared/not-implemented-error.js";

export class CalculateAdherence {
  async execute(): Promise<never> {
    throw new NotImplementedError("CalculateAdherence");
  }
}
