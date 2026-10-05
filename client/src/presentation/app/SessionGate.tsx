import { useEffect, useState, type ReactNode } from "react";
import { useAuthStore } from "@/presentation/hooks/useAuthStore";
import "@/presentation/app/auth-gate.css";

const LOGIN = "/account.html?mode=login";

export function SessionGate({ children }: { children: ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const [hydrated, setHydrated] = useState(() =>
    useAuthStore.persist.hasHydrated()
  );

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    return useAuthStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (!token) {
      window.location.replace(LOGIN);
      return;
    }
    document.documentElement.setAttribute("data-authed", "1");
  }, [hydrated, token]);

  if (!hydrated || !token) {
    return (
      <div className="flex min-h-svh items-center justify-center text-sm text-text-100">
        Checking account…
      </div>
    );
  }

  return (
    <>
      {children}
      <button
        type="button"
        className="watchlog-sign-out"
        onClick={() => {
          useAuthStore.getState().clearSession();
          window.location.replace(LOGIN);
        }}
      >
        Sign out
      </button>
    </>
  );
}
