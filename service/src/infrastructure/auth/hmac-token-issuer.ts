import type { TokenIssuer } from "../../application/ports/auth-crypto.js";
import type { User } from "../../domain/user/user.js";
import { issueAuthToken } from "./token.js";

export class HmacTokenIssuer implements TokenIssuer {
  issue(user: User): string {
    return issueAuthToken(user);
  }
}
