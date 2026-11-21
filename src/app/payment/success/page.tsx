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
    <div className="min-h-[80vh] bg-[#1b2932] text-[#fefdfe] py-16 flex items-center justify-center px-4 font-mono">
      <div className="max-w-md w-full bg-[#213039] border border-[#32414a] p-8 shadow-2xl space-y-6 text-center">
        {loading ? (
          <div className="space-y-4 py-8">
            <div className="w-12 h-12 border-2 border-[#67e8f9] border-t-transparent animate-spin rounded-full mx-auto" />
            <h2 className="text-lg font-display font-semibold">Verifying Stripe Payment...</h2>
            <p className="text-xs text-[#dbdbda]">Contacting payment gateway...</p>
          </div>
        ) : error ? (
          <div className="space-y-4 py-4">
            <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
            <h2 className="text-xl font-display font-semibold text-rose-300">
              Payment Verification
            </h2>
            <p className="text-xs text-[#dbdbda] leading-relaxed">{error}</p>
            <Link
              href="/dashboard/customer/bookings"
              className="inline-block px-5 py-2.5 bg-[#f1f3f4] text-[#040404] text-xs uppercase tracking-wider font-semibold hover:bg-[#67e8f9] transition-colors"
            >
              Return to My Bookings
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="w-16 h-16 bg-[#02444b] border border-[#32414a] text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#67e8f9] font-bold block mb-1">
                Transaction Completed
              </span>
              <h2 className="text-2xl font-display font-semibold text-[#fefdfe]">
                Payment Successful!
              </h2>
              <p className="text-xs text-[#dbdbda] mt-1">
                Your repair booking has been marked as officially paid.
              </p>
            </div>

            <div className="bg-[#1b2932] border border-[#32414a] p-4 text-xs text-left space-y-2">
              <div className="flex justify-between border-b border-[#32414a] pb-2">
                <span className="text-[#dbdbda]">Status:</span>
                <span className="text-emerald-400 font-bold">PAID</span>
              </div>
              <div className="flex justify-between border-b border-[#32414a] pb-2">
                <span className="text-[#dbdbda]">Amount Settled:</span>
                <span className="text-emerald-400 font-bold">${payment?.amount || 'Verified'} USD</span>
              </div>
              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase text-[#dbdbda] block">Session Reference:</span>
                <span className="text-[10px] text-[#67e8f9] select-all break-all block font-mono">
                  {sessionId}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard/customer/bookings"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 bg-[#f1f3f4] text-[#040404] text-xs uppercase tracking-wider font-bold hover:bg-[#67e8f9] transition-colors"
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
    <Suspense fallback={<div className="min-h-screen bg-[#1b2932] p-12 text-[#fefdfe] font-mono">Verifying payment...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
