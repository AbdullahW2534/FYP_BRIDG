import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';



export default function Signup() {

    const [name, setUserName] = useState('');
    const [email, setUserEmail] = useState('');
    const [password, setUserPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('https://mern-marketplace-dapp.vercel.app/auth/register',{name,email,password})
        .then(res =>{
            navigate('/signin');
        }).catch(err => console.log(err))
    }
    return (
        <>
            <div className='w-full h-screen flex flex-col justify-center items-center'>
                <div className=' flex flex-col justify-center items-center bg-gray-600 px-8 py-10 rounded-lg'>
                    <h2 className='w-full flex justify-center items-center text-white text-3xl mb-4 font-bold'>
                        SIGNUP
                    </h2>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-start '>
                        
                            <label htmlFor="userID" className='my-2 text-white font-bold'>User Name </label>
                            <input type='text' name='name' value={name} onChange={(e) => setUserName(e.target.value)} className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500' />
                        
                            <label htmlFor="userMail" className='my-2 text-white font-bold'>User Email</label>
                            <input type='email' name='email' value={email} onChange={(e) => setUserEmail(e.target.value)} className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500' />
                       
                            <label htmlFor="password" className='my-2 text-white font-bold'>Password </label>
                            <input type='password' name='password' value={password} onChange={(e) => setUserPassword(e.target.value)} className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500' />
                       
                    <div className='w-full flex justify-center item-center'>
                    <button type='submit' className='text-center bg-green-700 rounded-lg px-4 py-1 text-white font-bold mt-3 hover:bg-green-600'>Register</button>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}

