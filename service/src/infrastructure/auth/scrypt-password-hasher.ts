import type { PasswordHasher } from "../../application/ports/auth-crypto.js";
import { hashPassword, verifyPassword } from "./password.js";

export class ScryptPasswordHasher implements PasswordHasher {
  hash(password: string): Promise<string> {
    return hashPassword(password);
  }

  verify(password: string, stored: string): Promise<boolean> {
    return verifyPassword(password, stored);
  }
}
