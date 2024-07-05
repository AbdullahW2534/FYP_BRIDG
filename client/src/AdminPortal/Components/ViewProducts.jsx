import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';

function Viewservices() {
    const [editservice, setEditservice] = useState(null);
    const [notification, setNotification] = useState(null);
    const [servicesData, setServices] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/getServices`)
            .then(res => {
                setServices(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleEditClick = (service) => {
        setEditservice(service);
    };

    const handleCancelEdit = () => {
        setEditservice(null);
    };

    const handleEdit = (event) => {
        event.preventDefault();
        const updatedserviceData = new FormData(event.target);
        const serviceId = updatedserviceData.get('_id');

        axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/editservice/${serviceId}`, updatedserviceData)
            .then(res => {
                console.log(res.data);
                setNotification('service updated');
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleDelete = (serviceID) => {
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/deleteservice/${serviceID}`)
            .then(res => {
                setNotification('service Deleted');
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
            {editservice && (
                <>

                    <h2 className='w-1/5 my-1 mx-2 text-center font-semibold text-white rounded-r-lg px-2 text-2xl bg-purple-500'>
                        Edit Servivce
                    </h2>
                    <div className="w-full bg-white flex flex-col justify-center items-center p-4 rounded-b-lg shadow-lg mb-4">
                        <form className='w-full' onSubmit={handleEdit}>
                            <div className='grid grid-cols-2 gap-2'>
                                <label htmlFor="serviceName">Service ID</label>
                                <input type="text" name='_id' value={editservice._id} className='rounded-lg border px-2 py-1' readOnly />
                                <label htmlFor="serviceName">Service Name</label>
                                <input type="text" name='serviceName' value={editservice.serviceName} className='rounded-lg border px-2 py-1' onChange={(e) => setEditservice({ ...editservice, serviceName: e.target.value })} />
                                <label htmlFor="serviceDescription">Service Description</label>
                                <textarea type="number" name='serviceDescription' value={editservice.serviceDescription} className='rounded-lg border px-2 py-1' onChange={(e) => setEditservice({ ...editservice, serviceDescription: e.target.value })} />
                                <label htmlFor="serviceCategory">Service Category</label>
                                <input type="text" name='serviceCategory' value={editservice.serviceCategory} className='rounded-lg border px-2 py-1' onChange={(e) => setEditservice({ ...editservice, serviceCategory: e.target.value })} />
                                <label htmlFor="file">Service Image</label>
                                <div className='px-4 py-2 flex justify-end items-center'>
                                    <img src={`${editservice.image}`} className='w-2/5 h-36 rounded-lg' alt={`service`} />
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
            <h2 className='w-1/5 mx-2 my-1 text-center font-semibold text-white rounded-r-lg px-2 text-2xl bg-purple-500'>
                SERVICES
            </h2>
            <table className='table-auto w-full'>
                <thead>
                    <tr className='text-slate-950 font-light'>
                        <th className='px-4 py-2  font-bold text-gray-500 border '>Image</th>
                        <th className='px-4 py-2  font-bold text-gray-500 border'>Service Name</th>
                        <th className='px-4 py-2  font-bold text-gray-500 border'>Description</th>
                        <th className='px-4 py-2  font-bold text-gray-500 border'>Category</th>
                        <th className='px-4 py-2  font-bold text-gray-500 border'></th>
                    </tr>
                </thead>
                <tbody>
                    {servicesData.map((service, index) => (
                        <tr key={index} className='bg-white border-b border-gray-200'>
                            <td className='px-4 py-2 w-1/5'>
                                <img src={`${service.image}`} className='w-full h-60 ' alt={`service ${index}`} />
                            </td>
                            <td className='px-4 py-2 text-center'>{service.serviceName}</td>
                            <td className='px-4 py-2 text-center'>{service.serviceDescription} </td>
                            <td className='px-4 py-2 text-center'>{service.serviceCategory}</td>
                            <td className='h-full flex flex-col justify-center items-center cursor-pointer'>
                                <Unicons.UilEditAlt width={30} height={30} className="text-green-600 my-10 hover:text-green-500" onClick={() => handleEditClick(service)} />
                                <Unicons.UilTrashAlt width={30} height={30} className="text-red-500  hover:text-red-600" onClick={() => handleDelete(service._id)} />
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Viewservices;
