'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';

export default function UpdateProfilePage() {
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
      toast.error('Full name is required.');
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

      if (res.success || res.user) {
        updateUser(res.user);
        toast.success('Profile updated successfully!');
      } else {
        toast.error(res.message || 'Failed to update profile.');
      }
    } catch (err: any) {
      toast.error('Error saving profile changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6 font-mono text-xs">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Update Your Profile
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            Keep your contact details, service area, and avatar up to date.
          </p>
        </div>

        <form
          onSubmit={handleProfileSubmit}
          className="bg-[#213039] border border-[#32414a] p-6 md:p-8 space-y-5"
        >
          {/* Avatar Section */}
          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-2 font-bold">
              Profile Photo URL
            </label>
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-16 h-16 bg-[#02444b] border border-[#32414a] flex items-center justify-center font-display font-bold text-lg text-[#67e8f9] overflow-hidden shrink-0">
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
                className="flex-1 bg-[#1b2932] border border-[#32414a] px-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Read-Only Account Identity */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#32414a]">
            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                Account Email (Read-only)
              </label>
              <input
                type="text"
                value={user?.email || ''}
                disabled
                className="w-full bg-[#1b2932] border border-[#32414a] px-3 py-2 text-[#dbdbda] cursor-not-allowed truncate"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                Assigned Role (Read-only)
              </label>
              <input
                type="text"
                value={user?.role?.toUpperCase() || ''}
                disabled
                className="w-full bg-[#1b2932] border border-[#32414a] px-3 py-2 text-[#67e8f9] font-bold cursor-not-allowed uppercase"
              />
            </div>
          </div>

          {/* Editable Fields */}
          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#1b2932] border border-[#32414a] px-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#1b2932] border border-[#32414a] px-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">City / Area</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-[#1b2932] border border-[#32414a] px-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
              Bio & Experience Summary
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell customers or technicians about your background..."
              className="w-full bg-[#1b2932] border border-[#32414a] p-3 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-[#f1f3f4] text-[#040404] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#67e8f9] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
