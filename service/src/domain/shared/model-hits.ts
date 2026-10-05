export const MODEL_HORIZONS = [3, 5, 7] as const;

export type ModelHorizon = (typeof MODEL_HORIZONS)[number];

export interface ModelHits {
  d3: boolean | null;
  d5: boolean | null;
  d7: boolean | null;
}

export function emptyModelHits(): ModelHits {
  return { d3: null, d5: null, d7: null };
}

export function normalizeModelHits(value?: Partial<ModelHits> | null): ModelHits {
  return {
    d3: value?.d3 ?? null,
    d5: value?.d5 ?? null,
    d7: value?.d7 ?? null
  };
}

export function mergeModelHits(
  current: ModelHits,
  patch?: Partial<ModelHits> | null
): ModelHits {
  if (!patch) {
    return current;
  }
  return {
    d3: patch.d3 !== undefined ? patch.d3 : current.d3,
    d5: patch.d5 !== undefined ? patch.d5 : current.d5,
    d7: patch.d7 !== undefined ? patch.d7 : current.d7
  };
}

export function hasModelOutcome(hits: ModelHits): boolean {
  return hits.d3 !== null || hits.d5 !== null || hits.d7 !== null;
}

export function anyModelHit(hits: ModelHits): boolean {
  return hits.d3 === true || hits.d5 === true || hits.d7 === true;
}
