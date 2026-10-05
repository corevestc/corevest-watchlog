import { NotFoundError } from "../../domain/shared/errors.js";
import type { User } from "../../domain/user/user.js";
import type { UserStore } from "../ports/user-store.js";

export class GetCurrentUser {
  constructor(private readonly users: UserStore) {}

  async execute(userId: string): Promise<User> {
    const user = await this.users.findById(userId);
    if (!user) {
      throw new NotFoundError("Account not found");
    }
    return user;
  }
}
