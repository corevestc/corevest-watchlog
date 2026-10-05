export type AuthProvider = "local" | "google" | "github";

export interface User {
  id: string;
  email: string;
  provider: AuthProvider;
}

export interface UserRecord extends User {
  passwordHash: string | null;
  providerId: string | null;
}
