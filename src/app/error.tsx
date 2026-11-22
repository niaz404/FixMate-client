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
    <div className="min-h-[75vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-2xl glossy-card space-y-6">
        <div className="w-14 h-14 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-medium text-[#000000]">
            Application Error
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            An unexpected error occurred while rendering this view. Our engineering logs have captured the diagnostic trace.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center space-x-2 py-3 glossy-btn-primary rounded-xl text-xs font-semibold uppercase tracking-wider"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center space-x-2 py-3 glossy-btn-secondary rounded-xl text-xs font-semibold uppercase tracking-wider"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
