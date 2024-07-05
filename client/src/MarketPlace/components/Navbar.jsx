import React, { useEffect, useState } from 'react';
import * as Unicons from '@iconscout/react-unicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../../features/product/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ backgroundImage, heading }) {
  const userName = useSelector(state => state.user);
  const userRole = useSelector(state => state.role);
  const image = useSelector(state => state.image);
  console.log(image);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };


  const handleLogout = () => {
    axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/logout`)
      .then(() => {
        dispatch(addUser(""));
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/getMail`)
      .then(res => {
        const email = res.data.email;
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/getUserName`, {
          params: {
            email: email
          }
        })
          .then(res => {
            console.log(res, "Nav");
            const { name, role, image,email } = res.data;
            dispatch(addUser({ name, role, image,email }));
          })
          .catch(err => {
            
          });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-[-1]">
        <div className={` w-full h-full bg-cover opacity-80 ${backgroundImage}`}>

        </div>
      </div>

      <div className='bg-purple-500 flex justify-between items-center text-sm text-white py-2 px-4'>
        <div className='hidden md:flex text-xs items-center'>
          <span className='font-medium text-base text-white mr-1'>
            BRIDG.
          </span>
          Inc
          <Unicons.UilPhone width={16} className="text-white ml-3 mr-1" />
          +923-125526-260
        </div>
        <div className='flex items-center'>
          <FontAwesomeIcon icon={faHeart} className="hover:text-purple-500 mr-2 cursor-pointer" />
          <span className='flex items-center ml-4 cursor-pointer'>

            {userName ? (
              <>
                <div className='flex justify-between items-center '>
                  <a href={`/${userRole}/dashboard`} className='w-14 h-14 flex justify-center items-center mr-2'>
                    <img src={image} alt='profile' className=' w-10 h-9 rounded-full' />
                  </a>
                  {userName}
                  <button onClick={handleLogout} className='w-full flex justify-start items-center ml-2 border border-white rounded-lg p-1'>
                    <Unicons.UilSignout width={15} height={15} className="text-white cursor-pointer" />
                    Logout
                  </button>
                </div>
              </>
            ) : <>
              <a href='/signin' className='mx-1 bg-white font-semibold text-slate-950 rounded-lg px-2 py-1 hover:bg-slate-950 hover:text-white'>LOGIN</a>
              <a href='/signup' className='mx-1 bg-white font-semibold text-slate-950 rounded-lg px-2 py-1 hover:bg-slate-950 hover:text-white'>REGISTER</a>

            </>}
          </span>
        </div>
      </div>

      <div className='bg-white flex justify-between items-center text-sm px-3'>
        <Unicons.UilListUl width={40} height={40} className="text-black font-bold mr-2 lg:hidden" onClick={toggleMobileMenu} />
        <div className='py-2 mx-4'>
          <img src="./logo.png" alt="logo" className="w-20" />
        </div>
        <div className="hidden md:flex justify-start flex-1 text-sm pl-20">
          <a href='/' className='flex justify-center items-center font-normal mx-4 hover:border-b-2  border-purple-500'>HOME
           
          </a>
          <a href='/blogs' className='flex justify-center items-center font-normal mx-4 hover:border-b-2  border-purple-500'>BLOG
           
          </a>
          <a href='/gigs' className='flex justify-center items-center font-normal mx-4 hover:border-b-2  border-purple-500'>GIGS
           
          </a>
          <a href='/about' className='flex justify-center items-center font-normal mx-4 hover:border-b-2  border-purple-500'>ABOUT
           
          </a>
          <a href='/services' className='flex justify-center items-center font-normal mx-4 hover:border-b-2  border-purple-500'>SERVICES
           
          </a>
          <a href='/contact' className='flex justify-center items-center font-normal mx-4 hover:border-b-2  border-purple-500'>CONTACT
           
          </a>


        </div>
        {isMobileMenuVisible && (
          <div className="flex flex-col md:hidden justify-evenly flex-1 text-sm absolute top-12 right-0 bg-white w-full" >
            <a href='/' className='flex justify-end items-center my-1 '>HOME
             
            </a>
            <a href='/blogs' className='flex justify-end items-center my-1 '>BLOG
              <Unicons.UilAngleDown width={20} className="text-purple-500 ml-3 mr-1" />
            </a>
            <a href='/gigs' className='flex justify-end items-center my-1 '>GIGS
              <Unicons.UilAngleDown width={20} className="text-purple-500 ml-3 mr-1" />
            </a>
            <a href='/wishlist' className='flex justify-end items-center my-1 '>ABOUT
              <Unicons.UilAngleDown width={20} className="text-purple-500 ml-3 mr-1" />
            </a>
            <a href='/trackorders' className='flex justify-end items-center my-1 '>CONTACT
              <Unicons.UilAngleDown width={20} className="text-purple-500 ml-3 mr-1" />
            </a>
            <a href='/products' className='flex justify-end items-center my-1 '>SERVICES
              <Unicons.UilAngleDown width={20} className="text-purple-500 ml-3 mr-1" />
            </a>


            <Unicons.UilAngleDoubleUp width={40} height={40} className="text-white bg-purple-500 w-full" onClick={toggleMobileMenu} />
          </div>
        )}

        <div className='flex items-center'>
          <Unicons.UilSearch width={40} height={30} className="text-gray-500 mr-2" />
          <Unicons.UilCog width={40} height={30} className="text-gray-500 mr-2" />
          <Unicons.UilShoppingBag width={40} height={30} className="text-gray-500" />
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-full ">
        <h2 className="text-6xl font-bold text-white  text-center  py-1 px-4 lg:px-20"
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
