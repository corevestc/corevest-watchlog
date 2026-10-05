export const PG_POOL = Symbol("PG_POOL");

export const DSE_CONFIG = Symbol("DSE_CONFIG");

export type DseConfig = {
  baseUrl: string;
  apiKey: string;
};
