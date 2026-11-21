import React from 'react';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 'main',
      quote:
        '“FixMate completely changed my experience with appliance repairs. When our inverter AC stopped cooling in mid-summer, Tariq arrived on time, diagnosed the leak with nitrogen, and I only paid the agreed amount through Stripe after testing it for 30 minutes. No hidden surprises.”',
      author: 'Tanvir Hossain',
      role: 'Verified Customer & Tech Lead',
      device: '1.5 Ton Gree Split AC Jet Service',
      rating: 5,
      avatar: 'TH',
    },
    {
      id: 'sub-1',
      quote:
        '“Spilled coffee right over my MacBook Pro. Rashed cleaned the motherboard ultrasonically and restored TrueTone. The step-by-step pipeline gave me complete peace of mind.”',
      author: 'Sarah Khan',
      role: 'Product Designer, Uttara',
      device: 'MacBook Pro Logic Board Repair',
      rating: 5,
      avatar: 'SK',
    },
    {
      id: 'sub-2',
      quote:
        '“As a certified technician, FixMate gives me serious clients without haggling. The admin approval system keeps low-quality competitors out and payments land securely every single time.”',
      author: 'Rashed Al-Mamun',
      role: 'Certified Technician, Dhanmondi',
      device: 'FixMate Verified Specialist',
      rating: 5,
      avatar: 'RA',
    },
  ];

  return (
    <section className="w-full bg-[#efedef] text-[#040404] py-16 md:py-20 border-b border-[#dbdbda]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-[#02444b] font-semibold block mb-2">
            Verified Experiences
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-[#040404]">
            Trusted by over 15,000 households and businesses.
          </h2>
        </div>

        {/* Hero / Prominent Main Testimonial */}
        <div className="p-8 md:p-12 border border-[#040404]/15 bg-white shadow-sm mb-8">
          <div className="flex items-center space-x-1 text-amber-500 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          <p className="text-lg md:text-2xl font-display font-medium text-[#040404] leading-relaxed mb-8">
            {testimonials[0].quote}
          </p>

          <div className="flex items-center justify-between border-t border-[#040404]/10 pt-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#02444b] text-[#67e8f9] flex items-center justify-center font-display font-bold text-sm">
                {testimonials[0].avatar}
              </div>
              <div>
                <div className="font-display font-semibold text-sm text-[#040404]">
                  {testimonials[0].author}
                </div>
                <div className="text-xs font-mono text-[#040404]/70">{testimonials[0].role}</div>
              </div>
            </div>

            <div className="hidden sm:block text-right font-mono text-xs text-[#040404]/70">
              <span className="text-[#02444b] font-semibold block">{testimonials[0].device}</span>
              <span>100% Pay-After-Service</span>
            </div>
          </div>
        </div>

        {/* 2 Supporting Smaller Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.slice(1).map((item) => (
            <div key={item.id} className="p-6 border border-[#040404]/15 bg-white/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-mono text-[#040404] leading-relaxed mb-6">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-[#040404]/10">
                <div className="w-9 h-9 bg-[#02444b] text-[#67e8f9] flex items-center justify-center font-display font-bold text-xs">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-display font-semibold text-xs text-[#040404]">
                    {item.author}
                  </div>
                  <div className="text-[10px] font-mono text-[#040404]/70">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
