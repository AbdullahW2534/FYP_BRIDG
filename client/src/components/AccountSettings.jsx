import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function AccountSettings() {
    const [notification, setNotification] = useState(null);
    const userName = useSelector(state => state.user);
    const userRole = useSelector(state => state.role);
    const userEmail = useSelector(state => state.email);
    const image = useSelector(state => state.image);

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        console.log(formData);
        axios.defaults.withCredentials = true;
        axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/accountsettings`, formData)
            .then(res => {
                console.log(res.data);
                setNotification('Profile Updated');
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
            })
            .catch(err => {
                setNotification(err.response.data.message);
                setTimeout(() => {
                    setNotification(null);
                }, 10000);
            });
    };

    return (
        <>
            {notification && (
                <div className='w-full flex justify-end'>
                    <div className="bg-green-500 rounded-lg text-white text-center my-2 mx-2 py-2 px-2">
                        {notification}
                    </div>
                </div>
            )}

            <div className='w-full text-purple-500 py-2 px-2 text-center text-3xl font-bold'>
                ACCOUNT SETTINGS
            </div>
            <div className="flex-grow p-4">
                <form onSubmit={handleSubmit} method='post' className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 flex flex-col items-center">
                        <img src={image} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                        <input type="file" name='file' className="mt-4" />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input type="text" name='name' defaultValue={userName} className="w-full px-3 py-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input type="email" value={userEmail} className="w-full px-3 py-2 border rounded bg-gray-100" readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700">Old Password</label>
                            <input type="password" className="w-full px-3 py-2 border rounded" name='oldPassword' placeholder="Enter old password" />
                        </div>
                        <div>
                            <label className="block text-gray-700">New Password</label>
                            <input type="password" className="w-full px-3 py-2 border rounded" name='newPassword' placeholder="Enter new password" />
                        </div>
                        <div>
                            <button type="submit" className="w-full px-3 py-2 bg-purple-500 text-white rounded">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AccountSettings;
