import React from 'react'

function TrackImg({ status }) {

    return (
        <>
            {
                status.map(data => (
                    <>
                        <div className='w-full flex justify-center items-start'>
                            <img src={`./iconSet/${data.orderStatus}.png`} alt="01" className={`w-1/5 h-full border-2 border-gray-400 p-2 rounded-lg`} />
                            <div className='flex flex-col justify-center items-start ml-4'>
                                <h2 className='mb-2 font-medium text-gray-400'>
                                    <span className='font-medium mr-3 text-black'>Customer Name : </span> {data.customerName}
                                </h2>
                                <h2 className='mb-2 font-medium text-gray-400'>
                                    <span className='font-medium mr-3 text-black'>Product Name :  </span>{data.productName}
                                </h2>
                                <h2 className='mb-2 font-medium text-gray-400'>
                                    <span className='font-medium mr-3 text-black'>Product Size :  </span>{data.productSize}
                                </h2>
                                <h2 className='mb-2 font-medium text-gray-400'>
                                    <span className='font-medium mr-3 text-black'>Product Color : </span> {data.productColor}
                                </h2>
                                <h2 className='mb-2 font-medium text-gray-400'>
                                    <span className='font-medium mr-3 text-black'>Product Price : </span> {data.productPrice}
                                </h2>
                                <h2 className='mb-2 font-medium text-gray-400'>
                                    <span className='font-medium mr-3 text-black'>Product Quantity : </span> {data.quantity}
                                </h2>
                                <h2 className='mb-2 font-medium text-gray-400'>
                                    <span className='font-medium mr-3 text-black'>Order Status :  </span>{data.orderStatus}
                                </h2>
                            </div>
                        </div>
                    </>

                )
                )
            }</>


    )
}

export default TrackImg