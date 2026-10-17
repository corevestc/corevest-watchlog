import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextField } from "@/components/ui/text-field";
import { ApiError } from "@/infrastructure/http/http-json";
import { useAuthStore } from "@/presentation/hooks/useAuthStore";
import { useClient } from "@/presentation/hooks/useClient";
import { authPaths } from "@/presentation/routes/auth-paths";

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useClient();
  const setSession = useAuthStore((state) => state.setSession);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const session = await signIn.execute(email, password);
      setSession(session);
      navigate(paths.dashboard, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not sign in");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell>
      <Card className="border border-base-100 shadow-xs">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Email and password. Social login comes later.</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="flex flex-col gap-4">
            {error ? (
              <p className="text-sm text-danger-500" role="alert">
                {error}
              </p>
            ) : null}
            <TextField>
              <Label>Email</Label>
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </TextField>
            <TextField>
              <Label>Password</Label>
              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </TextField>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-3 pt-2">
            <Button type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </Button>
            <p className="text-center text-sm text-text-100">
              New here?{" "}
              <Link className="text-primary-500" to={authPaths.register}>
                Create an account
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </AuthShell>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { registerAccount } = useClient();
  const setSession = useAuthStore((state) => state.setSession);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const session = await registerAccount.execute(email, password);
      setSession(session);
      navigate(paths.dashboard, { replace: true });
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not create account"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell>
      <Card className="border border-base-100 shadow-xs">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Only email and a password. That’s it.</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="flex flex-col gap-4">
            {error ? (
              <p className="text-sm text-danger-500" role="alert">
                {error}
              </p>
            ) : null}
            <TextField>
              <Label>Email</Label>
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </TextField>
            <TextField>
              <Label>Password (8+ characters)</Label>
              <Input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
              />
            </TextField>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-3 pt-2">
            <Button type="submit" disabled={busy}>
              {busy ? "Creating…" : "Create account"}
            </Button>
            <p className="text-center text-sm text-text-100">
              Already have one?{" "}
              <Link className="text-primary-500" to={authPaths.login}>
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </AuthShell>
  );
}

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background-soft-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <img
            src="/corevest-logo.jpg?v=2"
            alt="CoreVest Capital"
            className="h-auto w-60 max-w-full rounded-lg bg-white"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
