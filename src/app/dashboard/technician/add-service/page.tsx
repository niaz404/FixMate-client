'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { fetchApi, uploadImageToImgBB } from '@/lib/api';
import { toast } from 'sonner';
import { Upload, Wrench, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
  'Smartphone',
  'Laptop & PC',
  'AC',
  'Refrigerator',
  'TV',
  'Washing Machine',
  'Electrical',
];

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

  // Image Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
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
    if (!imageFile && !imagePreview) {
      toast.error('Please upload a service banner image via the file selector.');
      return;
    }

    setSubmitting(true);
    let finalImageUrl = imagePreview;

    try {
      if (imageFile) {
        setUploadingImage(true);
        finalImageUrl = await uploadImageToImgBB(imageFile);
        setUploadingImage(false);
      }

      const res = await fetchApi('/services', {
        method: 'POST',
        body: JSON.stringify({
          title: title.trim(),
          category,
          description: description.trim(),
          image: finalImageUrl,
          basePrice: priceNum,
          estimatedDuration: estimatedDuration.trim(),
          serviceMode,
          serviceArea: serviceArea.trim(),
        }),
      });

      if (res.success) {
        toast.success(
          'Service submitted successfully! It is now waiting for administrator review.'
        );
        router.push('/dashboard/technician/my-services');
      } else {
        toast.error(res.message || 'Failed to submit service.');
      }
    } catch (err: any) {
      toast.error('An error occurred submitting the service.');
    } finally {
      setSubmitting(false);
      setUploadingImage(false);
    }
  };

  return (
    <DashboardLayout allowedRoles={['technician']}>
      <div className="max-w-3xl space-y-6 font-mono text-xs">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            List a New Repair Service
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            New listings are submitted with &lsquo;pending&rsquo; status and appear publicly once verified by an admin.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#213039] border border-[#32414a] p-6 md:p-8 space-y-5"
        >
          {/* Read-Only Technician Info */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#32414a]">
            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                Technician Name (From Session)
              </label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className="w-full bg-[#1b2932] border border-[#32414a] px-3 py-2 text-[#dbdbda] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                Technician Email (Owner)
              </label>
              <input
                type="text"
                value={user?.email || ''}
                disabled
                className="w-full bg-[#1b2932] border border-[#32414a] px-3 py-2 text-[#dbdbda] cursor-not-allowed truncate"
              />
            </div>
          </div>

          {/* Service Title */}
          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
              Service Title *
            </label>
            <input
              type="text"
              placeholder="e.g. iPhone 15 Pro OLED Screen Replacement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-[#1b2932] border border-[#32414a] px-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
            />
          </div>

          {/* Category & Mode Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1b2932] border border-[#32414a] px-3 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                Service Mode *
              </label>
              <select
                value={serviceMode}
                onChange={(e) => setServiceMode(e.target.value as any)}
                className="w-full bg-[#1b2932] border border-[#32414a] px-3 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              >
                <option value="Home Visit">Home Visit</option>
                <option value="Shop Drop-off">Shop Drop-off</option>
              </select>
            </div>
          </div>

          {/* Price, Duration, Area */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
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
                className="w-full bg-[#1b2932] border border-[#32414a] px-3 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                Est. Duration
              </label>
              <input
                type="text"
                placeholder="e.g. 2-3 hours"
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                className="w-full bg-[#1b2932] border border-[#32414a] px-3 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                Service Area *
              </label>
              <input
                type="text"
                placeholder="e.g. Dhanmondi, Dhaka"
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
                required
                className="w-full bg-[#1b2932] border border-[#32414a] px-3 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
              Detailed Service Scope & Inclusions *
            </label>
            <textarea
              rows={4}
              placeholder="Explain repair steps, part specifications, diagnostic guarantees, and testing protocols..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full bg-[#1b2932] border border-[#32414a] p-3 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
            />
          </div>

          {/* ImgBB Service Banner Upload */}
          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-1 font-bold">
              Service Banner Image (ImgBB File Upload) *
            </label>
            <div className="border border-dashed border-[#32414a] bg-[#1b2932] p-4 text-center">
              {imagePreview ? (
                <div className="space-y-3">
                  <div className="relative h-40 max-w-sm mx-auto overflow-hidden border border-[#32414a]">
                    <img
                      src={imagePreview}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="inline-block px-3 py-1.5 border border-[#32414a] text-xs text-[#67e8f9] cursor-pointer hover:bg-[#213039]">
                    Change Selected File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer py-4">
                  <Upload className="w-8 h-8 text-[#67e8f9] mb-2" />
                  <span className="text-xs text-[#fefdfe] font-semibold">
                    Click to select service banner image
                  </span>
                  <span className="text-[10px] text-[#dbdbda] mt-1">
                    Uploads directly via ImgBB API (PNG, JPG, WebP)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </label>
              )}
            </div>
          </div>

          {/* Submission Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#f1f3f4] text-[#040404] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#67e8f9] transition-colors disabled:opacity-50"
            >
              {submitting
                ? uploadingImage
                  ? 'Uploading Image to ImgBB...'
                  : 'Submitting Service...'
                : 'Submit Service for Review'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
