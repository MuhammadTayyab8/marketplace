'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';


// Define Types
export interface CartItem {
  _id: number;
  name: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
}

interface CartAction {
  type: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'UPDATE_QUANTITY' | 'CLEAR_CART' | 'SET_CART';
  payload?: any;
}

// Initial State
const initialCartState: CartState = {
  items: [],
};

// Reducer Function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingProduct = state.items.find((item) => item._id === action.payload._id);
    
      if (existingProduct) {
        toast.error("Item already in cart.")
        return {
          ...state,
          items: state.items.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        toast.success("Item added to cart.")
        // alert('Item Added to Cart');
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload._id),
      };
    }

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }

    case 'SET_CART': {
      return {
        ...state,
        items: action.payload || [],
      };
    }

    default:
      return state;
  }
};

// Create Context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

// Provider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      dispatch({ type: 'SET_CART', payload: parsedCart });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } else {
      localStorage.removeItem('cart'); // Clear localStorage if cart is empty
    }
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook for Using Cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
