
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockApi } from '@/services/mockApi';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  farmer: string;
  cartQuantity: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  total: number;
}

interface CartContextType {
  state: CartState;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ITEMS':
      const total = action.payload.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
      return { ...state, items: action.payload, total };
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isLoading: false,
    total: 0
  });

  const refreshCart = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const cartItems = await mockApi.getCart();
      dispatch({ type: 'SET_ITEMS', payload: cartItems });
    } catch (error) {
      console.error('Error refreshing cart:', error);
      toast({
        title: "Error",
        description: "Failed to refresh cart",
        variant: "destructive"
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await mockApi.addToCart(productId, quantity);
      await refreshCart();
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFromCart = async (productId: number) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await mockApi.removeFromCart(productId);
      await refreshCart();
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await mockApi.updateCartQuantity(productId, quantity);
      await refreshCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive"
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
