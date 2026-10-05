import type { User, UserRecord } from "../../domain/user/user.js";

export const USER_STORE = Symbol("USER_STORE");

export interface UserStore {
  findByEmail(email: string): Promise<UserRecord | null>;
  findById(id: string): Promise<User | null>;
  save(user: UserRecord): Promise<UserRecord>;
}
