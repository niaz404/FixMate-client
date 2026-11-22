'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/ui/StatsCard';
import { fetchApi } from '@/lib/api';
import { Users, ShieldCheck, DollarSign, ArrowRight, UserCheck } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTechnicians: 0,
    pendingServices: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminStats() {
      try {
        const res = await fetchApi('/admin/stats');
        if (res.success) {
          setStats({
            totalUsers: res.totalUsers || 0,
            totalTechnicians: res.totalTechnicians || 0,
            pendingServices: res.pendingServices || 0,
            totalRevenue: res.totalRevenue || 0,
          });
        }
      } catch (err) {
        console.warn('Failed to load admin stats', err);
      } finally {
        setLoading(false);
      }
    }
    loadAdminStats();
  }, []);

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-1">
            System Administration
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-[#000000]">
            Executive Platform Overview
          </h1>
          <p className="text-xs text-[#383838] mt-1">
            Oversee platform metrics, technician approvals, user management, and Stripe transactions.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value={loading ? '...' : stats.totalUsers}
            subtitle="Registered accounts"
            icon={<Users className="w-5 h-5 text-[#1e3a8a]" />}
          />
          <StatsCard
            title="Technicians"
            value={loading ? '...' : stats.totalTechnicians}
            subtitle="Hardware specialists"
            icon={<UserCheck className="w-5 h-5 text-indigo-600" />}
          />
          <StatsCard
            title="Pending Approvals"
            value={loading ? '...' : stats.pendingServices}
            subtitle="Awaiting admin review"
            icon={<ShieldCheck className="w-5 h-5 text-amber-600" />}
          />
          <StatsCard
            title="Total Stripe Revenue"
            value={loading ? '...' : `$${stats.totalRevenue.toLocaleString()}`}
            subtitle="Completed job transactions"
            icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          />
        </div>

        {/* Action Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/80 bg-white/90 p-6 space-y-3 shadow-sm">
            <h3 className="font-serif font-semibold text-base text-[#000000]">
              Moderate Listings ({stats.pendingServices} Pending)
            </h3>
            <p className="text-xs text-[#383838] leading-relaxed">
              Review technician submissions, evaluate service photos, and approve or reject listings.
            </p>
            <Link
              href="/dashboard/admin/services"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1e3a8a] hover:underline pt-1"
            >
              <span>Review Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/90 p-6 space-y-3 shadow-sm">
            <h3 className="font-serif font-semibold text-base text-[#000000]">
              Manage User Roles
            </h3>
            <p className="text-xs text-[#383838] leading-relaxed">
              Assign or revoke technician and admin privileges across registered platform users.
            </p>
            <Link
              href="/dashboard/admin/users"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1e3a8a] hover:underline pt-1"
            >
              <span>Manage Users</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/90 p-6 space-y-3 shadow-sm">
            <h3 className="font-serif font-semibold text-base text-[#000000]">
              Audit All Transactions
            </h3>
            <p className="text-xs text-[#383838] leading-relaxed">
              Inspect Stripe Checkout sessions, verify payments, and reconcile platform payouts.
            </p>
            <Link
              href="/dashboard/admin/transactions"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1e3a8a] hover:underline pt-1"
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
