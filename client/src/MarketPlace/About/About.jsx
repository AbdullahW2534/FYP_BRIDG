import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Heading from '../components/heading';
import axios from 'axios';
import Footer from '../components/Footer';


export default function About() {
    // console.log(import.meta.env.VITE_APP_BACKEND_URL);
    // const [postsData, setPosts] = useState([]);
    // useEffect(() => {
    //     axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/post/getPosts`)
    //         .then(res => {
    //             setPosts(res.data);
    //             console.log(res.data);
    //         })
    //         .catch(err => console.log(err));
    // }, []);
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <Navbar backgroundImage="bg-[url('./assets/images/bg8.jpg')]" heading={'ABOUT US'} />
                <div className='w-full flex flex-col justify-center items-center mb-10'>
                    <Heading heading={'KNOW THE CORE'} mainHeading={'LEARN ABOUT US'} />
                    <div className='p-10 w-full flex flex-col items-center justify-center text-black'>

                        <div className=" flex justify-between items-center p-6 w-4/5 my-3 bg-gray-400 rounded-lg text-white">
                            <img src="/CEO BRIDG.png" alt="Mission Image" className="mb-4 w-2/5 rounded-lg" />
                            <div className='ml-20  w-3/5 '>
                                <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
                                <p className="text-white mb-4">
                                    <span className='font-semibold mr-1'>
                                        CEO
                                    </span>: ABDULLAH KHAN</p>
                                <p className="text-white font-bold w-4/5">
                                    Abdullah Khan, the visionary CEO of Bridg, brings over a decade of experience in technology and entrepreneurship. With a passion for innovation, Abdullah leads Bridg's mission to redefine how investors and assistants collaborate in the digital age. His strategic vision focuses on creating a seamless platform that empowers assistants to showcase their talents and enables investors to efficiently manage tasks with confidence. Under Abdullah's leadership, Bridg continues to evolve, integrating cutting-edge technologies like artificial intelligence and blockchain to enhance user experience and security. Committed to transparency and excellence, Abdullah Khan drives Bridg towards becoming the premier destination for freelance collaboration, fostering trust and success among its global community of users.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg  p-6 w-4/5">
                            <h2 className="text-2xl font-bold mb-4">About Bridg</h2>

                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">Gigs</h3>
                                <p className="text-gray-700">
                                    Bridg empowers assistants to create and showcase their gigs, providing a platform for them to offer their services to potential investors. Assistants can list various types of tasks and skills they specialize in, attracting investors looking for specific expertise.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">Investors</h3>
                                <p className="text-gray-700">
                                    Investors use Bridg to browse through a curated list of assistants, reviewing their profiles and portfolios before assigning tasks. Bridg streamlines the process of finding and collaborating with skilled assistants, ensuring efficient task management and quality outcomes.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">Assistants</h3>
                                <p className="text-gray-700">
                                    Bridg assists assistants in managing their workloads and schedules effectively. Assistants can track assigned tasks, communicate with investors, and receive payments securely through the platform, enhancing their productivity and professional growth.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">Paystack</h3>
                                <p className="text-gray-700">
                                    Bridg integrates with Paystack, a reliable payment gateway, to facilitate seamless transactions between investors and assistants. Paystack ensures secure and efficient payment processing, enhancing trust and reliability within the Bridg platform.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">Secure & Trusted</h3>
                                <p className="text-gray-700">
                                    Security and trust are fundamental values at Bridg. We prioritize the protection of user data and implement robust security measures to safeguard transactions and personal information. Bridg strives to provide a trusted platform where investors and assistants can collaborate with confidence.
                                </p>
                            </div>
                        </div>




                    </div>
                </div>
                <Footer />
            </div>


        </>
    );
}
