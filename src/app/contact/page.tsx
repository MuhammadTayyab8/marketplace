import React from 'react'
import Image from 'next/image'
import heroIcon from '../../../public/icon-hero.png'
import hero from '../../../public/shop-hero.png'
import { FaAngleRight } from "react-icons/fa6";
import Qualities from '@/components/Qualities';
import addressIcon from '../../../public/location.png'
import callIcon from '../../../public/phone.png'
import timeIcon from '../../../public/time.png'
import Link from 'next/link';





const page = () => {
  return (
    <div>
      <div className="relative w-full h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${hero.src})` }}>

        {/* Text Content */}
        <div className="absolute inset-0  items-center flex justify-center">
          <div className="text-center text-black justify-center">
            <div className='flex justify-center'> <Image src={heroIcon} alt='hero-icon' /></div>
            <h1 className="text-4xl font-bold">Contact</h1>
            <div className='flex '>
              <Link href='/'>
                <p className="mt-4 text-lg flex justify-center items-center gap-3 font-bold">Home <FaAngleRight /> <span className='font-thin'>Contact</span> </p>
              </Link>
            </div>
          </div>
        </div>
      </div>



      <div className='mx-auto max-w-screen-2xl'>


        {/* body-start  */}

        <div className='mx-auto max-w-screen-2xl px-5'>

          <h1 className='text-3xl font-extrabold text-center pt-12'>Get In Touch With Us</h1>
          <div className='flex justify-center'><p className='text-[#9F9F9F] text-center w-full sm:w-1/2 justify-center'>For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p></div>

        </div>

        {/* body end  */}


        {/* Contact Section Start */}
        <div className="px-4 md:px-20 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left Section (Details) */}
            <div className="order-2 lg:order-1 space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <Image src={addressIcon} alt="Address Icon" />
                <div>
                  <h1 className="text-xl font-semibold">Address</h1>
                  <p className="text-md text-gray-600 w-1/2">236 5th SE Avenue, New York NY10000, United States</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Image src={callIcon} alt="Phone Icon" />
                <div>
                  <h1 className="text-xl font-semibold">Phone</h1>
                  <p className="text-md text-gray-600">Mobile: +(84) 546-6789</p>
                  <p className="text-md text-gray-600">Hotline: +(84) 456-6789</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <Image src={timeIcon} alt="Working Hours Icon" />
                <div>
                  <h1 className="text-xl font-semibold">Working Time</h1>
                  <p className="text-md text-gray-600">Monday-Friday: 9:00 - 22:00</p>
                  <p className="text-md text-gray-600">Saturday-Sunday: 9:00 - 21:00</p>
                </div>
              </div>
            </div>

            {/* Right Section (Form) */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
              <form>
                {/* Name Field */}
                <div className="mb-4">
                  <label htmlFor="name" className="block text-md font-medium">Your Name</label>
                  <input type="text" id="name" name="name" className="w-full p-3 mt-2 border border-gray-300 rounded-md" required />
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-md font-medium">Email Address</label>
                  <input type="email" id="email" name="email" className="w-full p-3 mt-2 border border-gray-300 rounded-md" required />
                </div>

                {/* Subject Field */}
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-md font-medium">Subject</label>
                  <input type="text" id="subject" name="subject" className="w-full p-3 mt-2 border border-gray-300 rounded-md" required />
                </div>

                {/* Message Field */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-md font-medium">Message</label>
                  <textarea id="message" name="message" className="w-full p-3 mt-2 border border-gray-300 rounded-md" required></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="px-20 bg-[#B88E2F] text-white p-3 rounded-md font-semibold">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Contact Section End */}

      </div>

      <Qualities />
    </div>
  )
}

export default page