"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { useAdminAuth } from "./hooks/useAdminAuth";
import { adminGet } from "./adminApi";

interface Activity {
  type: string;
  title: string;
  action: string;
  time: string;
  timestamp: number;
}

export default function AdminDashboard() {
  const { user, loading: authLoading, logout } = useAdminAuth();
  const [stats, setStats] = useState({ blogs: 0, gallery: 0 });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to resolve
    if (!user) return;       // useAdminAuth will redirect if no user

    const fetchDashboardData = async () => {
      try {
        const [blogsRes, galleryRes] = await Promise.all([
          adminGet("/admin/blogs"),
          adminGet("/admin/galleries"),
        ]);

        if (blogsRes.ok) {
          const blogs = blogsRes.data as Record<string, any>[];
          const gallery = galleryRes.ok ? (galleryRes.data as Record<string, any>[]) : [];

          setStats({
            blogs: blogs.length,
            gallery: gallery.length,
          });

          const logs: Activity[] = [];
          blogs.slice(0, 5).forEach((b: Record<string, any>) => {
            logs.push({ type: "Blog Post", title: String(b.title), action: "Updated / Saved", time: new Date(String(b.updated_at)).toLocaleDateString(), timestamp: new Date(String(b.updated_at)).getTime() });
          });
          gallery.slice(0, 5).forEach((g: Record<string, any>) => {
            logs.push({ type: "Gallery Item", title: String(g.title), action: "Added / Saved", time: new Date(String(g.updated_at)).toLocaleDateString(), timestamp: new Date(String(g.updated_at)).getTime() });
          });

          logs.sort((a, b) => b.timestamp - a.timestamp);
          setActivities(logs.slice(0, 8));
        }
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, authLoading]);

  return (
    <AdminLayout activeTab="dashboard">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-4 border-[#f37021]/30 border-t-[#f37021] rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading dashboard stats...</p>
        </div>
      ) : (
        <div className="space-y-10">
          
          {/* ── STATS CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
            {[
              { label: "Blog Articles", val: stats.blogs, color: "text-[#f37021] bg-[#f37021]/10", desc: "Live articles on site", href: "/covaitechpark/admin/blogs" },
              { label: "Gallery Photos", val: stats.gallery, color: "text-indigo-500 bg-indigo-50", desc: "Display portfolio items", href: "/covaitechpark/admin/gallery" }
            ].map((card, i) => (
              <a key={i} href={card.href} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#f37021]/40 transition-all duration-300 block cursor-pointer">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{card.label}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium text-xs ${card.color}`}>
                    {card.val}
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-medium text-slate-800">{card.val}</span>
                  <p className="text-[11px] text-slate-400 font-normal mt-1.5">{card.desc}</p>
                </div>
              </a>
            ))}
          </div>

          {/* ── RECENT ACTIVITY TIMELINE LOG ── */}
          <div className="bg-white border border-slate-200/60 rounded-[2rem] p-8 md:p-10 shadow-sm max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-2xl bg-[#f37021]/10 text-[#f37021]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-900">Recent Activity Log</h3>
                <p className="text-xs text-slate-400 font-normal mt-1">Live updates across all site models</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {activities.length > 0 ? (
                activities.map((act, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider shrink-0
                        ${act.type === 'Blog Post' ? 'bg-[#f37021]/10 text-[#f37021]' : ''}
                        ${act.type === 'Gallery Item' ? 'bg-indigo-500/10 text-indigo-500' : ''}
                      `}>
                        {act.type}
                      </span>
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-slate-800 block truncate">
                          {act.title}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal mt-0.5 block">{act.action}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-normal shrink-0">
                      {act.time}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-slate-400 font-normal">No recent activity records found.</p>
              )}
            </div>
          </div>

        </div>
      )}
    </AdminLayout>
  );
}
