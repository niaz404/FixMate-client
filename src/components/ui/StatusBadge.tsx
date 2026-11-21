import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'job' | 'payment' | 'approval';
}

export function StatusBadge({ status, type = 'job' }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  let colorClasses = 'bg-[#213039] text-[#dbdbda] border-[#32414a]';

  // Job Statuses
  if (normalized === 'requested') {
    colorClasses = 'bg-blue-950/60 text-blue-300 border-blue-800';
  } else if (normalized === 'accepted') {
    colorClasses = 'bg-indigo-950/60 text-indigo-300 border-indigo-800';
  } else if (normalized === 'in-progress' || normalized === 'in progress') {
    colorClasses = 'bg-amber-950/60 text-amber-300 border-amber-800';
  } else if (normalized === 'completed') {
    colorClasses = 'bg-emerald-950/60 text-emerald-300 border-emerald-800';
  } else if (normalized === 'rejected') {
    colorClasses = 'bg-rose-950/60 text-rose-300 border-rose-800';
  } else if (normalized === 'cancelled') {
    colorClasses = 'bg-neutral-800 text-neutral-400 border-neutral-700';
  }

  // Payment Statuses
  if (normalized === 'paid') {
    colorClasses = 'bg-emerald-950/80 text-emerald-200 border-emerald-700 font-semibold';
  } else if (normalized === 'unpaid') {
    colorClasses = 'bg-amber-950/80 text-amber-200 border-amber-700';
  }

  // Approval Statuses
  if (normalized === 'approved') {
    colorClasses = 'bg-emerald-950/60 text-emerald-300 border-emerald-800';
  } else if (normalized === 'pending') {
    colorClasses = 'bg-yellow-950/60 text-yellow-300 border-yellow-800';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider border ${colorClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
      {status}
    </span>
  );
}
