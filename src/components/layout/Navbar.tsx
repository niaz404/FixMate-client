'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Wrench, Menu, X, ChevronDown, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Determine dashboard route according to role
  const getDashboardRoute = () => {
    if (!user) return '/sign-in';
    if (user.role === 'admin') return '/dashboard/admin';
    if (user.role === 'technician') return '/dashboard/technician';
    return '/dashboard/customer';
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'How It Works', href: '/about' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1b2932]/95 border-b border-[#32414a] backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand Logo with Wrench Icon */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-[#02444b] border border-[#32414a] flex items-center justify-center text-[#67e8f9] transition-transform group-hover:scale-105">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-display font-bold tracking-tight text-[#fefdfe]">
              Fix<span className="text-[#67e8f9]">Mate</span>
            </span>
            <span className="block text-[10px] text-[#dbdbda] uppercase tracking-widest font-mono">
              Repair Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-mono tracking-wide transition-colors ${
                isActive(link.href)
                  ? 'text-[#67e8f9] border-b-2 border-[#67e8f9] pb-1'
                  : 'text-[#eaeae9] hover:text-[#67e8f9]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 p-1.5 border border-[#32414a] bg-[#213039] hover:border-[#67e8f9] transition-colors"
              >
                <div className="w-8 h-8 bg-[#02444b] border border-[#32414a] flex items-center justify-center overflow-hidden">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-display font-semibold text-xs text-[#67e8f9]">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="text-left font-mono text-xs">
                  <div className="text-[#fefdfe] font-medium leading-none truncate max-w-[120px]">
                    {user.name}
                  </div>
                  <span className="text-[10px] uppercase text-[#67e8f9] tracking-wider">
                    {user.role}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-[#dbdbda]" />
              </button>

              {/* User Dropdown */}
              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-56 bg-[#1b2932] border border-[#32414a] shadow-xl py-2 z-50 font-mono text-xs"
                >
                  <div className="px-4 py-2 border-b border-[#32414a]">
                    <p className="text-[#dbdbda] text-[10px] uppercase tracking-wider">Signed in as</p>
                    <p className="text-[#fefdfe] font-semibold truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#02444b] text-[#67e8f9] border border-[#32414a]">
                      {user.role}
                    </span>
                  </div>

                  <Link
                    href={getDashboardRoute()}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2.5 text-[#eaeae9] hover:bg-[#213039] hover:text-[#67e8f9]"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2.5 text-[#eaeae9] hover:bg-[#213039] hover:text-[#67e8f9]"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Update Profile</span>
                  </Link>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 text-rose-400 hover:bg-rose-950/40 text-left border-t border-[#32414a] mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/sign-in"
                className="px-4 py-2 text-xs font-mono tracking-wider text-[#fefdfe] hover:text-[#67e8f9]"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold bg-[#f1f3f4] text-[#040404] hover:bg-[#67e8f9] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-[#32414a] text-[#fefdfe]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Collapsible Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1b2932] border-b border-[#32414a] px-6 py-4 space-y-3 font-mono text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 ${
                isActive(link.href) ? 'text-[#67e8f9] font-semibold' : 'text-[#eaeae9]'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#32414a]">
            {user ? (
              <div className="space-y-2">
                <div className="text-xs text-[#dbdbda] mb-2">
                  Logged in as <span className="text-[#fefdfe] font-semibold">{user.name}</span> ({user.role})
                </div>
                <Link
                  href={getDashboardRoute()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-[#67e8f9]"
                >
                  Open Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-[#eaeae9]"
                >
                  Update Profile
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="block w-full text-left py-1.5 text-rose-400"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 border border-[#32414a] text-[#fefdfe]"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 bg-[#f1f3f4] text-[#040404] font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
