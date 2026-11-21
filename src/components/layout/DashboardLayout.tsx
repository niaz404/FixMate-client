'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Wrench,
  LayoutDashboard,
  CalendarCheck,
  CreditCard,
  PlusCircle,
  ListFilter,
  Users,
  ShieldCheck,
  FileText,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Home,
  AlertTriangle,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRoles?: Array<'customer' | 'technician' | 'admin'>;
}

export function DashboardLayout({ children, allowedRoles }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/sign-in?callbackUrl=${pathname}`);
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1b2932] flex items-center justify-center text-[#fefdfe] font-mono text-xs">
        <Wrench className="w-8 h-8 text-[#67e8f9] animate-spin mr-3" />
        <span>Verifying dashboard permissions...</span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Role validation check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[80vh] bg-[#1b2932] flex items-center justify-center p-6 text-center font-mono">
        <div className="max-w-md p-8 border border-[#32414a] bg-[#213039] space-y-4">
          <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
          <h2 className="text-xl font-display font-semibold text-[#fefdfe]">
            403 - Forbidden Access
          </h2>
          <p className="text-xs text-[#dbdbda] leading-relaxed">
            Your account ({user.role}) is not authorized to access this dashboard section.
          </p>
          <div className="pt-2 flex justify-center space-x-3">
            <Link
              href="/"
              className="px-4 py-2 border border-[#32414a] text-xs uppercase tracking-wider text-[#dbdbda] hover:bg-[#1b2932]"
            >
              Back to Home
            </Link>
            <Link
              href={
                user.role === 'admin'
                  ? '/dashboard/admin'
                  : user.role === 'technician'
                  ? '/dashboard/technician'
                  : '/dashboard/customer'
              }
              className="px-4 py-2 bg-[#f1f3f4] text-[#040404] text-xs uppercase tracking-wider font-semibold hover:bg-[#67e8f9]"
            >
              My Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Menu items configured per role
  const customerLinks = [
    { label: 'Overview', href: '/dashboard/customer', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'My Bookings', href: '/dashboard/customer/bookings', icon: <CalendarCheck className="w-4 h-4" /> },
    { label: 'Payment History', href: '/dashboard/customer/payments', icon: <CreditCard className="w-4 h-4" /> },
  ];

  const technicianLinks = [
    { label: 'Overview', href: '/dashboard/technician', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Add Service', href: '/dashboard/technician/add-service', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'My Services', href: '/dashboard/technician/my-services', icon: <ListFilter className="w-4 h-4" /> },
    { label: 'Manage Requests', href: '/dashboard/technician/requests', icon: <CalendarCheck className="w-4 h-4" /> },
  ];

  const adminLinks = [
    { label: 'Overview', href: '/dashboard/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Manage Users', href: '/dashboard/admin/users', icon: <Users className="w-4 h-4" /> },
    { label: 'Service Approval', href: '/dashboard/admin/services', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'All Bookings', href: '/dashboard/admin/bookings', icon: <FileText className="w-4 h-4" /> },
    { label: 'Transactions', href: '/dashboard/admin/transactions', icon: <CreditCard className="w-4 h-4" /> },
  ];

  const currentRoleLinks =
    user.role === 'admin'
      ? adminLinks
      : user.role === 'technician'
      ? technicianLinks
      : customerLinks;

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-[#1b2932] flex flex-col md:flex-row">
      {/* Sidebar (Desktop & Collapsible Mobile) */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-[#213039] border-r border-[#32414a] flex flex-col justify-between transition-transform duration-200 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Header Brand */}
          <div className="p-6 border-b border-[#32414a] flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-[#02444b] border border-[#32414a] flex items-center justify-center text-[#67e8f9]">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-base text-[#fefdfe]">
                Fix<span className="text-[#67e8f9]">Mate</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-[#dbdbda]"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 font-mono text-xs">
            <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-[#dbdbda]/70 font-bold">
              {user.role} Navigation
            </div>
            {currentRoleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3.5 py-2.5 transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#02444b] text-[#67e8f9] border border-[#67e8f9]/60 font-semibold'
                    : 'text-[#eaeae9] hover:bg-[#1b2932] hover:text-[#fefdfe]'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            <div className="pt-4 px-3 py-2 text-[10px] uppercase tracking-widest text-[#dbdbda]/70 font-bold">
              Account
            </div>
            <Link
              href="/dashboard/profile"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 px-3.5 py-2.5 transition-colors ${
                isActive('/dashboard/profile')
                  ? 'bg-[#02444b] text-[#67e8f9] border border-[#67e8f9]/60 font-semibold'
                  : 'text-[#eaeae9] hover:bg-[#1b2932] hover:text-[#fefdfe]'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Update Profile</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-[#32414a] space-y-2 font-mono text-xs">
          <Link
            href="/"
            className="flex items-center space-x-2 px-3 py-2 text-[#dbdbda] hover:text-[#67e8f9] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Site</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-rose-400 hover:bg-rose-950/40 text-left transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#1b2932]/95 border-b border-[#32414a] px-6 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 border border-[#32414a] text-[#fefdfe]"
              aria-label="Open Sidebar Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-display font-semibold text-lg text-[#fefdfe] capitalize">
              {user.role} Dashboard
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-mono text-[#dbdbda] hover:text-[#67e8f9]"
            >
              <Home className="w-3.5 h-3.5" />
              <span>FixMate Home</span>
            </Link>

            <div className="flex items-center space-x-3 pl-4 border-l border-[#32414a]">
              <div className="w-8 h-8 bg-[#02444b] border border-[#32414a] flex items-center justify-center font-display font-semibold text-xs text-[#67e8f9] overflow-hidden">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div className="hidden sm:block text-left font-mono text-xs">
                <div className="font-medium text-[#fefdfe] leading-none truncate max-w-[140px]">
                  {user.name}
                </div>
                <span className="text-[10px] uppercase text-[#67e8f9] tracking-wider">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Route Body */}
        <main className="flex-1 p-6 md:p-8 max-w-[1440px] w-full">{children}</main>
      </div>
    </div>
  );
}
