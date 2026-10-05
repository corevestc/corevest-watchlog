import { NotImplementedError } from "../shared/not-implemented-error.js";

export class CloseTrade {
  async execute(): Promise<never> {
    throw new NotImplementedError("CloseTrade");
  }
}
