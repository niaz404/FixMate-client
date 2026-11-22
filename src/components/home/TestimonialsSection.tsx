'use client';

import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface ReviewItem {
  _id?: string;
  id?: string;
  quote: string;
  author: string;
  role: string;
  device: string;
  rating: number;
  avatar: string;
}

const fallbackReviews: ReviewItem[] = [
  {
    id: '1',
    quote: 'Fixura completely revolutionized appliance repair for my family. When our inverter AC stopped cooling mid-summer, the technician arrived within 45 minutes, diagnosed the coil leak with nitrogen, and I only paid the invoice through Stripe after verifying 18°C cooling. Smooth and reliable.',
    author: 'Tanvir Hossain',
    role: 'Verified Customer & Engineering Lead',
    device: 'Gree 1.5T Inverter AC Servicing',
    rating: 5,
    avatar: 'TH',
  },
  {
    id: '2',
    quote: 'Spilled iced tea directly onto my MacBook Pro keyboard. The technician conducted an ultrasonic logic board wash, cleaned corrosion, and restored full booting. The milestone tracker kept me informed every step.',
    author: 'Sarah Khan',
    role: 'Product Designer, Uttara',
    device: 'MacBook Pro Logic Board Clean',
    rating: 5,
    avatar: 'SK',
  },
  {
    id: '3',
    quote: 'As a certified hardware specialist, Fixura connects me with quality clients without price haggling. The platform approval keeps low-quality competitors out, and payout protection is guaranteed.',
    author: 'Rashed Al-Mamun',
    role: 'Certified Technician, Dhanmondi',
    device: 'Verified Hardware Specialist',
    rating: 5,
    avatar: 'RA',
  },
];

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>(fallbackReviews);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetchApi('/reviews');
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setReviews(res.data);
        }
      } catch (e) {
      }
    }
    loadReviews();
  }, []);

  const mainReview = reviews[0] || fallbackReviews[0];
  const subReviews = reviews.slice(1);

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

        <div className="p-8 md:p-10 rounded-2xl border border-white/90 bg-white/90 shadow-sm mb-6 relative overflow-hidden">
          <div className="flex items-center space-x-1 text-amber-500 mb-5">
            {[...Array(mainReview.rating || 5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          <p className="text-xl md:text-2xl font-serif font-medium text-[#000000] leading-relaxed mb-6">
            {mainReview.quote}
          </p>

          <div className="flex items-center justify-between border-t border-[#bfc7d1]/40 pt-5">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                {mainReview.avatar}
              </div>
              <div>
                <div className="font-serif font-semibold text-sm text-[#000000]">
                  {mainReview.author}
                </div>
                <div className="text-xs text-[#383838]">{mainReview.role}</div>
              </div>
            </div>

            <div className="hidden sm:block text-right text-xs text-[#383838]">
              <span className="text-[#1e3a8a] font-medium block">{mainReview.device}</span>
              <span className="text-[11px] text-emerald-700 font-semibold">100% Pay-After-Service</span>
            </div>
          </div>
        </div>

        {subReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subReviews.map((item, idx) => (
              <div
                key={item._id || item.id || idx}
                className="p-6 rounded-xl border border-white/80 bg-white/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-amber-500 mb-3">
                    {[...Array(item.rating || 5)].map((_, i) => (
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
        )}
      </div>
    </section>
  );
}
