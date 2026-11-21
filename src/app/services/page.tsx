'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { Search, Filter, ArrowUpDown, Wrench, MapPin, Tag } from 'lucide-react';

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

  // URL state initialization
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

  // Sync state with URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    if (selectedCategory && selectedCategory !== 'All') params.set('category', selectedCategory);
    if (selectedMode && selectedMode !== 'All') params.set('mode', selectedMode);
    if (selectedSort && selectedSort !== 'newest') params.set('sort', selectedSort);

    router.replace(`/services?${params.toString()}`);
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
      console.error('Error fetching services:', err);
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
    <div className="w-full bg-[#1b2932] text-[#fefdfe] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <span className="text-xs uppercase font-mono tracking-widest text-[#67e8f9] block mb-2">
            Explore FixMate Services
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-medium text-[#fefdfe] tracking-tight">
            Browse verified repair solutions.
          </h1>
          <p className="text-sm font-mono text-[#dbdbda] mt-2">
            Filter by equipment category, service mode, or search specific hardware issues.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#213039] border border-[#32414a] p-5 mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#dbdbda] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services (e.g. iPhone, OLED, AC, Motor)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1b2932] border border-[#32414a] pl-9 pr-4 py-2.5 text-xs font-mono text-[#fefdfe] placeholder-[#dbdbda]/60 focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>

            {/* Service Mode Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full bg-[#1b2932] border border-[#32414a] px-3 py-2.5 text-xs font-mono text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              >
                <option value="All">All Service Modes</option>
                <option value="Home Visit">Home Visit</option>
                <option value="Shop Drop-off">Shop Drop-off</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full bg-[#1b2932] border border-[#32414a] px-3 py-2.5 text-xs font-mono text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#32414a]/60">
            <span className="text-[11px] font-mono uppercase text-[#dbdbda] mr-2">Category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#67e8f9] text-[#040404] font-semibold'
                    : 'bg-[#1b2932] text-[#dbdbda] border border-[#32414a] hover:text-[#fefdfe] hover:border-[#67e8f9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between text-xs font-mono text-[#dbdbda] mb-6">
          <span>
            Showing <strong className="text-[#fefdfe]">{services.length}</strong> of{' '}
            <strong className="text-[#67e8f9]">{totalCount}</strong> verified services
          </span>
          {(search || selectedCategory !== 'All' || selectedMode !== 'All' || selectedSort !== 'newest') && (
            <button
              onClick={handleResetFilters}
              className="text-[#67e8f9] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#213039] border border-[#32414a] h-96 animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 border border-[#32414a] bg-[#213039] p-8 max-w-xl mx-auto space-y-4">
            <Wrench className="w-12 h-12 text-[#67e8f9] mx-auto" />
            <h3 className="font-display font-medium text-xl text-[#fefdfe]">
              No matching repair services found.
            </h3>
            <p className="text-xs font-mono text-[#dbdbda] leading-relaxed">
              We couldn&apos;t find any approved services matching your active filters. Try searching for a different keyword or resetting your filter criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#f1f3f4] text-[#040404] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#67e8f9] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-[#213039] border border-[#32414a] hover:border-[#67e8f9] transition-all flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#1b2932]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#02444b]/95 border border-[#32414a] text-[#67e8f9] text-[9px] font-mono uppercase tracking-wider">
                      {service.category}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#1b2932]/95 border border-[#32414a] text-[#fefdfe] text-[9px] font-mono">
                      {service.serviceMode}
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <h3 className="font-display font-semibold text-base text-[#fefdfe] line-clamp-1 group-hover:text-[#67e8f9] transition-colors">
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
                        <span className="truncate max-w-[100px]">{service.serviceArea}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 mt-3 flex items-center justify-between border-t border-[#32414a]/50">
                  <div>
                    <span className="text-[9px] uppercase font-mono text-[#dbdbda] block">
                      From
                    </span>
                    <span className="text-lg font-display font-bold text-[#fefdfe]">
                      ${service.basePrice}
                    </span>
                  </div>
                  <Link
                    href={`/services/${service._id}`}
                    className="px-3.5 py-1.5 bg-[#f1f3f4] text-[#040404] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#67e8f9] transition-colors"
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
    <Suspense fallback={<div className="min-h-screen bg-[#1b2932] p-12 text-[#fefdfe] font-mono">Loading services catalog...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
