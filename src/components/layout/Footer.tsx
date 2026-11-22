import React from 'react';
import Link from 'next/link';
import { Wrench, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { FixuraLogo } from '@/components/ui/FixuraLogo';

export function Footer() {
  return (
    <footer className="w-full bg-[#d5dde7] border-t border-[#bfc7d1]/50 text-[#090909] text-xs">
      <div className="max-w-[960px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-3.5">
            <Link href="/" className="inline-block">
              <FixuraLogo size="md" showTagline />
            </Link>
            <p className="text-xs text-[#383838] leading-relaxed">
              On-demand smart device & appliance repair platform. Verified technicians, live pipeline tracking, and 100% pay-after-service guarantee.
            </p>
            <div className="flex items-center space-x-1.5 text-[#1e3a8a] font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>Guaranteed Workmanship</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#000000] border-b border-[#bfc7d1]/40 pb-1.5">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#1e3a8a] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#1e3a8a] transition-colors">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#1e3a8a] transition-colors">
                  How Fixura Works
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-[#1e3a8a] transition-colors">
                  Become a Technician
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#000000] border-b border-[#bfc7d1]/40 pb-1.5">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services?category=Smartphone" className="hover:text-[#1e3a8a] transition-colors">
                  Smartphone Screen & Battery
                </Link>
              </li>
              <li>
                <Link href="/services?category=Laptop+%26+PC" className="hover:text-[#1e3a8a] transition-colors">
                  Laptop Motherboard & Servicing
                </Link>
              </li>
              <li>
                <Link href="/services?category=AC" className="hover:text-[#1e3a8a] transition-colors">
                  AC Master Cleaning & Refill
                </Link>
              </li>
              <li>
                <Link href="/services?category=Home+Appliance" className="hover:text-[#1e3a8a] transition-colors">
                  Refrigerator & Washer Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#000000] border-b border-[#bfc7d1]/40 pb-1.5">
              Direct Contact
            </h4>
            <ul className="space-y-2 text-[#383838]">
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#1e3a8a] shrink-0" />
                <span>Road 11, Banani, Dhaka</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#1e3a8a] shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#1e3a8a] shrink-0" />
                <span>support@fixura.com</span>
              </li>
              <li className="pt-2 text-[10px] text-[#383838]">
                Stripe Encrypted &bull; 256-Bit SSL
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Socials & Copyright */}
        <div className="mt-10 pt-6 border-t border-[#bfc7d1]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#383838]">
          <p>&copy; {new Date().getFullYear()} Fixura Platform Inc. All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#383838] hover:text-[#1e3a8a] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#383838] hover:text-[#1e3a8a] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
