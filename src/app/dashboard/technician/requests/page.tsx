'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';
import { Check, X as XIcon, Play, CheckCircle2, Clock, Phone, MapPin, X } from 'lucide-react';

interface TechBooking {
  _id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  preferredDate: string;
  problemDescription: string;
  status: string;
  basePrice: number;
  finalAmount: number;
  paymentStatus: string;
  createdAt: string;
}

const STATUS_FILTERS = ['All', 'requested', 'accepted', 'in-progress', 'completed'];

export default function TechnicianRequestsPage() {
  const [requests, setRequests] = useState<TechBooking[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Complete Job Modal State
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [bookingToComplete, setBookingToComplete] = useState<TechBooking | null>(null);
  const [finalAmountInput, setFinalAmountInput] = useState<number>(0);

  // Reject Confirmation Modal State
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [bookingToReject, setBookingToReject] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, [selectedFilter]);

  async function loadRequests() {
    setLoading(true);
    try {
      const query = selectedFilter !== 'All' ? `?status=${selectedFilter}` : '';
      const res = await fetchApi(`/bookings/technician${query}`);
      if (res.success && Array.isArray(res.data)) {
        setRequests(res.data);
      }
    } catch (err) {
      console.error('Error loading technician requests', err);
    } finally {
      setLoading(false);
    }
  }

  // State Transition Actions
  const handleUpdateStatus = async (
    bookingId: string,
    nextStatus: string,
    finalAmount?: number
  ) => {
    try {
      const res = await fetchApi(`/bookings/${bookingId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ nextStatus, finalAmount }),
      });

      if (res.success) {
        toast.success(res.message || `Status changed to ${nextStatus}.`);
        loadRequests();
      } else {
        toast.error(res.message || 'Status transition failed.');
      }
    } catch (err: any) {
      toast.error('An error occurred updating job status.');
    }
  };

  const handleOpenCompleteModal = (booking: TechBooking) => {
    setBookingToComplete(booking);
    setFinalAmountInput(booking.finalAmount || booking.basePrice);
    setCompleteModalOpen(true);
  };

  const handleConfirmComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingToComplete) return;

    if (finalAmountInput <= 0) {
      toast.error('Final amount must be greater than 0.');
      return;
    }

    await handleUpdateStatus(bookingToComplete._id, 'completed', finalAmountInput);
    setCompleteModalOpen(false);
  };

  const handleOpenRejectModal = (id: string) => {
    setBookingToReject(id);
    setRejectModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!bookingToReject) return;
    await handleUpdateStatus(bookingToReject, 'rejected');
  };

  return (
    <DashboardLayout allowedRoles={['technician']}>
      <div className="space-y-6 font-mono text-xs">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Customer Job Requests
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            Accept client orders, update job status pipeline, and finalize completed amounts.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-[#213039] border border-[#32414a]">
          <span className="text-[10px] uppercase text-[#dbdbda] mr-2">Filter Status:</span>
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                selectedFilter === f
                  ? 'bg-[#67e8f9] text-[#040404] font-semibold'
                  : 'bg-[#1b2932] text-[#dbdbda] border border-[#32414a] hover:border-[#67e8f9]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Request Listings */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-[#213039] border border-[#32414a] animate-pulse" />
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="p-12 border border-[#32414a] bg-[#213039] text-center space-y-2">
            <Clock className="w-8 h-8 text-[#67e8f9] mx-auto" />
            <p className="text-xs text-[#dbdbda]">No job requests found under this status filter.</p>
          </div>
        ) : (
          <div className="border border-[#32414a] bg-[#213039] divide-y divide-[#32414a]">
            {requests.map((r) => (
              <div
                key={r._id}
                className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#1b2932]/40 transition-colors"
              >
                {/* Left: Customer & Job Info */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={r.status} type="job" />
                    {r.status === 'completed' && (
                      <StatusBadge status={r.paymentStatus} type="payment" />
                    )}
                    <span className="text-[10px] text-[#dbdbda]">
                      Date: {new Date(r.preferredDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-base text-[#fefdfe]">
                    {r.serviceTitle}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-[#dbdbda]">
                    <div>
                      Customer:{' '}
                      <strong className="text-[#fefdfe]">{r.customerName}</strong>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3 text-[#67e8f9]" />
                      <span>{r.customerPhone}</span>
                    </div>
                    <div className="sm:col-span-2 flex items-start space-x-1">
                      <MapPin className="w-3 h-3 text-[#67e8f9] shrink-0 mt-0.5" />
                      <span>{r.address}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#1b2932] border border-[#32414a] text-[11px] text-[#dbdbda] italic leading-relaxed">
                    &ldquo;{r.problemDescription}&rdquo;
                  </div>
                </div>

                {/* Right: Price & Context-Aware Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 border-[#32414a] pt-4 lg:pt-0 shrink-0 space-y-3">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase text-[#dbdbda] block">
                      {r.status === 'completed' ? 'Final Price' : 'Base Rate'}
                    </span>
                    <span className="text-2xl font-display font-bold text-[#fefdfe]">
                      ${r.status === 'completed' ? r.finalAmount : r.basePrice}
                    </span>
                  </div>

                  {/* Actions for 'requested' */}
                  {r.status === 'requested' && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(r._id, 'accepted')}
                        className="px-3.5 py-1.5 bg-[#67e8f9] text-[#040404] font-semibold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center space-x-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleOpenRejectModal(r._id)}
                        className="px-3 py-1.5 border border-rose-800 bg-rose-950/40 text-rose-300 text-xs uppercase tracking-wider hover:bg-rose-900/60 transition-colors flex items-center space-x-1"
                      >
                        <XIcon className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}

                  {/* Actions for 'accepted' */}
                  {r.status === 'accepted' && (
                    <button
                      onClick={() => handleUpdateStatus(r._id, 'in-progress')}
                      className="px-4 py-2 bg-indigo-600 text-white font-semibold text-xs uppercase tracking-wider hover:bg-indigo-500 transition-colors flex items-center space-x-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Start Work</span>
                    </button>
                  )}

                  {/* Actions for 'in-progress' */}
                  {r.status === 'in-progress' && (
                    <button
                      onClick={() => handleOpenCompleteModal(r)}
                      className="px-4 py-2 bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-colors flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Completed</span>
                    </button>
                  )}

                  {/* Terminal state badges */}
                  {['completed', 'rejected', 'cancelled'].includes(r.status) && (
                    <span className="text-[11px] text-[#dbdbda]/70 uppercase">
                      Job {r.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mark Completed Modal to Enter Final Amount */}
        {completeModalOpen && bookingToComplete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
            <div className="bg-[#1b2932] border border-[#32414a] max-w-md w-full p-6 text-[#fefdfe] shadow-2xl relative">
              <button
                onClick={() => setCompleteModalOpen(false)}
                className="absolute top-4 right-4 text-[#dbdbda] hover:text-[#fefdfe]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-display font-semibold mb-1">
                Finalize Repair & Set Amount
              </h3>
              <p className="text-xs text-[#dbdbda] mb-4">
                Service: <strong>{bookingToComplete.serviceTitle}</strong>
              </p>

              <form onSubmit={handleConfirmComplete} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                    Final Billable Amount ($ USD) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={finalAmountInput}
                    onChange={(e) => setFinalAmountInput(Number(e.target.value))}
                    required
                    className="w-full bg-[#213039] border border-[#32414a] p-2.5 text-[#fefdfe] focus:border-[#67e8f9] text-sm"
                  />
                  <span className="text-[10px] text-[#dbdbda] mt-1 block">
                    Base price was ${bookingToComplete.basePrice}. Set final total including parts and labor.
                  </span>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCompleteModalOpen(false)}
                    className="px-4 py-2 border border-[#32414a] text-[#dbdbda]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
                  >
                    Confirm Completion
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reject Confirmation Modal */}
        <ConfirmationModal
          isOpen={rejectModalOpen}
          title="Reject Repair Request?"
          message="Are you sure you want to reject this request? The customer will be informed and the job will move to rejected status."
          confirmLabel="Yes, Reject Request"
          isDestructive={true}
          onConfirm={handleConfirmReject}
          onClose={() => setRejectModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
