'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';
import { User as UserIcon, Check } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [area, setArea] = useState(user?.area || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [imageUrl, setImageUrl] = useState(user?.image || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setArea(user.area || '');
      setBio(user.bio || '');
      setImageUrl(user.image || '');
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Name cannot be empty.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetchApi('/users/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          area: area.trim(),
          bio: bio.trim(),
          image: imageUrl.trim(),
        }),
      });

      if (res.success) {
        toast.success('Profile updated successfully!');
        updateUser();
      } else {
        toast.error(res.message || 'Failed to update profile.');
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-1">
            Personal Settings
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-[#000000]">
            Update Your Profile
          </h1>
          <p className="text-xs text-[#383838] mt-1">
            Keep your contact details, service area, and avatar up to date.
          </p>
        </div>

        <form
          onSubmit={handleProfileSubmit}
          className="rounded-2xl border border-white/80 bg-white/90 p-6 md:p-8 space-y-5 shadow-sm text-xs"
        >
          
          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-2">
              Profile Photo URL
            </label>
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-14 h-14 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-serif font-bold text-base overflow-hidden shrink-0 shadow-xs">
                {imageUrl ? (
                  <img src={imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  user?.name.charAt(0).toUpperCase()
                )}
              </div>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#bfc7d1]/40">
            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#383838] mb-1">
                Account Email (Read-only)
              </label>
              <input
                type="text"
                value={user?.email || ''}
                disabled
                className="w-full bg-[#dde6f0]/40 border border-[#bfc7d1] rounded-lg px-3 py-2 text-[#383838] cursor-not-allowed truncate"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#383838] mb-1">
                Assigned Role (Read-only)
              </label>
              <input
                type="text"
                value={user?.role?.toUpperCase() || ''}
                disabled
                className="w-full bg-[#dde6f0]/40 border border-[#bfc7d1] rounded-lg px-3 py-2 text-[#1e3a8a] font-bold cursor-not-allowed uppercase"
              />
            </div>
          </div>

          
          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">City / Area</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
              Bio & Experience Summary
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell customers or technicians about your background..."
              className="w-full bg-white border border-[#bfc7d1] rounded-lg p-3 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 rounded-lg glossy-btn-primary text-xs font-semibold tracking-wide disabled:opacity-50"
            >
              {saving ? 'Saving Updates...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
