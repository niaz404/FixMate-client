import React from 'react';

export function LogoCloudSection() {
  const brands = [
    { name: 'Apple Inc.', label: 'APPLE HARDWARE' },
    { name: 'Samsung Electronics', label: 'SAMSUNG CARE' },
    { name: 'Dell Technologies', label: 'DELL CERTIFIED' },
    { name: 'Sony Electronics', label: 'SONY AUDIO & TV' },
    { name: 'LG Appliances', label: 'LG INVERTER' },
    { name: 'Whirlpool Corp', label: 'WHIRLPOOL PRO' },
  ];

  return (
    <section className="w-full bg-[#dde6f0] text-[#000000] py-12 md:py-14 border-b border-[#bfc7d1]/50">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-[#383838] font-semibold">
            Certified repair specialists across major industry brands
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 items-center">
          {brands.map((b) => (
            <div
              key={b.name}
              className="p-3.5 rounded-xl border border-white/80 bg-white/60 hover:bg-white text-center shadow-xs transition-all group hover:-translate-y-0.5"
            >
              <div className="font-serif font-semibold text-sm tracking-wide text-[#000000] group-hover:text-[#1e3a8a] transition-colors">
                {b.name.split(' ')[0]}
              </div>
              <div className="text-[9px] text-[#383838] tracking-wider mt-0.5 font-medium">
                {b.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
