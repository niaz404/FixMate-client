'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/ui/StatsCard';
import { fetchApi } from '@/lib/api';
import { CalendarCheck, CreditCard, CheckCircle2, ArrowRight, Wrench } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function CustomerDashboardPage() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    completedJobs: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomerOverview() {
      try {
        const res = await fetchApi('/bookings/my');
        if (res.success && Array.isArray(res.data)) {
          const bookings = res.data;
          const active = bookings.filter((b) =>
            ['requested', 'accepted', 'in-progress'].includes(b.status)
          ).length;
          const completed = bookings.filter((b) => b.status === 'completed').length;

          setStats({
            totalBookings: bookings.length,
            activeBookings: active,
            completedJobs: completed,
          });

          setRecentBookings(bookings.slice(0, 5));
        }
      } catch (err) {
        console.warn('Failed to load customer overview', err);
      } finally {
        setLoading(false);
      }
    }
    loadCustomerOverview();
  }, []);

  return (
    <DashboardLayout allowedRoles={['customer']}>
      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-1">
            Customer Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-[#000000]">
            Overview & Booking Summary
          </h1>
          <p className="text-xs text-[#383838] mt-1">
            Monitor real-time progress of your active device repair requests.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Bookings"
            value={loading ? '...' : stats.totalBookings}
            subtitle="Lifetime repair requests"
            icon={<CalendarCheck className="w-5 h-5 text-[#1e3a8a]" />}
          />
          <StatsCard
            title="Active In-Pipeline"
            value={loading ? '...' : stats.activeBookings}
            subtitle="Requested, accepted, or in progress"
            icon={<Wrench className="w-5 h-5 text-amber-600" />}
          />
          <StatsCard
            title="Completed Jobs"
            value={loading ? '...' : stats.completedJobs}
            subtitle="Finished & verified repairs"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          />
        </div>

        
        <div className="rounded-2xl border border-white/80 bg-white/90 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif font-semibold text-base text-[#000000]">
              Need another device or appliance serviced?
            </h3>
            <p className="text-xs text-[#383838]">
              Find verified local specialists across all home repair categories.
            </p>
          </div>
          <Link
            href="/services"
            className="glossy-btn-primary px-5 py-2.5 rounded-lg text-xs font-semibold shrink-0"
          >
            Browse Services
          </Link>
        </div>

        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#000000]">
              Recent Repair Bookings
            </h3>
            <Link
              href="/dashboard/customer/bookings"
              className="text-xs text-[#1e3a8a] font-medium hover:underline inline-flex items-center space-x-1"
            >
              <span>View All Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="h-40 rounded-xl bg-white/60 border border-[#bfc7d1]/40 animate-pulse" />
          ) : recentBookings.length === 0 ? (
            <div className="p-8 rounded-xl border border-white/80 bg-white/80 text-center space-y-2 shadow-xs">
              <Wrench className="w-8 h-8 text-[#1e3a8a] mx-auto" />
              <p className="text-xs text-[#383838]">You haven&apos;t booked any repairs yet.</p>
            </div>
          ) : (
            <div className="rounded-xl border border-white/80 bg-white/90 divide-y divide-[#bfc7d1]/30 overflow-hidden shadow-xs">
              {recentBookings.map((b) => (
                <div key={b._id} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-serif font-semibold text-[#000000]">
                      {b.serviceTitle}
                    </div>
                    <div className="text-[11px] text-[#383838] mt-0.5">
                      Technician: {b.technicianName} &bull; Date:{' '}
                      {new Date(b.preferredDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-3">
                    <StatusBadge status={b.status} />
                    <div className="text-[#000000] font-serif font-bold text-sm">
                      ${b.finalAmount || b.basePrice}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
