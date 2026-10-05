const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const AUTH_STORAGE_KEY = "watchlog.auth";

export function readStoredToken(): string | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as {
      token?: string;
      state?: { token?: string };
    };
    return parsed.state?.token ?? parsed.token ?? null;
  } catch {
    return null;
  }
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function parseError(response: Response): Promise<string> {
  const body = (await readJson(response)) as { error?: { message?: string } } | null;
  return (
    body?.error?.message ??
    (response.status === 401
      ? "Invalid email or password"
      : `Request failed: ${response.status}`)
  );
}

export async function httpJson<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const token = readStoredToken();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  if (!response.ok) {
    throw new ApiError(await parseError(response), response.status);
  }

  const payload = await readJson(response);
  if (payload === null) {
    throw new ApiError("Empty response from server", response.status);
  }
  return payload as T;
}
