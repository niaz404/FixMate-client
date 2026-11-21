'use client';

import React from 'react';
import Link from 'next/link';
import { Ban, ArrowRight, RotateCcw } from 'lucide-react';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] bg-[#1b2932] text-[#fefdfe] py-16 flex items-center justify-center px-4 font-mono">
      <div className="max-w-md w-full bg-[#213039] border border-[#32414a] p-8 shadow-2xl space-y-6 text-center">
        <div className="w-16 h-16 bg-[#1b2932] border border-[#32414a] text-amber-400 flex items-center justify-center mx-auto">
          <Ban className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
            Checkout Interrupted
          </span>
          <h2 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Payment Cancelled
          </h2>
          <p className="text-xs text-[#dbdbda] leading-relaxed">
            Your Stripe checkout session was cancelled. No charges were made to your account, and your completed booking remains open.
          </p>
        </div>

        <div className="p-4 bg-[#1b2932] border border-[#32414a] text-xs text-[#dbdbda] text-left">
          &bull; You can retry payment at any time from your customer dashboard.
          <br />
          &bull; Once paid, your warranty period and receipt will become active.
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/customer/bookings"
            className="flex-1 inline-flex items-center justify-center space-x-2 py-3 bg-[#f1f3f4] text-[#040404] text-xs uppercase tracking-wider font-bold hover:bg-[#67e8f9] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </Link>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center space-x-2 py-3 border border-[#32414a] bg-[#1b2932] text-[#fefdfe] text-xs uppercase tracking-wider hover:bg-[#213039] transition-colors"
          >
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
