'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import heroIcon from '../../../public/icon-hero.png'
import hero from '../../../public/shop-hero.png'
import { FaAngleRight } from "react-icons/fa6";
import Qualities from '@/components/Qualities';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';



const page = () => {

 const { state: { items }, dispatch } = useCart();


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);


  return (
    <div>
        <div className="relative w-full h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${hero.src})` }}>

{/* Text Content */}
<div className="absolute inset-0  items-center flex justify-center">
  <div className="text-center text-black justify-center">
     <div className='flex justify-center'> <Image src={heroIcon} alt='hero-icon'/></div>
    <h1 className="text-4xl font-bold">Checkout</h1>
    <div className='flex '>
      <Link href='/'>
    <p className="mt-4 text-lg flex justify-center items-center gap-3 font-bold">Home <FaAngleRight /> <span className='font-thin'>Checkout</span> </p>
    </Link>
    </div>
  </div>
</div>
</div>


{/* checkout start  */}

<div className="flex justify-between flex-wrap px-4 sm:px-12 md:px-20 py-8 space-x-8">
  {/* Left Side - Billing Details */}
  <div className="w-full md:w-[45%] space-y-6">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Billing Details</h1>

    {/* First Name and Last Name */}
    <div className="flex space-x-6">
      <div className="flex-1">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex-1">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
    </div>

    {/* Company Name */}
    <div>
      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
        Company Name
      </label>
      <input
        type="text"
        id="company"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
    </div>

    {/* Street Address */}
    <div>
      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
        Street Address
      </label>
      <input
        type="text"
        id="streetAddress"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
    </div>

    <div>
      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
        Town/ City
      </label>
      <input
        type="text"
        id="Town/ City"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
    </div>

    <div>
      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
       Province
      </label>
      <input
        type="text"
        id="Town/ City"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
    </div>

    <div>
      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
        Postal Address
      </label>
      <input
        type="text"
        id="Town/ City"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
    </div>

    <div>
      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
        Zip Code
      </label>
      <input
        type="text"
        id="Town/ City"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
    </div>

    <div>
      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
        Phone 
      </label>
      <input
        type="text"
        id="Town/ City"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
    </div>

    <div>
      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
        E mail
      </label>
      <input
        type="text"
        id="Town/ City"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
    </div>

    
  </div>

  {/* Right Side - Order Summary */}
  <div className="w-full md:w-[45%]  p-6 rounded-md pl-0 ml-0 sm:p-6">
    <div className='flex justify-between items-center pb-4'>
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Product</h1>
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Subtotal</h1>
    </div>


    {/* Product List */}
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between items-center py-2 border-b">
                <p className="text-sm font-medium text-gray-700">
                  {item.title} x {item.quantity}
                </p>
                <p className="text-sm font-semibold text-gray-700">Rs. {item.price * item.quantity}</p>
              </div>
                    ))}
    </div>
    <div className="space-y-4 mt-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="font-semibold text-gray-700">Rs. {total}</p>
            </div>
            <div className="flex justify-between py-2 border-b">
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-bold text-[#B88E2F] text-xl">Rs. {total}</p>
            </div>
          </div>

    {/* Payment Options */}
    <div className="mt-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Payment Options</h2>
      <div className="space-y-4">
        {/* Radio Button 1 */}
        <div className="flex items-center">
          <input
            type="radio"
            id="bankTransfer"
            name="payment"
            className="mr-2"
          />
          <label htmlFor="bankTransfer" className="text-sm text-gray-700">Direct Bank Transfer</label>
        </div>
        <p className="text-xs text-gray-500">Some text explaining bank transfer</p>
        {/* Radio Button 2 */}
        <div className="flex items-center">
          <input
            type="radio"
            id="bankTransfer"
            name="payment"
            className="mr-2"
          />
          <label htmlFor="bankTransfer" className="text-sm text-gray-700">Direct Bank Transfer</label>
        </div>



        {/* Radio Button 3 */}
        <div className="flex items-center">
          <input
            type="radio"
            id="cod"
            name="payment"
            className="mr-2"
          />
          <label htmlFor="cod" className="text-sm text-gray-700">Cash on Delivery</label>
        </div>
        <p className="text-xs text-gray-500">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>
      </div>
    </div>

    {/* Button - Place Order */}
    <div className="mt-6">
    <button
        className="w-full py-3 text-black border border-black font-semibold rounded-md transition"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
    {/* Modal */}
    {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Order Placed!</h2>
            <p className="text-gray-600 mb-6">
              Your order has been successfully placed. Thank you!
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
              <Link href="/">
                <button className="px-4 py-2 text-white bg-black rounded-md">
                  Go to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
  </div>
</div>


{/* checkout end  */}


<Qualities/>

    </div>
  )
}

export default page