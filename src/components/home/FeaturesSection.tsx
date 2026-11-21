import React from 'react';
import Link from 'next/link';
import { UserCheck, Activity, CreditCard, Check, ArrowRight } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section className="w-full bg-[#1b2932] text-[#fefdfe] py-16 md:py-20 border-b border-[#32414a]">
      <div className="max-w-[1440px] mx-auto px-6 space-y-20">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-xs uppercase font-mono tracking-widest text-[#67e8f9] block mb-2">
            Engineered For Trust
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[#fefdfe] tracking-tight">
            A repair platform built around accountability, transparency, and technical precision.
          </h2>
        </div>

        {/* Feature Row 1: Vetted Technicians (Text Left, Mockup Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="w-10 h-10 bg-[#02444b] border border-[#32414a] flex items-center justify-center text-[#67e8f9]">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-display font-semibold text-[#fefdfe]">
              Every technician is vetted and skill-approved by platform admins.
            </h3>
            <p className="text-sm font-mono text-[#dbdbda] leading-relaxed">
              No unverified handymen. Every technician must submit certifications, identity documentation, and service experience. Our administrative staff reviews and tests each listing before it ever appears publicly.
            </p>
            <ul className="space-y-2 text-xs font-mono text-[#eaeae9] pt-2">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#67e8f9]" />
                <span>NID & Criminal background checks verified</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#67e8f9]" />
                <span>Admin approved service listings with genuine pricing</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#67e8f9]" />
                <span>Authentic customer ratings & completed job history</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="border border-[#32414a] bg-[#213039] p-6 shadow-xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#32414a]">
                <span className="text-[10px] uppercase text-[#67e8f9] tracking-wider">
                  Admin Verification Portal
                </span>
                <span className="px-2 py-0.5 bg-emerald-950/70 border border-emerald-700 text-emerald-300 text-[10px] uppercase">
                  Verified Active
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-[#02444b] border border-[#32414a] flex items-center justify-center text-lg font-display font-bold text-[#67e8f9]">
                  TI
                </div>
                <div>
                  <div className="text-base font-display font-semibold text-[#fefdfe]">
                    Tariqul Islam
                  </div>
                  <div className="text-xs text-[#dbdbda]">HVAC & Appliance Systems Engineer</div>
                  <div className="text-[10px] text-[#67e8f9] mt-0.5">85+ Completed Platform Jobs</div>
                </div>
              </div>
              <div className="p-3 bg-[#1b2932] border border-[#32414a] space-y-1 text-[11px] text-[#dbdbda]">
                <div>&bull; Certified Carrier & Daikin Inverter Refrigeration</div>
                <div>&bull; Operating Area: Gulshan, Banani & Dhanmondi</div>
                <div>&bull; Avg. Response Time: Under 25 Minutes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Row 2: Status Pipeline (Mockup Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="border border-[#32414a] bg-[#213039] p-6 shadow-xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#32414a]">
                <span className="text-[10px] uppercase text-[#67e8f9] tracking-wider">
                  Server-Enforced Pipeline
                </span>
                <span className="text-[10px] text-[#dbdbda]">Booking #BK-4921</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="p-2 bg-blue-950/60 border border-blue-800 text-blue-300">
                  1. REQUESTED
                </div>
                <div className="p-2 bg-indigo-950/60 border border-indigo-800 text-indigo-300">
                  2. ACCEPTED
                </div>
                <div className="p-2 bg-amber-950/60 border border-amber-800 text-amber-300 font-bold ring-1 ring-amber-400">
                  3. IN-PROGRESS
                </div>
                <div className="p-2 bg-[#1b2932] border border-[#32414a] text-[#dbdbda]/60">
                  4. COMPLETED
                </div>
              </div>
              <p className="text-[11px] text-[#dbdbda] leading-relaxed">
                State transitions are verified on MongoDB backend. No skipping steps, no arbitrary price hikes, and automatic notifications at every turn.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="w-10 h-10 bg-[#02444b] border border-[#32414a] flex items-center justify-center text-[#67e8f9]">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-display font-semibold text-[#fefdfe]">
              Real-time step-by-step job progress. Never guess what happened to your device.
            </h3>
            <p className="text-sm font-mono text-[#dbdbda] leading-relaxed">
              Once you hand over your phone, laptop, or home appliance, traditional repair shops leave you in the dark. FixMate enforces strict status stages: Requested &rarr; Accepted &rarr; In Progress &rarr; Completed.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center space-x-2 text-xs font-mono text-[#67e8f9] hover:underline"
              >
                <span>Find an available technician near you</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Row 3: Stripe Payment Protection (Text Left, Mockup Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="w-10 h-10 bg-[#02444b] border border-[#32414a] flex items-center justify-center text-[#67e8f9]">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-display font-semibold text-[#fefdfe]">
              Zero upfront payments. Pay securely with Stripe only when work is completed.
            </h3>
            <p className="text-sm font-mono text-[#dbdbda] leading-relaxed">
              Never pay before seeing the result. The &ldquo;Pay Now&rdquo; button is strictly locked until the technician delivers the completed job and sets the verified final amount.
            </p>
            <ul className="space-y-2 text-xs font-mono text-[#eaeae9] pt-2">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#67e8f9]" />
                <span>Protected by Stripe Checkout with encrypted 3D-Secure 2.0</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#67e8f9]" />
                <span>Transparent receipts and transaction logs in customer dashboard</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#67e8f9]" />
                <span>Full refund warranty if repair does not meet specifications</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="border border-[#32414a] bg-[#213039] p-6 shadow-xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#32414a]">
                <span className="text-[10px] uppercase text-[#67e8f9] tracking-wider">
                  Payment Gateway Shield
                </span>
                <span className="px-2 py-0.5 bg-emerald-950/70 border border-emerald-700 text-emerald-300 text-[10px] uppercase">
                  Locked Until Completed
                </span>
              </div>
              <div className="p-4 bg-[#1b2932] border border-[#32414a] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#dbdbda]">Total Due for Repair</div>
                  <div className="text-2xl font-display font-bold text-[#fefdfe]">$70.00</div>
                </div>
                <div className="px-4 py-2 bg-[#f1f3f4] text-[#040404] font-semibold text-xs uppercase tracking-wider">
                  Pay Now with Stripe
                </div>
              </div>
              <div className="text-[10px] text-[#dbdbda]/70 flex items-center justify-between">
                <span>Verified Transaction ID: txn_stripe_0918472</span>
                <span>PCI-DSS Level 1 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
