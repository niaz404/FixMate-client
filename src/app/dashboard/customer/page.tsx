'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/ui/StatsCard';
import { fetchApi } from '@/lib/api';
import { CalendarCheck, Clock, CheckCircle2, ArrowRight, Wrench } from 'lucide-react';

export default function CustomerOverviewPage() {
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeJobs: 0,
    completedJobs: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomerData() {
      try {
        const res = await fetchApi('/bookings/my');
        if (res.success && Array.isArray(res.data)) {
          const bookings = res.data;
          const totalRequests = bookings.length;
          const activeJobs = bookings.filter((b) =>
            ['requested', 'accepted', 'in-progress'].includes(b.status)
          ).length;
          const completedJobs = bookings.filter((b) => b.status === 'completed').length;

          setStats({ totalRequests, activeJobs, completedJobs });
          setRecentBookings(bookings.slice(0, 3));
        }
      } catch (err) {
        console.error('Error loading customer dashboard', err);
      } finally {
        setLoading(false);
      }
    }

    loadCustomerData();
  }, []);

  return (
    <DashboardLayout allowedRoles={['customer']}>
      <div className="space-y-8 font-mono">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Customer Overview
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            Monitor active appliance repairs, track technician progress, and view billing history.
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatsCard
            title="Total Requests"
            value={loading ? '...' : stats.totalRequests}
            subtitle="All lifetime submitted requests"
            icon={<CalendarCheck className="w-5 h-5" />}
          />
          <StatsCard
            title="Active Jobs"
            value={loading ? '...' : stats.activeJobs}
            subtitle="Requested, Accepted, or In Progress"
            icon={<Clock className="w-5 h-5 text-amber-400" />}
          />
          <StatsCard
            title="Completed Jobs"
            value={loading ? '...' : stats.completedJobs}
            subtitle="Finished & verified repairs"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          />
        </div>

        {/* Quick CTA Box */}
        <div className="bg-[#213039] border border-[#32414a] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-semibold text-base text-[#fefdfe]">
              Need another gadget or appliance serviced?
            </h3>
            <p className="text-xs text-[#dbdbda]">
              Find verified local specialists across all 7 home repair categories.
            </p>
          </div>
          <Link
            href="/services"
            className="px-5 py-2.5 bg-[#f1f3f4] text-[#040404] text-xs uppercase tracking-wider font-semibold hover:bg-[#67e8f9] transition-colors"
          >
            Browse Services
          </Link>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-display font-semibold uppercase tracking-wider text-[#fefdfe]">
              Recent Repair Bookings
            </h3>
            <Link
              href="/dashboard/customer/bookings"
              className="text-xs text-[#67e8f9] hover:underline inline-flex items-center space-x-1"
            >
              <span>View All Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="h-40 bg-[#213039] border border-[#32414a] animate-pulse" />
          ) : recentBookings.length === 0 ? (
            <div className="p-8 border border-[#32414a] bg-[#213039] text-center space-y-2">
              <Wrench className="w-8 h-8 text-[#67e8f9] mx-auto" />
              <p className="text-xs text-[#dbdbda]">You haven&apos;t booked any repairs yet.</p>
            </div>
          ) : (
            <div className="border border-[#32414a] bg-[#213039] divide-y divide-[#32414a]">
              {recentBookings.map((b) => (
                <div key={b._id} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-display font-semibold text-[#fefdfe]">
                      {b.serviceTitle}
                    </div>
                    <div className="text-[11px] text-[#dbdbda] mt-0.5">
                      Technician: {b.technicianName} &bull; Preferred Date:{' '}
                      {new Date(b.preferredDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="uppercase text-[10px] tracking-wider px-2 py-0.5 bg-[#1b2932] border border-[#32414a] text-[#67e8f9]">
                      {b.status}
                    </span>
                    <div className="text-[#fefdfe] font-bold mt-1">
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
