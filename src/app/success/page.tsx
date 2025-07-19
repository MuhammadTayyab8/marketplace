import Link from 'next/link'
import React from 'react'

const page = ({
    searchParams: { amount },
  }: {
    searchParams: { amount: string };
  }) => {
    console.log(amount)
  return (
    <div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-gray-700 mb-4">
              Your order has been placed and payment of <span className='font-bold text-lg text-black'>$ {amount}</span> has been Recieved. Thank you for shopping with us!
            </p>
            <Link href='/'> <button
              className="w-full bg-black text-white px-4 py-2 rounded-md text-lg font-bold hover:bg-gray-800"
            >
              Close
            </button> </Link>
          </div>
        </div>
    </div>
  )
}

export default page
