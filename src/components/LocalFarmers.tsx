
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Award, Users } from 'lucide-react';

const farmers = [
  {
    id: 1,
    name: "Sarah Johnson",
    farm: "Green Valley Organic Farm",
    location: "Sonoma County, CA",
    specialty: "Heirloom Vegetables",
    years: 15,
    avatar: "👩‍🌾",
    rating: 4.9,
    products: 24,
    description: "Third-generation farmer specializing in rare heirloom varieties"
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    farm: "Sunny Acres",
    location: "Central Valley, CA",
    specialty: "Leafy Greens",
    years: 8,
    avatar: "👨‍🌾",
    rating: 4.8,
    products: 18,
    description: "Sustainable farming practices with focus on premium salad greens"
  },
  {
    id: 3,
    name: "Emma Chen",
    farm: "Harvest Moon Farm",
    location: "Napa Valley, CA",
    specialty: "Root Vegetables",
    years: 12,
    avatar: "👩‍🌾",
    rating: 4.9,
    products: 31,
    description: "Biodynamic farming methods producing exceptional root vegetables"
  }
];

export const LocalFarmers = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Farmers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The passionate growers behind your fresh, organic produce
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {farmers.map((farmer) => (
            <Card key={farmer.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">{farmer.avatar}</div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{farmer.name}</h3>
                <p className="text-green-600 font-semibold mb-1">{farmer.farm}</p>
                
                <div className="flex items-center justify-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{farmer.location}</span>
                </div>
                
                <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
                  {farmer.specialty}
                </Badge>
                
                <p className="text-gray-600 text-sm mb-6">{farmer.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="font-bold text-lg text-gray-900">{farmer.years}</div>
                    <div className="text-xs text-gray-600">Years</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{farmer.rating}</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{farmer.products}</div>
                    <div className="text-xs text-gray-600">Products</div>
                  </div>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Users className="w-4 h-4 mr-2" />
                  Visit Farm Store
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            <Award className="w-5 h-5 mr-2" />
            Become a Partner Farmer
          </Button>
        </div>
      </div>
    </section>
  );
};
