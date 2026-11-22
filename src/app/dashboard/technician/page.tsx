'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/ui/StatsCard';
import { fetchApi } from '@/lib/api';
import { Wrench, CheckCircle2, Clock, PlusCircle, ArrowRight } from 'lucide-react';

export function TechnicianDashboardPage() {
  const [stats, setStats] = useState({
    myServices: 0,
    approvedServices: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTechnicianOverview() {
      try {
        const [servicesRes, bookingsRes] = await Promise.all([
          fetchApi('/services/technician/my'),
          fetchApi('/bookings/technician'),
        ]);

        const services = Array.isArray(servicesRes.data) ? servicesRes.data : [];
        const bookings = Array.isArray(bookingsRes.data) ? bookingsRes.data : [];

        const approved = services.filter((s) => s.approvalStatus === 'approved').length;
        const pending = bookings.filter((b) => b.status === 'requested').length;

        setStats({
          myServices: services.length,
          approvedServices: approved,
          pendingRequests: pending,
        });
      } catch (err) {
        console.warn('Failed to load technician overview', err);
      } finally {
        setLoading(false);
      }
    }
    loadTechnicianOverview();
  }, []);

  return (
    <DashboardLayout allowedRoles={['technician']}>
      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-1">
            Technician Studio
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-[#000000]">
            Technician Dashboard & Job Pipeline
          </h1>
          <p className="text-xs text-[#383838] mt-1">
            Manage your repair service catalog, accept client bookings, and progress job milestones.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Catalog Services"
            value={loading ? '...' : stats.myServices}
            subtitle="Listed by your profile"
            icon={<Wrench className="w-5 h-5 text-[#1e3a8a]" />}
          />
          <StatsCard
            title="Approved Services"
            value={loading ? '...' : stats.approvedServices}
            subtitle="Live & visible in public catalog"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          />
          <StatsCard
            title="Pending Requests"
            value={loading ? '...' : stats.pendingRequests}
            subtitle="Awaiting your acceptance"
            icon={<Clock className="w-5 h-5 text-amber-600" />}
          />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/80 bg-white/90 p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-base text-[#000000]">
                  List a New Repair Service
                </h3>
                <p className="text-xs text-[#383838]">
                  Expand your catalog with high-quality photos, duration, and transparent pricing.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/technician/add-service"
              className="glossy-btn-primary inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold"
            >
              <span>Add Service Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/90 p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-base text-[#000000]">
                  Incoming Customer Requests
                </h3>
                <p className="text-xs text-[#383838]">
                  Review client problem descriptions, accept incoming bookings, and start repair tasks.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/technician/requests"
              className="glossy-btn-secondary inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold"
            >
              <span>Manage Requests ({stats.pendingRequests} New)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1e3a8a]" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TechnicianDashboardPage;
