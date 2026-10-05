import { NotImplementedError } from "../shared/not-implemented-error.js";

export class OpenTrade {
  async execute(): Promise<never> {
    throw new NotImplementedError("OpenTrade");
  }
}
