import type { ModelSignal } from "../../domain/shared/index.js";
import type { ModelSignalProvider } from "../ports/model-signal-provider.js";

export class GetModelSignals {
  constructor(private readonly signals: ModelSignalProvider) {}

  execute(): Promise<ModelSignal[]> {
    return this.signals.getSignals();
  }
}
