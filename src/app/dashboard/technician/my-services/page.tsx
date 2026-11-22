'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';
import { Edit2, Trash2, Power, Plus, Wrench, X } from 'lucide-react';

interface ServiceItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: string;
  serviceArea: string;
  approvalStatus: string;
  isAvailable: boolean;
}

export default function MyServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    try {
      const res = await fetchApi('/services/technician/my');
      if (res.success && Array.isArray(res.data)) {
        setServices(res.data);
      }
    } catch (err) {
      console.error('Error loading technician services', err);
    } finally {
      setLoading(false);
    }
  }

  const handleToggleAvailability = async (id: string) => {
    try {
      const res = await fetchApi(`/services/${id}/toggle-availability`, {
        method: 'PATCH',
      });
      if (res.success) {
        toast.success(res.message || 'Availability updated.');
        loadServices();
      } else {
        toast.error(res.message || 'Failed to update availability.');
      }
    } catch (err: any) {
      toast.error('Error toggling availability.');
    }
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const res = await fetchApi(`/services/${editingService._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: editingService.title,
          category: editingService.category,
          description: editingService.description,
          basePrice: editingService.basePrice,
          estimatedDuration: editingService.estimatedDuration,
          serviceMode: editingService.serviceMode,
          serviceArea: editingService.serviceArea,
        }),
      });

      if (res.success) {
        toast.success('Service updated and submitted for re-approval.');
        setEditModalOpen(false);
        loadServices();
      } else {
        toast.error(res.message || 'Failed to update service.');
      }
    } catch (err: any) {
      toast.error('Error saving edits.');
    }
  };

  const handleOpenDelete = (id: string) => {
    setServiceToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;
    try {
      const res = await fetchApi(`/services/${serviceToDelete}`, {
        method: 'DELETE',
      });
      if (res.success) {
        toast.success('Service listing deleted.');
        loadServices();
      } else {
        toast.error(res.message || 'Failed to delete service.');
      }
    } catch (err: any) {
      toast.error('Error deleting service.');
    }
  };

  return (
    <DashboardLayout allowedRoles={['technician']}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-medium text-[#000000]">
              My Service Catalog
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Full CRUD management: edit details, toggle public visibility, or remove listings.
            </p>
          </div>

          <Link
            href="/dashboard/technician/add-service"
            className="inline-flex items-center space-x-2 px-4 py-2.5 glossy-btn-primary rounded-xl text-xs uppercase tracking-wider font-semibold shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 glossy-card rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="p-12 glossy-card rounded-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[#1e3a8a] flex items-center justify-center mx-auto">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#000000]">
              You haven&apos;t listed any services yet
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Add your smartphone, AC, TV, or home appliance repair offerings to begin receiving requests.
            </p>
            <Link
              href="/dashboard/technician/add-service"
              className="inline-block px-5 py-2.5 glossy-btn-primary rounded-xl text-xs uppercase tracking-wider font-semibold"
            >
              Add First Service
            </Link>
          </div>
        ) : (
          <div className="glossy-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 border-b border-slate-200/80 text-[11px] uppercase text-slate-600 tracking-wider">
                  <tr>
                    <th className="p-4 font-semibold">Service</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Base Price</th>
                    <th className="p-4 font-semibold">Approval Status</th>
                    <th className="p-4 font-semibold">Visibility</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {services.map((service) => (
                    <tr key={service._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0 shadow-xs"
                          />
                          <div>
                            <div className="font-medium text-[#000000] text-sm">
                              {service.title}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {service.serviceMode} &bull; {service.serviceArea}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">{service.category}</td>
                      <td className="p-4 font-serif font-bold text-[#000000] text-sm">
                        ${service.basePrice}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={service.approvalStatus} type="approval" />
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleAvailability(service._id)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-md text-[11px] uppercase tracking-wider font-medium border transition-colors ${
                            service.isAvailable
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-slate-100 border-slate-200 text-slate-500'
                          }`}
                        >
                          <Power className="w-3 h-3" />
                          <span>{service.isAvailable ? 'Available' : 'Paused'}</span>
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(service)}
                          className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                          aria-label="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(service._id)}
                          className="p-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                          aria-label="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        
        {editModalOpen && editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <div className="glossy-card max-w-lg w-full p-6 text-slate-800 rounded-2xl shadow-2xl relative">
              <button
                onClick={() => setEditModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-serif font-medium text-[#000000] mb-1">
                Edit Service
              </h3>
              <p className="text-xs text-amber-700 mb-4 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                Note: Updating details will revert approvalStatus back to &lsquo;pending&rsquo; for admin verification.
              </p>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({ ...editingService, title: e.target.value })
                    }
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1e3a8a]/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
                      Base Price ($)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={editingService.basePrice}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          basePrice: Number(e.target.value),
                        })
                      }
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1e3a8a]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={editingService.estimatedDuration}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          estimatedDuration: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1e3a8a]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
                    Service Area
                  </label>
                  <input
                    type="text"
                    value={editingService.serviceArea}
                    onChange={(e) =>
                      setEditingService({ ...editingService, serviceArea: e.target.value })
                    }
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1e3a8a]/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingService.description}
                    onChange={(e) =>
                      setEditingService({ ...editingService, description: e.target.value })
                    }
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1e3a8a]/20"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 glossy-btn-primary rounded-xl font-semibold"
                  >
                    Save & Re-submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        
        <ConfirmationModal
          isOpen={deleteModalOpen}
          title="Delete Service Listing?"
          message="Are you sure you want to permanently delete this repair service? This cannot be undone."
          confirmLabel="Yes, Delete"
          isDestructive={true}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleteModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
