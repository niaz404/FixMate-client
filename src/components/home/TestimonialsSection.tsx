import React from 'react';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 'main',
      quote:
        '“FixMate completely revolutionized appliance repair for my family. When our inverter AC stopped cooling mid-summer, Tariq arrived within 40 minutes, diagnosed the coil leak with nitrogen, and I only paid the agreed invoice through Stripe after verifying the bedroom reached 18°C. Utterly smooth and reliable.”',
      author: 'Tanvir Hossain',
      role: 'Verified Customer & Engineering Lead',
      device: 'Gree 1.5T Inverter AC Servicing',
      rating: 5,
      avatar: 'TH',
    },
    {
      id: 'sub-1',
      quote:
        '“Spilled iced tea directly onto my MacBook Pro keyboard. Rashed conducted an ultrasonic logic board wash, cleaned corrosion, and restored everything. The live milestone tracker was invaluable.”',
      author: 'Sarah Khan',
      role: 'Product Designer, Uttara',
      device: 'MacBook Pro Logic Board',
      rating: 5,
      avatar: 'SK',
    },
    {
      id: 'sub-2',
      quote:
        '“As a certified technician, FixMate connects me with quality clients without price haggling. The platform approval keeps low-quality competitors out, and payout protection is guaranteed.”',
      author: 'Rashed Al-Mamun',
      role: 'Certified Technician, Dhanmondi',
      device: 'Verified Hardware Specialist',
      rating: 5,
      avatar: 'RA',
    },
  ];

  return (
    <section className="w-full bg-[#d5dde7] text-[#000000] py-16 md:py-20 border-b border-[#bfc7d1]/50">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="text-center max-w-lg mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-2">
            Verified Customer Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#000000]">
            Trusted by over 15,000 households and businesses.
          </h2>
        </div>

        {/* Hero / Prominent Main Testimonial */}
        <div className="p-8 md:p-10 rounded-2xl border border-white/90 bg-white/90 shadow-sm mb-6 relative overflow-hidden">
          <div className="flex items-center space-x-1 text-amber-500 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          <p className="text-xl md:text-2xl font-serif font-medium text-[#000000] leading-relaxed mb-6">
            {testimonials[0].quote}
          </p>

          <div className="flex items-center justify-between border-t border-[#bfc7d1]/40 pt-5">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                {testimonials[0].avatar}
              </div>
              <div>
                <div className="font-serif font-semibold text-sm text-[#000000]">
                  {testimonials[0].author}
                </div>
                <div className="text-xs text-[#383838]">{testimonials[0].role}</div>
              </div>
            </div>

            <div className="hidden sm:block text-right text-xs text-[#383838]">
              <span className="text-[#1e3a8a] font-medium block">{testimonials[0].device}</span>
              <span className="text-[11px] text-emerald-700 font-semibold">100% Pay-After-Service</span>
            </div>
          </div>
        </div>

        {/* 2 Supporting Smaller Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.slice(1).map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl border border-white/80 bg-white/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#090909] leading-relaxed mb-4">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-3 border-t border-[#bfc7d1]/30">
                <div className="w-8 h-8 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-serif font-semibold text-xs text-[#000000]">
                    {item.author}
                  </div>
                  <div className="text-[10px] text-[#383838]">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
