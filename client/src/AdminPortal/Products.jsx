import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Topbar from './UIComp/Topbar';
import Sidebar from './UIComp/Sidebar';
import AddProducts from './Components/AddProducts';
import ViewProducts from './Components/ViewProducts';
import * as Unicons from '@iconscout/react-unicons';
import Heading from './Components/heading';


export default function Products() {

    const navigate = useNavigate();
    const [suc, updateSuc] = useState('');

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/dash/dashboard`)
            .then(res => {
                console.log("Response : ", res.data);
                if (res.data === "Success") {
                    updateSuc("Successful");
                }
                else {
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    }, [navigate]);


    return (
        <>
            <div className='w-full flex bg-slate-100'>
                <Sidebar />
                <div className='w-full flex flex-col justify-start items-center'>
                    <Topbar />
                    <Heading heading={'PRODUCTS PALLET'} current={'Products'} previous={'Dashboard'} />
                    <AddProducts />
                    <ViewProducts />
                </div>
            </div>


        </>
    );
}
