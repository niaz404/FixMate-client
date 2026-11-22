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
import { FixuraLogo } from '@/components/ui/FixuraLogo';

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
      <div className="min-h-screen bg-[#dde6f0] flex items-center justify-center text-[#000000] text-xs">
        <Wrench className="w-8 h-8 text-[#1e3a8a] animate-spin mr-3" />
        <span>Verifying dashboard permissions...</span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[80vh] bg-[#dde6f0] flex items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 rounded-2xl border border-white/80 bg-white/90 space-y-4 shadow-sm">
          <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
          <h2 className="text-xl font-serif font-medium text-[#000000]">
            403 - Forbidden Access
          </h2>
          <p className="text-xs text-[#383838] leading-relaxed">
            Your account role ({user.role}) is not authorized to access this section.
          </p>
          <div className="pt-2 flex justify-center space-x-3">
            <Link
              href="/"
              className="glossy-btn-secondary px-4 py-2 rounded-lg text-xs font-semibold"
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
              className="glossy-btn-primary px-4 py-2 rounded-lg text-xs font-semibold"
            >
              My Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#dde6f0] flex flex-col md:flex-row text-[#000000]">
      
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-white/85 border-r border-[#bfc7d1]/80 backdrop-blur-md flex flex-col justify-between transition-transform duration-200 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          
          <div className="p-5 border-b border-[#bfc7d1]/50 flex items-center justify-between">
            <Link href="/" className="inline-block">
              <FixuraLogo size="sm" showTagline />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-[#383838]"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          
          <nav className="p-3.5 space-y-1 text-xs">
            <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-[#383838] font-semibold">
              {user.role} Navigation
            </div>
            {currentRoleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                  isActive(link.href)
                    ? 'bg-[#1e3a8a] text-white font-medium shadow-xs'
                    : 'text-[#383838] hover:bg-[#dde6f0]/50 hover:text-[#000000]'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            <div className="pt-3 px-3 py-2 text-[10px] uppercase tracking-wider text-[#383838] font-semibold">
              Account
            </div>
            <Link
              href="/dashboard/profile"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                isActive('/dashboard/profile')
                  ? 'bg-[#1e3a8a] text-white font-medium shadow-xs'
                  : 'text-[#383838] hover:bg-[#dde6f0]/50 hover:text-[#000000]'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Update Profile</span>
            </Link>
          </nav>
        </div>

        
        <div className="p-4 border-t border-[#bfc7d1]/50 space-y-1 text-xs">
          <Link
            href="/"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-[#383838] hover:bg-[#dde6f0]/50 hover:text-[#000000] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Site</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 text-left transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      
      <div className="flex-1 flex flex-col min-w-0">
        
        <header className="sticky top-0 z-30 h-16 bg-[#dde6f0]/90 border-b border-[#bfc7d1]/70 px-6 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg border border-[#bfc7d1] bg-white/70 text-[#000000]"
              aria-label="Open Sidebar Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-serif font-medium text-lg text-[#000000] capitalize">
              {user.role} Dashboard
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs text-[#383838] hover:text-[#1e3a8a]"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Fixura Home</span>
            </Link>

            <div className="flex items-center space-x-2.5 pl-3 border-l border-[#bfc7d1]/60">
              <div className="w-7 h-7 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-semibold text-xs overflow-hidden shadow-xs">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <div className="font-semibold text-[#000000] leading-none truncate max-w-[120px]">
                  {user.name}
                </div>
                <span className="text-[10px] text-[#1e3a8a] uppercase font-medium">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        
        <main className="flex-1 p-6 md:p-8 max-w-[960px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
