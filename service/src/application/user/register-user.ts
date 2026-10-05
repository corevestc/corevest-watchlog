import { randomUUID } from "node:crypto";
import { ConflictError } from "../../domain/shared/errors.js";
import { assertPassword, normalizeEmail } from "../../domain/user/credentials.js";
import type { User } from "../../domain/user/user.js";
import type { PasswordHasher, TokenIssuer } from "../ports/auth-crypto.js";
import type { UserStore } from "../ports/user-store.js";

export interface AuthSession {
  token: string;
  user: User;
}

export class RegisterUser {
  constructor(
    private readonly users: UserStore,
    private readonly passwords: PasswordHasher,
    private readonly tokens: TokenIssuer
  ) {}

  async execute(input: { email: string; password: string }): Promise<AuthSession> {
    const email = normalizeEmail(input.email);
    assertPassword(input.password);

    const existing = await this.users.findByEmail(email);
    if (existing) {
      throw new ConflictError("An account with this email already exists");
    }

    const saved = await this.users.save({
      id: randomUUID(),
      email,
      provider: "local",
      providerId: null,
      passwordHash: await this.passwords.hash(input.password)
    });

    const user: User = {
      id: saved.id,
      email: saved.email,
      provider: saved.provider
    };

    return { token: this.tokens.issue(user), user };
  }
}
