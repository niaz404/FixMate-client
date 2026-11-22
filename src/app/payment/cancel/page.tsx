'use client';

import React from 'react';
import Link from 'next/link';
import { Ban, RotateCcw, Home } from 'lucide-react';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] bg-[#dde6f0] text-[#000000] py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-white/80 bg-white/90 p-8 shadow-md space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
          <Ban className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold block">
            Checkout Interrupted
          </span>
          <h2 className="text-2xl font-serif font-medium text-[#000000]">
            Payment Cancelled
          </h2>
          <p className="text-xs text-[#383838] leading-relaxed">
            Your Stripe checkout session was cancelled. No charges were made to your card, and your completed booking remains open.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#dde6f0]/50 border border-[#bfc7d1]/40 text-xs text-[#383838] text-left leading-relaxed space-y-1">
          <div>&bull; You can retry payment at any time from your customer dashboard.</div>
          <div>&bull; Once paid, your warranty period and receipt will become active.</div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/customer/bookings"
            className="glossy-btn-primary flex-1 inline-flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-semibold"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </Link>
          <Link
            href="/"
            className="glossy-btn-secondary flex-1 inline-flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-semibold"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
