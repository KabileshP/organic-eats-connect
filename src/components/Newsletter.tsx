
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

export const Newsletter = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay Fresh with Our Newsletter
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get weekly harvest updates, seasonal recipes, and exclusive offers from our partner farmers
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 h-12 text-lg"
            />
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 h-12 px-8"
            >
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe anytime. Your privacy is important to us.
          </p>
        </div>
      </div>
    </section>
  );
};
