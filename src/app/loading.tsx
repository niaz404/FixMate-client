import React from 'react';
import { Wrench } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-[#1b2932] text-[#fefdfe] flex flex-col items-center justify-center p-6 text-center font-mono space-y-4">
      <div className="w-12 h-12 bg-[#02444b] border border-[#32414a] text-[#67e8f9] flex items-center justify-center animate-spin">
        <Wrench className="w-6 h-6" />
      </div>
      <p className="text-xs uppercase tracking-widest text-[#dbdbda]">
        Loading FixMate Interface...
      </p>
    </div>
  );
}
