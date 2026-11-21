'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { ArrowRight, Wrench, MapPin, Tag } from 'lucide-react';

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

const FALLBACK_FEATURED: Service[] = [
  {
    _id: 'featured-1',
    title: 'iPhone OLED Screen & Digitizer Replacement',
    category: 'Smartphone',
    description: 'Original quality OLED replacement with TrueTone calibration and dust seal reapplication.',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80',
    basePrice: 65,
    estimatedDuration: '1-2 hours',
    serviceMode: 'Shop Drop-off',
    serviceArea: 'Dhanmondi, Dhaka',
    technicianName: 'Rashed Al-Mamun',
  },
  {
    _id: 'featured-2',
    title: 'Samsung Galaxy Battery & Thermal Servicing',
    category: 'Smartphone',
    description: 'Genuine high-capacity battery installation with thermal paste renewal and adhesive sealing.',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    basePrice: 40,
    estimatedDuration: '1 hour',
    serviceMode: 'Home Visit',
    serviceArea: 'Dhanmondi, Dhaka',
    technicianName: 'Rashed Al-Mamun',
  },
  {
    _id: 'featured-3',
    title: 'MacBook Logic Board & Liquid Spill Clean',
    category: 'Laptop & PC',
    description: 'Ultrasonic board wash, corrosion removal, short-circuit diagnostics, and component re-soldering.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    basePrice: 95,
    estimatedDuration: '24-48 hours',
    serviceMode: 'Shop Drop-off',
    serviceArea: 'Dhanmondi, Dhaka',
    technicianName: 'Rashed Al-Mamun',
  },
  {
    _id: 'featured-4',
    title: 'Inverter Split AC Deep Chemical Cleaning & Gas Refill',
    category: 'Air Conditioner',
    description: 'Pressure jet indoor evaporator fin cleaning, outdoor blower flush, and R410A refrigerant charge.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    basePrice: 55,
    estimatedDuration: '2 hours',
    serviceMode: 'Home Visit',
    serviceArea: 'Gulshan, Dhaka',
    technicianName: 'Tariqul Islam',
  },
  {
    _id: 'featured-5',
    title: 'No-Frost Refrigerator Compressor & Relay Servicing',
    category: 'Home Appliance',
    description: 'Inverter compressor check, PTC relay replacement, gas leak detection, and defrost timer testing.',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    basePrice: 50,
    estimatedDuration: '2-3 hours',
    serviceMode: 'Home Visit',
    serviceArea: 'Gulshan, Dhaka',
    technicianName: 'Tariqul Islam',
  },
  {
    _id: 'featured-6',
    title: 'Front-Load Washing Machine Drum Bearing Overhaul',
    category: 'Home Appliance',
    description: 'Heavy duty high-RPM bearing and spider arm replacement. Eliminates vibration and grinding noise.',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    basePrice: 75,
    estimatedDuration: '3-4 hours',
    serviceMode: 'Home Visit',
    serviceArea: 'Gulshan, Dhaka',
    technicianName: 'Tariqul Islam',
  },
];

export function FeaturedServicesSection() {
  const [services, setServices] = useState<Service[]>(FALLBACK_FEATURED);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetchApi('/services/featured');
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
        }
      } catch (err) {
        // Fallback remains active
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <section className="w-full bg-[#1b2932] text-[#fefdfe] py-16 md:py-20 border-b border-[#32414a]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-widest text-[#67e8f9] block mb-2">
              Verified Repair Catalog
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-[#fefdfe] tracking-tight">
              Featured repair solutions ready for booking.
            </h2>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-mono text-[#67e8f9] hover:underline uppercase tracking-wider"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-[#213039] border border-[#32414a] h-96 animate-pulse"
              />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 border border-[#32414a] bg-[#213039] p-8">
            <Wrench className="w-10 h-10 text-[#67e8f9] mx-auto mb-3" />
            <h3 className="font-display font-medium text-lg text-[#fefdfe]">
              No active listings available right now.
            </h3>
            <p className="text-xs font-mono text-[#dbdbda] mt-1">
              Please check back shortly or run the database seeder.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-[#213039] border border-[#32414a] hover:border-[#67e8f9] transition-all flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Uniform Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#1b2932]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#02444b]/90 border border-[#32414a] text-[#67e8f9] text-[10px] font-mono uppercase tracking-wider">
                      {service.category}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 bg-[#1b2932]/90 border border-[#32414a] text-[#fefdfe] text-[10px] font-mono">
                      {service.serviceMode}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-display font-semibold text-lg text-[#fefdfe] line-clamp-1 group-hover:text-[#67e8f9] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-[#dbdbda] line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#eaeae9]/80 border-t border-[#32414a]">
                      <div className="flex items-center space-x-1.5 truncate">
                        <Wrench className="w-3.5 h-3.5 text-[#67e8f9] shrink-0" />
                        <span className="truncate">{service.technicianName}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 shrink-0 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-[#67e8f9]" />
                        <span className="truncate max-w-[120px]">{service.serviceArea}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer with Price and View Details Action */}
                <div className="p-5 pt-0 mt-3 flex items-center justify-between border-t border-[#32414a]/50">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#dbdbda] block">
                      Starting At
                    </span>
                    <span className="text-xl font-display font-bold text-[#fefdfe]">
                      ${service.basePrice}
                    </span>
                  </div>
                  <Link
                    href={service._id.startsWith('featured-') ? '/services' : `/services/${service._id}`}
                    className="px-4 py-2 bg-[#f1f3f4] text-[#040404] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#67e8f9] transition-colors"
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
