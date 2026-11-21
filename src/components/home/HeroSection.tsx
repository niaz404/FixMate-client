import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, CheckCircle2, Clock, Wrench } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full bg-[#02444b] text-[#fefdfe] border-b border-[#32414a] pt-16 pb-12 md:pt-20 md:pb-16">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Actions, Trust Caption, Key Stats */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Caption Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#1b2932] border border-[#32414a] text-xs font-mono text-[#67e8f9]">
              <ShieldCheck className="w-4 h-4 text-[#67e8f9]" />
              <span>100% Pay-After-Service Guarantee &bull; Verified Pros</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-display font-medium tracking-tight leading-[1.08] text-[#fefdfe]">
              Broken device? Get it fixed by verified technicians.
            </h1>

            {/* Subtitle */}
            <p className="text-base text-[#dbdbda] font-mono leading-relaxed max-w-xl">
              From smartphone screen repairs to home appliances, book trusted local specialists. Monitor your repair pipeline step-by-step and pay securely only after the job is done.
            </p>

            {/* Dual Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/services"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#f1f3f4] text-[#040404] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#67e8f9] transition-colors"
              >
                <span>Browse Repair Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 px-6 py-3.5 border border-[#32414a] bg-[#1b2932] text-[#fefdfe] font-mono text-xs uppercase tracking-wider hover:bg-[#213039] transition-colors"
              >
                <span>How FixMate Works</span>
              </Link>
            </div>

            {/* Key Numbers Grid */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#32414a]">
              <div>
                <div className="text-2xl md:text-3xl font-display font-semibold text-[#67e8f9]">
                  15,400+
                </div>
                <div className="text-xs text-[#dbdbda] font-mono mt-1">Repairs Completed</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-display font-semibold text-[#fefdfe]">
                  99.4%
                </div>
                <div className="text-xs text-[#dbdbda] font-mono mt-1">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-display font-semibold text-[#67e8f9]">
                  30-Day
                </div>
                <div className="text-xs text-[#dbdbda] font-mono mt-1">Service Warranty</div>
              </div>
            </div>
          </div>

          {/* Right Column: Browser Framed UI Mockup of the Platform */}
          <div className="lg:col-span-5">
            <div className="border border-[#32414a] bg-[#1b2932] shadow-2xl overflow-hidden">
              {/* Browser Header Bar */}
              <div className="px-4 py-2.5 bg-[#213039] border-b border-[#32414a] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-rose-500/80 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-amber-500/80 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-emerald-500/80 rounded-full" />
                </div>
                <div className="text-[11px] font-mono text-[#dbdbda]/70 truncate max-w-[200px]">
                  fixmate.com/tracking/FX-8941
                </div>
                <div className="w-3" />
              </div>

              {/* Browser Body / Live Product Interface */}
              <div className="p-5 space-y-4 font-mono text-xs">
                {/* Job Tracking Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#32414a]">
                  <div>
                    <span className="text-[10px] uppercase text-[#67e8f9] tracking-wider block">
                      Live Job Status
                    </span>
                    <h3 className="font-display text-sm font-semibold text-[#fefdfe]">
                      iPhone 14 Pro Screen Replacement
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-950/70 border border-amber-800 text-amber-300 text-[10px] uppercase">
                    In Progress
                  </span>
                </div>

                {/* Progress Steps Simulation */}
                <div className="space-y-2 py-1">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Request Accepted by Rashed (Tech)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#67e8f9]">
                    <Clock className="w-4 h-4 shrink-0 animate-spin" />
                    <span>Micro-soldering & OLED calibration in progress</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#dbdbda]/50">
                    <Wrench className="w-4 h-4 shrink-0" />
                    <span>Quality check & completion confirmation</span>
                  </div>
                </div>

                {/* Technician Card Inset */}
                <div className="p-3 bg-[#213039] border border-[#32414a] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-[#02444b] border border-[#32414a] flex items-center justify-center font-display font-semibold text-xs text-[#67e8f9]">
                      RA
                    </div>
                    <div>
                      <div className="text-[#fefdfe] font-semibold">Rashed Al-Mamun</div>
                      <div className="text-[10px] text-[#dbdbda]">Apple Certified Hardware Tech</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#dbdbda] uppercase">Est. Amount</div>
                    <div className="text-sm font-bold text-[#fefdfe]">$65.00</div>
                  </div>
                </div>

                {/* Payment Security Banner */}
                <div className="p-2.5 bg-[#02444b]/60 border border-[#32414a] text-[11px] text-[#eaeae9] flex items-center justify-between">
                  <span>Pay Now unlocks when job is verified complete.</span>
                  <span className="text-[#67e8f9] font-bold">Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
