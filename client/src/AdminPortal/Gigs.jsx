import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';
import Sidebar from './UIComp/Sidebar';
import Topbar from './UIComp/Topbar';

export default function AdminGigs() {

    const [gigsData, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/assistant/getAllGigs`)
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
                    GIGS
                </h2>
                <div className='w-full p-10'>

                    <table className='table-auto w-full'>
                        <thead>
                            <tr className='text-white'>
                                <th className='px-4 py-2 bg-gray-400 rounded-tl-lg'>Image</th>
                                <th className='px-4 py-2 bg-gray-400'>Title</th>
                                <th className='px-4 py-2 bg-gray-400'>user</th>
                                <th className='px-4 py-2 bg-gray-400'>Description</th>
                                <th className='px-4 py-2 bg-gray-400'>Price</th>
                                <th className='px-4 py-2 bg-gray-400'>DeliveryTime</th>
                                <th className='px-4 py-2 bg-gray-400'>Link</th>

                            </tr>
                        </thead>
                        <tbody>
                            {gigsData.map((gig, index) => (
                                <tr key={index} className='bg-white border-b border-gray-200'>
                                    <td className='px-2 text-center '>
                                        <img src={`${gig.image}`} className='w-40 h-20 rounded-lg my-3' alt={`Post ${index}`} />
                                    </td>
                                    <td className='px-2 text-center w-2/6'>{gig.title}</td>
                                    <td className='px-2 text-center '>{gig.user.name}</td>
                                    <td className='px-2 text-center  w-2/6'>{gig.description}</td>
                                    <td className='px-2 text-center  w-1/6'>{gig.price}</td>
                                    <td className='px-2 text-center  w-1/6'>{gig.deliveryTime}</td>
                                    <td className='px-2 text-center  w-2/6'><a href={gig.link}>{gig.link}</a></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

