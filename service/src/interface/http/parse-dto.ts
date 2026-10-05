import type { z } from "zod";
import { HttpError } from "./http-error.js";

export function parseDto<Schema extends z.ZodTypeAny>(
  schema: Schema,
  value: unknown
): z.infer<Schema> {
  const result = schema.safeParse(value);
  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".") || "body"}: ${issue.message}`)
      .join("; ");
    throw new HttpError(400, message);
  }
  return result.data;
}

export function todayUtcDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function queryString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}
