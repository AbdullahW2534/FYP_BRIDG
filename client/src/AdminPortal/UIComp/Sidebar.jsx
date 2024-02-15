import React from 'react'
import * as Unicons from '@iconscout/react-unicons';

function Sidebar() {
    return (
        <div className='flex flex-col justify-center items-center w-1/5 h-screen bg-white'>
            <div className='flex justify-center items-center'>
               <img src="./logo.png" alt="logo" className='w-40'/>
            </div>
            <div className='flex flex-col justify-center items-center h-3/5 w-full mt-3'>
                <a href="/adminportal" className='w-full pl-7 py-2 text-sm hover:bg-gray-200 flex justify-start  items-center'>
                    <Unicons.UilCreateDashboard  width={25} height={25} className="text-gray-500 mr-4" />
                    DASHBOARD
                </a>
                <a href="/adminportal/products" className='w-full pl-7 py-2 text-sm hover:bg-gray-200 flex justify-start  items-center'>
                    <Unicons.UilPicture  width={25} height={25} className="text-gray-500 mr-4" />
                    PROUCTS
                </a>
                <a href="/adminportal/products" className='w-full pl-7 py-2 text-sm hover:bg-gray-200 flex justify-start  items-center'>
                    <Unicons.UilUserMd  width={25} height={25} className="text-gray-500 mr-4" />
                    CUSTOMERS
                </a>
                <a href="/" className='w-full pl-7 py-2 text-sm hover:bg-gray-200 flex justify-start  items-center'>
                    <Unicons.UilTag  width={25} height={25} className="text-gray-500 mr-4" />
                    SALES
                </a>
                <a href="/" className='w-full pl-7 py-2 text-sm hover:bg-gray-200 flex justify-start  items-center'>
                    <Unicons.UilSortAmountUp  width={25} height={25} className="text-gray-500 mr-4" />
                    ORDER
                </a>
                <a href="/" className='w-full pl-7 py-2 text-sm hover:bg-gray-200 flex justify-start  items-center'>
                    <Unicons.UilShip  width={25} height={25} className="text-gray-500 mr-4" />
                    SHIPMENTS
                </a>
                <a href="/" className='w-full pl-7 py-2 text-sm hover:bg-gray-200 flex justify-start  items-center'>
                    <Unicons.UilWallet  width={25} height={25} className="text-gray-500 mr-4" />
                    WALLET
                </a>
                <a href="/" className='w-full pl-7 py-2 text-sm hover:bg-gray-200 flex justify-start  items-center'>
                    <Unicons.UilUsersAlt   width={25} height={25} className="text-gray-500 mr-4" />
                    TEAM
                </a>
            </div>

            <div className='flex flex-col justify-center items-center w-full'>
            <a href="/" className='font-bold w-3/6 bg-gray-300 rounded-lg py-1 px-2 mt-1  text-xs hover:bg-gray-200 flex justify-start  items-center'>
                    <Unicons.UilFacebook  width={20} height={20} className="text-blue-600 mr-4" />
                    Facebook
                </a>
                <a href="/" className='font-bold w-3/6 bg-gray-300 rounded-lg py-1 px-2 mt-1  text-xs hover:bg-gray-200 flex justify-start  items-center'>
                    <Unicons.UilInstagram width={20} height={20} className="text-orange-500 mr-4" />
                    Instagram
                </a>
                <a href="/" className='font-bold w-3/6 bg-gray-300 rounded-lg py-1 px-2 mt-1  text-xs hover:bg-gray-200 flex justify-start  items-center'>
                    <Unicons.UilLinkedin   width={20} height={20} className="text-blue-600 mr-4" />
                    Linkedin
                </a>
            </div>
        </div>
    )
}

export default Sidebar