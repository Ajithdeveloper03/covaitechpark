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
    // If already logged in, redirect
    const token = localStorage.getItem("admin_token");
    if (token) {
      window.location.href = "/covaitechpark/admin";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
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
    <main className="min-h-screen bg-[#060d17] flex items-center justify-center p-6 relative overflow-hidden select-none font-sans antialiased">
      {/* Background glow graphics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#f37021]/15 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00d2ff]/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Glass login card */}
      <div className="relative z-10 w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-black/45">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white p-3 rounded-2xl shadow-lg mb-4 hover:scale-[1.02] transition-transform duration-300">
            <Image 
              src="/covaitechpark/covai-tech-park-logo.png" 
              alt="CovaiTech logo" 
              width={140} 
              height={45}
              className="h-9 w-auto object-contain"
            />
          </div>
          <h1 className="text-xl font-medium text-white tracking-wide">CMS Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-1.5 font-normal">Please enter credentials to continue</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium rounded-xl flex items-center gap-2 animate-shake">
            <svg className="w-4.5 h-4.5 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 uppercase tracking-widest block">Email Address</label>
            <input
              type="email"
              required
              placeholder="admin@covaitech.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#f37021]/50 focus:bg-white/10 transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 uppercase tracking-widest block">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#f37021]/50 focus:bg-white/10 transition-all font-medium"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#f37021] hover:bg-[#d55c14] disabled:bg-[#f37021]/50 text-white text-sm font-medium uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-[#f37021]/15 hover:shadow-[#f37021]/25 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed select-none"
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
    </main>
  );
}
