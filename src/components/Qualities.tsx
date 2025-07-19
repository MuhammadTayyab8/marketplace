import React from 'react'
import Image  from 'next/image'
import highQualityIcon from '../../public/quality1.png'
import warrantyIcon from '../../public/quality2.png'
import freeShippingIcon from '../../public/quality3.png'
import supportIcon from '../../public/quality4.png'


const Qualities = () => {
  return (
    <div className='mx-auto max-w-screen-2xl'>
        {/* quality start */}

<div className="px-4 md:px-20 py-12 bg-[#F9F1E7]">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* High Quality */}
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-center sm:justify-start">
      <Image src={highQualityIcon} alt="High Quality Icon" className="w-10 h-10" />
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-semibold">High Quality</h3>
        <p className="text-sm text-gray-600">Crafted from top materials</p>
      </div>
    </div>

    {/* Warranty Protection */}
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-center sm:justify-start">
      <Image src={warrantyIcon} alt="Warranty Icon" className="w-10 h-10" />
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-semibold">Warranty Protection</h3>
        <p className="text-sm text-gray-600">Over 2 years</p>
      </div>
    </div>

    {/* Free Shipping */}
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-center sm:justify-start">
      <Image src={freeShippingIcon} alt="Free Shipping Icon" className="w-10 h-10" />
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-semibold">Free Shipping</h3>
        <p className="text-sm text-gray-600">Order over $150</p>
      </div>
    </div>

    {/* 24 / 7 Support */}
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-center sm:justify-start">
      <Image src={supportIcon} alt="24/7 Support Icon" className="w-10 h-10" />
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-semibold">24 / 7 Support</h3>
        <p className="text-sm text-gray-600">Dedicated support</p>
      </div>
    </div>
  </div>
</div>


{/* quality end */}
    </div>
  )
}

export default Qualities