'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { fetchApi } from '@/lib/api';
import { FileText, Calendar, Filter } from 'lucide-react';

interface GlobalBooking {
  _id: string;
  serviceTitle: string;
  category: string;
  customerName: string;
  customerEmail: string;
  technicianName: string;
  technicianEmail: string;
  preferredDate: string;
  status: string;
  paymentStatus: string;
  basePrice: number;
  finalAmount: number;
  createdAt: string;
}

const STATUS_FILTERS = [
  'All',
  'requested',
  'accepted',
  'in-progress',
  'completed',
  'rejected',
  'cancelled',
];

export default function AdminAllBookingsPage() {
  const [bookings, setBookings] = useState<GlobalBooking[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, [selectedFilter]);

  async function loadBookings() {
    setLoading(true);
    try {
      const query = selectedFilter !== 'All' ? `?status=${selectedFilter}` : '';
      const res = await fetchApi(`/admin/bookings${query}`);
      if (res.success && Array.isArray(res.data)) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin bookings', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6 font-mono text-xs">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Global Platform Bookings
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            Read-only platform inspection across all customer repair requests and technician assignments.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-[#213039] border border-[#32414a]">
          <span className="text-[10px] uppercase text-[#dbdbda] mr-2">Status Filter:</span>
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

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 bg-[#213039] border border-[#32414a] animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 border border-[#32414a] bg-[#213039] text-center space-y-2">
            <FileText className="w-8 h-8 text-[#67e8f9] mx-auto" />
            <p className="text-xs text-[#dbdbda]">No bookings found matching this status.</p>
          </div>
        ) : (
          <div className="border border-[#32414a] bg-[#213039] overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1b2932] border-b border-[#32414a] text-[10px] uppercase text-[#dbdbda] tracking-wider">
                <tr>
                  <th className="p-4">Service</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Technician</th>
                  <th className="p-4">Preferred Date</th>
                  <th className="p-4">Job Status</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#32414a] text-[#eaeae9]">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-[#1b2932]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-display font-semibold text-sm text-[#fefdfe]">
                        {b.serviceTitle}
                      </div>
                      <div className="text-[10px] text-[#dbdbda]">{b.category}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-[#fefdfe] font-semibold">{b.customerName}</div>
                      <div className="text-[10px] text-[#dbdbda]">{b.customerEmail}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-[#fefdfe] font-semibold">{b.technicianName}</div>
                      <div className="text-[10px] text-[#dbdbda]">{b.technicianEmail}</div>
                    </td>
                    <td className="p-4 text-[#dbdbda]">
                      {new Date(b.preferredDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={b.status} type="job" />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={b.paymentStatus} type="payment" />
                    </td>
                    <td className="p-4 text-right font-display font-bold text-[#fefdfe]">
                      ${b.finalAmount || b.basePrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
