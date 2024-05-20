import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';

function ViewProducts() {
    const [editProduct, setEditProduct] = useState(null);
    const [notification, setNotification] = useState(null);
    const [productsdata, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/getProducts`)
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleEditClick = (product) => {
        setEditProduct(product);
    };

    const handleCancelEdit = () => {
        setEditProduct(null);
    };

    const handleEdit = (event) => {
        event.preventDefault();
        const updatedProductData = new FormData(event.target);
        const productId = updatedProductData.get('_id');

        axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/editProduct/${productId}`, updatedProductData)
            .then(res => {
                console.log(res.data);
                setNotification('Product updated');
                setTimeout(() => {
                    setNotification(null); 
                }, 10000);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleDelete = (productID) => {
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/deleteProduct/${productID}`)
            .then(res => {
                setNotification('Product Deleted');
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className='w-full mt-4'>
            {notification && (
                <div className='w-full flex justify-end'>
                    <div className="bg-green-500 w-1/5 rounded-lg text-white text-center my-2">
                        {notification}
                    </div>
                </div>
            )}
            {editProduct && (
                <>
                
                    <h2 className='w-full px-4 text-slate-950 bg-white flex justify-start items-center font-normal rounded-t-lg py-1'>EDIT PRODUCTS</h2>
                    <div className="w-full bg-white flex flex-col justify-center items-center p-4 rounded-b-lg shadow-lg mb-4">
                        <form className='w-full' onSubmit={handleEdit}>
                            <div className='grid grid-cols-2 gap-2'>
                                <label htmlFor="productName">Product ID</label>
                                <input type="text" name='_id' value={editProduct._id} className='rounded-lg border px-2 py-1' readOnly />
                                <label htmlFor="productName">Product Name</label>
                                <input type="text" name='productName' value={editProduct.productName} className='rounded-lg border px-2 py-1' onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })} />
                                <label htmlFor="productPrice">Product Price</label>
                                <input type="number" name='productPrice' value={editProduct.productPrice} className='rounded-lg border px-2 py-1' onChange={(e) => setEditProduct({ ...editProduct, productPrice: e.target.value })} />
                                <label htmlFor="productCategory">Product Category</label>
                                <input type="text" name='productCategory' value={editProduct.productCategory} className='rounded-lg border px-2 py-1' onChange={(e) => setEditProduct({ ...editProduct, productCategory: e.target.value })} />
                                <label htmlFor="file">Product Image</label>
                                <div className='px-4 py-2 flex justify-end items-center'>
                                    <img src={`${editProduct.image}`} className='w-2/5 h-36 rounded-lg' alt={`Product`} />
                                </div>
                                <input type="file" name='file' />
                            </div>
                            <div className='w-full flex justify-end items-center'>
                                <button type='submit' className='mt-4  w-24 py-1 bg-gray-400 rounded-lg font-bold text-white'>UPDATE</button>
                                <button type="button" className='mt-4 ml-2 w-24 py-1 bg-gray-400 rounded-lg font-bold text-white' onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
            <div className='w-full text-slate-950 py-2 px-2 bg-white font-bold '>
                PRODUCTS
            </div>
            <table className='table-auto w-full'>
                <thead>
                    <tr className='text-slate-950 font-light'>
                        <th className='px-4 py-2  font-bold text-gray-500 border '>Image</th>
                        <th className='px-4 py-2  font-bold text-gray-500 border'>Product Name</th>
                        <th className='px-4 py-2  font-bold text-gray-500 border'>Price ($)</th>
                        <th className='px-4 py-2  font-bold text-gray-500 border'>Category</th>
                        <th className='px-4 py-2  font-bold text-gray-500 border'></th>
                    </tr>
                </thead>
                <tbody>
                    {productsdata.map((product, index) => (
                        <tr key={index} className='bg-white border-b border-gray-200'>
                            <td className='px-4 py-2 w-1/5'>
                                <img src={`${product.image}`} className='w-full h-60 ' alt={`Product ${index}`} />
                            </td>
                            <td className='px-4 py-2 text-center'>{product.productName}</td>
                            <td className='px-4 py-2 text-center'>{product.productPrice} ($)</td>
                            <td className='px-4 py-2 text-center'>{product.productCategory}</td>
                            <td className='h-full flex flex-col justify-center items-center cursor-pointer'>
                                <Unicons.UilEditAlt width={30} height={30} className="text-green-600 my-10 hover:text-green-500" onClick={() => handleEditClick(product)} />
                                <Unicons.UilTrashAlt width={30} height={30} className="text-red-500  hover:text-red-600" onClick={() => handleDelete(product._id)} />
                            </td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewProducts;
