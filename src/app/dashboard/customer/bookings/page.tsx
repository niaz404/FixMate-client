'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';
import { CreditCard, Ban, Wrench, Calendar, MapPin } from 'lucide-react';

interface Booking {
  _id: string;
  serviceId: string;
  serviceTitle: string;
  serviceImage: string;
  category: string;
  basePrice: number;
  finalAmount: number;
  technicianName: string;
  technicianEmail: string;
  preferredDate: string;
  problemDescription: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Cancellation modal state
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  // Stripe processing state
  const [payingBookingId, setPayingBookingId] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);
    try {
      const res = await fetchApi('/bookings/my');
      if (res.success && Array.isArray(res.data)) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error('Error fetching customer bookings', err);
    } finally {
      setLoading(false);
    }
  }

  const handleCancelClick = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBookingId) return;

    try {
      const res = await fetchApi(`/bookings/${selectedBookingId}/cancel`, {
        method: 'PATCH',
      });

      if (res.success) {
        toast.success(res.message || 'Booking cancelled successfully.');
        loadBookings();
      } else {
        toast.error(res.message || 'Unable to cancel this booking.');
      }
    } catch (err: any) {
      toast.error('An error occurred cancelling your booking.');
    }
  };

  const handlePayNow = async (bookingId: string) => {
    setPayingBookingId(bookingId);
    try {
      let checkoutUrl = '';

      // 1. Call Next.js /api/checkout_sessions per Stripe Next.js Quickstart
      try {
        const nextRes = await fetch('/api/checkout_sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId }),
        });
        const nextData = await nextRes.json();
        if (nextData && nextData.url) {
          checkoutUrl = nextData.url;
        }
      } catch (e) {
        console.warn('Notice from /api/checkout_sessions, falling back to Express API:', e);
      }

      // 2. Fallback to Express backend /payments/create-checkout-session
      if (!checkoutUrl) {
        const res = await fetchApi('/payments/create-checkout-session', {
          method: 'POST',
          body: JSON.stringify({ bookingId }),
        });
        if (res && res.url) {
          checkoutUrl = res.url;
        } else {
          toast.error(res?.message || 'Unable to initialize Stripe Checkout session.');
          return;
        }
      }

      if (checkoutUrl) {
        toast.info('Redirecting to secure Stripe Checkout...');
        window.location.href = checkoutUrl;
      }
    } catch (err: any) {
      toast.error('Payment checkout failed.');
    } finally {
      setPayingBookingId(null);
    }
  };

  return (
    <DashboardLayout allowedRoles={['customer']}>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-medium text-[#000000]">
            My Repair Bookings
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Track status updates from technicians, cancel pending requests, and pay completed jobs.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 glossy-card rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 glossy-card rounded-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[#1e3a8a] flex items-center justify-center mx-auto">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#000000]">
              No bookings on file
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              You haven&apos;t requested any repair services yet. Check out our verified catalog to get started.
            </p>
            <Link
              href="/services"
              className="inline-block px-5 py-2.5 glossy-btn-primary rounded-xl text-xs uppercase tracking-wider font-semibold"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="glossy-card rounded-2xl divide-y divide-slate-100 overflow-hidden">
            {bookings.map((booking) => {
              const canCancel = booking.status === 'requested';
              const canPay =
                booking.status === 'completed' && booking.paymentStatus === 'unpaid';
              const isPaid = booking.paymentStatus === 'paid';

              return (
                <div
                  key={booking._id}
                  className="p-5 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-slate-50/60 transition-colors"
                >
                  {/* Left: Image & Info */}
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden shadow-xs">
                      <img
                        src={booking.serviceImage}
                        alt={booking.serviceTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={booking.status} type="job" />
                        <StatusBadge status={booking.paymentStatus} type="payment" />
                        <span className="text-[11px] text-slate-500 uppercase tracking-wider">
                          {booking.category}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-medium text-[#000000]">
                        {booking.serviceTitle}
                      </h3>

                      <div className="text-xs text-slate-600 space-y-0.5">
                        <div>
                          Assigned Tech:{' '}
                          <span className="text-[#000000] font-semibold">
                            {booking.technicianName}
                          </span>{' '}
                          ({booking.technicianEmail})
                        </div>
                        <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Date: {new Date(booking.preferredDate).toLocaleDateString()}</span>
                          </span>
                          <span>&bull;</span>
                          <span>
                            Booked: {new Date(booking.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-1 italic pt-1">
                        &ldquo;{booking.problemDescription}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Right: Pricing & Context-Aware Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0 shrink-0 space-y-2">
                    <div className="text-left lg:text-right">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 block font-medium">
                        {booking.status === 'completed' ? 'Final Amount' : 'Estimated Base'}
                      </span>
                      <span className="font-serif text-2xl font-semibold text-[#000000]">
                        ${booking.finalAmount || booking.basePrice}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Cancel action (only when requested) */}
                      {canCancel && (
                        <button
                          onClick={() => handleCancelClick(booking._id)}
                          className="px-3.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-xs uppercase tracking-wider font-semibold hover:bg-rose-100 transition-colors flex items-center space-x-1 shadow-xs"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      )}

                      {/* Pay Now button (only when completed & unpaid) */}
                      {canPay && (
                        <button
                          onClick={() => handlePayNow(booking._id)}
                          disabled={payingBookingId === booking._id}
                          className="px-4 py-2 glossy-btn-primary rounded-xl text-xs uppercase tracking-wider font-bold flex items-center space-x-1.5 shadow-md"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>
                            {payingBookingId === booking._id ? 'Starting Stripe...' : 'Pay with Stripe'}
                          </span>
                        </button>
                      )}

                      {/* Paid badge when paid */}
                      {isPaid && (
                        <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg uppercase tracking-wider">
                          Receipt Issued
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        <ConfirmationModal
          isOpen={cancelModalOpen}
          title="Cancel Repair Booking?"
          message="Are you sure you want to cancel this repair request? This action cannot be undone once confirmed."
          confirmLabel="Yes, Cancel Booking"
          isDestructive={true}
          onConfirm={handleConfirmCancel}
          onClose={() => setCancelModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
