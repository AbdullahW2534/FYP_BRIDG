import React, { useEffect, useState } from 'react';
import Heading from './heading';
import axios from 'axios';
import BlogsPalet from '../Blogs/components/BlogsPalet';



export default function HomeBlogs() {
    const [postsData, setPosts] = useState([]);
    useEffect(() => {
        axios.get('https://mern-marketplace-dapp.vercel.app/post/getPosts')
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <Heading heading={'FROM THE BLOGS'} mainHeading={'FASHIONS FOR YOU'} />
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
                <a href='/blogs' className='rounded-lg my-6 py-1 px-10 hover:bg-red-500 bg-red-600 text-white'>MORE BLOGS</a>

            </div>
        </>
    );
}
