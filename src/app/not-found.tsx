import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FixuraShieldIcon } from '@/components/ui/FixuraLogo';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-2xl glossy-card space-y-6">
        <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 text-[#1e3a8a] flex items-center justify-center mx-auto shadow-xs">
          <FixuraShieldIcon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-serif font-bold text-[#1e3a8a] block">
            404
          </span>
          <h2 className="font-serif text-2xl font-medium text-[#000000]">
            Page Not Found
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The repair service or page you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 glossy-btn-primary rounded-xl text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Fixura Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
