'use client'

import Image from 'next/image';
import { FaShare, FaHeart, FaArrowRightArrowLeft } from "react-icons/fa6";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/CartContext';

export default function Products() {
  interface Product {
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
    stock: string;
    netTotal: number;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCart(); // Get dispatch from context
  
  useEffect(() => {
    const productFetching = async () => {
      const productApi = await fetch('/api/products');
      const productData = await productApi.json();
      setProducts(productData);
    };
    productFetching();
  }, []);

  // Define the addToCart function
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="px-4 md:px-20">
      {/* Flexbox container */}
      <div className="flex flex-wrap gap-0 mt-8">
        {products.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-[50%] lg:w-1/4 p-3 group">
            {/* Card */}
            <Link href={`/productDetail/${product.id}`}>
              <div className="bg-[#F4F5F7] overflow-hidden relative">
                {/* Image */}
                <Image
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-300"
                  width={500}
                  height={500}
                />

                {/* Stock Badge */}
                <div
                  className={`absolute top-2 right-2 w-11 h-11 rounded-full flex items-center justify-center text-white text-xs  
                    ${product.price < product.netTotal ? 'bg-[#2EC1AC] text-black' : 'bg-[#E97171]'}`}
                >
                  {product.price < product.netTotal
                    ? `-${Math.round(((product.netTotal - product.price) / product.netTotal) * 100)}%`
                    : 'New'}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3">
                  {/* Add to Cart Button */}
                  <button
                    className="bg-white text-[#B88E2F] px-6 py-2 font-semibold hover:bg-slate-50"
                    onClick={() => addToCart(product)} // Pass product to addToCart
                  >
                    Add to Cart
                  </button>

                  {/* Icon Buttons */}
                  <div className="flex gap-4">
                    {/* Share */}
                    <button className="flex gap-1 items-center text-white">
                      <FaShare className="text-md" />
                      <span className="text-sm">Share</span>
                    </button>
                    {/* Compare */}
                    {/* <Link href='/productcam'>
                      <button className="flex gap-1 items-center text-white">
                        <FaArrowRightArrowLeft className="text-md" />
                        <span className="text-sm">Compare</span>
                      </button>
                    </Link> */}
                    {/* Wishlist */}
                    <button className="flex gap-1 items-center text-white">
                      <FaHeart className="text-md" />
                      <span className="text-sm">Wishlist</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{product.title}</h2>
                  <p className="text-[#898989] font-[540] mt-2">
                    {product.description.slice(0, 40)}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold mt-2">$ {product.price}.00</p>
                    <p className="text-md mt-2 line-through text-[#B0B0B0]">$ {product.netTotal}.00</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
