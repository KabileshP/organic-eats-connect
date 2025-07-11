
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Award, Phone, Mail, ShoppingCart, Plus } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { useCart } from '@/contexts/CartContext';

interface Farmer {
  id: number;
  name: string;
  farm: string;
  location: string;
  specialty: string;
  years: number;
  avatar: string;
  rating: number;
  products: number;
  description: string;
  email: string;
  phone: string;
}

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

const FarmStore = () => {
  const { farmerId } = useParams();
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, state: cartState } = useCart();

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        // If farmerId is provided, get specific farmer, otherwise show first farmer as example
        const farmerId_num = farmerId ? parseInt(farmerId) : 1;
        const farmerData = await mockApi.getFarmer(farmerId_num);
        const allProducts = await mockApi.getProducts();
        
        if (farmerData) {
          setFarmer(farmerData);
          // Filter products by farmer name
          const farmerProducts = allProducts.filter(p => p.farmer.includes(farmerData.farm.split(' ')[0]));
          setProducts(farmerProducts);
        }
      } catch (error) {
        console.error('Error fetching farmer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, [farmerId]);

  const handleAddToCart = async (productId: number) => {
    await addToCart(productId, 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Loading Farm Store...</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Farm Store Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The farm store you're looking for doesn't exist.</p>
          <Link to="/">
            <Button className="bg-green-600 hover:bg-green-700">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Farmer Profile Header */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="text-8xl">{farmer.avatar}</div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{farmer.name}</h1>
                <h2 className="text-2xl text-green-600 font-semibold mb-4">{farmer.farm}</h2>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{farmer.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    <span>{farmer.rating} Rating</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Award className="w-4 h-4 mr-1" />
                    <span>{farmer.years} Years Experience</span>
                  </div>
                </div>
                
                <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
                  {farmer.specialty}
                </Badge>
                
                <p className="text-gray-600 mb-6">{farmer.description}</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {farmer.phone}
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {farmer.email}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Fresh Products from {farmer.farm}
          </h2>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No products available from this farm yet.</p>
              <p className="text-gray-500">Check back soon for fresh produce!</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              Browse All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FarmStore;
