import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from '../../features/product/productsSlice';
import * as Unicons from '@iconscout/react-unicons';

export default function ViewCategories() {
    const [editCategory, setEditCategory] = useState(null);
    const [notification, setNotification] = useState(null);
    const [categoriesData, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/getCategories`)
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleEditClick = (category) => {
        setEditCategory(category);
    };

    const handleCancelEdit = () => {
        setEditCategory(null);
    };

    const handleEdit = (event) => {
        event.preventDefault();
        const updatedCategoryData = new FormData(event.target);
        const categoryID = updatedCategoryData.get('_id');
        const data = {};
        for (const [key, value] of updatedCategoryData.entries()) {
            data[key] = value;
        }
        axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/editCategory/${categoryID}`, data)
            .then(res => {
                console.log(res.data);
                setNotification('Category updated');
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleDelete = (categoryID) => {
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/deleteCategory/${categoryID}`)
            .then(res => {
                setNotification('Category Deleted');
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className='w-full p-10'>
            {notification && (
                <div className='w-full flex justify-end'>
                    <div className="bg-green-500 w-1/5 rounded-lg text-white text-center my-2">
                        {notification}
                    </div>
                </div>
            )}
            {editCategory && (
                <>
                    <h2 className='w-1/5 mx-2 my-1 text-center font-semibold text-white rounded-r-lg px-2 text-2xl bg-purple-500'>
                        Edit Category 
                    </h2>
                    <div className="w-full bg-white flex flex-col justify-center items-center p-4 rounded-b-lg shadow-lg mb-4">
                        <form className='w-full' onSubmit={handleEdit}>
                            <div className='grid grid-cols-2 gap-2'>
                                <label htmlFor="categoryName">Category ID</label>
                                <input type="text" name='_id' value={editCategory._id} className='rounded-lg border px-2 py-1' readOnly />
                                <label htmlFor="categoryName">Category Name</label>
                                <input type="text" name='categoryName' value={editCategory.categoryName} className='rounded-lg border px-2 py-1' onChange={(e) => setEditCategory({ ...editCategory, categoryName: e.target.value })} />
                            </div>
                            <div className='w-full flex justify-end items-center'>
                                <button type='submit' className='mt-4  w-24 py-1 bg-gray-400 rounded-lg font-bold text-white'>UPDATE</button>
                                <button type="button" className='mt-4 ml-2 w-24 py-1 bg-gray-400 rounded-lg font-bold text-white' onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
            <table className='table-auto w-full'>
                <thead>
                    <tr className='text-white'>
                        <th className='px-4 py-2 bg-gray-400'>Category Name</th>
                        <th className='px-4 py-2 bg-gray-400'>Edit</th>
                        <th className='px-4 py-2 bg-gray-400 rounded-tr-lg'>Delete</th>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {categoriesData.map((category, index) => (
                        <tr key={index} className='bg-white border-b border-gray-200'>
                            <td className='px-4 py-2 text-center'>{category.categoryName}</td>
                            <td className='px-4 py-2  cursor-pointer'>
                                <Unicons.UilEditAlt width={25} height={25} className="flex justify-center w-full text-green-600 mr-4 hover:text-green-500" onClick={() => handleEditClick(category)} />
                            </td>
                            <td className='px-4 py-2  cursor-pointer '>
                                <Unicons.UilTrashAlt width={25} height={25} className="flex justify-center w-full text-red-500 mr-4 hover:text-red-600" onClick={() => handleDelete(category._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


