'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { fetchApi } from '@/lib/api';
import { CreditCard, CheckCircle2 } from 'lucide-react';

interface PaymentRecord {
  _id: string;
  bookingId: string;
  serviceTitle: string;
  technicianName: string;
  amount: number;
  currency: string;
  transactionId: string;
  paidAt: string;
}

export default function CustomerPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayments() {
      try {
        const res = await fetchApi('/payments/customer/my');
        if (res.success && Array.isArray(res.data)) {
          setPayments(res.data);
        }
      } catch (err) {
        console.error('Error fetching customer payments', err);
      } finally {
        setLoading(false);
      }
    }
    loadPayments();
  }, []);

  return (
    <DashboardLayout allowedRoles={['customer']}>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-medium text-[#000000]">
            Payment & Invoice History
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Receipts and transaction IDs for all repairs settled through Stripe Checkout.
          </p>
        </div>

        {loading ? (
          <div className="h-48 glossy-card rounded-2xl animate-pulse" />
        ) : payments.length === 0 ? (
          <div className="p-12 glossy-card rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[#1e3a8a] flex items-center justify-center mx-auto">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#000000]">
              No transactions recorded yet
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Once you pay for a completed repair job, your official payment receipt and Stripe transaction ID will appear here.
            </p>
          </div>
        ) : (
          <div className="glossy-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 border-b border-slate-200/80 text-[11px] uppercase text-slate-600 tracking-wider">
                  <tr>
                    <th className="p-4 font-semibold">Service Description</th>
                    <th className="p-4 font-semibold">Technician</th>
                    <th className="p-4 font-semibold">Amount Paid</th>
                    <th className="p-4 font-semibold">Transaction ID</th>
                    <th className="p-4 font-semibold">Payment Date</th>
                    <th className="p-4 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {payments.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-medium text-[#000000]">
                        {p.serviceTitle}
                      </td>
                      <td className="p-4 text-slate-600">{p.technicianName}</td>
                      <td className="p-4 font-serif font-bold text-[#000000] text-sm">
                        ${p.amount} USD
                      </td>
                      <td className="p-4 font-mono text-[11px] text-[#1e3a8a] select-all">
                        {p.transactionId}
                      </td>
                      <td className="p-4 text-slate-600">
                        {new Date(p.paidAt).toLocaleDateString()} at{' '}
                        {new Date(p.paidAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-[11px] font-semibold uppercase">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Paid &bull; Stripe</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
