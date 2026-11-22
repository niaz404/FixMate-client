'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Wrench, Menu, X, ChevronDown, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { FixuraLogo } from '@/components/ui/FixuraLogo';

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getDashboardRoute = () => {
    if (!user) return '/sign-in';
    if (user.role === 'admin') return '/dashboard/admin';
    if (user.role === 'technician') return '/dashboard/technician';
    return '/dashboard/customer';
  };

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'How It Works', href: '/about' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'FAQ', href: '/#faq' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#dde6f0]/90 border-b border-[#bfc7d1] backdrop-blur-md">
      <div className="max-w-[960px] mx-auto px-6 h-18 flex items-center justify-between">
        
        <Link href="/" className="group">
          <FixuraLogo size="md" showTagline />
        </Link>

        
        <nav className="hidden md:flex items-center space-x-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm tracking-normal transition-colors font-medium ${
                isActive(link.href)
                  ? 'text-[#1e3a8a] font-semibold'
                  : 'text-[#383838] hover:text-[#1e3a8a]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg border border-[#bfc7d1] bg-white/80 hover:bg-white shadow-xs transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center overflow-hidden text-xs font-semibold">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="text-left text-xs">
                  <span className="text-[#000000] font-semibold block leading-tight max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-[#1e3a8a] uppercase tracking-wider block font-medium">
                    {user.role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#383838]" />
              </button>

              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-[#bfc7d1] shadow-lg py-2 z-50 text-xs text-[#090909]"
                >
                  <div className="px-4 py-2 border-b border-[#bfc7d1]/50">
                    <p className="text-[10px] text-[#383838] uppercase tracking-wider">Signed in as</p>
                    <p className="font-semibold text-[#000000] truncate">{user.email}</p>
                  </div>

                  <Link
                    href={getDashboardRoute()}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2.5 hover:bg-[#dde6f0]/50 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#1e3a8a]" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2.5 hover:bg-[#dde6f0]/50 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-[#1e3a8a]" />
                    <span>Edit Profile</span>
                  </Link>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 text-rose-600 hover:bg-rose-50 text-left border-t border-[#bfc7d1]/50 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2.5">
              <Link
                href="/sign-in"
                className="px-3.5 py-2 text-xs font-medium text-[#090909] hover:text-[#1e3a8a] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/services"
                className="glossy-btn-primary px-4 py-2 rounded-lg text-xs font-semibold tracking-wide"
              >
                Book a Repair
              </Link>
            </div>
          )}
        </div>

        
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-[#bfc7d1] bg-white/70 text-[#000000]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#bfc7d1] bg-[#dde6f0] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#090909] hover:text-[#1e3a8a] py-1.5"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#bfc7d1] flex flex-col space-y-2">
            {user ? (
              <>
                <Link
                  href={getDashboardRoute()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-white border border-[#bfc7d1] text-xs font-semibold text-[#000000]"
                >
                  Dashboard ({user.role})
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-center py-2 text-xs text-rose-600 font-semibold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-lg border border-[#bfc7d1] bg-white text-xs font-semibold text-[#000000]"
                >
                  Sign In
                </Link>
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg glossy-btn-primary text-xs font-semibold"
                >
                  Book a Repair
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
