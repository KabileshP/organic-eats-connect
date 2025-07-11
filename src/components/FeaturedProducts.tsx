
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, ShoppingCart } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  farmer: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  badge: string;
}

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, state: cartState } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featuredProducts = await mockApi.getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: number) => {
    await addToCart(productId, 1);
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fresh Harvest Daily
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loading fresh products...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
                    onClick={() => handleAddToCart(product.id)}
                    disabled={cartState.isLoading}
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
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleAddToCart(product.id)}
                      disabled={cartState.isLoading}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
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
