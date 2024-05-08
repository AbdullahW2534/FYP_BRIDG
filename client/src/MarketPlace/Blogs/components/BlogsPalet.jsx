import React, { useState } from 'react';
import * as Unicons from '@iconscout/react-unicons';
export default function BlogsPalet({ postsData }) {
    const [isClicked, setIsHovered] = useState(false);

    const handleClick = () => {
        setIsHovered(!isClicked);
    };
    const ellipsisStyle = {
        display: '-webkit-box',
        WebkitLineClamp: isClicked ? 'none' : 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        transition: 'transform 0.3s ease', 
        transform: isClicked ? 'translateY(10px)' : 'translateY(0)', 
    };

    return (
        <div className='p-5 '>
            <img src={`${postsData.image}`} className='w-full h-72 lg:h-[30rem]  lg:p-4' alt={`img`} />
            <h2 className='w-full text-center font-medium mb-1'>{postsData.heading}</h2>
            <h2 className='w-full flex justify-end items-center mt-1 text-gray-400 px-4  text-xs'><Unicons.UilPostStamp  width={16} className="text-yellow-500 ml-3 mr-1" />{postsData.auther}</h2>
            <h2 className="w-full  mt-1" style={ellipsisStyle}>
                {postsData.content}
            </h2>
            <div className='w-full flex justify-end'>
            <Unicons.UilEye onClick={handleClick} width={20} className="mt-4 text-red-600 cursor-pointer" />
            </div>
            
        </div>
    );
}
