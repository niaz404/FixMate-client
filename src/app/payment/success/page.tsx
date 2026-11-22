'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const bookingId = searchParams.get('bookingId');

  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifyPaymentSession() {
      if (!sessionId) {
        setError('No active Stripe session found in URL.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetchApi('/payments/checkout-verify', {
          method: 'POST',
          body: JSON.stringify({ sessionId, bookingId }),
        });

        if (res.success && res.payment) {
          setPayment(res.payment);
        } else if (res.success && res.result) {
          setPayment(res.result);
        } else {
          setError(res.message || 'Payment verification could not be completed.');
        }
      } catch (err: any) {
        setError(err.message || 'Error communicating with verification gateway.');
      } finally {
        setLoading(false);
      }
    }

    verifyPaymentSession();
  }, [sessionId, bookingId]);

  return (
    <div className="min-h-[80vh] bg-[#dde6f0] text-[#000000] py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-white/80 bg-white/90 p-8 shadow-md space-y-6 text-center">
        {loading ? (
          <div className="space-y-4 py-8">
            <div className="w-12 h-12 border-2 border-[#1e3a8a] border-t-transparent animate-spin rounded-full mx-auto" />
            <h2 className="text-lg font-serif font-semibold text-[#000000]">Verifying Stripe Payment...</h2>
            <p className="text-xs text-[#383838]">Contacting payment gateway...</p>
          </div>
        ) : error ? (
          <div className="space-y-4 py-4">
            <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
            <h2 className="text-xl font-serif font-semibold text-rose-700">
              Payment Verification
            </h2>
            <p className="text-xs text-[#383838] leading-relaxed">{error}</p>
            <Link
              href="/dashboard/customer/bookings"
              className="glossy-btn-secondary inline-block px-5 py-2.5 rounded-lg text-xs font-semibold"
            >
              Return to My Bookings
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-1">
                Transaction Completed
              </span>
              <h2 className="text-2xl font-serif font-medium text-[#000000]">
                Payment Successful!
              </h2>
              <p className="text-xs text-[#383838] mt-1">
                Your repair booking has been marked as officially paid.
              </p>
            </div>

            <div className="rounded-xl bg-[#dde6f0]/50 border border-[#bfc7d1]/40 p-4 text-xs text-left space-y-2">
              <div className="flex justify-between border-b border-[#bfc7d1]/30 pb-2">
                <span className="text-[#383838]">Payment Status:</span>
                <span className="text-emerald-700 font-bold">PAID</span>
              </div>
              <div className="flex justify-between border-b border-[#bfc7d1]/30 pb-2">
                <span className="text-[#383838]">Amount Settled:</span>
                <span className="text-emerald-700 font-bold">${payment?.amount || 'Verified'} USD</span>
              </div>
              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase text-[#383838] block font-medium">Session ID:</span>
                <span className="text-[10px] text-[#1e3a8a] select-all break-all block font-mono">
                  {sessionId}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard/customer/bookings"
                className="glossy-btn-primary w-full inline-flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-semibold tracking-wide"
              >
                <span>Return to My Bookings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#dde6f0] p-12 text-[#000000]">Verifying payment...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
