'use client';
import React from 'react';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';
import { FaAngleRight, FaTrashCan } from 'react-icons/fa6';
import Link from 'next/link';
import Qualities from '@/components/Qualities';

const CartPage = () => {
  const { state: { items }, dispatch } = useCart();

  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(/shop-hero.png)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-black">
            <h1 className="text-4xl font-bold">Cart</h1>
            <Link href="/">
              <p className="mt-4 text-lg flex justify-center items-center gap-3 font-bold">
                Home <FaAngleRight /> <span className="font-thin">Cart</span>
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="px-4 sm:px-20 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Cart is Empty</h2>
            <Link href="/shop">
              <button className="text-white bg-black px-6 py-3 rounded-md">
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
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
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
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="w-12 text-center border-y border-gray-300"
                      onChange={(e) => handleQuantityChange(item.id, +e.target.value)}
                    />
                    <button
                      className="px-2 border border-gray-300 rounded-r-md"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-gray-700">RS. {item.price * item.quantity}</p>
                  <button
                    onClick={() => handleRemove(item.id)}
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
      <div className="flex justify-between">
        <p className="text-black font-bold">Subtotal</p>
        <p className="font-medium text-[#9F9F9F]">RS. {total}</p>
      </div>

      <div className="flex justify-between">
        <p className="text-black font-bold">Total</p>
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
