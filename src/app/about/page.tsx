import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Wrench, Clock, Award, Users, ArrowRight } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="w-full bg-[#dde6f0] text-[#000000] py-14 md:py-20">
      <div className="max-w-[960px] mx-auto px-6 space-y-14">
        
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-2">
            The Fixura Standard
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-[#000000] tracking-tight leading-tight">
            Fixing device & appliance repair with accountability and code.
          </h1>
          <p className="text-sm text-[#383838] mt-3 leading-relaxed">
            Getting a personal device or home appliance repaired is too often filled with friction and risk. You hand over expensive hardware, have little transparency, and are pressured to pay before verifying results. Fixura eliminates that risk through verified technicians, milestone tracking, and a strict pay-after-service model.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-xl border border-white/80 bg-white/85 p-5 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#dde6f0] flex items-center justify-center text-[#1e3a8a]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-base text-[#000000]">
              Admin-Vetted Pros
            </h3>
            <p className="text-xs text-[#383838] leading-relaxed">
              Every technician profile and service listing is personally verified before publishing.
            </p>
          </div>

          <div className="rounded-xl border border-white/80 bg-white/85 p-5 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#dde6f0] flex items-center justify-center text-[#1e3a8a]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-base text-[#000000]">
              Status Transparency
            </h3>
            <p className="text-xs text-[#383838] leading-relaxed">
              Follow every stage in real time: Requested &rarr; Accepted &rarr; In Progress &rarr; Completed.
            </p>
          </div>

          <div className="rounded-xl border border-white/80 bg-white/85 p-5 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#dde6f0] flex items-center justify-center text-[#1e3a8a]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-base text-[#000000]">
              Zero Upfront Fee
            </h3>
            <p className="text-xs text-[#383838] leading-relaxed">
              Pay strictly after you inspect the device. If the issue is unresolved, you do not pay.
            </p>
          </div>

          <div className="rounded-xl border border-white/80 bg-white/85 p-5 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#dde6f0] flex items-center justify-center text-[#1e3a8a]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-base text-[#000000]">
              Pro Empowerment
            </h3>
            <p className="text-xs text-[#383838] leading-relaxed">
              Skilled electrical and hardware technicians gain a structured platform to build verified reputations.
            </p>
          </div>
        </div>

        
        <div className="rounded-2xl border border-white/90 bg-[#d5dde7] p-8 md:p-10 space-y-6 shadow-sm">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-2">
              Protocol Pipeline
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#000000]">
              How the Fixura booking pipeline operates.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-xl bg-white/80 border border-white/90 space-y-1.5 shadow-xs">
              <span className="text-[#1e3a8a] font-semibold block text-sm">1. Service Discovery</span>
              <p className="text-[#383838] leading-relaxed">
                Filter repair listings by equipment category or search by fault keywords and read verified customer experiences.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 border border-white/90 space-y-1.5 shadow-xs">
              <span className="text-[#1e3a8a] font-semibold block text-sm">2. Booking Request</span>
              <p className="text-[#383838] leading-relaxed">
                Submit phone, address, preferred visit date, and a description of the issue. A booking is saved with status &lsquo;requested&rsquo;.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 border border-white/90 space-y-1.5 shadow-xs">
              <span className="text-[#1e3a8a] font-semibold block text-sm">3. Pipeline Progression</span>
              <p className="text-[#383838] leading-relaxed">
                The technician reviews, accepts the job, completes diagnostics and repairs, then marks the job &lsquo;completed&rsquo; with the final price.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 border border-white/90 space-y-1.5 shadow-xs">
              <span className="text-[#1e3a8a] font-semibold block text-sm">4. Stripe Verification</span>
              <p className="text-[#383838] leading-relaxed">
                Inspect your functioning device in person, then settle the invoice securely via Stripe Checkout.
              </p>
            </div>
          </div>
        </div>

        
        <div className="p-8 md:p-10 rounded-2xl bg-white/90 border border-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-2xl font-serif font-medium text-[#000000]">
              Need a fast, reliable repair today?
            </h3>
            <p className="text-xs text-[#383838]">
              Explore our vetted catalog and schedule an expert technician in under 2 minutes.
            </p>
          </div>
          <Link
            href="/services"
            className="glossy-btn-primary px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wide shrink-0"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
