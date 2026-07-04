"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminConfirmModal from "../../components/AdminConfirmModal";
import AdminToast, { ToastMessage } from "../../components/AdminToast";
import { adminGet, adminDelete as apiDelete, adminPost, adminPut, adminUpload } from "../adminApi";

interface GalleryItem {
  id: number;
  title: string;
  description: string | null;
  image: string;
  is_active: boolean;
  sort_order: number;
}

const GALLERY_CATEGORIES = [
  "Virtual Office Space",
  "Coworking Space",
  "Private Office Space",
  "Meeting Room",
  "Managed Office Space",
  "Furnished Office Space",
  "Commercial Space",
];

const getImgUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `${process.env.NEXT_PUBLIC_STORAGE_URL}/${path}`;
};

/* ══════════════════════════════════════════════════
   VIEW: GALLERY LIST
══════════════════════════════════════════════════ */
function GalleryListView({
  onEdit,
  onAddNew,
}: {
  onEdit: (item: GalleryItem) => void;
  onAddNew: () => void;
}) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "inactive">("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<GalleryItem | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [numColumns, setNumColumns] = useState(4);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setNumColumns(1);
      } else if (window.innerWidth < 768) {
        setNumColumns(2);
      } else if (window.innerWidth < 1024) {
        setNumColumns(3);
      } else {
        setNumColumns(4);
      }
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const showToast = useCallback((type: "success" | "error" | "warning", text: string) => {
    setToast({ id: Date.now().toString(), type, text });
  }, []);

  

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const { ok, data } = await adminGet("/admin/galleries");
      if (ok && Array.isArray(data)) setItems(data as GalleryItem[]);
      else if (!ok) showToast("error", "✗ Failed to load gallery. Please refresh or re-login.");
    } catch { showToast("error", "✗ Network error — could not reach server."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchGallery(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const { ok } = await apiDelete(`/admin/galleries/${deleteId}`);
      if (ok) { showToast("success", "✓ Photo permanently deleted from gallery."); setDeleteId(null); fetchGallery(); }
      else showToast("error", "✗ Failed to delete photo.");
    } catch { showToast("error", "✗ Network error during deletion."); }
  };

  const handleToggleActive = async (item: GalleryItem) => {
    try {
      const { ok } = await adminPut(`/admin/galleries/${item.id}`, { ...item, is_active: !item.is_active });
      if (ok) { showToast("success", `✓ Photo ${!item.is_active ? "activated" : "hidden"} successfully.`); fetchGallery(); }
      else showToast("error", "Failed to update photo status.");
    } catch { showToast("error", "Network error."); }
  };

  const filtered = items.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchActive = filterActive === "all" || (filterActive === "active" ? item.is_active : !item.is_active);
    const matchCat = filterCategory === "all" || item.title === filterCategory;
    return matchSearch && matchActive && matchCat;
  });

  const stats = {
    total: items.length,
    active: items.filter(i => i.is_active).length,
    hidden: items.filter(i => !i.is_active).length,
  };

  const getFlexGrow = (aspect: string) => {
    if (aspect.includes("3/5")) return 1.67;
    if (aspect.includes("4/5")) return 1.25;
    if (aspect.includes("9/16")) return 1.78;
    if (aspect.includes("3/4")) return 1.33;
    if (aspect.includes("1/1")) return 1.00;
    if (aspect.includes("4/3")) return 0.75;
    if (aspect.includes("3/2")) return 0.67;
    if (aspect.includes("16/9")) return 0.56;
    return 1.00;
  };

  const sortedFiltered = filtered.sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Photos", value: stats.total, color: "bg-slate-800", icon: "🖼️" },
          { label: "Live / Active", value: stats.active, color: "bg-emerald-600", icon: "✅" },
          { label: "Hidden", value: stats.hidden, color: "bg-amber-500", icon: "🚫" },
        ].map(s => (
          <div key={s.label} className={`${s.color} text-white rounded-2xl p-5 flex items-center gap-4`}>
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className="text-2xl font-outfit font-medium leading-none">{s.value}</p>
              <p className="text-xs font-medium uppercase tracking-widest opacity-80 mt-1">{s.label}</p>
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
          <input type="text" placeholder="Search photos by category or description..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-[#f37021]/50 transition-all" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select value={filterActive} onChange={e => setFilterActive(e.target.value as "all" | "active" | "inactive")}
            className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:border-[#f37021]/50">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Hidden</option>
          </select>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
            className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:border-[#f37021]/50">
            <option value="all">All Categories</option>
            {GALLERY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {/* View toggle */}
          <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden">
            {(["grid", "list"] as const).map(mode => (
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
          <button onClick={onAddNew} className="flex items-center gap-2 px-5 py-2.5 bg-[#f37021] hover:bg-[#d55c14] text-white text-sm font-medium tracking-wider rounded-xl transition-all shadow-md shadow-[#f37021]/20 hover:scale-[1.01] cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add Photo
          </button>
        </div>
      </div>

      {/* Count row */}
      {!loading && (
        <div className="flex items-center justify-between px-1">
          <p className="text-xs text-slate-500">
            Showing <span className="font-medium text-slate-700">{filtered.length}</span> of {items.length} photos
          </p>
          <button onClick={fetchGallery} className="text-xs font-medium text-[#f37021] hover:text-[#d55c14] flex items-center gap-1.5 cursor-pointer">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white border border-slate-200/60 rounded-[2rem]">
          <div className="w-10 h-10 border-4 border-[#f37021]/30 border-t-[#f37021] rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading gallery from database...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-4 bg-white border border-slate-200/60 rounded-[2rem]">
          <span className="text-5xl">🖼️</span>
          <p className="text-slate-500 text-sm font-medium">No photos found. {items.length > 0 ? "Try adjusting your filters." : "Click Add Photo to start."}</p>
        </div>
      ) : viewMode === "grid" ? (
        /* ── GRID VIEW ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-4">
          {sortedFiltered.map(item => {
            return (
              <div key={item.id} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                {/* Image */}
                <div className={`relative aspect-[4/3] w-full bg-slate-100 overflow-hidden cursor-pointer`} onClick={() => setLightboxImg(item)}>
                      {item.image ? (
                        <img src={getImgUrl(item.image)} alt={item.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-4xl">📷</div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium shadow-sm ${item.is_active ? "bg-emerald-500 text-white" : "bg-slate-700 text-white"}`}>
                          {item.is_active ? "Live" : "Hidden"}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-black/50 text-white rounded-lg text-xs font-medium backdrop-blur-sm">#{item.sort_order}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-end">
                      <div>
                        <span className="inline-flex px-2 py-0.5 bg-[#f37021]/10 text-[#f37021] text-xs font-medium rounded-lg">{item.title}</span>
                        {item.description && (
                          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                        <button onClick={() => handleToggleActive(item)}
                          className={`flex-1 py-1.5 text-xs font-medium uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                            item.is_active ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          }`}>
                          {item.is_active ? "Hide" : "Show"}
                        </button>
                        <button onClick={() => onEdit(item)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#f37021] hover:bg-[#d55c14] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          Edit
                        </button>
                        <button onClick={() => setDeleteId(item.id)}
                          className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      ) : (
        /* ── LIST VIEW ── */
        <div className="bg-white border border-slate-200/60 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  {["Photo", "Category", "Description", "Order", "Status", "Actions"].map(h => (
                    <th key={h} className={`py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest ${h === "Actions" ? "text-right" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.sort((a, b) => a.sort_order - b.sort_order).map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-20 h-14 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 cursor-pointer hover:border-[#f37021]/30 transition-colors"
                        onClick={() => setLightboxImg(item)}>
                        {item.image
                          ? <img src={getImgUrl(item.image)} alt={item.title} className="object-cover w-full h-full" />
                          : <div className="w-full h-full flex items-center justify-center text-slate-300">📷</div>}
                      </div>
                    </td>
                    <td className="py-4 px-6"><span className="inline-flex px-2.5 py-1 bg-[#f37021]/8 text-[#f37021] text-xs font-medium rounded-lg whitespace-nowrap">{item.title}</span></td>
                    <td className="py-4 px-6"><p className="text-sm text-slate-500 font-normal line-clamp-2 max-w-[200px]">{item.description || "—"}</p></td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm font-medium text-slate-600 bg-slate-100 w-8 h-8 rounded-lg flex items-center justify-center mx-auto">{item.sort_order}</span>
                    </td>
                    <td className="py-4 px-6">
                      <button onClick={() => handleToggleActive(item)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border cursor-pointer transition-all ${
                          item.is_active ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100" : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.is_active ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                        {item.is_active ? "Live" : "Hidden"}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => setLightboxImg(item)} className="p-2 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-500 rounded-lg transition-colors cursor-pointer">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                        <button onClick={() => onEdit(item)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f37021] hover:bg-[#d55c14] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          Edit
                        </button>
                        <button onClick={() => setDeleteId(item.id)} className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" onClick={() => setLightboxImg(null)}>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightboxImg(null)} className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white cursor-pointer">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={getImgUrl(lightboxImg.image)} alt={lightboxImg.title} className="w-full max-h-[75vh] object-contain bg-slate-900" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="inline-flex px-3 py-1 bg-[#f37021] text-white text-xs font-medium rounded-lg">{lightboxImg.title}</span>
                {lightboxImg.description && <p className="text-white/60 text-sm mt-2">{lightboxImg.description}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { onEdit(lightboxImg); setLightboxImg(null); }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer">Edit</button>
                <button onClick={() => { setDeleteId(lightboxImg.id); setLightboxImg(null); }}
                  className="px-4 py-2 bg-rose-500/80 hover:bg-rose-500 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AdminConfirmModal
        isOpen={deleteId !== null}
        title="⚠ Delete Gallery Photo"
        description="This will permanently remove this photo from the gallery database and the live website. This action cannot be undone."
        confirmLabel="Yes, Delete Photo"
        isDanger
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
      <AdminToast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   VIEW: GALLERY EDITOR (Full Page)
══════════════════════════════════════════════════ */
function GalleryEditorView({
  editingItem,
  onBack,
  onSaved,
}: {
  editingItem: GalleryItem | null;
  onBack: () => void;
  onSaved: () => void;
}) {
  const isEditing = editingItem !== null;

  const [image, setImage] = useState(editingItem?.image ?? "");
  const [title, setTitle] = useState(editingItem?.title ?? "");
  const [description, setDescription] = useState(editingItem?.description ?? "");
  const [isActive, setIsActive] = useState(editingItem?.is_active ?? true);
  const [sortOrder, setSortOrder] = useState(editingItem?.sort_order ?? 0);

  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((type: "success" | "error" | "warning", text: string) => {
    setToast({ id: Date.now().toString(), type, text });
  }, []);

  const uploadFile = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "galleries");
    const { ok, path } = await adminUpload(fd);
    if (!ok) throw new Error("Upload failed");
    return path;
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsUploading(true);
    try { setImage(await uploadFile(e.target.files[0])); showToast("success", "✓ Photo uploaded successfully."); }
    catch { showToast("error", "✗ Upload failed. Try again."); }
    finally { setIsUploading(false); }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) { showToast("warning", "⚠ Please drop a valid image file."); return; }
    setIsUploading(true);
    try { setImage(await uploadFile(file)); showToast("success", "✓ Photo uploaded successfully."); }
    catch { showToast("error", "✗ Upload failed. Try again."); }
    finally { setIsUploading(false); }
  };

  const handleSave = async () => {
    setConfirmOpen(false);
    if (!image) { showToast("warning", "⚠ Please upload a photo first."); return; }
    if (!title) { showToast("warning", "⚠ Please select a category."); return; }

    setIsSubmitting(true);
    const payload = { title, description, image, is_active: isActive, sort_order: sortOrder };

    try {
      const { ok } = isEditing
        ? await adminPut(`/admin/galleries/${editingItem.id}`, payload)
        : await adminPost("/admin/galleries", payload);

      if (ok) {
        showToast("success", isEditing ? "✓ Gallery item updated successfully." : "✓ Photo added to gallery!");
        setTimeout(() => onSaved(), 900);
      } else {
        showToast("error", "✗ Failed to save. Please check all fields.");
      }
    } catch { showToast("error", "✗ Network error. Could not reach server."); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Top Header ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="text-sm font-medium">All Photos</span>
          </button>
          <span className="text-slate-200">|</span>
          <div>
            <span className="text-xs font-medium text-[#f37021] uppercase tracking-widest">{isEditing ? "Editing Photo" : "New Gallery Photo"}</span>
            {title && <p className="text-sm font-medium text-slate-800 mt-0.5">{title}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Quick status toggle */}
          <div onClick={() => setIsActive(!isActive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition-all select-none ${isActive ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
            <div className={`w-8 h-[18px] rounded-full transition-colors relative shrink-0 ${isActive ? "bg-emerald-500" : "bg-slate-300"}`}>
              <div className={`w-3.5 h-3.5 rounded-full bg-white shadow absolute top-[1px] transition-all ${isActive ? "left-[17px]" : "left-[1px]"}`} />
            </div>
            <span className={`text-xs font-medium ${isActive ? "text-emerald-700" : "text-slate-500"}`}>
              {isActive ? "Live" : "Hidden"}
            </span>
          </div>
          <button onClick={onBack} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors cursor-pointer">Cancel</button>
          <button
            disabled={isSubmitting}
            onClick={() => setConfirmOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-[#f37021] hover:bg-[#d55c14] disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-all shadow-md shadow-[#f37021]/20 cursor-pointer"
          >
            {isSubmitting ? (
              <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
            ) : isEditing ? "Update Photo" : "Add to Gallery"}
          </button>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="flex-1 flex">
        {/* LEFT: Upload Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-8">

            {/* Large Upload Area */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest block">
                Gallery Photo <span className="text-rose-400">*</span>
              </label>

              {image ? (
                /* Image Preview */
                <div className="relative">
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src={getImgUrl(image)} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                  {/* Overlay actions */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 rounded-2xl flex items-center justify-center gap-3 group">
                    <label className="opacity-0 group-hover:opacity-100 transition-all cursor-pointer flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-slate-700 text-sm font-medium rounded-xl shadow-lg">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      Replace
                      <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
                    </label>
                    <button onClick={() => setImage("")}
                      className="opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 px-4 py-2 bg-rose-500/90 hover:bg-rose-500 text-white text-sm font-medium rounded-xl shadow-lg cursor-pointer">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Remove
                    </button>
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium shadow-sm ${isActive ? "bg-emerald-500 text-white" : "bg-slate-700 text-white"}`}>
                      {isActive ? "Will show live" : "Will be hidden"}
                    </span>
                  </div>
                </div>
              ) : (
                /* Drop Zone */
                <div
                  onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`aspect-[16/10] w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                    isDragging ? "border-[#f37021] bg-[#f37021]/5 scale-[1.01]" : "border-slate-200 bg-slate-50 hover:border-[#f37021]/50 hover:bg-white"
                  }`}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-3 border-[#f37021]/30 border-t-[#f37021] rounded-full animate-spin" />
                      <p className="text-sm font-medium text-[#f37021]">Uploading to server...</p>
                    </div>
                  ) : (
                    <>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors ${isDragging ? "bg-[#f37021]/20" : "bg-slate-100"}`}>
                        <svg className={`w-8 h-8 ${isDragging ? "text-[#f37021]" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-base font-medium text-slate-600 mb-1">
                        {isDragging ? "Drop photo here" : "Drag & drop your photo here"}
                      </p>
                      <p className="text-sm text-slate-400 mb-5">WEBP · JPG · PNG — Max 10MB</p>
                      <label className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium rounded-xl cursor-pointer transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        Browse Files
                        <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
                      </label>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest block">Caption / Description</label>
              <textarea rows={3} placeholder="Describe this workspace view, highlight key features..."
                value={description} onChange={e => setDescription(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#f37021]/50 transition-all font-normal leading-relaxed resize-none"
              />
            </div>

            {/* Category grid */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest block">
                Category / Tab <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {GALLERY_CATEGORIES.map(cat => (
                  <button key={cat} type="button" onClick={() => setTitle(cat)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium text-center transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                      title === cat ? "bg-[#f37021] text-white border-[#f37021] shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-[#f37021]/30 hover:bg-slate-50"
                    }`}>
                    <span className="text-lg">{
                      { "Virtual Office Space": "🏢", "Coworking Space": "🤝", "Private Office Space": "🏠", "Meeting Room": "💼", "Managed Office Space": "🎪", "Furnished Office Space": "🛋️", "Commercial Space": "🏬" }[cat] || "📷"
                    }</span>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-72 shrink-0 border-l border-slate-200 bg-white p-6 space-y-6 overflow-y-auto">

          {/* Sort Order */}
          <div>
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Sort Order</h4>
            <p className="text-xs text-slate-400 mb-3">Lower number = appears first in gallery.</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setSortOrder(Math.max(0, sortOrder - 1))}
                className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-700 transition-colors cursor-pointer text-lg font-medium">−</button>
              <input type="number" value={sortOrder} onChange={e => setSortOrder(parseInt(e.target.value) || 0)}
                className="flex-1 text-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#f37021]/50 transition-all" />
              <button onClick={() => setSortOrder(sortOrder + 1)}
                className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-700 transition-colors cursor-pointer text-lg font-medium">+</button>
            </div>
          </div>

          {/* Display Status */}
          <div>
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">Display Status</h4>
            <div onClick={() => setIsActive(!isActive)}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all select-none ${isActive ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
              <div>
                <p className={`text-sm font-medium ${isActive ? "text-emerald-800" : "text-slate-700"}`}>
                  {isActive ? "Showing in gallery" : "Hidden from gallery"}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Click to toggle.</p>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors relative shrink-0 ${isActive ? "bg-emerald-500" : "bg-slate-300"}`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow absolute top-1 transition-all ${isActive ? "left-5" : "left-1"}`} />
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-widest">Tips</h4>
            <ul className="space-y-1.5">
              {[
                "Use landscape images (16:9 or 4:3) for best results",
                "WEBP format gives best quality-to-size ratio",
                "Sort order 0 appears first in the frontend gallery",
                "Hidden items won't appear on live website",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                  <span className="text-[#f37021] mt-0.5">•</span> {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Current details if editing */}
          {isEditing && editingItem && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl space-y-2">
              <h4 className="text-xs font-medium text-amber-600 uppercase tracking-widest">Current Item</h4>
              <p className="text-xs text-amber-700">ID: #{editingItem.id}</p>
              <p className="text-xs text-amber-700">Category: {editingItem.title}</p>
              <p className="text-xs text-amber-700">Order: #{editingItem.sort_order}</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm */}
      <AdminConfirmModal
        isOpen={confirmOpen}
        title={isEditing ? "Confirm Gallery Update" : "Add Photo to Gallery"}
        description={`You are about to ${isEditing ? "update this gallery photo" : "add a new photo to the gallery"}. ${isActive ? "It will be visible on the live website." : "It will be saved as hidden."}`}
        confirmLabel={isEditing ? "Yes, Update Photo" : "Yes, Add Photo"}
        onConfirm={handleSave}
        onCancel={() => setConfirmOpen(false)}
      />
      <AdminToast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
export default function AdminGalleryPage() {
  const [view, setView] = useState<"list" | "editor">("list");
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const handleEdit = (item: GalleryItem) => { setEditingItem(item); setView("editor"); };
  const handleAddNew = () => { setEditingItem(null); setView("editor"); };
  const handleBack = () => { setView("list"); setEditingItem(null); };
  const handleSaved = () => { setView("list"); setEditingItem(null); };

  return (
    <AdminLayout activeTab="gallery" fullPage={view === "editor"}>
      {view === "list" ? (
        <GalleryListView onEdit={handleEdit} onAddNew={handleAddNew} />
      ) : (
        <GalleryEditorView editingItem={editingItem} onBack={handleBack} onSaved={handleSaved} />
      )}
    </AdminLayout>
  );
}
