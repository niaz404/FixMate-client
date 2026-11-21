import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';

export function ClosingBannerSection() {
  return (
    <section className="w-full bg-[#efedef] text-[#040404] py-16 md:py-20 border-b border-[#dbdbda]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="p-8 md:p-14 bg-white border border-[#040404]/15 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs uppercase font-mono tracking-widest text-[#02444b] font-bold block">
              Ready to restore your device?
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-[#040404] tracking-tight">
              Get an expert technician at your doorstep today.
            </h2>
            <p className="text-xs font-mono text-[#040404]/70 leading-relaxed">
              Join thousands of happy customers. Fast diagnostics, verified quality parts, and zero upfront fee.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#02444b] text-[#fefdfe] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#1b2932] transition-colors"
            >
              <span>Book a Repair Now</span>
              <ArrowRight className="w-4 h-4 text-[#67e8f9]" />
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center space-x-2 px-6 py-3.5 border border-[#040404]/20 bg-white text-[#040404] font-mono text-xs uppercase tracking-wider hover:bg-neutral-100 transition-colors"
            >
              <Wrench className="w-4 h-4 text-[#02444b]" />
              <span>Join as Technician</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
