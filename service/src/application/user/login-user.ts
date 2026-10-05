import { UnauthorizedError } from "../../domain/shared/errors.js";
import { normalizeEmail } from "../../domain/user/credentials.js";
import type { User } from "../../domain/user/user.js";
import type { PasswordHasher, TokenIssuer } from "../ports/auth-crypto.js";
import type { UserStore } from "../ports/user-store.js";
import type { AuthSession } from "./register-user.js";

export class LoginUser {
  constructor(
    private readonly users: UserStore,
    private readonly passwords: PasswordHasher,
    private readonly tokens: TokenIssuer
  ) {}

  async execute(input: { email: string; password: string }): Promise<AuthSession> {
    const email = normalizeEmail(input.email);
    const record = await this.users.findByEmail(email);

    if (!record?.passwordHash) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const ok = await this.passwords.verify(input.password, record.passwordHash);
    if (!ok) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const user: User = {
      id: record.id,
      email: record.email,
      provider: record.provider
    };

    return { token: this.tokens.issue(user), user };
  }
}
