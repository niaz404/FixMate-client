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
      <div className="space-y-6 font-mono text-xs">
        <div>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Financial Transactions & Stripe Logs
          </h1>
          <p className="text-xs text-[#dbdbda] mt-1">
            Global ledger of paid repair bookings settled via Stripe Checkout.
          </p>
        </div>

        {/* Total Revenue Summary Banner */}
        <div className="p-6 bg-[#02444b] border border-[#32414a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#1b2932] border border-[#32414a] flex items-center justify-center text-[#67e8f9]">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#dbdbda] block font-bold">
                Platform Gross Volume
              </span>
              <div className="text-3xl font-display font-bold text-[#fefdfe]">
                ${totalRevenue.toLocaleString()} USD
              </div>
            </div>
          </div>
          <span className="text-[10px] text-[#dbdbda] bg-[#1b2932] px-3 py-1.5 border border-[#32414a]">
            {transactions.length} Verified Payments
          </span>
        </div>

        {loading ? (
          <div className="h-64 bg-[#213039] border border-[#32414a] animate-pulse" />
        ) : transactions.length === 0 ? (
          <div className="p-12 border border-[#32414a] bg-[#213039] text-center space-y-2">
            <p className="text-xs text-[#dbdbda]">No transaction records found on the ledger.</p>
          </div>
        ) : (
          <div className="border border-[#32414a] bg-[#213039] overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1b2932] border-b border-[#32414a] text-[10px] uppercase text-[#dbdbda] tracking-wider">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Technician</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Stripe Txn ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#32414a] text-[#eaeae9]">
                {transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-[#1b2932]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-display font-semibold text-sm text-[#fefdfe]">
                        {tx.customerName}
                      </div>
                      <div className="text-[10px] text-[#dbdbda]">{tx.customerEmail}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-[#fefdfe] font-semibold">{tx.technicianName}</div>
                      <div className="text-[10px] text-[#dbdbda]">{tx.technicianEmail}</div>
                    </td>
                    <td className="p-4 text-[#dbdbda]">{tx.serviceTitle}</td>
                    <td className="p-4 font-display font-bold text-[#fefdfe]">
                      ${tx.amount} {tx.currency?.toUpperCase()}
                    </td>
                    <td className="p-4 font-mono text-[11px] text-[#67e8f9] select-all">
                      {tx.transactionId}
                    </td>
                    <td className="p-4 text-[#dbdbda]">
                      {new Date(tx.paidAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-[10px] font-semibold uppercase">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Captured</span>
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
