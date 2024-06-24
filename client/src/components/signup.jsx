import React, { useState } from 'react'
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';



export default function Signup() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        console.log(formData);
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/register`, formData)
            .then(res => {
                // event.target.reset();
                navigate('/signin');
                // setNotification('User Added'); // Set the notification message
                // setTimeout(() => {
                //     setNotification(null); // Clear the notification after 10 seconds
                // }, 10000);
                console.log(res)
            })
            .catch(err => console.log(err));
        // axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/register`, { name, email, password })
        //     .then(res => {
        //         navigate('/signin');
        //     }).catch(err => console.log(err))
    }
    return (
        <>
            <div className='w-full h-screen flex justify-center items-center bg-gray-900'>
                <div className={` hidden  lg:flex flex-col w-1/2 h-full justify-end items-end  bg-cover bg-[url('./assets/images/signup.jpg')]`}>
                    <a href='/'>
                    <h2 className='text-2xl  text-white font-bold px-6 bg-opacity-50 my-4' >
                        <span className="w-full text-purple-500 text-end text-5xl scale-75 ">
                            BRIDG
                        </span>
                        .INC

                    </h2>
                    </a>
                </div>
                <div className={`flex flex-col w-full lg:w-1/2 h-full justify-center items-center bg-white `}>

                    <h2 className='w-full flex justify-center items-center text-purple-500 text-3xl mb-4 font-bold'>
                        SIGNUP
                    </h2>

                    <form onSubmit={handleSubmit} className='w-full  flex flex-col justify-center items-center '>

                        <div className='my-5 w-full flex justify-center items-center'>
                            <Unicons.UilUserSquare width={30} height={50} className="text-purple-500 ml-3 mr-3" />
                            <input type='text' name='name' className='border rounded-md px-10 py-2 focus:outline-none focus:border-blue-500' />
                        </div>
                        <div className='my-5 w-full flex justify-center items-center'>
                            <Unicons.UilUserCheck width={30} height={50} className="text-purple-500 ml-3 mr-3" />

                            <input type='email' name='email' className='border rounded-md px-10 py-2 focus:outline-none focus:border-blue-500' />
                        </div>
                        <div className='my-5 w-full flex justify-center items-center'>
                            <Unicons.UilPhone width={30} height={50} className="text-purple-500 ml-3 mr-3" />

                            <input type='text' name='phoneNo' className='border rounded-md px-10 py-2 focus:outline-none focus:border-blue-500' />
                        </div>

                        <div className='mt-5  w-full flex justify-center items-center'>
                            <Unicons.UilLockAccess width={30} height={50} className="text-purple-500 ml-3 mr-3" />

                            <input type='password' name='password' className='border  rounded-md px-10 py-2 focus:outline-none focus:border-blue-500' />
                        </div>
                        <div className='my-5 w-full flex justify-center items-center'>
                            <Unicons.UilAnnoyed width={30} height={50} className="text-purple-500 ml-3 mr-3" />
                            <select name='role' className='border rounded-md px-10 py-2 focus:outline-none focus:border-blue-500'>
                                <option value=''>Select Role</option>
                                <option value='investor'>Investor</option>
                                <option value='assistant'>Assistant</option>
                            </select>
                        </div>

                        <div className='my-5 w-full flex flex-col justify-center items-center'>
                            <h2 className='w-2/5 px-4 py-2 font-normal text-purple-500'>
                                Upload Profile Picture :
                            </h2>
                            <input type='file' name='file' className='border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500' />
                        </div>
                        <div className='w-full flex  justify-center item-center my-2'>
                            Already Have an Account?
                            <a href='/signin' className='text-center text-purple-500 ml-2 font-bold  '>Signin</a>
                        </div>
                        <div className='w-full flex justify-center item-center'>
                            <button type='submit' className='text-center bg-purple-500 text-white rounded-lg px-20 ml-9 py-1  font-bold mt-3 hover:bg-purple-600'>SIGNUP</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

