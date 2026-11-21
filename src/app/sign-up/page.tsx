'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Wrench, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function SignUpPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'technician'>('customer');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [bio, setBio] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Password Validation Rules
  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!isPasswordValid) {
      toast.error('Please satisfy all password security requirements.');
      return;
    }

    setSubmitting(true);
    const success = await register({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
      phone: phone.trim(),
      area: area.trim(),
      bio: bio.trim(),
    });

    setSubmitting(false);
    if (success) {
      if (role === 'technician') {
        router.push('/dashboard/technician');
      } else {
        router.push('/dashboard/customer');
      }
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#dde6f0] text-[#000000] py-12 md:py-16 flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-2xl border border-white/80 bg-white/90 p-8 shadow-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2 text-[#1e3a8a] mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#1e3a8a] text-white flex items-center justify-center shadow-xs">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="font-serif font-semibold text-xl text-[#000000]">FixMate</span>
          </Link>
          <h1 className="text-2xl font-serif font-medium text-[#000000]">
            Create Your Account
          </h1>
          <p className="text-xs text-[#383838]">
            Join as a Customer to request repairs or as a Technician to offer services.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Role Selection Cards */}
          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-2">
              Select Your Role *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  role === 'customer'
                    ? 'border-[#1e3a8a] bg-blue-50/80 text-[#000000] ring-1 ring-[#1e3a8a]'
                    : 'border-[#bfc7d1]/80 bg-white/70 text-[#383838] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-serif font-semibold text-sm text-[#000000]">Customer</span>
                  <User className="w-4 h-4 text-[#1e3a8a]" />
                </div>
                <p className="text-[11px] text-[#383838]">Book repairs & pay after completion</p>
              </button>

              <button
                type="button"
                onClick={() => setRole('technician')}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  role === 'technician'
                    ? 'border-[#1e3a8a] bg-blue-50/80 text-[#000000] ring-1 ring-[#1e3a8a]'
                    : 'border-[#bfc7d1]/80 bg-white/70 text-[#383838] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-serif font-semibold text-sm text-[#000000]">Technician</span>
                  <Wrench className="w-4 h-4 text-[#1e3a8a]" />
                </div>
                <p className="text-[11px] text-[#383838]">List services & accept client jobs</p>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Tanvir Hossain"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
            />
          </div>

          {/* Password with Inline Criteria Checkers */}
          <div>
            <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
              Password *
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
            />

            {/* Password Validation Requirements */}
            <div className="mt-2.5 p-3 rounded-lg bg-[#dde6f0]/50 border border-[#bfc7d1]/50 space-y-1.5 text-[11px]">
              <div className="flex items-center space-x-2">
                {hasMinLength ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-neutral-400" />
                )}
                <span className={hasMinLength ? 'text-emerald-700 font-medium' : 'text-[#383838]'}>
                  At least 6 characters
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {hasUpperCase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-neutral-400" />
                )}
                <span className={hasUpperCase ? 'text-emerald-700 font-medium' : 'text-[#383838]'}>
                  At least one uppercase letter (A-Z)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {hasLowerCase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-neutral-400" />
                )}
                <span className={hasLowerCase ? 'text-emerald-700 font-medium' : 'text-[#383838]'}>
                  At least one lowercase letter (a-z)
                </span>
              </div>
            </div>
          </div>

          {/* Optional Details: Phone & City Area */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">Phone</label>
              <input
                type="tel"
                placeholder="+8801700..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">Area / City</label>
              <input
                type="text"
                placeholder="e.g. Dhanmondi, Dhaka"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-white border border-[#bfc7d1] rounded-lg px-3.5 py-2.5 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Optional Bio (useful for Technicians) */}
          {role === 'technician' && (
            <div>
              <label className="block text-[11px] uppercase font-semibold text-[#383838] mb-1.5">
                Technician Experience & Skills Bio
              </label>
              <textarea
                rows={2}
                placeholder="e.g. 5+ years experience in motherboard micro-soldering and AC servicing..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-white border border-[#bfc7d1] rounded-lg p-3 text-[#000000] focus:border-[#1e3a8a] focus:outline-hidden"
              />
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting || !isPasswordValid}
            className="w-full py-2.5 rounded-lg glossy-btn-primary text-xs font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            {submitting ? 'Creating Account...' : 'Complete Sign Up'}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="text-center pt-2 border-t border-[#bfc7d1]/40 text-xs text-[#383838]">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-[#1e3a8a] hover:underline font-semibold">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
