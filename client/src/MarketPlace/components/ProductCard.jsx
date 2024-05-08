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
        <div className='w-full md:w-5/6 flex flex-col justify-center items-center shadow-lg ' >
            <img src={`${productsdata.image}`} className='w-full h-64 ' alt={`img`} />
            <h2 className='w-full text-center font-medium mt-1'>{productsdata.productName}</h2>
            <h2 className='w-full text-center text-xs mt-1'>Hurry Up..! only <span className='text-sm font-medium text-red-600'>{productsdata.productQuantity}</span> remaining</h2>
            <div className='flex justify-end items-center w-full pt-1 '>
                <div className='w-1/5 flex justify-center items-center'>
                    {checked ? <FontAwesomeIcon icon={solidHeart} onClick={handleClick} className="text-red-600 cursor-pointer" /> : <FontAwesomeIcon icon={regularHeart} onClick={handleClick} className="text-red-600 cursor-pointer" />}

                </div>
                <div className='w-4/5 flex justify-end items-center'>

                    <Unicons.UilShoppingCartAlt width={20} className="text-gray-500 hover:text-yellow-500 ml-3 mr-1 cursor-pointer" />
                    <Unicons.UilShoppingBag width={20} className="text-gray-500 hover:text-yellow-500 ml-3 mr-1 cursor-pointer" />
                </div>
            </div>

        </div>
    )
}

export default ProductCard