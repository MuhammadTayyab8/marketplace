// app/loading.tsx (or app/loading.js if using JavaScript)
'use client';

import Image from 'next/image';
import logo from '../../public/logo.png';


export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Logo Image */}
      <div className="">
        <Image src={logo} alt="Loading..." width={180} height={180} />
      </div>

    </div>
  );
}
