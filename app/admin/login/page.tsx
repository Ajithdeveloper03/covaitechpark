"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { setAdminSession } from "../hooks/useAdminAuth";

const BASE_PATH = "/covaitechpark";

/** Sanitize input on the client side before sending to API */
function sanitizeInput(value: string): string {
  return value.trim().slice(0, 255); // max length guard
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [botField, setBotField] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  // Initialize lockout state from localStorage
  useEffect(() => {
    const failedAttempts = parseInt(localStorage.getItem("admin_failed_attempts") || "0", 10);
    const lockoutUntil = parseInt(localStorage.getItem("admin_lockout_until") || "0", 10);
    
    if (lockoutUntil > Date.now()) {
      setIsLocked(true);
      setError("Too many failed attempts. Please try again later.");
    } else if (lockoutUntil && lockoutUntil < Date.now()) {
      localStorage.removeItem("admin_failed_attempts");
      localStorage.removeItem("admin_lockout_until");
    }
  }, []);

  useEffect(() => {
    document.title = "Admin Login | CMS Portal - CovaiTech Park";

    // If already logged in, redirect
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      window.location.href = `${BASE_PATH}/admin`;
    } else {
      // Clear any stale session data
      sessionStorage.removeItem("admin_token");
      sessionStorage.removeItem("admin_user");
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    }

    // Focus email field
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLocked) return;

    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);

    // Basic client-side validation
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (cleanPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Bot prevention (honeypot)
    if (botField !== "") {
      setError("Suspicious activity detected. Request blocked.");
      return;
    }

    // Enforce 5 attempt limit locally
    const failedAttempts = parseInt(localStorage.getItem("admin_failed_attempts") || "0", 10);
    if (failedAttempts >= 5) {
      const lockoutTime = Date.now() + 15 * 60 * 1000; // 15 mins
      localStorage.setItem("admin_lockout_until", lockoutTime.toString());
      setIsLocked(true);
      setError("Maximum login attempts exceeded. Your IP has been locked out for 15 minutes.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // Prevent CSRF by including a custom header (non-simple request triggers preflight)
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
        signal: AbortSignal.timeout(10000),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Reset failed attempts on success
        localStorage.removeItem("admin_failed_attempts");
        localStorage.removeItem("admin_lockout_until");

        // Store in sessionStorage (auto-clears when tab closes)
        setAdminSession(data.token, data.user);
        window.location.href = `${BASE_PATH}/admin`;

      } else if (response.status === 429) {
        // Rate limited / locked out
        setIsLocked(true);
        setError("Too many failed attempts. Your IP has been temporarily locked. Please try again in 15 minutes.");

      } else {
        const msg = data.errors?.email?.[0] || data.message || "Invalid credentials.";
        
        // Track failed attempt
        const newFailedCount = failedAttempts + 1;
        localStorage.setItem("admin_failed_attempts", newFailedCount.toString());
        
        if (newFailedCount >= 5) {
          const lockoutTime = Date.now() + 15 * 60 * 1000;
          localStorage.setItem("admin_lockout_until", lockoutTime.toString());
          setIsLocked(true);
          setError("Maximum login attempts exceeded. You are locked out for 15 minutes.");
        } else {
          setError(msg);
          setAttemptsLeft(5 - newFailedCount);
        }

        // Clear password on failed attempt
        setPassword("");
      }

    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out. Please check your connection and try again.");
      } else {
        setError("Unable to connect to the authentication server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070c14] flex flex-col lg:flex-row select-none font-sans antialiased">
      {/* ── LEFT PANEL ── */}
      <div className="flex w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen bg-[#05080c] relative overflow-hidden flex-col justify-between p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/45">
        <div className="absolute top-[-20%] left-[-20%] w-[90%] h-[90%] rounded-full bg-[#f37021]/8 blur-[140px] pointer-events-none z-0" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl">
            <Image
              src={`${BASE_PATH}/covai-tech-park-logo-white.png`}
              alt="CovaiTech logo"
              width={105}
              height={42}
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
              priority
            />
          </div>
        </div>

        <div className="relative z-10 my-auto w-full flex flex-col pt-10 items-center text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl xl:text-3xl font-normal tracking-tight text-white leading-[1.3] mb-12 max-w-md">
            Control your digital workspace with{" "}
            <span className="bg-gradient-to-r from-[#f37021] to-[#d83b01] bg-clip-text text-transparent font-medium">
              absolute security
            </span>.
          </h2>

          {/* Mockup phones */}
          <div className="relative w-full max-w-[320px] sm:max-w-[420px] h-[260px] sm:h-[340px] flex items-center justify-center select-none pointer-events-none transform scale-90 sm:scale-100">
            <div className="absolute left-[-20px] sm:left-[-30px] top-[30px] sm:top-[40px] w-[160px] sm:w-[208px] aspect-[4/5] rounded-[2rem] overflow-hidden border-[3px] border-[#181d27] bg-[#0c0f16] shadow-2xl rotate-[-8deg] z-0">
              <Image src={`${BASE_PATH}/workspace-cabin.png`} alt="Workspace Cabin" fill className="object-cover" sizes="208px" />
            </div>
            <div className="absolute right-[-20px] sm:right-[-30px] top-[30px] sm:top-[40px] w-[160px] sm:w-[208px] aspect-[4/5] rounded-[2rem] overflow-hidden border-[3px] border-[#181d27] bg-[#0c0f16] shadow-2xl rotate-[8deg] z-0">
              <Image src={`${BASE_PATH}/workspace-meeting.png`} alt="Workspace Meeting" fill className="object-cover" sizes="208px" />
            </div>
            <div className="absolute top-0 w-[180px] sm:w-[240px] aspect-[4/5] rounded-[2.2rem] overflow-hidden border-[4px] border-[#1f2635] bg-[#0c0f16] shadow-2xl z-10">
              <Image src={`${BASE_PATH}/workspace-lounge.png`} alt="Workspace Lounge" fill className="object-cover" sizes="240px" />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f37021] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Security badge */}
        <div className="relative z-10 flex items-center gap-2 mt-6">
          <svg className="w-4 h-4 text-[#f37021]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <span className="text-[11px] text-white/30 font-medium tracking-widest uppercase">Protected by Sanctum • Session Auth</span>
        </div>
      </div>

      {/* ── RIGHT PANEL: Login Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 relative overflow-hidden min-h-[40vh] lg:min-h-screen">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#f37021]/10 blur-[100px] rounded-full pointer-events-none lg:hidden z-0" />

        <div className="relative z-10 w-full max-w-md space-y-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-3xl font-medium tracking-tight text-white font-sans">CMS Admin Login</h1>
            <p className="text-slate-400 text-sm mt-2 font-normal">
              Please enter administrative credentials to access portal
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div
              role="alert"
              className={`p-4 border text-xs font-semibold rounded-2xl flex items-start gap-2.5 ${
                isLocked
                  ? "bg-red-900/20 border-red-500/40 text-red-400"
                  : "bg-rose-500/10 border-rose-500/20 text-rose-400"
              }`}
            >
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                {error}
                {attemptsLeft !== null && !isLocked && (
                  <p className="mt-1 text-rose-300/70 font-normal">
                    {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} remaining before IP lockout.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off" noValidate>
            {/* Honeypot — hidden field, bots fill it, humans don't */}
            <input type="text" name="bot_field" style={{ display: "none" }} tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />

            <div className="space-y-2">
              <label htmlFor="admin-email" className="text-xs font-medium text-slate-400 uppercase tracking-widest block">
                Email Address
              </label>
              <input
                id="admin-email"
                ref={emailRef}
                type="email"
                required
                autoComplete="username"
                placeholder="admin@covaitechpark.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLocked || loading}
                maxLength={255}
                className="w-full bg-[#101826] border border-white/5 focus:border-[#f37021]/50 rounded-2xl px-4 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:bg-[#121c2c] transition-all font-medium disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-xs font-medium text-slate-400 uppercase tracking-widest block">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLocked || loading}
                maxLength={128}
                className="w-full bg-[#101826] border border-white/5 focus:border-[#f37021]/50 rounded-2xl px-4 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:bg-[#121c2c] transition-all font-medium disabled:opacity-50"
              />
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading || isLocked} className="w-full py-4 bg-[#f37021] hover:bg-[#d55c14] disabled:bg-[#f37021]/40 text-white text-xs font-bold tracking-widest rounded-2xl transition-all duration-300 shadow-xl shadow-[#f37021]/15 hover:shadow-[#f37021]/25 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed select-none" >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Authenticating...
                  </>
                ) : isLocked ? (
                  "Account Locked"
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </main>
  );
}
