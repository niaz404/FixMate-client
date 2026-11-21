import React from 'react';
import Link from 'next/link';
import { Check, Zap } from 'lucide-react';

export function PricingSection() {
  const plans = [
    {
      name: 'Standard Diagnostics',
      price: '$25',
      period: 'per on-site visit',
      description: 'Ideal for general hardware inspection, leak detection, or device error troubleshooting.',
      isRecommended: false,
      features: [
        'Complete 18-point electrical/hardware diagnosis',
        'Transparent itemized repair estimate',
        'Valid towards final repair if service is booked',
        'Standard 48-hour response window',
        'Standard 15-day service warranty',
      ],
      ctaText: 'Book Diagnosis',
      ctaHref: '/services',
    },
    {
      name: 'On-Demand Repair',
      price: '$45+',
      period: 'base service rate',
      description: 'Our most popular choice for smartphones, laptops, AC units, and washing machines.',
      isRecommended: true,
      features: [
        'Dedicated certified technician assigned',
        'Real-time live status tracking pipeline',
        'Genuine manufacturer-grade parts used',
        'Zero upfront cost — Pay only upon completion',
        'Priority 24-hour response window',
        'Full 30-day workmanship guarantee',
      ],
      ctaText: 'Explore Services',
      ctaHref: '/services',
    },
    {
      name: 'Pro Maintenance Annual',
      price: '$180',
      period: 'per year / household',
      description: 'Comprehensive coverage for home appliances with seasonal maintenance visits.',
      isRecommended: false,
      features: [
        '4 Scheduled seasonal appliance checkups per year',
        'Unlimited free diagnostics for all household devices',
        '25% Discount on all labor fees',
        'Emergency 4-hour technician dispatch',
        'Extended 90-day parts and labor warranty',
      ],
      ctaText: 'Get Annual Care',
      ctaHref: '/about',
    },
  ];

  return (
    <section className="w-full bg-[#1b2932] text-[#fefdfe] py-16 md:py-20 border-b border-[#32414a]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-[#67e8f9] block mb-2">
            Transparent Tier Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[#fefdfe] tracking-tight">
            Clear, honest pricing with zero hidden fees.
          </h2>
          <p className="text-sm font-mono text-[#dbdbda] mt-2">
            Every booking is backed by our strict pay-after-service policy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 border flex flex-col justify-between relative transition-all ${
                plan.isRecommended
                  ? 'bg-[#213039] border-[#67e8f9] shadow-2xl ring-1 ring-[#67e8f9]'
                  : 'bg-[#1b2932] border-[#32414a] hover:border-[#67e8f9]/50'
              }`}
            >
              {plan.isRecommended && (
                <div className="absolute -top-3.5 left-8 px-3 py-1 bg-[#67e8f9] text-[#040404] text-[10px] font-mono uppercase font-bold tracking-wider flex items-center space-x-1">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Most Recommended</span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-display font-semibold text-[#fefdfe]">{plan.name}</h3>
                <p className="text-xs font-mono text-[#dbdbda] mt-2 leading-relaxed min-h-[48px]">
                  {plan.description}
                </p>

                <div className="mt-6 mb-6 pb-6 border-b border-[#32414a]">
                  <span className="text-4xl font-display font-bold text-[#fefdfe] tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs font-mono text-[#dbdbda] ml-2">{plan.period}</span>
                </div>

                <ul className="space-y-3 text-xs font-mono text-[#eaeae9]">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-[#67e8f9] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={plan.ctaHref}
                  className={`block w-full py-3 text-center text-xs font-mono uppercase tracking-wider font-semibold transition-colors ${
                    plan.isRecommended
                      ? 'bg-[#f1f3f4] text-[#040404] hover:bg-[#67e8f9]'
                      : 'border border-[#32414a] bg-[#213039] text-[#fefdfe] hover:bg-[#02444b]'
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
