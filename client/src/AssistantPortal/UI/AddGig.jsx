import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';
import axios from 'axios';

export default function AddGig() {
    const [notification, setNotification] = useState(null);
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/getCategories`);
            setCategories(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleUpload = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        axios.defaults.withCredentials = true;
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/assistant/uploadGig`, formData)
            .then(res => {
                event.target.reset();
                console.log(res)
                setNotification('Gig Added');
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
            })
            .catch(err => console.log(err));
    };
    return (
        <div className='w-full flex '>
            <Sidebar />
            <div className='w-full h-screen flex flex-col '>
                <Topbar />
                {notification && (
                    <div className='w-full flex justify-end'>
                        <div className="bg-green-500 rounded-lg text-white text-center my-2 mx-2 py-2 px-2">
                            {notification}
                        </div>
                    </div>
                )}
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
                        <div className='flex justify-between w-full'>
                            <label className='block text-sm font-medium text-gray-700'>
                                Category
                            </label>
                            <select
                                name="category"
                                id="category"
                                className='p-2 border border-purple-500 rounded-lg mx-4'
                            // onChange={(e) => setSearchCategory(e.target.value)}
                            >
                                <option value="" hidden>All Categories</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.categoryName}>{category.categoryName}</option>
                                ))}
                            </select>
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
                        <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                            Create
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
