import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';
import axios from 'axios';

export default function AddGig() {

    const handleUpload = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        axios.defaults.withCredentials = true;
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/assistant/uploadGig`, formData)
            .then(res => {
                event.target.reset();
                console.log(res)
            })
            .catch(err => console.log(err));
    };
    return (
        <div className='w-full flex '>
            <Sidebar />
            <div className='w-full h-screen flex flex-col '>
                <Topbar />
                <h2 className='w-full text-center font-bold text-purple-500 text-3xl'>
                    ADD GIG
                </h2>
                <div className='p-6 flex justify-center w-full'>
                    <form onSubmit={handleUpload} className='space-y-6 w-3/5'>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Gig Title
                            </label>
                            <input
                                type='text'
                                name='title'
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Description
                            </label>
                            <textarea
                                name='description'
                                maxLength={200}
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Keywords
                            </label>
                            <input
                                type='text'
                                name='keywords'
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm mb-2'
                            />

                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Delivery Time
                            </label>
                            <input
                                type='text'
                                name='deliveryTime'
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Price
                            </label>
                            <input
                                type='number'
                                name='price'
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Link
                            </label>
                            <input
                                type='url'
                                name='link'
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Image
                            </label>
                            <input
                                type='file'
                                name='file'
                                className='mt-1 block w-full'
                            />
                        </div>
                        <button
                            type='submit'
                            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
