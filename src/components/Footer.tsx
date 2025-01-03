import React from 'react'
import Image from 'next/image'
import logo from '../../public/logo.png'


const Footer = () => {
  return (
    <div>
        <div className='px-5 sm:px-20 pb-8 border-t border-3 border-[#D9D9D9] block sm:flex flex-wrap justify-between'>
            <div>
<Image src={logo} alt='logo-footer' className='py-8'/>
<p className='text-[#9F9F9F] py-14'>400 University Drive Suite <br /> 200 Coral Gables,
FL 33134 USA</p>
            </div>

            <div >
            <h1 className='text-[#9F9F9F] font-semibold py-8'>Links</h1>
            <p className='sm:py-8 pb-8 font-medium'>Home</p>
            <p className='pb-6 font-medium'>Shop</p>
            <p className='pb-6 font-medium'>About</p>
            <p className='pb-6 font-medium'>Contact</p>
            </div>

            <div>
              <h1 className='text-[#9F9F9F] font-semibold py-8'>Help</h1>
              <p className='sm:py-8 pb-8 font-medium'>Payments Options</p>
              <p className='pb-6 font-medium'>Returns</p>
              <p className='pb-6 font-medium'>Privacy Policy</p>
            </div>

            <div>
                <h1 className='text-[#9F9F9F] font-semibold py-8'>NewsLetter</h1>
                <input type="text" placeholder='Enter Your Email Address' className='outline-none appearance-none pt-4  font-medium border-b border-black'/>
                <button className='pt-4 font-medium border-b border-black ml-2'>Subscribe</button>

            </div>
        </div>

        <div className='mx-6 sm:mx-20 border-t border-3 border-[#D9D9D9]'>
<p className='py-5 font-bold text-center sm:text-left'>2023 furino. All rights reverved</p>
        </div>
        
    </div>
  )
}

export default Footer