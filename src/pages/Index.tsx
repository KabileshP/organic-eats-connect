
import React from 'react';
import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { LocalFarmers } from '@/components/LocalFarmers';
import { TrustSection } from '@/components/TrustSection';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Hero />
      <FeaturedProducts />
      <LocalFarmers />
      <TrustSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
