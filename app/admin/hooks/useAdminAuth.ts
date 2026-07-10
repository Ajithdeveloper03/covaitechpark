/**
 * useAdminAuth.ts
 *
 * Shared authentication hook for every admin page.
 * - Verifies the stored token against the backend /me endpoint on mount.
 * - Automatically redirects to /admin/login if unauthenticated or token expired.
 * - Returns { user, loading } so pages can gate rendering.
 *
 * Security features:
 * - Token stored in sessionStorage (cleared on tab close) instead of persistent localStorage
 * - Every page mount does a live server-side token check (not just local check)
 * - Handles 401 / 403 / network errors gracefully
 */

"use client";

import { useState, useEffect, useCallback } from "react";

const BASE_PATH = "";
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export interface AdminUser {
  id: number;
  name: string;
  email: string;
}

interface UseAdminAuthResult {
  user: AdminUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

/** Read token from sessionStorage (cleared on tab/browser close). */
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("admin_token");
}

/** Clear all admin session data. */
function clearSession(): void {
  sessionStorage.removeItem("admin_token");
  sessionStorage.removeItem("admin_user");
  // Also clear localStorage in case old data is there from previous version
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
}

/** Redirect to login page. */
function redirectToLogin(): void {
  window.location.href = `${BASE_PATH}/admin/login`;
}

export function useAdminAuth(): UseAdminAuthResult {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const verifySession = useCallback(async () => {
    const token = getToken();

    if (!token) {
      clearSession();
      redirectToLogin();
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Timeout via AbortController
        signal: AbortSignal.timeout(8000),
      });

      if (res.status === 401 || res.status === 403) {
        clearSession();
        redirectToLogin();
        return;
      }

      if (!res.ok) {
        // Network / server error — clear session and redirect to avoid infinite loading loop
        console.error("[AdminAuth] Server returned", res.status);
        clearSession();
        redirectToLogin();
        return;
      }

      const data = await res.json();
      setUser(data);
      // Refresh local cached user info
      sessionStorage.setItem("admin_user", JSON.stringify(data));
    } catch (err) {
      // AbortError = timeout; network error
      console.error("[AdminAuth] Session verification failed:", err);
      // Don't redirect on network errors (could be temporary) — just stop loading
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const logout = useCallback(async () => {
    const token = getToken();
    if (token) {
      try {
        await fetch(`${API_BASE}/logout`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch {
        // Ignore network errors during logout
      }
    }
    clearSession();
    setUser(null);
    redirectToLogin();
  }, []);

  // 15-minute inactivity auto-logout
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      // 15 minutes = 900000 ms
      timeoutId = setTimeout(() => {
        if (getToken()) {
          console.warn("[AdminAuth] Session expired due to inactivity.");
          logout();
        }
      }, 900000);
    };

    // Attach to common user interaction events
    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
    
    // Start initial timer
    resetTimer();
    
    events.forEach(event => window.addEventListener(event, resetTimer, { passive: true }));
    
    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [logout]);

  return { user, loading, logout };
}

/** Used in login page to store a new session token. */
export function setAdminSession(token: string, user: AdminUser): void {
  sessionStorage.setItem("admin_token", token);
  sessionStorage.setItem("admin_user", JSON.stringify(user));
  // Clear any old localStorage tokens
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
}

/** Used by adminApi.ts to get the current token. */
export function getAdminToken(): string | null {
  return getToken();
}
