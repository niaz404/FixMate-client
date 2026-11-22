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
      
      <HeroSection />

      
      <LogoCloudSection />

      
      <FeaturesSection />

      
      <FeaturedServicesSection />

      
      <ProcessSection />

      
      <TestimonialsSection />

      
      <PricingSection />

      
      <FaqSection />

      
      <ClosingBannerSection />
    </main>
  );
}
