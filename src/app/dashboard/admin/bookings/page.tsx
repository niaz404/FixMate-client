'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { fetchApi } from '@/lib/api';
import { FileText, Calendar } from 'lucide-react';

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
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-medium text-[#000000]">
            Global Platform Bookings
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Read-only platform inspection across all customer repair requests and technician assignments.
          </p>
        </div>

        
        <div className="flex flex-wrap items-center gap-2 p-3 glossy-card rounded-xl">
          <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mr-2">
            Status Filter:
          </span>
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-lg font-medium transition-colors ${
                selectedFilter === f
                  ? 'bg-[#1e3a8a] text-white shadow-xs'
                  : 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 glossy-card rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 glossy-card rounded-2xl text-center space-y-2">
            <FileText className="w-8 h-8 text-[#1e3a8a] mx-auto" />
            <p className="text-sm text-slate-600">No bookings found matching this status.</p>
          </div>
        ) : (
          <div className="glossy-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 border-b border-slate-200/80 text-[11px] uppercase text-slate-600 tracking-wider">
                  <tr>
                    <th className="p-4 font-semibold">Service</th>
                    <th className="p-4 font-semibold">Customer</th>
                    <th className="p-4 font-semibold">Technician</th>
                    <th className="p-4 font-semibold">Preferred Date</th>
                    <th className="p-4 font-semibold">Job Status</th>
                    <th className="p-4 font-semibold">Payment</th>
                    <th className="p-4 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {bookings.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-[#000000] text-sm">
                          {b.serviceTitle}
                        </div>
                        <div className="text-[11px] text-slate-500">{b.category}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-[#000000]">{b.customerName}</div>
                        <div className="text-[11px] text-slate-500">{b.customerEmail}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-[#000000]">{b.technicianName}</div>
                        <div className="text-[11px] text-slate-500">{b.technicianEmail}</div>
                      </td>
                      <td className="p-4 text-slate-600">
                        {new Date(b.preferredDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={b.status} type="job" />
                      </td>
                      <td className="p-4">
                        <StatusBadge status={b.paymentStatus} type="payment" />
                      </td>
                      <td className="p-4 text-right font-serif font-bold text-[#000000] text-sm">
                        ${b.finalAmount || b.basePrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
