'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Wrench, Lock, Mail } from 'lucide-react';
import { FixuraLogo } from '@/components/ui/FixuraLogo';
import { toast } from 'sonner';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '';
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    const success = await login(email.trim(), password);
    setSubmitting(false);

    if (success) {
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push('/');
      }
    }
  };

  const handleQuickFill = (testEmail: string, testPass: string) => {
    setEmail(testEmail);
    setPassword(testPass);
  };

  return (
    <div className="min-h-[85vh] bg-[#dde6f0] text-[#000000] py-12 md:py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-white/80 bg-white/90 p-8 shadow-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block mb-1">
            <FixuraLogo size="md" />
          </Link>
          <h1 className="text-2xl font-serif font-medium text-[#000000]">
            Sign In to Fixura
          </h1>
          <p className="text-xs text-[#383838]">
            Access your repair dashboard, track bookings, or manage services.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#383838] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white border border-[#bfc7d1] rounded-lg pl-9 pr-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#383838] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white border border-[#bfc7d1] rounded-lg pl-9 pr-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-lg glossy-btn-primary text-xs font-semibold tracking-wide disabled:opacity-50 mt-2"
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Quick Credentials for Evaluators */}
        <div className="pt-4 border-t border-[#bfc7d1]/40 space-y-2 text-xs">
          <span className="text-[10px] uppercase tracking-wider text-[#1e3a8a] font-semibold block">
            Quick Test Accounts (Click to Fill):
          </span>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <button
              type="button"
              onClick={() => handleQuickFill('admin@fixura.com', 'Admin123!')}
              className="p-2 rounded-lg border border-[#bfc7d1] bg-white/70 hover:bg-white text-center transition-all"
            >
              <div className="font-semibold text-[#000000]">Admin</div>
              <div className="text-[8px] text-[#383838]">admin@</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('rashed@fixura.com', 'Tech123!')}
              className="p-2 rounded-lg border border-[#bfc7d1] bg-white/70 hover:bg-white text-center transition-all"
            >
              <div className="font-semibold text-[#000000]">Technician</div>
              <div className="text-[8px] text-[#383838]">rashed@</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('tanvir@gmail.com', 'Cust123!')}
              className="p-2 rounded-lg border border-[#bfc7d1] bg-white/70 hover:bg-white text-center transition-all"
            >
              <div className="font-semibold text-[#000000]">Customer</div>
              <div className="text-[8px] text-[#383838]">tanvir@</div>
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="text-center pt-2 border-t border-[#bfc7d1]/40 text-xs text-[#383838]">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-[#1e3a8a] hover:underline font-semibold">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#dde6f0] p-12 text-[#000000]">Loading authentication...</div>}>
      <SignInContent />
    </Suspense>
  );
}
