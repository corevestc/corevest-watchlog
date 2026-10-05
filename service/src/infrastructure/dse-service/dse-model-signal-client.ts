import type { ModelSignalProvider } from "../../application/ports/model-signal-provider.js";
import type { ModelSignal } from "../../domain/shared/index.js";

export class DseModelSignalClient implements ModelSignalProvider {
  constructor(
    private readonly config: { baseUrl: string; apiKey?: string }
  ) {}

  async getSignals(): Promise<ModelSignal[]> {
    void this.config;
    return [];
  }
}
