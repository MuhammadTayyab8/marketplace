'use client'
import {FaFacebookF, FaTwitter, FaAngleRight, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import logo from '../../../../public/logo.png'


// Define the type for `params`
interface PageProps {
    params: {
        id: string;
    };
}

const Page = ({ params }: PageProps) => {
    const [activeSection, setActiveSection] = useState('reviews'); // Default to 'reviews'
    
    const { dispatch } = useCart();

    const addToCart = () => {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    };


    // const { addToCart } = useCart();

    const [selectedColor, setSelectedColor] = useState<string>(""); // Color
    const [selectedImage, setSelectedImage] = useState<string>(''); // State to hold the selected image
    const [activeImage, setActiveImage] = useState<string>(''); // State to track the active small image
    // Function to handle image click
    const handleImageClick = (image: string) => {
        setSelectedImage(image); // Update the large image when a small image is clicked
        setActiveImage(image); // Update the active state to highlight the selected small image
    };



    const [activeSize, setActiveSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState<any>(null); // State to store the fetched product
    const [loading, setLoading] = useState(true); // State to track loading state
    const [error, setError] = useState<string | null>(null); // State for error messages

    const { id } = params;

    // Handle size selection
    const handleClick = (size: string) => {
        console.log(`Selected size: ${size}`); // Log the selected size
        setActiveSize(size); // Set the active size
    };

    // Handle quantity input change
    const handleQuantityChange = (event: { target: { value: string; }; }) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        } else {
            setQuantity(1); // Prevent negative or invalid inputs
        }
    };

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
                const response = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (err: any) {
                setError('Failed to load product');
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchProduct();
    }, [id]);
    

    if (loading) {
        return (
          <div className="flex justify-center items-center h-[90vh]">
                        <div className="text-xl font-bold text-gray-800 lg:text-2xl">
              <Link href="/" className="hover:text-gray-900">
                <Image src={logo} alt='loading'/>
              </Link>
            </div>
          </div>
        );
      }

    // If error, show error message
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className=''>
  {/* Breadcrumb Navigation */}
  <div className="flex items-center gap-4 bg-[#F9F1E7] px-4 sm:px-20 py-5 pt-[90px] cursor-pointer mb-4">
                <Link href='/'><p className="text-[#9F9F9F]">Home</p></Link>
                <FaAngleRight />
                <Link href='/shop'><p className="text-[#9F9F9F]">Shop</p></Link>
                <FaAngleRight />
                <p>{product.title}</p>


            </div>

            {/* Product Detail Section */}
            <div className="px-4 md:px-20 py-4 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Images */}
                    <div className="space-y-4">
                        <div className="grid sm:flex gap-4 sm:flex-row-reverse">
                            {/* Large Image */}
                            <div>
                                <Image
                                    src={selectedImage || product.image} // Use the selected image for the main large image, default to product.image if selectedImage is null
                                    alt="Product Image"
                                    className="w-[full] h-[300px] sm:h-[500px] object-cover rounded-xl"
                                    width={550}
                                    height={1300}
                                />
                            </div>

                            {/* Small Images */}
                            <div className="flex sm:flex-col gap-2 sm:gap-4 flex-wrap">
                                {/* Small Image 1 (Main Image) */}
                                <Image
                                    src={product.image} // Default to product.image for the first small image
                                    alt="Product Image"
                                    className={`sm:w-[full] w-[85px] h-auto sm:h-auto object-cover rounded-md cursor-pointer ${activeImage === product.image ? 'border-2 border-black' : ''
                                        }`} // Add border for active image
                                    width={120}
                                    height={120}
                                    onClick={() => handleImageClick(product.image)} // Handle click to change large image
                                />

                                {/* Small Image 2 */}
                                <Image
                                    src={product.detailImage1}
                                    alt="Product Detail Image 1"
                                    className={`sm:w-[full] w-[85px] h-auto sm:h-auto object-cover rounded-md cursor-pointer ${activeImage === product.detailImage1 ? 'border-2 border-black' : ''
                                        }`} // Add border for active image
                                    width={120}
                                    height={120}
                                    onClick={() => handleImageClick(product.detailImage1)} // Handle click to change large image
                                />

                                {/* Small Image 3 */}
                                <Image
                                    src={product.detailImage2}
                                    alt="Product Detail Image 2"
                                    className={`sm:w-[full] w-[85px] h-auto sm:h-auto object-cover rounded-md cursor-pointer ${activeImage === product.detailImage2 ? 'border-2 border-black' : ''
                                        }`} // Add border for active image
                                    width={120}
                                    height={120}
                                    onClick={() => handleImageClick(product.detailImage2)} // Handle click to change large image
                                />

                                {/* Small Image 4 */}
                                <Image
                                    src={product.detailImage3}
                                    alt="Product Detail Image 3"
                                    className={`sm:w-[full] w-[85px] h-auto sm:h-auto object-cover rounded-md cursor-pointer ${activeImage === product.detailImage3 ? 'border-2 border-black' : ''
                                        }`} // Add border for active image
                                    width={120}
                                    height={120}
                                    onClick={() => handleImageClick(product.detailImage3)} // Handle click to change large image
                                />
                            </div>
                        </div>
                    </div>
                    

                    {/* Right Side - Product Details */}
                    <div className="space-y-6">
                        {/* Product Title and Price */}
                        <h1 className="text-3xl font-semibold">{product.title}</h1>
                        <h3 className="text-2xl font-bold text-[#B88E2F]">{`$ ${product.price}.00`}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-500 text-xl">★★★★★</span>
                            <p className="text-sm text-gray-600">(10 customer reviews)</p>
                        </div>

                        {/* Product Description */}
                        <p className="text-lg text-gray-700">
                            {product.description}
                        </p>


                        <div className="border-b pb-4 mb-4">
                            <h1 className="text-lg font-bold flex-grow mb-2">Size</h1>
                            <div className="flex gap-2">
                                {["Small", "Large", "Extra large"].map(
                                    (size) => (
                                        <span
                                            key={size}
                                            className={` px-4 py-2 rounded-full border cursor-pointer ${selectedColor === size ? "bg-[#B88E2F] text-white" : ""
                                                }`}
                                            onClick={() => setSelectedColor(size)}
                                        >{size}</span>
                                    )
                                )}
                            </div>
                        </div>

                        
                        
                        <div className="border-b pb-4 mb-4">
                            <h1 className="text-lg font-bold flex-grow mb-2">Colors</h1>
                            <div className="flex gap-2">
                                {["red-500", "blue-500", "black", "green-500"].map(
                                    (color) => (
                                        <span
                                            key={color}
                                            className={`w-8 h-8 bg-${color} rounded-full border cursor-pointer ${selectedColor === color ? "border-black" : ""
                                                }`}
                                            onClick={() => setSelectedColor(color)}
                                        ></span>
                                    )
                                )}
                            </div>
                        </div>



                        {/* Size Options */}
                        {/* <div>
                            <h5 className="font-semibold text-lg">Size</h5>
                            <div className="flex flex-wrap gap-3 sm:gap-4 mt-2">
                                {product.sizes.map((size: string, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => handleClick(size)} // Handle click event
                                        className={`py-2 px-3 sm:px-5 font-medium rounded-full ${activeSize === size ? "bg-black text-white font-medium" : "bg-[#F0F0F0] text-[#3A3A3A]"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div> */}

                        {/* Color Filter */}
                        {/* <div className="border-b pb-4 mb-4">
                            <h1 className="text-xl font-bold flex-grow mb-2">Colors</h1>
                            <div className="flex gap-2">
                                {["red-500", "blue-500", "yellow-500", "green-500", "purple-500"].map(
                                    (color) => (
                                        <span
                                            key={color}
                                            className={`w-6 h-6 bg-${color} rounded-full border cursor-pointer ${selectedColor === color ? "border-black" : ""
                                                }`}
                                            onClick={() => setSelectedColor(color)}
                                        ></span>
                                    )
                                )}
                            </div>
                        </div> */}

 {/* Action Buttons */}
 <div className="grid gap-2 sm:flex justify-center sm:justify-between items-center sm:gap-4 mt-6">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-black rounded-md w-full h-12">
                                <button
                                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                    className="w-12 h-full text-black hover:bg-gray-100 flex justify-center items-center"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    min="1"
                                    onChange={handleQuantityChange}
                                    className="w-16 h-full text-center outline-none border-none appearance-none [-moz-appearance:none] [-webkit-appearance:none]"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-full text-black hover:bg-gray-100 flex justify-center items-center"
                                >
                                    +
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button className="h-12 px-4 text-black border border-black rounded-md w-full hover:bg-gray-100" onClick={addToCart}>
                                Add to Cart
                            </button>

                            {/* Compare Button */}
                            <button className="h-12 px-4 text-black border border-black rounded-md w-full hover:bg-gray-100">
                                + Compare
                            </button>
                        </div>

 {/* Border and Additional Info */}
                        <div className="border-b-2 my-6"></div>

                        {/* SKU, Category, Tags, and Share */}
                        <div className="space-y-4 w-80 ">
                            {/* SKU */}
                            <p className="flex items-center">
                                <strong className="w-24 text-gray-700">SKU:</strong>
                                <span className="text-gray-600">5501</span>
                            </p>

                            {/* Category */}
                            <p className="flex items-center">
                                <strong className="w-24 text-gray-700">Category:</strong>
                                <span className="text-gray-600">Sofa</span>
                            </p>

                            {/* Tags */}
                            <p className="flex items-center">
                                <strong className="w-24 text-gray-700">Tags:</strong>
                                <span className="text-gray-600">Sofa, Chair, Home</span>
                            </p>

                            {/* Social */}
                            <p className="flex items-center">
                                <strong className="w-24 text-gray-700">Social:</strong>
                                <div className="flex gap-3">
                                    <FaFacebookF className="text-xl text-gray-500 hover:text-blue-600 transition cursor-pointer" />
                                    <FaTwitter className="text-xl text-gray-500 hover:text-blue-400 transition cursor-pointer" />
                                    <FaInstagram className="text-xl text-gray-500 hover:text-pink-500 transition cursor-pointer" />
                                </div>
                            </p>
                        </div>

        
                    </div>
                </div>
            </div>

            <div className="py-8 border-t border-gray-300">
     {/* Headings */}
     <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6">
        <h2
          className={`font-regular text-lg text-slate-500 cursor-pointer ${activeSection === 'reviews' ? 'text-slate-900 font-semibold' : ''}`}
          onClick={() => setActiveSection('reviews')}
        >
          Reviews(5)
        </h2>
        <h2
          className={`font-regular text-lg text-slate-500 cursor-pointer ${activeSection === 'description' ? 'text-slate-900 font-semibold' : ''}`}
          onClick={() => setActiveSection('description')}
        >
        Description
        </h2>
        <h2
          className={`font-regular text-lg text-slate-500 cursor-pointer ${activeSection === 'information' ? 'text-slate-900 font-semibold' : ''}`}
          onClick={() => setActiveSection('information')}
        >
          Additional Information
        </h2>
      </div>

      <div className="space-y-4">
        {activeSection === 'reviews' && (
            <div className="container xL:py-10 lg:py-6 lg:px-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8"> </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* <!-- Testimonial 1 --> */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 text-lg font-semibold mr-2">★★★★★</span>
                  <span className="text-green-500 text-sm font-semibold">Verified</span>
                </div>
                <p className="text-gray-800 font-medium">Sarah M.</p>
                <p className="text-gray-600 mt-2">
                  Im blown away by the quality and style of the clothes I received from Shopza. From casual wear to elegant dresses, every piece Ive bought has exceeded my expectations.
                </p>
              </div>
              {/* <!-- Testimonial 2 --> */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 text-lg font-semibold mr-2">★★★★★</span>
                  <span className="text-green-500 text-sm font-semibold">Verified</span>
                </div>
                <p className="text-gray-800 font-medium">Alex K.</p>
                <p className="text-gray-600 mt-2">
                Im blown away by the quality and style of the clothes I received from Shopza. From casual wear to elegant dresses, every piece Ive bought has exceeded my expectations.
                </p>
              </div>
              {/* <!-- Testimonial 3 --> */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 text-lg font-semibold mr-2">★★★★★</span>
                  <span className="text-green-500 text-sm font-semibold">Verified</span>
                </div>
                <p className="text-gray-800 font-medium">James L.</p>
                <p className="text-gray-600 mt-2">
                Im blown away by the quality and style of the clothes I received from Shopza. From casual wear to elegant dresses, every piece Ive bought has exceeded my expectations.
                </p>
              </div>
            </div>
            </div>
        )} {/* Reviews Section */}
        {activeSection === 'description' && (
          <div className="text-gray-600">
            {/* Product Description Content */}
            <div className='px-4 sm:px-9'>
                <div className='text-center text-md'>{product.description}</div>
                <div className='flex flex-wrap justify-center items-center py-5'>
                    <div className='w-[50%] h-auto p-1 sm:p-4'><Image src={product.detailImage1} alt='product-detail-image' width={500} height={500}></Image></div>
                    <div className='w-[50%] h-auto p-1 sm:p-4'><Image src={product.detailImage3} alt='product-detail-image' width={500} height={500}></Image></div>
                </div>
            </div>
          </div>
        )}
{activeSection === 'information' && (
            <div>{product.description}</div>
        )}

      </div>

     
      </div>
    </div>

    
     
    );
};

export default Page;
