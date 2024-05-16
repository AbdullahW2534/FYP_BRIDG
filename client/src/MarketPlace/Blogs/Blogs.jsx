import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Heading from '../components/heading';
import axios from 'axios';
import BlogsPalet from './components/BlogsPalet';
import Footer from '../components/Footer';


export default function Blogs() {
    console.log(import.meta.env.VITE_APP_BACKEND_URL);
    const [postsData, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/post/getPosts`)
            .then(res => {
                setPosts(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <Navbar backgroundImage="bg-[url('./assets/images/bg8.jpg')]"  heading={'BLOGS'} />
                <div className='w-full flex flex-col justify-center items-center'>
                    <Heading heading={'FROM THE BLOGS'} mainHeading={'FASHIONS FOR YOU'} />
                    <div className='p-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 items-start justify-center text-black'
                    >
                        {postsData.map(post => {
                            return (
                                <>
                                    <BlogsPalet postsData={post} />
                                </>
                            )
                        })}

                    </div>
                </div>
                <Footer/>
            </div>


        </>
    );
}
