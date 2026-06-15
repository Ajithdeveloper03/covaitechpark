import React, { useEffect, useState } from "react";
import Image from "next/image";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: "dashboard" | "blogs" | "gallery";
}

export default function AdminLayout({ children, activeTab }: AdminLayoutProps) {
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("admin_token");
    const userJson = localStorage.getItem("admin_user");
    if (!token || !userJson) {
      window.location.href = "/covaitechpark/admin/login";
      return;
    }
    setAdminUser(JSON.parse(userJson));
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("admin_token");
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
    } catch (e) {
      console.error("Logout error", e);
    }
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    window.location.href = "/covaitechpark/admin/login";
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", path: "/admin", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
      </svg>
    )},
    { id: "blogs", label: "Blog Articles", path: "/admin/blogs", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    )},
    { id: "gallery", label: "Photo Gallery", path: "/admin/gallery", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )}
  ];

  if (!adminUser) return null;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex font-sans select-none antialiased">
      
      {/* ── SIDEBAR ── */}
      <aside className="w-72 bg-[#060d17] text-white flex flex-col justify-between shrink-0 border-r border-white/5 relative z-30">
        <div className="flex flex-col flex-1">
          {/* Logo container */}
          <div className="p-8 border-b border-white/5 flex items-center gap-3">
            <div className="bg-white p-2 rounded-2xl">
              <Image 
                src="/covaitechpark/covai-tech-park-logo.png" 
                alt="CovaiTech logo" 
                width={110} 
                height={35}
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-medium tracking-[0.2em] text-[#f37021] block leading-none">CMS PORTAL</span>
              <span className="text-sm font-medium text-white block mt-1">CovaiTech Park</span>
            </div>
          </div>

          {/* Navigation link list */}
          <nav className="p-6 flex-1 space-y-2">
            {navItems.map((item) => {
              const isSelected = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={`/covaitechpark${item.path}`}
                  className={`flex items-center gap-4 py-3.5 px-5 rounded-2xl text-sm font-medium transition-all duration-300 group ${
                    isSelected 
                      ? "bg-[#f37021] text-white shadow-lg shadow-[#f37021]/20 scale-[1.01]" 
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className={isSelected ? "text-white" : "text-slate-400 group-hover:text-white transition-colors"}>
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Profile metadata + Logout */}
        <div className="p-6 border-t border-white/5 space-y-4 bg-slate-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f37021]/25 border border-[#f37021]/30 flex items-center justify-center text-white font-medium text-sm">
              {adminUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate leading-none">{adminUser.name}</p>
              <p className="text-xs text-slate-500 truncate mt-1">{adminUser.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-rose-500/15 border border-white/10 hover:border-rose-500/20 hover:text-rose-500 rounded-xl text-xs font-medium uppercase tracking-widest transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN WORKSPACE ── */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header toolbar */}
        <header className="bg-white border-b border-slate-200/60 px-10 py-5 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-medium text-slate-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Manager
            </h2>
            <p className="text-xs text-slate-400 font-normal mt-1">
              Home / Admin / {activeTab}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium uppercase tracking-wider border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Secure API Connected
            </span>
          </div>
        </header>

        {/* Dynamic page content container */}
        <div className="flex-1 p-10 overflow-y-auto min-h-0">
          {children}
        </div>
      </main>

    </div>
  );
}
