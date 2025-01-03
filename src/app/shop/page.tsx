'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import hero from '../../../public/shop-hero.png';
import { FaAngleRight } from 'react-icons/fa6';
import Products from '@/components/Products';
import icon1 from '../../../public/filter.png';
import Qualities from '@/components/Qualities';
import heroIcon from '../../../public/icon-hero.png';
import Link from 'next/link';

const page = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.src})` }}
      >
        <div className="absolute inset-0 items-center flex justify-center">
          <div className="text-center text-black justify-center">
            <div className="flex justify-center">
              <Image src={heroIcon} alt="hero-icon" />
            </div>
            <h1 className="text-4xl font-bold">Shop</h1>
            <div className="flex">
              <Link href="/">
                <p className="mt-4 text-lg flex justify-center items-center gap-3 font-bold">
                  Home <FaAngleRight /> <span className="font-thin">Shop</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section with Sidebar */}
      <div className="flex flex-wrap justify-between items-center bg-[#F9F1E7] w-full px-4 md:px-20 py-3 gap-4">
        <div className="flex items-center flex-wrap gap-2 md:gap-4">
          {/* Filter Icon */}
          <span className="flex gap-2 items-center cursor-pointer" onClick={handleFilterClick}>
            <Image
              src={icon1}
              alt="icon-1"
              className="w-5 h-5 sm:w-auto sm:h-auto"
            />
            <p className="text-sm md:text-md font-bold">Filter</p>
          </span>

          {/* Results Info */}
          <span className="border-l border-black pl-2 sm:pl-4">
            <p className="text-[12px] md:text-base">Showing 1 - 16 of 35 results</p>
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-between flex-wrap gap-4 md:gap-5">
          <span className="flex gap-2 items-center">
            <p className="font-bold text-sm md:text-base">Show</p>
            <p className="text-[#9F9F9F] bg-white px-4 py-2 md:py-3 text-sm md:text-base">16</p>
          </span>
          <span className="flex gap-2 items-center">
            <p className="font-bold text-sm md:text-base">Sort by</p>
            <p className="text-[#9F9F9F] bg-white px-6 py-2 md:py-3 text-sm md:text-base">Default</p>
          </span>
        </div>
      </div>

      {/* Filter Sidebar (Slide-in from the left) */}
      {/* Filter Sidebar (Slide-in from the left) */}
{isFilterOpen && (
  <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-start">
    <div className="bg-white w-80 p-6 space-y-4 transform transition-transform duration-300 ease-in-out overflow-y-auto max-h-full">
      <h2 className="text-xl font-semibold">Filters</h2>
      {/* Add your filter options here */}
      <div className="space-y-2">
        <div className="flex flex-col justify-between pb-4 mb-4">
          {["Dinning", "Beds", "Sofa"].map((category) => (
            <div key={category} className="flex justify-between items-center pb-4 mb-4 text-gray-600 cursor-pointer">
              <span>{category}</span>
              <FaAngleRight />
            </div>
          ))}
        </div>

        {/* Price Filter */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-xl font-bold flex-grow mb-2">Price</h1>
          <input
            type="range"
            min="50"
            max="200"
            className="w-full h-2 bg-black appearance-none rounded-full"
          />
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 24px;
              height: 24px;
              background: black;
              border: 2px solid white;
              border-radius: 50%;
              cursor: pointer;
            }
            input[type="range"]::-moz-range-thumb {
              width: 24px;
              height: 24px;
              background: black;
              border: 2px solid white;
              border-radius: 50%;
              cursor: pointer;
            }
            input[type="range"]::-ms-thumb {
              width: 24px;
              height: 24px;
              background: black;
              border: 2px solid white;
              border-radius: 50%;
              cursor: pointer;
            }
          `}</style>
          <div className="flex justify-between text-black mt-2 text-md font-bold">
            <span>$50</span>
            <span>$200</span>
          </div>
        </div>

        {/* Color Filter */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-xl font-bold flex-grow mb-2">Colors</h1>
          <div className="flex gap-2">
            {["red-500", "blue-500", "yellow-500", "green-500"].map((color) => (
              <span
                key={color}
                className={`w-6 h-6 bg-${color} rounded-full border cursor-pointer`}
              ></span>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-xl font-bold flex-grow mb-2">Size</h1>
          <div className="flex flex-wrap gap-3">
            {["L", "XL", "2XL"].map((size) => (
              <span
                key={size}
                className="py-2 px-6 rounded-full border border-gray-300 text-gray-600 cursor-pointer"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        

        <button className="mt-6 w-full py-2 bg-[#B88E2F] text-white rounded-full" onClick={() => setIsFilterOpen(false)}>
          Apply Filter
        </button>
      </div>
    </div>
  </div>
)}


      {/* Products Section */}
      <Products />

      <div className="-mt-8 pb-8">
        <Products />
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center py-5 gap-4 cursor-pointer pb-8">
        <span className="flex items-center justify-center">
          <p className="text-white bg-[#B88E2F] w-10 h-10 flex items-center justify-center rounded-lg">1</p>
        </span>

        <span className="flex items-center justify-center">
          <p className="text-black bg-[#F9F1E7] w-10 h-10 flex items-center justify-center rounded-lg">2</p>
        </span>

        <span className="flex items-center justify-center">
          <p className="text-black bg-[#F9F1E7] w-10 h-10 flex items-center justify-center rounded-lg">3</p>
        </span>

        <span className="flex items-center justify-center">
          <p className="text-black bg-[#F9F1E7] w-20 h-10 flex items-center justify-center rounded-lg">Next</p>
        </span>
      </div>

      {/* Quality Section */}
      <Qualities />
    </div>
  );
};

export default page;
