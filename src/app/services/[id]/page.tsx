'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';
import {
  Wrench,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle,
  X,
  ArrowLeft,
} from 'lucide-react';

interface ServiceDetail {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: string;
  serviceArea: string;
  technicianName: string;
  technicianEmail: string;
  approvalStatus: string;
  isAvailable: boolean;
}

export default function ServiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.area || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadService() {
      try {
        const res = await fetchApi(`/services/${id}`);
        if (res.success && res.data) {
          setService(res.data);
        } else {
          setService(null);
        }
      } catch (err) {
        console.warn('Failed to load service', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadService();
  }, [id]);

  useEffect(() => {
    if (user) {
      if (user.phone) setPhone(user.phone);
      if (user.area) setAddress(user.area);
    }
  }, [user]);

  const handleRequestClick = () => {
    if (!user) {
      toast.info('Please sign in as a customer to book a repair.');
      router.push(`/sign-in?callbackUrl=/services/${id}`);
      return;
    }
    if (user.role !== 'customer') {
      toast.error('Only customers can request a repair service.');
      return;
    }
    setModalOpen(true);
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim()) {
      toast.error('Please provide a contact phone number.');
      return;
    }
    if (!address.trim()) {
      toast.error('Please provide your service address.');
      return;
    }
    if (!preferredDate) {
      toast.error('Please select your preferred repair visit date.');
      return;
    }
    if (problemDescription.trim().length < 20) {
      toast.error('Please describe the problem in at least 20 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetchApi('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          serviceId: service?._id,
          customerPhone: phone.trim(),
          address: address.trim(),
          preferredDate,
          problemDescription: problemDescription.trim(),
        }),
      });

      if (res.success) {
        toast.success('Repair request submitted successfully!');
        setModalOpen(false);
        router.push('/dashboard/customer/bookings');
      } else {
        toast.error(res.message || 'Failed to submit repair request.');
      }
    } catch (err: any) {
      toast.error('An error occurred submitting your request.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#dde6f0] py-20 text-center text-[#000000]">
        <Wrench className="w-8 h-8 text-[#1e3a8a] animate-spin mx-auto mb-3" />
        <p className="text-xs text-[#383838]">Loading service specifications...</p>
      </div>
    );
  }

  if (!service || service.approvalStatus !== 'approved' || !service.isAvailable) {
    return (
      <div className="min-h-[70vh] bg-[#dde6f0] py-20 flex items-center justify-center text-center px-6">
        <div className="max-w-md p-8 rounded-2xl border border-white/80 bg-white/90 space-y-4 shadow-sm">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h2 className="text-xl font-serif font-medium text-[#000000]">
            Service Unavailable
          </h2>
          <p className="text-xs text-[#383838] leading-relaxed">
            This repair service is either unapproved, paused by the technician, or does not exist.
          </p>
          <Link
            href="/services"
            className="glossy-btn-secondary inline-block px-4 py-2 rounded-lg text-xs font-semibold"
          >
            Back to All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#dde6f0] text-[#000000] py-12 md:py-16">
      <div className="max-w-[960px] mx-auto px-6">
        
        <Link
          href="/services"
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#1e3a8a] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Services</span>
        </Link>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-white/80 bg-white/90 shadow-sm overflow-hidden">
              <div className="relative h-64 md:h-80 w-full bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1e3a8a] text-xs font-semibold shadow-xs">
                  {service.category}
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <h1 className="text-2xl md:text-3xl font-serif font-medium text-[#000000] tracking-tight">
                    {service.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-[#383838]">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#1e3a8a]" />
                      <span>Duration: {service.estimatedDuration}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center space-x-1">
                      <Wrench className="w-3.5 h-3.5 text-[#1e3a8a]" />
                      <span>Mode: {service.serviceMode}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1e3a8a]" />
                      <span>Area: {service.serviceArea}</span>
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#bfc7d1]/40 pt-5 space-y-2 text-xs leading-relaxed text-[#090909]">
                  <h3 className="font-serif text-sm font-semibold text-[#000000]">
                    Scope of Service & What&apos;s Included
                  </h3>
                  <p>{service.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 space-y-1.5 text-xs text-[#383838]">
                  <div className="flex items-center space-x-1.5 text-[#1e3a8a] font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Fixura Quality Protection Guarantee</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Every repair is tracked step-by-step. You only pay the verified amount via Stripe Checkout after physically confirming the hardware works.
                  </p>
                </div>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-white/80 bg-white/90 p-6 md:p-7 space-y-5 shadow-sm">
              <div className="pb-5 border-b border-[#bfc7d1]/40 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase text-[#383838] block font-medium">
                    Starting Base Price
                  </span>
                  <div className="text-3xl font-serif font-bold text-[#000000]">
                    ${service.basePrice}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold">
                  Pay After Service
                </span>
              </div>

              
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-[#383838] block font-semibold">
                  Assigned Specialist
                </span>
                <div className="p-3.5 rounded-xl bg-[#dde6f0]/50 border border-[#bfc7d1]/40 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                    {service.technicianName.charAt(0)}
                  </div>
                  <div className="text-xs">
                    <div className="font-serif font-semibold text-sm text-[#000000]">
                      {service.technicianName}
                    </div>
                    <div className="text-[#383838]">{service.serviceArea}</div>
                    <div className="text-[10px] text-[#1e3a8a] font-medium mt-0.5">Verified Technician</div>
                  </div>
                </div>
              </div>

              
              <div className="pt-2">
                {user && (user.role === 'technician' || user.role === 'admin') ? (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                    Only customer accounts can request a repair. (Signed in as {user.role}).
                  </div>
                ) : (
                  <button
                    onClick={handleRequestClick}
                    className="w-full py-3 rounded-lg glossy-btn-primary text-xs font-semibold tracking-wide"
                  >
                    Request This Repair
                  </button>
                )}
                <p className="text-[11px] text-[#383838] text-center mt-2.5">
                  No payment required now &bull; Settle via Stripe on completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="rounded-2xl border border-white bg-white max-w-lg w-full p-6 md:p-8 text-[#000000] shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#383838] hover:text-[#000000]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[10px] uppercase font-semibold text-[#1e3a8a] tracking-wider block">
                Repair Request Booking
              </span>
              <h3 className="text-xl font-serif font-medium text-[#000000] mt-1">
                {service.title}
              </h3>
              <p className="text-xs text-[#383838] mt-1">
                Base price: <strong className="text-[#000000]">${service.basePrice}</strong> &bull; Technician: {service.technicianName}
              </p>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#383838] mb-1">
                    Your Name
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
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full bg-[#dde6f0]/40 border border-[#bfc7d1] rounded-lg px-3 py-2 text-[#383838] cursor-not-allowed truncate text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-[#383838] mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+8801700000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3 py-2 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-[#383838] mb-1">
                  Service / Pickup Address *
                </label>
                <input
                  type="text"
                  placeholder="Apartment, Road, House, Area (e.g. Mirpur 2, Dhaka)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3 py-2 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-[#383838] mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  required
                  className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3 py-2 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] uppercase font-semibold text-[#383838]">
                    Problem Description *
                  </label>
                  <span
                    className={`text-[10px] ${
                      problemDescription.length < 20 ? 'text-amber-600' : 'text-emerald-600'
                    }`}
                  >
                    {problemDescription.length}/20 min chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Describe device symptoms, previous repairs, or error codes (minimum 20 characters)..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  required
                  className="w-full bg-white border border-[#bfc7d1] rounded-lg p-3 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="glossy-btn-secondary px-4 py-2 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="glossy-btn-primary px-5 py-2 rounded-lg text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Confirm Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
