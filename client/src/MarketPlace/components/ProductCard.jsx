import React, { useState } from 'react'
import * as Unicons from '@iconscout/react-unicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
function ProductCard({ productsdata }) {
    const [checked, setCheck] = useState(false)

    const handleClick = () => {
        setCheck(!checked);
    }
    return (
        <div className='w-full md:w-5/6 flex flex-col justify-center items-center shadow-lg py-3' >
            <img src={`${productsdata.image}`} className='w-32 h-32 ' alt={`img`} />
            <h2 className='w-full text-center font-medium mt-1'>{productsdata.productName}</h2>
            <h2 className='w-full text-center text-xs mt-1 font-bold text-purple-500'>{productsdata.serviceName}</h2>
            <div className='flex justify-end items-center w-full pt-1 '>
                <div className='w-1/5 flex justify-center items-center'>
                    {checked ? <FontAwesomeIcon icon={solidHeart} onClick={handleClick} className="text-purple-600 cursor-pointer" /> : <FontAwesomeIcon icon={regularHeart} onClick={handleClick} className="text-purple-600 cursor-pointer" />}

                </div>
            </div>

        </div>
    )
}

export default ProductCard