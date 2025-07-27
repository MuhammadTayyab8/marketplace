'use client';
import React from 'react';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';
import { FaAngleRight, FaTrashCan } from 'react-icons/fa6';
import Link from 'next/link';
import Qualities from '@/components/Qualities';
import heroIcon from '../../../public/icon-hero.png'
import hero from '../../../public/shop-hero.png'



const CartPage = () => {
  const { state: { items }, dispatch } = useCart();

  const handleRemove = (_id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { _id } });
  };

  const handleQuantityChange = (_id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { _id, quantity } });
    }
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${hero.src})` }}>

        {/* Text Content */}
        <div className="absolute inset-0  items-center flex justify-center">
          <div className="text-center text-black justify-center">
            <div className='flex justify-center'> <Image src={heroIcon} alt='hero-icon' /></div>
            <h1 className="text-4xl font-bold">Cart</h1>
            <div className='flex '>
              <Link href='/'>
                <p className="mt-4 text-lg flex justify-center items-center gap-3 font-bold">Home <FaAngleRight /> <span className='font-thin'>Cart</span> </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="px-4 sm:px-20 py-8 mx-auto max-w-screen-2xl">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Cart is Empty</h2>
            <Link href="/shop">
              <button className="text-white bg-[#B88E2F] px-6 py-3 rounded-md">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Cart Items */}
            <div className="w-full md:w-[80%] space-y-6">
              <div className="hidden sm:flex justify-between bg-[#F9F1E7] py-3 px-10 font-semibold text-black">
                <p>Products</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Subtotal</p>
              </div>
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                      width={300}
                      height={300}
                    />
                    <p className="font-medium text-black">{item.title}</p>
                  </div>
                  <p className="text-gray-500">RS. {item.price}</p>
                  <div className="flex items-center">
                    <button
                      className="px-2 border border-gray-300 rounded-l-md"
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="w-12 text-center border-y border-gray-300"
                      onChange={(e) => handleQuantityChange(item._id, +e.target.value)}
                    />
                    <button
                      className="px-2 border border-gray-300 rounded-r-md"
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-gray-700">RS. {item.price * item.quantity}</p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-[#B88E2F] hover:text-red-600"
                  >
                    <FaTrashCan />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Totals */}
            <div className="w-full md:w-5/12 bg-[#F9F1E7] p-10 px-14 h-full">
              <h1 className="text-2xl font-bold text-black mb-6 text-center">Cart Totals</h1>
              <div className="space-y-4">
                <div className="flex justify-between pb-3">
                  <p className="text-black font-normal">Subtotal</p>
                  <p className="font-normal text-gray-600">RS. {total}</p>
                </div>

                <div className="flex justify-between border-b border-black pb-3">
                  <p className="text-black font-normal">Shipment Charges</p>
                  <p className="font-normal text-gray-600">FREE</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-black font-bold text-lg">Total</p>
                  <p className="text-lg font-bold text-[#B88E2F]">RS. {total}</p>
                </div>
              </div>
              <Link href="/checkout">
                <button className="w-full mt-6 border-2 border-black text-black py-3 rounded-md font-semibold">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Qualities Section */}
      <Qualities />
    </div>
  );
};

export default CartPage;
