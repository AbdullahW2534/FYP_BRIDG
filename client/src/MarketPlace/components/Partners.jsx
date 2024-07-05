import React from 'react'
import * as Unicons from '@iconscout/react-unicons';
import PartnerPalet from './PartnerPalet';
function Partners() {
    return (
        <div className='flex flex-col justify-center items-center w-full py-20 mb-40 mt-10'>
            <div className='w-full h-3/5 bg-[url(./assets/images/bg10.jpg)] bg-cover opacity-10 absolute'>

            </div>
            <h2 className='w-full text-center text-3xl font-medium text-white my-4 bg-purple-500 z-50'>
                BUSINESS COLLABORATION
            </h2>
            <div className='mb-10 w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 justify-center items-center gap-2 px-4 z-50'>
                <PartnerPalet img={'./fiver.png'} head={'Fiver'} />
                <PartnerPalet img={'./upwork.png'} head={'Upwork'} />
                <PartnerPalet img={'./freelance.png'} head={'Freelance'} />
                <PartnerPalet img={'./hosting.png'} head={'Hostinger'} />
                <PartnerPalet img={'./cloud.png'} head={'CloudFlare'} />
                <PartnerPalet img={'./database.png'} head={'AWS S3 Storage'} />
            </div>
        </div>


    )
}

export default Partners