'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png'
import user from '../../public/user.png'
import search from '../../public/search.png'
import heart from '../../public/heart.png'
import cart from '../../public/cart.png'
import { useCart } from '@/components/CartContext'; // Import the useCart hook




export default function Navbar() {

  const { state } = useCart(); // Get the cart state from context


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src={logo} alt='logo' />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/">
              <div className="text-black hover:text-gray-800 font-medium">Home</div>
            </Link>
            <Link href="/shop">
              <div className="text-black hover:text-gray-800 font-medium">Shop</div>
            </Link>
            <Link href="/blog">
              <div className="text-black hover:text-gray-800 font-medium">Blog</div>
            </Link>
            <Link href="/contact">
              <div className="text-black hover:text-gray-800 font-medium">Contact</div>
            </Link>
          </div>

           {/* Icons */}
           <div className="hidden md:flex items-center space-x-8">
            <Link href='contact'><Image src={user} alt='user-icon' className="text-gray-800 hover:text-gray-600 w- cursor-pointer"/></Link>
            <Link href='/'><Image src={search} alt='search-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" /></Link>
            <Link href='/'><Image src={heart} alt='heart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" /></Link>
            {/* <Link href='/cart'><Image src={cart} alt='cart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" /></Link> */}
            <button className="text-gray-600 hover:text-gray-900 text-2xl relative">
        <Link href="/cart">
        <Image src={cart} alt='cart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" />
        </Link>
        <div
          className={`bg-slate-900 text-center h-5 rounded-full text-white text-xs absolute -top-2 left-4 flex items-center justify-center ${
            state.items.length > 9 ? 'w-6 px-1' : 'w-5'
          }`}
        >
          {state.items.length}
        </div>
      </button>
          
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <span className="text-3xl">&times;</span>
              ) : (
                <span className="text-2xl">&#9776;</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-sm">
          <div className="flex flex-col space-y-4 p-4">
            <Link href="/" onClick={()=> setIsMenuOpen(false)}>
              <div className="text-gray-800 hover:text-gray-600">Home</div>
            </Link>
            <Link href="/shop" onClick={()=> setIsMenuOpen(false)}>
              <div className="text-gray-800 hover:text-gray-600">Shop</div>
            </Link>
            <Link href="/blog" onClick={()=> setIsMenuOpen(false)}>
              <div className="text-gray-800 hover:text-gray-600">Blog</div>
            </Link>
            <Link href="/contact" onClick={()=> setIsMenuOpen(false)}>
              <div className="text-gray-800 hover:text-gray-600">Contact</div>
            </Link>
            <div className="flex gap-5  pt-8 pb-8" onClick={()=> setIsMenuOpen(false)}>
            <Link href='contact'><Image src={user} alt='user-icon' className="text-gray-800 hover:text-gray-600 w- cursor-pointer"/></Link>
            <Link href='/blog'><Image src={search} alt='search-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" /></Link>
            <Link href='/'><Image src={heart} alt='heart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" /></Link>
            {/* <Link href='/cart'><Image src={cart} alt='cart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" /></Link> */}
            <button className="text-gray-600 hover:text-gray-900 text-2xl relative">
        <Link href="/cart">
        <Image src={cart} alt='cart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" />
        </Link>
        <div
          className={`bg-slate-900 text-center h-5 rounded-full text-white text-xs absolute -top-2 left-4 flex items-center justify-center ${
            state.items.length > 9 ? 'w-6 px-1' : 'w-5'
          }`}
        >
          {state.items.length}
        </div>
      </button>
         
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
