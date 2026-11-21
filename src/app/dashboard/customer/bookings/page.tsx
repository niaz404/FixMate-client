'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';
import { CreditCard, Ban, Wrench, Calendar, MapPin, AlertCircle } from 'lucide-react';

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
      const res = await fetchApi('/payments/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify({ bookingId }),
      });

      if (res.success && res.url) {
        toast.info('Redirecting to secure Stripe Checkout...');
        window.location.href = res.url;
      } else {
        toast.error(res.message || 'Unable to initialize Stripe Checkout session.');
      }
    } catch (err: any) {
      toast.error('Payment checkout failed.');
    } finally {
      setPayingBookingId(null);
    }
  };

  return (
    <DashboardLayout allowedRoles={['customer']}>
      <div className="space-y-6 font-mono">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            My Repair Bookings
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            Track status updates from technicians, cancel pending requests, and pay completed jobs.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-[#213039] border border-[#32414a] animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 border border-[#32414a] bg-[#213039] text-center space-y-4">
            <Wrench className="w-10 h-10 text-[#67e8f9] mx-auto" />
            <h3 className="font-display font-semibold text-lg text-[#fefdfe]">
              No bookings on file.
            </h3>
            <p className="text-xs text-[#dbdbda] max-w-sm mx-auto">
              You haven&apos;t requested any repair services yet. Check out our verified catalog to get started.
            </p>
            <Link
              href="/services"
              className="inline-block px-5 py-2.5 bg-[#f1f3f4] text-[#040404] text-xs uppercase tracking-wider font-semibold hover:bg-[#67e8f9]"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="border border-[#32414a] bg-[#213039] divide-y divide-[#32414a]">
            {bookings.map((booking) => {
              const canCancel = booking.status === 'requested';
              const canPay =
                booking.status === 'completed' && booking.paymentStatus === 'unpaid';
              const isPaid = booking.paymentStatus === 'paid';

              return (
                <div
                  key={booking._id}
                  className="p-5 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#1b2932]/40 transition-colors"
                >
                  {/* Left: Image & Info */}
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[#1b2932] border border-[#32414a] shrink-0 overflow-hidden">
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
                        <span className="text-[10px] text-[#dbdbda] uppercase">
                          {booking.category}
                        </span>
                      </div>

                      <h3 className="font-display font-semibold text-base text-[#fefdfe]">
                        {booking.serviceTitle}
                      </h3>

                      <div className="text-[11px] text-[#dbdbda] space-y-0.5">
                        <div>
                          Assigned Tech:{' '}
                          <span className="text-[#fefdfe] font-semibold">
                            {booking.technicianName}
                          </span>{' '}
                          ({booking.technicianEmail})
                        </div>
                        <div className="flex items-center space-x-3 text-[10px] text-[#dbdbda]/80">
                          <span>
                            Date: {new Date(booking.preferredDate).toLocaleDateString()}
                          </span>
                          <span>&bull;</span>
                          <span>
                            Booked: {new Date(booking.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#eaeae9]/70 line-clamp-1 italic pt-1">
                        &ldquo;{booking.problemDescription}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Right: Pricing & Context-Aware Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 border-[#32414a] pt-4 lg:pt-0 shrink-0 space-y-2">
                    <div className="text-left lg:text-right">
                      <span className="text-[10px] uppercase text-[#dbdbda] block">
                        {booking.status === 'completed' ? 'Final Amount' : 'Estimated Base'}
                      </span>
                      <span className="text-2xl font-display font-bold text-[#fefdfe]">
                        ${booking.finalAmount || booking.basePrice}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Cancel action (only when requested) */}
                      {canCancel && (
                        <button
                          onClick={() => handleCancelClick(booking._id)}
                          className="px-3 py-1.5 border border-rose-800 bg-rose-950/40 text-rose-300 text-xs uppercase tracking-wider hover:bg-rose-900/60 transition-colors flex items-center space-x-1"
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
                          className="px-4 py-2 bg-[#67e8f9] text-[#040404] text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors flex items-center space-x-1.5 shadow-lg"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>
                            {payingBookingId === booking._id ? 'Starting Stripe...' : 'Pay Now'}
                          </span>
                        </button>
                      )}

                      {/* Paid badge when paid */}
                      {isPaid && (
                        <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
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
