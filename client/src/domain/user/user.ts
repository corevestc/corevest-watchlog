export type AuthProvider = "local" | "google" | "github";

export interface AuthUser {
  id: string;
  email: string;
  provider: AuthProvider;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}
