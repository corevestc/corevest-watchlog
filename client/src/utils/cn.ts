import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Presentation helper. Path kept for TailGrids primitives that import `@/utils/cn`. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
