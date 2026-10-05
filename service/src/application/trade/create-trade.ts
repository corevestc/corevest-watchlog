import { NotImplementedError } from "../shared/not-implemented-error.js";

export class CreateTrade {
  async execute(): Promise<never> {
    throw new NotImplementedError("CreateTrade");
  }
}
