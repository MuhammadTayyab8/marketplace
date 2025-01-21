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




      {/* Products Section */}
      <Products />


      {/* Quality Section */}
      <Qualities />
    </div>
  );
};

export default page;
