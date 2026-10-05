import type { ModelSignal } from "../../domain/shared/index.js";

export interface ModelSignalProvider {
  getSignals(): Promise<ModelSignal[]>;
}
