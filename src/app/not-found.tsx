import React from 'react';
import Link from 'next/link';
import { Wrench, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#1b2932] text-[#fefdfe] flex items-center justify-center p-6 text-center font-mono">
      <div className="max-w-md w-full p-8 border border-[#32414a] bg-[#213039] space-y-6 shadow-2xl">
        <div className="w-16 h-16 bg-[#02444b] border border-[#32414a] text-[#67e8f9] flex items-center justify-center mx-auto">
          <Wrench className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-display font-bold text-[#67e8f9] block">
            404
          </span>
          <h2 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Page Not Found
          </h2>
          <p className="text-xs text-[#dbdbda] leading-relaxed">
            The repair manual or page you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#f1f3f4] text-[#040404] text-xs uppercase tracking-wider font-bold hover:bg-[#67e8f9] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to FixMate Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
