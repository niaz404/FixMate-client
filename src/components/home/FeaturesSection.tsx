import React from 'react';
import Link from 'next/link';
import { UserCheck, Activity, CreditCard, Check, ArrowRight } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section className="w-full bg-[#d5dde7] text-[#000000] py-16 md:py-20 border-b border-[#bfc7d1]/50">
      <div className="max-w-[960px] mx-auto px-6 space-y-16">
        
        <div className="max-w-xl">
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-2">
            Engineered For Trust
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#000000]">
            A repair platform built around accountability, transparency, and technical precision.
          </h2>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] text-white flex items-center justify-center shadow-sm">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif font-medium text-[#000000]">
              Every technician is vetted and skill-approved by platform admins.
            </h3>
            <p className="text-sm text-[#383838] leading-relaxed">
              No unverified handymen. Every technician must submit government identification, technical credentials, and past service experience. Our administrative team reviews every listing before it appears publicly.
            </p>
            <ul className="space-y-2 text-xs text-[#090909] pt-1">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#1e3a8a]" />
                <span>NID & background credentials strictly checked</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#1e3a8a]" />
                <span>Transparent pricing with itemized diagnosis breakdown</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#1e3a8a]" />
                <span>Genuine customer reviews and verified job counts</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl border border-white/80 bg-white/85 p-6 shadow-sm text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#bfc7d1]/40">
                <span className="text-[10px] uppercase font-semibold text-[#1e3a8a] tracking-wider">
                  Admin Verification Portal
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">
                  Verified Active
                </span>
              </div>
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center text-sm font-serif font-bold shadow-xs">
                  TI
                </div>
                <div>
                  <div className="text-sm font-serif font-semibold text-[#000000]">
                    Tariqul Islam
                  </div>
                  <div className="text-xs text-[#383838]">HVAC & Appliance Systems Engineer</div>
                  <div className="text-[10px] text-[#1e3a8a] font-medium mt-0.5">85+ Verified Platform Repairs</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#dde6f0]/60 border border-[#bfc7d1]/40 space-y-1 text-[11px] text-[#383838]">
                <div>&bull; Carrier & Daikin Inverter Refrigeration Master</div>
                <div>&bull; Operating Area: Gulshan, Banani & Dhanmondi</div>
                <div>&bull; Avg. Arrival Time: Under 30 Minutes</div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-xl border border-white/80 bg-white/85 p-6 shadow-sm text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#bfc7d1]/40">
                <span className="text-[10px] uppercase font-semibold text-[#1e3a8a] tracking-wider">
                  Live Service Transitions
                </span>
                <span className="text-[10px] text-[#383838]">Booking #BK-4921</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-medium">
                <div className="p-2 rounded-lg bg-[#dde6f0] text-[#1e3a8a] border border-[#bfc7d1]/40">
                  1. REQUESTED
                </div>
                <div className="p-2 rounded-lg bg-[#dde6f0] text-[#1e3a8a] border border-[#bfc7d1]/40">
                  2. ACCEPTED
                </div>
                <div className="p-2 rounded-lg bg-[#1e3a8a] text-white shadow-xs font-semibold">
                  3. IN-PROGRESS
                </div>
                <div className="p-2 rounded-lg bg-white/60 text-[#383838] border border-[#bfc7d1]/40">
                  4. COMPLETED
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#dde6f0]/60 border border-[#bfc7d1]/40 space-y-1 text-[11px] text-[#383838]">
                <div>&bull; Real-time status notifications at every stage</div>
                <div>&bull; Technicians update final amounts only after hardware checks</div>
                <div>&bull; Customer approval required before payment triggers</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] text-white flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif font-medium text-[#000000]">
              Transparent status pipeline with server-enforced milestones.
            </h3>
            <p className="text-sm text-[#383838] leading-relaxed">
              Never wonder what is happening with your device. Each repair follows a strict four-state progression: Requested &rarr; Accepted &rarr; In-Progress &rarr; Completed. You receive live updates as parts are replaced and calibrated.
            </p>
            <ul className="space-y-2 text-xs text-[#090909] pt-1">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#1e3a8a]" />
                <span>Zero arbitrary fee increases mid-repair</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#1e3a8a]" />
                <span>Customer cancellation allowed while still in requested state</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#1e3a8a]" />
                <span>Automatic timestamping and verifiable audit history</span>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] text-white flex items-center justify-center shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif font-medium text-[#000000]">
              Strict pay-after-service guarantee backed by Stripe.
            </h3>
            <p className="text-sm text-[#383838] leading-relaxed">
              We eliminated upfront repair risks entirely. Your card is never billed until you have physically inspected your device and confirmed it functions flawlessly. Payments process through encrypted Stripe Checkout.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-[#1e3a8a] hover:underline"
              >
                <span>Explore all protected repair services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl border border-white/80 bg-white/85 p-6 shadow-sm text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#bfc7d1]/40">
                <span className="text-[10px] uppercase font-semibold text-[#1e3a8a] tracking-wider">
                  Secure Checkout Shield
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#1e3a8a] text-[10px] font-semibold">
                  Post-Service Payment
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#383838]">Diagnosed Repair:</span>
                  <span className="font-semibold text-[#000000]">Split AC Capacitor & Cleaning</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#383838]">Customer Verification:</span>
                  <span className="text-emerald-700 font-semibold">Cooling Verified (18&deg;C)</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold pt-2 border-t border-[#bfc7d1]/40">
                  <span>Amount Due:</span>
                  <span className="text-[#1e3a8a]">$55.00</span>
                </div>
              </div>
              <div className="w-full py-2.5 rounded-lg glossy-btn-primary text-center text-xs font-semibold">
                Pay with Stripe Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
