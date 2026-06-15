import React from "react";

interface AdminConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AdminConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDanger = false,
  onConfirm,
  onCancel
}: AdminConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#060d17]/80 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl z-10 animate-scaleIn">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-2xl ${isDanger ? "bg-rose-50 text-rose-500" : "bg-[#f37021]/10 text-[#f37021]"}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="font-outfit font-medium text-xl text-slate-900">
            {title}
          </h3>
        </div>

        <p className="text-slate-500 text-sm font-normal leading-relaxed mb-8">
          {description}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm font-medium uppercase tracking-wider transition-colors cursor-pointer select-none"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-white text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer select-none shadow-md ${
              isDanger 
                ? "bg-rose-500 hover:bg-rose-600 shadow-rose-500/10" 
                : "bg-[#f37021] hover:bg-[#d55c14] shadow-[#f37021]/10"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
