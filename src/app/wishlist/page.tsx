// pages/wishlist.tsx
'use client'

import { useWishlist } from "@/components/WishlistContext";
import Link from "next/link";
import { FaAngleRight, FaHeart, FaShare, FaTrashCan } from "react-icons/fa6";
import { useCart } from '@/components/CartContext';
import React from "react";


const WishlistPage = () => {


  interface Product {
    _id: string;
    imageUrl: string;
    title: string;
    description: string;
    price: number;
  }


  const { dispatch: cartDispatch } = useCart(); 
  const addToCart = (product: Product) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: product });
  };



  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="">

      {/* Hero Section */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(/shop-hero.png)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-black">
            <h1 className="text-4xl font-bold">Wishlist</h1>
            <Link href="/">
              <p className="mt-4 text-lg flex justify-center items-center gap-3 font-bold">
                Home <FaAngleRight /> <span className="font-thin">Wishlist</span>
              </p>
            </Link>
          </div>
        </div>
      </div>

      {wishlist.length > 0 ? (
        <div className="flex flex-wrap gap-0 mt-8 px-9">
          {wishlist.map((product) => (
              <div key={product._id} className="w-full sm:w-1/2 md:w-[50%] lg:w-1/4 p-3 group">
              {/* Product card */}
                <div className="bg-[#F4F5F7] overflow-hidden relative">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Stock Badge */}
                  <div className='absolute top-2 right-2 w-13 h-13 rounded-full flex items-center justify-center text-white text-xs'>
                    <div onClick={() => removeFromWishlist(product._id)} >
                  <button
                    className="hover:text-red-600 text-red-600 rounded-full"
                  >
                    <FaTrashCan className="w-8 h-8 text-md"/>
                  </button>
                    </div>
                  </div>
                   {/* Overlay */}
                   <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3">
                    {/* Add to Cart Button */}
                    <button
                      className="bg-white text-[#B88E2F] px-6 py-2 font-semibold hover:bg-slate-50"
                      onClick={() => removeFromWishlist(product._id)} // Pass product to addToCart
                    >
                      Remove
                    </button>

                    <button
                      className="bg-white text-[#B88E2F] px-6 py-2 font-semibold hover:bg-slate-50"
                      onClick={() => addToCart(product)} // Pass product to addToCart
                    >
                      Add to Cart
                    </button>

                   
                  </div>


                  {/* Content */}
                  <Link href={`/productDetail/${product._id}`}>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{product.title}</h2>
                    <p className="text-[#898989] font-[540] mt-2">
                      {product.description.slice(0, 40)}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold mt-2">$ {product.price}.00</p>
                      {/* <p className="text-md mt-2 line-through text-[#B0B0B0]">
                        $ {(product.price - (product.price * (product.discountPercentage || 0) / 100)).toFixed(2)}
                      </p> */}
                    </div>
                  </div>
                  </Link>
                </div>
              
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Wishlist is Empty</h2>
        <Link href="/shop">
          <button className="text-white bg-[#B88E2F] px-6 py-3 rounded-md">
            Add Now
          </button>
        </Link>
      </div>
      )}
    </div>
  );
};

export default WishlistPage;
