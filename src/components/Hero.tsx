
import React from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Heart, ShoppingCart } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-400 via-green-500 to-emerald-600">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Leaf className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Farm Fresh
          <span className="block text-yellow-300">to Your Table</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Connect directly with local organic farmers. Fresh, sustainable, and delivered with care. 
          Supporting communities, one harvest at a time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-4 text-lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Shop Fresh Now
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-4 text-lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            Meet Our Farmers
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-lg">Organic Certified</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-lg">Local Farmers</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">24hrs</div>
            <div className="text-lg">Farm to Door</div>
          </div>
        </div>
      </div>
    </section>
  );
};
