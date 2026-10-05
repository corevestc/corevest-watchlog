import { Controller, Get, Inject } from "@nestjs/common";
import { GetModelSignals } from "../../../application/market/get-model-signals.js";

@Controller("model-signals")
export class ModelSignalController {
  constructor(@Inject(GetModelSignals) private readonly getModelSignals: GetModelSignals) {}

  @Get()
  async list() {
    const data = await this.getModelSignals.execute();
    return { data };
  }
}
