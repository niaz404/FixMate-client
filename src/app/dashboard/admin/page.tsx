'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/ui/StatsCard';
import { fetchApi } from '@/lib/api';
import { Users, Wrench, ShieldAlert, DollarSign, ArrowRight } from 'lucide-react';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTechnicians: 0,
    pendingServices: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminStats() {
      try {
        const res = await fetchApi('/admin/stats');
        if (res.success && res.stats) {
          setStats(res.stats);
        }
      } catch (err) {
        console.error('Error loading admin stats', err);
      } finally {
        setLoading(false);
      }
    }

    loadAdminStats();
  }, []);

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-8 font-mono">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Administrator Operations
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            Global oversight across registered users, pending technician listings, and Stripe transaction volumes.
          </p>
        </div>

        {/* Stats Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value={loading ? '...' : stats.totalUsers}
            subtitle="Registered platform accounts"
            icon={<Users className="w-5 h-5 text-[#67e8f9]" />}
          />
          <StatsCard
            title="Total Technicians"
            value={loading ? '...' : stats.totalTechnicians}
            subtitle="Active verified specialists"
            icon={<Wrench className="w-5 h-5 text-indigo-400" />}
          />
          <StatsCard
            title="Pending Services"
            value={loading ? '...' : stats.pendingServices}
            subtitle="Awaiting admin approval"
            icon={<ShieldAlert className="w-5 h-5 text-amber-400" />}
          />
          <StatsCard
            title="Total Stripe Revenue"
            value={loading ? '...' : `$${stats.totalRevenue.toLocaleString()}`}
            subtitle="Completed job transactions"
            icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
          />
        </div>

        {/* Action Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#213039] border border-[#32414a] p-6 space-y-3">
            <h3 className="font-display font-semibold text-base text-[#fefdfe]">
              Moderate Listings ({stats.pendingServices} Pending)
            </h3>
            <p className="text-xs text-[#dbdbda]">
              Review technician submissions, evaluate service photos, and approve or reject listings.
            </p>
            <Link
              href="/dashboard/admin/services"
              className="inline-flex items-center space-x-1.5 text-xs text-[#67e8f9] hover:underline pt-2"
            >
              <span>Review Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#213039] border border-[#32414a] p-6 space-y-3">
            <h3 className="font-display font-semibold text-base text-[#fefdfe]">
              Manage User Roles
            </h3>
            <p className="text-xs text-[#dbdbda]">
              Assign or revoke technician and admin privileges across registered platform users.
            </p>
            <Link
              href="/dashboard/admin/users"
              className="inline-flex items-center space-x-1.5 text-xs text-[#67e8f9] hover:underline pt-2"
            >
              <span>Manage Users</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#213039] border border-[#32414a] p-6 space-y-3">
            <h3 className="font-display font-semibold text-base text-[#fefdfe]">
              Audit All Transactions
            </h3>
            <p className="text-xs text-[#dbdbda]">
              Inspect Stripe Checkout sessions, verify payments, and reconcile payouts.
            </p>
            <Link
              href="/dashboard/admin/transactions"
              className="inline-flex items-center space-x-1.5 text-xs text-[#67e8f9] hover:underline pt-2"
            >
              <span>View Transactions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
