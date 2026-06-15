import React, { useEffect } from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning";
  text: string;
}

interface AdminToastProps {
  message: ToastMessage | null;
  onClose: () => void;
}

export default function AdminToast({ message, onClose }: AdminToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const typeConfig = {
    success: {
      bg: "bg-white border-emerald-100",
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
      path: "M5 13l4 4L19 7"
    },
    error: {
      bg: "bg-white border-rose-100",
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50",
      path: "M6 18L18 6M6 6l12 12"
    },
    warning: {
      bg: "bg-white border-amber-100",
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
      path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    }
  };

  const config = typeConfig[message.type];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-slideIn">
      <div className={`flex items-center gap-4 p-4 rounded-2xl border shadow-xl max-w-sm ${config.bg}`}>
        <div className={`p-2 rounded-xl shrink-0 ${config.iconBg} ${config.iconColor}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d={config.path} />
          </svg>
        </div>
        <p className="text-slate-800 text-sm font-medium pr-2">
          {message.text}
        </p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          aria-label="Close Notification"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
