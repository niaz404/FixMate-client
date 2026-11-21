import React from 'react';
import Link from 'next/link';
import { Wrench, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#1b2932] border-t border-[#32414a] text-[#eaeae9] font-mono text-xs">
      <div className="max-w-[1440px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-[#02444b] border border-[#32414a] flex items-center justify-center text-[#67e8f9]">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-xl font-display font-bold text-[#fefdfe]">
                Fix<span className="text-[#67e8f9]">Mate</span>
              </span>
            </Link>
            <p className="text-xs text-[#dbdbda] leading-relaxed">
              On-demand smart device & home appliance repair service platform. Verified technicians, transparent status tracking, and 100% pay-after-service guarantee.
            </p>
            <div className="flex items-center space-x-2 text-[#67e8f9]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Guaranteed Workmanship
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-semibold uppercase tracking-wider text-[#fefdfe] border-b border-[#32414a] pb-2">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#67e8f9] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#67e8f9] transition-colors">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#67e8f9] transition-colors">
                  How FixMate Works
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-[#67e8f9] transition-colors">
                  Become a Technician
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-semibold uppercase tracking-wider text-[#fefdfe] border-b border-[#32414a] pb-2">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services?category=Smartphone" className="hover:text-[#67e8f9] transition-colors">
                  Smartphone Screen & Battery
                </Link>
              </li>
              <li>
                <Link href="/services?category=Laptop+%26+PC" className="hover:text-[#67e8f9] transition-colors">
                  Laptop Motherboard & Servicing
                </Link>
              </li>
              <li>
                <Link href="/services?category=AC" className="hover:text-[#67e8f9] transition-colors">
                  AC Master Cleaning & Refill
                </Link>
              </li>
              <li>
                <Link href="/services?category=Refrigerator" className="hover:text-[#67e8f9] transition-colors">
                  Refrigerator Cooling System
                </Link>
              </li>
              <li>
                <Link href="/services?category=Electrical" className="hover:text-[#67e8f9] transition-colors">
                  Electrical Short-Circuit Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-semibold uppercase tracking-wider text-[#fefdfe] border-b border-[#32414a] pb-2">
              Contact & Support
            </h4>
            <div className="space-y-2 text-[#dbdbda]">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#67e8f9] shrink-0" />
                <span>support@fixmate.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#67e8f9] shrink-0" />
                <span>+880 (0) 1700-FIXMATE</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#67e8f9] shrink-0 mt-0.5" />
                <span>Dhanmondi 27, Dhaka 1209, Bangladesh</span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              {/* Updated X (formerly Twitter) brand logo */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 border border-[#32414a] bg-[#213039] flex items-center justify-center text-[#eaeae9] hover:text-[#67e8f9] hover:border-[#67e8f9] transition-colors"
                aria-label="Follow us on X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 border border-[#32414a] bg-[#213039] flex items-center justify-center text-[#eaeae9] hover:text-[#67e8f9] hover:border-[#67e8f9] transition-colors"
                aria-label="GitHub Repository"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 border border-[#32414a] bg-[#213039] flex items-center justify-center text-[#eaeae9] hover:text-[#67e8f9] hover:border-[#67e8f9] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#32414a] flex flex-col md:flex-row items-center justify-between text-[#dbdbda]/70 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} FixMate Platform Inc. All rights reserved.
          </div>
          <div className="mt-2 md:mt-0 space-x-4">
            <span className="hover:text-[#67e8f9] cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-[#67e8f9] cursor-pointer">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-[#67e8f9] cursor-pointer">Safety Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
