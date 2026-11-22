'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { Search, Filter, ArrowUpDown, Wrench, MapPin } from 'lucide-react';

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

const CATEGORIES = [
  'All',
  'Smartphone',
  'Laptop & PC',
  'AC',
  'Refrigerator',
  'TV',
  'Washing Machine',
  'Electrical',
];

const MODES = ['All', 'Home Visit', 'Shop Drop-off'];

const SORTS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
];

function ServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialMode = searchParams.get('mode') || 'All';
  const initialSort = searchParams.get('sort') || 'newest';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedMode, setSelectedMode] = useState(initialMode);
  const [selectedSort, setSelectedSort] = useState(initialSort);

  const [services, setServices] = useState<Service[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilteredServices();
  }, [search, selectedCategory, selectedMode, selectedSort]);

  async function fetchFilteredServices() {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search.trim()) queryParams.set('search', search.trim());
      if (selectedCategory && selectedCategory !== 'All') queryParams.set('category', selectedCategory);
      if (selectedMode && selectedMode !== 'All') queryParams.set('serviceMode', selectedMode);
      if (selectedSort) queryParams.set('sort', selectedSort);

      const res = await fetchApi(`/services?${queryParams.toString()}`);
      if (res.success && Array.isArray(res.data)) {
        setServices(res.data);
        setTotalCount(res.totalCount || res.data.length);
      }
    } catch (err) {
      console.warn('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedMode('All');
    setSelectedSort('newest');
  };

  return (
    <div className="w-full bg-[#dde6f0] text-[#000000] py-12 md:py-16">
      <div className="max-w-[960px] mx-auto px-6">
        
        <div className="max-w-xl mb-10">
          <span className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold block mb-2">
            Explore Fixura Services
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-medium text-[#000000] tracking-tight">
            Browse verified repair solutions.
          </h1>
          <p className="text-sm text-[#383838] mt-2">
            Filter by equipment category, service mode, or search specific hardware issues.
          </p>
        </div>

        
        <div className="rounded-2xl border border-white/80 bg-white/85 p-5 mb-8 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#383838] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services (e.g. iPhone, OLED, AC, Motor)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#bfc7d1] rounded-lg pl-9 pr-4 py-2.5 text-xs text-[#000000] placeholder-[#383838]/60 focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>

            
            <div className="md:col-span-3">
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3 py-2.5 text-xs text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              >
                <option value="All">All Service Modes</option>
                <option value="Home Visit">Home Visit</option>
                <option value="Shop Drop-off">Shop Drop-off</option>
              </select>
            </div>

            
            <div className="md:col-span-3">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3 py-2.5 text-xs text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#bfc7d1]/30">
            <span className="text-[11px] uppercase font-semibold text-[#383838] mr-2">Category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1e3a8a] text-white font-medium shadow-xs'
                    : 'bg-white/80 text-[#383838] border border-[#bfc7d1]/60 hover:bg-white hover:text-[#000000]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        
        <div className="flex items-center justify-between text-xs text-[#383838] mb-6">
          <span>
            Showing <strong className="text-[#000000]">{services.length}</strong> of{' '}
            <strong className="text-[#1e3a8a]">{totalCount}</strong> verified services
          </span>
          {(search || selectedCategory !== 'All' || selectedMode !== 'All' || selectedSort !== 'newest') && (
            <button
              onClick={handleResetFilters}
              className="text-[#1e3a8a] font-medium hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/60 border border-[#bfc7d1]/40 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          
          <div className="text-center py-16 rounded-2xl border border-white/80 bg-white/80 p-8 max-w-lg mx-auto space-y-4 shadow-xs">
            <Wrench className="w-10 h-10 text-[#1e3a8a] mx-auto" />
            <h3 className="font-serif font-medium text-xl text-[#000000]">
              No matching repair services found.
            </h3>
            <p className="text-xs text-[#383838] leading-relaxed">
              We couldn&apos;t find any approved services matching your active filters. Try searching for a different term or clearing your criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="glossy-btn-secondary px-5 py-2.5 rounded-lg text-xs font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="rounded-xl border border-white/80 bg-white/85 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#1e3a8a] text-[10px] font-semibold shadow-xs">
                      {service.category}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#1e3a8a]/90 backdrop-blur-md text-white text-[10px] font-medium shadow-xs">
                      {service.serviceMode}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
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

                <div className="p-4 pt-0 mt-2 flex items-center justify-between border-t border-[#bfc7d1]/20">
                  <div>
                    <span className="text-[10px] uppercase text-[#383838] block font-medium">
                      From
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
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#dde6f0] p-12 text-[#000000]">Loading services catalog...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
