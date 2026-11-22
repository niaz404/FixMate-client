'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';
import { Check, X as XIcon, ShieldCheck } from 'lucide-react';

interface AdminServiceItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  basePrice: number;
  serviceMode: string;
  serviceArea: string;
  technicianName: string;
  technicianEmail: string;
  approvalStatus: string;
  isAvailable: boolean;
  createdAt: string;
}

const STATUS_FILTERS = ['all', 'pending', 'approved', 'rejected'];

export default function AdminServicesPage() {
  const [services, setServices] = useState<AdminServiceItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, [selectedFilter]);

  async function loadServices() {
    setLoading(true);
    try {
      const query = selectedFilter !== 'all' ? `?status=${selectedFilter}` : '';
      const res = await fetchApi(`/admin/services${query}`);
      if (res.success && Array.isArray(res.data)) {
        setServices(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin services', err);
    } finally {
      setLoading(false);
    }
  }

  const handleApprovalAction = async (serviceId: string, approvalStatus: 'approved' | 'rejected') => {
    try {
      const res = await fetchApi(`/admin/services/${serviceId}/approval`, {
        method: 'PATCH',
        body: JSON.stringify({ approvalStatus }),
      });

      if (res.success) {
        toast.success(res.message || `Service marked as ${approvalStatus}.`);
        loadServices();
      } else {
        toast.error(res.message || 'Action failed.');
      }
    } catch (err: any) {
      toast.error('Error updating approval status.');
    }
  };

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-medium text-[#000000]">
            Service Approval Moderation
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Review technician offerings, inspect scope of work, and grant approval for public listing.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 p-3 glossy-card rounded-xl">
          <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mr-2">
            Filter By Status:
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
        ) : services.length === 0 ? (
          <div className="p-12 glossy-card rounded-2xl text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#1e3a8a] mx-auto" />
            <p className="text-sm text-slate-600">No service listings match this filter criteria.</p>
          </div>
        ) : (
          <div className="glossy-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 border-b border-slate-200/80 text-[11px] uppercase text-slate-600 tracking-wider">
                  <tr>
                    <th className="p-4 font-semibold">Service & Photo</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Technician</th>
                    <th className="p-4 font-semibold">Base Rate</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Moderation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {services.map((s) => (
                    <tr key={s._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-start space-x-3 max-w-md">
                          <img
                            src={s.image}
                            alt={s.title}
                            className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0 shadow-xs"
                          />
                          <div>
                            <div className="font-medium text-[#000000] text-sm">
                              {s.title}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {s.description}
                            </div>
                            <div className="text-[11px] text-[#1e3a8a] mt-0.5">
                              Mode: {s.serviceMode} &bull; Area: {s.serviceArea}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">{s.category}</td>
                      <td className="p-4">
                        <div className="font-medium text-[#000000]">{s.technicianName}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[140px]">
                          {s.technicianEmail}
                        </div>
                      </td>
                      <td className="p-4 font-serif font-bold text-[#000000] text-sm">${s.basePrice}</td>
                      <td className="p-4">
                        <StatusBadge status={s.approvalStatus} type="approval" />
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleApprovalAction(s._id, 'approved')}
                          disabled={s.approvalStatus === 'approved'}
                          className="px-3 py-1.5 bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-emerald-700 disabled:opacity-40 transition-colors shadow-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApprovalAction(s._id, 'rejected')}
                          disabled={s.approvalStatus === 'rejected'}
                          className="px-3 py-1.5 border border-rose-200 bg-rose-50 text-rose-700 text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-rose-100 disabled:opacity-40 transition-colors"
                        >
                          Reject
                        </button>
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
