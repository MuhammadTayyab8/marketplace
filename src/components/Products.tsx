'use client'

import Image from 'next/image';
import { FaShare, FaHeart, FaAngleRight } from "react-icons/fa6";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/CartContext';
import { client } from '@/sanity/lib/client';
import icon1 from '../../public/filter.png';
import { useWishlist } from "@/components/WishlistContext";



export default function Products() {


  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };


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
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [productsPerPage] = useState(20); // Show 20 products per page
  const { dispatch } = useCart(); // Get dispatch from context
  // Filter states
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);




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

      const amountQuery = `*[_type == "product"] | order(price desc)[0].price`

      const productApi = await client.fetch(query);
      const maxAmount = await client.fetch(amountQuery)

      setPriceRange([0, maxAmount])

      setProducts(productApi);
      setFilteredProducts(productApi);
      setLoading(false); // Set loading to false once the data is fetched
    };
    productFetching();
  }, []);

  // Define the addToCart function
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

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

  // Calculate the current products to show
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination button handler
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Calculate the range of products for the "Showing X of Y" text
  const startProduct = indexOfFirstProduct + 1;
  const endProduct = Math.min(indexOfLastProduct, filteredProducts.length);


  const { addToWishlist } = useWishlist();




  // Filter products whenever a filter state changes
  useEffect(() => {
    let filtered = products;

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((product) =>
        selectedTags.some((tag) => product.tags.includes(tag))
      );
    }

    // Filter by price
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by condition
    if (selectedCondition !== null) {
      filtered = filtered.filter((product) =>
        selectedCondition === 'NEW' ? product.isNew : !product.isNew
      );
    }

    setFilteredProducts(filtered);
  }, [selectedTags, priceRange, selectedCondition, products]);


  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };


  return (
    <div className="mx-auto max-w-screen-2xl">
      {/* Flexbox container */}



      {/* Filter Section with Sidebar */}
      <div className=" flex flex-wrap justify-between items-center bg-[#F9F1E7] w-full px-4 md:px-20 py-5 gap-4">
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
            <p className="text-[12px] md:text-base"> Showing {startProduct} - {endProduct} of {filteredProducts.length} results</p>
          </span>
        </div>


      </div>

      {/* Filter Sidebar (Slide-in from the left) */}
      {/* Filter Sidebar (Slide-in from the left) */}

      {isFilterOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-start">
          <div className="bg-white w-80 p-6 space-y-4 transform transition-transform duration-300 ease-in-out overflow-y-auto max-h-full">
            <div className="flex justify-between pb-6 border-b">
              <h2 className="text-xl font-semibold">Filters</h2>
              <span
                className="text-xl font-semibold cursor-pointer"
                onClick={() => setIsFilterOpen(false)}
              >
                &times;
              </span>
            </div>
            {/* Filter Options */}
            <div className="space-y-2">
              <div className="flex flex-col justify-between">
                {['Home Decor', 'craftsmanship', 'Luxury', 'chair', 'modern', 'fancy'].map(
                  (category) => (
                    <div
                      key={category}
                      className={`flex border-b justify-between items-center py-2 text-gray-600 cursor-pointer ${selectedTags.includes(category) ? 'text-black font-bold' : ''
                        }`}
                      onClick={() => toggleTag(category)}
                    >
                      <span>{category}</span>
                      <FaAngleRight />
                    </div>
                  )
                )}
              </div>

              {/* Price Filter */}
              <div className="border-b pb-4 mb-4">
                <h1 className="text-xl font-bold flex-grow mb-2">Price</h1>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([50, +e.target.value])}
                  className="w-full h-2 bg-black appearance-none rounded-full"
                />
                <div className="flex justify-between text-black mt-2 text-md font-bold">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Condition Filter */}
              <div className="border-b pb-4 mb-4">
                <h1 className="text-xl font-bold flex-grow mb-2">Condition</h1>
                <div className="flex flex-wrap gap-3">
                  {['NEW', 'USED'].map((condition) => (
                    <span
                      key={condition}
                      className={`py-2 px-6 rounded-full border ${selectedCondition === condition
                        ? 'border-black text-black'
                        : 'border-gray-300 text-gray-600'
                        } cursor-pointer`}
                      onClick={() =>
                        setSelectedCondition(
                          selectedCondition === condition ? null : condition
                        )
                      }
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="mt-6 w-full py-2 bg-[#B88E2F] text-white rounded-full"
                onClick={() => setIsFilterOpen(false)}
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}



      <div className='px-4 md:px-20'>
        <div className="flex flex-wrap gap-0 mt-8">
          {loading ? (
            Array(8)
              .fill(null)
              .map((_, index) => <SkeletonLoader key={index} />) // Render skeletons if loading
          ) : (
            <>
              {filteredProducts.length > 0 ?
                currentProducts.map(product => (
                  <div
                    key={product._id}
                    className="w-full sm:w-1/2 md:w-[50%] lg:w-1/4 p-3 group"
                  >
                    {/* Product card */}
                    <Link href={`/productDetail/${product._id}`}>
                      <div className="bg-[#F4F5F7] overflow-hidden relative">
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-300"
                          width={500}
                          height={500}
                        />
                        {/* Stock Badge */}
                        <div
                          className={`absolute top-2 right-2 w-11 h-11 rounded-full flex items-center justify-center text-white text-xs 
                      ${product.isNew ? "bg-[#2EC1AC] text-black" : "bg-[#E97171]"}`}
                        >
                          {product.isNew ? "New" : "Used"}
                        </div>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3">
                          {/* Add to Cart Button */}
                          <button
                            className="bg-white text-[#B88E2F] px-6 py-2 font-semibold hover:bg-slate-50"
                            onClick={(e) => {
                              e.preventDefault()
                              addToCart(product)
                            }} // Pass product to addToCart
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
                            {/* Wishlist */}
                            <button
                              className="flex gap-1 items-center text-white"
                              onClick={(e) => {
                                e.preventDefault()
                                addToWishlist(product)
                              }}
                            >
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
                            <p className="text-md mt-2 line-through text-[#B0B0B0]">
                              ${" "}
                              {(
                                product.price -
                                (product.price * (product.discountPercentage || 0)) /
                                100
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )) : (
                  <div className="w-full text-center py-8 text-gray-500">
                    No products found
                  </div>
                )
              }
            </>
          )}
        </div>

      </div>







      {/* Pagination Buttons */}
      <div className="flex justify-center items-center py-5 gap-4 cursor-pointer pb-8">
        {[...Array(totalPages)].map((_, index) => (
          <span key={index} className="flex items-center justify-center">
            <p
              className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${currentPage === index + 1
                ? 'bg-[#B88E2F] text-white'
                : 'bg-[#F9F1E7] text-black'
                }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </p>
          </span>
        ))}
        <span className="flex items-center justify-center">
          <p
            className={`w-20 h-10 flex items-center justify-center rounded-lg cursor-pointer ${currentPage === totalPages ? 'bg-[#B88E2F] text-white' : 'bg-[#F9F1E7] text-black'
              }`}
            onClick={() => paginate(currentPage + 1 > totalPages ? totalPages : currentPage + 1)}
          >
            Next
          </p>
        </span>
      </div>
    </div>


  );
}
