import React, { useState } from 'react';
import axios from 'axios';
import PaystackPayment from './PaystackButton';

const Modal = ({ showModal, setShowModal, gig }) => {
    const [taskDescription, setTaskDescription] = useState("");

    if (!showModal) return null;

    const handlePaystackSuccess = async (reference) => {
        const formData = new FormData();
        console.log(reference, "ref");
        formData.append('title', gig.title);
        formData.append('price', gig.price);
        formData.append('deliveryTime', gig.deliveryTime);
        formData.append('gigUser', gig.user._id);
        formData.append('taskDescription', taskDescription);

        formData.append('paymentReference', reference.reference);
        formData.append('message', reference.message);
        formData.append('redirecturl', reference.redirecturl);
        formData.append('status', reference.status);
        formData.append('trans', reference.trans);
        formData.append('transaction', reference.transaction);
        formData.append('trxref', reference.trxref);


        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/order/placeOrder`, formData, { withCredentials: true });
            console.log(res);
            setShowModal(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handlePaystackClose = () => {
        console.log('Payment closed');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">Gig Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block font-bold text-purple-500">Title:</label>
                        <input
                            type="text"
                            value={gig.title}
                            readOnly
                            name='title'
                            className="w-full border border-gray-300 rounded p-2 bg-gray-100"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block font-bold text-purple-500">Price:</label>
                        <input
                            type="text"
                            value={`${gig.price} USD`}
                            readOnly
                            name='price'
                            className="w-full border border-gray-300 rounded p-2 bg-gray-100"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block font-bold text-purple-500">Delivery Time:</label>
                        <input
                            type="text"
                            value={gig.deliveryTime}
                            readOnly
                            name='deliveryTime'
                            className="w-full border border-gray-300 rounded p-2 bg-gray-100"
                        />
                    </div>
                    <input value={gig.user._id} hidden name='gigUser' />
                    <div className="mb-4">
                        <label className="block font-bold text-purple-500">Task Description:</label>
                        <textarea
                            className="w-full border border-gray-300 rounded p-2"
                            placeholder="Describe the task..."
                            required
                            name='taskDescription'
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                        <PaystackPayment
                            email={gig.user.email}
                            amount={gig.price}
                            onSuccess={handlePaystackSuccess}
                            onClose={handlePaystackClose}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
