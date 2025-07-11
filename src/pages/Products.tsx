
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, ShoppingCart, Filter } from 'lucide-react';
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
  category: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { addToCart, state: cartState } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await mockApi.getProducts();
        setProducts(allProducts);
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

  const filteredProducts = products.filter(product => 
    filter === 'all' || product.category === filter
  );

  const categories = ['all', 'vegetables', 'leafy-greens'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Loading Products...</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Fresh Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our complete selection of farm-fresh organic produce
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Filter className="w-5 h-5 text-gray-600 mt-2" />
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={filter === category ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {category === 'all' ? 'All Products' : 
               category === 'leafy-greens' ? 'Leafy Greens' : 
               category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
