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
