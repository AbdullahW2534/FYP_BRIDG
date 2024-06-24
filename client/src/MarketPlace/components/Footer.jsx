import React from 'react'
import * as Unicons from '@iconscout/react-unicons';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='flex flex-col justify-end items-center w-full h-60'>
      <div className='flex justify-between px-4 w-full h-full py-2 mx-4'>
        <div className='w-2/6 md:w-1/5'>
          <img src="./logo.png" alt="logo" className="w-44" />
          <h2 className='mt-2 text-xs w-full md:w-3/5 text-end font-lighter'>
            Elevating Every Step with SoleStyle: Discover Exclusive Collections and Explore Trending Designs.
          </h2>
        </div>
        <div className='hidden lg:flex flex-col justify-start  items-start w-2/6 h-full'>
          <h2 className='mb-3 h-4 font-medium'>Discover Exclusive Collections</h2>
          <a href='/wishlist' className='text-start mt-1 text-sm hover:text-red-500'>Mens</a>
          <a href='/products' className='text-start mt-1 text-sm hover:text-red-500'>Womens</a>
          <a href='/blogs' className='text-start mt-1 text-sm hover:text-red-500'>Kids</a>
          <a href='/trackorders' className='text-start mt-1 text-sm hover:text-red-500'>Casual</a>
          <a href='/trackorders' className='text-start mt-1 text-sm hover:text-red-500'>Discounts</a>

        </div>
        <div className='hidden lg:flex flex-col justify-start items-start w-2/6  h-full'>
          <h2 className='mb-3 h-4 font-medium'>Shop Latest Arrivals</h2>
          <a href='/' className='text-start mt-1 text-sm hover:text-red-500'>Shipping & Return</a>
          <a href='/wishlist' className='text-start mt-1 text-sm hover:text-red-500'> Secure shopping</a>
          <a href='/products' className='text-start mt-1 text-sm hover:text-red-500'> Gallary</a>
          <a href='/blogs' className='text-start mt-1 text-sm hover:text-red-500'>Affiliates</a>
          <a href='/trackorders' className='text-start mt-1 text-sm hover:text-red-500'>Contacts</a>
        </div>
        <div className='flex text-gray-500 font-medium flex-col justify-top items-between w-4/6 md:w-2/6  h-full'>
          <h2 className='flex justify-center text-black items-center mb-3 '>Store Information
            <Unicons.UilStore width={40} className="text-gray-500 hover:text-red-500 cursor-pointer ml-3 mr-1" /></h2>
          <h2 className='flex justify-start items-center mb-3 text-xs md:text-sm'>
            <Unicons.UilMapMarker width={20} className="hover:text-red-500 cursor-pointer ml-3 mr-1" />
            Shop# 20, The Mall,Sadar</h2>
          <h2 className='flex justify-start items-center mb-3 text-xs md:text-sm'>
            <Unicons.UilPhone width={20} className="hover:text-red-500 cursor-pointer ml-3 mr-1" />
            <span className=' mr-1'>
              Call us :</span>
            +92-336-7500-932</h2>
          <h2 className='flex justify-start items-center mb-3 text-xs md:text-sm'>
            <Unicons.UilEnvelopeCheck width={20} className="hover:text-red-500 cursor-pointer ml-3 mr-1" />
            <span className=' mr-1'>
              Email :</span>
            solestyle@gmail.com</h2>
          <h2 className='flex justify-start items-center mb-3 text-xs md:text-sm'>
            <Unicons.UilBorderVertical width={20} className="hover:text-red-500 cursor-pointer ml-3 mr-1" />
            <span className=' mr-1'>
              Fax:</span>
            123456</h2>

        </div>
      </div>


      <div className='flex h-10 w-full bg-purple-500 mt-10'>
        <div className='flex text-xs text-white w-3/5 justify-end h-full items-center'>
          All Right Reserved ©{currentYear} SoleStyle.Inc
        </div>
        <div className='flex w-2/5 text-white justify-end h-full items-center'>
          <a href='facebook.com' className='text-start mt-1 text-base hover:text-red-500'>
            <Unicons.UilFacebook width={20} className="hover:text-blue-500 cursor-pointer ml-3 mr-1" />
          </a>
          <a href='instagram.com' className='text-start mt-1 text-base hover:text-red-500'>
            <Unicons.UilInstagram width={20} className="hover:text-orange-500 cursor-pointer ml-3 mr-1" />
          </a>
          <a href='twitter.com' className='text-start mt-1 text-base hover:text-red-500'>
            <Unicons.UilTwitter width={20} className="hover:text-blue-500 cursor-pointer ml-3 mr-1" />
          </a>
          <a href='tiktok.com' className='text-start mt-1 text-base hover:text-red-500'>
            <Unicons.UilLinkedin width={20} className="hover:text-blue-500 cursor-pointer ml-3 mr-1" />
          </a>
        </div>
      </div>
    </div>
  )
}

