import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, CheckCircle2, Clock, Wrench } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full bg-[#d5dde7] text-[#000000] pt-16 pb-14 md:pt-20 md:pb-16 relative overflow-hidden">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-white text-xs font-medium text-[#1e3a8a] shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#1e3a8a]" />
              <span>100% Pay-After-Service Guarantee &bull; Verified Pros</span>
            </div>

            
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-serif font-medium tracking-tight leading-[1.12] text-[#000000]">
              Broken device? Restored to perfection by certified masters.
            </h1>

            
            <p className="text-base text-[#383838] leading-relaxed max-w-xl">
              From precision iPhone logic boards to inverter cooling systems, book verified local specialists. Follow your repair pipeline live and pay only once satisfied.
            </p>

            
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="/services"
                className="glossy-btn-primary px-6 py-3 rounded-lg text-xs md:text-sm font-semibold tracking-wide inline-flex items-center space-x-2"
              >
                <span>Browse Repair Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="glossy-btn-secondary px-5 py-3 rounded-lg text-xs md:text-sm font-medium tracking-wide inline-flex items-center space-x-2"
              >
                <span>How Fixura Works</span>
              </Link>
            </div>

            
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#bfc7d1]/80">
              <div>
                <div className="text-2xl md:text-3xl font-serif font-semibold text-[#1e3a8a]">
                  15,400+
                </div>
                <div className="text-xs text-[#383838] font-medium mt-0.5">Completed Repairs</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-serif font-semibold text-[#000000]">
                  99.4%
                </div>
                <div className="text-xs text-[#383838] font-medium mt-0.5">Customer Trust</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-serif font-semibold text-[#1e3a8a]">
                  30-Day
                </div>
                <div className="text-xs text-[#383838] font-medium mt-0.5">Parts Warranty</div>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-white/80 bg-white/90 shadow-[0_12px_40px_rgba(30,58,138,0.08)] overflow-hidden">
              
              <div className="px-4 py-2.5 bg-[#d5dde7]/60 border-b border-[#bfc7d1]/50 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] text-[#383838] font-mono truncate max-w-[170px] bg-white/70 px-2 py-0.5 rounded-md border border-[#bfc7d1]/40">
                  fixura.com/track/BK-8941
                </div>
                <div className="w-3" />
              </div>

              
              <div className="p-5 space-y-4 text-xs">
                
                <div className="flex items-center justify-between pb-3 border-b border-[#bfc7d1]/40">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#1e3a8a] tracking-wider block">
                      Live Service Pipeline
                    </span>
                    <h3 className="font-serif text-sm font-semibold text-[#000000]">
                      iPhone 14 Pro Screen Replacement
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold">
                    In Progress
                  </span>
                </div>

                
                <div className="p-3 rounded-lg bg-[#dde6f0]/50 border border-[#bfc7d1]/40 flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-serif font-bold text-xs">
                    RM
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#000000] truncate">
                      Rashed Al-Mamun
                    </div>
                    <div className="text-[11px] text-[#383838] truncate">
                      Apple Certified Technician &bull; Dhanmondi
                    </div>
                  </div>
                </div>

                
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#383838]">Repair Progress</span>
                    <span className="font-semibold text-[#1e3a8a]">Step 3 of 4 (75%)</span>
                  </div>
                  <div className="w-full h-2 bg-[#d5dde7] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2563eb] to-[#1e3a8a] rounded-full w-3/4" />
                  </div>
                </div>

                
                <div className="pt-2 border-t border-[#bfc7d1]/40 space-y-1.5 text-[11px] text-[#383838]">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Original OLED Display calibrated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-[#1e3a8a] shrink-0" />
                    <span>Estimated completion: 35 minutes</span>
                  </div>
                </div>

                
                <div className="pt-2 flex items-center justify-between text-[10px] text-[#383838]">
                  <span>Payment Status: <strong className="text-[#000000]">Unpaid (Pay on completion)</strong></span>
                  <span className="font-semibold text-[#1e3a8a]">$65.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
