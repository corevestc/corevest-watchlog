import { ConflictError } from "../../../domain/shared/errors.js";

export function rethrowPg(error: unknown): never {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "23505"
  ) {
    throw new ConflictError("Row already exists for this unique key");
  }
  throw error;
}
