import React from 'react'

function PartnerPalet({img,head}) {
  return (
    <div className='w-full rounded-lg py-2 font-medium text-gray-500 flex flex-col border border-gray-400 justify-center items-center bg-white'>
                <img src={img} className='w-16' alt="partner" />
               {head}
            </div>
  )
}

export default PartnerPalet