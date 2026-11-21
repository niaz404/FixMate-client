import React from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';

export function PricingSection() {
  const plans = [
    {
      name: 'Standard Diagnostics',
      price: '$25',
      period: 'per on-site visit',
      description: 'Ideal for hardware inspection, electrical leak testing, or fault error diagnosis.',
      isRecommended: false,
      features: [
        'Complete 18-point hardware & electrical diagnosis',
        'Transparent itemized repair estimate',
        'Diagnosis fee credited if repair service is booked',
        'Standard 48-hour response window',
        'Standard 15-day service guarantee',
      ],
      ctaText: 'Book Diagnosis',
      ctaHref: '/services',
    },
    {
      name: 'On-Demand Repair',
      price: '$45+',
      period: 'base service rate',
      description: 'Our most popular choice for smartphones, laptops, AC units, and home appliances.',
      isRecommended: true,
      features: [
        'Dedicated certified technician assigned',
        'Live 4-stage status tracking pipeline',
        'Genuine manufacturer-grade replacement parts',
        'Zero upfront cost — Pay only upon completion',
        'Priority 24-hour response window',
        'Full 30-day workmanship guarantee',
      ],
      ctaText: 'Explore Services',
      ctaHref: '/services',
    },
    {
      name: 'Annual Care Plan',
      price: '$180',
      period: 'per year / household',
      description: 'Comprehensive coverage for home appliances with seasonal preventive checkups.',
      isRecommended: false,
      features: [
        '4 Scheduled seasonal appliance checkups per year',
        'Free diagnostics on all household devices',
        '25% Discount on all labor fees',
        'Emergency 4-hour technician dispatch',
        'Extended 90-day parts and labor warranty',
      ],
      ctaText: 'Get Annual Care',
      ctaHref: '/about',
    },
  ];

  return (
    <section id="pricing" className="w-full bg-[#dde6f0] text-[#000000] py-16 md:py-20 border-b border-[#bfc7d1]/50">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="max-w-xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-2">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#000000]">
            Clear, honest rates with zero hidden surprises.
          </h2>
          <p className="text-sm text-[#383838] mt-2">
            Every booking is protected by our strict pay-after-service policy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-2xl border flex flex-col justify-between relative transition-all ${
                plan.isRecommended
                  ? 'bg-white border-[#1e3a8a] shadow-[0_10px_30px_rgba(30,58,138,0.12)] ring-2 ring-[#1e3a8a]/20'
                  : 'bg-white/80 border-white/90 hover:bg-white shadow-xs'
              }`}
            >
              {plan.isRecommended && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#1e3a8a] text-white text-[10px] uppercase font-semibold tracking-wider flex items-center space-x-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-serif font-semibold text-[#000000]">{plan.name}</h3>
                <p className="text-xs text-[#383838] mt-1.5 leading-relaxed min-h-[44px]">
                  {plan.description}
                </p>

                <div className="mt-5 mb-5 pb-5 border-b border-[#bfc7d1]/40">
                  <span className="text-3xl md:text-4xl font-serif font-bold text-[#000000] tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[#383838] ml-2 font-medium">{plan.period}</span>
                </div>

                <ul className="space-y-2.5 text-xs text-[#090909]">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#1e3a8a] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#bfc7d1]/30">
                <Link
                  href={plan.ctaHref}
                  className={`w-full block py-2.5 rounded-lg text-center text-xs font-semibold tracking-wide transition-all ${
                    plan.isRecommended
                      ? 'glossy-btn-primary'
                      : 'glossy-btn-secondary'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
