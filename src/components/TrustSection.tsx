
import React from 'react';
import { Shield, Leaf, Truck, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "100% Organic Certified",
    description: "All our produce is certified organic by USDA standards"
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description: "Supporting eco-friendly farming methods that protect our planet"
  },
  {
    icon: Truck,
    title: "Fresh Delivery",
    description: "From farm to your door within 24 hours of harvest"
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "100% satisfaction guarantee or your money back"
  }
];

export const TrustSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Fresh Direct?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quality, sustainability, and trust are at the heart of everything we do
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <feature.icon className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Join 10,000+ Happy Customers
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Experience the difference of truly fresh, organic produce
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">4.9/5</div>
              <div className="text-sm">Customer Rating</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm">Orders Delivered</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">24hr</div>
              <div className="text-sm">Average Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
