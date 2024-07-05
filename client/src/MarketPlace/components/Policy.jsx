import React from 'react'
import * as Unicons from '@iconscout/react-unicons';

function Policy() {
    return (
        <div className='py-20 w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 justify-center items-center'>
            <div className='w-full h-2/5 md:h-1/5 bg-[url(./assets/images/bg12.jpg)] bg-cover opacity-10 absolute'>

            </div>
            <div className='w-full py-2 font-medium text-gray-500 flex flex-col border-2 border-gray-300 justify-center items-center'>
                <Unicons.UilTruck width={50} height={50} className="text-purple-500  " />
                On-Time Response
            </div>
            <div className='w-full py-2 font-medium text-gray-500 flex flex-col border-2 border-gray-300 justify-center items-center'>
                <Unicons.UilCommentHeart width={50} height={50} className="text-purple-500 " />
                Liked Entirely
            </div>
            <div className='w-full py-2 font-medium text-gray-500 flex flex-col border-2 border-gray-300 justify-center items-center'>
                <Unicons.UilTvRetro width={50} height={50} className="text-purple-500 " />
                Up-To-Date
            </div>
        </div>
    )
}

export default Policy