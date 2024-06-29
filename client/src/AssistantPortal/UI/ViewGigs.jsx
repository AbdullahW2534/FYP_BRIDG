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
        axios.defaults.withCredentials = true;
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
                    <div class="grid grid-cols-3 gap-4 p-4">
                        {gigsData.map((gig, index) => (
                            <>
                                <div className='w-full flex flex-col  shadow-sm shadow-purple-500 rounded-lg py-4'>
                                    <img src={`${gig.image}`} className='w-full h-60' alt={`gig ${index}`} />
                                    <h2 className='w-full text-center bg-purple-500 text-white font-bold'>
                                        {gig.title}
                                    </h2>
                                    <h2 className='w-full px-2'>
                                        <span className='text-purple-500 font-bold'>
                                            Description :</span>
                                        {gig.description}
                                    </h2>
                                    <h2 className='w-full px-2' >
                                        <span className='text-purple-500 font-bold'>
                                            Keywords :</span>
                                        {gig.keywords}
                                    </h2>
                                    <h2 className='w-full px-2'>
                                        <span className='text-purple-500 font-bold'>
                                            Price :</span>
                                        {gig.price} USD
                                    </h2>
                                    <h2 className='w-full px-2'>
                                        <span className='text-purple-500 font-bold'>
                                            Delivery Time :</span>
                                        {gig.deliveryTime}
                                    </h2>
                                    <a href={gig.link} className=' text-center rounded-lg px-2 py-1  bg-purple-500 text-white font-bold'>

                                        Visit
                                    </a>
                                </div>
                            </>

                        ))}
                    </div>


                </div>
            </div>


        </>
    );
}

export default ViewGigs;
