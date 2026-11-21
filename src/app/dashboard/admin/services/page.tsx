'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';
import { Check, X as XIcon, ShieldCheck, Wrench, Eye } from 'lucide-react';

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
      <div className="space-y-6 font-mono text-xs">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Service Approval Moderation
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            Review technician offerings, inspect scope of work, and grant approval for public listing.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-[#213039] border border-[#32414a]">
          <span className="text-[10px] uppercase text-[#dbdbda] mr-2">Filter By Status:</span>
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
        ) : services.length === 0 ? (
          <div className="p-12 border border-[#32414a] bg-[#213039] text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#67e8f9] mx-auto" />
            <p className="text-xs text-[#dbdbda]">No service listings match this filter criteria.</p>
          </div>
        ) : (
          <div className="border border-[#32414a] bg-[#213039] overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1b2932] border-b border-[#32414a] text-[10px] uppercase text-[#dbdbda] tracking-wider">
                <tr>
                  <th className="p-4">Service & Photo</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Technician</th>
                  <th className="p-4">Base Rate</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#32414a] text-[#eaeae9]">
                {services.map((s) => (
                  <tr key={s._id} className="hover:bg-[#1b2932]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-start space-x-3 max-w-md">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-14 h-14 object-cover border border-[#32414a] shrink-0"
                        />
                        <div>
                          <div className="font-display font-semibold text-sm text-[#fefdfe]">
                            {s.title}
                          </div>
                          <div className="text-[10px] text-[#dbdbda] line-clamp-1 mt-0.5">
                            {s.description}
                          </div>
                          <div className="text-[9px] text-[#67e8f9] mt-0.5">
                            Mode: {s.serviceMode} &bull; Area: {s.serviceArea}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[#dbdbda]">{s.category}</td>
                    <td className="p-4">
                      <div className="text-[#fefdfe] font-semibold">{s.technicianName}</div>
                      <div className="text-[10px] text-[#dbdbda] truncate max-w-[140px]">
                        {s.technicianEmail}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-[#fefdfe]">${s.basePrice}</td>
                    <td className="p-4">
                      <StatusBadge status={s.approvalStatus} type="approval" />
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleApprovalAction(s._id, 'approved')}
                        disabled={s.approvalStatus === 'approved'}
                        className="px-3 py-1.5 bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider hover:bg-emerald-500 disabled:opacity-40"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApprovalAction(s._id, 'rejected')}
                        disabled={s.approvalStatus === 'rejected'}
                        className="px-3 py-1.5 border border-rose-800 bg-rose-950/40 text-rose-300 text-xs uppercase tracking-wider hover:bg-rose-900/60 disabled:opacity-40"
                      >
                        Reject
                      </button>
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
