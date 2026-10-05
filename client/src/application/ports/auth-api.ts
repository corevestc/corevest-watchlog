import type { AuthSession, AuthUser } from "../../domain/user";

export interface AuthApi {
  register(email: string, password: string): Promise<AuthSession>;
  login(email: string, password: string): Promise<AuthSession>;
  me(): Promise<AuthUser>;
}
