'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/ui/StatsCard';
import { fetchApi } from '@/lib/api';
import { Wrench, CheckCircle2, Clock, PlusCircle, ArrowRight } from 'lucide-react';

export default function TechnicianOverviewPage() {
  const [stats, setStats] = useState({
    totalServices: 0,
    approvedServices: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTechnicianData() {
      try {
        const [servicesRes, requestsRes] = await Promise.all([
          fetchApi('/services/technician/my'),
          fetchApi('/bookings/technician'),
        ]);

        let totalServices = 0;
        let approvedServices = 0;
        let pendingRequests = 0;

        if (servicesRes.success && Array.isArray(servicesRes.data)) {
          totalServices = servicesRes.data.length;
          approvedServices = servicesRes.data.filter((s) => s.approvalStatus === 'approved').length;
        }

        if (requestsRes.success && Array.isArray(requestsRes.data)) {
          pendingRequests = requestsRes.data.filter((r) => r.status === 'requested').length;
        }

        setStats({ totalServices, approvedServices, pendingRequests });
      } catch (err) {
        console.error('Error loading technician metrics', err);
      } finally {
        setLoading(false);
      }
    }

    loadTechnicianData();
  }, []);

  return (
    <DashboardLayout allowedRoles={['technician']}>
      <div className="space-y-8 font-mono">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Technician Command Center
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            Manage your listed repair services, respond to incoming customer jobs, and track pipeline completions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatsCard
            title="Total Services"
            value={loading ? '...' : stats.totalServices}
            subtitle="All offerings created by you"
            icon={<Wrench className="w-5 h-5 text-[#67e8f9]" />}
          />
          <StatsCard
            title="Approved Services"
            value={loading ? '...' : stats.approvedServices}
            subtitle="Live & visible in public catalog"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          />
          <StatsCard
            title="Pending Requests"
            value={loading ? '...' : stats.pendingRequests}
            subtitle="Awaiting your acceptance"
            icon={<Clock className="w-5 h-5 text-amber-400" />}
          />
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#213039] border border-[#32414a] p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-[#02444b] border border-[#32414a] text-[#67e8f9]">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-base text-[#fefdfe]">
                  List a New Repair Service
                </h3>
                <p className="text-xs text-[#dbdbda]">
                  Expand your catalog with high-quality photos, duration, and transparent pricing.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/technician/add-service"
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#f1f3f4] text-[#040404] text-xs uppercase tracking-wider font-semibold hover:bg-[#67e8f9] transition-colors"
            >
              <span>Add Service Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-[#213039] border border-[#32414a] p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-[#02444b] border border-[#32414a] text-[#67e8f9]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-base text-[#fefdfe]">
                  Incoming Customer Requests
                </h3>
                <p className="text-xs text-[#dbdbda]">
                  Review client problem descriptions, accept incoming bookings, and start repair tasks.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/technician/requests"
              className="inline-flex items-center space-x-2 px-4 py-2.5 border border-[#32414a] bg-[#1b2932] text-[#fefdfe] text-xs uppercase tracking-wider font-semibold hover:bg-[#02444b] transition-colors"
            >
              <span>Manage Requests ({stats.pendingRequests} New)</span>
              <ArrowRight className="w-4 h-4 text-[#67e8f9]" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
