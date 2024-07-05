import React, { useState } from 'react'
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from '../features/product/user/userSlice';


export default function SignIn() {

    const [email, setUserEmail] = useState('');
    const [password, setUserPassword] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();

    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/login`, { email, password })
            .then(res => {
                const { Status, role, name,image,email } = res.data;
                dispatch(addUser({name,role,image,email}));
                console.log(res.data);
                if (Status === 'Success') {
                    if (role === 'admin') {
                        navigate('/adminportal/dashboard');
                    }
                    else if (role === 'investor') {
                        navigate("/investor/dashboard");
                    }
                    else if (role === 'assistant') {
                        navigate('/assistant/dashboard');
                    }
                    else{
                        navigate('/');
                    }
                }
            }).catch(err => console.log(err))
    }
    return (
        <>
            <div className='w-full h-screen flex justify-center items-center bg-gray-900'>
                <div className={` hidden  lg:flex flex-col w-1/2 h-full justify-end items-end  bg-cover bg-[url('./assets/images/login2.jpg')]`}>
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
                    {/* <div className='py-2 mx-4'>
                        <img src="./logo.png" alt="logo" className="w-48" />
                    </div> */}
                    <h2 className='w-full flex justify-center items-center text-purple-500 text-3xl mb-4 font-bold'>
                        SIGNIN
                    </h2>
                    <form onSubmit={handleSubmit} className='w-full  flex flex-col justify-center items-center '>

                        <div className='my-5 w-full flex justify-center items-center'>
                            <Unicons.UilUserCheck width={30} height={50} className="text-purple-500 ml-3 mr-3" />
                            <input type='email' name='email' value={email} onChange={(e) => setUserEmail(e.target.value)} className='border rounded-md px-10 py-2 focus:outline-none focus:border-blue-500' />
                        </div>


                        <div className='my-5 w-full flex justify-center items-center'>
                            <Unicons.UilLockAccess width={30} height={50} className="text-purple-500 ml-3 mr-3" />
                            <input type='password' name='password' value={password} onChange={(e) => setUserPassword(e.target.value)} className='border  rounded-md px-10 py-2 focus:outline-none focus:border-blue-500' />

                        </div>
                        <div className='w-full flex justify-center item-center my-2'>
                            Are you not registered?
                            <a href='/signup' className='text-center text-purple-500 ml-2 font-bold  '>Signup</a>
                        </div>
                        <div className='w-full flex justify-center item-center'>
                            <button type='submit' className='text-center bg-purple-500 text-white rounded-lg px-20 ml-9 py-1  font-bold mt-3 hover:bg-purple-600'>LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

