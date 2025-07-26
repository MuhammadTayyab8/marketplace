import Image from 'next/image'
import React from 'react'
import { TopSellingProduct } from '@/types/TopSellingProduct'


type Props = {
  topSelling: TopSellingProduct[]
}

const TopProducts = ({ topSelling }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full h-[444px] max-h-[444px] overflow-hidden">
      <div className="h-full overflow-y-auto custom-scrollbar p-6 ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Products</h2>

        {topSelling.length > 0 || !topSelling ?
          topSelling.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 rounded-lg transition hover:bg-gray-50 mb-3"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={80}
                height={80}
                className="w-20 h-20 rounded-lg object-cover border border-gray-200"
              />
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                <span className="mt-1 inline-block text-sm text-gray-600 bg-gray-50 border border-gray-300 rounded-md px-2 py-1 w-fit">
                  Sales: {item.totalSales}
                </span>
              </div>
            </div>
          )) : (
            <>
              <div className='flex justify-center items-center flex-col h-[300px]'>
                <div>
                  <Image
                    src='/logo.png'
                    alt='placeholder'
                    width={120}
                    height={120}
                  />
                </div>
                <div className='text-lg font-medium text-gray-600'>No data found.</div>
              </div>
            </>
          )}
      </div>
    </div>
  )
}

export default TopProducts
