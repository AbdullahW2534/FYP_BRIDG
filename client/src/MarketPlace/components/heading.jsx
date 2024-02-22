import React from 'react'

export default function Heading({ heading, mainHeading }) {
  return (
    <div className='my-5 flex flex-col justify-center items-center'
      data-aos="fade-in"
      data-aos-offset="0"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="false"
      data-aos-once="false"
      data-aos-anchor-placement="top-center">
      <h3>{heading}</h3>
      <h2 className='font-bold text-3xl'>{mainHeading}</h2>
      <span className='w-20 border-2 border-red-500  bg-red-500'></span>
    </div>
  )
}

