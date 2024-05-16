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
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();
    const [productsData, setProductsData] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notification, setNotificationText] = useState('');
    const [trackingID, setTrackIDText] = useState('');
    const [checkedStates, setCheckedStates] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/getProducts`)
            .then(res => {
                setProductsData(res.data);
                // Initialize checked states for each product
                setCheckedStates(res.data.map(() => false));
            })
            .catch(err => console.log(err));
    }, []);

    const openForm = (product) => {
        setShowForm(true);
        setSelectedProduct(product);
    };

    const closeForm = () => {
        setShowForm(false);
        setSelectedProduct(null);
    };

    const handleClick = (index) => {
        // Toggle the checked state for the corresponding product
        const newCheckedStates = [...checkedStates];
        newCheckedStates[index] = !newCheckedStates[index];
        setCheckedStates(newCheckedStates);
    };

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <Navbar backgroundImage="bg-[url('./assets/images/bg4.jpg')]" heading={'PRODUCTS'} />
                <Heading heading={'Special Offers'} mainHeading={'Latest Drops'} />
                <div className='w-full px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 py-10 justify-center items-center'>
                    {productsData.map((product, index) => (
                        <div className='flex flex-col justify-center items-start  rounded-t-lg shadow-lg pb-1' key={index}>
                            <img src={`${product.image }`} className='w-full h-48 rounded-t-lg' alt={`img${index}`} />
                            <h2 className='w-full text-center bg-slate-950 text-white mt-1'>{product.productName}</h2>
                            <h2 className='w-full text-start text-xs mt-1'><span className='font-medium'>Sizes :</span> {product.productSizes}</h2>
                            <h2 className='w-full text-start text-xs mt-1'><span className='font-medium'>Colors : </span>{product.productColors}</h2>

                            <div className='w-full flex items-center justify-between p-2'>
                                <h2 className='text-end font-bold text-2xl text-slate-950'>{product.productPrice}<span className=' text-xs font-medium text-gray-500'> USD /- </span></h2>
                                <button className='rounded-lg text-xs px-1 py-2 font-bold text-white hover:bg-slate-900 bg-slate-950'
                                    onClick={() => openForm(product)}>
                                    SHOP NOW
                                </button>
                            </div>
                            <div className='flex justify-end items-center w-full pt-1 '>
                                <div className='w-1/5 flex justify-center items-center'>
                                    {checkedStates[index] ? <FontAwesomeIcon  icon={solidHeart} onClick={() => handleClick(index)} className="text-red-600 cursor-pointer" /> : <FontAwesomeIcon icon={regularHeart} onClick={() => handleClick(index)} className="text-red-600 cursor-pointer" />}

                                </div>
                                <div className='w-4/5 flex justify-end items-center'>

                                    <Unicons.UilShoppingCartAlt width={20} className="text-gray-500 hover:text-yellow-500 ml-3 mr-1 cursor-pointer" />
                                    <Unicons.UilShoppingBag width={20} className="text-gray-500 hover:text-yellow-500 ml-3 mr-1 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                        <Footer/>
            </div>

            {showForm && <OrderForm selectedProduct={selectedProduct} closeForm={closeForm} setShowNotification={setShowNotification} setNotificationText={setNotificationText} setTrackIDText={setTrackIDText} />}


            {showNotification && (
                <div className="fixed bottom-5 right-5">
                    <div className="bg-green-500 text-white px-4 py-2 rounded">
                        {notification}
                        {trackingID ? <h2>Tracking ID : {trackingID}</h2>:<></>}
                    </div>
                </div>
            )}
        </>
    );
}
