import React, { useState } from 'react';
import * as Unicons from '@iconscout/react-unicons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';
function Topbar() {
    const navigate = useNavigate();

    const userName = useSelector(state => state.user);

    const handleLogout = () => {
        axios.post('https://mern-marketplace-dapp.vercel.app/auth/logout')
            .then(() => {
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    const [display, setDisplay] = useState(false);

    const handleDisplay = () => {
        setDisplay(!display);
    };

    return (
        <div className='w-full bg-white h-16 flex justify-end items-center relative'>
            <div className='flex justify-center items-center'>
                <Unicons.UilEnvelopeAdd width={25} height={25} className="text-gray-500 mr-4" />
                <Unicons.UilBell width={25} height={25} className="text-gray-500 mr-4" />
            </div>
            <div className='relative'>
                <Unicons.UilUserCircle width={25} height={25} className="text-gray-500 mr-4 cursor-pointer" onClick={handleDisplay} />
                {display && (
                    <div className='absolute top-full right-2 bg-white border border-gray-200 px-4 py-2 shadow-md text-xs rounded-lg bg-gray-200'>
                            <h2 className='flex justify-start items-center w-full'>
                            <Unicons.UilHouseUser  width={18} height={18} className="text-red-500 mr-2 cursor-pointer"  />
                               {userName}
                            </h2>
                            <button onClick={handleLogout} className='w-full flex justify-start items-center'>
                            <Unicons.UilSignout  width={18} height={18} className="text-blue-500 mr-2 cursor-pointer"  />
                            Logout</button>
                       
                    </div>
                )}
            </div>
        </div>
    );
}

export default Topbar;
