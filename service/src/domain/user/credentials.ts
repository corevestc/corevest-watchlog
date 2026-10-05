import { DomainError } from "../shared/errors.js";

const EMAIL =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string): string {
  const value = email.trim().toLowerCase();
  if (!EMAIL.test(value)) {
    throw new DomainError("Enter a valid email");
  }
  return value;
}

export function assertPassword(password: string): void {
  if (password.length < 8) {
    throw new DomainError("Password must be at least 8 characters");
  }
}
