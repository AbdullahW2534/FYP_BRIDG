import React, { useEffect } from 'react';
import * as Unicons from '@iconscout/react-unicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../../features/product/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ backgroundImage, heading }) {
  const userName = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('https://mern-marketplace-dapp.vercel.app/auth/logout')
      .then(() => {
        dispatch(addUser(""));
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get('https://mern-marketplace-dapp.vercel.app/auth/getMail')
      .then(res => {
        const email = res.data.email;
        axios.get('https://mern-marketplace-dapp.vercel.app/auth/getUserName', {
          params: {
            email: email
          }
        })
          .then(res => {
            dispatch(addUser(res.data.name));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-[-1]">
        <div className={` w-full h-full bg-cover opacity-80 ${backgroundImage}`}>

        </div>
      </div>

      <div className='bg-red-500 flex justify-between items-center text-sm text-white py-2 px-4'>
        <div className='hidden md:flex text-xs items-center'>
          <span className='font-medium text-base text-white mr-1'>
            SOLESTYLE.
          </span>
          Inc
          <Unicons.UilPhone width={16} className="text-white ml-3 mr-1" />
          +92336-7500-932
        </div>
        <div className='flex items-center'>
          <FontAwesomeIcon icon={faHeart} className="hover:text-red-600 mr-2 cursor-pointer" />
          <span className='flex items-center ml-4 cursor-pointer'>
            <Unicons.UilUserExclamation width={20} className="hover:text-slate-950 mr-2" />
            {userName ? (
              <>
                {userName} <button onClick={handleLogout} className='w-full flex justify-start items-center ml-2 border border-white rounded-lg p-1'>
                  <Unicons.UilSignout width={15} height={15} className="text-white cursor-pointer" />
                  Logout
                </button>
              </>
            ) : <a href='/signin'>Signin</a>}
          </span>
        </div>
      </div>

      <div className='bg-white flex justify-between items-center text-sm px-4'>
        <Unicons.UilListUl width={40} height={40} className="text-black font-bold mr-2" />
        <div className='py-2 mx-4'>
          <img src="./logo.png" alt="logo" className="w-44" />
        </div>
        <div className="hidden md:flex justify-evenly flex-1 text-sm">
          <a href='/' className='flex justify-center items-center'>HOME
            <Unicons.UilAngleDown width={20} className="text-red-600 ml-3 mr-1" />
          </a>
          <a href='/wishlist' className='flex justify-center items-center'>WISHLIST
            <Unicons.UilAngleDown width={20} className="text-red-600 ml-3 mr-1" />
          </a>
          <a href='/trackorders' className='flex justify-center items-center'>TRACK
            <Unicons.UilAngleDown width={20} className="text-red-600 ml-3 mr-1" />
          </a>
          <a href='/products' className='flex justify-center items-center'>PRODUCTS
            <Unicons.UilAngleDown width={20} className="text-red-600 ml-3 mr-1" />
          </a>
          <a href='/' className='flex justify-center items-center'>PAGES
            <Unicons.UilAngleDown width={20} className="text-red-600 ml-3 mr-1" />
          </a>
          <a href='/blogs' className='flex justify-center items-center'>BLOG
            <Unicons.UilAngleDown width={20} className="text-red-600 ml-3 mr-1" />
          </a>
        </div>
        <div className='flex items-center'>
          <Unicons.UilSearch width={40} height={30} className="text-gray-500 mr-2" />
          <Unicons.UilCog width={40} height={30} className="text-gray-500 mr-2" />
          <Unicons.UilShoppingBag width={40} height={30} className="text-gray-500" />
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-full ">
        <h2 className="text-6xl font-bold text-white bg-white bg-opacity-10 py-1 px-20"
          data-aos="fade-in"
          data-aos-offset="100"
          data-aos-duration="2000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="false"
          data-aos-once="false"
          data-aos-anchor-placement="center-bottom"
        >
          {heading}
        </h2>
      </div>
    </div>
  );
}
