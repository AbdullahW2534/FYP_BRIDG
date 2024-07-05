import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';
import Sidebar from './UIComp/Sidebar';
import Topbar from './UIComp/Topbar';

export default function Users() {

    const [usersData, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/getUsers`)
            .then(res => {
                console.log(res.data);
                setPosts(res.data)
            })
            .catch(err => console.log(err));
    }, []);






    return (
        <div className='w-full flex bg-slate-100'>
            <Sidebar />
            <div className='w-full flex flex-col justify-start items-center'>
                <Topbar />
                <h2 className='w-full text-center font-bold text-purple-500 text-3xl'>
                    SERVICES
                </h2>
                <div className='w-full p-10'>

                    <table className='table-auto w-full'>
                        <thead>
                            <tr className='text-white'>
                                <th className='px-4 py-2 bg-gray-400 rounded-tl-lg'>Profile Pic</th>
                                <th className='px-4 py-2 bg-gray-400'>Name</th>
                                <th className='px-4 py-2 bg-gray-400'>Email</th>
                                <th className='px-4 py-2 bg-gray-400'>Role</th>

                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((post, index) => (
                                <tr key={index} className='bg-white border-b border-gray-200'>
                                    <td className='px-2 '>
                                        <img src={`${post.image}`} className='w-20 h-20 rounded-full my-3' alt={`Post ${index}`} />
                                    </td>
                                    <td className='px-2 '>{post.name}</td>
                                    <td className='px-2 '>{post.email}</td>
                                    <td className='px-2  w-2/6'>{post.role}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

