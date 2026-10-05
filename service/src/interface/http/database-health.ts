export const DATABASE_HEALTH = Symbol("DATABASE_HEALTH");

export type DatabaseHealthCheck = () => Promise<boolean>;
