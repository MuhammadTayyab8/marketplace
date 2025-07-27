'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png'
import user from '../../public/user.png'
import search from '../../public/search.png'
import heart from '../../public/heart.png'
import cart from '../../public/cart.png'
import { useCart } from '@/components/CartContext'; // Import the useCart hook
import { useWishlist } from './WishlistContext';
import { client } from '@/sanity/lib/client';
import { IoSearchSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';



export default function Navbar() {

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

  const router = useRouter();


  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [link, setLink] = useState<string>('')

  useEffect(() => {


    const fetchUserData = async () => {
      try {

        const res = await fetch("/api/get-user");
        const data = await res.json();
        const role = data?.role;

        if (!role) {
          router.push("/");
          return;
        }

        if(role.toLowerCase() == "admin"){
          setLink('/dashboard')
        } else {
          setLink('/profile')
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);


  const { state } = useCart(); // Get the cart state from context

  const { wishlist } = useWishlist();
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    setWishlistCount(wishlist.length);
  }, [wishlist]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);




  useEffect(() => {
    const productFetching = async () => {
      const query = `*[_type == "product"]{
        _id,
        title,
        description,
        price,
        discountPercentage,
        isNew,
        tags,
        "imageUrl": image.asset->url
      }`;
      const productApi = await client.fetch(query);
      setProducts(productApi);
      setFilteredProducts(productApi);
      setLoading(false);
    };
    productFetching();
  }, []);




  return (

    <nav className="bg-white shadow-sm fixed w-full z-10 top-0">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Link href={link}><Image src={user} alt='user-icon' className="text-gray-800 hover:text-gray-600 w- cursor-pointer" /></Link>
            <Image src={search} alt='search-icon' onClick={() => setIsPanelOpen(true)} className="text-gray-800 hover:text-gray-600 cursor-pointer" />
            {/* <Link href='/wishlist'><Image src={heart} alt='heart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" /></Link> */}
            {/* <Link href='/cart'><Image src={cart} alt='cart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" /></Link> */}
            <button className="text-gray-600 hover:text-gray-900 text-2xl relative">
              <Link href="/wishlist">
                <Image src={heart} alt='cart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" />
              </Link>
              <div
                className={`bg-slate-900 text-center h-5 rounded-full text-white text-xs absolute -top-2 left-4 flex items-center justify-center ${wishlistCount > 9 ? "w-6 px-1" : "w-5"
                  }`}
              >
                {wishlistCount}
              </div>
            </button>


            <button className="text-gray-600 hover:text-gray-900 text-2xl relative">
              <Link href="/cart">
                <Image src={cart} alt='cart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" />
              </Link>
              <div
                className={`bg-slate-900 text-center h-5 rounded-full text-white text-xs absolute -top-2 left-4 flex items-center justify-center ${state.items.length > 9 ? 'w-6 px-1' : 'w-5'
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
          <div className="flex flex-col space-y-4 p-4 border-t">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <div className="text-gray-800 hover:text-gray-600">Home</div>
            </Link>
            <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
              <div className="text-gray-800 hover:text-gray-600">Shop</div>
            </Link>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)}>
              <div className="text-gray-800 hover:text-gray-600">Blog</div>
            </Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <div className="text-gray-800 hover:text-gray-600">Contact</div>
            </Link>

            <div className="flex gap-6 pt-8 pb-8" onClick={() => setIsMenuOpen(false)}>
              <Link href='/sign-up'><Image src={user} alt='user-icon' className="text-gray-800 hover:text-gray-600 w- cursor-pointer" /></Link>
              <Image src={search} alt='search-icon' onClick={() => setIsPanelOpen(true)} className="text-gray-800 hover:text-gray-600 cursor-pointer" />
              <button className="text-gray-600 hover:text-gray-900 text-2xl relative">
                <Link href="/wishlist">
                  <Image src={heart} alt='cart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" />
                </Link>
                <div
                  className={`bg-slate-900 text-center h-5 rounded-full text-white text-xs absolute -top-2 left-4 flex items-center justify-center ${wishlistCount > 9 ? "w-6 px-1" : "w-5"
                    }`}
                >
                  {wishlistCount}
                </div>
              </button>
              {/* <Link href='/cart'><Image src={cart} alt='cart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" /></Link> */}
              <button className="text-gray-600 hover:text-gray-900 text-2xl relative">
                <Link href="/cart">
                  <Image src={cart} alt='cart-icon' className="text-gray-800 hover:text-gray-600 cursor-pointer" />
                </Link>
                <div
                  className={`bg-slate-900 text-center h-5 rounded-full text-white text-xs absolute -top-2 left-4 flex items-center justify-center ${state.items.length > 9 ? 'w-6 px-1' : 'w-5'
                    }`}
                >
                  {state.items.length}
                </div>
              </button>

            </div>

          </div>
        </div>
      )}



      {/* Sliding Search Panel */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isPanelOpen ? "block" : "hidden"
          }`}
        onClick={() => setIsPanelOpen(false)}
      ></div>

      <div
        className={`overflow-y-auto fixed top-0 right-0 h-full w-[310px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${isPanelOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 relative h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Search</h1>
            <button
              onClick={() => setIsPanelOpen(false)}
              className="text-gray-800 hover:text-gray-600 absolute right-4 text-3xl"
            >
              &times;
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mt-8">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full pl-10"
            />
            {/* Search Icon */}
            <IoSearchSharp className='absolute left-3 top-3 w-5 h-5 text-gray-500' />
          </div>

          {/* Search Results */}
          <div className="mt-4 flex-grow ">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link href={`/productDetail/${product._id}`} key={product._id}>
                  <div
                    className="flex items-center space-x-4 border-b border-gray-200 py-2"
                    onClick={() => setIsPanelOpen(false)}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-md"
                      loading="lazy" // Lazy loading for images
                      width={500}
                      height={600}
                    />
                    <div>
                      <h4 className="text-sm font-medium">{product.title}</h4>
                      <p className="text-gray-600 text-xs">${product.price}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : searchQuery.trim() ? (
              <p className="text-gray-600 text-left mt-5">No products found</p>
            ) : (
              <p className="text-gray-600 text-left mt-5">Start searching...</p>
            )}
          </div>
        </div>
      </div>



    </nav>

  );
}
