import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Wrench, Clock, CheckCircle2, Award, Users, ArrowRight } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="w-full bg-[#1b2932] text-[#fefdfe] py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 space-y-16">
        {/* Page Hero */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase font-mono tracking-widest text-[#67e8f9] block mb-2">
            The FixMate Standard
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-[#fefdfe] tracking-tight leading-tight">
            Fixing the broken appliance repair industry with honesty, accountability, and code.
          </h1>
          <p className="text-sm font-mono text-[#dbdbda] mt-4 leading-relaxed">
            In Bangladesh and across the world, getting an appliance or personal gadget repaired is filled with uncertainty. You hand over expensive devices, have no idea what happens next, and are often asked to pay upfront before verifying the repair. FixMate was created to solve both sides of this problem.
          </p>
        </div>

        {/* 4 Pillars of Operation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#213039] border border-[#32414a] p-6 space-y-3">
            <div className="p-3 bg-[#02444b] border border-[#32414a] w-fit text-[#67e8f9]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-[#fefdfe]">
              Admin-Vetted Pros
            </h3>
            <p className="text-xs font-mono text-[#dbdbda] leading-relaxed">
              Every technician profile and service listing is personally reviewed by our operations staff before going live.
            </p>
          </div>

          <div className="bg-[#213039] border border-[#32414a] p-6 space-y-3">
            <div className="p-3 bg-[#02444b] border border-[#32414a] w-fit text-[#67e8f9]">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-[#fefdfe]">
              Status Transparency
            </h3>
            <p className="text-xs font-mono text-[#dbdbda] leading-relaxed">
              Follow every stage in real time: Requested &rarr; Accepted &rarr; In Progress &rarr; Completed.
            </p>
          </div>

          <div className="bg-[#213039] border border-[#32414a] p-6 space-y-3">
            <div className="p-3 bg-[#02444b] border border-[#32414a] w-fit text-[#67e8f9]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-[#fefdfe]">
              Zero Upfront Fee
            </h3>
            <p className="text-xs font-mono text-[#dbdbda] leading-relaxed">
              Pay strictly after you inspect the device. If the issue is unresolved, you do not pay for completion.
            </p>
          </div>

          <div className="bg-[#213039] border border-[#32414a] p-6 space-y-3">
            <div className="p-3 bg-[#02444b] border border-[#32414a] w-fit text-[#67e8f9]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-[#fefdfe]">
              Technician Empowerment
            </h3>
            <p className="text-xs font-mono text-[#dbdbda] leading-relaxed">
              Skilled electrical and hardware technicians gain a structured platform to grow their business and income.
            </p>
          </div>
        </div>

        {/* Deep Dive: How the Protocol Works */}
        <div className="border border-[#32414a] bg-[#02444b] p-8 md:p-12 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-widest text-[#67e8f9] block mb-2">
              Step by Step
            </span>
            <h2 className="text-3xl font-display font-semibold text-[#fefdfe]">
              How the FixMate booking pipeline operates.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
            <div className="p-6 bg-[#1b2932] border border-[#32414a] space-y-2">
              <span className="text-[#67e8f9] font-bold">1. Service Discovery</span>
              <p className="text-[#dbdbda] leading-relaxed">
                Customers filter repair listings by category (Smartphone, Laptop & PC, AC, Refrigerator, TV, Washing Machine, Electrical) or search by fault keywords.
              </p>
            </div>

            <div className="p-6 bg-[#1b2932] border border-[#32414a] space-y-2">
              <span className="text-[#67e8f9] font-bold">2. Booking Request</span>
              <p className="text-[#dbdbda] leading-relaxed">
                The customer submits phone, address, preferred date, and a 20+ character description of the problem. A booking record is created in MongoDB with status &lsquo;requested&rsquo;.
              </p>
            </div>

            <div className="p-6 bg-[#1b2932] border border-[#32414a] space-y-2">
              <span className="text-[#67e8f9] font-bold">3. Pipeline Progression</span>
              <p className="text-[#dbdbda] leading-relaxed">
                The technician reviews and accepts the job, starts work, and upon successful repair marks it &lsquo;completed&rsquo; with the final price.
              </p>
            </div>

            <div className="p-6 bg-[#1b2932] border border-[#32414a] space-y-2">
              <span className="text-[#67e8f9] font-bold">4. Stripe Verification</span>
              <p className="text-[#dbdbda] leading-relaxed">
                The customer verifies the working device and pays through Stripe Checkout. A payment document is saved and the booking updates to &lsquo;paid&rsquo;.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="p-8 md:p-12 bg-[#213039] border border-[#32414a] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-display font-semibold text-[#fefdfe]">
              Need a fast, reliable repair today?
            </h3>
            <p className="text-xs font-mono text-[#dbdbda]">
              Explore our vetted catalog and schedule an expert technician in under 2 minutes.
            </p>
          </div>
          <Link
            href="/services"
            className="px-6 py-3 bg-[#f1f3f4] text-[#040404] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#67e8f9] transition-colors"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
