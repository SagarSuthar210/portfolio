import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white border border-emerald-500/40 text-slate-800 shadow-xl shadow-slate-900/10 animate-in slide-in-from-bottom-5 duration-200">
      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
      <span className="text-xs sm:text-sm font-medium">{message}</span>
    </div>
  );
}
