import React from 'react';
import { Search, PenTool, CheckCircle } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Find & Request Service',
      description: 'Search vetted repair listings by device category or problem. Submit your preferred date, address, and a 20+ character description of the fault.',
      icon: <Search className="w-6 h-6 text-[#67e8f9]" />,
    },
    {
      number: '02',
      title: 'Technician Fixes It',
      description: 'The technician accepts your job, moves it into "In Progress", runs diagnostics, replaces faulty components, and marks the job "Completed" with the final price.',
      icon: <PenTool className="w-6 h-6 text-[#67e8f9]" />,
    },
    {
      number: '03',
      title: 'Verify & Pay With Stripe',
      description: 'Inspect your fully working device. Click "Pay Now" in your dashboard to securely settle the invoice via Stripe Checkout. Payment receipt is automatically issued.',
      icon: <CheckCircle className="w-6 h-6 text-[#67e8f9]" />,
    },
  ];

  return (
    <section className="w-full bg-[#02444b] text-[#fefdfe] py-16 md:py-20 border-b border-[#32414a]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-[#67e8f9] block mb-2">
            The FixMate Protocol
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[#fefdfe] tracking-tight">
            How repair booking works from request to final sign-off.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="bg-[#1b2932] border border-[#32414a] p-8 flex flex-col justify-between relative group hover:border-[#67e8f9] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-display font-bold text-[#67e8f9]/70 group-hover:text-[#67e8f9]">
                    {step.number}
                  </div>
                  <div className="p-3 bg-[#02444b] border border-[#32414a]">{step.icon}</div>
                </div>
                <h3 className="text-xl font-display font-semibold text-[#fefdfe] mb-3">
                  {step.title}
                </h3>
                <p className="text-xs font-mono text-[#dbdbda] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#32414a] flex items-center justify-between text-[11px] font-mono text-[#dbdbda]">
                <span>Stage {idx + 1} of 3</span>
                <span className="text-[#67e8f9]">Guaranteed Service</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
