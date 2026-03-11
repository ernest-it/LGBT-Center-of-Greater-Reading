'use client';

import { Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
      <input
        type="email"
        disabled
        placeholder="Newsletter coming soon"
        className="flex-1 px-4 py-2.5 bg-white/10 border border-white/10 rounded-lg text-white/40 placeholder:text-white/40 text-sm cursor-not-allowed"
      />
      <button
        type="button"
        disabled
        className="px-4 py-2.5 bg-primary/50 rounded-lg shrink-0 cursor-not-allowed"
        title="Newsletter signup coming soon"
      >
        <Send className="w-4 h-4 text-white/40" />
      </button>
    </form>
  );
}
