import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './animation.css';
import * as Unicons from '@iconscout/react-unicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Navbar from '../components/Navbar';
import Heading from '../components/heading';
import OrderForm from './Components/OrderForm';
import Footer from '../components/Footer';

export default function Pricing() {
    const [servicesData, setservicesData] = useState([]);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/getServices`)
            .then(res => {
                setservicesData(res.data);
            })
            .catch(err => console.log(err));
    }, []);



    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <Navbar backgroundImage="bg-[url('./assets/images/main.jpg')]" heading={'SERVICES'} />
                <Heading heading={'Special Service'} mainHeading={'Touch The World'} />
                <div className='w-full flex justify-center items-center mb-20'>
                    <div className='w-1/6 relative left-[0.8%]'>
                        <img src='./person.png' className='w-full ' alt='img' />
                    </div>
                    <div className='w-4/6  grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-16 py-10 justify-center items-center '>
                        {servicesData.map((service, index) => (
                            <div className='flex flex-col justify-center items-center h-68  rounded-t-lg shadow-lg pb-1' key={index}>
                                <img src={`${service.image}`} className='w-24 h-24 rounded-t-lg' alt={`img${index}`} />
                                <h2 className='w-full text-center font-semibold text-black mt-1'>{service.serviceName}</h2>
                                <h2 className='w-full text-center text-xs mt-2'><span className='font-medium'></span> {service.serviceDescription}</h2>
                                <div className='w-full flex justify-end mt-2'>
                                   <h2 className='text-end rounded-l-lg text-xs bg-gray-300 text-gray-700 font-medium py-1 px-3 '>
                                   {service.serviceCategory}
                                   </h2>
                                   </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>


        </>
    );
}
