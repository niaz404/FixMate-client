'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Wrench, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
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
        // Redirection based on role or home
        router.push('/');
      }
    }
  };

  // Quick filler helper for testing examiners
  const handleQuickFill = (testEmail: string, testPass: string) => {
    setEmail(testEmail);
    setPassword(testPass);
  };

  return (
    <div className="min-h-[85vh] bg-[#1b2932] text-[#fefdfe] py-12 md:py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#213039] border border-[#32414a] p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2 text-[#67e8f9] mb-1">
            <Wrench className="w-5 h-5" />
            <span className="font-display font-bold text-lg text-[#fefdfe]">FixMate</span>
          </Link>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Sign In to FixMate
          </h1>
          <p className="text-xs font-mono text-[#dbdbda]">
            Access your repair dashboard, track bookings, or manage services.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#dbdbda] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#1b2932] border border-[#32414a] pl-9 pr-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#dbdbda] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#1b2932] border border-[#32414a] pl-9 pr-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#f1f3f4] text-[#040404] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#67e8f9] transition-colors disabled:opacity-50 mt-2"
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Quick Credentials for Evaluators / Examiners */}
        <div className="pt-4 border-t border-[#32414a] space-y-2 font-mono text-xs">
          <span className="text-[10px] uppercase tracking-wider text-[#67e8f9] font-bold block">
            Quick Test Accounts (Click to Fill):
          </span>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <button
              type="button"
              onClick={() => handleQuickFill('admin@fixmate.com', 'Admin123!')}
              className="p-2 border border-[#32414a] bg-[#1b2932] hover:border-[#67e8f9] text-center"
            >
              <div className="font-bold text-[#fefdfe]">Admin</div>
              <div className="text-[8px] text-[#dbdbda]">admin@</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('rashed@fixmate.com', 'Tech123!')}
              className="p-2 border border-[#32414a] bg-[#1b2932] hover:border-[#67e8f9] text-center"
            >
              <div className="font-bold text-[#fefdfe]">Technician</div>
              <div className="text-[8px] text-[#dbdbda]">rashed@</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('tanvir@gmail.com', 'Cust123!')}
              className="p-2 border border-[#32414a] bg-[#1b2932] hover:border-[#67e8f9] text-center"
            >
              <div className="font-bold text-[#fefdfe]">Customer</div>
              <div className="text-[8px] text-[#dbdbda]">tanvir@</div>
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="text-center pt-2 border-t border-[#32414a] text-xs font-mono text-[#dbdbda]">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-[#67e8f9] hover:underline font-semibold">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1b2932] p-12 text-[#fefdfe] font-mono">Loading authentication...</div>}>
      <SignInContent />
    </Suspense>
  );
}
