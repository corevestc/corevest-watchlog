import { AUTH_STORAGE_KEY } from "@/infrastructure/http/http-json";
import type { AuthSession, AuthUser } from "@/domain/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (session) =>
        set({ token: session.token, user: session.user }),
      clearSession: () => set({ token: null, user: null })
    }),
    { name: AUTH_STORAGE_KEY }
  )
);
