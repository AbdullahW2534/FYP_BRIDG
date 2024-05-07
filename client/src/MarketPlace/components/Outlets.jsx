import React from 'react';
import Heading from './heading';

export default function Outlets() {
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <Heading heading={'Official Stores'} mainHeading={'Functional Outlets'} />
                <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row justify-center items-center w-full h-3/5  p-10'>
                    <img
                        src='./assets/images/bg.jpg'
                        className='image w-full h-48 rounded-lg'
                        alt='img'
                        data-aos="fade-up"
                        data-aos-offset="0"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="false"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-center"
                    />
                    <img
                        src='./assets/images/bg4.jpg'
                        className='image w-full h-68 rounded-lg '
                        alt='img'
                        data-aos="fade-up"
                        data-aos-offset="0"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="false"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-center"
                    />
                    <img
                        src='./assets/images/bg6.jpg'
                        className='image w-full h-48 rounded-lg  '
                        alt='img'
                        data-aos="fade-up"
                        data-aos-offset="0"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="false"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-center"
                    />
                </div>
            </div>
        </>
    );
}
