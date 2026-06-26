"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Admin Login | CMS Portal - CovaiTech Park";
    // If already logged in with valid state, redirect
    const token = localStorage.getItem("admin_token");
    const userJson = localStorage.getItem("admin_user");
    if (token && userJson) {
      window.location.href = "/covaitechpark/admin";
    } else {
      // Clear any partial/corrupt login state to prevent redirect loops
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_user", JSON.stringify(data.user));
        window.location.href = "/covaitechpark/admin";
      } else {
        setError(data.message || data.errors?.email?.[0] || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login request error", err);
      setError("Unable to connect to the authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070c14] flex flex-col lg:flex-row select-none font-sans antialiased">
      {/* ── LEFT PANEL: Exact Instagram-style layout for CovaiTech ── */}
      <div className="flex w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen bg-[#05080c] relative overflow-hidden flex-col justify-between p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/45">
        {/* Subtle background glow */}
        <div className="absolute top-[-20%] left-[-20%] w-[90%] h-[90%] rounded-full bg-[#f37021]/8 blur-[140px] pointer-events-none z-0" />

        {/* Top brand logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className=" px-3.5 py-2 rounded-2xl ">
            <Image
              src="/covaitechpark/covai-tech-park-logo-white.png"
              alt="CovaiTech logo"
              width={105}
              height={42}
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
            />
          </div>

        </div>

        {/* Centerpiece Content */}
        <div className="relative z-10 my-auto w-full flex flex-col pt-10 items-center text-center max-w-2xl mx-auto">
          {/* Headline centered, matching reference styling */}
          <h2 className="text-2xl sm:text-3xl xl:text-3xl font-normal tracking-tight text-white leading-[1.3] mb-12 max-w-md">
            Control your digital workspace with <span className="bg-gradient-to-r from-[#f37021] to-[#d83b01] bg-clip-text text-transparent font-medium">absolute security</span>.
          </h2>
          {/* Overlapping mobile phone mockups exactly mimicking the screenshot */}
          <div className="relative w-full max-w-[320px] sm:max-w-[420px] h-[260px] sm:h-[340px] flex items-center justify-center select-none pointer-events-none transform scale-90 sm:scale-100">
            {/* Left Mockup (rotated slightly left) */}
            <div className="absolute left-[-20px] sm:left-[-30px] top-[30px] sm:top-[40px] w-[160px] sm:w-[208px] aspect-[4/5] rounded-[2rem] overflow-hidden border-[3px] border-[#181d27] bg-[#0c0f16] shadow-2xl rotate-[-8deg] z-0">
              <Image
                src="/covaitechpark/workspace-cabin.png"
                alt="Workspace Cabin"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 160px, 208px"
              />
            </div>

            {/* Right Mockup (rotated slightly right) */}
            <div className="absolute right-[-20px] sm:right-[-30px] top-[30px] sm:top-[40px] w-[160px] sm:w-[208px] aspect-[4/5] rounded-[2rem] overflow-hidden border-[3px] border-[#181d27] bg-[#0c0f16] shadow-2xl rotate-[8deg]  z-0">
              <Image
                src="/covaitechpark/workspace-meeting.png"
                alt="Workspace Meeting"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 160px, 208px"
              />
            </div>

            {/* Center Main Mockup (straight, on top) */}
            <div className="absolute top-0 w-[180px] sm:w-[240px] aspect-[4/5] rounded-[2.2rem] overflow-hidden border-[4px] border-[#1f2635] bg-[#0c0f16] shadow-2xl z-10">
              <Image
                src="/covaitechpark/workspace-lounge.png"
                alt="Workspace Lounge"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 180px, 240px"
              />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f37021] animate-pulse" />
              </div>
            </div>

          </div>
        </div>


      </div>

      {/* ── RIGHT PANEL: Clean Dark Form Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 relative overflow-hidden min-h-[40vh] lg:min-h-screen">
        {/* Glow Effects (Visible only on mobile/tablet) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#f37021]/10 blur-[100px] rounded-full pointer-events-none lg:hidden z-0" />

        <div className="relative z-10 w-full max-w-md space-y-8">
          {/* Header */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-3xl font-medium tracking-tight text-white font-sans">CMS Admin Login</h1>
            <p className="text-slate-400 text-sm mt-2 font-normal">Please enter administrative credentials to access portal</p>
          </div>

          {/* Validation Alert */}
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-2xl flex items-center gap-2.5">
              <svg className="w-4.5 h-4.5 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest block">Email Address</label>
              <input
                type="email"
                required
                placeholder="admin@covaitech.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#101826] border border-white/5 focus:border-[#f37021]/50 rounded-2xl px-4.5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:bg-[#121c2c] transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest block">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#101826] border border-white/5 focus:border-[#f37021]/50 rounded-2xl px-4.5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:bg-[#121c2c] transition-all font-medium"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4.5 bg-[#f37021] hover:bg-[#d55c14] disabled:bg-[#f37021]/50 text-white text-xs font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-xl shadow-[#f37021]/15 hover:shadow-[#f37021]/25 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed select-none"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Authenticating...
                  </>
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
