import React from 'react'
import Image from 'next/image'
import heroIcon from '../../../public/icon-hero.png'
import hero from '../../../public/shop-hero.png'
import { FaAngleRight, FaMagnifyingGlass } from "react-icons/fa6";
import blog1 from '../../../public/blog-1.png'
import blog2 from '../../../public/blog-2.png'
import blog3 from '../../../public/blog-3.png'
import admin from '../../../public/admin.png'
import calender from '../../../public/calender.png'
import category from '../../../public/category.png'
import productImage1 from '../../../public/product1.png';
import productImage2 from '../../../public/product2.png';
import productImage3 from '../../../public/product3.png';
import Qualities from '@/components/Qualities';
import Link from 'next/link';



const page = () => {
  return (
    <div>
      <div className="relative w-full h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${hero.src})` }}>

        {/* Text Content */}
        <div className="absolute inset-0  items-center flex justify-center">
          <div className="text-center text-black justify-center">
            <div className='flex justify-center'> <Image src={heroIcon} alt='hero-icon' /></div>
            <h1 className="text-4xl font-bold">Blog</h1>
            <div className='flex '>
              <Link href='/'>
                <p className="mt-4 text-lg flex justify-center items-center gap-3 font-bold">Home <FaAngleRight /> <span className='font-thin'>Blog</span> </p>
              </Link>
            </div>
          </div>
        </div>
      </div>


      <div className='mx-auto max-w-screen-2xl px-4 md:px-20 py-8'>

        {/* Blog Page Start */}
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Section: Blog List */}
            <div className="lg:col-span-2 space-y-8">
              {/* Blog 1 */}
              <div>
                <Image src={blog1} alt="Blog Image" className="w-full h-[400px] object-cover rounded-md mb-4" />
                <div className="space-y-2">
                  <div className='flex items-center gap-4'>
                    <div className="flex items-center gap-2">
                      <Image src={admin} alt="Profile Icon" />
                      <p className="text-sm text-gray-600">Admin</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <Image src={calender} alt="Calendar Icon" />
                      <p className="text-sm text-gray-600">January 12, 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src={category} alt="Category Icon" />
                      <p className="text-sm text-gray-600">Technology</p>
                    </div>
                  </div>
                  <h1 className='text-2xl font-bold py-2'>Going all-in with millennial design</h1>
                  <p className="text-sm text-gray-600 mt-2 pb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, id, sequi culpa cupiditate doloremque iusto, consectetur veritatis alias asperiores ad obcaecati cumque aliquam nisi omnis aspernatur. Sit deleniti officia in!
                    Quae illum nobis rerum dignissimos voluptate, distinctio perspiciatis quaerat error voluptatem temporibus praesentium explicabo quam quasi ducimus neque accusamus magnam excepturi debitis dicta, optio, possimus molestias cumque assumenda. Alias, sunt!...</p>
                  <a href="#" className="font-semibold border-b border-black py-2 mt-3 ">Read More</a>
                </div>
              </div>

              {/* Blog 2 */}
              <div>
                <Image src={blog2} alt="Blog Image" className="w-full h-[400px] object-cover rounded-md mb-4" />
                <div className="space-y-2">
                  <div className='flex items-center gap-4'>
                    <div className="flex items-center gap-2">
                      <Image src={admin} alt="Profile Icon" />
                      <p className="text-sm text-gray-600">Admin</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <Image src={calender} alt="Calendar Icon" />
                      <p className="text-sm text-gray-600">January 12, 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src={category} alt="Category Icon" />
                      <p className="text-sm text-gray-600">Technology</p>
                    </div>
                  </div>
                  <h1 className='text-2xl font-bold py-2'>Going all-in with millennial design</h1>
                  <p className="text-sm text-gray-600 mt-2 pb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, id, sequi culpa cupiditate doloremque iusto, consectetur veritatis alias asperiores ad obcaecati cumque aliquam nisi omnis aspernatur. Sit deleniti officia in!
                    Quae illum nobis rerum dignissimos voluptate, distinctio perspiciatis quaerat error voluptatem temporibus praesentium explicabo quam quasi ducimus neque accusamus magnam excepturi debitis dicta, optio, possimus molestias cumque assumenda. Alias, sunt!...</p>
                  <a href="#" className="font-semibold border-b border-black py-2 mt-3 ">Read More</a>
                </div>
              </div>

              {/* Blog 3 */}
              <div>
                <Image src={blog3} alt="Blog Image" className="w-full h-[400px] object-cover rounded-md mb-4" />
                <div className="space-y-2">
                  <div className='flex items-center gap-4'>
                    <div className="flex items-center gap-2">
                      <Image src={admin} alt="Profile Icon" />
                      <p className="text-sm text-gray-600">Admin</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <Image src={calender} alt="Calendar Icon" />
                      <p className="text-sm text-gray-600">January 12, 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src={category} alt="Category Icon" />
                      <p className="text-sm text-gray-600">Technology</p>
                    </div>
                  </div>
                  <h1 className='text-2xl font-bold py-2'>Going all-in with millennial design</h1>
                  <p className="text-sm text-gray-600 mt-2 pb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, id, sequi culpa cupiditate doloremque iusto, consectetur veritatis alias asperiores ad obcaecati cumque aliquam nisi omnis aspernatur. Sit deleniti officia in!
                    Quae illum nobis rerum dignissimos voluptate, distinctio perspiciatis quaerat error voluptatem temporibus praesentium explicabo quam quasi ducimus neque accusamus magnam excepturi debitis dicta, optio, possimus molestias cumque assumenda. Alias, sunt!...</p>
                  <a href="#" className="font-semibold border-b border-black py-2 mt-3 ">Read More</a>
                </div>
              </div>
            </div>

            {/* Right Section: Sidebar */}
            <div className="space-y-8">
              {/* Search Bar */}
              <div>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-3 pl-10 border border-black rounded-md"
                  />
                  <FaMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                </div>
              </div>

              {/* Categories */}
              <div className='px-2 sm:px-10'>
                <h1 className="text-2xl font-semibold mb-4">Categories</h1>
                <ul className="space-y-2">
                  <li className='flex items-center justify-between'><p className="text-md text-[#9F9F9F] font-bold">Technology</p> <p className="text-md text-[#9F9F9F] font-bold">3</p></li>
                  <li className='flex items-center justify-between'><p className="text-md text-[#9F9F9F] font-bold">Design</p> <p className="text-md text-[#9F9F9F] font-bold">5</p></li>
                  <li className='flex items-center justify-between'><p className="text-md text-[#9F9F9F] font-bold">Marketing</p> <p className="text-md text-[#9F9F9F] font-bold">3</p></li>
                  <li className='flex items-center justify-between'><p className="text-md text-[#9F9F9F] font-bold">Lifestyle</p> <p className="text-md text-[#9F9F9F] font-bold">2</p></li>
                </ul>
              </div>

              {/* Recent Posts */}
              <div className='px-2 sm:px-10'>
                <h1 className="text-2xl font-semibold mb-4">Recent Posts</h1>
                <div className="space-y-4">
                  {/* Post 1 */}
                  <div className="flex items-center gap-4">
                    <Image src={productImage1} alt="Post Image" className="w-[80px] h-[80px] object-cover rounded-md" />
                    <div>
                      <h2 className="text-md font-semibold">Going all-in with millennial design</h2>
                      <p className="text-sm text-gray-600">January 12, 2024</p>
                    </div>
                  </div>

                  {/* Post 2 */}
                  <div className="flex items-center gap-4">
                    <Image src={productImage2} alt="Post Image" className="w-[80px] h-[80px] object-cover rounded-md" />
                    <div>
                      <h2 className="text-md font-semibold">Going all-in with millennial design</h2>
                      <p className="text-sm text-gray-600">January 14, 2024</p>
                    </div>
                  </div>

                  {/* Post 3 */}
                  <div className="flex items-center gap-4">
                    <Image src={productImage3} alt="Post Image" className="w-[80px] h-[80px] object-cover rounded-md" />
                    <div>
                      <h2 className="text-md font-semibold">Going all-in with millennial design</h2>
                      <p className="text-sm text-gray-600">January 16, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Blog Page End */}


        <div className='flex justify-center items-center gap-4 cursor-pointer pb-8'>
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

      </div>

      <Qualities />



    </div>
  )
}

export default page