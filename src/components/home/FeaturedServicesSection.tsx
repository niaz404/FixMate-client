'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { ArrowRight, Wrench, MapPin } from 'lucide-react';

interface Service {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: string;
  serviceArea: string;
  technicianName: string;
}

export function FeaturedServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetchApi('/services/featured');
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
        }
      } catch (err) {
        console.warn('Could not load featured services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <section className="w-full bg-[#dde6f0] text-[#000000] py-16 md:py-20 border-b border-[#bfc7d1]/50">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-2">
              Verified Repair Catalog
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#000000]">
              Featured repair solutions ready for booking.
            </h2>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1e3a8a] hover:underline"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#bfc7d1]/40 bg-white/60 h-80 animate-pulse"
              />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 rounded-xl border border-white/80 bg-white/80 p-8 shadow-xs">
            <Wrench className="w-8 h-8 text-[#1e3a8a] mx-auto mb-2" />
            <p className="text-xs text-[#383838]">No featured services currently loaded. Check back shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="rounded-xl border border-white/80 bg-white/85 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#1e3a8a] text-[10px] font-semibold shadow-xs">
                      {service.category}
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#1e3a8a]/90 backdrop-blur-md text-white text-[10px] font-medium shadow-xs">
                      {service.serviceMode}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2.5">
                    <h3 className="font-serif font-medium text-base text-[#000000] line-clamp-1 group-hover:text-[#1e3a8a] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#383838] line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-[#383838] border-t border-[#bfc7d1]/30">
                      <div className="flex items-center space-x-1.5 truncate">
                        <Wrench className="w-3.5 h-3.5 text-[#1e3a8a] shrink-0" />
                        <span className="truncate">{service.technicianName}</span>
                      </div>
                      <div className="flex items-center space-x-1 shrink-0 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-[#1e3a8a]" />
                        <span className="truncate max-w-[100px]">{service.serviceArea}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 pt-0 mt-2 flex items-center justify-between border-t border-[#bfc7d1]/20">
                  <div>
                    <span className="text-[10px] uppercase text-[#383838] block font-medium">
                      Starting At
                    </span>
                    <span className="text-lg font-serif font-semibold text-[#000000]">
                      ${service.basePrice}
                    </span>
                  </div>
                  <Link
                    href={`/services/${service._id}`}
                    className="glossy-btn-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
