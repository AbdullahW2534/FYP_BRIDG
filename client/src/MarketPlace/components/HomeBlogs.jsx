import React, { useEffect, useState } from 'react';
import Heading from './heading';
import axios from 'axios';
import BlogsPalet from '../Blogs/components/BlogsPalet';



export default function HomeBlogs() {
    const [postsData, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/post/getPosts`)
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <Heading heading={'FROM THE BLOGS'} mainHeading={'NEWS FOR YOU'} />
                <div className='p-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-10 items-start justify-center text-black'
                    data-aos="fade-in"
                    data-aos-offset="-100"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="false"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom"
                >
                    {postsData.slice(0, 4).map(post => {
                        return (
                            <>
                                <BlogsPalet postsData={post} />
                            </>
                        )
                    })}

                </div>
                <a href='/blogs' className='rounded-lg my-6 py-1 px-10 hover:bg-purple-500 bg-purple-600 text-white mb-10'>MORE BLOGS</a>

            </div>
        </>
    );
}
