import type { UserStore } from "../../application/ports/user-store.js";
import type { AuthProvider, User, UserRecord } from "../../domain/user/user.js";
import type { PostgresPool } from "../database/postgres/pool.js";
import { rethrowPg } from "../database/postgres/pg-errors.js";

interface UserRow {
  id: string;
  email: string;
  password_hash: string | null;
  provider: AuthProvider;
  provider_id: string | null;
}

function toRecord(row: UserRow): UserRecord {
  return {
    id: row.id,
    email: row.email,
    provider: row.provider,
    providerId: row.provider_id,
    passwordHash: row.password_hash
  };
}

function toUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    provider: row.provider
  };
}

export class PostgresUserStore implements UserStore {
  constructor(private readonly pool: PostgresPool) {}

  async findByEmail(email: string): Promise<UserRecord | null> {
    const result = await this.pool.query<UserRow>(
      `SELECT id, email, password_hash, provider, provider_id
       FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] ? toRecord(result.rows[0]) : null;
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.pool.query<UserRow>(
      `SELECT id, email, password_hash, provider, provider_id
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] ? toUser(result.rows[0]) : null;
  }

  async save(user: UserRecord): Promise<UserRecord> {
    try {
      const result = await this.pool.query<UserRow>(
        `INSERT INTO users (
           id, email, password_hash, provider, provider_id, updated_at
         ) VALUES ($1, $2, $3, $4, $5, now())
         ON CONFLICT (id) DO UPDATE SET
           email = EXCLUDED.email,
           password_hash = EXCLUDED.password_hash,
           provider = EXCLUDED.provider,
           provider_id = EXCLUDED.provider_id,
           updated_at = now()
         RETURNING id, email, password_hash, provider, provider_id`,
        [user.id, user.email, user.passwordHash, user.provider, user.providerId]
      );
      if (!result.rows[0]) {
        throw new Error("user save returned no row");
      }
      return toRecord(result.rows[0]);
    } catch (error) {
      rethrowPg(error);
    }
  }
}
