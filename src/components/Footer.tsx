
import React from 'react';
import { Leaf, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-green-600 rounded-full p-2 mr-3">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">Fresh Direct</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Connecting conscious consumers with local organic farmers. 
              Supporting sustainable agriculture and healthy communities.
            </p>
            <div className="flex space-x-4">
              <div className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-green-400 transition-colors">Shop Products</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Our Farmers</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-green-400" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-green-400" />
                <span>hello@freshdirect.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-green-400 mt-1" />
                <span>123 Farm Lane<br />Green Valley, CA 94558</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Fresh Direct. All rights reserved. Built with ❤️ for sustainable farming.</p>
        </div>
      </div>
    </footer>
  );
};
