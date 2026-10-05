import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/presentation/hooks/useAuthStore";
import { authPaths } from "@/presentation/routes/auth-paths";

export function RequireAuth() {
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

  if (!hydrated) {
    return null;
  }
  if (!token) {
    return <Navigate to={authPaths.login} replace />;
  }
  return <Outlet />;
}
