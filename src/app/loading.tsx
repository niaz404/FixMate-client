import React from 'react';
import { FixuraShieldIcon } from '@/components/ui/FixuraLogo';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-white/90 border border-white/80 shadow-md flex items-center justify-center animate-pulse">
        <FixuraShieldIcon className="w-8 h-8 text-[#1e3a8a] animate-spin" />
      </div>
      <div className="space-y-1">
        <p className="font-serif text-lg font-medium text-[#000000]">
          Loading Fixura
        </p>
        <p className="text-xs text-slate-500">
          Preparing your repair workspace...
        </p>
      </div>
    </div>
  );
}
