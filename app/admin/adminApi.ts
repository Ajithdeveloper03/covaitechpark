/**
 * adminApi.ts — shared fetch wrapper for the admin dashboard.
 * - Automatically injects the Bearer token from localStorage.
 * - On 401 (expired / invalid token), clears localStorage and redirects to login.
 * - Returns { ok: boolean, data, status } so callers can handle without boilerplate.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function redirectToLogin() {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
  window.location.href = "/covaitechpark/admin/login";
}

export async function adminFetch(
  path: string,
  options: RequestInit = {}
): Promise<{ ok: boolean; status: number; data: unknown }> {
  const token = localStorage.getItem("admin_token");

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.body && typeof options.body === "string"
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> | undefined),
  };

  try {
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

    // Session expired — redirect to login
    if (res.status === 401) {
      redirectToLogin();
      return { ok: false, status: 401, data: null };
    }

    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    return { ok: res.ok, status: res.status, data };
  } catch {
    // Network / CORS error
    return { ok: false, status: 0, data: null };
  }
}

/** Convenience wrappers */
export const adminGet  = (path: string) => adminFetch(path, { method: "GET" });
export const adminPost = (path: string, body: unknown) =>
  adminFetch(path, { method: "POST", body: JSON.stringify(body) });
export const adminPut  = (path: string, body: unknown) =>
  adminFetch(path, { method: "PUT", body: JSON.stringify(body) });
export const adminDelete = (path: string) => adminFetch(path, { method: "DELETE" });

/** Upload file (multipart/form-data — no Content-Type override) */
export async function adminUpload(formData: FormData): Promise<{ ok: boolean; path: string }> {
  const token = localStorage.getItem("admin_token");
  try {
    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: "POST",
      headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: formData,
    });
    if (res.status === 401) { redirectToLogin(); return { ok: false, path: "" }; }
    if (!res.ok) return { ok: false, path: "" };
    const data = await res.json();
    return { ok: true, path: data.path ?? "" };
  } catch {
    return { ok: false, path: "" };
  }
}
