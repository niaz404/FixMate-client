import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-white/80 bg-white/90 p-5 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-wider text-[#383838] font-medium">{title}</span>
        {icon && <div className="text-[#1e3a8a]">{icon}</div>}
      </div>
      <div>
        <div className="text-3xl font-serif font-bold text-[#000000] tracking-tight">{value}</div>
        {subtitle && <p className="text-xs text-[#383838] mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
