import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
  return (
    <div className="bg-[#213039] border border-[#32414a] p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-[#dbdbda] font-mono">{title}</span>
        {icon && <div className="text-[#67e8f9]">{icon}</div>}
      </div>
      <div>
        <div className="text-3xl font-display font-semibold text-[#fefdfe] tracking-tight">{value}</div>
        {subtitle && <p className="text-xs text-[#eaeae9]/70 mt-1 font-mono">{subtitle}</p>}
      </div>
    </div>
  );
}
