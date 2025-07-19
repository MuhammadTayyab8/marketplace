import Image from "next/image";
import hero from '../../public/hero.png'
import category1 from '../../public/category-1.png'
import category2 from '../../public/category-2.png'
import category3 from '../../public/category-3.png'
import Products from "@/components/Products";
import slider1 from '../../public/slider-product-1.png'
import slider2 from '../../public/slider-product-2.png'
import slider3 from '../../public/slider-product-3.png'
import { FaArrowRight, FaAngleRight } from "react-icons/fa6";
import gallery from '../../public/gallery.png'
import Footer from "@/components/Footer";
import Link from "next/link";
import OurProduct from "@/components/OurProduct";


export default function Home() {
  return (
    <div>
      {/* hero section start*/}
      <section className="relative w-full max-h-[900px] h-screen bg-cover bg-center px-4 md:px-10" style={{ backgroundImage: `url(${hero.src})` }}>
        <div className="relative mx-auto max-w-screen-2xl z-8 flex items-center justify-end h-full">
          <div className="max-w-md md:max-w-lg lg:max-w-xl bg-[#FFF3E3] p-6 rounded-lg shadow-lg text-left">
            <p className="text-[#333333] tracking-widest mb-4">New Arrival</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#B88E2F] mb-3">
              Discover Our New Collection
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
            <Link href='/shop'>  <button className="bg-[#B88E2F] px-9 py-4 mt-10 text-white text-sm font-semibold">BUY NOW</button></Link>
          </div>
        </div>

      </section>
      {/* hero section end */}

      {/* category start */}
      <div className="px-8 sm:px-12 md:px-20 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center mt-10">Browse The Range</h1>
        <p className="text-center font-medium text-gray-600 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <Link href='/shop'>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex flex-col items-center">
              <Image src={category1} alt="category-1" className="w-screen sm:w-[200px] md:w-[340px] h-auto object-cover rounded-lg" />
              <p className="mt-6 text-lg md:text-xl  font-semibold text-[#333333] ">Dining</p>
            </div>

            <div className="flex flex-col items-center">
              <Image src={category2} alt="category-2" className="w-screen sm:w-[200px] md:w-[340px] h-auto object-cover rounded-lg" />
              <p className="mt-6 text-lg md:text-xl font-semibold text-[#333333]">Living</p>
            </div>

            <div className="flex flex-col items-center">
              <Image src={category3} alt="category-3" className="w-screen sm:w-[200px] md:w-[340px] h-auto object-cover rounded-lg" />
              <p className="mt-6 text-lg md:text-xl font-semibold text-[#333333]">Bedroom</p>
            </div>
          </div>
        </Link>
      </div>

      {/* category end */}

      {/* products start */}

      <h1 className="text-2xl md:text-3xl font-bold text-center mt-5">Our Products</h1>
      <OurProduct />
      <div className="flex justify-center">
        <Link href='/shop'><button className="text-[#B88E2F] border-2 border-[#B88E2F] px-10 py-2 text-center my-5">Show More</button></Link>
      </div>

      {/* Products End */}

      {/* Slider Start */}
      <div className="relative mx-auto max-w-screen-2xl flex flex-wrap md:flex-nowrap justify-between items-center gap-6 px-6 md:pl-20 py-8 bg-[#FCF8F3] mt-8 w-full h-auto overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-[40%] text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold my-4 md:my-9">50+ Beautiful rooms inspiration</h1>
          <p className="text-sm md:text-base">Our designer already made a lot of beautiful prototypes of rooms that inspire you</p>
          <button className="bg-[#B88E2F] px-6 md:px-8 py-3 text-white font-semibold my-4 md:my-9">Explore More</button>
        </div>

        {/* Slider Images */}
        <div className="flex justify-center items-start gap-3 relative w-full md:w-auto">
          {/* Image 1 */}
          <div className="relative w-2/3 md:w-auto">
            <Image src={slider1} alt="slider-image-1" className="w-full h-auto object-cover" />
            {/* Text Box */}
            <div className="absolute bottom-4 left-2 md:bottom-10 md:left-5 bg-white bg-opacity-75 px-4 py-2 md:px-6 md:py-4 text-black shadow-md">
              <p className="text-xs md:text-md">01 ----- Bedroom</p>
              <p className="text-sm md:text-lg font-bold">Inner Peace</p>
              {/* Arrow Button */}
              <div className="absolute top-1/2 -right-8 md:-right-10 transform -translate-y-1/2 bg-[#B88E2F] flex items-center justify-center w-8 h-8 md:w-10 md:h-10 shadow-lg">
                <FaArrowRight className="text-white text-sm md:text-lg" />
              </div>
            </div>
          </div>

          {/* Image 2 */}
          <div className="w-1/3 md:w-auto">
            <Image src={slider2} alt="slider-image-2" className="object-cover h-[200px] md:h-[450px] w-full" />
          </div>

          {/* Image 3 */}
          <div className="hidden md:block w-[10%]">
            <Image src={slider3} alt="slider-image-3" className="object-cover h-[450px] w-full" />
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 bg-white p-3 shadow-lg rounded-full">
          <FaAngleRight className="text-[#B88E2F]" />
        </div>

        {/* Dots */}
        <div className="flex absolute gap-3 md:gap-4 bottom-12 md:bottom-[14%] right-[18%] md:right-[28%]">
          <span className="w-2 h-2 md:w-3 md:h-3 bg-[#B88E2F] outline outline-[1px] outline-[#B88E2F] outline-offset-4 rounded-full"></span>
          <span className="w-2 h-2 md:w-3 md:h-3 bg-[#B88E2F] rounded-full"></span>
          <span className="w-2 h-2 md:w-3 md:h-3 bg-[#B88E2F] rounded-full"></span>
        </div>
      </div>
      {/* Slider End */}


      <div className="flex flex-col justify-center items-center text-center my-10">
        <p className="text-md sm:text-lg text-[#616161] ">Share your setup with</p>
        <h1 className="text-2xl pb-3 sm:text-4xl font-extrabold ">#FuniroFurniture</h1>
        <Image src={gallery} alt="gallery image flex justify-center" />
      </div>

      {/* gallery start */}


    </div>
  );
}
