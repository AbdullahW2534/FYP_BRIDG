import React from 'react'
import * as Unicons from '@iconscout/react-unicons';

function Sidebar() {
    return (
        <div className='min-h-screen h-100vh flex flex-col justify-top items-center w-1/6 pt-4  bg-slate-950'>
            <a href='/'>
                <h2 className='text-2xl my-2   text-center text-white font-bold'>
                    <span className="w-full text-purple-500 text-end text-5xl scale-75 ">
                        B
                    </span>

                    RIDG
                </h2>
            </a>
            <div className='flex flex-col justify-center items-center w-full mt-16'>
                <a href="/adminportal/dashboard" className='w-full pl-7 py-2 text-lg font-normal text-white flex justify-start  items-center'>
                    <Unicons.UilCreateDashboard width={27} height={27} className="text-purple-500 mr-4" />
                    Dashboard
                </a>
                <a href="/adminportal/services" className='w-full pl-7 py-2 text-lg font-normal text-white flex justify-start  items-center'>
                    <Unicons.UilPicture width={27} height={27} className="text-purple-500 mr-4" />
                    Services
                </a>
                <a href="/adminportal/categories" className='w-full pl-7 py-2 text-lg font-normal text-white flex justify-start  items-center'>
                    <Unicons.UilBookmark width={27} height={27} className="text-purple-500 mr-4" />
                    Categories
                </a>
                <a href="/adminportal/users" className='w-full pl-7 py-2 text-lg font-normal text-white flex justify-start  items-center'>
                    <Unicons.UilUserMd width={27} height={27} className="text-purple-500 mr-4" />
                    Users
                </a>
                <a href="/adminportal/gigs" className='w-full pl-7 py-2 text-lg font-normal text-white flex justify-start  items-center'>
                    <Unicons.UilTag width={27} height={27} className="text-purple-500 mr-4" />
                    Gigs
                </a>

                <a href="/adminportal/posts" className='w-full pl-7 py-2 text-lg font-normal text-white flex justify-start  items-center'>
                    <Unicons.UilWallet width={27} height={27} className="text-purple-500 mr-4" />
                    Blogs
                </a>

            </div>

            {/* <div className='flex justify-center items-cenyter w-full mt-28'>
                <a href="/">
                    <Unicons.UilFacebook width={30} height={30} className="text-blue-600 mr-2" />

                </a>
                <a href="/">
                    <Unicons.UilInstagram width={30} height={30} className="text-orange-500 mr-2" />

                </a>
                <a href="/">
                    <Unicons.UilLinkedin width={30} height={30} className="text-blue-700 mr-2" />

                </a>
            </div> */}
        </div>
    )
}

export default Sidebar