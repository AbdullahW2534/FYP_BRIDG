import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Heading from '../components/heading';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import * as Unicons from '@iconscout/react-unicons';

export default function Gigs() {
    const [gigsData, setGig] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedGig, setSelectedGig] = useState(null);
    const [searchByTitle, setSearchTitle] = useState('');
    const [searchByAssistant, setSearchAssistant] = useState('');
    const [searchByCategory, setSearchCategory] = useState('');

    const fetchGigs = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/assistant/getAllGigs`, {
                params: {
                    searchByTitle: searchByTitle,
                    searchByAssistant: searchByAssistant,
                    searchByCategory: searchByCategory
                }
            });
            setGig(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/prod/getCategories`);
            setCategories(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchGigs();
    }, []);

    // const clearFilter = () => {
    //     setSearchTitle('');
    //     setSearchAssistant('');
    //     setSearchCategory('');
    //     fetchGigs();

    // }

    const handleHireClick = (gig) => {
        setSelectedGig(gig);
        setShowModal(true);
    };

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <Navbar backgroundImage="bg-[url('./assets/images/bg9.jpg')]" heading={'STREAM THE BEST GIGS'} />
                <div className='w-full flex flex-col justify-center items-center'>
                    <Heading heading={'GET IN TOUCH'} mainHeading={'LOOK FOR BEST'} />
                    <div className='z-50 flex justify-center w-full'>
                        <input
                            type="text"
                            name='searchByTitle'
                            value={searchByTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            placeholder='Search Gigs By Title'
                            className='p-2 border border-gray-500 rounded-lg mx-4'
                        />
                        <input
                            type="text"
                            name='searchByAssistant'
                            value={searchByAssistant}
                            onChange={(e) => setSearchAssistant(e.target.value)}
                            placeholder='Search Gigs By Assistants'
                            className='p-2 border border-gray-500 rounded-lg mx-4'
                        />
                        <select
                            name="searchByCategory"
                            id="searchByCategory"
                            value={searchByCategory}
                            className='p-2 border border-gray-500 rounded-lg mx-4'
                            onChange={(e) => setSearchCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.categoryName}>{category.categoryName}</option>
                            ))}
                        </select>
                        <button className='bg-gray-500 text-white px-4 py-2 font-bold rounded-lg' onClick={fetchGigs}>
                            <Unicons.UilSearch width={30} className="text-white w-full h-full" />
                        </button>
                        <button className='bg-gray-600 text-white font-bold px-4 py-2 rounded-lg mx-2' onClick={() => {
                            window.location.reload();
                        }}>
                            <Unicons.UilHistoryAlt width={30} className="text-white w-full h-full" />
                        </button>
                    </div>
                    <div className='grid grid-cols-4 gap-4 p-4 mb-20'>
                        {gigsData.map((gig, index) => (
                            <div key={index} className='w-full flex flex-col shadow-sm shadow-gray-500 rounded-lg py-4 relative'>
                                <div className='p-2 flex justify-start items-center font-normal'>
                                    {gig.user && gig.user.image && (
                                        <img src={gig.user.image} className='w-10 h-10 rounded-full mr-2' alt={`${gig.user.name}'s profile`} />
                                    )}
                                    {gig.user && gig.user.name}
                                </div>
                                <img src={`${gig.image}`} className='w-full h-60' alt={`gig ${index}`} />
                                <h2 className='w-full text-center bg-gray-500 text-white font-bold'>
                                    {gig.title}
                                </h2>
                                <h2 className='w-full px-2'>
                                    <span className='text-gray-800 font-bold'>
                                        Description :</span>
                                    {gig.description}
                                </h2>
                                <h2 className='w-full px-2'>
                                    <span className='text-gray-800 font-bold'>
                                        Keywords :</span>
                                    {gig.keywords}
                                </h2>
                                <h2 className='w-full px-2'>
                                    <span className='text-gray-800 font-bold'>
                                        Price :</span>
                                    {gig.price} USD
                                </h2>
                                <h2 className='w-full px-2'>
                                    <span className='text-gray-800 font-bold'>
                                        Delivery Time :</span>
                                    {gig.deliveryTime}
                                </h2>

                                <a href={gig.link} className='w-full px-2 font-bold'>
                                    <span className='text-gray-800 font-bold'>
                                        Link : </span>
                                    Visit
                                </a>
                                <button
                                    className='absolute bottom-0 right-0 mb-2 mr-2 bg-gray-500 hover:bg-gray-600 font-bold text-white py-1 px-10 rounded-full'
                                    onClick={() => handleHireClick(gig)}
                                >
                                    Hire
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
            {selectedGig && (
                <Modal showModal={showModal} setShowModal={setShowModal} gig={selectedGig} />
            )}
        </>
    );
}
