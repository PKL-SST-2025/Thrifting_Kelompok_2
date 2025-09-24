// Simple API client wrapper for the frontend
// - Uses localStorage authToken if present
// - Base URL can be overridden with VITE_API_BASE

export const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || "http://localhost:8080";

function getToken(): string | null {
  try {
    return localStorage.getItem("authToken");
  } catch {
    return null;
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export async function apiFetch<T = unknown>(
  path: string,
  opts: {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
    auth?: boolean; // default true
  } = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, auth = true } = opts;
  const token = getToken();
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };
  if (auth && token) finalHeaders["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${method} ${path} failed: ${res.status} ${res.statusText} ${text}`.trim());
  }

  // Try parse JSON; if empty, return as any
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json() as Promise<T>;
  }
  return (await res.text()) as unknown as T;
}

// Domain helpers
export type NotificationSettings = {
  email: boolean;
  newArrivals: boolean;
  promotions: boolean;
  orderUpdates: boolean;
};

export async function getNotificationSettings(): Promise<NotificationSettings> {
  return apiFetch<NotificationSettings>("/notifications/settings", { method: "GET" });
}

export async function updateNotificationSettings(payload: NotificationSettings): Promise<{ ok: boolean } | NotificationSettings> {
  return apiFetch("/notifications/settings", { method: "POST", body: payload });
}
