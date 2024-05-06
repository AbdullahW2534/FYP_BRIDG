import React, { useState } from 'react';
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';


export default function AddProducts() {
    const [showForm, setShowForm] = useState(false); // State to track form visibility
    const [notification, setNotification] = useState(null);
    const handleToggleForm = () => {
        setShowForm(!showForm); // Toggle the value of showForm
    };

    const handleUpload = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        axios.post('https://mern-marketplace-dapp.vercel.app/prod/uploadProducts', formData)
            .then(res => {
                event.target.reset();
                setNotification('Product Added'); // Set the notification message
                setTimeout(() => {
                    setNotification(null); // Clear the notification after 10 seconds
                }, 10000);
                console.log(res)
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className='w-3/5 mt-4'>
                {notification && (
                    <div className='w-full flex justify-end'>
                        <div className="bg-green-500 w-1/5 rounded-lg text-white text-center my-2">
                            {notification}
                        </div>
                    </div>
                )}

                <h2 className='w-full bg-gray-400 text-white flex justify-center items-center font-bold rounded-t-lg py-1'>ADD PRODUCTS
                    <button onClick={handleToggleForm} className=''>
                        {showForm ? <Unicons.UilAngleUp width={30} height={30} className="text-white mr-4" /> : <Unicons.UilAngleDown width={30} height={30} className="text-white mr-4" />}
                    </button>
                </h2>


                {showForm && (
                    <div className='w-full bg-white flex flex-col justify-center items-center p-4 rounded-b-lg shadow-lg'>
                        <form className='w-full' onSubmit={handleUpload}>
                            <div className='grid grid-cols-2 gap-2'>
                                <label htmlFor="productName">Product Name</label>
                                <input type="text" name='productName' className='rounded-lg border px-2 py-1' />
                                <label htmlFor="productPrice">Product Price</label>
                                <input type="number" name='productPrice' className='rounded-lg border px-2 py-1' />
                                <label htmlFor="productCategory">Product Category</label>
                                <input type="text" name='productCategory' className='rounded-lg border px-2 py-1' />
                                <label htmlFor="productQuantity">Product Quantity</label>
                                <input type="number" name='productQuantity' className='rounded-lg border px-2 py-1' />
                                <label htmlFor="productColors">Product Colors</label>
                                <input type="text" name='productColors' className='rounded-lg border px-2 py-1' />
                                <label htmlFor="productSizes">Product Sizes</label>
                                <input type="text" name='productSizes' className='rounded-lg border px-2 py-1' />
                                <label htmlFor="file">Product Image</label>
                                <input type="file" name='file' />
                            </div>
                            <div className='w-full flex justify-end items-center'>
                                <button type='submit' className='mt-4  w-24 py-1 bg-gray-400 rounded-lg font-bold text-white'>LIST
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </>
    );
}
