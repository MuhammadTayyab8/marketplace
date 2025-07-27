'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Define Product Interface
export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Define Context Interface
interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
}

// Create Context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Provider Component
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  // Load initial wishlist from local storage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
  });

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    if (wishlist.some((item) => item._id === product._id)) {
      toast.error("Item is already in the wishlist")
      // alert(`Item is already in the wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success("Item added to wishlist")
      // alert(`Item added to wishlist`);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
    toast.success("Item remove from wishlist")
    // alert(`Item Remove From wishlist`)
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom Hook
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
