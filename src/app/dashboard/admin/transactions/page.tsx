'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { fetchApi } from '@/lib/api';
import { DollarSign, CheckCircle2 } from 'lucide-react';

interface Transaction {
  _id: string;
  bookingId: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  technicianName: string;
  technicianEmail: string;
  amount: number;
  currency: string;
  transactionId: string;
  stripeSessionId: string;
  paidAt: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const res = await fetchApi('/admin/transactions');
        if (res.success && Array.isArray(res.data)) {
          setTransactions(res.data);
          setTotalRevenue(res.totalRevenue || 0);
        }
      } catch (err) {
        console.error('Error fetching admin transactions', err);
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, []);

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-medium text-[#000000]">
            Financial Transactions & Stripe Logs
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Global ledger of paid repair bookings settled via Stripe Checkout.
          </p>
        </div>

        {/* Total Revenue Summary Banner */}
        <div className="p-6 glossy-card rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e3a8a] shadow-xs">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 block font-semibold">
                Platform Gross Volume
              </span>
              <div className="text-3xl font-serif font-bold text-[#000000]">
                ${totalRevenue.toLocaleString()} USD
              </div>
            </div>
          </div>
          <span className="text-xs text-slate-700 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-xs font-medium">
            {transactions.length} Verified Payments
          </span>
        </div>

        {loading ? (
          <div className="h-64 glossy-card rounded-2xl animate-pulse" />
        ) : transactions.length === 0 ? (
          <div className="p-12 glossy-card rounded-2xl text-center space-y-2">
            <p className="text-sm text-slate-600">No transaction records found on the ledger.</p>
          </div>
        ) : (
          <div className="glossy-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 border-b border-slate-200/80 text-[11px] uppercase text-slate-600 tracking-wider">
                  <tr>
                    <th className="p-4 font-semibold">Customer</th>
                    <th className="p-4 font-semibold">Technician</th>
                    <th className="p-4 font-semibold">Service</th>
                    <th className="p-4 font-semibold">Amount</th>
                    <th className="p-4 font-semibold">Stripe Txn ID</th>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {transactions.map((tx) => (
                    <tr key={tx._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-[#000000] text-sm">
                          {tx.customerName}
                        </div>
                        <div className="text-[11px] text-slate-500">{tx.customerEmail}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-[#000000]">{tx.technicianName}</div>
                        <div className="text-[11px] text-slate-500">{tx.technicianEmail}</div>
                      </td>
                      <td className="p-4 text-slate-600">{tx.serviceTitle}</td>
                      <td className="p-4 font-serif font-bold text-[#000000] text-sm">
                        ${tx.amount} {tx.currency?.toUpperCase()}
                      </td>
                      <td className="p-4 font-mono text-[11px] text-[#1e3a8a] select-all">
                        {tx.transactionId}
                      </td>
                      <td className="p-4 text-slate-600">
                        {new Date(tx.paidAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-[11px] font-semibold uppercase">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Captured</span>
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
