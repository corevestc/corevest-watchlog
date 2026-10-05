import type { AuthApi } from "../ports/auth-api";
import type { AuthSession } from "../../domain/user";

export class RegisterAccount {
  constructor(private readonly auth: AuthApi) {}

  execute(email: string, password: string): Promise<AuthSession> {
    return this.auth.register(email, password);
  }
}
