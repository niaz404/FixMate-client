'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Captured Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] bg-[#1b2932] text-[#fefdfe] flex items-center justify-center p-6 text-center font-mono">
      <div className="max-w-md w-full p-8 border border-[#32414a] bg-[#213039] space-y-6 shadow-2xl">
        <div className="w-16 h-16 bg-rose-950/60 border border-rose-800 text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Application Error
          </h2>
          <p className="text-xs text-[#dbdbda] leading-relaxed">
            An unexpected error occurred while rendering this view. Our engineering logs have captured the diagnostic trace.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 bg-[#f1f3f4] text-[#040404] text-xs uppercase tracking-wider font-bold hover:bg-[#67e8f9] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 border border-[#32414a] bg-[#1b2932] text-[#fefdfe] text-xs uppercase tracking-wider hover:bg-[#213039] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
