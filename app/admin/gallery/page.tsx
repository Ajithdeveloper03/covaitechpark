"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminConfirmModal from "../../components/AdminConfirmModal";
import AdminToast, { ToastMessage } from "../../components/AdminToast";

interface GalleryItem {
  id: number;
  title: string;
  description: string | null;
  image: string;
  is_active: boolean;
  sort_order: number;
}

const GALLERY_CATEGORIES = ["Cabins", "Meeting Rooms", "Lounge", "Events", "Facilities", "Exterior", "Common Areas"];

const getImgUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `http://localhost:8000/storage/${path}`;
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "inactive">("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* Form States */
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  const [isUploading, setIsUploading] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  /* Modal/Toast */
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = useCallback((type: "success" | "error" | "warning", text: string) => {
    setToast({ id: Date.now().toString(), type, text });
  }, []);

  useEffect(() => { fetchGallery(); }, []);

  const fetchGallery = async () => {
    const token = localStorage.getItem("admin_token");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/admin/galleries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      } else {
        showToast("error", "Failed to load gallery items from the database.");
      }
    } catch {
      showToast("error", "Network error — could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsUploading(true);
    const token = localStorage.getItem("admin_token");
    const fd = new FormData();
    fd.append("file", e.target.files[0]);
    fd.append("folder", "galleries");
    try {
      const res = await fetch("http://localhost:8000/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setImage(data.path);
      showToast("success", "✓ Gallery image uploaded successfully.");
    } catch {
      showToast("error", "✗ Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const openCreateForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setImage("");
    setIsActive(true);
    setSortOrder(items.length > 0 ? Math.max(...items.map(i => i.sort_order)) + 1 : 0);
    setIsFormOpen(true);
  };

  const openEditForm = (item: GalleryItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description || "");
    setImage(item.image);
    setIsActive(item.is_active);
    setSortOrder(item.sort_order);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async () => {
    setIsSubmitConfirmOpen(false);
    if (!image) { showToast("warning", "⚠ Please upload a photo first."); return; }
    if (!title) { showToast("warning", "⚠ Please select a category for this image."); return; }

    setIsSubmitting(true);
    const token = localStorage.getItem("admin_token");

    const payload = { title, description, image, is_active: isActive, sort_order: sortOrder };

    try {
      const url = editingId
        ? `http://localhost:8000/api/admin/galleries/${editingId}`
        : "http://localhost:8000/api/admin/galleries";

      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast("success", editingId
          ? "✓ Gallery item updated and reflected in the database."
          : "✓ Gallery photo added successfully! It will now appear in the frontend gallery.");
        setIsFormOpen(false);
        fetchGallery();
      } else {
        showToast("error", "✗ Failed to save gallery item. Please check all fields.");
      }
    } catch {
      showToast("error", "✗ Network failure. Could not reach the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`http://localhost:8000/api/admin/galleries/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast("success", "✓ Photo permanently deleted from the gallery and database.");
        setDeleteId(null);
        fetchGallery();
      } else {
        showToast("error", "✗ Failed to delete this photo.");
      }
    } catch {
      showToast("error", "✗ Network error during deletion.");
    }
  };

  /* Quick Toggle Active */
  const handleToggleActive = async (item: GalleryItem) => {
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`http://localhost:8000/api/admin/galleries/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ ...item, is_active: !item.is_active }),
      });
      if (res.ok) {
        showToast("success", `✓ Photo ${!item.is_active ? "activated" : "deactivated"} successfully.`);
        fetchGallery();
      }
    } catch {
      showToast("error", "Failed to update photo status.");
    }
  };

  /* Filtering */
  const filteredItems = items.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchActive = filterActive === "all" || (filterActive === "active" ? item.is_active : !item.is_active);
    const matchCat = filterCategory === "all" || item.title === filterCategory;
    return matchSearch && matchActive && matchCat;
  });

  const stats = {
    total: items.length,
    active: items.filter(i => i.is_active).length,
    inactive: items.filter(i => !i.is_active).length,
    categories: [...new Set(items.map(i => i.title).filter(Boolean))].length,
  };

  return (
    <AdminLayout activeTab="gallery">
      <div className="space-y-6">

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Photos", value: stats.total, icon: "🖼️", color: "bg-slate-800 text-white" },
            { label: "Active / Visible", value: stats.active, icon: "✅", color: "bg-emerald-600 text-white" },
            { label: "Hidden / Inactive", value: stats.inactive, icon: "🚫", color: "bg-amber-500 text-white" },
            { label: "Categories", value: stats.categories, icon: "🏷️", color: "bg-[#f37021] text-white" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} rounded-2xl p-5 flex items-center gap-4 shadow-sm`}>
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <p className="text-2xl font-outfit font-medium leading-none">{stat.value}</p>
                <p className="text-xs font-medium uppercase tracking-widest opacity-80 mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search photos by category or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f37021]/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select value={filterActive} onChange={(e) => setFilterActive(e.target.value as "all" | "active" | "inactive")}
              className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:border-[#f37021]/50 transition-all">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Hidden</option>
            </select>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:border-[#f37021]/50 transition-all">
              <option value="all">All Categories</option>
              {GALLERY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {/* View toggle */}
            <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden">
              {(["grid", "list"] as const).map((mode) => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  className={`px-3 py-2.5 transition-colors cursor-pointer ${viewMode === mode ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-600"}`}>
                  {mode === "grid" ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <button onClick={openCreateForm}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#f37021] hover:bg-[#d55c14] text-white text-sm font-medium uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#f37021]/20 hover:scale-[1.01] cursor-pointer shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Photo
            </button>
          </div>
        </div>

        {/* Count bar */}
        {!loading && (
          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-slate-500 font-normal">
              Showing <span className="font-medium text-slate-700">{filteredItems.length}</span> of {items.length} photos
            </p>
            <button onClick={fetchGallery} className="flex items-center gap-1.5 text-xs font-medium text-[#f37021] hover:text-[#d55c14] transition-colors cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        )}

        {/* Gallery Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white border border-slate-200/60 rounded-[2rem]">
            <div className="w-10 h-10 border-4 border-[#f37021]/30 border-t-[#f37021] rounded-full animate-spin" />
            <p className="text-slate-400 text-sm font-medium">Loading gallery from database...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center py-20 gap-4 bg-white border border-slate-200/60 rounded-[2rem]">
            <span className="text-5xl">🖼️</span>
            <p className="text-slate-500 text-sm font-medium">No photos found. {items.length > 0 ? "Try adjusting your filters." : "Click Add Photo to start building your gallery."}</p>
            {items.length > 0 && (
              <button onClick={() => { setSearchQuery(""); setFilterActive("all"); setFilterCategory("all"); }}
                className="text-[#f37021] text-sm font-medium hover:underline cursor-pointer">Clear filters</button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredItems.sort((a, b) => a.sort_order - b.sort_order).map((item) => (
              <div key={item.id} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group relative">
                {/* Image */}
                <div
                  className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => setLightboxImage(item)}
                >
                  {item.image ? (
                    <img src={getImgUrl(item.image)} alt={item.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 text-4xl">📷</div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium shadow-sm ${item.is_active ? "bg-emerald-500 text-white" : "bg-slate-700 text-white"}`}>
                      {item.is_active ? "Live" : "Hidden"}
                    </span>
                  </div>
                  {/* Order badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-black/50 text-white rounded-lg text-xs font-medium backdrop-blur-sm">#{item.sort_order}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <span className="inline-flex px-2 py-0.5 bg-[#f37021]/10 text-[#f37021] text-xs font-medium rounded-lg whitespace-nowrap">{item.title}</span>
                      {item.description && (
                        <p className="text-xs text-slate-400 font-normal mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                    <button onClick={() => handleToggleActive(item)} title={item.is_active ? "Hide from gallery" : "Show in gallery"}
                      className={`flex-1 py-1.5 text-xs font-medium uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                        item.is_active ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      }`}>
                      {item.is_active ? "Hide" : "Show"}
                    </button>
                    <button onClick={() => openEditForm(item)}
                      className="p-1.5 bg-slate-50 hover:bg-[#f37021]/10 text-slate-400 hover:text-[#f37021] rounded-lg transition-colors cursor-pointer">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button onClick={() => setDeleteId(item.id)}
                      className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white border border-slate-200/60 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100">
                    <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest w-24">Photo</th>
                    <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest">Description</th>
                    <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest text-center">Order</th>
                    <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.sort((a, b) => a.sort_order - b.sort_order).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="py-4 px-6">
                        <div
                          className="w-20 h-14 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 cursor-pointer hover:border-[#f37021]/30 transition-colors"
                          onClick={() => setLightboxImage(item)}
                        >
                          {item.image ? (
                            <img src={getImgUrl(item.image)} alt={item.title} className="object-cover w-full h-full" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">📷</div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2.5 py-1 bg-[#f37021]/8 text-[#f37021] text-xs font-medium rounded-lg whitespace-nowrap">{item.title}</span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-slate-500 font-normal line-clamp-2 max-w-[200px]">{item.description || "—"}</p>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm font-medium text-slate-600 bg-slate-100 w-8 h-8 rounded-lg flex items-center justify-center mx-auto">
                          {item.sort_order}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleActive(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider border cursor-pointer transition-all hover:scale-105 ${
                            item.is_active
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                              : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.is_active ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                          {item.is_active ? "Live" : "Hidden"}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => setLightboxImage(item)} title="Preview"
                            className="p-2 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-500 rounded-lg transition-colors cursor-pointer">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button onClick={() => openEditForm(item)} title="Edit"
                            className="p-2 bg-slate-50 hover:bg-[#f37021]/10 text-slate-400 hover:text-[#f37021] rounded-lg transition-colors cursor-pointer">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button onClick={() => setDeleteId(item.id)} title="Delete"
                            className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── LIGHTBOX ── */}
        {lightboxImage && (
          <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" onClick={() => setLightboxImage(null)}>
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors cursor-pointer">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={getImgUrl(lightboxImage.image)} alt={lightboxImage.title} className="w-full max-h-[75vh] object-contain bg-slate-900" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="inline-flex px-3 py-1 bg-[#f37021] text-white text-xs font-medium rounded-lg">{lightboxImage.title}</span>
                  {lightboxImage.description && <p className="text-white/60 text-sm mt-2">{lightboxImage.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { openEditForm(lightboxImage); setLightboxImage(null); }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer">
                    Edit
                  </button>
                  <button onClick={() => { setDeleteId(lightboxImage.id); setLightboxImage(null); }}
                    className="px-4 py-2 bg-rose-500/80 hover:bg-rose-500 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SLIDE-OVER FORM ── */}
        {isFormOpen && (
          <div className="fixed inset-0 z-[500] flex justify-end">
            <div className="absolute inset-0 bg-[#060d17]/60 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
            <div className="relative w-full max-w-lg bg-white h-full flex flex-col shadow-2xl z-10 animate-slideLeft">
              {/* Header */}
              <div className="shrink-0 px-7 py-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#f37021] uppercase tracking-widest">
                    {editingId ? "Editing Photo" : "New Gallery Photo"}
                  </p>
                  <h3 className="font-outfit font-medium text-lg text-slate-900 mt-0.5">
                    {editingId ? "Update Gallery Item" : "Add to Gallery"}
                  </h3>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-7 space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-widest block">
                    Gallery Photo <span className="text-rose-400">*</span>
                  </label>
                  <div className="space-y-3">
                    {image && (
                      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                        <img src={getImgUrl(image)} alt="Preview" className="object-cover w-full h-full" />
                        <button onClick={() => setImage("")}
                          className="absolute top-3 right-3 w-7 h-7 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center text-sm cursor-pointer shadow-lg transition-colors">
                          ×
                        </button>
                        <div className="absolute bottom-3 left-3">
                          <span className="px-3 py-1 bg-black/50 text-white text-xs font-medium rounded-lg backdrop-blur-sm">Preview</span>
                        </div>
                      </div>
                    )}
                    <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 hover:border-[#f37021]/50 rounded-2xl cursor-pointer bg-slate-50 hover:bg-white transition-all text-center">
                      {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 border-2 border-[#f37021]/30 border-t-[#f37021] rounded-full animate-spin" />
                          <span className="text-xs font-medium text-[#f37021] uppercase tracking-wider">Uploading to server...</span>
                        </div>
                      ) : (
                        <>
                          <svg className="w-8 h-8 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">{image ? "Replace Photo" : "Upload Gallery Photo"}</span>
                          <span className="text-xs text-slate-400 mt-1">WEBP · JPG · PNG — max 10MB</span>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-widest block">
                    Category / Tab <span className="text-rose-400">*</span>
                  </label>
                  <select required value={title} onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#f37021]/60 focus:bg-white transition-all font-medium">
                    <option value="">— Select Category —</option>
                    {GALLERY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-widest block">Caption / Description</label>
                  <textarea rows={3} placeholder="Describe this workspace view or highlight..."
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f37021]/60 focus:bg-white transition-all font-normal leading-relaxed resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Sort Order */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-widest block">Sort Order</label>
                    <input type="number" placeholder="0" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#f37021]/60 focus:bg-white transition-all font-medium"
                    />
                  </div>
                  {/* Active Toggle */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-widest block">Display Status</label>
                    <div onClick={() => setIsActive(!isActive)}
                      className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all select-none ${isActive ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
                      <div className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${isActive ? "bg-emerald-500" : "bg-slate-300"}`}>
                        <div className={`w-3.5 h-3.5 rounded-full bg-white shadow absolute top-0.5 transition-all ${isActive ? "left-4.5" : "left-0.5"}`} />
                      </div>
                      <span className={`text-xs font-medium ${isActive ? "text-emerald-700" : "text-slate-500"}`}>
                        {isActive ? "Show Live" : "Keep Hidden"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="shrink-0 px-7 py-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                <button onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 text-sm font-medium uppercase tracking-wider transition-colors cursor-pointer">
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={() => setIsSubmitConfirmOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#f37021] hover:bg-[#d55c14] disabled:opacity-60 text-white text-sm font-medium uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#f37021]/20 hover:scale-[1.01] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : editingId ? "Update Photo" : "Save Photo"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <AdminConfirmModal
          isOpen={deleteId !== null}
          title="⚠ Confirm Photo Deletion"
          description="This will permanently remove this photo from the gallery database and it will no longer appear on the live website. This action cannot be undone."
          confirmLabel="Yes, Delete Photo"
          isDanger
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
        <AdminConfirmModal
          isOpen={isSubmitConfirmOpen}
          title="Confirm Gallery Changes"
          description={`You are about to ${editingId ? "update" : "add"} this gallery photo. ${isActive ? "It will be visible on the live website gallery." : "It will be saved as hidden."} Please confirm.`}
          confirmLabel={editingId ? "Yes, Update Photo" : "Yes, Add Photo"}
          onConfirm={handleFormSubmit}
          onCancel={() => setIsSubmitConfirmOpen(false)}
        />
        <AdminToast message={toast} onClose={() => setToast(null)} />
      </div>
    </AdminLayout>
  );
}
