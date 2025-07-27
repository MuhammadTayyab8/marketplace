'use client'

import Image from 'next/image';
import { FaShare, FaHeart } from "react-icons/fa6";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/CartContext';
import { client } from '@/sanity/lib/client';
import { useWishlist } from "../components/WishlistContext";



export default function Products() {

  interface Product {
    _id: string;
    imageUrl: string;
    title: string;
    description: string;
    price: number;
    isNew: boolean;
    tags: string;
    discountPercentage: number;
    netTotal: number;
  }



  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { dispatch: cartDispatch } = useCart();

  useEffect(() => {
    const productFetching = async () => {
      const query = `*[_type == "product"] | order(_createdAt desc) [0..7] {
        _id,
        title,
        description,
        price,
        discountPercentage,
        isNew,
        tags,
        "imageUrl": image.asset->url
      }`
      const productApi = await client.fetch(query);
      setProducts(productApi);
      setLoading(false);
    };
    productFetching();
  }, []);



  const addToCart = (product: Product) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: product });
  };




  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="w-full sm:w-1/2 md:w-[50%] lg:w-1/4 p-3">
      <div className="bg-[#F4F5F7] overflow-hidden relative">
        <div className="h-[260px] bg-gray-300 animate-pulse"></div> {/* Placeholder image */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3">
          <div className="w-32 h-8 bg-gray-300 animate-pulse rounded-md"></div> {/* Placeholder button */}
          <div className="flex gap-4 mt-3">
            <div className="w-16 h-6 bg-gray-300 animate-pulse rounded-md"></div> {/* Placeholder icons */}
            <div className="w-16 h-6 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
        </div>
        <div className="p-4">
          <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded-md"></div> {/* Placeholder title */}
          <div className="w-1/2 h-4 mt-2 bg-gray-300 animate-pulse rounded-md"></div> {/* Placeholder description */}
          <div className="flex justify-between items-center mt-2">
            <div className="w-20 h-6 bg-gray-300 animate-pulse rounded-md"></div> {/* Placeholder price */}
            <div className="w-20 h-6 bg-gray-300 animate-pulse rounded-md"></div> {/* Placeholder discount */}
          </div>
        </div>
      </div>
    </div>
  );




  const { addToWishlist } = useWishlist();

  return (
    <div className="px-4 md:px-20 mx-auto max-w-screen-2xl">
      <div className="flex flex-wrap gap-0 mt-8">
        {loading
          ? Array(8).fill(null).map((_, index) => <SkeletonLoader key={index} />)
          : products.map((product) => (
            <div key={product._id} className="w-full sm:w-1/2 md:w-[50%] lg:w-1/4 p-3 group">
              <Link href={`/productDetail/${product._id}`}>
                <div className="bg-[#F4F5F7] overflow-hidden relative">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-300"
                    width={500}
                    height={500}
                  />
                  <div
                    className={`absolute top-2 right-2 w-11 h-11 rounded-full flex items-center justify-center text-white text-xs  
                        ${product.isNew ? 'bg-[#2EC1AC] text-black' : 'bg-[#E97171]'}`}
                  >
                    {product.isNew ? "New" : "Used"}
                  </div>

                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3">
                    <button
                      className="bg-white text-[#B88E2F] px-6 py-2 font-semibold hover:bg-slate-50"
                      onClick={(e) => {
                        e.preventDefault()
                        addToCart(product)
                      }}
                    >
                      Add to Cart
                    </button>

                    <div className="flex gap-4">
                      <button className="flex gap-1 items-center text-white">
                        <FaShare className="text-md" />
                        <span className="text-sm">Share</span>
                      </button>

                      <button
                        className="flex gap-1 items-center text-white"
                        onClick={(e) => {
                          e.preventDefault()
                          addToWishlist(product)
                        }}
                      >
                        <FaHeart
                          className={`text-md text-white}`}
                        />
                        <span className="text-sm">Wishlist</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{product.title}</h2>
                    <p className="text-[#898989] font-[540] mt-2">
                      {product.description.slice(0, 40)}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold mt-2">$ {product.price}.00</p>
                      <p className="text-md mt-2 line-through text-[#B0B0B0]">
                        $ {(product.price - (product.price * (product.discountPercentage || 0) / 100)).toFixed(2)}
                      </p>
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
