'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';

const CATEGORIES = [
  'Smartphone',
  'Laptop & PC',
  'AC',
  'Refrigerator',
  'TV',
  'Washing Machine',
  'Electrical',
];

const PRESET_IMAGES: Record<string, string> = {
  Smartphone: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80',
  'Laptop & PC': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
  AC: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  Refrigerator: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
  TV: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
  'Washing Machine': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
  Electrical: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
};

export default function AddServicePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('2-3 hours');
  const [serviceMode, setServiceMode] = useState<'Home Visit' | 'Shop Drop-off'>('Home Visit');
  const [serviceArea, setServiceArea] = useState(user?.area || 'Dhaka City Wide');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[CATEGORIES[0]]);
  const [submitting, setSubmitting] = useState(false);

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    if (!imageUrl || Object.values(PRESET_IMAGES).includes(imageUrl)) {
      setImageUrl(PRESET_IMAGES[newCat] || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Service title is required.');
      return;
    }
    if (!description.trim()) {
      toast.error('Service description is required.');
      return;
    }
    const priceNum = Number(basePrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error('Please enter a valid positive base price.');
      return;
    }
    if (!imageUrl.trim()) {
      toast.error('Please provide a service image URL.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetchApi('/services', {
        method: 'POST',
        body: JSON.stringify({
          title: title.trim(),
          category,
          description: description.trim(),
          image: imageUrl.trim(),
          basePrice: priceNum,
          estimatedDuration: estimatedDuration.trim(),
          serviceMode,
          serviceArea: serviceArea.trim(),
        }),
      });

      if (res.success || res.result) {
        toast.success('Service submitted successfully! It is awaiting administrator review.');
        router.push('/dashboard/technician/my-services');
      } else {
        toast.error(res.message || 'Failed to submit service.');
      }
    } catch (err: any) {
      toast.error('An error occurred submitting the service.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout allowedRoles={['technician']}>
      <div className="max-w-2xl mx-auto space-y-6 text-xs">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-1">
            New Listing
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-[#000000]">
            List a New Repair Service
          </h1>
          <p className="text-xs text-[#383838] mt-1">
            New listings are submitted with &lsquo;pending&rsquo; status and appear publicly once verified by an admin.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/80 bg-white/90 p-6 md:p-8 space-y-5 shadow-sm"
        >
          {/* Read-Only Technician Info */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#bfc7d1]/40">
            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#383838] mb-1">
                Technician Name
              </label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className="w-full bg-[#dde6f0]/40 border border-[#bfc7d1] rounded-lg px-3 py-2 text-[#383838] cursor-not-allowed text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#383838] mb-1">
                Technician Email
              </label>
              <input
                type="text"
                value={user?.email || ''}
                disabled
                className="w-full bg-[#dde6f0]/40 border border-[#bfc7d1] rounded-lg px-3 py-2 text-[#383838] cursor-not-allowed truncate text-xs"
              />
            </div>
          </div>

          {/* Service Title */}
          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
              Service Title *
            </label>
            <input
              type="text"
              placeholder="e.g. iPhone 15 Pro OLED Screen Replacement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
            />
          </div>

          {/* Category & Mode Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">Category *</label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
                Service Mode *
              </label>
              <select
                value={serviceMode}
                onChange={(e) => setServiceMode(e.target.value as any)}
                className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              >
                <option value="Home Visit">Home Visit</option>
                <option value="Shop Drop-off">Shop Drop-off</option>
              </select>
            </div>
          </div>

          {/* Price, Duration, Area */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
                Base Price ($ USD) *
              </label>
              <input
                type="number"
                min="1"
                step="any"
                placeholder="e.g. 50"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                required
                className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
                Est. Duration
              </label>
              <input
                type="text"
                placeholder="e.g. 2-3 hours"
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
                Service Area *
              </label>
              <input
                type="text"
                placeholder="e.g. Dhanmondi, Dhaka"
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
                required
                className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
              Detailed Scope & Inclusions *
            </label>
            <textarea
              rows={4}
              placeholder="Explain repair steps, part specifications, diagnostic guarantees, and testing protocols..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full bg-white border border-[#bfc7d1] rounded-lg p-3 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
            />
          </div>

          {/* Service Banner Image URL */}
          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
              Service Banner Image URL *
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden mb-2"
            />
            {imageUrl && (
              <div className="relative h-36 max-w-sm rounded-xl overflow-hidden border border-[#bfc7d1]/50 shadow-xs">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Submission Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-lg glossy-btn-primary text-xs font-semibold tracking-wide disabled:opacity-50"
            >
              {submitting ? 'Submitting Service...' : 'Submit Service for Review'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
