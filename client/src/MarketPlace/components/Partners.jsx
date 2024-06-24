import React from 'react'
import * as Unicons from '@iconscout/react-unicons';
import PartnerPalet from './PartnerPalet';
function Partners() {
    return (
        <div className='flex flex-col justify-center items-center w-full py-20'>
            <div className='w-full h-3/5 bg-[url(./assets/images/bg10.jpg)] bg-cover opacity-10 absolute'>

            </div>
            <h2 className='w-full text-center text-3xl font-medium text-white my-4 bg-purple-500 '>
                BUSINESS COLLABORATION
            </h2>
            <div className='mb-10 w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 justify-center items-center gap-2 px-4 '>
                <PartnerPalet img={'./part1.png'} head={'Platinium Shoes'} />
                <PartnerPalet img={'./part2.png'} head={'Rayban Spectacle'} />
                <PartnerPalet img={'./part3.png'} head={'Saphire Shirts'} />
                <PartnerPalet img={'./part4.png'} head={'Bonanza Clothes'} />
                <PartnerPalet img={'./part5.png'} head={'Armani Belts'} />
                <PartnerPalet img={'./part6.png'} head={'Seico Watches'} />
            </div>
        </div>


    )
}

export default Partners