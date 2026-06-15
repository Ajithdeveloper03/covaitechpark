"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminConfirmModal from "../../components/AdminConfirmModal";
import AdminToast, { ToastMessage } from "../../components/AdminToast";

/* ─── Types ─── */
interface BlogSection {
  heading: string;
  text: string;
  img: string;
  bullets: string[]; // bullet points live inside each section
}

interface FAQ {
  question: string;
  answer: string;
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: BlogSection[];
  bullets: { text: string }[];
  faqs: FAQ[];
  image: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

const BLOG_CATEGORIES = [
  "Coworking Insights",
  "Workspace Tips",
  "Business Growth",
  "Event Highlights",
  "Community Stories",
  "Industry News",
  "Tech & Innovation",
  "Announcements",
];

const getImgUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `http://localhost:8000/storage/${path}`;
};

const formatDate = (iso: string | null) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const emptySection = (): BlogSection => ({ heading: "", text: "", img: "", bullets: [""] });
const emptyFaq = (): FAQ => ({ question: "", answer: "" });

/* ══════════════════════════════════════════════════
   VIEW: BLOG LIST
══════════════════════════════════════════════════ */
function BlogListView({
  onEdit,
  onCreateNew,
}: {
  onEdit: (blog: Blog) => void;
  onCreateNew: () => void;
}) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((type: "success" | "error" | "warning", text: string) => {
    setToast({ id: Date.now().toString(), type, text });
  }, []);

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    const token = localStorage.getItem("admin_token");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/admin/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setBlogs(await res.json());
      else showToast("error", "Failed to load blog posts.");
    } catch { showToast("error", "Network error — could not reach the server."); }
    finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`http://localhost:8000/api/admin/blogs/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) { showToast("success", "✓ Blog post permanently deleted."); setDeleteId(null); fetchBlogs(); }
      else showToast("error", "✗ Failed to delete blog post.");
    } catch { showToast("error", "✗ Network error."); }
  };

  const filtered = blogs.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || (filterStatus === "published" ? b.is_published : !b.is_published);
    const matchCat = filterCategory === "all" || b.category === filterCategory;
    return matchSearch && matchStatus && matchCat;
  });

  const stats = { total: blogs.length, published: blogs.filter(b => b.is_published).length, draft: blogs.filter(b => !b.is_published).length };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Articles", value: stats.total, color: "bg-slate-800", icon: "📄" },
          { label: "Published Live", value: stats.published, color: "bg-emerald-600", icon: "✅" },
          { label: "Draft", value: stats.draft, color: "bg-amber-500", icon: "📝" },
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
          <input type="text" placeholder="Search articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-[#f37021]/50 transition-all" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as "all" | "published" | "draft")}
            className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:border-[#f37021]/50">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
            className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:border-[#f37021]/50">
            <option value="all">All Categories</option>
            {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={onCreateNew}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#f37021] hover:bg-[#d55c14] text-white text-sm font-medium uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#f37021]/20 hover:scale-[1.01] cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            New Article
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white border border-slate-200/60 rounded-[2rem]">
          <div className="w-10 h-10 border-4 border-[#f37021]/30 border-t-[#f37021] rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading blog posts...</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/60 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-800 font-medium">{filtered.length}</span> of {blogs.length} articles
            </p>
            <button onClick={fetchBlogs} className="text-xs font-medium text-[#f37021] hover:text-[#d55c14] flex items-center gap-1.5 cursor-pointer transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest">Cover</th>
                  <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest">Title & Slug</th>
                  <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest">Sections</th>
                  <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest">FAQs</th>
                  <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="py-3.5 px-6 text-xs font-medium text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length > 0 ? filtered.map(blog => (
                  <tr key={blog.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-16 h-11 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                        {blog.image
                          ? <img src={getImgUrl(blog.image)} alt={blog.title} className="object-cover w-full h-full" />
                          : <div className="w-full h-full flex items-center justify-center text-slate-300">📷</div>}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-slate-800 line-clamp-1 max-w-[220px]">{blog.title}</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{blog.slug}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2.5 py-1 bg-[#f37021]/8 text-[#f37021] text-xs font-medium rounded-lg whitespace-nowrap">{blog.category || "—"}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">{blog.content?.length || 0} sections</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">{blog.faqs?.length || 0} FAQs</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400 whitespace-nowrap">{formatDate(blog.published_at || blog.created_at)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                        blog.is_published ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${blog.is_published ? "bg-emerald-500 animate-pulse" : "bg-amber-400"}`} />
                        {blog.is_published ? "Live" : "Draft"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => onEdit(blog)} title="Edit" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f37021] hover:bg-[#d55c14] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          Edit
                        </button>
                        <button onClick={() => setDeleteId(blog.id)} title="Delete" className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={8} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-4xl">🔍</span>
                      <p className="text-slate-500 text-sm font-medium">No articles found.</p>
                    </div>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AdminConfirmModal
        isOpen={deleteId !== null}
        title="⚠ Delete Blog Post"
        description="This will permanently remove this article from the database and the live website. This action cannot be undone."
        confirmLabel="Yes, Delete Article"
        isDanger
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
      <AdminToast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   VIEW: BLOG EDITOR (Full Page)
══════════════════════════════════════════════════ */
function BlogEditorView({
  editingBlog,
  onBack,
  onSaved,
}: {
  editingBlog: Blog | null;
  onBack: () => void;
  onSaved: () => void;
}) {
  const isEditing = editingBlog !== null;

  /* Core fields */
  const [title, setTitle] = useState(editingBlog?.title ?? "");
  const [category, setCategory] = useState(editingBlog?.category ?? "");
  const [excerpt, setExcerpt] = useState(editingBlog?.excerpt ?? "");
  const [image, setImage] = useState(editingBlog?.image ?? "");
  const [isPublished, setIsPublished] = useState(editingBlog?.is_published ?? false);
  const [sections, setSections] = useState<BlogSection[]>(() => {
    if (editingBlog?.content?.length) {
      // Normalise sections — old sections may not have `bullets` field
      return editingBlog.content.map(s => ({
        heading: s.heading ?? "",
        text: s.text ?? "",
        img: s.img ?? "",
        bullets: Array.isArray(s.bullets) && s.bullets.length ? s.bullets : [],
      }));
    }
    return [emptySection()];
  });
  const [faqs, setFaqs] = useState<FAQ[]>(() =>
    editingBlog?.faqs?.length ? editingBlog.faqs : [emptyFaq()]
  );

  /* Upload states */
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadingSectionIdx, setUploadingSectionIdx] = useState<number | null>(null);

  /* UI */
  const [activePanel, setActivePanel] = useState<"content" | "faqs" | "settings">("content");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((type: "success" | "error" | "warning", text: string) => {
    setToast({ id: Date.now().toString(), type, text });
  }, []);

  /* Upload helper */
  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const token = localStorage.getItem("admin_token");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await fetch("http://localhost:8000/api/admin/upload", {
      method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd,
    });
    if (!res.ok) throw new Error("Upload failed");
    return (await res.json()).path;
  };

  /* Cover upload */
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsUploadingCover(true);
    try { setImage(await uploadFile(e.target.files[0], "blogs")); showToast("success", "✓ Cover image uploaded."); }
    catch { showToast("error", "✗ Cover upload failed."); }
    finally { setIsUploadingCover(false); }
  };

  /* Section image upload */
  const handleSectionImg = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    if (!e.target.files?.[0]) return;
    setUploadingSectionIdx(idx);
    try {
      const path = await uploadFile(e.target.files[0], "blogs");
      const u = [...sections]; u[idx].img = path; setSections(u);
      showToast("success", `✓ Section ${idx + 1} image uploaded.`);
    } catch { showToast("error", "✗ Section image upload failed."); }
    finally { setUploadingSectionIdx(null); }
  };

  /* Section helpers */
  const addSection = () => setSections([...sections, emptySection()]);
  const removeSection = (i: number) => setSections(sections.filter((_, idx) => idx !== i));
  const updateSection = (i: number, f: "heading" | "text" | "img", v: string) => {
    const u = [...sections]; u[i][f] = v; setSections(u);
  };

  /* Bullet helpers (inside section) */
  const addBullet = (secIdx: number) => {
    const u = [...sections]; u[secIdx].bullets = [...(u[secIdx].bullets ?? []), ""]; setSections(u);
  };
  const removeBullet = (secIdx: number, bIdx: number) => {
    const u = [...sections]; u[secIdx].bullets = u[secIdx].bullets.filter((_, i) => i !== bIdx); setSections(u);
  };
  const updateBullet = (secIdx: number, bIdx: number, v: string) => {
    const u = [...sections]; u[secIdx].bullets[bIdx] = v; setSections(u);
  };

  /* FAQ helpers */
  const addFaq = () => setFaqs([...faqs, emptyFaq()]);
  const removeFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i));
  const updateFaq = (i: number, f: "question" | "answer", v: string) => {
    const u = [...faqs]; u[i][f] = v; setFaqs(u);
  };

  /* Submit */
  const handleSave = async () => {
    setConfirmOpen(false);
    if (!title.trim()) { showToast("warning", "⚠ Article title is required."); return; }
    if (!category) { showToast("warning", "⚠ Please select a category."); return; }

    setIsSubmitting(true);
    const token = localStorage.getItem("admin_token");
    const payload = {
      title: title.trim(), category, excerpt: excerpt.trim(), image,
      content: sections.filter(s => s.heading || s.text),
      bullets: sections.flatMap(s => (s.bullets ?? []).filter(b => b.trim()).map(b => ({ text: b }))),
      faqs: faqs.filter(f => f.question.trim() && f.answer.trim()),
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
    };

    try {
      const url = isEditing ? `http://localhost:8000/api/admin/blogs/${editingBlog.id}` : "http://localhost:8000/api/admin/blogs";
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showToast("success", isEditing ? "✓ Article updated and live on the website." : "✓ New article created successfully!");
        setTimeout(() => onSaved(), 900);
      } else {
        const err = await res.json().catch(() => ({}));
        showToast("error", `✗ ${err.message || "Failed to save article."}`);
      }
    } catch { showToast("error", "✗ Network error. Could not reach server."); }
    finally { setIsSubmitting(false); }
  };

  const totalBullets = sections.reduce((acc, s) => acc + (s.bullets?.filter(b => b.trim()).length ?? 0), 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Top Header Bar ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="text-sm font-medium">All Articles</span>
          </button>
          <span className="text-slate-200">|</span>
          <div>
            <span className="text-xs font-medium text-[#f37021] uppercase tracking-widest">{isEditing ? "Editing" : "New Article"}</span>
            {title && <p className="text-sm font-medium text-slate-800 mt-0.5 line-clamp-1 max-w-xs">{title}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Quick publish toggle */}
          <div onClick={() => setIsPublished(!isPublished)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition-all select-none ${isPublished ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
            <div className={`w-8 h-4.5 h-[18px] rounded-full transition-colors relative shrink-0 ${isPublished ? "bg-emerald-500" : "bg-slate-300"}`}>
              <div className={`w-3.5 h-3.5 rounded-full bg-white shadow absolute top-[1px] transition-all ${isPublished ? "left-[17px]" : "left-[1px]"}`} />
            </div>
            <span className={`text-xs font-medium ${isPublished ? "text-emerald-700" : "text-slate-500"}`}>
              {isPublished ? "Published" : "Draft"}
            </span>
          </div>
          <button onClick={onBack} className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors cursor-pointer">
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            onClick={() => setConfirmOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-[#f37021] hover:bg-[#d55c14] disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-all shadow-md shadow-[#f37021]/20 cursor-pointer"
          >
            {isSubmitting ? (
              <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
            ) : isEditing ? "Update Article" : "Publish Article"}
          </button>
        </div>
      </div>

      {/* ── Panel Tabs ── */}
      <div className="bg-white border-b border-slate-100 px-6">
        <div className="flex items-center gap-0">
          {([
            { key: "content", label: `Content (${sections.length} sections, ${totalBullets} bullets)` },
            { key: "faqs", label: `FAQs (${faqs.filter(f => f.question).length})` },
            { key: "settings", label: "Article Settings" },
          ] as const).map(tab => (
            <button key={tab.key} onClick={() => setActivePanel(tab.key)}
              className={`px-5 py-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activePanel === tab.key ? "border-[#f37021] text-[#f37021]" : "border-transparent text-slate-400 hover:text-slate-700"
              }`}>{tab.label}</button>
          ))}
        </div>
      </div>

      {/* ── Main Editor Body ── */}
      <div className="flex-1 flex gap-0">

        {/* ── LEFT: MAIN CONTENT AREA ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-8 space-y-8">

            {/* CONTENT PANEL */}
            {activePanel === "content" && (
              <div className="space-y-8">
                {/* Title at top of content */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-widest block">Article Title <span className="text-rose-400">*</span></label>
                  <input type="text" placeholder="Write a compelling title..." value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-[#f37021] px-0 py-2 text-2xl font-outfit font-medium text-slate-900 placeholder-slate-300 focus:outline-none transition-all"
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-widest block">Summary / Excerpt</label>
                  <textarea rows={2} placeholder="Brief summary of this article shown in blog listing..." value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#f37021]/50 transition-all font-normal leading-relaxed resize-none"
                  />
                </div>

                {/* Sections */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-slate-700">Content Sections</h3>
                    <button onClick={addSection}
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-700 text-white text-xs font-medium uppercase tracking-wider rounded-xl transition-colors cursor-pointer">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      Add Section
                    </button>
                  </div>

                  <div className="space-y-6">
                    {sections.map((sec, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                        {/* Section Header */}
                        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-100">
                          <span className="text-xs font-medium text-[#f37021] uppercase tracking-widest">Section {idx + 1}</span>
                          <button onClick={() => removeSection(idx)}
                            className="p-1.5 hover:bg-rose-50 hover:text-rose-500 text-slate-400 rounded-lg transition-colors cursor-pointer">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>

                        {/* Section Body */}
                        <div className="p-5 space-y-5">
                          {/* Heading */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Section Heading</label>
                            <input type="text" placeholder="Enter section heading..." value={sec.heading}
                              onChange={e => updateSection(idx, "heading", e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f37021]/50 focus:bg-white transition-all"
                            />
                          </div>

                          {/* Body Text */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Body Content</label>
                            <textarea rows={4} placeholder="Write the section body content..." value={sec.text}
                              onChange={e => updateSection(idx, "text", e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#f37021]/50 focus:bg-white transition-all font-normal leading-relaxed resize-none"
                            />
                          </div>

                          {/* ── Bullet Points (inside section) ── */}
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-[#f37021]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                Bullet Points
                              </label>
                              <button onClick={() => addBullet(idx)} type="button"
                                className="flex items-center gap-1 px-2.5 py-1 bg-[#f37021]/8 hover:bg-[#f37021]/15 text-[#f37021] text-xs font-medium rounded-lg transition-colors cursor-pointer">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                Add Point
                              </button>
                            </div>
                            {sec.bullets && sec.bullets.length > 0 ? (
                              <div className="space-y-2 pl-3 border-l-2 border-[#f37021]/20">
                                {sec.bullets.map((b, bIdx) => (
                                  <div key={bIdx} className="flex items-center gap-2.5">
                                    <div className="w-4 h-4 rounded-full bg-[#f37021]/15 flex items-center justify-center shrink-0">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#f37021]" />
                                    </div>
                                    <input type="text" placeholder={`Bullet point ${bIdx + 1}...`} value={b}
                                      onChange={e => updateBullet(idx, bIdx, e.target.value)}
                                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#f37021]/40 focus:bg-white transition-all"
                                    />
                                    <button onClick={() => removeBullet(idx, bIdx)} type="button"
                                      className="p-1 hover:bg-rose-50 hover:text-rose-500 text-slate-300 rounded transition-colors cursor-pointer shrink-0">
                                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-400 italic pl-3">No bullet points yet — click Add Point to add key highlights for this section.</p>
                            )}
                          </div>

                          {/* Section Image */}
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Section Image (Optional)</label>
                            <div className="flex items-start gap-3">
                              {sec.img && (
                                <div className="relative shrink-0">
                                  <div className="w-24 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                    <img src={getImgUrl(sec.img)} alt="" className="object-cover w-full h-full" />
                                  </div>
                                  <button onClick={() => updateSection(idx, "img", "")}
                                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-rose-600">×</button>
                                </div>
                              )}
                              <label className="flex-1 flex items-center justify-center p-3 border border-dashed border-slate-200 hover:border-[#f37021]/40 rounded-xl cursor-pointer bg-slate-50 hover:bg-white transition-all min-h-[64px]">
                                {uploadingSectionIdx === idx ? (
                                  <div className="flex items-center gap-2">
                                    <div className="w-3.5 h-3.5 border-2 border-[#f37021]/30 border-t-[#f37021] rounded-full animate-spin" />
                                    <span className="text-xs text-slate-400">Uploading...</span>
                                  </div>
                                ) : (
                                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{sec.img ? "Replace" : "Upload Image"}</span>
                                )}
                                <input type="file" accept="image/*" onChange={e => handleSectionImg(e, idx)} className="hidden" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {sections.length === 0 && (
                      <div className="flex flex-col items-center py-12 gap-3 border-2 border-dashed border-slate-200 rounded-2xl">
                        <span className="text-3xl">📝</span>
                        <p className="text-slate-400 text-sm">No sections yet — click Add Section above.</p>
                        <button onClick={addSection} className="px-4 py-2 bg-[#f37021] text-white text-xs font-medium rounded-xl cursor-pointer hover:bg-[#d55c14] transition-colors">
                          Add First Section
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* FAQs PANEL */}
            {activePanel === "faqs" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700">Frequently Asked Questions</h3>
                    <p className="text-xs text-slate-400 mt-0.5">FAQs improve reader trust and SEO visibility for this article.</p>
                  </div>
                  <button onClick={addFaq}
                    className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium uppercase tracking-wider rounded-xl transition-colors cursor-pointer">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    Add FAQ
                  </button>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-purple-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                      <div className="flex items-center justify-between px-5 py-3.5 bg-purple-50 border-b border-purple-100">
                        <span className="text-xs font-medium text-purple-600 uppercase tracking-widest">FAQ {idx + 1}</span>
                        <button onClick={() => removeFaq(idx)} className="p-1.5 hover:bg-rose-50 hover:text-rose-500 text-slate-400 rounded-lg cursor-pointer transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                      <div className="p-5 space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Question</label>
                          <input type="text" placeholder="What is the question readers commonly ask?" value={faq.question}
                            onChange={e => updateFaq(idx, "question", e.target.value)}
                            className="w-full bg-slate-50 border border-purple-100 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-300 transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Answer</label>
                          <textarea rows={3} placeholder="Provide a clear, helpful answer..." value={faq.answer}
                            onChange={e => updateFaq(idx, "answer", e.target.value)}
                            className="w-full bg-slate-50 border border-purple-100 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 transition-all font-normal leading-relaxed resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {faqs.length === 0 && (
                    <div className="flex flex-col items-center py-12 gap-3 border-2 border-dashed border-purple-100 rounded-2xl">
                      <span className="text-3xl">❓</span>
                      <p className="text-slate-400 text-sm">No FAQs added — click Add FAQ to start.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SETTINGS PANEL */}
            {activePanel === "settings" && (
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-slate-700">Article Settings & Meta</h3>

                {/* Cover Image */}
                <div className="p-6 border border-slate-200 rounded-2xl space-y-4 bg-white">
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-widest">Cover Image</h4>
                  {image && (
                    <div className="relative">
                      <div className="aspect-[16/7] w-full rounded-xl overflow-hidden border border-slate-200">
                        <img src={getImgUrl(image)} alt="Cover" className="object-cover w-full h-full" />
                      </div>
                      <button onClick={() => setImage("")}
                        className="absolute top-3 right-3 w-7 h-7 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center text-sm cursor-pointer shadow-lg transition-colors">×</button>
                    </div>
                  )}
                  <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 hover:border-[#f37021]/50 rounded-xl cursor-pointer bg-slate-50 hover:bg-white transition-all text-center">
                    {isUploadingCover ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-7 h-7 border-2 border-[#f37021]/30 border-t-[#f37021] rounded-full animate-spin" />
                        <span className="text-xs font-medium text-[#f37021]">Uploading...</span>
                      </div>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-slate-500">{image ? "Replace Cover Image" : "Upload Cover Image"}</span>
                        <span className="text-xs text-slate-400 mt-1">JPEG · PNG · WEBP — max 10MB</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                  </label>
                </div>

                {/* Category */}
                <div className="p-6 border border-slate-200 rounded-2xl space-y-3 bg-white">
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-widest">Category <span className="text-rose-400">*</span></h4>
                  <div className="grid grid-cols-2 gap-2">
                    {BLOG_CATEGORIES.map(cat => (
                      <button key={cat} type="button" onClick={() => setCategory(cat)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all cursor-pointer border ${
                          category === cat ? "bg-[#f37021] text-white border-[#f37021] shadow-md" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-[#f37021]/30 hover:bg-white"
                        }`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Publish */}
                <div className="p-6 border border-slate-200 rounded-2xl bg-white space-y-3">
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-widest">Publish Status</h4>
                  <div onClick={() => setIsPublished(!isPublished)}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all select-none ${isPublished ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
                    <div>
                      <p className={`text-sm font-medium ${isPublished ? "text-emerald-800" : "text-slate-700"}`}>
                        {isPublished ? "Published — Article is live on website" : "Draft — Article is hidden from public"}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">Toggle to change visibility.</p>
                    </div>
                    <div className={`w-10 h-6 rounded-full transition-colors relative shrink-0 ${isPublished ? "bg-emerald-500" : "bg-slate-300"}`}>
                      <div className={`w-4 h-4 rounded-full bg-white shadow absolute top-1 transition-all ${isPublished ? "left-5" : "left-1"}`} />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-6 border border-slate-200 rounded-2xl bg-slate-50 space-y-3">
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-widest">Article Summary</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Sections", value: sections.filter(s => s.heading || s.text).length },
                      { label: "Bullets", value: sections.reduce((a, s) => a + (s.bullets?.filter(b => b.trim()).length ?? 0), 0) },
                      { label: "FAQs", value: faqs.filter(f => f.question.trim()).length },
                      { label: "Images", value: [image, ...sections.map(s => s.img)].filter(Boolean).length },
                    ].map(item => (
                      <div key={item.label} className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                        <p className="text-xl font-outfit font-medium text-slate-800">{item.value}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR (quick settings) ── */}
        <div className="w-72 shrink-0 border-l border-slate-200 bg-white p-6 space-y-6 overflow-y-auto hidden lg:block">
          <div>
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">Category</h4>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-[#f37021]/50 transition-all">
              <option value="">— Select Category —</option>
              {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">Cover Image</h4>
            {image ? (
              <div className="relative">
                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200">
                  <img src={getImgUrl(image)} alt="Cover" className="object-cover w-full h-full" />
                </div>
                <button onClick={() => setImage("")}
                  className="absolute top-2 right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-rose-600">×</button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-200 hover:border-[#f37021]/40 rounded-xl cursor-pointer bg-slate-50 hover:bg-white transition-all text-center">
                {isUploadingCover ? (
                  <div className="w-5 h-5 border-2 border-[#f37021]/30 border-t-[#f37021] rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-6 h-6 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-slate-500">Upload Cover</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* Article stats */}
          <div>
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">Article Stats</h4>
            <div className="space-y-2">
              {[
                { label: "Sections", value: sections.filter(s => s.heading || s.text).length, color: "text-slate-700" },
                { label: "Total Bullets", value: totalBullets, color: "text-[#f37021]" },
                { label: "FAQs", value: faqs.filter(f => f.question).length, color: "text-purple-600" },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-xs text-slate-400">{s.label}</span>
                  <span className={`text-sm font-medium ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <AdminConfirmModal
        isOpen={confirmOpen}
        title={isEditing ? "Confirm Article Update" : "Confirm Publish Article"}
        description={`You are about to ${isEditing ? "update" : "create"} this article. ${isPublished ? "It will be visible on the live website." : "It will be saved as a draft."}`}
        confirmLabel={isEditing ? "Yes, Update Article" : "Yes, Create Article"}
        onConfirm={handleSave}
        onCancel={() => setConfirmOpen(false)}
      />
      <AdminToast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE — router between list and editor
══════════════════════════════════════════════════ */
export default function AdminBlogsPage() {
  const [view, setView] = useState<"list" | "editor">("list");
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const handleEdit = (blog: Blog) => { setEditingBlog(blog); setView("editor"); };
  const handleCreateNew = () => { setEditingBlog(null); setView("editor"); };
  const handleBack = () => { setView("list"); setEditingBlog(null); };
  const handleSaved = () => { setView("list"); setEditingBlog(null); };

  return (
    <AdminLayout activeTab="blogs">
      {view === "list" ? (
        <BlogListView onEdit={handleEdit} onCreateNew={handleCreateNew} />
      ) : (
        <BlogEditorView editingBlog={editingBlog} onBack={handleBack} onSaved={handleSaved} />
      )}
    </AdminLayout>
  );
}
