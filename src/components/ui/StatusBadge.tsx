import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'job' | 'payment' | 'approval';
}

export function StatusBadge({ status, type = 'job' }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  // Job Statuses
  if (normalized === 'requested') {
    colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (normalized === 'accepted') {
    colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  } else if (normalized === 'in-progress' || normalized === 'in progress') {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
  } else if (normalized === 'completed') {
    colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (normalized === 'rejected') {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (normalized === 'cancelled') {
    colorClasses = 'bg-neutral-100 text-neutral-600 border-neutral-300';
  }

  // Payment Statuses
  if (normalized === 'paid') {
    colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold';
  } else if (normalized === 'unpaid') {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
  }

  // Approval Statuses
  if (normalized === 'approved') {
    colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (normalized === 'pending') {
    colorClasses = 'bg-yellow-50 text-yellow-800 border-yellow-200';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider border shadow-xs ${colorClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
      {status}
    </span>
  );
}
