
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Plus } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Heritage Tomatoes",
    farmer: "Green Valley Farm",
    price: "$8.99",
    rating: 4.9,
    image: "🍅",
    description: "Vine-ripened heirloom tomatoes bursting with flavor",
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Fresh Spinach Bundle",
    farmer: "Sunny Acres",
    price: "$5.49",
    rating: 4.8,
    image: "🥬",
    description: "Crisp organic spinach, perfect for salads",
    badge: "New"
  },
  {
    id: 3,
    name: "Rainbow Carrots",
    farmer: "Earth & Sky Farm",
    price: "$6.99",
    rating: 4.9,
    image: "🥕",
    description: "Colorful organic carrots with incredible sweetness",
    badge: "Seasonal"
  },
  {
    id: 4,
    name: "Artisan Lettuce Mix",
    farmer: "Harvest Moon",
    price: "$7.49",
    rating: 4.7,
    image: "🥗",
    description: "Premium mixed greens for gourmet salads",
    badge: "Premium"
  }
];

export const FeaturedProducts = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fresh Harvest Daily
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked by our partner farmers, delivered fresh to your doorstep
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="bg-gradient-to-br from-green-100 to-green-50 h-48 flex items-center justify-center text-6xl">
                    {product.image}
                  </div>
                  <Badge className="absolute top-3 left-3 bg-green-600">
                    {product.badge}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="absolute top-3 right-3 bg-white hover:bg-green-50 text-green-600 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-green-600 font-medium mb-2">{product.farmer}</p>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Add to Cart
                    </Button>
                  </div>
                </div>
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
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
