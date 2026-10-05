import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import type { Request } from "express";
import { USER_STORE, type UserStore } from "../../../application/ports/user-store.js";
import { UnauthorizedError } from "../../../domain/shared/errors.js";
import type { User } from "../../../domain/user/user.js";
import { readAuthToken } from "../../../infrastructure/auth/token.js";

export type AuthedRequest = Request & { user: User };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(USER_STORE) private readonly users: UserStore) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthedRequest>();
    const header = req.headers.authorization ?? "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    const payload = token ? readAuthToken(token) : null;
    if (!payload) {
      throw new UnauthorizedError("Sign in required");
    }
    const user = await this.users.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedError("Sign in required");
    }
    req.user = user;
    return true;
  }
}
