import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { LogoCloudSection } from '@/components/home/LogoCloudSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { FeaturedServicesSection } from '@/components/home/FeaturedServicesSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { PricingSection } from '@/components/home/PricingSection';
import { FaqSection } from '@/components/home/FaqSection';
import { ClosingBannerSection } from '@/components/home/ClosingBannerSection';

export default function HomePage() {
  return (
    <main className="w-full">
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Logo Cloud Section */}
      <LogoCloudSection />

      {/* 4. Features Section (3 alternating rows) */}
      <FeaturesSection />

      {/* Dynamic Featured Services (6 latest approved services) */}
      <FeaturedServicesSection />

      {/* 5. Process Section (3 connected steps) */}
      <ProcessSection />

      {/* 6. Testimonials Section */}
      <TestimonialsSection />

      {/* 7. Pricing Section */}
      <PricingSection />

      {/* 8. FAQ Section */}
      <FaqSection />

      {/* 9. Closing Banner Section */}
      <ClosingBannerSection />
    </main>
  );
}
