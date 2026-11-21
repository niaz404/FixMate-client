'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export function FaqSection() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((i) => i !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const faqs = [
    {
      q: 'When do I actually pay for the repair service?',
      a: 'You never pay in advance on FixMate. Payment is only initiated after the technician finishes the job, marks it "Completed" in their dashboard, and you inspect the device. A secure "Pay Now" button then unlocks on your booking card powered by Stripe Checkout.',
    },
    {
      q: 'How does FixMate verify its repair technicians?',
      a: 'All technicians undergo a multi-step background check, national identification verification, and hands-on skill evaluation. Furthermore, any repair service added by a technician stays in "pending" status until thoroughly reviewed and approved by our platform administrators.',
    },
    {
      q: 'What if the technician discovers additional faults during repair?',
      a: 'The technician cannot arbitrarily alter the price. If additional parts or work are necessary, the technician consults you first. When marking the job complete, they enter the final verified amount which you can inspect and approve before paying.',
    },
    {
      q: 'Can I cancel my repair request if my plans change?',
      a: 'Yes! Customers can cancel a repair request at any time free of charge as long as the status is still "Requested". Once a technician accepts and begins traveling or starts the work, cancellation is locked to protect technician time.',
    },
    {
      q: 'Do you offer a warranty on replaced components?',
      a: 'All repairs completed through FixMate come with a minimum 30-day workmanship and parts warranty. If the exact same issue reoccurs within the warranty period, the technician is dispatched to resolve it free of charge.',
    },
    {
      q: 'What payment methods does FixMate accept?',
      a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) processed through our encrypted Stripe gateway. For testing purposes, you can use standard Stripe test cards.',
    },
  ];

  return (
    <section id="faq" className="w-full bg-[#d5dde7] text-[#000000] py-16 md:py-20 border-b border-[#bfc7d1]/50">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="max-w-xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#000000]">
            Everything you need to know about the FixMate guarantee.
          </h2>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openItems.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/80 bg-white/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-white transition-colors"
                >
                  <span className="font-serif font-semibold text-base text-[#000000] pr-4">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#dde6f0] flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#1e3a8a]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#1e3a8a]" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#383838] leading-relaxed border-t border-[#bfc7d1]/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
