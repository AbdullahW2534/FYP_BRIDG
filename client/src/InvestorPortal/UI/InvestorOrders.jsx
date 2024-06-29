import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Unicons from '@iconscout/react-unicons';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';

function InvestorOrders() {
    const [editgig, setEditgig] = useState(null);
    const [notification, setNotification] = useState(null);
    const [ordersData, setOrders] = useState([]);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/order/getOrdersInvestor`)
            .then(res => {
                setOrders(res.data);
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
                setNotification('Gig updated');
                setTimeout(() => {
                    setNotification(null);
                }, 5000); // Notification disappears after 5 seconds
                // Refresh ordersData after updating
                refreshOrders();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleDelete = (gigID) => {
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/assistant/deletegig/${gigID}`)
            .then(res => {
                setNotification('Gig deleted');
                setTimeout(() => {
                    setNotification(null);
                }, 5000); // Notification disappears after 5 seconds
                // Refresh ordersData after deleting
                refreshOrders();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleApproval = (order, status) => {
        axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/order/updateOrderStatus/${order._id}`, { status })
            .then(res => {
                setNotification('Order status updated');
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
                refreshOrders();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const refreshOrders = () => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/order/getOrdersInvestor`)
            .then(res => {
                setOrders(res.data);
            })
            .catch(err => console.log(err));
    };

    const handleRefund = (order) => {
        axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/order/refund`, { transaction: order.transaction })
            .then(res => {
                setNotification('Refund initiated');
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
                handleApproval(order, "cancelled");
                refreshOrders();
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
                        ORDERS
                    </div>
                    {notification && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
                            {notification}
                        </div>
                    )}
                    <div className="grid grid-cols-4 gap-4 p-4">
                        {ordersData.map((order, index) => (
                            <div key={order._id} className='w-full flex flex-col  shadow-sm shadow-gray-300  pb-4'>
                                <h2 className='flex justify-center items-center px-2 w-full border-b border-gray-200 font-bold bg-purple-300'>
                                    TRXREF : {order.trxref}
                                </h2>
                                <h2 className='w-full px-2'>
                                    <span className='text-black font-bold mr-3'>
                                        Order To : </span>
                                    {order.gigUser.name}
                                </h2>
                                <h2 className='w-full px-2'>
                                    <span className='text-black font-bold mr-3'>
                                        Task Description :</span>
                                    {order.taskDescription}
                                </h2>
                                <h2 className='w-full px-2'>
                                    <span className='text-black font-bold mr-3'>
                                        Gig Title :</span>
                                    {order.title}
                                </h2>
                                <h2 className='w-full px-2' >
                                    <span className='text-black font-bold mr-3'>
                                        Payment Status :</span>
                                    {order.status}
                                </h2>
                                <h2 className='w-full px-2'>
                                    <span className='text-black font-bold mr-3'>
                                        Order Status :</span>
                                    {order.orderStatus}
                                </h2>
                                <h2 className='w-full px-2'>
                                    <span className='text-black font-bold mr-3'>
                                        Message :</span>
                                    {order.message}
                                </h2>
                                {
                                    order.orderStatus != 'cancelled' ? <div className='w-full flex justify-end items-center px-2'>
                                        <button className='flex justify-end items-center py-1 text-gray-400 font-bold px-2 cursor-pointer' onClick={() => handleRefund(order)}>
                                            Request Cancelation
                                            <Unicons.UilTimesCircle width={25} height={25} className=" ml-1 bg-red-500 text-white rounded-lg" />
                                        </button>
                                        <button className='flex justify-end items-center py-1 text-gray-400 font-bold px-2 cursor-pointer' onClick={() => handleApproval(order, "done")} >
                                            Delivery Done
                                            <Unicons.UilCheckCircle width={25} height={25} className=" ml-1 bg-green-500 text-white rounded-lg" />
                                        </button>
                                    </div>:<></>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default InvestorOrders;
