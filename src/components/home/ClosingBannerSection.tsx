import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';

export function ClosingBannerSection() {
  return (
    <section className="w-full bg-[#141314] text-[#fcfcfd] py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#1a1c23] to-[#141314] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative">
          {/* Subtle blue ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1e3a8a]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2.5 max-w-xl text-center md:text-left relative z-10">
            <span className="text-xs uppercase tracking-widest text-[#60a5fa] font-semibold block">
              Ready to restore your hardware?
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#fcfcfd]">
              Get an expert technician at your doorstep today.
            </h2>
            <p className="text-xs text-[#dbdbda] leading-relaxed">
              Join thousands of happy homeowners. Transparent pricing, verified replacement parts, and zero fee until completed.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0 relative z-10">
            <Link
              href="/services"
              className="glossy-btn-primary px-6 py-3 rounded-lg text-xs md:text-sm font-semibold tracking-wide inline-flex items-center space-x-2"
            >
              <span>Book a Repair Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sign-up"
              className="px-5 py-3 rounded-lg border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs md:text-sm font-medium tracking-wide inline-flex items-center space-x-2 transition-all"
            >
              <Wrench className="w-4 h-4 text-[#60a5fa]" />
              <span>Join as Technician</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
