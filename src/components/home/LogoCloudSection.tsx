import React from 'react';

export function LogoCloudSection() {
  const brands = [
    { name: 'Apple Inc.', label: 'APPLE HARDWARE' },
    { name: 'Samsung Electronics', label: 'SAMSUNG CARE' },
    { name: 'Dell Technologies', label: 'DELL CERTIFIED' },
    { name: 'Sony PlayStation', label: 'SONY ELECTRONICS' },
    { name: 'LG Electronics', label: 'LG APPLIANCES' },
    { name: 'Whirlpool Corp', label: 'WHIRLPOOL PRO' },
  ];

  return (
    <section className="w-full bg-[#efedef] text-[#040404] py-10 border-b border-[#dbdbda]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest font-mono text-[#040404]/70 font-semibold">
            Certified Repair Specialists Across Major Industry Brands
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {brands.map((b) => (
            <div
              key={b.name}
              className="p-4 border border-[#040404]/10 bg-white/70 hover:bg-white text-center transition-all group"
            >
              <div className="font-display font-bold text-sm tracking-wider text-[#040404] group-hover:text-[#02444b]">
                {b.name.split(' ')[0].toUpperCase()}
              </div>
              <div className="text-[9px] font-mono text-[#040404]/60 tracking-widest mt-1">
                {b.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
