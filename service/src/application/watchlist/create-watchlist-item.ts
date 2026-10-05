import { NotImplementedError } from "../shared/not-implemented-error.js";

export class CreateWatchlistItem {
  async execute(): Promise<never> {
    throw new NotImplementedError("CreateWatchlistItem");
  }
}
