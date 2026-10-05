export interface PasswordHasher {
  hash(password: string): Promise<string>;
  verify(password: string, stored: string): Promise<boolean>;
}

export interface TokenIssuer {
  issue(user: { id: string; email: string }): string;
}
