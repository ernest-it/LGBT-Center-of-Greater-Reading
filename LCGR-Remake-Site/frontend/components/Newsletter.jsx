'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-2.5 bg-white/10 border border-white/10 rounded-lg text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        required
      />
      <button
        type="submit"
        className="px-4 py-2.5 bg-primary hover:bg-primary/80 rounded-lg transition-colors shrink-0"
      >
        {submitted ? (
          <span className="text-sm">Sent!</span>
        ) : (
          <Send className="w-4 h-4" />
        )}
      </button>
    </form>
  );
}
