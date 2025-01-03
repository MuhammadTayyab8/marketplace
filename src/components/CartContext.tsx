'use client';

import React, { createContext, useContext, useReducer } from 'react';

// Define Types
export interface CartItem {
  id: number;
  name: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

interface CartAction {
  type: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'UPDATE_QUANTITY' | 'CLEAR_CART';
  payload?: any; // Payload can vary depending on the action
}

const initialCartState: CartState = {
  items: [],
};

// Reducer Function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingProduct = state.items.find((item) => item.id === action.payload.id);

      if (existingProduct) {
        // Increment quantity if product already exists
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Add new product with default quantity of 1
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
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

    default:
      return state;
  }
};

// Create Context
export const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null); // Initialize with null to ensure proper error handling

// Provider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

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
