import React from 'react';
import { Search, PenTool, CheckCircle } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Find & Request Service',
      description: 'Search verified repair services by device category or symptom. Submit your date, address, and a short description of the fault.',
      icon: <Search className="w-5 h-5 text-[#1e3a8a]" />,
    },
    {
      number: '02',
      title: 'Technician Fixes It',
      description: 'A verified specialist accepts your job, updates the live pipeline to "In Progress", runs diagnostics, and installs genuine parts.',
      icon: <PenTool className="w-5 h-5 text-[#1e3a8a]" />,
    },
    {
      number: '03',
      title: 'Verify & Pay With Stripe',
      description: 'Inspect your fully restored device in person. Pay securely through encrypted Stripe Checkout only after complete satisfaction.',
      icon: <CheckCircle className="w-5 h-5 text-[#1e3a8a]" />,
    },
  ];

  return (
    <section className="w-full bg-[#dde6f0] text-[#000000] py-16 md:py-20 border-b border-[#bfc7d1]/50">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="max-w-xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-2">
            The Fixura Protocol
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#000000]">
            How repair booking works from request to final sign-off.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="rounded-xl border border-white/80 bg-white/85 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-serif font-semibold text-[#1e3a8a]/70 group-hover:text-[#1e3a8a] transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#dde6f0] flex items-center justify-center shadow-xs">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#000000] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#383838] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#bfc7d1]/40 flex items-center justify-between text-[11px] text-[#383838]">
                <span>Stage {idx + 1} of 3</span>
                <span className="text-[#1e3a8a] font-medium">Guaranteed Service</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
