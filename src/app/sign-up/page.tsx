'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Wrench, User, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
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
    <div className="min-h-[85vh] bg-[#1b2932] text-[#fefdfe] py-12 md:py-16 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-[#213039] border border-[#32414a] p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2 text-[#67e8f9] mb-1">
            <Wrench className="w-5 h-5" />
            <span className="font-display font-bold text-lg text-[#fefdfe]">FixMate</span>
          </Link>
          <h1 className="text-2xl font-display font-semibold text-[#fefdfe]">
            Create Your Account
          </h1>
          <p className="text-xs font-mono text-[#dbdbda]">
            Join as a Customer to request repairs or as a Technician to offer services.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
          {/* Role Selection Cards */}
          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-2 font-bold">
              Select Your Role *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`p-3.5 border text-left flex flex-col justify-between transition-colors ${
                  role === 'customer'
                    ? 'border-[#67e8f9] bg-[#02444b]/60 text-[#fefdfe] ring-1 ring-[#67e8f9]'
                    : 'border-[#32414a] bg-[#1b2932] text-[#dbdbda] hover:border-[#67e8f9]/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-display font-semibold text-sm text-[#fefdfe]">Customer</span>
                  <User className="w-4 h-4 text-[#67e8f9]" />
                </div>
                <p className="text-[10px] text-[#dbdbda]">Book repairs & pay after completion</p>
              </button>

              <button
                type="button"
                onClick={() => setRole('technician')}
                className={`p-3.5 border text-left flex flex-col justify-between transition-colors ${
                  role === 'technician'
                    ? 'border-[#67e8f9] bg-[#02444b]/60 text-[#fefdfe] ring-1 ring-[#67e8f9]'
                    : 'border-[#32414a] bg-[#1b2932] text-[#dbdbda] hover:border-[#67e8f9]/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-display font-semibold text-sm text-[#fefdfe]">Technician</span>
                  <Wrench className="w-4 h-4 text-[#67e8f9]" />
                </div>
                <p className="text-[10px] text-[#dbdbda]">List services & accept client jobs</p>
              </button>
            </div>
            {/* Note: Admin is explicitly disallowed here per requirement */}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Tanvir Hossain"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#1b2932] border border-[#32414a] px-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#1b2932] border border-[#32414a] px-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
            />
          </div>

          {/* Password with Inline Criteria Checkers */}
          <div>
            <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
              Password *
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#1b2932] border border-[#32414a] px-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
            />

            {/* Password Validation Requirements */}
            <div className="mt-2.5 p-3 bg-[#1b2932] border border-[#32414a] space-y-1.5 text-[11px]">
              <div className="flex items-center space-x-2">
                {hasMinLength ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-neutral-500" />
                )}
                <span className={hasMinLength ? 'text-emerald-300' : 'text-[#dbdbda]'}>
                  At least 6 characters
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {hasUpperCase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-neutral-500" />
                )}
                <span className={hasUpperCase ? 'text-emerald-300' : 'text-[#dbdbda]'}>
                  At least one uppercase letter (A-Z)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {hasLowerCase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-neutral-500" />
                )}
                <span className={hasLowerCase ? 'text-emerald-300' : 'text-[#dbdbda]'}>
                  At least one lowercase letter (a-z)
                </span>
              </div>
            </div>
          </div>

          {/* Optional Details: Phone & City Area */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">Phone</label>
              <input
                type="tel"
                placeholder="+8801700..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#1b2932] border border-[#32414a] px-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">Area / City</label>
              <input
                type="text"
                placeholder="e.g. Dhanmondi, Dhaka"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-[#1b2932] border border-[#32414a] px-3.5 py-2.5 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Optional Bio (useful for Technicians) */}
          {role === 'technician' && (
            <div>
              <label className="block text-[10px] uppercase text-[#dbdbda] mb-1">
                Technician Experience & Skills Bio
              </label>
              <textarea
                rows={2}
                placeholder="e.g. 5+ years experience in motherboard micro-soldering and AC servicing..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#1b2932] border border-[#32414a] p-3 text-[#fefdfe] focus:border-[#67e8f9] focus:outline-hidden"
              />
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting || !isPasswordValid}
            className="w-full py-3.5 bg-[#f1f3f4] text-[#040404] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#67e8f9] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating Account...' : 'Complete Sign Up'}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="text-center pt-2 border-t border-[#32414a] text-xs font-mono text-[#dbdbda]">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-[#67e8f9] hover:underline font-semibold">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
