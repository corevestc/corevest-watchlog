import { NotImplementedError } from "../shared/not-implemented-error.js";

export class CalculateExpectancy {
  async execute(): Promise<never> {
    throw new NotImplementedError("CalculateExpectancy");
  }
}
