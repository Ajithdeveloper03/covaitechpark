/**
 * adminApi.ts — Secure fetch wrapper for the admin dashboard.
 *
 * Security features:
 * - Token read from sessionStorage (auto-cleared when tab closes)
 * - 401/403 responses automatically clear session and redirect to login
 * - Input is never interpolated into query strings (always JSON body)
 * - Timeout on all requests (8 seconds) via AbortSignal
 * - Legacy localStorage tokens are migrated and cleared automatically
 */

import { getAdminToken } from "./hooks/useAdminAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const BASE_PATH = "";
const TIMEOUT_MS = 8000;

function redirectToLogin(): void {
  sessionStorage.removeItem("admin_token");
  sessionStorage.removeItem("admin_user");
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
  window.location.href = `${BASE_PATH}/admin/login`;
}

export async function adminFetch(
  path: string,
  options: RequestInit = {}
): Promise<{ ok: boolean; status: number; data: unknown }> {
  // Migrate old localStorage token to sessionStorage (one-time migration)
  const oldToken = localStorage.getItem("admin_token");
  if (oldToken && !sessionStorage.getItem("admin_token")) {
    sessionStorage.setItem("admin_token", oldToken);
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  }

  const token = getAdminToken();

  if (!token) {
    redirectToLogin();
    return { ok: false, status: 401, data: null };
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    ...(options.body && typeof options.body === "string"
      ? { "Content-Type": "application/json" }
      : {}),
    ...(options.headers as Record<string, string> | undefined),
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Expired or invalid token
    if (res.status === 401 || res.status === 403) {
      redirectToLogin();
      return { ok: false, status: res.status, data: null };
    }

    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.error("[adminFetch] Request timed out:", path);
      return { ok: false, status: 408, data: { message: "Request timed out" } };
    }
    // Network / CORS error
    console.error("[adminFetch] Network error:", err);
    return { ok: false, status: 0, data: null };
  }
}

/** Convenience wrappers */
export const adminGet    = (path: string) => adminFetch(path, { method: "GET" });
export const adminPost   = (path: string, body: unknown) =>
  adminFetch(path, { method: "POST", body: JSON.stringify(body) });
export const adminPut    = (path: string, body: unknown) =>
  adminFetch(path, { method: "PUT", body: JSON.stringify(body) });
export const adminDelete = (path: string) => adminFetch(path, { method: "DELETE" });

/** Upload file (multipart/form-data — no Content-Type override) */
export async function adminUpload(formData: FormData): Promise<{ ok: boolean; path: string }> {
  const token = getAdminToken();
  if (!token) { redirectToLogin(); return { ok: false, path: "" }; }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s for uploads

    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.status === 401 || res.status === 403) { redirectToLogin(); return { ok: false, path: "" }; }
    if (!res.ok) return { ok: false, path: "" };

    const data = await res.json();
    return { ok: true, path: data.path ?? "" };
  } catch {
    return { ok: false, path: "" };
  }
}
