
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

export const Header = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.cartQuantity, 0);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">FarmFresh</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-green-600 font-medium">
              All Products
            </Link>
          </nav>
          
          <Link to="/cart">
            <Button variant="outline" className="relative">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-600 min-w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
