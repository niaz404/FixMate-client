'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { fetchApi } from '@/lib/api';
import { CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';

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
      <div className="space-y-6 font-mono">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Payment & Invoice History
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            Receipts and transaction IDs for all repairs settled through Stripe Checkout.
          </p>
        </div>

        {loading ? (
          <div className="h-48 bg-[#213039] border border-[#32414a] animate-pulse" />
        ) : payments.length === 0 ? (
          <div className="p-12 border border-[#32414a] bg-[#213039] text-center space-y-3">
            <CreditCard className="w-10 h-10 text-[#67e8f9] mx-auto" />
            <h3 className="font-display font-semibold text-lg text-[#fefdfe]">
              No transactions recorded yet.
            </h3>
            <p className="text-xs text-[#dbdbda] max-w-sm mx-auto">
              Once you pay for a completed repair job, your official payment receipt and Stripe transaction ID will appear here.
            </p>
          </div>
        ) : (
          <div className="border border-[#32414a] bg-[#213039] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1b2932] border-b border-[#32414a] text-[10px] uppercase text-[#dbdbda] tracking-wider">
                <tr>
                  <th className="p-4">Service Description</th>
                  <th className="p-4">Technician</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Payment Date</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#32414a] text-[#eaeae9]">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-[#1b2932]/50 transition-colors">
                    <td className="p-4 font-display font-semibold text-[#fefdfe]">
                      {p.serviceTitle}
                    </td>
                    <td className="p-4 text-[#dbdbda]">{p.technicianName}</td>
                    <td className="p-4 font-bold text-[#fefdfe]">${p.amount} USD</td>
                    <td className="p-4 font-mono text-[11px] text-[#67e8f9] select-all">
                      {p.transactionId}
                    </td>
                    <td className="p-4 text-[#dbdbda]">
                      {new Date(p.paidAt).toLocaleDateString()} at{' '}
                      {new Date(p.paidAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-[10px] font-semibold uppercase">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Paid &bull; Stripe</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
