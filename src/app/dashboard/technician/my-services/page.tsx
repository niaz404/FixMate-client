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

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Delete Modal State
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
        toast.success('Service updated and reset to pending for admin re-approval.');
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
      <div className="space-y-6 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
              My Service Catalog
            </h1>
            <p className="text-xs text-[#dbdbda] mt-1">
              Full CRUD management: edit details, toggle public visibility, or remove listings.
            </p>
          </div>
          <Link
            href="/dashboard/technician/add-service"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#f1f3f4] text-[#040404] text-xs uppercase tracking-wider font-semibold hover:bg-[#67e8f9] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-[#213039] border border-[#32414a] animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="p-12 border border-[#32414a] bg-[#213039] text-center space-y-4">
            <Wrench className="w-10 h-10 text-[#67e8f9] mx-auto" />
            <h3 className="font-display font-semibold text-lg text-[#fefdfe]">
              You haven&apos;t listed any services yet.
            </h3>
            <p className="text-xs text-[#dbdbda] max-w-sm mx-auto">
              Add your smartphone, AC, TV, or home appliance repair offerings to begin receiving requests.
            </p>
            <Link
              href="/dashboard/technician/add-service"
              className="inline-block px-5 py-2.5 bg-[#f1f3f4] text-[#040404] text-xs uppercase tracking-wider font-semibold hover:bg-[#67e8f9]"
            >
              Add First Service
            </Link>
          </div>
        ) : (
          <div className="border border-[#32414a] bg-[#213039] overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1b2932] border-b border-[#32414a] text-[10px] uppercase text-[#dbdbda] tracking-wider">
                <tr>
                  <th className="p-4">Service</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Base Price</th>
                  <th className="p-4">Approval Status</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#32414a] text-[#eaeae9]">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-[#1b2932]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-12 h-12 object-cover border border-[#32414a] shrink-0"
                        />
                        <div>
                          <div className="font-display font-semibold text-sm text-[#fefdfe]">
                            {service.title}
                          </div>
                          <div className="text-[10px] text-[#dbdbda]">
                            {service.serviceMode} &bull; {service.serviceArea}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[#dbdbda]">{service.category}</td>
                    <td className="p-4 font-bold text-[#fefdfe]">${service.basePrice}</td>
                    <td className="p-4">
                      <StatusBadge status={service.approvalStatus} type="approval" />
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleAvailability(service._id)}
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider border ${
                          service.isAvailable
                            ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                            : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                        }`}
                      >
                        <Power className="w-3 h-3" />
                        <span>{service.isAvailable ? 'Available' : 'Paused'}</span>
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(service)}
                        className="p-1.5 border border-[#32414a] text-[#67e8f9] hover:bg-[#02444b]"
                        aria-label="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(service._id)}
                        className="p-1.5 border border-[#32414a] text-rose-400 hover:bg-rose-950/40"
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
        )}

        {/* Edit Pre-filled Modal */}
        {editModalOpen && editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
            <div className="bg-[#1b2932] border border-[#32414a] max-w-lg w-full p-6 text-[#fefdfe] shadow-2xl relative">
              <button
                onClick={() => setEditModalOpen(false)}
                className="absolute top-4 right-4 text-[#dbdbda] hover:text-[#fefdfe]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-display font-semibold mb-1">Edit Service</h3>
              <p className="text-[11px] text-amber-300 mb-4">
                Note: Updating details will revert approvalStatus back to &lsquo;pending&rsquo; for admin verification.
              </p>

              <form onSubmit={handleSaveEdit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">Title</label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({ ...editingService, title: e.target.value })
                    }
                    required
                    className="w-full bg-[#213039] border border-[#32414a] p-2 text-[#fefdfe]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
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
                      className="w-full bg-[#213039] border border-[#32414a] p-2 text-[#fefdfe]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
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
                      className="w-full bg-[#213039] border border-[#32414a] p-2 text-[#fefdfe]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                    Service Area
                  </label>
                  <input
                    type="text"
                    value={editingService.serviceArea}
                    onChange={(e) =>
                      setEditingService({ ...editingService, serviceArea: e.target.value })
                    }
                    required
                    className="w-full bg-[#213039] border border-[#32414a] p-2 text-[#fefdfe]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingService.description}
                    onChange={(e) =>
                      setEditingService({ ...editingService, description: e.target.value })
                    }
                    required
                    className="w-full bg-[#213039] border border-[#32414a] p-2 text-[#fefdfe]"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 border border-[#32414a] text-[#dbdbda]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#f1f3f4] text-[#040404] font-semibold hover:bg-[#67e8f9]"
                  >
                    Save & Re-submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
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
