import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';

function ViewGigs() {
    const [editgig, setEditgig] = useState(null);
    const [notification, setNotification] = useState(null);
    const [gigsData, setGig] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/assistant/getGigs`)
            .then(res => {
                setGig(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleEditClick = (gig) => {
        setEditgig(gig);
    };

    const handleCancelEdit = () => {
        setEditgig(null);
    };

    const handleEdit = (event) => {
        event.preventDefault();
        const updatedgigData = new FormData(event.target);
        const gigId = updatedgigData.get('_id');

        axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/editgig/${gigId}`, updatedgigData)
            .then(res => {
                console.log(res.data);
                setNotification('gig updated');
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleDelete = (gigID) => {
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/assistant/deletegig/${gigID}`)
            .then(res => {
                setNotification('gig Deleted');
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <>
            <div className='w-full flex '>
                <Sidebar />
                <div className='w-full h-screen flex flex-col '>
                    <Topbar />
                    <div className='w-full text-purple-500 py-2 px-2 text-center text-3xl font-bold '>
                        GIGS
                    </div>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr className='text-slate-950 font-light'>
                                <th className='px-4 py-2  font-bold text-gray-500 border '>Image</th>
                                <th className='px-4 py-2  font-bold text-gray-500 border'>Title</th>
                                <th className='px-4 py-2  font-bold text-gray-500 border'>Description</th>
                                <th className='px-4 py-2  font-bold text-gray-500 border'>Keywords</th>
                                <th className='px-4 py-2  font-bold text-gray-500 border'>Price</th>
                                <th className='px-4 py-2  font-bold text-gray-500 border'>Delivery Time</th>
                                <th className='px-4 py-2  font-bold text-gray-500 border'>Link</th>
                                <th className='px-4 py-2  font-bold text-gray-500 border'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {gigsData.map((gig, index) => (
                                <tr key={index} className='bg-white border-b border-gray-200'>
                                    <td className='px-4 py-2 w-1/5'>
                                        <img src={`${gig.image}`} className='w-full h-60 ' alt={`gig ${index}`} />
                                    </td>
                                    <td className='px-4 py-2 text-center'>{gig.title}</td>
                                    <td className='px-4 py-2 text-center'>{gig.description} </td>
                                    <td className='px-4 py-2 text-center'>{gig.keywords} ($)</td>
                                    <td className='px-4 py-2 text-center'>{gig.price} ($)</td>
                                    <td className='px-4 py-2 text-center'>{gig.deliveryTime} </td>
                                    <td className='px-4 py-2 text-center'>{gig.link}</td>
                                    <td className='h-full flex flex-col justify-center items-center cursor-pointer'>
                                        <Unicons.UilEditAlt width={30} height={30} className="text-green-600 my-10 hover:text-green-500" onClick={() => handleEditClick(gig)} />
                                        <Unicons.UilTrashAlt width={30} height={30} className="text-red-500  hover:text-red-600" onClick={() => handleDelete(gig._id)} />
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    );
}

export default ViewGigs;
