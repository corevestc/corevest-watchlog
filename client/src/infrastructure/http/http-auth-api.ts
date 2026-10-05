import type { AuthApi } from "../../application/ports/auth-api";
import type { AuthSession, AuthUser } from "../../domain/user";
import { httpJson } from "./http-json";

interface Envelope<T> {
  data: T;
}

export class HttpAuthApi implements AuthApi {
  register(email: string, password: string): Promise<AuthSession> {
    return httpJson<Envelope<AuthSession>>("POST", "/api/v1/auth/register", {
      email,
      password
    }).then((payload) => payload.data);
  }

  login(email: string, password: string): Promise<AuthSession> {
    return httpJson<Envelope<AuthSession>>("POST", "/api/v1/auth/login", {
      email,
      password
    }).then((payload) => payload.data);
  }

  me(): Promise<AuthUser> {
    return httpJson<Envelope<AuthUser>>("GET", "/api/v1/auth/me").then(
      (payload) => payload.data
    );
  }
}
